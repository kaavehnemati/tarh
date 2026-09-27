/* Tarh & Afarinesh — V2 GLOBAL UI STRINGS
   Chrome vocabulary shared by every V2 page's header/menu/nav controls — the words
   that mean the same thing everywhere (Menu, Close, Filter…), never the editorial
   content of a page. A page's own copy (titles, intros, captions) stays in its own
   renderVals(); only these cross-page UI labels live here so they are translated
   once, not re-typed with the risk of drifting per page. */
(function () {
  var STR = {
    menu:     { en: "Menu",     fa: "منو" },
    close:    { en: "Close",    fa: "بستن" },
    filter:   { en: "Filter",   fa: "فیلتر" },
    reset:    { en: "Reset",    fa: "پاک کردن" },
    next:     { en: "Next",     fa: "بعدی" },
    previous: { en: "Previous", fa: "قبلی" }
  };
  /* V2 Contextual Cursor labels — separate from STR above (STR covers chrome controls;
     these are the cursor's own short verbs). Kept in one shared list so no page hardcodes
     its own translation of "EXPLORE"/"VIEW"/etc. */
  var CURSOR_STR = {
    explore: { en: "Explore", fa: "کاوش" },
    view:    { en: "View",    fa: "مشاهده" },
    read:    { en: "Read",    fa: "خواندن" },
    open:    { en: "Open",    fa: "باز کردن" },
    select:  { en: "Select",  fa: "انتخاب" },
    next:    { en: "Next",    fa: "بعدی" }
  };
  window.TA_UI_V2 = {
    t: function (key, lang) {
      var e = STR[key];
      if (!e) return key;
      return e[lang === "fa" ? "fa" : "en"];
    },
    cursorLabel: function (key, lang) {
      var e = CURSOR_STR[key];
      if (!e) return key;
      return e[lang === "fa" ? "fa" : "en"];
    }
  };
})();
