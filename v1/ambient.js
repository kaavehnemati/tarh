/* Tarh & Afarinesh — AMBIENT FIELD (V2)
   Drives the opt-in [data-ambient] atmosphere defined in tokens-v2.css.
   Fine pointer + motion allowed only; touch and reduced motion keep the static
   field. One delegated listener, one rAF loop that runs only while settling. */
(function () {
  if (window.TA_AMBIENT) return;
  var fine = window.matchMedia("(hover:hover) and (pointer:fine)");
  var still = window.matchMedia("(prefers-reduced-motion:reduce)");
  var live = function () { return fine.matches && !still.matches; };
  var lag = function () {
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--ambient-lag"));
    return v > 0 && v < 1 ? v : 0.08;
  };
  function rest(el) {
    var cs = getComputedStyle(el);
    return [parseFloat(cs.getPropertyValue("--ambient-rest-x")) || 76, parseFloat(cs.getPropertyValue("--ambient-rest-y")) || 30];
  }
  var PULL = 0.7;
  var fields = new Map();   /* el -> { cur:[x,y], tgt:[x,y] } */
  var raf = 0;

  function field(el) {
    var f = fields.get(el);
    if (!f) { var r0 = rest(el); f = { cur: r0.slice(), tgt: r0.slice(), echo: r0.slice() }; fields.set(el, f); }
    return f;
  }
  function tick() {
    raf = 0;
    var k = lag(), moving = false;
    fields.forEach(function (f, el) {
      f.cur[0] += (f.tgt[0] - f.cur[0]) * k;
      f.cur[1] += (f.tgt[1] - f.cur[1]) * k;
      /* one much weaker secondary field, trailing further behind — slow atmospheric refraction */
      f.echo[0] += (f.cur[0] - f.echo[0]) * (k * 0.4);
      f.echo[1] += (f.cur[1] - f.echo[1]) * (k * 0.4);
      if (Math.abs(f.tgt[0] - f.cur[0]) > 0.05 || Math.abs(f.tgt[1] - f.cur[1]) > 0.05 ||
          Math.abs(f.cur[0] - f.echo[0]) > 0.05 || Math.abs(f.cur[1] - f.echo[1]) > 0.05) moving = true;
      el.style.setProperty("--ax", f.cur[0].toFixed(2) + "%");
      el.style.setProperty("--ay", f.cur[1].toFixed(2) + "%");
      el.style.setProperty("--ex", f.echo[0].toFixed(2) + "%");
      el.style.setProperty("--ey", f.echo[1].toFixed(2) + "%");
    });
    if (moving) raf = requestAnimationFrame(tick);
  }
  function wake() { if (!raf) raf = requestAnimationFrame(tick); }

  document.addEventListener("pointermove", function (e) {
    if (!live()) return;
    var el = e.target && e.target.closest ? e.target.closest("[data-ambient],[data-atmosphere=\"signature\"]") : null;
    if (!el) return;
    var r = el.getBoundingClientRect();
    var f = field(el);
    var h = rest(el);
    var px = ((e.clientX - r.left) / Math.max(1, r.width)) * 100;
    var py = ((e.clientY - r.top) / Math.max(1, r.height)) * 100;
    f.tgt[0] = h[0] + (px - h[0]) * PULL;
    f.tgt[1] = h[1] + (py - h[1]) * PULL;
    wake();
  }, { passive: true });

  /* leaving a section: the field drifts home slowly, never snaps */
  document.addEventListener("pointerout", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("[data-ambient],[data-atmosphere=\"signature\"]") : null;
    if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
    var f = fields.get(el);
    if (f) { f.tgt = rest(el); wake(); }
  });

  /* losing the live condition (touch, reduced motion): return to the static field */
  function reset() {
    if (live()) return;
    fields.forEach(function (f, el) { el.style.removeProperty("--ax"); el.style.removeProperty("--ay"); el.style.removeProperty("--ex"); el.style.removeProperty("--ey"); });
    fields.clear();
  }
  fine.addEventListener("change", reset);
  still.addEventListener("change", reset);

  window.TA_AMBIENT = { live: live, fields: fields };

  /* -----------------------------------------------------------------------------
     GLOBAL PAGE-LEVEL FIELD — one continuous ambient layer for the whole page.
     Mounted once; pointer tracked in viewport space (no per-section reset), and
     opacity fades to the intensity of whichever data-ambient-zone section is
     under the reading position (IntersectionObserver, no scroll-jump math).
     ----------------------------------------------------------------------------- */
  function mountPage() {
    if (document.querySelector("[data-ambient-page]")) return;
    var el = document.createElement("div");
    el.setAttribute("data-ambient-page", "1");
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
    var pf = { cur: [76, 30], tgt: [76, 30], echo: [76, 30] };
    var praf = 0;
    function ptick() {
      praf = 0;
      var k = lag(), moving = false;
      pf.cur[0] += (pf.tgt[0] - pf.cur[0]) * k;
      pf.cur[1] += (pf.tgt[1] - pf.cur[1]) * k;
      pf.echo[0] += (pf.cur[0] - pf.echo[0]) * (k * 0.4);
      pf.echo[1] += (pf.cur[1] - pf.echo[1]) * (k * 0.4);
      if (Math.abs(pf.tgt[0] - pf.cur[0]) > 0.05 || Math.abs(pf.tgt[1] - pf.cur[1]) > 0.05 ||
          Math.abs(pf.cur[0] - pf.echo[0]) > 0.05 || Math.abs(pf.cur[1] - pf.echo[1]) > 0.05) moving = true;
      el.style.setProperty("--pax", pf.cur[0].toFixed(2) + "%");
      el.style.setProperty("--pay", pf.cur[1].toFixed(2) + "%");
      el.style.setProperty("--pex", pf.echo[0].toFixed(2) + "%");
      el.style.setProperty("--pey", pf.echo[1].toFixed(2) + "%");
      if (moving) praf = requestAnimationFrame(ptick);
    }
    function pwake() { if (!praf) praf = requestAnimationFrame(ptick); }
    window.addEventListener("pointermove", function (e) {
      if (!live()) return;
      pf.tgt[0] = (e.clientX / Math.max(1, window.innerWidth)) * 100;
      pf.tgt[1] = (e.clientY / Math.max(1, window.innerHeight)) * 100;
      pwake();
    }, { passive: true });

    /* zone opacity — the field's visibility follows whichever zoned section
       currently owns the most of the reading area; interpolated by the CSS
       transition on the element itself, so crossing a boundary never jumps */
    var ZONE = { full: 1, soft: 0.6, minimal: 0.28, off: 0 };
    var current = { el: null, ratio: 0 };
    function applyZone() {
      var z = current.el ? (current.el.getAttribute("data-ambient-zone") || "soft") : "soft";
      el.style.setProperty("--ambient-page-opacity", String(ZONE[z] != null ? ZONE[z] : ZONE.soft));
    }
    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function () {
        var best = null, ratio = 0;
        io._els.forEach(function (t) {
          var r = t.getBoundingClientRect(), vh = window.innerHeight;
          var visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
          var frac = visible / Math.max(1, Math.min(r.height, vh));
          if (frac > ratio) { ratio = frac; best = t; }
        });
        if (best) { current.el = best; current.ratio = ratio; applyZone(); }
      }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
      /* the DC template streams in after this script runs, so [data-ambient-zone]
         sections may not exist yet — observe what's there now, then re-scan on a
         short delay and once more when the whole document finishes loading, and
         keep watching for further insertions so nothing is missed permanently */
      var scan = function () {
        var found = Array.prototype.slice.call(document.querySelectorAll("[data-ambient-zone]"));
        found.forEach(function (t) { if (io._seen.indexOf(t) < 0) { io._seen.push(t); io.observe(t); } });
        io._els = io._seen;
        if (io._els.length && !current.el) { current.el = io._els[0]; applyZone(); }
      };
      io._seen = []; io._els = [];
      scan();
      setTimeout(scan, 60); setTimeout(scan, 300); setTimeout(scan, 1000);
      window.addEventListener("load", scan);
      if (window.MutationObserver) {
        new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
      }
    }
    function pReset() { if (live()) return; el.style.removeProperty("--pax"); el.style.removeProperty("--pay"); el.style.removeProperty("--pex"); el.style.removeProperty("--pey"); }
    fine.addEventListener("change", pReset);
    still.addEventListener("change", pReset);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountPage);
  else mountPage();
})();
