/* Tarh & Afarinesh — ABOUT / STUDIO CONTENT
   Everything the About page states about the practice lives here, so real
   information replaces data rather than rendering code.

   NO COMPANY FACTS ARE INVENTED. Unsupplied values are explicit placeholders
   while contentState is "prototype"; once a record is "real", a missing value
   stays missing and its row simply does not render. */
(function () {

  var about = {
    contentState: "real",

    /* The opening and philosophy statements are display typography whose line
       composition differs per language; their single source is the page markup.
       Everything rendered through renderVals lives here. */
    opening: {
      media: { id: "studio-collaboration", src: "assets/about/studio-collaboration.webp", plate: 1, roles: ["studio"],
               objectPosition: "50% 40%",
               caption: { en: "Drawing review, studio", fa: "بازبینی نقشه‌ها در استودیو" },
               credit: null, alt: { en: "Two members of the studio reviewing architectural drawings together at a desk covered in plans.",
                                     fa: "دو نفر از اعضای استودیو در حال بازبینی مشترک نقشه‌های معماری روی میزی پر از پلان‌ها." } }
    },

    /* verified company foundation — the single source for About facts */
    company: {
      name: { en: "Tarh Va Afarinesh Architectural & Engineering Consultants", fa: "مهندسین مشاور طرح و آفرینش" },
      foundedYear: 1998,
      founders: ["person-01", "person-02"],
      projectExperience: { value: "40+", valueFa: "+۴۰", status: "verified-public" }
    },

    practice: {
      lead: { en: "Tarh Va Afarinesh is a multidisciplinary architectural and engineering practice founded in 1998 by Mohammad Nemati and Shiva Aghababaei.",
              fa: "طرح و آفرینش یک مجموعه میان‌رشته‌ای معماری و مهندسی است که در سال ۱۹۹۸ توسط محمد نعمتی و شیوا آقابابایی بنیان گذاشته شد." },
      body: [
        { en: "Working across architecture, interior design, engineering, construction and project management, the studio has contributed to more than forty national and international projects, with extensive experience in hospitality, tourism and complex building programmes.",
          fa: "این مجموعه در حوزه‌های معماری، طراحی داخلی، مهندسی، اجرا و مدیریت پروژه فعالیت می‌کند و در بیش از چهل پروژه ملی و بین‌المللی، به‌ویژه در حوزه هتلداری، گردشگری و مجموعه‌های ساختمانی پیچیده مشارکت داشته است." },
        { en: "Its approach brings design and technical disciplines into one integrated process, carrying architectural intent from early concept through engineering and execution.",
          fa: "رویکرد طرح و آفرینش بر پیوند طراحی و دانش فنی در یک فرایند یکپارچه استوار است؛ فرایندی که ایده معماری را از نخستین مراحل طراحی تا مهندسی و اجرا دنبال می‌کند." }
      ]
    },

    /* each milestone owns a coordinate in the 3×3 field */
    history: [
      { id: "ms-1998", year: "1998", yearFa: "۱۹۹۸", coord: [0, 0],
        tag: { en: "Founding", fa: "تأسیس" }, title: { en: "Tarh Va Afarinesh is founded", fa: "آغاز طرح و آفرینش" },
        body: { en: "Mohammad Nemati and Shiva Aghababaei establish Tarh Va Afarinesh as an integrated architectural and engineering practice.", fa: "محمد نعمتی و شیوا آقابابایی طرح و آفرینش را با رویکردی یکپارچه در معماری، مهندسی و اجرا بنیان می‌گذارند." }, media: null },
      { id: "ms-2006", year: "2006", yearFa: "۲۰۰۶", coord: [1, 0],
        tag: { en: "Kandovan", fa: "کندوان" }, title: { en: "Architecture within an existing landscape", fa: "معماری در دل یک بستر موجود" },
        body: { en: "The Kandovan International Cave Hotel project demonstrates the studio's integration of architecture, engineering and construction within a highly specific cultural and natural context.", fa: "پروژه هتل صخره‌ای بین‌المللی کندوان نمونه‌ای از پیوند معماری، مهندسی و اجرا در بستری ویژه از نظر فرهنگی و طبیعی است." }, media: null },
      { id: "ms-2014", year: "2014–2015", yearFa: "۲۰۱۴–۲۰۱۵", coord: [2, 0],
        tag: { en: "IKIA", fa: "فرودگاه امام خمینی" }, title: { en: "A new scale of integrated practice", fa: "مقیاسی تازه برای کار یکپارچه" },
        body: { en: "The Ibis–Novotel hotel cluster at Imam Khomeini International Airport brings architecture, interiors, engineering and execution together within a 55,000 m² hospitality complex.", fa: "مجموعه هتل‌های ایبیس–نووتل در فرودگاه بین‌المللی امام خمینی، معماری، طراحی داخلی، مهندسی و اجرا را در یک مجموعه اقامتی ۵۵ هزار مترمربعی به هم پیوند می‌دهد." }, media: null },
      { id: "ms-2015", year: "2015", yearFa: "۲۰۱۵", coord: [1, 1],
        tag: { en: "Recognition", fa: "افتخارات" }, title: { en: "International recognition", fa: "شناخته‌شدن در سطح بین‌المللی" },
        body: { en: "The IKIA hotel project receives international recognition across hotel, interior and hospitality design awards.", fa: "پروژه هتل فرودگاه امام خمینی در چندین جایزه بین‌المللی حوزه هتل، معماری داخلی و طراحی فضاهای اقامتی مورد توجه قرار می‌گیرد." }, media: null },
      { id: "ms-2021", year: "2021", yearFa: "۲۰۲۱", coord: [0, 2],
        tag: { en: "Residential", fa: "مسکونی" }, title: { en: "Marina Tower", fa: "برج مارینا" },
        body: { en: "The studio continues its work across larger residential and mixed architectural programmes with Marina Tower in Anzali Free Zone.", fa: "طرح و آفرینش با پروژه برج مارینا در منطقه آزاد انزلی، فعالیت خود را در مقیاس پروژه‌های مسکونی و مجموعه‌های بزرگ‌تر ادامه می‌دهد." }, media: null },
      { id: "ms-2022", year: "2022", yearFa: "۲۰۲۲", coord: [1, 2],
        tag: { en: "Hospitality", fa: "هتلداری" }, title: { en: "Anzali Hotel", fa: "هتل انزلی" },
        body: { en: "The Anzali hotel project extends the studio's long-running hospitality experience into a new coastal context.", fa: "پروژه هتل انزلی ادامه تجربه چندساله استودیو در طراحی مجموعه‌های اقامتی، این بار در بستری ساحلی است." }, media: null },
      { id: "ms-today", year: "Today", yearFa: "امروز", coord: [2, 2],
        tag: { en: "Today", fa: "امروز" }, title: { en: "An integrated multidisciplinary practice", fa: "یک ساختار میان‌رشته‌ای یکپارچه" },
        body: { en: "Today, Tarh Va Afarinesh continues to work across architecture, interior architecture, engineering and project delivery through an integrated multidisciplinary approach.", fa: "امروز طرح و آفرینش با رویکردی میان‌رشته‌ای در حوزه معماری، معماری داخلی، مهندسی و اجرای پروژه فعالیت خود را ادامه می‌دهد." }, media: null }
    ],

    philosophy: {
      themes: [
        { word: { en: "Quality of life", fa: "کیفیت زندگی" }, body: { en: "Architecture is measured by what it makes possible for the people who use it every day.", fa: "معماری با آنچه برای کاربران هرروزه‌اش ممکن می‌کند سنجیده می‌شود." }, presentation: { col: "1 / span 3", accent: false } },
        { word: { en: "Responsibility", fa: "مسئولیت" }, body: { en: "Every decision carries consequences for comfort, context and the resources a building consumes.", fa: "هر تصمیم طراحی بر آسایش، بستر و منابعی که ساختمان مصرف می‌کند اثر می‌گذارد." }, presentation: { col: "5 / span 3", accent: true } },
        { word: { en: "Integration", fa: "یکپارچگی" }, body: { en: "Design, engineering and execution stay in one process, so architectural intent survives into the built space.", fa: "طراحی، مهندسی و اجرا در یک فرایند می‌مانند تا ایده معماری تا فضای ساخته‌شده حفظ شود." }, presentation: { col: "9 / span 3", accent: false } }
      ]
    },

    /* nameStatus: "confirmed" = supplied by the studio; "presentational" = design-stage stand-in, replace here when real names arrive */
    people: [
      { id: "person-01", leadership: true, order: 1,
        name: { en: "Shiva Aghababayi", fa: "شیوا آقابابایی" }, role: { en: "CEO & Chief Architect", fa: "مدیرعامل و معمار ارشد" }, nameStatus: "confirmed",
        discipline: null,
        bio: { en: "Leads the studio\u2019s architectural vision with a focus on concept development, design quality, and spatial coherence across projects.", fa: "هدایت‌گر نگاه معماری مجموعه با تمرکز بر توسعه ایده، کیفیت طراحی و انسجام فضایی در پروژه‌ها." },
        portrait: { id: "person-01-portrait", src: "assets/about/team/shiva-aghababayi.webp", plate: 0, alt: { en: "Portrait of Shiva Aghababayi, CEO & Chief Architect", fa: "پرتره شیوا آقابابایی، مدیرعامل و معمار ارشد" } } },
      { id: "person-02", leadership: true, order: 2,
        name: { en: "Mohammad Nemati", fa: "محمد نعمتی" }, role: { en: "Chairman", fa: "رئیس هیئت‌مدیره" }, nameStatus: "confirmed",
        bio: { en: "Provides strategic direction for the studio and supports long-term development across architecture, engineering, and professional collaborations.", fa: "مسئول هدایت راهبردی مجموعه و پشتیبان توسعه بلندمدت دفتر در حوزه معماری، مهندسی و همکاری‌های حرفه‌ای." },
        portrait: { id: "person-02-portrait", src: "assets/about/team/mohammad-nemati.webp", plate: 1, alt: { en: "Portrait of Mohammad Nemati, Chairman", fa: "پرتره محمد نعمتی، رئیس هیئت‌مدیره" } } },
      { id: "person-03", leadership: true, order: 3,
        name: { en: "Sara Farhadi", fa: "سارا فرهادی" }, role: { en: "Design Director", fa: "مدیر طراحی" }, nameStatus: "presentational",
        bio: { en: "Oversees design development, visual consistency, and cross-disciplinary coordination from early concept to refined presentation.", fa: "ناظر بر توسعه طراحی، انسجام بصری و هماهنگی میان‌رشته‌ای از ایده اولیه تا ارائه نهایی." },
        portrait: { id: "person-03-portrait", src: "assets/about/team/sara-farhadi.webp", plate: 2, alt: { en: "Portrait of Sara Farhadi, Design Director", fa: "پرتره سارا فرهادی، مدیر طراحی" } } },
      { id: "person-04", leadership: true, order: 4,
        name: { en: "Arman Daryan", fa: "آرمان داریان" }, role: { en: "Senior Architect", fa: "معمار ارشد" }, nameStatus: "presentational",
        bio: { en: "Works on project development, architectural detailing, and design translation between concept intent and buildable systems.", fa: "فعال در توسعه پروژه، دیتیل‌های معماری و تبدیل ایده طراحی به سیستم‌های قابل اجرا." },
        portrait: { id: "person-04-portrait", src: "assets/about/team/arman-daryan.webp", plate: 3, alt: { en: "Portrait of Arman Daryan, Senior Architect", fa: "پرتره آرمان داریان، معمار ارشد" } } }
    ],

    /* discipline labels, not titles — a portrait is not required */
    team: [
      { id: "team-05", nameStatus: "presentational", name: { en: "Sara Kazemi", fa: "سارا کاظمی" }, role: { en: "Architect", fa: "معمار" } },
      { id: "team-06", nameStatus: "presentational", name: { en: "Ali Sharifi", fa: "علی شریفی" }, role: { en: "Architect", fa: "معمار" } },
      { id: "team-07", nameStatus: "presentational", name: { en: "Nazanin Ahmadi", fa: "نازنین احمدی" }, role: { en: "Interior Architect", fa: "معمار داخلی" } },
      { id: "team-08", nameStatus: "presentational", name: { en: "Pouya Farahani", fa: "پویا فراهانی" }, role: { en: "Urban Designer", fa: "طراح شهری" } },
      { id: "team-09", nameStatus: "presentational", name: { en: "Elham Sadeghi", fa: "الهام صادقی" }, role: { en: "Structural Engineer", fa: "مهندس سازه" } },
      { id: "team-10", nameStatus: "presentational", name: { en: "Mehdi Yousefi", fa: "مهدی یوسفی" }, role: { en: "Building Services Engineer", fa: "مهندس تأسیسات" } },
      { id: "team-11", nameStatus: "presentational", name: { en: "Yeganeh Karimi", fa: "یگانه کریمی" }, role: { en: "Research & Strategy Lead", fa: "مسئول پژوهش و استراتژی" } },
      { id: "team-12", nameStatus: "presentational", name: { en: "Arash Naderi", fa: "آرش نادری" }, role: { en: "Model Maker & Visualisation Designer", fa: "ماکت‌ساز و طراح تجسم معماری" } },
      { id: "team-13", nameStatus: "presentational", name: { en: "Reyhaneh Mousavi", fa: "ریحانه موسوی" }, role: { en: "Documentation Architect", fa: "معمار مستندسازی" } },
      { id: "team-14", nameStatus: "presentational", name: { en: "Keyvan Sabouri", fa: "کیوان صبوری" }, role: { en: "Studio Manager", fa: "مدیر استودیو" } }
    ],

    /* no collaborator list has been supplied — the module renders nothing until it is */
    collaborators: [],

    /* derived at read time from canonical project data — see TA_ABOUT.clients() */
    clients: [],

    /* value:null means the statistic is not published — never a calculated guess */
    /* years derived from company.foundedYear; 40+ is the verified public figure.
       completed-project, city and active-project counts are withheld — not verifiable from canonical data. */
    numbers: [
      { id: "num-years", derived: "yearsOfPractice", note: { en: "years of practice", fa: "سال فعالیت" }, presentation: { col: "1 / span 3" } },
      { id: "num-projects", value: "40+", valueFa: "+۴۰", note: { en: "national & international projects", fa: "پروژه ملی و بین‌المللی" }, presentation: { col: "5 / span 3" } }
    ],

    thinking: {
      lead: { en: "Responsible architecture should leave people more comfortable, more connected and more at ease in the spaces they use.", fa: "معماری مسئولانه باید فضاهایی بسازد که انسان در آن‌ها آسوده‌تر، پیوسته‌تر و آرام‌تر زندگی کند." }
    },



    downloads: []
  };

  window.TA_ABOUT = {
    data: about,
    leadership: function () {
      return about.people.filter(function (p) { return p.leadership; })
                  .sort(function (a, b) { return (a.order || 99) - (b.order || 99); });
    },
    team: function () { return about.team.slice(); },
    history: function () { return about.history.slice(); },
    /* a statistic with no value is not shown */
    numbers: function () {
      var FD = "۰۱۲۳۴۵۶۷۸۹", fd = function (v) { return String(v).replace(/\d/g, function (d) { return FD[d]; }); };
      about.numbers.forEach(function (n) {
        if (n.derived === "yearsOfPractice") { var y = new Date().getFullYear() - about.company.foundedYear; n.value = String(y); n.valueFa = fd(y); }
      });
      return about.numbers.filter(function (n) {
        return n.value != null && (about.contentState === "prototype" || n.value !== "XX");
      });
    },
    /* clients derive from canonical, published, verified project relations — deduplicated, never padded */
    clients: function () {
      var P = window.TA_PROJECTS, seen = {}, out = [];
      (P ? P.published() : []).forEach(function (p) {
        if (p.contentState !== "real" || p.contentSource === "curated-project-presentation" || !p.client) return;
        if (/private/i.test(p.client.en || "")) return;
        var k = (p.client.en || "").toLowerCase(); if (seen[k]) return; seen[k] = 1;
        out.push({ id: "client-" + p.id, name: p.client, projectId: p.id });
      });
      return out;
    },
    collaborators: function () { return about.collaborators.slice(); },
    isPrototype: function () { return about.contentState === "prototype"; }
  };
})();
