/* Tarh & Afarinesh — PROGRESSIVE REVEAL & LOADING (V2)
   One shared engine for every [data-reveal] element across V2 pages.

   Rebuilt (V2.4) on the shared V2 Scroll Coordinator (`../runtime/scroll-coordinator.js`) —
   NOT IntersectionObserver, and NOT a self-sustaining timer. IO was the one remaining reveal
   mechanism still using an API independently confirmed unreliable in this preview
   environment; a self-rescheduling setTimeout (an earlier version of this file) was its own
   violation of "no permanent loop" — it kept firing every 16ms as long as ANY offscreen
   element remained unrevealed, even while the visitor was completely idle. Both are fixed
   here: the coordinator calls this engine's tick only in response to a real scroll/resize (or
   once on registration), never on its own schedule.

   Separates RESOURCE LOADING (when the browser fetches media) from VISUAL REVEAL (when the
   user sees it): an element enters the PREPARE zone well before viewport entry (loads/decodes
   the asset); it enters the REVEAL zone once the reading position actually reaches it AND the
   asset is ready. Whichever finishes second triggers the reveal.

   Progressive enhancement: CSS only hides content once <html> carries data-reveal-boot (set
   synchronously below, before the scheduler runs). If this script never executes, nothing is
   ever hidden — content is visible in normal flow with no JS dependency. If the scheduler
   never gets a qualifying scroll event (e.g. a very short page), the immediate run() call
   below still evaluates every element's current position at least once.

   Markup contract:
     data-reveal="media"   — wrapper has data-reveal-img (the bg/img layer)
                             and optionally data-reveal-mask (covering surface)
     data-reveal="content" — element itself fades/lifts in
     data-reveal="group"   — direct children stagger in (CSS nth-child, ≤5)
     data-reveal="none"    — explicitly opted out (dense/repeated content)
   One-time only: once revealed, an element is never re-hidden on back-scroll. */
