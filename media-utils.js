/* Tarh & Afarinesh — GENERIC MEDIA RESOLVER
   One place decides what a media object renders as, so a real photograph can be
   dropped into any data module and appear everywhere without template edits.

   Resolution: real src wins; the prototype plate is only a fallback.
   Position:   context+breakpoint → context → objectPosition → focalPoint → centre. */
(function () {

  /* V1/V2 COEXISTENCE — asset paths in the data modules are project-relative
     ("assets/projects/…"). A page in a subfolder (v2/pages/) sets
       window.TA_ASSET_BASE = "../../";
     before this script loads. Default is "", so every V1 page is unaffected.
     Absolute URLs, root paths and data: URIs are never prefixed. */
  function withBase(src) {
    var base = (typeof window !== "undefined" && window.TA_ASSET_BASE) || "";
    if (!base || !src || /^(?:[a-z]+:|\/|data:)/i.test(src)) return src;
    return base + src;
  }

  var PLATES = [
    "repeating-linear-gradient(-45deg,#E8E8E4 0 18px,#E1E1DC 18px 36px)",
    "repeating-linear-gradient(-45deg,#DEDED8 0 18px,#D7D7D1 18px 36px)",
    "repeating-linear-gradient(-45deg,#E4E7E6 0 18px,#DCE1E0 18px 36px)",
    "repeating-linear-gradient(-45deg,#D9EFED 0 18px,#CFE8E5 18px 36px)",
    "repeating-linear-gradient(-45deg,#1B2524 0 18px,#161F1E 18px 36px)"
  ];

  function position(m, context, breakpoint) {
    if (!m) return "50% 50%";
    /* a breakpoint-specific crop beats the generic one */
    if (breakpoint && m[breakpoint + "Position"]) return m[breakpoint + "Position"];
    if (context && m[context + "Position"]) return m[context + "Position"];
    if (m.objectPosition) return m.objectPosition;
    if (m.focalPoint) return (m.focalPoint.x * 100) + "% " + (m.focalPoint.y * 100) + "%";
    return "50% 50%";
  }

  /* one complete shorthand value, so a template can bind a single `background`
     hole. Mixing the shorthand with separate size/repeat holes silently drops
     them in the style compiler, which tiles real photography at natural size. */
  function shorthand(image, pos, size, repeat) {
    return image + " " + pos + " / " + size + " " + repeat;
  }

  function resolve(m, opt) {
    opt = opt || {};
    if (!m) {
      return { isRealMedia: false, backgroundImage: PLATES[0], backgroundSize: "auto",
               backgroundPosition: "0 0", backgroundRepeat: "repeat",
               background: shorthand(PLATES[0], "0 0", "auto", "repeat"), plate: 0,
               ratio: null, theme: "light", alt: null, caption: null, credit: null, decorative: false };
    }
    var real = !!m.src;
    var pos = position(m, opt.context, opt.breakpoint);
    var l = opt.lang || "en";
    var plate = m.plate != null ? m.plate : 0;
    var image = real ? 'url("' + withBase(m.src) + '")' : PLATES[plate % PLATES.length];
    var size = real ? (m.crop === "contain" ? "contain" : "cover") : "auto";
    var repeat = real ? "no-repeat" : "repeat";
    var at = real ? pos : "0 0";
    return {
      isRealMedia: real,
      src: m.src || null,
      /* one shape both <img>-backed and plate-backed surfaces can consume */
      backgroundImage: image,
      backgroundSize: size,
      backgroundPosition: at,
      backgroundRepeat: repeat,
      background: shorthand(image, at, size, repeat),
      objectPosition: pos,
      plate: plate,
      ratio: m.ratio || null,
      orientation: m.orientation || null,
      theme: m.theme || "light",
      alt: m.decorative ? "" : (m.alt ? (m.alt[l] || null) : null),
      caption: m.caption ? (m.caption[l] || null) : null,
      credit: m.credit || null,
      decorative: !!m.decorative
    };
  }

  window.TA_MEDIA = {
    plates: PLATES,
    plate: function (i) { return PLATES[(i || 0) % PLATES.length]; },
    resolve: resolve,
    position: position,
    /* QA: an informative asset needs alt in both languages once it is real */
    needsAlt: function (m) {
      if (!m || !m.src || m.decorative) return false;
      return !m.alt || !m.alt.en || !m.alt.fa;
    }
  };
})();
