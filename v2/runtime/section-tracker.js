/* Tarh & Afarinesh — V2 SHARED SECTION TRACKER
   ONE algorithm for "which section is nearest the reading line," extracted from Projects
   V2.2's proven fix (scroll + setTimeout, not IntersectionObserver/requestAnimationFrame —
   both confirmed unreliable in this preview environment). Provides STATE only; a page decides
   how to present it (Projects: chapter pill + rail; About: active History milestone; Journal:
   Contents). Never imposes UI.

   Usage:
     const stop = TA_SECTION_TRACKER.track({
       root: () => document.querySelector('[data-pr2-root]'),   // re-queried each call — safe across re-renders
       scrollRoot: window,                                        // or a scrollable element — defaults to window
       selector: '[data-sec]',                                   // or pass sections directly
       onChange: (state) => { ... }                               // state: {key, index, total, el}
     });
     // later: stop() to unbind

   Shared via the V2 Scroll Coordinator: ONE subscription PER scrollRoot, not per tracker.
   Multiple trackers sharing a scrollRoot (e.g. two features both reading window scroll)
   register into the same subscription; it is removed once the last tracker on that root
   unregisters. No permanent loop either way.

   Registration is declarative-friendly too: a section can carry its own label via
   data-track-label-en/data-track-label-fa, read back through state.el's attributes — the
   tracker itself stays label-agnostic (labels are page content, not tracker state). */
(function () {
  if (window.TA_SECTION_TRACKER) return;

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* the reading line is 42% of the scroll root's own viewport — window.innerHeight for the
     default root, or the scroll container's clientHeight when scrollRoot is an element (the
     Design System's internal-scrollbox specimen needs this to be a real, working demo). */
  function viewportHeight(scrollRoot) {
    return scrollRoot === window || !scrollRoot ? window.innerHeight : scrollRoot.clientHeight;
  }
  /* els' rects are viewport-relative either way; for an element scrollRoot we offset by its
     own bounding rect so "top" means "distance from the container's own top edge." */
  function rectIn(el, scrollRoot) {
    var r = el.getBoundingClientRect();
    if (scrollRoot === window || !scrollRoot) return r;
    var cr = scrollRoot.getBoundingClientRect();
    return { top: r.top - cr.top, bottom: r.bottom - cr.top };
  }

  /* pure: given elements + their scroll root, return the index nearest the reading line
     (~42% of that root's viewport height) — the same curve Projects' original tick() used,
     now shared instead of copy-pasted). */
  function activeIndex(els, scrollRoot) {
    if (!els || !els.length) return -1;
    var vhMid = viewportHeight(scrollRoot) * 0.42, best = -1, bestDist = Infinity;
    var vh = viewportHeight(scrollRoot);
    for (var i = 0; i < els.length; i++) {
      var r = rectIn(els[i], scrollRoot);
      if (r.bottom < 0 || r.top > vh) continue;
      var d = Math.abs(r.top - vhMid);
      if (r.top < vhMid && d < bestDist) { bestDist = d; best = i; }
    }
    return best;
  }

  /* registry: one TA_SCROLL subscription per distinct scrollRoot, shared by every tracker
     registered against that root */
  var registries = []; // [{ root, listeners:[fn], unsubscribe }]
  function registryFor(scrollRoot) {
    for (var i = 0; i < registries.length; i++) if (registries[i].root === scrollRoot) return registries[i];
    var reg = { root: scrollRoot, listeners: [] };
    var run = function () { for (var j = 0; j < reg.listeners.length; j++) reg.listeners[j](); };
    reg.unsubscribe = window.TA_SCROLL ? window.TA_SCROLL.subscribe(run, { root: scrollRoot }) : null;
    registries.push(reg);
    return reg;
  }
  function unregister(scrollRoot, fn) {
    var reg = null, idx = -1;
    for (var i = 0; i < registries.length; i++) if (registries[i].root === scrollRoot) { reg = registries[i]; idx = i; break; }
    if (!reg) return;
    var li = reg.listeners.indexOf(fn);
    if (li >= 0) reg.listeners.splice(li, 1);
    if (!reg.listeners.length) {
      if (reg.unsubscribe) reg.unsubscribe();
      registries.splice(idx, 1);
    }
  }

  function track(opts) {
    var scrollRoot = opts.scrollRoot || window;
    var lastKey = null, lastTotal = -1;
    function run() {
      var root = typeof opts.root === "function" ? opts.root() : opts.root;
      if (!root) return;
      var els = opts.els ? opts.els() : Array.prototype.slice.call(root.querySelectorAll(opts.selector));
      if (opts.exclude) els = els.filter(function (el) { return !opts.exclude(el); });
      if (!els.length) return;
      var idx = activeIndex(els, scrollRoot);
      if (idx < 0) idx = lastKey == null ? 0 : idx;
      if (idx < 0) return;
      var el = els[idx];
      var key = opts.keyOf ? opts.keyOf(el) : el.getAttribute("data-sec") || String(idx);
      if (key === lastKey && els.length === lastTotal) return;
      lastKey = key; lastTotal = els.length;
      if (opts.onChange) opts.onChange({ key: key, index: idx, total: els.length, el: el, els: els });
    }
    var reg = registryFor(scrollRoot);
    reg.listeners.push(run);
    run();
    return function stop() { unregister(scrollRoot, run); };
  }

  window.TA_SECTION_TRACKER = { track: track, activeIndex: activeIndex };
})();
