/* Tarh & Afarinesh — V2 CONTEXTUAL CURSOR
   ONE shared engine for the whole page: a single DOM element, a single pointermove
   listener, active only when the environment is fine-pointer + hover-capable. Disabled
   entirely on touch/coarse pointers — no invisible cursor logic wasting work there.

   Usage: data-v2-cursor="explore|view|read|open|next|<custom-key>" on any element.
   The circle appears, scales 0.7→1, shows the label from window.TA_UI_V2's cursor
   labels (see ui-strings.js) — falls back to the attribute value itself if no label
   exists, so a page can use a one-off key without editing the shared list.

   Never attaches a listener per target — delegates one pointermove/pointerover/pointerout
   on the document. Never intercepts clicks (pointer-events:none). Never covers a form
   control (guarded by tag name at hit time, in addition to a page simply not tagging
   inputs). aria-hidden, never focusable — purely supplementary; every target must remain
   understandable through its own visible text/label/focus state (Design Contract). */
(function () {
  if (window.TA_CURSOR) return;

  var fine = window.matchMedia("(hover:hover) and (pointer:fine)");
  var reduced = window.matchMedia("(prefers-reduced-motion:reduce)");
  var SKIP_TAGS = { INPUT:1, TEXTAREA:1, SELECT:1, OPTION:1 };

  var el = null, labelEl = null;
  var cx = 0, cy = 0, tx = 0, ty = 0, active = null, raf = null, bound = false, positioned = false;

  function ensureEl() {
    if (el) return;
    el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.cssText = "position:fixed;left:0;top:0;z-index:130;width:var(--c-cursor-size,76px);height:var(--c-cursor-size,76px);"
      + "border-radius:50%;background:var(--turq);color:var(--ink);display:grid;place-items:center;"
      + "font-size:11px;letter-spacing:.08em;text-transform:uppercase;pointer-events:none;"
      + "opacity:0;transform:translate(-50%,-50%) scale(.7);"
      + "transition:opacity var(--m-fast) var(--e-smooth),transform var(--m-fast) var(--e-smooth)";
    labelEl = document.createElement("span");
    el.appendChild(labelEl);
    document.body.appendChild(el);
  }

  function labelFor(key, t) {
    var U = window.TA_UI_V2;
    /* language lives on each page's own [data-v2-shell] root (dir="rtl"/"ltr"), never on
       <html> \u2014 resolve from the actual hovered element's ancestry, not documentElement,
       or FA pages always read as EN. */
    var shell = t && t.closest ? t.closest("[dir]") : null;
    var lang = shell ? (shell.getAttribute("dir") === "rtl" ? "fa" : "en")
      : (document.documentElement.getAttribute("dir") === "rtl" ? "fa" : "en");
    if (U && U.cursorLabel) return U.cursorLabel(key, lang);
    return key;
  }

  function targetFor(node) {
    var t = node && node.closest ? node.closest("[data-v2-cursor]") : null;
    if (!t) return null;
    if (SKIP_TAGS[t.tagName] || t.isContentEditable) return null;
    return t;
  }

  function show(t) {
    ensureEl();
    labelEl.textContent = labelFor(t.getAttribute("data-v2-cursor"), t);
    el.style.opacity = "1";
    el.style.transform = "translate(-50%,-50%) scale(1)";
    /* native arrow hidden only over this specific eligible target, never globally \u2014 and
       never over a form control even if one is nested inside an eligible zone */
    if (!SKIP_TAGS[t.tagName] && !t.isContentEditable) t.style.cursor = "none";
  }
  function hide(prev) {
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translate(-50%,-50%) scale(.7)";
    if (prev) prev.style.cursor = "";
  }

  /* setTimeout, not requestAnimationFrame \u2014 confirmed (Projects V2.2) that rAF does not
     reliably fire in this preview environment (backgrounded/occluded iframe), which would
     silently freeze the follow entirely. A short fixed interval still reads as smooth
     tracking and never runs while inactive (cleared in unbind). */
  function tick() {
    raf = null;
    var k = reduced.matches ? 1 : 0.22;
    cx += (tx - cx) * k; cy += (ty - cy) * k;
    if (el) { el.style.left = cx.toFixed(1) + "px"; el.style.top = cy.toFixed(1) + "px"; }
    if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) raf = setTimeout(tick, 16);
  }
  function wake() { if (!raf) raf = setTimeout(tick, 16); }

  function onMove(e) {
    tx = e.clientX; ty = e.clientY;
    /* first-ever activation: snap the current position to the pointer BEFORE the circle
       can become visible, so it never visibly flies in from a stale (or 0,0) coordinate.
       `bound` alone doesn't gate this correctly — bind() sets it true before any
       pointermove has actually landed, so the original `if(!bound)` check never fired. */
    if (!positioned) { cx = tx; cy = ty; positioned = true; }
    wake();
    var t = targetFor(e.target);
    if (t !== active) { var prev = active; active = t; if (t) show(t); else hide(prev); }
  }
  function onLeaveDoc() { var prev = active; active = null; hide(prev); }

  function bind() {
    if (bound) return;
    bound = true;
    document.addEventListener("pointermove", onMove, { passive:true });
    document.addEventListener("pointerleave", onLeaveDoc);
  }
  function unbind() {
    if (!bound) return;
    bound = false;
    positioned = false;
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerleave", onLeaveDoc);
    var prev = active; active = null; hide(prev);
    if (raf) { clearTimeout(raf); raf = null; }
  }
  function sync() { if (fine.matches) bind(); else unbind(); }

  fine.addEventListener("change", sync);
  sync();

  window.TA_CURSOR = { bind:bind, unbind:unbind };
})();
