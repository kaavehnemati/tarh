/* Tarh & Afarinesh — central layout mode.
   One source of truth for responsive JS decisions, so no page tests innerWidth on its own.
   Publishes: html[data-lm="desktop|laptop|tablet|mobile"], data-pointer, data-short, data-rm
   and window.TA_LAYOUT { mode, isMobile, isTablet, isDesktop, finePointer, coarsePointer,
   shortViewport, reducedMotion, dur(ms), onChange(fn) } */
(function () {
  var html = document.documentElement;
  var listeners = [];
  var state = {};

  var mq = function (q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } };

  function measure() {
    var w = window.innerWidth || 1440;
    var h = window.innerHeight || 900;
    var mode = w >= 1600 ? "large" : w >= 1280 ? "desktop" : w >= 1024 ? "laptop" : w >= 768 ? "tablet" : "mobile";
    var fine = mq("(hover:hover) and (pointer:fine)");
    var short = h < 650;
    var rm = mq("(prefers-reduced-motion: reduce)");
    state = {
      mode:mode, width:w, height:h,
      isLarge:mode === "large", isDesktop:mode === "large" || mode === "desktop",
      isLaptop:mode === "laptop", isTablet:mode === "tablet", isMobile:mode === "mobile",
      isCompact:w < 390,
      finePointer:fine, coarsePointer:!fine,
      shortViewport:short, reducedMotion:rm,
      /* interaction model, not width: a coarse pointer on a short screen is compact */
      compactInteraction: mode === "mobile" || mode === "compact" || (!fine && short),
      /* motion scale: small interactions get quicker on smaller screens */
      scale: mode === "mobile" ? 0.78 : mode === "tablet" ? 0.88 : 1,
      dur: function (ms) { return Math.round(ms * (this.reducedMotion ? 0 : this.scale)); }
    };
    html.setAttribute("data-lm", mode === "large" ? "desktop" : mode);
    html.setAttribute("data-pointer", fine ? "fine" : "coarse");
    if (short) html.setAttribute("data-short", "1"); else html.removeAttribute("data-short");
    if (rm) html.setAttribute("data-rm", "1"); else html.removeAttribute("data-rm");
    if (state.compactInteraction) html.setAttribute("data-compact", "1"); else html.removeAttribute("data-compact");
    return state;
  }

  var raf = null;
  function update() {
    if (raf) return;
    raf = setTimeout(function () {
      raf = null;
      lastW = window.innerWidth; lastH = window.innerHeight;
      var before = { mode:state.mode, width:state.width, height:state.height,
                     fine:state.finePointer, short:state.shortViewport, rm:state.reducedMotion };
      measure();
      var info = {
        modeChanged: before.mode !== state.mode,
        widthChanged: before.width !== state.width,
        heightChanged: before.height !== state.height,
        pointerChanged: before.fine !== state.finePointer,
        shortViewportChanged: before.short !== state.shortViewport,
        reducedMotionChanged: before.rm !== state.reducedMotion
      };
      /* a virtual keyboard changes height only — never a reason to re-initialise */
      info.keyboardLikely = info.heightChanged && !info.widthChanged && !info.modeChanged;
      info.layoutChanged = info.modeChanged || info.widthChanged || info.pointerChanged || info.shortViewportChanged;
      window.TA_LAYOUT = build();
      for (var i = 0; i < listeners.length; i++) {
        try { listeners[i](window.TA_LAYOUT, info); } catch (e) {}
      }
    }, 120);
  }

  /* ---- scroll notification: native events only, no polling ---- */
  var scrollSubs = [];
  var scrollBound = false;

  function scrollTop() {
    var el = document.scrollingElement || document.documentElement;
    return (window.pageYOffset != null ? window.pageYOffset : el.scrollTop) || 0;
  }

  function wakeSubscribers() {
    for (var i = 0; i < scrollSubs.length; i++) {
      try { scrollSubs[i](scrollTop()); } catch (e) {}
    }
  }

  function bindScroll() {
    if (scrollBound) return;
    scrollBound = true;
    /* capture also catches nested scrolling hosts */
    window.addEventListener("scroll", wakeSubscribers, { passive: true });
    document.addEventListener("scroll", wakeSubscribers, { passive: true, capture: true });
  }

  function build() {
    var o = {};
    for (var k in state) if (Object.prototype.hasOwnProperty.call(state, k)) o[k] = state[k];
    o.dur = function (ms) { return Math.round(ms * (state.reducedMotion ? 0 : state.scale)); };
    o.onChange = function (fn) { if (typeof fn === "function") listeners.push(fn); return fn; };
    /* subscribers are woken by native scroll events — no polling */
    o.onScrollChange = function (fn) {
      if (typeof fn === "function") { scrollSubs.push(fn); bindScroll(); }
      return fn;
    };
    o.scrollTop = scrollTop;
    return o;
  }

  measure();
  window.TA_LAYOUT = build();

  /* the first measurement can land before the real viewport settles, so re-measure */
  [0, 150, 500, 1200].forEach(function (d) { setTimeout(update, d); });
  try {
    if (window.ResizeObserver) {
      new ResizeObserver(update).observe(document.documentElement);
    }
  } catch (e) {}

  window.addEventListener("resize", update, { passive:true });
  window.addEventListener("orientationchange", update);
  try {
    window.matchMedia("(hover:hover) and (pointer:fine)").addEventListener("change", update);
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", update);
  } catch (e) {}
  /* font metrics change line breaks, which changes scroll geometry */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
})();
