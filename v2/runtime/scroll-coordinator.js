/* Tarh & Afarinesh — V2 SHARED SCROLL COORDINATOR
   ONE listener + ONE coalesced (setTimeout) scheduler PER scroll root, shared by every V2
   system that needs to react to scroll (reveal.js, section-tracker.js, a page's own
   Narrative Scroll tick). Extracted so reveal/tracker/page code stop each registering their
   own "window scroll" listener — one page previously had three independent listeners doing
   the same coalescing work.

   Purely event-driven: a subscriber's callback runs only in response to a real scroll/resize
   event (or once immediately on subscribe, so already-in-view content still gets evaluated
   without waiting for the user to scroll). Nothing here reschedules itself while idle — if a
   subscriber's own logic needs to keep checking until some condition is met (e.g. "until this
   element is revealed"), THAT subscriber is responsible for un-subscribing once its own work
   is done; the coordinator itself never loops.

   Usage:
     const unsub = TA_SCROLL.subscribe(fn, { root: window });   // root optional, defaults to window
     fn();            // called once immediately (in the same tick, via the coordinator's own
                       // coalesced schedule) and again on every future scroll/resize of `root`
     unsub();          // stop receiving calls; the root's listener is removed once nobody
                       // is left subscribed to it */
(function () {
  if (window.TA_SCROLL) return;

  var registries = []; // [{ root, fns:[fn], pending }]
  function registryFor(root) {
    for (var i = 0; i < registries.length; i++) if (registries[i].root === root) return registries[i];
    var reg = { root: root, fns: [], pending: null };
    reg.run = function () {
      reg.pending = null;
      var snapshot = reg.fns.slice(); // subscribers may unsubscribe themselves mid-run (e.g.
      // reveal.js going idle) — iterate a snapshot so that never skips or double-calls a sibling
      for (var i = 0; i < snapshot.length; i++) { try { snapshot[i](); } catch (e) { console.error("TA_SCROLL subscriber", e); } }
    };
    reg.schedule = function () { if (!reg.pending) reg.pending = setTimeout(reg.run, 16); };
    var target = root === window ? window : root;
    target.addEventListener("scroll", reg.schedule, { passive: true });
    if (root === window) window.addEventListener("resize", reg.schedule);
    registries.push(reg);
    return reg;
  }
  function unregister(root, fn) {
    var reg = null, idx = -1;
    for (var i = 0; i < registries.length; i++) if (registries[i].root === root) { reg = registries[i]; idx = i; break; }
    if (!reg) return;
    var fi = reg.fns.indexOf(fn);
    if (fi >= 0) reg.fns.splice(fi, 1);
    if (!reg.fns.length) {
      var target = root === window ? window : root;
      target.removeEventListener("scroll", reg.schedule);
      if (root === window) window.removeEventListener("resize", reg.schedule);
      if (reg.pending) clearTimeout(reg.pending);
      registries.splice(idx, 1);
    }
  }

  function subscribe(fn, opts) {
    var root = (opts && opts.root) || window;
    var reg = registryFor(root);
    reg.fns.push(fn);
    reg.schedule(); // evaluate current state once immediately, no need to wait for a scroll
    return function unsubscribe() { unregister(root, fn); };
  }

  window.TA_SCROLL = { subscribe: subscribe };
})();
