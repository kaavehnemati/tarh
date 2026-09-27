/* Tarh & Afarinesh — V2 CROSS-PAGE CURTAIN (CONTINUITY)
   Smooths navigation between V2 pages. Same architecture as V1: standalone
   documents, plain <a href> full reloads — no SPA router, no View Transitions API.
   The "transition" is a two-part curtain (CSS in base-v2.css, --e-page grammar):

     ARRIVAL  — data-pt-boot is set on <html> synchronously below (before first
                paint, exactly as reveal.js sets data-reveal-boot), so the arrival
                curtain covers the boot/mount flash, then wipes up and off. Pure
                CSS; this file only sets the attribute. If this script never runs,
                no attribute is set, no curtain exists, content is fully visible —
                progressive enhancement.
     DEPARTURE — one delegated click listener catches internal .dc.html links,
                 sets data-pt-leaving (curtain rises to cover), then hands off to a
                 real navigation after the wipe, mirroring V1's
                 window.location.href-after-setTimeout model.

   Reduced motion bypasses the whole thing: the CSS hides both curtain halves, and
   the click handler does not preventDefault, so links navigate natively/instantly.

   Operates only on document / documentElement (outside React's #dc-root), so it
   survives the DC runtime's mount and re-renders. */
(function () {
  if (window.TA_PAGE_TX) return;

  var docEl = document.documentElement;
  // Arrival curtain — apply before first paint (mirrors reveal.js's data-reveal-boot).
  docEl.setAttribute("data-pt-boot", "1");
  // Never start a fresh page mid-departure (e.g. bfcache restore, see pageshow below).
  docEl.removeAttribute("data-pt-leaving");

  var reduced = window.matchMedia("(prefers-reduced-motion:reduce)");

  // Keep the JS hand-off in sync with the CSS departure wipe (--m-reveal) instead of
  // hardcoding the duration twice. Falls back to 620ms if the token can't be read.
  function exitDuration() {
    var v = getComputedStyle(docEl).getPropertyValue("--m-reveal").trim();
    var ms = parseFloat(v);
    if (!ms) return 620;
    return /ms/.test(v) ? ms : ms * 1000; // token is authored in ms, but tolerate s
  }

  function isInternalPage(a) {
    // Same-origin link to another .dc.html page, on a DIFFERENT path than the
    // current one — so same-page hash links (href="#", filters, the current-page
    // nav item) never trigger a curtain.
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return false;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#") return false;
    var url;
    try { url = new URL(a.href, window.location.href); } catch (e) { return false; }
    if (url.origin !== window.location.origin) return false;
    if (!/\.dc\.html$/i.test(url.pathname)) return false;
    if (url.pathname === window.location.pathname) return false; // only the hash differs
    return url;
  }

  var navigating = false;

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var url = isInternalPage(a);
    if (!url) return;
    // Under reduced motion, let the browser navigate natively (no preventDefault).
    if (reduced.matches) return;
    if (navigating) { e.preventDefault(); return; }

    e.preventDefault();
    navigating = true;
    docEl.setAttribute("data-pt-leaving", "1");
    var dest = url.href;
    window.setTimeout(function () { window.location.href = dest; }, exitDuration());
  }, false);

  // Back/forward: a page restored from bfcache would otherwise reappear stuck under
  // its departure curtain. Clear the state (and the guard) when it is shown again.
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      navigating = false;
      docEl.removeAttribute("data-pt-leaving");
    }
  });

  window.TA_PAGE_TX = {
    /* Programmatic navigation with the same curtain (for a page's own JS links). */
    go: function (href) {
      if (reduced.matches) { window.location.href = href; return; }
      if (navigating) return;
      navigating = true;
      docEl.setAttribute("data-pt-leaving", "1");
      window.setTimeout(function () { window.location.href = href; }, exitDuration());
    }
  };
})();
