/* Tarh & Afarinesh — V2 REACTIVE GRID MOTIF (state helper)
   The visual mechanism already lives in tokens-v2.css — [data-motif-active="1".."9"]
   already cross-fades the turquoise cell with no JS (background/border-color transition,
   disabled under reduced motion). This file adds only what tokens-v2.css can't: ONE
   canonical, deterministic index→cell mapping, so no page invents its own arbitrary
   sequence. The motif responds to real state (selection/hover/chapter) a page already
   tracks — this never observes anything on its own (no listener, no loop).

   Path chosen once, visually balanced across the 3×3 field: 5,2,6,8,4,1,3,9,7 — starts
   at centre, then alternates edge/corner around the ring. Cycles predictably past 9. */
(function () {
  if (window.TA_MOTIF) return;
  var PATH = [5, 2, 6, 8, 4, 1, 3, 9, 7];
  window.TA_MOTIF = {
    path: PATH.slice(),
    cellForIndex: function (i) {
      if (i == null || i < 0) return 5;
      return PATH[i % PATH.length];
    }
  };
})();
