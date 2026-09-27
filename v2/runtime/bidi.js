/* Tarh & Afarinesh — BIDI HELPERS (V2)
   Pairs with Layer 4 of tokens-v2.css. Decides which utility a string needs, and
   splits a string so its numbers (and, in Persian, its Latin runs) are isolated.

   The rule that matters: a string is an LTR island ONLY if it contains no Persian
   script at all. "SBID جایزه بین‌المللی طراحی" starts with Latin but is a Persian
   sentence, so it stays rtl — first-strong-character detection (dir="auto") gets
   this wrong, which is why it is not used. */
(function () {
  var PERSIAN = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
  var LATIN = /[A-Za-z]/;
  var NUMERIC = /^[\s\d\u06F0-\u06F9.,:%+\-–—/×m²]+$/;
  /* a number run: 2015 · 2014–2026 · 01 · 12,500 m² · ۰۱ */
  var NUM_RUN = /[\d\u06F0-\u06F9]+(?:[.,:/–\-][\d\u06F0-\u06F9]+)*(?:\s?m²)?/g;
  /* a Latin run inside Persian: SBID · Hotel Asia · UNStudio · International Hotel & Property Awards */
  var LATIN_RUN = /[A-Za-z][A-Za-z0-9&.'’\-]*(?:\s+[A-Za-z0-9&][A-Za-z0-9&.'’\-]*)*/g;

  function hasPersian(s) { return PERSIAN.test(String(s || "")); }
  function isLatinOnly(s) { s = String(s || ""); return LATIN.test(s) && !PERSIAN.test(s); }
  function isNumeric(s) { s = String(s || ""); return /[\d\u06F0-\u06F9]/.test(s) && NUMERIC.test(s); }
  /* actual Persian-digit characters need Vazirmatn's own glyphs, not Latin metrics */
  function numCls(s) { return /[\u06F0-\u06F9]/.test(String(s || "")) ? "text-number-fa" : "text-number"; }

  /* split one string into [{ t, cls }] — cls is a Layer 4 utility or "" */
  function parts(s, lang) {
    s = String(s == null ? "" : s);
    if (!s) return [];
    var marks = [];
    s.replace(NUM_RUN, function (m, i) { marks.push({ a: i, b: i + m.length, cls: numCls(m) }); return m; });
    if (lang === "fa" && hasPersian(s)) {
      s.replace(LATIN_RUN, function (m, i) {
        var overlaps = marks.some(function (k) { return i < k.b && i + m.length > k.a; });
        if (!overlaps) marks.push({ a: i, b: i + m.length, cls: "text-ltr" });
        return m;
      });
    }
    marks.sort(function (x, y) { return x.a - y.a; });
    var out = [], at = 0;
    marks.forEach(function (k) {
      if (k.a < at) return;
      if (k.a > at) out.push({ t: s.slice(at, k.a), cls: "" });
      out.push({ t: s.slice(k.a, k.b), cls: k.cls });
      at = k.b;
    });
    if (at < s.length) out.push({ t: s.slice(at), cls: "" });
    return out;
  }

  window.TA_BIDI = {
    hasPersian: hasPersian, isLatinOnly: isLatinOnly, isNumeric: isNumeric, numCls: numCls, parts: parts,
    /* the utility a whole string needs inside the given page language */
    cls: function (s, lang) {
      if (isNumeric(s)) return numCls(s);
      if (lang === "fa" && isLatinOnly(s)) return "text-ltr";
      return "text-mixed";
    },
    /* a year range, en dash — render through .text-number */
    range: function (a, b) {
      if (a == null || b == null) return a != null ? String(a) : (b != null ? String(b) : "");
      return String(a) === String(b) ? String(a) : String(a) + "–" + String(b);
    }
  };
})();
