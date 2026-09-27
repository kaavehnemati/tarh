/* Tarh & Afarinesh — CANONICAL EXPERTISE DATA
   The discipline taxonomy is data, not routing logic: rename, remove or add a
   discipline here and Expertise, the project filters and Contact all follow.
   Projects are referenced by id only — no project facts are restated.
   Prototype content until real material arrives. */
(function () {

  var E = [
    {
      id: "expertise-001", slug: "architecture", num: "01", order: 1,
      contentState: "prototype",
      title: { en: "Architecture", fa: "معماری" },
      strap: { en: "Frameworks for life, change and possibility.",
               fa: "چارچوبی برای زندگی، تغییر و امکان." },
      proposition: { en: "Architecture as a framework for life, change and possibility.",
                     fa: "معماری، چارچوبی برای زندگی، تغییر و امکان." },
      intro: { en: null, fa: null },
      capabilities: [
        { title: { en: "Concept Design", fa: "طراحی مفهومی" }, note: { en: "Proposition, massing and the first diagram.", fa: "گزاره، توده و نخستین دیاگرام." } },
        { title: { en: "Design Development", fa: "توسعه طراحی" }, note: { en: "Plan, section and envelope resolved together.", fa: "پلان، مقطع و پوسته، هم‌زمان." } },
        { title: { en: "Planning", fa: "مجوزها" }, note: { en: "Permissions, code and the negotiation around them.", fa: "ضوابط، مجوزها و مذاکره پیرامون آن‌ها." } },
        { title: { en: "Facade Strategy", fa: "راهبرد نما" }, note: { en: "Depth, shade and how the building meets light.", fa: "عمق، سایه و مواجهه ساختمان با نور." } },
        { title: { en: "Technical Coordination", fa: "هماهنگی فنی" }, note: { en: "One model, all consultants, weekly.", fa: "یک مدل، همه مشاوران، هفتگی." } },
        { title: { en: "Construction Documentation", fa: "مدارک اجرایی" }, note: { en: "Drawings that survive the site.", fa: "نقشه‌هایی که در کارگاه دوام می‌آورند." } }
      ],
      hasProcess: true,
      hasKnowledge: true,
      relatedExpertise: ["engineering", "sustainable-design", "interior-architecture"],
      selectedProjectIds: ["project-001", "project-002", "project-003", "project-004"],
      journalTags: ["architecture"],
      presentation: { coord: [1, 1], plate: 0, media: { en: "Building fragment", fa: "قطعه‌ای از ساختمان" }, drawing: false,
        registerImage: "assets/expertise/architecture/architecture-register.webp",
        heroImage: "assets/expertise/architecture/architecture-hero.webp" },
      /* real method imagery — same shared method copy (label/body), only the plate becomes a
         real photograph instead of the generic placeholder every other discipline still uses. */
      process: [
        { label: { en: "Discover", fa: "کشف" },
          body: { en: "Site, brief and constraint read together before anything is drawn. Placeholder text at working length.",
                  fa: "زمین، برنامه و محدودیت‌ها پیش از هر ترسیمی با هم خوانده می‌شوند. متن جایگزین با طول واقعی." },
          presentation: { ratio: "4/3", indent: "0%", image: "assets/expertise/architecture/architecture-discover.webp" } },
        { label: { en: "Define", fa: "تعریف" },
          body: { en: "The proposition is fixed as a diagram, and tested against programme and cost.",
                  fa: "گزاره طرح به‌صورت دیاگرام تثبیت و با برنامه و هزینه سنجیده می‌شود." },
          presentation: { ratio: "1/1", indent: "16%", image: "assets/expertise/architecture/architecture-define.webp" } },
        { label: { en: "Develop", fa: "توسعه" },
          body: { en: "Structure, envelope and services resolved in one model with consultants.",
                  fa: "سازه، پوسته و تأسیسات در یک مدل و همراه با مشاوران حل می‌شود." },
          presentation: { ratio: "16/9", indent: "6%", image: "assets/expertise/architecture/architecture-develop.webp" } },
        { label: { en: "Deliver", fa: "تحویل" },
          body: { en: "Documentation, site review and the handover to the people who use it.",
                  fa: "مدارک اجرایی، نظارت کارگاهی و تحویل به کسانی که از آن استفاده می‌کنند." },
          presentation: { ratio: "3/2", indent: "20%", image: "assets/expertise/architecture/architecture-deliver.webp" } }
      ]
    },
    {
      id: "expertise-002", slug: "interior-architecture", num: "02", order: 2,
      contentState: "prototype",
      title: { en: "Interior Architecture", fa: "معماری داخلی" },
      strap: { en: "The scale at which a building is actually used.",
               fa: "مقیاسی که ساختمان در آن زیسته می‌شود." },
      capabilities: "default",
      hasProcess: true, hasKnowledge: false,
      relatedExpertise: ["architecture", "sustainable-design"],
      selectedProjectIds: ["project-002", "project-003", "project-004"],
      presentation: { coord: [2, 2], plate: 1, media: { en: "Material detail", fa: "جزئیات مصالح" }, drawing: false,
        registerImage: "assets/expertise/interior-architecture/expertise-interior-architecture.webp" }
    },
    {
      id: "expertise-003", slug: "urban-design", num: "03", order: 3,
      contentState: "prototype",
      title: { en: "Urban Design", fa: "طراحی شهری" },
      strap: { en: "Working at the scale of the block and the street.",
               fa: "کار در مقیاس بلوک و خیابان." },
      capabilities: "default",
      hasProcess: true, hasKnowledge: false,
      relatedExpertise: ["architecture", "sustainable-design"],
      selectedProjectIds: ["project-004", "project-006"],
      presentation: { coord: [0, 0], plate: 2, media: { en: "Figure-ground study", fa: "مطالعه توده و فضا" }, drawing: true,
        registerImage: "assets/expertise/urban-design/expertise-urban-design.webp" }
    },
    {
      id: "expertise-004", slug: "engineering", num: "04", order: 4,
      contentState: "prototype",
      title: { en: "Engineering", fa: "مهندسی" },
      strap: { en: "Structure decided early, not resolved late.",
               fa: "سازه، تصمیمی آغازین است نه پایانی." },
      capabilities: [
        { title: { en: "Structural Concept", fa: "مفهوم سازه" }, note: { en: "Span, grid and material chosen with the plan.", fa: "دهانه، شبکه و مصالح، همراه با پلان." } },
        { title: { en: "Technical Coordination", fa: "هماهنگی فنی" }, note: { en: "Services routed before they become a problem.", fa: "مسیر تأسیسات، پیش از آنکه مسئله شود." } },
        { title: { en: "Documentation", fa: "مدارک" }, note: { en: "Buildable drawings and clear tolerances.", fa: "نقشه‌های قابل‌اجرا و رواداری روشن." } }
      ],
      /* deliberately lighter — proves the template leaves no dead space */
      hasProcess: false, hasKnowledge: false,
      relatedExpertise: ["architecture", "sustainable-design"],
      selectedProjectIds: ["project-003", "project-002"],
      presentation: { coord: [0, 1], plate: 1, media: { en: "Structural section", fa: "مقطع سازه" }, drawing: true, density: "light",
        registerImage: "assets/expertise/engineering/expertise-engineering.webp" }
    },
    {
      id: "expertise-005", slug: "sustainable-design", num: "05", order: 5,
      contentState: "prototype",
      title: { en: "Sustainable Design", fa: "طراحی پایدار" },
      strap: { en: "Shade, mass and reuse before technology.",
               fa: "سایه، جرم و بازاستفاده، پیش از فناوری." },
      capabilities: "default",
      hasProcess: true, hasKnowledge: false,
      relatedExpertise: ["architecture", "engineering"],
      selectedProjectIds: ["project-002", "project-003", "project-008"],
      presentation: { coord: [2, 0], plate: 3, media: { en: "Environmental model", fa: "مدل محیطی" }, drawing: false,
        registerImage: "assets/expertise/sustainable-design/expertise-sustainable-design.webp" }
    }
  ];

  /* shared capability set for disciplines that have not supplied their own */
  var DEFAULT_CAPS = [
    { title: { en: "Concept Design", fa: "طراحی مفهومی" }, note: { en: "Proposition and first diagram.", fa: "گزاره و نخستین دیاگرام." } },
    { title: { en: "Design Development", fa: "توسعه طراحی" }, note: { en: "Resolved in plan and section.", fa: "حل‌شده در پلان و مقطع." } },
    { title: { en: "Technical Coordination", fa: "هماهنگی فنی" }, note: { en: "One model with consultants.", fa: "یک مدل همراه با مشاوران." } },
    { title: { en: "Documentation", fa: "مدارک" }, note: { en: "Drawings for delivery.", fa: "مدارک برای تحویل." } }
  ];

  /* the method sequence is shared editorial content, trimmed per discipline */
  var PHASES = [
    { label: { en: "Discover", fa: "کشف" },
      body: { en: "Site, brief and constraint read together before anything is drawn. Placeholder text at working length.",
              fa: "زمین، برنامه و محدودیت‌ها پیش از هر ترسیمی با هم خوانده می‌شوند. متن جایگزین با طول واقعی." },
      presentation: { ratio: "4/3", indent: "0%", plate: 0, plateOpacity: 0 } },
    { label: { en: "Define", fa: "تعریف" },
      body: { en: "The proposition is fixed as a diagram, and tested against programme and cost.",
              fa: "گزاره طرح به‌صورت دیاگرام تثبیت و با برنامه و هزینه سنجیده می‌شود." },
      presentation: { ratio: "1/1", indent: "16%", plate: 2, plateOpacity: 0.35 } },
    { label: { en: "Develop", fa: "توسعه" },
      body: { en: "Structure, envelope and services resolved in one model with consultants.",
              fa: "سازه، پوسته و تأسیسات در یک مدل و همراه با مشاوران حل می‌شود." },
      presentation: { ratio: "16/9", indent: "6%", plate: 1, plateOpacity: 0.5 } },
    { label: { en: "Deliver", fa: "تحویل" },
      body: { en: "Documentation, site review and the handover to the people who use it.",
              fa: "مدارک اجرایی، نظارت کارگاهی و تحویل به کسانی که از آن استفاده می‌کنند." },
      presentation: { ratio: "3/2", indent: "20%", plate: 3, plateOpacity: 0.25 } }
  ];

  /* ---------------------------------------------------------------
     PROTOTYPE_DETAIL — placeholder detail copy used only by records
     whose contentState is "prototype". A real record renders only the
     values it supplies; nothing here is ever inherited by real content.
     --------------------------------------------------------------- */
  var PROTOTYPE_DETAIL = {
    lead: {
      en: "Inside Tarh & Afarinesh this discipline means deciding early and deciding together — placeholder copy at editorial density.",
      fa: "این تخصص در طرح و آفرینش به معنای تصمیم‌گیری زودهنگام و مشترک است؛ متن جایگزین برای سنجش تراکم تحریری."
    },
    body: [
      { en: "First column. Placeholder description of how the work is organised, where consultants enter, and the order in which decisions are fixed across a project.",
        fa: "بند نخست. توضیح جایگزین درباره شیوه کار، نقش مشاوران و ترتیب تصمیم‌ها در طول پروژه، با طولی واقعی تا ستون‌بندی سنجیده شود." },
      { en: "Second column. References to studies, material choices, and what changes between design and delivery on site.",
        fa: "بند دوم. ارجاع به مطالعات، مصالح و آنچه میان طراحی و اجرا تغییر می‌کند." }
    ],
    /* explicit placeholders — never presented as real counts */
    metrics: [
      { value: "XX", note: { en: "completed projects in this field", fa: "پروژه تکمیل‌شده در این حوزه" } },
      { value: "XX", note: { en: "projects currently on site", fa: "پروژه در حال اجرا" } },
      { value: "XX", note: { en: "consultant collaborations", fa: "همکاری با مشاوران" } }
    ]
  };

  var bySlug = {};
  E.forEach(function (e) {
    /* §39 — only an explicit "default" opts a record into the shared set;
       a real record with no capabilities renders none. */
    if (e.capabilities === "default") e.capabilities = DEFAULT_CAPS.slice();
    if (!e.capabilities) e.capabilities = [];
    bySlug[e.slug] = e;
  });

  window.TA_EXPERTISE = {
    all: function () { return E.slice().sort(function (a, b) { return a.order - b.order; }); },
    bySlug: function (s) { return bySlug[s] || null; },
    byIndex: function (i) { return E[i] || null; },
    indexOf: function (slug) { for (var i = 0; i < E.length; i++) if (E[i].slug === slug) return i; return -1; },
    slugs: function () { return E.map(function (e) { return e.slug; }); },
    /* projects resolve through the canonical project source, never duplicated here */
    projects: function (slug) {
      var e = bySlug[slug];
      if (!e || !window.TA_PROJECTS) return [];
      if (e.selectedProjectIds && e.selectedProjectIds.length) {
        /* an unpublished selection must never reach a public surface */
        return e.selectedProjectIds.map(function (id) { return window.TA_PROJECTS.byId(id); })
                 .filter(function (p) { return p && p.published === true; });
      }
      return window.TA_PROJECTS.forExpertise(slug);
    },
    related: function (slug) {
      var e = bySlug[slug];
      if (!e) return [];
      return (e.relatedExpertise || []).map(function (s) { return bySlug[s]; }).filter(Boolean);
    },
    next: function (slug) {
      var i = this.indexOf(slug);
      return i < 0 ? E[0] : E[(i + 1) % E.length];
    },
    phases: function (slug) {
      var e = bySlug[slug];
      if (!e || !e.hasProcess) return [];
      /* §37 — a real record supplies its own process; prototype copy is never inherited */
      if (e.contentState === "real") return e.process || [];
      if (e.process && e.process.length) return e.process;
      return (e.presentation && e.presentation.density === "light") ? PHASES.slice(0, 3) : PHASES.slice();
    },
    defaultCapabilities: DEFAULT_CAPS,
    /* internal: append a record at runtime so taxonomy growth can be smoke-tested */
    __addForTest: function (rec) { E.push(rec); bySlug[rec.slug] = rec; },
    __removeForTest: function (slug) {
      for (var i = 0; i < E.length; i++) if (E[i].slug === slug) { E.splice(i, 1); break; }
      delete bySlug[slug];
    },
    /* prototype detail copy; real records must supply their own */
    prototypeDetail: function (slug) {
      var e = bySlug[slug];
      if (!e) return null;
      return e.contentState === "prototype" ? PROTOTYPE_DETAIL : null;
    },
    /* metrics render only when explicitly supplied by a real record */
    metrics: function (slug) {
      var e = bySlug[slug];
      if (!e) return [];
      if (e.metrics && e.metrics.length) return e.metrics;
      return e.contentState === "prototype" ? PROTOTYPE_DETAIL.metrics : [];
    }
  };
})();