(function () {
  if (window.TA_REVEAL) return;
  document.documentElement.setAttribute("data-reveal-boot", "1");

  var reduced = window.matchMedia("(prefers-reduced-motion:reduce)");
  var prepared = new WeakSet(), revealed = new WeakSet(), observed = new WeakSet();
  var pending = []; // elements not yet fully revealed — the only set the scheduler walks

  function urlFromBg(el) {
    var m = /url\(["']?([^"')]+)["']?\)/.exec(getComputedStyle(el).backgroundImage);
    return m ? m[1] : null;
  }

  var readySet = new WeakSet(); // separate from the DOM attribute — some pages' own re-renders
  // can reset imperative attributes on a live node; readySet is the resilient source of truth,
  // reapplied every tick rather than trusted to persist on the DOM node between renders.

  function reveal(el) {
    if (revealed.has(el)) return;
    revealed.add(el);
    el.setAttribute("data-reveal-state", "revealed");
  }

  function tryReveal(el) {
    if (readySet.has(el) && el.getAttribute("data-reveal-inview") === "1") reveal(el);
  }

  function markReady(el) { readySet.add(el); el.setAttribute("data-reveal-ready", "1"); tryReveal(el); }

  function prepare(el) {
    if (prepared.has(el)) { if (readySet.has(el)) el.setAttribute("data-reveal-ready", "1"); return; }
    prepared.add(el);
    if (el.getAttribute("data-reveal") !== "media") { markReady(el); return; }
    var host = el.querySelector("[data-reveal-img]") || el;
    var url = el.getAttribute("data-reveal-src") || urlFromBg(host);
    if (!url || url === "none") { markReady(el); return; }
    var img = new Image();
    img.onload = function () {
      if (img.decode) img.decode().then(function () { markReady(el); }).catch(function () { markReady(el); });
      else markReady(el);
    };
    img.onerror = function () { el.setAttribute("data-reveal-error", "1"); markReady(el); };
    img.src = url;
  }

  /* one evaluation, driven by the shared Scroll Coordinator — never a self-rescheduling
     timer. Called once immediately on registration and again only on a real scroll/resize.
     Unsubscribes once nothing remains pending, so the runtime is truly idle (no scroll
     listener at all) rather than staying subscribed to receive ticks that immediately
     no-op — resubscribed the moment fresh [data-reveal] content is discovered. */
  function tick() {
    if (!pending.length) { unsubscribe(); return; }
    var vh = window.innerHeight, next = [];
    for (var i = 0; i < pending.length; i++) {
      var el = pending[i];
      if (revealed.has(el) || !el.isConnected) continue;
      var r = el.getBoundingClientRect();
      var inPrepare = r.top < vh + 500 && r.bottom > -500;
      var inReveal = r.top < vh * 0.88 && r.bottom > 0;
      if (inPrepare) prepare(el);
      if (inReveal) { el.setAttribute("data-reveal-inview", "1"); tryReveal(el); }
      if (!revealed.has(el)) next.push(el);
    }
    pending = next;
    if (!pending.length) unsubscribe();
  }
  var unsub = null;
  function ensureSubscribed() {
    if (unsub || !window.TA_SCROLL) return;
    unsub = window.TA_SCROLL.subscribe(tick, { root: window });
  }
  function unsubscribe() {
    if (!unsub) return;
    unsub(); unsub = null;
  }

  function instantRevealAll(targets) {
    targets.forEach(function (el) {
      observed.add(el); readySet.add(el);
      el.setAttribute("data-reveal-ready", "1");
      el.setAttribute("data-reveal-inview", "1");
      reveal(el);
    });
  }

  function observeAll(targets) {
    if (reduced.matches) { instantRevealAll(targets); return; }
    targets.forEach(function (el) { observed.add(el); pending.push(el); });
    ensureSubscribed();
    tick(); // evaluate immediately — don't wait for the next scroll to check already-in-view content
    /* one follow-up pass after paint: --grid-cols and other layout-affecting custom
       properties can still be settling on this first synchronous tick, which mis-measures
       getBoundingClientRect for content that is actually already in view. Terminates on its
       own (tick() no-ops once nothing is pending) — not a self-rescheduling loop. */
    requestAnimationFrame(function () { requestAnimationFrame(tick); });
  }

  /* the DC runtime hydrates a mounted skeleton in place — a bound background-image can land
     on an existing [data-reveal-img] node as a plain attribute write well after the section
     itself was inserted (past the point collectFresh saw it as a childList addition). Without
     watching for that, prepare() can cache "no image yet" against the node forever and the
     mask opens over a background that never actually arrives. Re-running prepare() here is
     safe even for a genuinely image-less (decorative) node — it just re-confirms none. */
  function recheckMedia(host) {
    if (!observed.has(host)) return;
    prepared.delete(host); readySet.delete(host);
    host.removeAttribute("data-reveal-ready");
    prepare(host);
    if (host.getAttribute("data-reveal-inview") === "1") tryReveal(host);
    if (!revealed.has(host) && pending.indexOf(host) < 0) { pending.push(host); ensureSubscribed(); }
  }

  function init() {
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]:not([data-reveal="none"])'));
    if (targets.length) observeAll(targets);
    watchForMore();
  }

  /* DC pages stream their template in after this script evaluates, so init() at
     DOMContentLoaded/immediate-run finds zero [data-reveal] elements. A MutationObserver
     keeps discovering and wiring up new ones as the DC runtime mounts the template. */
  function collectFresh(node, out) {
    if (node.nodeType !== 1) return;
    if (node.matches && node.matches('[data-reveal]:not([data-reveal="none"])') && !observed.has(node)) out.push(node);
    if (node.querySelectorAll) {
      var found = node.querySelectorAll('[data-reveal]:not([data-reveal="none"])');
      for (var i = 0; i < found.length; i++) if (!observed.has(found[i])) out.push(found[i]);
    }
  }
  var mo;
  function watchForMore() {
    if (mo) return;
    mo = new MutationObserver(function (mutations) {
      var fresh = [];
      for (var m = 0; m < mutations.length; m++) {
        var mut = mutations[m];
        if (mut.type === "attributes") {
          var host = mut.target.hasAttribute("data-reveal-img") ? mut.target.closest("[data-reveal]") : mut.target;
          if (host) recheckMedia(host);
          continue;
        }
        var added = mut.addedNodes;
        for (var n = 0; n < added.length; n++) collectFresh(added[n], fresh);
      }
      if (fresh.length) observeAll(fresh);
    });
    mo.observe(document.body || document.documentElement,
      { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  watchForMore();

  /* motion preference can change mid-session, same as ambient.js */
  reduced.addEventListener("change", function () {
    if (reduced.matches) instantRevealAll(Array.prototype.slice.call(document.querySelectorAll('[data-reveal]:not([data-reveal="none"])')));
  });

  window.TA_REVEAL = { init: init };
})();
