/* Tarh & Afarinesh — recognition dataset.
   Single source for both Awards.dc.html (archive) and About.dc.html (selected recognition).
   These 8 records are the client's real, confirmed awards, each represented by its own
   award-object photograph (no ceremony/people photography, no project-linked media).
   image is a project-relative path to that award's studio photograph. */
(function () {
  var A = [
    { id:"a19-uk", year:"2019", name:"UK Role Model", nameFa:"الگوی برتر بریتانیا",
      award:"UK Construction Week Role Model", awardFa:"برنامه الگوهای برتر هفته ساخت‌وساز بریتانیا",
      cat:"Recognition", level:"Class of 2019", featured:true,
      image:"assets/awards/06-uk-construction-week-role-model-2019.webp" },

    { id:"a15-sbid", year:"2015", name:"SBID Awards", nameFa:"جوایز SBID",
      award:"SBID International Design Awards", awardFa:"جوایز بین‌المللی طراحی SBID",
      cat:"Best Hotel Design", level:"Winner", featured:true,
      image:"assets/awards/01-sbid-international-design-awards-2015.webp" },
    { id:"a15-mena", year:"2015", name:"MENA Awards", nameFa:"جوایز MENA",
      award:"MENA Interior Design & Architecture Awards", awardFa:"جوایز معماری و طراحی داخلی خاورمیانه و شمال آفریقا (MENA)",
      cat:"Recognition", level:"2015", featured:true,
      image:"assets/awards/02-mena-interior-design-architecture-awards-2015.webp" },
    { id:"a15-adesign", year:"2015", name:"A’ Design Award", nameFa:"جایزه A’ Design",
      award:"A’ Design Award", awardFa:"جایزه بین‌المللی طراحی A’",
      cat:"Recognition", level:"Selected",
      image:"assets/awards/04-a-design-award.webp" },

    { id:"a14-mena", year:"2014", name:"MENA Awards", nameFa:"جوایز MENA",
      award:"MENA Interior Design & Architecture Awards", awardFa:"جوایز معماری و طراحی داخلی خاورمیانه و شمال آفریقا (MENA)",
      cat:"Best Hospitality Project", level:"2014",
      image:"assets/awards/03-mena-best-hospitality-project-2014.webp" },
    { id:"a14-2a", year:"2014", name:"2A Awards", nameFa:"جوایز 2A",
      award:"2A Continental Architectural Awards", awardFa:"جوایز معماری قاره‌ای 2A",
      cat:"Recognition", level:"Selected",
      image:"assets/awards/05-2a-continental-architectural-awards.webp" },
    { id:"a14-venice", year:"2014", name:"Venice Biennale", nameFa:"دوسالانه ونیز",
      award:"La Biennale di Venezia", awardFa:"دوسالانه ونیز",
      cat:"Recognition", level:"Participation",
      image:"assets/awards/07-venice-biennale-recognition.webp" },

    { id:"a1387-national", year:"1387", name:"National Trophy", nameFa:"تندیس ملی",
      award:"National Tourism Recognition", awardFa:"تقدیر ملی گردشگری",
      cat:"National Recognition", level:"Awarded",
      image:"assets/awards/08-national-tourism-recognition-1387.webp" }
  ];

  var CAT = {
    "Best Hotel Design":["Best Hotel Design","بهترین طراحی هتل"],
    "Best Hospitality Project":["Best Hospitality Project","بهترین پروژه مهمان‌پذیری"],
    "National Recognition":["National Recognition","تقدیر ملی"],
    Recognition:["Recognition","تقدیر"]
  };
  var LEVEL = {
    Winner:["Winner","برگزیده"], Selected:["Selected","منتخب"], Participation:["Participation","حضور"],
    Awarded:["Awarded","اعطا شده"], "Class of 2019":["Class of 2019","دوره ۲۰۱۹"],
    "2015":["2015","۲۰۱۵"], "2014":["2014","۲۰۱۴"]
  };
  var SCOPE = { studio:["Studio","استودیو"] };

  window.TA_AWARDS = {
    awards:A, categories:CAT, levels:LEVEL, scopes:SCOPE,

    project: function (projectId) {
      var D = window.TA_PROJECTS;
      if (!D || !projectId) return null;
      var c = D.byId(projectId);
      if (!c || c.published !== true) return null;
      var vis = D.visual(c.id, "archive", "archive");
      return { id: c.id, routeIndex: c.legacyIndex, en: c.title.en, fa: c.title.fa,
               locEn: c.location ? c.location.en : null, locFa: c.location ? c.location.fa : null,
               year: c.year, plate: vis.plate,
               background: vis.backgroundImage, backgroundSize: vis.backgroundSize,
               backgroundPosition: vis.backgroundPosition, backgroundRepeat: vis.backgroundRepeat,
               isRealMedia: vis.isRealMedia };
    },
    years: function () {
      var out = [];
      for (var i = 0; i < A.length; i++) if (out.indexOf(A[i].year) < 0) out.push(A[i].year);
      return out;
    },
    /* explicit curation — the strongest / most recent 3 of the 8 real records */
    featured: function () { return A.filter(function (a) { return a.featured; }); },
    homepage: function () { return A.filter(function (a) { return a.featured; }).slice(0, 3); },
    forProject: function (projectId) {
      return A.filter(function (a) { return a.projectId === projectId; });
    },
    routeIndex: function (projectId) {
      var D = window.TA_PROJECTS;
      return D ? D.indexOf(projectId) : -1;
    }
  };
})();
