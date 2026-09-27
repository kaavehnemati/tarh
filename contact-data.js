/* Tarh & Afarinesh — studio contact + inquiry model.
   Single source for Contact.dc.html and, later, the footer blocks on every other page,
   so contact information is never hard-coded twice.
   DEMO BUILD: working brand/contact data is real where confirmed; the office address is a
   polished demo-level location (city-level only — no fabricated street address). */
(function () {
  var studio = {
    email:"info@tarh-afarinesh.com", emailFa:"info@tarh-afarinesh.com",
    phone:"+98 21 88370781", phoneFa:"+98 21 88370781",
    careerEmail:"apply4job@tarh-afarinesh.com",
    website:"tarh-afarinesh.com",
    /* one office today; the component reads the array, so adding a second changes nothing else */
    offices:[
      { id:"office-01", labelEn:"Studio", labelFa:"استودیو",
        city:"Tehran, Iran", cityFa:"تهران، ایران", address:"Tehran, Iran", addressFa:"تهران، ایران",
        phone:"+98 21 88370781", email:"info@tarh-afarinesh.com", mapUrl:null, coordinates:null, directionsUrl:null }
    ],
    socials:[
      { id:"instagram", label:"Instagram", href:"https://www.instagram.com/tarh_afarinesh/" },
      { id:"linkedin", label:"LinkedIn", href:"https://ir.linkedin.com/company/tarhafarinesh" }
    ],
    hours:null /* set e.g. "[HOURS]" and the row appears; null renders nothing */
  };

  var inquiryTypes = [
    { id:"project", num:"01", en:"Start a Project", fa:"شروع یک پروژه", coord:[1,1] },
    { id:"collaboration", num:"02", en:"Professional Collaboration", fa:"همکاری حرفه‌ای", coord:[2,0] },
    { id:"media", num:"03", en:"Media & Press", fa:"رسانه و مطبوعات", coord:[0,1] },
    { id:"career", num:"04", en:"Careers", fa:"فرصت‌های شغلی", coord:[2,2] },
    { id:"general", num:"05", en:"General Inquiry", fa:"ارتباط عمومی", coord:[0,2] }
  ];

  /* Contact does not restate the taxonomy. It may narrow which disciplines are
     offered (allowedExpertise, empty = all); names resolve from TA_EXPERTISE. */
  var allowedExpertise = [];

  function expertiseOptions() {
    var E = window.TA_EXPERTISE;
    if (!E) return [];
    return E.all()
      .filter(function (e) { return !allowedExpertise.length || allowedExpertise.indexOf(e.slug) >= 0; })
      .map(function (e) { return { id: e.slug, en: e.title.en, fa: e.title.fa }; });
  }

  var stages = [
    { id:"brief", en:"Early Brief", fa:"تعریف اولیه پروژه" },
    { id:"feasibility", en:"Feasibility", fa:"امکان‌سنجی" },
    { id:"concept", en:"Concept Design", fa:"طراحی مفهومی" },
    { id:"development", en:"Design Development", fa:"توسعه طراحی" },
    { id:"technical", en:"Technical Design", fa:"طراحی فنی / فاز اجرایی" },
    { id:"delivery", en:"Construction & Delivery", fa:"اجرا و تحویل" },
    { id:"existing", en:"Existing Project / Consultation", fa:"پروژه موجود / مشاوره" },
    { id:"other", en:"Other", fa:"سایر" }
  ];

  /* which fields each inquiry activates; name/email/message are always present */
  var fieldsFor = {
    project:      ["organisation","location","expertise","stage","scale","timeline","attachment"],
    collaboration:["organisation","area","url","attachment"],
    media:        ["organisation","deadline","subject"],
    career:       ["role","url","attachment"],
    general:      ["subject"]
  };

  window.TA_CONTACT = {
    studio:studio, inquiryTypes:inquiryTypes, stages:stages, fieldsFor:fieldsFor,
    allowedExpertise: allowedExpertise,
    /* a live getter so a taxonomy rename reaches the form with no edit here */
    get expertise() { return expertiseOptions(); },
    type: function (id) {
      for (var i = 0; i < inquiryTypes.length; i++) if (inquiryTypes[i].id === id) return inquiryTypes[i];
      return null;
    },
    has: function (intent, field) { return (fieldsFor[intent] || []).indexOf(field) >= 0; }
  };
})();
