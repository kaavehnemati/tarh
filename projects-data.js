/* Tarh & Afarinesh — CANONICAL PROJECT DATA
   ONE FACT = ONE SOURCE. Homepage, Projects Archive, Project Detail, Expertise,
   Awards and Journal all resolve project identity and media from this file by id.
   No page should restate a title, location, year or image.

   Everything here is still PROTOTYPE test data (contentState:"prototype"), carried
   over verbatim from the approved prototype so the visual output is unchanged.
   Real records arrive one project at a time with contentState:"real".

   Bilingual strings use {en, fa}. Missing information is null or [] — never invented. */
(function () {

  /* ---------- media ---------------------------------------------------------
     One canonical asset per photograph. `src` is null until real photography
     arrives; `plate` is the prototype fallback the pages already render.
     `roles` lets one file serve hero/archive/homepage without duplication.
     Crop resolution order: context position → objectPosition → focalPoint → centre. */
  function media(o) {
    return {
      id: o.id,
      src: o.src || null,
      plate: o.plate != null ? o.plate : 0,
      type: o.type || "image",
      roles: o.roles || [],
      width: o.width || null,
      height: o.height || null,
      ratio: o.ratio || null,
      orientation: o.orientation || null,
      /* the generic resolver reads both: crop chooses cover/contain, decorative
         means the asset is intentionally alt-free */
      crop: o.crop || null,
      decorative: !!o.decorative,
      focalPoint: o.focalPoint || { x: 0.5, y: 0.5 },
      objectPosition: o.objectPosition || null,
      heroPosition: o.heroPosition || null,
      archivePosition: o.archivePosition || null,
      homepagePosition: o.homepagePosition || null,
      mobilePosition: o.mobilePosition || null,
      tabletPosition: o.tabletPosition || null,
      alt: o.alt || { en: null, fa: null },
      caption: o.caption || { en: null, fa: null },
      credit: o.credit || null,
      theme: o.theme || "light",
      /* internal ingestion traceability — never rendered */
      sourceFile: o.sourceFile || null,
      notes: o.notes || null
    };
  }

  function project(o) {
    return {
      id: o.id, slug: o.slug,
      contentState: o.contentState || "prototype",
      /* prototype records publish implicitly for design testing; a draft or real
         record must opt in, so an incomplete real project cannot leak into the
         public archive by omission. */
      published: (o.contentState && o.contentState !== "prototype")
                   ? o.published === true
                   : o.published !== false,
      sortOrder: o.sortOrder != null ? o.sortOrder : 0,
      homepageFeatured: !!o.homepageFeatured,
      homepageOrder: o.homepageOrder != null ? o.homepageOrder : null,

      title: o.title,
      proposition: o.proposition || { en: null, fa: null },
      homepageProposition: o.homepageProposition || o.proposition || { en: null, fa: null },
      location: o.location || { en: null, fa: null },
      country: o.country || null,
      year: o.year || null,
      startYear: o.startYear || null,
      completionYear: o.completionYear || null,
      years: o.years || null,
      status: o.status || null,
      typology: o.typology || null,
      expertise: o.expertise || [],
      services: o.services || [],
      client: o.client || null,
      programme: o.programme || { en: null, fa: null },
      builtArea: o.builtArea || null,
      siteArea: o.siteArea || null,
      /* optional quantities and alternate titles, rendered only when supplied */
      statusLabel: o.statusLabel || null,
      landscapeArea: o.landscapeArea || null,
      towerHeight: o.towerHeight || null,
      suites: o.suites || null,
      publicLevels: o.publicLevels || null,
      scaleNote: o.scaleNote || null,
      contentSource: o.contentSource || null,
      metadataStatus: o.metadataStatus || null,
      rooms: o.rooms || null,
      levels: o.levels || null,
      budget: o.budget || null,
      shortTitle: o.shortTitle || null,
      officialTitle: o.officialTitle || null,
      secondaryStatement: o.secondaryStatement || null,
      locationShort: o.locationShort || null,
      typologyLabel: o.typologyLabel || null,
      serviceList: o.serviceList || [],
      clientGroup: o.clientGroup || null,
      featured: !!o.featured,
      team: o.team || [],
      collaborators: o.collaborators || [],
      consultants: o.consultants || [],
      photographyCredit: o.photographyCredit || null,

      /* editorial content — every section optional, template stays content-aware */
      editorial: o.editorial || {},
      story: (o.story || []).map(function (b) {
        /* story modules reference canonical media by id; nothing is duplicated.
           role is an OPTIONAL semantic presentation hint (e.g. "context", "material",
           "technical") for Project Detail's chapter architecture — set it only when the
           record genuinely supports that reading; omitted, the page falls back to a
           positional Strategy/Experience split. Never inferred from title/body text. */
        return {
          type: b.type,
          role: b.role || null,
          mediaId: b.mediaId || null,
          mediaIds: b.mediaIds || [],
          title: b.title || null,
          body: b.body || null,
          caption: b.caption || null,
          credit: b.credit || null,
          by: b.by || null
        };
      }),
      drawings: (o.drawings || []).map(function (d) {
        return {
          id: d.id || null,
          type: d.type || null,
          title: d.title || null,
          level: d.level || null,
          scale: d.scale || null,
          caption: d.caption || null,
          credit: d.credit || null,
          /* prefer a canonical asset reference; direct media stays as a fallback */
          mediaId: d.mediaId || null,
          media: d.media || null
        };
      }),
      facts: o.facts || [],
      quote: o.quote || null,

      media: o.media || [],
      relatedProjects: o.relatedProjects || [],

      /* presentation overrides, kept apart from architectural facts */
      presentation: o.presentation || {}
    };
  }

  /* ---------- prototype dataset (unchanged values) ------------------------- */
  var P = [
    /* ---------------------------------------------------------------------
       PROJECT 01 — REAL CONTENT
       Imam Khomeini International Airport Hotel (Ibis–Novotel IKIA cluster).
       Media 01–04 are supplied project photography; 05–13 are editorial
       visualisations and must never carry the photographer's credit.
       --------------------------------------------------------------------- */
    project({
      id: "project-001", slug: "imam-khomeini-international-airport-hotel", sortOrder: 1,
      contentState: "real", published: true, featured: true,
      homepageFeatured: true, homepageOrder: 1,
      title: { en: "Imam Khomeini International Airport Hotel",
               fa: "هتل بین‌المللی فرودگاه امام خمینی" },
      shortTitle: { en: "IKIA Airport Hotel", fa: "هتل فرودگاه امام خمینی" },
      officialTitle: { en: "Ibis–Novotel IKIA Cluster Hotel",
                       fa: "مجموعه هتل‌های ایبیس–نووتل فرودگاه امام خمینی" },
      proposition: { en: "Architecture at the threshold between movement and pause.",
                     fa: "معماری در مرز میان حرکت و مکث." },
      homepageProposition: { en: "Architecture between<br />movement and pause.",
                             fa: "معماری میان<br />حرکت و مکث." },
      secondaryStatement: {
        en: "Two hospitality identities are brought together within a single architectural system shaped by arrival, movement and temporary stay.",
        fa: "دو هویت اقامتی در قالب یک سیستم معماری واحد کنار یکدیگر قرار می‌گیرند؛ سیستمی که با ورود، حرکت و اقامت موقت شکل گرفته است."
      },
      location: { en: "Imam Khomeini International Airport, Tehran, Iran",
                  fa: "فرودگاه بین‌المللی امام خمینی، تهران، ایران" },
      locationShort: { en: "Tehran, Iran", fa: "تهران، ایران" },
      country: "Iran",
      year: "2015", startYear: "2011", completionYear: "2015", years: "2011–2015",
      status: "Completed",
      typology: "Hospitality",
      typologyLabel: { en: "Airport Hotel / Hospitality Cluster", fa: "هتل فرودگاهی / مجموعه اقامتی" },
      expertise: ["architecture", "interior-architecture", "engineering"],
      services: ["architecture", "interior-architecture", "engineering"],
      serviceList: [
        { en: "Architectural Design", fa: "طراحی معماری" },
        { en: "Interior Design", fa: "طراحی داخلی" },
        { en: "Landscape Design", fa: "طراحی منظر" },
        { en: "Structural Engineering", fa: "مهندسی سازه" },
        { en: "Mechanical Engineering", fa: "تأسیسات مکانیکی" },
        { en: "Electrical Engineering", fa: "تأسیسات الکتریکی" },
        { en: "Execution / Construction Coordination", fa: "اجرا و هماهنگی ساخت" }
      ],
      client: { en: "Aria Zigurat Tourism Development Co.", fa: "شرکت توسعه گردشگری آریا زیگورات" },
      clientGroup: { en: "Affiliated with Tourism Financial Group", fa: "وابسته به گروه مالی گردشگری" },
      budget: { en: "USD 67 million", fa: "۶۷ میلیون دلار آمریکا" },
      programme: {
        en: "Parking, service and back-of-house areas, hotel lobbies, three restaurants, coffee shops, ballroom, meeting rooms, crew lounge, children's play area, health and wellness centres, administrative spaces and guest rooms.",
        fa: "پارکینگ، فضاهای خدماتی و پشتیبانی، لابی‌های هتل، سه رستوران، کافی‌شاپ‌ها، سالن مراسم، اتاق‌های جلسات، لانج خدمه، فضای بازی کودکان، مراکز سلامت، فضاهای اداری و اتاق‌های مهمان."
      },
      builtArea: { en: "55,000 m²", fa: "۵۵٬۰۰۰ مترمربع" },
      siteArea: null,
      rooms: { en: "492 rooms", fa: "۴۹۲ اتاق" },
      levels: { en: "12 levels", fa: "۱۲ طبقه" },
      /* published photography credit — applies to media 01–04 only */
      photographyCredit: { en: "Namvar Abbasian", fa: "نامور عباسیان" },
      team: [
        { role: { en: "Architect", fa: "معمار" }, name: { en: "Shiva Aghababaei", fa: "شیوا آقابابایی" } },
        { role: { en: "Design Associates", fa: "همکاران طراحی" },
          name: { en: "Roya Forutan, Sayeh Akhbari, Mohammad Abdollahzadeh, Puyan Seyedroohina, Sina Zingar, Neda Haghdust, Nooshin Kayal, Ehsan Davari",
                  fa: "رویا فروتن، سایه اخباری، محمد عبدالله‌زاده، پویان سیدروهینا، سینا زینگر، ندا حق‌دوست، نوشین کیال، احسان داوری" } },
        { role: { en: "Landscape Design", fa: "طراحی منظر" },
          name: { en: "Andisheh Aghababaei, Sona Kani, Hassan Babaei", fa: "اندیشه آقابابایی، سونا کنی، حسن بابایی" } },
        { role: { en: "Structural Engineering", fa: "مهندسی سازه" },
          name: { en: "Miad Nemati, Alireza Maleki — with Batis Sazeh Consultants Co.",
                  fa: "میعاد نعمتی، علیرضا ملکی — با همکاری مهندسین مشاور باتیس سازه" } },
        { role: { en: "Mechanical Engineering", fa: "تأسیسات مکانیکی" }, name: { en: "Majid Arjomand", fa: "مجید ارجمند" } },
        { role: { en: "Electrical Engineering", fa: "تأسیسات الکتریکی" }, name: { en: "Ali Ebrahimi", fa: "علی ابراهیمی" } },
        { role: { en: "Construction / Execution", fa: "اجرا" },
          name: { en: "Tarh Va Afarinesh Omran — Director: Mohammad Nemati; Executive Manager: Gholamhassan Fazlollahi",
                  fa: "طرح و آفرینش عمران — مدیر: محمد نعمتی؛ مدیر اجرایی: غلامحسن فضل‌اللهی" } },
        { role: { en: "Supervision", fa: "نظارت" }, name: { en: "Omran Zaveh Co.", fa: "شرکت عمران زاوه" } },
        { role: { en: "Visualisation / Graphics", fa: "تصویرسازی / گرافیک" },
          name: { en: "Neda Saleh, Farzad Jafarzadeh", fa: "ندا صالح، فرزاد جعفرزاده" } }
      ],
      editorial: {
        homepageDescription: {
          en: "A dual-brand airport hotel complex shaped around movement, arrival and temporary stay, bringing 492 rooms and shared public infrastructure into one architectural system.",
          fa: "مجموعه‌ای دوبرندی در مجاورت فرودگاه که با محوریت حرکت، ورود و اقامت موقت شکل گرفته و ۴۹۲ اتاق و زیرساخت‌های عمومی مشترک را در یک سیستم معماری واحد گرد هم آورده است."
        },
        archiveDescription: {
          en: "Located opposite the main passenger terminal of Imam Khomeini International Airport, the Ibis–Novotel complex combines two distinct hotel identities with shared service infrastructure, connected public spaces and a unified architectural language.",
          fa: "مجموعه ایبیس–نووتل در مقابل ترمینال اصلی مسافری فرودگاه بین‌المللی امام خمینی قرار گرفته است و دو هویت اقامتی مستقل را با زیرساخت‌های خدماتی مشترک، فضاهای عمومی متصل و یک زبان معماری یکپارچه در کنار یکدیگر قرار می‌دهد."
        },
        lead: {
          en: "Imam Khomeini International Airport Hotel was conceived as a dual-brand hospitality complex positioned directly within the territory of travel, bringing the 196-room ibis and the 296-room Novotel into a shared architectural framework.",
          fa: "هتل بین‌المللی فرودگاه امام خمینی به‌عنوان یک مجموعه اقامتی دوبرندی در دل قلمرو سفر شکل گرفته است و هتل ایبیس با ۱۹۶ اتاق و هتل نووتل با ۲۹۶ اتاق را در یک چارچوب معماری مشترک کنار هم قرار می‌دهد."
        },
        chapters: [
          { en: "Rather than treating the complex as a single monolithic object, the architecture is organised as a sequence of differentiated volumes, façades and public thresholds. Common service infrastructure operates behind the scenes, while the public areas are linked through a connecting spine between the two lobbies.",
            fa: "معماری مجموعه به‌جای شکل‌دادن یک حجم یکپارچه و سنگین، از توالی حجم‌ها، پوسته‌ها و آستانه‌های متفاوت تشکیل شده است. زیرساخت‌های خدماتی در پشت صحنه به‌صورت مشترک عمل می‌کنند و فضاهای عمومی از طریق یک محور ارتباطی میان دو لابی به یکدیگر متصل می‌شوند." },
          { en: "At the scale of the airport, the building needs clarity and recognition. At the scale of the traveller, it needs orientation, shelter and calm. The architecture negotiates these two conditions through horizontal massing, large glazed public surfaces, more solid guest-room volumes, colour accents and a landscaped arrival sequence.",
            fa: "در مقیاس فرودگاه، ساختمان باید خوانا و قابل تشخیص باشد و در مقیاس مسافر، به فضایی برای جهت‌یابی، آرامش و توقف تبدیل شود. پروژه این دو مقیاس را از طریق امتدادهای افقی، سطوح شفاف فضاهای عمومی، حجم‌های متراکم‌تر اتاق‌ها، نشانه‌های رنگی و توالی محوطه ورود به یکدیگر پیوند می‌دهد." },
          { en: "The complex contains twelve levels. Two basement floors accommodate parking, service functions and back-of-house areas. Two principal public floors contain the lobbies, restaurants, coffee shops, ballroom, meeting spaces, crew lounge, children's facilities and health centres. A mezzanine accommodates administrative functions, while seven upper floors are dedicated primarily to guest accommodation.",
            fa: "مجموعه در دوازده طبقه سازماندهی شده است. دو طبقه زیرزمین به پارکینگ، فضاهای خدماتی و پشتیبانی اختصاص دارد. دو طبقه اصلی عمومی شامل لابی‌ها، رستوران‌ها، کافی‌شاپ‌ها، سالن مراسم، فضاهای جلسات، لانج خدمه پرواز، فضای کودکان و مراکز سلامت است. یک نیم‌طبقه به فضاهای اداری اختصاص یافته و هفت طبقه فوقانی عمدتاً برای اتاق‌های مهمان در نظر گرفته شده است." },
          { en: "Tarh Va Afarinesh was involved not only in the architectural and engineering design but also in the execution and construction coordination of the complex, allowing architectural intent and technical requirements to be coordinated across a project of considerable scale.",
            fa: "نقش طرح و آفرینش در این مجموعه تنها به طراحی معماری و مهندسی محدود نبود و اجرا و هماهنگی ساخت نیز بخشی از مسئولیت پروژه بود؛ این پیوستگی امکان هماهنگی تصمیم‌های معماری و الزامات فنی را در پروژه‌ای با این مقیاس فراهم کرد." }
        ],
        seoTitle: { en: "Imam Khomeini International Airport Hotel | Tarh & Afarinesh",
                    fa: "هتل بین‌المللی فرودگاه امام خمینی | طرح و آفرینش" },
        seoDescription: {
          en: "The 55,000 m² Ibis–Novotel hotel complex at Imam Khomeini International Airport brings 492 guest rooms, shared hospitality infrastructure and two distinct hotel identities together within a unified architectural system by Tarh & Afarinesh.",
          fa: "مجموعه ۵۵٬۰۰۰ مترمربعی ایبیس–نووتل در فرودگاه بین‌المللی امام خمینی، ۴۹۲ اتاق، زیرساخت‌های مشترک مهمان‌نوازی و دو هویت اقامتی متمایز را در یک سیستم معماری واحد از طرح و آفرینش گرد هم می‌آورد."
        }
      },
      quote: { en: "A temporary pause within the continuous movement of the airport.",
               fa: "مکثی موقت در دل حرکت پیوسته فرودگاه.", by: null },
      facts: [
        { value: "55,000 m²", note: { en: "Built Area", fa: "زیربنا" } },
        { value: "492", note: { en: "Guest Rooms", fa: "اتاق مهمان" } },
        { value: "2", note: { en: "Hotel Components", fa: "بخش اقامتی" } },
        { value: "12", note: { en: "Levels", fa: "طبقه" } },
        { value: "3", note: { en: "Restaurants", fa: "رستوران" } },
        { value: "2015", note: { en: "Completion", fa: "سال تکمیل" } },
        { value: "USD 67M", note: { en: "Published Budget", fa: "بودجه منتشرشده" } },
        { value: "196 + 296", note: { en: "ibis + Novotel Rooms", fa: "اتاق‌های ایبیس + نووتل" } }
      ],
      drawings: [],
      presentation: { ratio: "16/9", previewSize: [100, 56], plate: 0, heroTheme: "dark",
                      density: "rich", homepageRatio: "16/9" },
      media: [
        media({ id: "p001-aerial-context", src: "assets/projects/project-001/01_aerial_context.webp",
                roles: ["hero", "homepage", "viewer"], ratio: "16/9", sourceType: "supplied-project-image",
                theme: "dark",
                objectPosition: "50% 48%", heroPosition: "50% 48%", homepagePosition: "50% 48%",
                tabletPosition: "50% 48%", mobilePosition: "48% 50%",
                credit: { en: "Namvar Abbasian", fa: "نامور عباسیان" },
                alt: { en: "Aerial view of the Imam Khomeini International Airport hotel complex within its surrounding road and landscape network.",
                       fa: "نمای هوایی مجموعه هتل فرودگاه بین‌المللی امام خمینی در میان شبکه مسیرهای حرکتی و محوطه پیرامون." },
                sourceFile: "01_original_aerial_context.jpg" }),
        media({ id: "p001-wide-front", src: "assets/projects/project-001/04_wide_front.webp",
                roles: ["archive", "viewer"], ratio: "4/3", sourceType: "supplied-project-image",
                credit: { en: "Namvar Abbasian", fa: "نامور عباسیان" },
                alt: { en: "Wide frontal view of the Ibis–Novotel hotel complex at Imam Khomeini International Airport.",
                       fa: "نمای گسترده روبه‌روی مجموعه هتل‌های ایبیس–نووتل در فرودگاه بین‌المللی امام خمینی." },
                sourceFile: "04_original_wide_front.jpg" }),
        media({ id: "p001-facade-close", src: "assets/projects/project-001/02_facade_close.webp",
                roles: ["story", "detail", "viewer"], ratio: "3/4", sourceType: "supplied-project-image",
                credit: { en: "Namvar Abbasian", fa: "نامور عباسیان" },
                alt: { en: "Close view of the hotel façade showing the repetitive guest-room grid, stone cladding, dark volumes and coloured accents.",
                       fa: "نمای نزدیک پوسته هتل با شبکه تکرارشونده اتاق‌ها، پوشش سنگی، حجم‌های تیره و نشانه‌های رنگی." },
                sourceFile: "02_original_facade_close.jpg" }),
        media({ id: "p001-overall-exterior", src: "assets/projects/project-001/06_overall_exterior.jpg",
                roles: ["story", "viewer"], ratio: "16/9", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of the Ibis–Novotel airport hotel complex showing its two accommodation wings and shared public base.",
                       fa: "تصویرسازی مجموعه هتل فرودگاهی ایبیس–نووتل با نمایش دو بخش اقامتی و پایه عمومی مشترک." },
                sourceFile: "06_generated_overall_exterior.jpg" }),
        media({ id: "p001-arrival-golden", src: "assets/projects/project-001/07_arrival_golden_hour.webp",
                roles: ["story", "arrival", "viewer"], ratio: "16/9", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of the landscaped arrival sequence at the Imam Khomeini International Airport hotel complex.",
                       fa: "تصویرسازی توالی محوطه و فضای ورود مجموعه هتل فرودگاه امام خمینی." },
                sourceFile: "07_generated_arrival_golden_hour.jpg" }),
        media({ id: "p001-entrance-twilight", src: "assets/projects/project-001/08_entrance_twilight.webp",
                roles: ["story", "viewer"], ratio: "4/5", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial twilight visualisation of the hotel entrance and façade.",
                       fa: "تصویرسازی غروب از ورودی و پوسته مجموعه هتل." },
                sourceFile: "08_generated_entrance_twilight.jpg" }),
        media({ id: "p001-entrance-day", src: "assets/projects/project-001/09_entrance_day.webp",
                roles: ["story", "viewer"], ratio: "16/9", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial daylight visualisation of the main hotel arrival zone.",
                       fa: "تصویرسازی روز از محدوده اصلی ورود به مجموعه هتل." },
                sourceFile: "09_generated_entrance_day.jpg" }),
        media({ id: "p001-lobby-atrium", src: "assets/projects/project-001/10_lobby_atrium.webp",
                roles: ["story", "interior", "viewer"], ratio: "16/9", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of a large public lobby space inspired by the architectural language of the airport hotel complex.",
                       fa: "تصویرسازی فضای عمومی لابی بر اساس زبان معماری مجموعه هتل فرودگاه." },
                sourceFile: "10_generated_lobby_atrium.jpg" }),
        media({ id: "p001-lounge-interior", src: "assets/projects/project-001/11_lounge_interior.webp",
                roles: ["story", "interior", "viewer"], ratio: "16/9", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of a quieter lounge environment within the airport hospitality complex.",
                       fa: "تصویرسازی فضای آرام‌تر لانج در مجموعه اقامتی فرودگاه." },
                sourceFile: "11_generated_lounge_interior.jpg" }),
        media({ id: "p001-hero-dusk-alt", src: "assets/projects/project-001/05_hero_dusk_alt.webp",
                roles: ["story", "context", "viewer"], ratio: "16/9", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                caption: { en: "Editorial aerial visualisation exploring the relationship between the hotel complex, airport infrastructure and surrounding movement.",
                           fa: "تصویرسازی هوایی تحریریه‌ای از رابطه مجموعه هتل با زیرساخت فرودگاه و جریان‌های حرکتی پیرامون." },
                alt: { en: "Editorial aerial visualisation of the hotel complex beside airport infrastructure at dusk.",
                       fa: "تصویرسازی هوایی مجموعه هتل در کنار زیرساخت فرودگاه هنگام غروب." },
                sourceFile: "05_generated_hero_dusk_alt.jpg" }),
        media({ id: "p001-closing-twilight", src: "assets/projects/project-001/12_closing_twilight.webp",
                roles: ["story", "closing", "viewer"], ratio: "16/9", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                caption: { en: "As daylight fades, the public base becomes increasingly transparent while the guest-room grid remains legible above.",
                           fa: "با کاهش نور روز، پایه عمومی ساختمان شفاف‌تر دیده می‌شود و شبکه اتاق‌های مهمان در طبقات بالا همچنان خوانا باقی می‌ماند." },
                alt: { en: "Editorial twilight visualisation of the hotel complex with its illuminated public base.",
                       fa: "تصویرسازی غروب از مجموعه هتل با پایه عمومی روشن." },
                sourceFile: "12_generated_closing_twilight.jpg" }),
        media({ id: "p001-movement-diagram", src: "assets/projects/project-001/13_movement_arrival_pause_diagram.jpg",
                roles: ["story", "diagram", "viewer"], ratio: "4/3", sourceType: "editorial-diagram",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Conceptual diagram reading the project as a sequence from airport movement to arrival, landscape and temporary stay.",
                       fa: "دیاگرام مفهومی از پروژه به‌عنوان توالی حرکت فرودگاهی، ورود، محوطه و اقامت موقت." },
                sourceFile: "13_generated_movement_arrival_pause_diagram.jpg" }),
        /* retained for the archive, never rendered: earlier Axis branding */
        media({ id: "p001-axis-hold", src: "assets/projects/project-001/03_axis_hold_DO_NOT_PUBLISH.jpg",
                roles: [], ratio: "3/2", sourceType: "supplied-project-image", decorative: true,
                notes: "Withheld from publication — shows earlier Axis branding.",
                sourceFile: "03_original_axis_hold.jpg" })
      ],
      story: [
        /* the locked Project Detail renders one block per type; the narrative
           sequence carries the remaining approved imagery in editorial order. */
        { type: "full-image", mediaId: "p001-overall-exterior", role: "strategy",
          title: { en: "One Complex, Two Identities", fa: "یک مجموعه، دو هویت" },
          body: { en: "The project is organised around a deliberate tension between unity and difference. The two hotel components retain separate identities, standards and guest experiences, yet they are held together by shared infrastructure, aligned public spaces and a continuous architectural field. Variation is therefore not treated as disruption: changes in colour, transparency, material and façade rhythm become tools for orientation.",
                  fa: "ساختار پروژه بر تنشی آگاهانه میان وحدت و تفاوت شکل گرفته است. دو بخش هتل، هویت، استاندارد و تجربه اقامتی مستقل خود را حفظ می‌کنند، اما زیرساخت‌های مشترک، هم‌راستایی فضاهای عمومی و پیوستگی زبان معماری، آن‌ها را در قالب یک مجموعه واحد به هم متصل می‌کند. در نتیجه تفاوت به‌عنوان گسست عمل نمی‌کند؛ تغییرات رنگ، شفافیت، متریال و ریتم نما به ابزارهایی برای جهت‌یابی تبدیل می‌شوند." } },
        { type: "image-text", mediaId: "p001-facade-close", role: "material",
          title: { en: "Rhythm, Colour and Orientation", fa: "ریتم، رنگ و جهت‌یابی" },
          body: { en: "The guest-room façades begin with the repetitive logic of the room module. Instead of allowing that repetition to become anonymous, the envelope introduces shifts in depth, solid and glazed surfaces, dark and light cladding, and controlled colour accents. Against the predominantly neutral palette, small moments of red and blue interrupt the grid and give the large façade a finer grain.",
                  fa: "نمای بخش‌های اقامتی از منطق تکرارشونده مدول اتاق‌ها آغاز می‌شود. با این حال پوسته اجازه نمی‌دهد این تکرار به سطحی بی‌هویت تبدیل شود؛ تغییر عمق، تضاد میان سطوح توپر و شفاف، پوشش‌های روشن و تیره و نشانه‌های کنترل‌شده رنگی ریتم نما را شکل می‌دهند. در برابر پالت عمدتاً خنثی، لحظه‌های محدود قرمز و آبی شبکه نما را قطع کرده و مقیاس آن را ریزتر می‌کنند." },
          caption: { en: "Guest-room grid, stone cladding and colour accents.", fa: "شبکه اتاق‌ها، پوشش سنگی و نشانه‌های رنگی." } },
        { type: "sticky-narrative", role: "experience",
          mediaIds: ["p001-arrival-golden", "p001-entrance-twilight", "p001-entrance-day",
                     "p001-lobby-atrium", "p001-lounge-interior", "p001-hero-dusk-alt",
                     "p001-closing-twilight", "p001-movement-diagram"],
          title: { en: "Movement, Arrival, Pause", fa: "حرکت، ورود، مکث" },
          body: { en: "The architecture is experienced as a gradual reduction in speed. Roads and airport movement establish the outer condition; the arrival forecourt introduces a controlled transition; landscape and shelter define the threshold; and the public interior completes the shift from transit to temporary stay. Inside, generous vertical proportions and a combination of stone, glass and warm lighting create a more settled atmosphere after the intensity of the airport environment.",
                  fa: "تجربه معماری مجموعه با کاهش تدریجی سرعت شکل می‌گیرد. مسیرهای حرکتی و زیرساخت فرودگاه شرایط بیرونی را تعریف می‌کنند؛ پیش‌فضای ورود گذار را کنترل می‌کند؛ محوطه و سایه آستانه را شکل می‌دهند و فضای عمومی داخلی، انتقال از عبور به اقامت موقت را کامل می‌کند. در داخل، ارتفاع مناسب فضاها و ترکیب سنگ، شیشه و نور گرم، پس از شدت محیط فرودگاه فضایی آرام‌تر ایجاد می‌کند." } }
      ]
    }),
    /* ---------------------------------------------------------------------
       PROJECT 02 — FUTURE COURTYARD (curated presentation content)
       Media 01–03 are user-supplied project references; 04–15 are editorial
       visualisations and must never be described as documentary photography.
       --------------------------------------------------------------------- */
    project({
      id: "project-002", slug: "future-courtyard", sortOrder: 2,
      contentState: "real", published: true, featured: true,
      homepageFeatured: true, homepageOrder: 2,
      contentSource: "curated-project-presentation",
      metadataStatus: "working-presentation-data",
      title: { en: "Future Courtyard", fa: "حیاط آینده" },
      shortTitle: { en: "Future Courtyard", fa: "حیاط آینده" },
      proposition: { en: "Reimagining the courtyard as a fluid civic landscape.",
                     fa: "بازآفرینی حیاط به‌عنوان چشم‌اندازی سیال برای زندگی جمعی." },
      homepageProposition: { en: "Reimagining the courtyard<br />as a fluid civic landscape.",
                             fa: "بازآفرینی حیاط به‌عنوان<br />چشم‌اندازی سیال برای زندگی جمعی." },
      secondaryStatement: {
        en: "A contemporary architectural landscape where structure, collective space and planted ground redefine the courtyard for future public life.",
        fa: "چشم‌اندازی معماری معاصر که در آن سازه، فضای جمعی و بستر سبز، مفهوم حیاط را برای زندگی عمومی آینده بازتعریف می‌کنند."
      },
      location: { en: "Rasht, Iran", fa: "رشت، ایران" },
      locationShort: { en: "Rasht, Iran", fa: "رشت، ایران" },
      country: "Iran",
      year: "2026", startYear: "2026", completionYear: "2026", years: "2026",
      status: "Concept",
      statusLabel: { en: "Concept Design", fa: "طراحی مفهومی" },
      typology: "Mixed",
      typologyLabel: { en: "Mixed-Use Civic & Landscape Complex", fa: "مجموعه چندعملکردی، عمومی و منظر‌محور" },
      expertise: ["architecture", "interior-architecture", "engineering", "sustainable-design"],
      services: ["architecture", "interior-architecture", "engineering", "sustainable-design"],
      serviceList: [
        { en: "Architectural Design", fa: "طراحی معماری" },
        { en: "Concept Design", fa: "طراحی مفهومی" },
        { en: "Interior Architecture", fa: "معماری داخلی" },
        { en: "Spatial Planning", fa: "برنامه‌ریزی فضایی" },
        { en: "Landscape Strategy", fa: "استراتژی منظر" },
        { en: "Structural Coordination", fa: "هماهنگی سازه" },
        { en: "Environmental Design Strategy", fa: "راهبرد طراحی محیطی" }
      ],
      client: { en: "Future Courtyard Development", fa: "توسعه حیاط آینده" },
      clientGroup: { en: "Private Development", fa: "توسعه خصوصی" },
      programme: {
        en: "Public courtyard, civic gathering spaces, flexible cultural and exhibition areas, food and beverage, flexible workplace and studio spaces, shared meeting rooms, community and event spaces, public lounges, landscaped terraces, planted courtyards, circulation galleries and support areas.",
        fa: "حیاط عمومی، فضاهای گردهم‌آیی، فضاهای فرهنگی و نمایشی انعطاف‌پذیر، فضاهای پذیرایی، فضاهای کار و استودیو، جلسات مشترک، فضاهای رویداد و اجتماع، لانج‌های عمومی، تراس‌های سبز، حیاط‌های کاشته‌شده، گالری‌های حرکتی و فضاهای پشتیبانی."
      },
      siteArea: { en: "68,000 m²", fa: "۶۸٬۰۰۰ مترمربع" },
      builtArea: { en: "44,000 m²", fa: "۴۴٬۰۰۰ مترمربع" },
      landscapeArea: { en: "Approx. 28,000 m²", fa: "حدود ۲۸٬۰۰۰ مترمربع" },
      levels: { en: "Up to 8 levels", fa: "حداکثر ۸ طبقه" },
      photographyCredit: null,
      team: [
        { role: { en: "Architecture", fa: "معماری" }, name: { en: "Tarh & Afarinesh", fa: "مهندسین مشاور طرح و آفرینش" } },
        { role: { en: "Design", fa: "طراحی" }, name: { en: "Tarh & Afarinesh Design Team", fa: "تیم طراحی طرح و آفرینش" } },
        { role: { en: "Interior Architecture", fa: "معماری داخلی" }, name: { en: "Tarh & Afarinesh", fa: "طرح و آفرینش" } },
        { role: { en: "Landscape Strategy", fa: "استراتژی منظر" }, name: { en: "Tarh & Afarinesh", fa: "طرح و آفرینش" } },
        { role: { en: "Structural Coordination", fa: "هماهنگی سازه" }, name: { en: "Integrated Design Team", fa: "تیم طراحی یکپارچه" } },
        { role: { en: "Environmental Strategy", fa: "راهبرد محیطی" }, name: { en: "Integrated Design Team", fa: "تیم طراحی یکپارچه" } }
      ],
      editorial: {
        homepageDescription: {
          en: "A fluid landscape-based complex that reimagines the courtyard as a contemporary framework for collective life.",
          fa: "مجموعه‌ای سیال و منظر‌محور که حیاط را به‌عنوان چارچوبی معاصر برای زیست جمعی بازتعریف می‌کند."
        },
        archiveDescription: {
          en: "Future Courtyard in Rasht transforms the traditional idea of the courtyard into an open architectural field where landscape, structure and shared public space operate as one continuous system.",
          fa: "حیاط آینده در رشت، مفهوم سنتی حیاط را به یک میدان معماری باز تبدیل می‌کند؛ جایی که منظر، سازه و فضای عمومی مشترک به‌صورت یک سیستم پیوسته عمل می‌کنند."
        },
        lead: {
          en: "Future Courtyard explores how one of architecture's most enduring spatial ideas — the courtyard — can be reimagined for contemporary collective life.",
          fa: "حیاط آینده این پرسش را مطرح می‌کند که چگونه یکی از ماندگارترین ایده‌های فضایی معماری — یعنی حیاط — می‌تواند برای زیست جمعی معاصر بازتصور شود."
        },
        chapters: [
          { en: "Instead of treating the courtyard as a static enclosed void, the project proposes it as a fluid field of relationships between architecture, structure, landscape and public activity.",
            fa: "پروژه به‌جای آن‌که حیاط را یک فضای خالی، بسته و ایستا بداند، آن را به‌صورت میدانی سیال از روابط میان معماری، سازه، منظر و فعالیت عمومی تعریف می‌کند." },
          { en: "Large curved volumes wrap around internal open spaces while remaining porous toward the surrounding landscape. Their geometry creates sheltered thresholds, frames long views, organises movement and establishes a continuous sequence between exterior and interior.",
            fa: "حجم‌های بزرگ و منحنی پیرامون فضاهای باز درونی شکل می‌گیرند، در حالی که ارتباط خود را با منظر اطراف حفظ می‌کنند. هندسه آن‌ها آستانه‌های محافظت‌شده ایجاد می‌کند، دیدهای طولانی را قاب می‌گیرد، حرکت را سازمان می‌دهد و توالی‌ای پیوسته میان بیرون و درون شکل می‌دهد." },
          { en: "Within this system, architecture is understood less as a collection of isolated objects and more as an environmental framework. Landscape enters the building, public life extends into planted courtyards and terraces, and structure becomes an active part of the spatial experience.",
            fa: "در این سیستم، معماری کمتر به‌عنوان مجموعه‌ای از ابژه‌های منفرد و بیشتر به‌عنوان یک چارچوب محیطی عمل می‌کند. منظر وارد ساختمان می‌شود، زندگی عمومی به حیاط‌ها و تراس‌های سبز امتداد پیدا می‌کند و سازه به بخشی فعال از تجربه فضایی تبدیل می‌شود." },
          { en: "Future Courtyard therefore does not reproduce the historical courtyard literally. It carries forward its capacity to organise shared life while transforming its boundaries for a more open, connected and contemporary condition.",
            fa: "حیاط آینده در نتیجه، حیاط تاریخی را به‌صورت تحت‌اللفظی بازسازی نمی‌کند؛ بلکه ظرفیت آن برای سازماندهی زندگی مشترک را حفظ کرده و مرزهای آن را برای شرایطی بازتر، پیوسته‌تر و معاصر بازتعریف می‌کند." }
        ],
        seoTitle: { en: "Future Courtyard | Tarh & Afarinesh", fa: "حیاط آینده | طرح و آفرینش" },
        seoDescription: {
          en: "Future Courtyard in Rasht reimagines the courtyard as a fluid civic landscape, bringing architecture, exposed structure, shared public space and planted ground together within a continuous mixed-use environment.",
          fa: "حیاط آینده در رشت، مفهوم حیاط را به‌عنوان چشم‌اندازی سیال برای زندگی جمعی بازتعریف می‌کند و معماری، سازه آشکار، فضای عمومی مشترک و بستر سبز را در یک محیط چندعملکردی پیوسته به هم پیوند می‌دهد."
        },
        socialDescription: {
          en: "A contemporary courtyard transformed into a fluid landscape for collective life.",
          fa: "بازتعریف حیاط معاصر به‌عنوان منظری سیال برای زیست جمعی."
        }
      },
      quote: { en: "The courtyard becomes a field rather than a boundary.",
               fa: "حیاط از یک مرز به یک میدان تبدیل می‌شود.", by: null },
      facts: [
        { value: "68,000 m²", note: { en: "Site", fa: "سایت" } },
        { value: "44,000 m²", note: { en: "Built Area", fa: "زیربنا" } },
        { value: "28,000 m²", note: { en: "Landscape & Open Space", fa: "منظر و فضای باز" } },
        { value: "8", note: { en: "Maximum Levels", fa: "حداکثر طبقات" } },
        { value: "4", note: { en: "Primary Spatial Systems", fa: "سیستم فضایی اصلی" } },
        { value: "2026", note: { en: "Concept Year", fa: "سال طراحی مفهومی" } },
        { value: "Mixed-Use", note: { en: "Typology", fa: "کاربری چندعملکردی" } },
        { value: "Rasht", note: { en: "Location", fa: "رشت" } }
      ],
      drawings: [],
      presentation: { ratio: "16/9", previewSize: [100, 56], plate: 2, heroTheme: "light",
                      density: "rich", homepageRatio: "16/9" },
      media: [
        media({ id: "p002-aerial-context", src: "assets/projects/project-002/01_aerial_context.webp",
                roles: ["hero", "homepage", "viewer"], ratio: "16/9", sourceType: "user-supplied-project-reference",
                objectPosition: "48% 48%", heroPosition: "48% 48%", homepagePosition: "48% 48%",
                tabletPosition: "48% 48%", mobilePosition: "43% 50%", theme: "light",
                alt: { en: "Aerial view of Future Courtyard embedded within the green landscape of Rasht.",
                       fa: "نمای هوایی حیاط آینده در پیوند با بستر سبز شهر رشت." },
                sourceFile: "01_original_aerial_context.jpg" }),
        media({ id: "p002-public-edge", src: "assets/projects/project-002/02_public_edge.webp",
                roles: ["archive", "story", "viewer"], ratio: "3/2", sourceType: "user-supplied-project-reference",
                objectPosition: "50% 50%", archivePosition: "50% 50%", mobilePosition: "57% 50%",
                alt: { en: "Public-facing curved volume and glazed edge of Future Courtyard.",
                       fa: "نمای حجم منحنی و لبه شفاف عمومی پروژه حیاط آینده." },
                sourceFile: "02_original_public_edge.jpg" }),
        media({ id: "p002-structure-interior", src: "assets/projects/project-002/03_structure_interior.webp",
                roles: ["story", "detail", "structure", "viewer"], ratio: "3/2", sourceType: "user-supplied-project-reference",
                alt: { en: "Inclined exposed-concrete supports defining the interior structural field of Future Courtyard.",
                       fa: "ستون‌های مایل بتن اکسپوز که میدان سازه‌ای فضای داخلی حیاط آینده را شکل می‌دهند." },
                sourceFile: "03_original_structure_interior.jpg" }),
        media({ id: "p002-arrival", src: "assets/projects/project-002/04_arrival_sequence.webp",
                roles: ["story", "arrival", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of the landscaped arrival sequence at Future Courtyard.",
                       fa: "تصویرسازی توالی ورود منظر‌محور پروژه حیاط آینده." },
                sourceFile: "04_generated_arrival_sequence.jpg" }),
        media({ id: "p002-central-courtyard", src: "assets/projects/project-002/05_central_courtyard.jpg",
                roles: ["story", "courtyard", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of the central planted courtyard and surrounding public spaces.",
                       fa: "تصویرسازی حیاط مرکزی سبز و فضاهای عمومی پیرامون." },
                sourceFile: "05_generated_central_courtyard.jpg" }),
        media({ id: "p002-landscape-path", src: "assets/projects/project-002/06_landscape_path.webp",
                roles: ["story", "landscape", "viewer"], ratio: "3/2", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of pedestrian movement through Future Courtyard's landscaped public realm.",
                       fa: "تصویرسازی حرکت پیاده در قلمرو عمومی و منظر پروژه حیاط آینده." },
                sourceFile: "06_generated_landscape_path.jpg" }),
        media({ id: "p002-interior-atrium", src: "assets/projects/project-002/07_interior_atrium.webp",
                roles: ["story", "interior", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of the multi-level public interior and structural field of Future Courtyard.",
                       fa: "تصویرسازی فضای عمومی چندطبقه و میدان سازه‌ای حیاط آینده." },
                sourceFile: "07_generated_interior_atrium.jpg" }),
        media({ id: "p002-public-lounge", src: "assets/projects/project-002/08_public_lounge.webp",
                roles: ["story", "interior", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of a public lounge connected visually to the courtyard and surrounding landscape.",
                       fa: "تصویرسازی لانج عمومی با ارتباط بصری مستقیم با حیاط و منظر." },
                sourceFile: "08_generated_public_lounge.jpg" }),
        media({ id: "p002-material-detail", src: "assets/projects/project-002/09_material_detail.webp",
                roles: ["story", "detail", "material", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                caption: { en: "Exposed concrete, glass and the light architectural envelope.",
                           fa: "بتن اکسپوز، شیشه و پوسته روشن معماری." },
                alt: { en: "Editorial close view of exposed concrete, glass and the light architectural envelope.",
                       fa: "نمای نزدیک تحریریه‌ای از بتن اکسپوز، شیشه و پوسته روشن معماری." },
                sourceFile: "09_generated_material_detail.jpg" }),
        media({ id: "p002-twilight", src: "assets/projects/project-002/10_twilight_view.webp",
                roles: ["story", "twilight", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial twilight view of Future Courtyard and its illuminated public edge.",
                       fa: "تصویرسازی غروب از حیاط آینده و لبه عمومی روشن مجموعه." },
                sourceFile: "10_generated_twilight_view.jpg" }),
        media({ id: "p002-concept-diagram", src: "assets/projects/project-002/11_concept_diagram.jpg",
                roles: ["story", "diagram", "viewer"], ratio: "3/2", sourceType: "editorial-diagram", crop: "contain",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                caption: { en: "Editorial / conceptual — not a technical drawing.",
                           fa: "تحریریه‌ای و مفهومی — نقشه فنی نیست." },
                alt: { en: "Conceptual diagram reading Future Courtyard as an interaction between built form, distributed courtyards and continuous landscape.",
                       fa: "دیاگرام مفهومی از حیاط آینده بر اساس تعامل میان فرم ساخته‌شده، حیاط‌های توزیع‌شده و منظر پیوسته." },
                sourceFile: "11_generated_concept_diagram_editorial.jpg" }),
        media({ id: "p002-site-plan", src: "assets/projects/project-002/12_site_plan.jpg",
                roles: ["story", "diagram", "viewer"], ratio: "3/2", sourceType: "editorial-diagram", crop: "contain",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                caption: { en: "Illustrative / editorial — not for construction or technical measurement.",
                           fa: "تصویری و تحریریه‌ای — برای اجرا یا اندازه‌گیری فنی نیست." },
                alt: { en: "Illustrative spatial diagram showing how curved built forms generate multiple open centres instead of one enclosed courtyard.",
                       fa: "دیاگرامی تصویری از نحوه شکل‌گیری چند مرکز باز توسط حجم‌های منحنی، به‌جای یک حیاط بسته و منفرد." },
                sourceFile: "12_generated_site_plan_editorial.jpg" }),
        media({ id: "p002-regional-context", src: "assets/projects/project-002/13_regional_context.webp",
                roles: ["story", "context", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial regional view of Future Courtyard within the broader green landscape of Rasht.",
                       fa: "تصویرسازی منطقه‌ای حیاط آینده در بستر سبز گسترده رشت." },
                sourceFile: "13_generated_regional_context.jpg" }),
        media({ id: "p002-terrace", src: "assets/projects/project-002/14_terrace_view.jpg",
                roles: ["story", "terrace", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of a planted terrace connecting architecture with the surrounding landscape.",
                       fa: "تصویرسازی تراس سبز که معماری را به منظر پیرامون متصل می‌کند." },
                sourceFile: "14_generated_terrace_view.jpg" }),
        media({ id: "p002-closing-night", src: "assets/projects/project-002/15_closing_night.jpg",
                roles: ["story", "closing", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                caption: { en: "As daylight fades, the relationship between architecture, courtyard and landscape remains visible through the illuminated public edges.",
                           fa: "با کاهش نور روز، رابطه میان معماری، حیاط و منظر از طریق لبه‌های عمومی روشن مجموعه همچنان قابل خواندن باقی می‌ماند." },
                alt: { en: "Editorial night view of Future Courtyard glowing within the surrounding landscape.",
                       fa: "تصویرسازی شب پروژه حیاط آینده در میان منظر پیرامون." },
                sourceFile: "15_generated_closing_night.jpg" })
      ],
      story: [
        { type: "full-image", mediaId: "p002-regional-context", role: "context",
          title: { en: "Architecture in a Living Landscape", fa: "معماری در دل منظر زنده" },
          body: { en: "In Rasht, vegetation, moisture, changing light and an intense relationship with outdoor space are fundamental environmental conditions. The project responds by reducing the distinction between building and ground. Architecture opens toward vegetation, circulation moves alongside planted spaces, and courtyards operate as climatic and social interfaces. Landscape is therefore not applied after the architecture — it participates in defining the architecture itself.",
                  fa: "در رشت، پوشش گیاهی، رطوبت، تغییرات نور و ارتباط پررنگ با فضای باز، بخشی از شرایط اساسی محیط هستند. پروژه با کاهش مرز میان ساختمان و زمین به این شرایط پاسخ می‌دهد. معماری به سمت پوشش گیاهی باز می‌شود، حرکت در امتداد فضاهای کاشته‌شده شکل می‌گیرد و حیاط‌ها به‌عنوان رابط‌های اقلیمی و اجتماعی عمل می‌کنند. در نتیجه، منظر عنصری نیست که پس از معماری به پروژه اضافه شود؛ بلکه در تعریف خود معماری مشارکت می‌کند." } },
        { type: "image-text", mediaId: "p002-public-edge", role: "strategy",
          title: { en: "Forming the Public Edge", fa: "شکل‌دادن به لبه عمومی" },
          body: { en: "Sweeping architectural forms establish the identity of the project while shaping a sequence of public thresholds. Their geometry guides movement rather than simply enclosing programme. At ground level, transparent façades, planted edges and sheltered walkways produce a permeable civic interface. Instead of confronting the city with a defensive perimeter, Future Courtyard uses the building edge as an invitation into shared space.",
                  fa: "فرم‌های روان معماری، هویت پروژه را شکل می‌دهند و همزمان توالی‌ای از آستانه‌های عمومی ایجاد می‌کنند. هندسه این فرم‌ها به‌جای آن‌که صرفاً برنامه را محصور کند، حرکت را هدایت می‌کند. در همکف، نماهای شفاف، لبه‌های سبز و مسیرهای سرپوشیده یک رابط عمومی و نفوذپذیر ایجاد می‌کنند. حیاط آینده به‌جای قرار دادن یک مرز دفاعی در برابر شهر، لبه ساختمان را به دعوتی برای ورود به فضای مشترک تبدیل می‌کند." },
          caption: { en: "The curved public edge and its sheltered glazed threshold.", fa: "لبه عمومی منحنی و آستانه شیشه‌ای سرپوشیده آن." } },
        { type: "sticky-narrative", role: "experience",
          mediaIds: ["p002-arrival", "p002-central-courtyard", "p002-landscape-path",
                     "p002-structure-interior", "p002-interior-atrium", "p002-public-lounge",
                     "p002-material-detail", "p002-terrace", "p002-concept-diagram",
                     "p002-site-plan", "p002-twilight", "p002-closing-night"],
          title: { en: "A Courtyard Reimagined", fa: "بازتصور حیاط" },
          body: { en: "The project begins with the courtyard as an idea rather than a fixed geometric form. Instead of reproducing a closed perimeter around a singular centre, Future Courtyard distributes the qualities of the courtyard across a larger spatial field. Open edges, planted voids, terraces, transparent boundaries and continuous circulation allow enclosure and openness to coexist. Inside, large voids, circulation galleries, exposed structure and landscape create a continuous shared environment rather than a collection of isolated rooms. The courtyard becomes not a room without a roof, but an organising principle connecting people, landscape and architecture.",
                  fa: "پروژه با حیاط به‌عنوان یک ایده آغاز می‌شود، نه یک فرم هندسی تثبیت‌شده. حیاط آینده به‌جای بازتولید یک پیرامون بسته حول یک مرکز واحد، کیفیت‌های حیاط را در یک میدان فضایی گسترده‌تر توزیع می‌کند. لبه‌های باز، تهی‌گاه‌های کاشته‌شده، تراس‌ها، مرزهای شفاف و مسیرهای حرکتی پیوسته امکان همزیستی درون‌گرایی و گشودگی را فراهم می‌کنند. در فضای داخلی، تهی‌گاه‌های بزرگ، گالری‌های حرکتی، سازه آشکار و منظر به‌جای مجموعه‌ای از اتاق‌های منفصل، محیطی مشترک و پیوسته ایجاد می‌کنند. حیاط دیگر صرفاً اتاقی بدون سقف نیست؛ بلکه به اصلی سازمان‌دهنده برای اتصال انسان، منظر و معماری تبدیل می‌شود." } }
      ]
    }),
    /* ---------------------------------------------------------------------
       PROJECT 03 — GRAND HOTEL TEHRAN (curated presentation content)
       Media 01–03 are user-supplied project references; 04–13 are editorial
       visualisations and must never be described as as-built photography.
       --------------------------------------------------------------------- */
    project({
      id: "project-003", slug: "grand-hotel-tehran", sortOrder: 3,
      contentState: "real", published: true, featured: true,
      homepageFeatured: true, homepageOrder: 3,
      contentSource: "curated-project-presentation",
      metadataStatus: "working-presentation-data",
      title: { en: "Grand Hotel Tehran", fa: "گرند هتل تهران" },
      shortTitle: { en: "Grand Hotel", fa: "گرند هتل" },
      proposition: { en: "A vertical destination shaped between city, mountain and sky.",
                     fa: "مقصدی عمودی در امتداد شهر، کوهستان و آسمان." },
      homepageProposition: { en: "A vertical destination shaped<br />between city, mountain and sky.",
                             fa: "مقصدی عمودی در امتداد<br />شهر، کوهستان و آسمان." },
      secondaryStatement: {
        en: "A contemporary hospitality tower that combines a sculptural skyline presence with planted vertical spaces and a layered public podium.",
        fa: "برجی معاصر برای مهمان‌نوازی که حضوری پیکره‌وار در خط آسمان تهران را با فضاهای سبز عمودی و یک پایه عمومی لایه‌مند ترکیب می‌کند."
      },
      location: { en: "Tehran, Iran", fa: "تهران، ایران" },
      locationShort: { en: "Tehran, Iran", fa: "تهران، ایران" },
      country: "Iran",
      year: "2026", startYear: "2026", completionYear: "2026", years: "2026",
      status: "Concept",
      statusLabel: { en: "Concept Design", fa: "طراحی مفهومی" },
      typology: "Hospitality",
      typologyLabel: { en: "Luxury Hotel / Hospitality Tower", fa: "هتل لوکس / برج اقامتی" },
      expertise: ["architecture", "interior-architecture", "engineering", "sustainable-design"],
      services: ["architecture", "interior-architecture", "engineering", "sustainable-design"],
      serviceList: [
        { en: "Architectural Design", fa: "طراحی معماری" },
        { en: "Concept Design", fa: "طراحی مفهومی" },
        { en: "Hospitality Planning", fa: "برنامه‌ریزی فضاهای مهمان‌نوازی" },
        { en: "Interior Architecture", fa: "معماری داخلی" },
        { en: "Façade Strategy", fa: "راهبرد پوسته" },
        { en: "Landscape Integration", fa: "یکپارچه‌سازی منظر" },
        { en: "Structural Coordination", fa: "هماهنگی سازه" },
        { en: "MEP Coordination", fa: "هماهنگی تأسیسات" },
        { en: "Environmental Design Strategy", fa: "راهبرد طراحی محیطی" }
      ],
      client: { en: "Grand Hotel Tehran Development", fa: "توسعه گرند هتل تهران" },
      clientGroup: { en: "Private Development", fa: "توسعه خصوصی" },
      programme: {
        en: "Grand arrival court, hotel lobby, concierge and reception, guest lounges, ballroom, meeting and event spaces, signature restaurant, all-day dining, café, guest rooms, suites, executive lounge, wellness and spa, fitness, pool, sky lounge, rooftop restaurant and terrace, planted sky terraces, back-of-house, service areas and parking.",
        fa: "پیش‌فضای اصلی ورود، لابی هتل، پذیرش و کانسیرج، لانج‌های مهمان، سالن مراسم، فضاهای جلسات و رویداد، رستوران شاخص، رستوران تمام‌روز، کافه، اتاق‌های مهمان، سوئیت‌ها، لانج اجرایی، اسپا و سلامت، مجموعه ورزشی، استخر، اسکای‌لانج، رستوران و تراس بام، تراس‌های سبز مرتفع، فضاهای پشتیبانی، فضاهای خدماتی و پارکینگ."
      },
      siteArea: { en: "12,800 m²", fa: "۱۲٬۸۰۰ مترمربع" },
      builtArea: { en: "92,000 m²", fa: "۹۲٬۰۰۰ مترمربع" },
      towerHeight: { en: "198 m", fa: "۱۹۸ متر" },
      levels: { en: "45 levels", fa: "۴۵ طبقه" },
      rooms: { en: "286 guest rooms", fa: "۲۸۶ واحد اقامتی" },
      suites: { en: "42 suites", fa: "۴۲ سوئیت" },
      publicLevels: { en: "8 public hospitality levels", fa: "۸ طبقه عمومی و مهمان‌نوازی" },
      photographyCredit: null,
      team: [
        { role: { en: "Architecture", fa: "معماری" }, name: { en: "Tarh & Afarinesh", fa: "مهندسین مشاور طرح و آفرینش" } },
        { role: { en: "Design", fa: "طراحی" }, name: { en: "Tarh & Afarinesh Design Team", fa: "تیم طراحی طرح و آفرینش" } },
        { role: { en: "Interior Architecture", fa: "معماری داخلی" }, name: { en: "Tarh & Afarinesh", fa: "طرح و آفرینش" } },
        { role: { en: "Landscape Integration", fa: "یکپارچه‌سازی منظر" }, name: { en: "Tarh & Afarinesh", fa: "طرح و آفرینش" } },
        { role: { en: "Façade Strategy", fa: "راهبرد پوسته" }, name: { en: "Integrated Design Team", fa: "تیم طراحی یکپارچه" } },
        { role: { en: "Structural Coordination", fa: "هماهنگی سازه" }, name: { en: "Integrated Design Team", fa: "تیم طراحی یکپارچه" } },
        { role: { en: "MEP Coordination", fa: "هماهنگی تأسیسات" }, name: { en: "Integrated Design Team", fa: "تیم طراحی یکپارچه" } },
        { role: { en: "Environmental Strategy", fa: "راهبرد محیطی" }, name: { en: "Integrated Design Team", fa: "تیم طراحی یکپارچه" } }
      ],
      editorial: {
        homepageDescription: {
          en: "A sculptural hospitality tower that frames Tehran through vertical gardens, flowing façade ribbons and a layered public base.",
          fa: "برجی پیکره‌وار برای مهمان‌نوازی که تهران را از خلال باغ‌های عمودی، نوارهای روان پوسته و یک پایه عمومی لایه‌مند قاب می‌گیرد."
        },
        archiveDescription: {
          en: "Grand Hotel Tehran is conceived as a vertical destination where a layered hospitality podium rises into a slender tower defined by flowing façade fins and planted sky terraces.",
          fa: "گرند هتل تهران به‌عنوان مقصدی عمودی تصور شده است؛ جایی که یک پایه لایه‌مند برای فضاهای مهمان‌نوازی به برجی باریک با فین‌های روان نما و تراس‌های سبز مرتفع تبدیل می‌شود."
        },
        lead: {
          en: "Grand Hotel Tehran is conceived as a vertical destination within the metropolitan landscape of Tehran: a building that must operate at once as hotel, public address and skyline presence.",
          fa: "گرند هتل تهران به‌عنوان مقصدی عمودی در بستر کلان‌شهری تهران تصور شده است؛ ساختمانی که باید همزمان نقش هتل، نشانی عمومی و حضوری در خط آسمان شهر را ایفا کند."
        },
        chapters: [
          { en: "The project is organised through a deliberate contrast between podium and tower. At the ground and lower levels, broad horizontal plates create a layered public base containing arrival, lobby, dining, event and wellness functions. Above, the hotel becomes progressively more vertical and slender.",
            fa: "پروژه بر تضادی آگاهانه میان پایه و برج سازمان یافته است. در طبقات همکف و پایین‌تر، صفحات افقی گسترده پایه‌ای لایه‌مند برای فضاهای ورود، لابی، پذیرایی، رویداد و سلامت ایجاد می‌کنند. در ارتفاع، ساختمان به‌تدریج باریک‌تر و عمودی‌تر می‌شود." },
          { en: "The tower envelope is defined by a field of continuous vertical fins. Rather than remaining parallel, these elements bend and converge to carve a tall opening through the façade. The void introduces planted terraces into the elevation and transforms the tower from a sealed object into a building with depth, shadow and inhabitable exterior space.",
            fa: "پوسته برج با مجموعه‌ای از فین‌های عمودی پیوسته تعریف می‌شود. این عناصر به‌جای حرکت موازی، خم می‌شوند و به یکدیگر نزدیک می‌شوند تا شکافی بلند در نما ایجاد کنند. این تهی‌گاه، تراس‌های سبز را وارد پوسته می‌کند و برج را از یک ابژه بسته به ساختمانی دارای عمق، سایه و فضای بیرونی قابل استفاده تبدیل می‌سازد." },
          { en: "Inside, panoramic rooms and public spaces frame Tehran, the Alborz Mountains and the city's changing light. Landscape moves vertically through podium terraces, the carved façade void and rooftop spaces, creating moments of retreat within the scale of the tower.",
            fa: "در داخل، اتاق‌ها و فضاهای عمومی پانوراماهایی از تهران، رشته‌کوه البرز و تغییرات نور شهر را قاب می‌گیرند. منظر از تراس‌های پایه به تهی‌گاه سبز نما و فضاهای بام امتداد پیدا می‌کند و در مقیاس عمودی برج لحظه‌هایی برای مکث ایجاد می‌کند." },
          { en: "Grand Hotel Tehran therefore combines two conditions: the efficiency and clarity of a contemporary hospitality tower and the identity of a sculptural urban landmark.",
            fa: "گرند هتل تهران در نتیجه دو وضعیت را در کنار هم قرار می‌دهد: کارایی و خوانایی یک برج معاصر مهمان‌نوازی و هویت پیکره‌وار یک نشانه شهری." }
        ],
        seoTitle: { en: "Grand Hotel Tehran | Tarh & Afarinesh", fa: "گرند هتل تهران | طرح و آفرینش" },
        seoDescription: {
          en: "Grand Hotel Tehran is conceived as a 198-metre hospitality tower where a sculptural façade, planted vertical terraces and a layered public podium create a new vertical destination within Tehran.",
          fa: "گرند هتل تهران به‌عنوان برجی ۱۹۸ متری برای مهمان‌نوازی تصور شده است؛ پروژه‌ای که در آن پوسته‌ای پیکره‌وار، تراس‌های سبز عمودی و پایه‌ای عمومی و لایه‌مند، مقصدی تازه در تهران شکل می‌دهند."
        },
        socialDescription: {
          en: "A sculptural hospitality tower opening vertically toward landscape, Tehran and the Alborz Mountains.",
          fa: "برجی پیکره‌وار برای مهمان‌نوازی که در ارتفاع به سوی منظر، تهران و رشته‌کوه البرز باز می‌شود."
        }
      },
      quote: { en: "The tower opens to make room for landscape.",
               fa: "برج باز می‌شود تا برای منظر جا باز کند.", by: null },
      facts: [
        { value: "198 m", note: { en: "Tower Height", fa: "ارتفاع برج" } },
        { value: "45", note: { en: "Levels", fa: "طبقات" } },
        { value: "92,000 m²", note: { en: "Built Area", fa: "زیربنا" } },
        { value: "286", note: { en: "Guest Rooms", fa: "اتاق مهمان" } },
        { value: "42", note: { en: "Suites", fa: "سوئیت" } },
        { value: "12,800 m²", note: { en: "Site", fa: "مساحت سایت" } },
        { value: "8", note: { en: "Public Hospitality Levels", fa: "طبقات عمومی و مهمان‌نوازی" } },
        { value: "2026", note: { en: "Concept Year", fa: "سال طراحی مفهومی" } }
      ],
      drawings: [],
      presentation: { ratio: "16/9", previewSize: [100, 56], plate: 2, heroTheme: "light",
                      density: "rich", homepageRatio: "16/9" },
      media: [
        media({ id: "p003-aerial-context", src: "assets/projects/project-003/01_aerial_context.jpg",
                roles: ["hero", "homepage", "viewer"], ratio: "16/9", sourceType: "user-supplied-project-reference",
                objectPosition: "62% 48%", heroPosition: "62% 48%", homepagePosition: "62% 48%",
                tabletPosition: "60% 48%", mobilePosition: "64% 46%", theme: "light",
                alt: { en: "Aerial view of Grand Hotel Tehran rising above a landscaped urban setting with Tehran and the Alborz Mountains beyond.",
                       fa: "نمای هوایی گرند هتل تهران در بستر سبز شهری با تهران و رشته‌کوه البرز در پس‌زمینه." },
                sourceFile: "01_original_aerial_context.jpg" }),
        media({ id: "p003-urban-approach", src: "assets/projects/project-003/03_urban_approach.jpg",
                roles: ["archive", "story", "viewer"], ratio: "3/2", sourceType: "user-supplied-project-reference",
                objectPosition: "52% 48%", archivePosition: "52% 48%", mobilePosition: "52% 45%",
                alt: { en: "Street approach to Grand Hotel Tehran showing its slender tower and sculpted vertical façade.",
                       fa: "نمای خیابانی گرند هتل تهران با برج باریک و پوسته عمودی پیکره‌وار." },
                sourceFile: "03_original_urban_approach.jpg" }),
        media({ id: "p003-street-low-angle", src: "assets/projects/project-003/02_street_low_angle.jpg",
                roles: ["story", "exterior", "viewer"], ratio: "3/2", sourceType: "user-supplied-project-reference",
                objectPosition: "50% 42%", mobilePosition: "50% 38%",
                alt: { en: "Low-angle street view of Grand Hotel Tehran and its layered podium.",
                       fa: "نمای خیابانی از پایین به گرند هتل تهران و پایه لایه‌مند آن." },
                sourceFile: "02_original_street_low_angle.jpg" }),
        media({ id: "p003-arrival-entrance", src: "assets/projects/project-003/04_arrival_entrance.jpg",
                roles: ["story", "arrival", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of the landscaped hotel arrival and entrance canopy.",
                       fa: "تصویرسازی پیش‌فضای سبز ورود و سایبان اصلی گرند هتل تهران." },
                sourceFile: "04_generated_arrival_entrance.jpg" }),
        media({ id: "p003-lobby-atrium", src: "assets/projects/project-003/05_lobby_atrium.jpg",
                roles: ["story", "interior", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of the Grand Hotel Tehran lobby with double-height glazing and panoramic city views.",
                       fa: "تصویرسازی لابی گرند هتل تهران با شیشه سرتاسری و دید پانورامای شهر." },
                sourceFile: "05_generated_lobby_atrium.jpg" }),
        media({ id: "p003-guest-suite", src: "assets/projects/project-003/06_guest_suite.jpg",
                roles: ["story", "interior", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of a guest suite overlooking Tehran and the mountain horizon.",
                       fa: "تصویرسازی سوئیت مهمان با چشم‌انداز تهران و افق کوهستان." },
                sourceFile: "06_generated_guest_suite.jpg" }),
        media({ id: "p003-rooftop-sunset", src: "assets/projects/project-003/07_rooftop_sunset.jpg",
                roles: ["story", "sky-hospitality", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial sunset visualisation of the rooftop hospitality spaces overlooking Tehran.",
                       fa: "تصویرسازی غروب از فضاهای پذیرایی بام با چشم‌انداز تهران." },
                sourceFile: "07_generated_rooftop_sunset.jpg" }),
        media({ id: "p003-twilight-exterior", src: "assets/projects/project-003/08_twilight_exterior.jpg",
                roles: ["story", "twilight", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial twilight view of Grand Hotel Tehran illuminated against the Tehran skyline.",
                       fa: "تصویرسازی غروب گرند هتل تهران در برابر خط آسمان روشن شهر." },
                sourceFile: "08_generated_twilight_exterior.jpg" }),
        media({ id: "p003-facade-green-detail", src: "assets/projects/project-003/09_facade_green_detail.jpg",
                roles: ["story", "detail", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                caption: { en: "Flowing façade fins and planted vertical terraces.",
                           fa: "فین‌های روان نما و تراس‌های سبز عمودی." },
                alt: { en: "Editorial close view of the flowing façade fins and planted vertical terraces of Grand Hotel Tehran.",
                       fa: "نمای نزدیک تحریریه‌ای از فین‌های روان نما و تراس‌های سبز عمودی گرند هتل تهران." },
                sourceFile: "09_generated_facade_green_detail.jpg" }),
        media({ id: "p003-regional-context", src: "assets/projects/project-003/10_regional_context.jpg",
                roles: ["story", "context", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial metropolitan view of Grand Hotel Tehran in relation to Tehran and the Alborz Mountains.",
                       fa: "تصویرسازی شهری گرند هتل تهران در ارتباط با تهران و رشته‌کوه البرز." },
                sourceFile: "10_generated_regional_context.jpg" }),
        media({ id: "p003-sky-terrace", src: "assets/projects/project-003/11_sky_terrace.jpg",
                roles: ["story", "terrace", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of a planted sky terrace overlooking Tehran.",
                       fa: "تصویرسازی تراس سبز مرتفع با چشم‌انداز تهران." },
                sourceFile: "11_generated_sky_terrace.jpg" }),
        media({ id: "p003-concept-diagram", src: "assets/projects/project-003/12_concept_diagram.jpg",
                roles: ["story", "diagram", "viewer"], ratio: "4/3", sourceType: "editorial-diagram", crop: "contain",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                caption: { en: "Editorial / conceptual — not a technical drawing.",
                           fa: "تحریریه‌ای و مفهومی — نقشه فنی نیست." },
                alt: { en: "Conceptual sequence showing the transformation from a simple tower volume into a flowing façade wrapped around an inhabited planted void.",
                       fa: "توالی مفهومی تبدیل یک حجم ساده برج به پوسته‌ای روان پیرامون تهی‌گاهی سبز و قابل استفاده." },
                sourceFile: "12_generated_concept_diagram_editorial.jpg" }),
        media({ id: "p003-site-plan", src: "assets/projects/project-003/13_site_plan.jpg",
                roles: ["story", "diagram", "viewer"], ratio: "4/3", sourceType: "editorial-diagram", crop: "contain",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                caption: { en: "Illustrative / editorial — dimensions and scale are not verified.",
                           fa: "تصویری و تحریریه‌ای — ابعاد و مقیاس تأییدشده نیست." },
                alt: { en: "Illustrative site reading of the tower, layered podium, arrival court and surrounding landscape.",
                       fa: "خوانشی تصویری از برج، پایه لایه‌مند، پیش‌فضای ورود و منظر پیرامون." },
                sourceFile: "13_generated_site_plan_editorial.jpg" })
      ],
      story: [
        { type: "full-image", mediaId: "p003-regional-context", role: "context",
          title: { en: "A New Vertical Address", fa: "نشانی عمودی تازه" },
          body: { en: "Tehran is experienced against two dominant horizons: the dense metropolitan field and the Alborz Mountains beyond it. The tower responds to both. At city scale, its slender silhouette and changing façade profile create recognition from long distances. At closer range, the podium reduces the scale of the building and establishes a landscaped relationship with the street. The project therefore moves from landmark to address: visible from across the city, yet grounded through arrival gardens, terraces and public hospitality spaces.",
                  fa: "تهران میان دو افق اصلی تجربه می‌شود: بافت متراکم کلان‌شهری و رشته‌کوه البرز در پس‌زمینه. برج به هر دو وضعیت پاسخ می‌دهد. در مقیاس شهر، سیلوئت باریک و پروفیل متغیر نما امکان تشخیص ساختمان را از فاصله دور فراهم می‌کند. در مقیاس نزدیک، پایه ساختمان ارتفاع را کاهش داده و از طریق باغ ورود، تراس‌ها و فضاهای عمومی رابطه‌ای انسانی‌تر با خیابان ایجاد می‌کند. پروژه در نتیجه از یک نشانه شهری به یک آدرس تبدیل می‌شود؛ از دور قابل تشخیص و در سطح زمین قابل تجربه." } },
        { type: "image-text", mediaId: "p003-street-low-angle", role: "strategy",
          title: { en: "From City to Hospitality", fa: "از شهر تا مهمان‌نوازی" },
          body: { en: "The podium mediates between the height of the tower and the scale of arrival. Layered terraces step outward toward the landscape while a broad canopy defines the hotel entrance. The sequence is intentionally horizontal: street, garden, forecourt, canopy and lobby. This gradual transition allows the tower to remain monumental without making the arrival experience monumental in scale.",
                  fa: "پایه ساختمان میان ارتفاع برج و مقیاس ورود واسطه ایجاد می‌کند. تراس‌های لایه‌مند به سمت منظر گسترش می‌یابند و یک سایبان وسیع، ورودی هتل را تعریف می‌کند. توالی ورود آگاهانه افقی است: خیابان، باغ، پیش‌فضا، سایبان و لابی. این گذار تدریجی اجازه می‌دهد برج حضور شاخص خود را حفظ کند، بدون آن‌که تجربه ورود به فضایی خارج از مقیاس انسانی تبدیل شود." },
          caption: { en: "The layered podium and its stepped terraces.", fa: "پایه لایه‌مند و تراس‌های پله‌ای آن." } },
        { type: "sticky-narrative",
          mediaIds: ["p003-urban-approach", "p003-facade-green-detail", "p003-sky-terrace",
                     "p003-arrival-entrance", "p003-lobby-atrium", "p003-guest-suite",
                     "p003-rooftop-sunset", "p003-concept-diagram", "p003-site-plan",
                     "p003-twilight-exterior"],
          title: { en: "Carving the Vertical Void", fa: "تراشیدن تهی‌گاه عمودی" },
          body: { en: "The tower begins as a clear vertical volume, and its identity emerges through subtraction rather than addition. A deep vertical opening is carved into the façade, pulling the external envelope inward and creating a sequence of planted terraces through the height of the building. The façade fins respond to this void: their trajectories bend toward the opening, making the envelope appear to stretch around an inhabited vertical landscape. Inside, panoramic rooms and public interiors frame the city while a restrained palette of stone, warm timber and bronze-toned metal lets Tehran itself become the dominant interior image. The upper levels turn the skyline into occupied ground, and the tower culminates not in a closed mechanical crown but in inhabitable public space.",
                  fa: "برج از یک حجم عمودی روشن و خوانا آغاز می‌شود و هویت آن بیش از افزودن عناصر، از طریق کاستن شکل می‌گیرد. شکافی عمیق و عمودی در نما تراشیده می‌شود که پوسته بیرونی را به سمت داخل می‌کشد و در ارتفاع ساختمان مجموعه‌ای از تراس‌های سبز ایجاد می‌کند. فین‌های نما به این تهی‌گاه واکنش نشان می‌دهند؛ مسیر آن‌ها به سمت شکاف خم می‌شود و پوسته را مانند سطحی نشان می‌دهد که پیرامون یک منظر عمودی قابل سکونت کشیده شده است. در داخل، اتاق‌ها و فضاهای عمومی شهر را قاب می‌گیرند و پالت کنترل‌شده‌ای از سنگ، چوب گرم و فلزات برنزی اجازه می‌دهد خود تهران به تصویر اصلی فضای داخلی تبدیل شود. طبقات فوقانی خط آسمان را به زمینی قابل استفاده بدل می‌کنند و برج به‌جای پایان یافتن با یک تاج فنی بسته، با فضای عمومی قابل سکونت به پایان می‌رسد." } }
      ]
    }),
    /* ---------------------------------------------------------------------
       PROJECT 04 — DARIUSH HOTEL KISH (curated presentation content)
       Media 01–04 are user-supplied project references; 05–12 are editorial
       visualisations and must never be described as as-built photography.
       --------------------------------------------------------------------- */
    project({
      id: "project-004", slug: "dariush-hotel-kish", sortOrder: 4,
      contentState: "real", published: true, featured: true,
      homepageFeatured: true, homepageOrder: 4,
      contentSource: "curated-project-presentation",
      metadataStatus: "working-presentation-data",
      title: { en: "Dariush Hotel Kish", fa: "هتل داریوش کیش" },
      shortTitle: { en: "Dariush Hotel", fa: "هتل داریوش" },
      proposition: { en: "Persepolis reinterpreted as a coastal destination.",
                     fa: "بازخوانی تخت‌جمشید در قامت یک مقصد ساحلی." },
      homepageProposition: { en: "Persepolis reinterpreted<br />as a coastal destination.",
                             fa: "بازخوانی تخت‌جمشید<br />در قامت یک مقصد ساحلی." },
      secondaryStatement: {
        en: "A resort destination that transforms references to Persepolis into a contemporary hospitality experience on the Persian Gulf.",
        fa: "مقصدی اقامتی که ارجاعات به تخت‌جمشید را به تجربه‌ای معاصر از مهمان‌نوازی در کرانه خلیج فارس تبدیل می‌کند."
      },
      location: { en: "Kish Island, Hormozgan, Iran", fa: "جزیره کیش، هرمزگان، ایران" },
      locationShort: { en: "Kish Island, Iran", fa: "جزیره کیش، ایران" },
      country: "Iran",
      year: "2003", startYear: "2003", completionYear: "2003", years: "2003",
      status: "Completed",
      statusLabel: { en: "Completed", fa: "تکمیل‌شده" },
      typology: "Hospitality",
      typologyLabel: { en: "Luxury Resort Hotel", fa: "هتل ریزورت لوکس" },
      expertise: ["architecture", "interior-architecture", "urban-design"],
      services: ["architecture", "interior-architecture", "urban-design"],
      serviceList: [
        { en: "Architectural Design", fa: "طراحی معماری" },
        { en: "Hospitality Planning", fa: "برنامه‌ریزی فضاهای مهمان‌نوازی" },
        { en: "Interior Architecture", fa: "معماری داخلی" },
        { en: "Landscape Design", fa: "طراحی منظر" },
        { en: "Arrival & Ceremonial Sequence", fa: "طراحی توالی ورود و تشریفات" },
        { en: "Ornament & Relief Coordination", fa: "هماهنگی تزئینات و نقش‌برجسته" }
      ],
      client: { en: "Private Hospitality Client", fa: "کارفرمای خصوصی حوزه هتلداری" },
      clientGroup: { en: "Private Development", fa: "توسعه خصوصی" },
      programme: {
        en: "Ceremonial forecourt and arrival axis, grand lobby, reception, guest lounges, restaurants and cafés, ballroom and event spaces, guest rooms and suites, wellness and pool areas, reflecting pools and water features, formal gardens and palm landscape, beachfront terraces, back-of-house and service areas.",
        fa: "پیش‌فضای تشریفاتی و محور ورود، لابی بزرگ، پذیرش، لانج‌های مهمان، رستوران‌ها و کافه‌ها، سالن مراسم و فضاهای رویداد، اتاق‌ها و سوئیت‌ها، فضاهای سلامت و استخر، آب‌نماهای بازتابی، باغ‌های رسمی و نخلستان، تراس‌های ساحلی، فضاهای پشتیبانی و خدماتی."
      },
      scaleNote: { en: "Luxury resort hotel and landscape estate", fa: "مجموعه هتل لوکس و محوطه‌سازی گسترده" },
      photographyCredit: null,
      team: [
        { role: { en: "Architecture", fa: "معماری" }, name: { en: "Tarh & Afarinesh", fa: "مهندسین مشاور طرح و آفرینش" } },
        { role: { en: "Design", fa: "طراحی" }, name: { en: "Tarh & Afarinesh Design Team", fa: "تیم طراحی طرح و آفرینش" } },
        { role: { en: "Interior Architecture", fa: "معماری داخلی" }, name: { en: "Tarh & Afarinesh", fa: "طرح و آفرینش" } },
        { role: { en: "Landscape Design", fa: "طراحی منظر" }, name: { en: "Tarh & Afarinesh", fa: "طرح و آفرینش" } },
        { role: { en: "Ornament & Relief", fa: "تزئینات و نقش‌برجسته" }, name: { en: "Integrated Design Team", fa: "تیم طراحی یکپارچه" } },
        { role: { en: "Structural Coordination", fa: "هماهنگی سازه" }, name: { en: "Integrated Design Team", fa: "تیم طراحی یکپارچه" } },
        { role: { en: "MEP Coordination", fa: "هماهنگی تأسیسات" }, name: { en: "Integrated Design Team", fa: "تیم طراحی یکپارچه" } }
      ],
      editorial: {
        homepageDescription: {
          en: "A monumental coastal retreat where architecture, gardens, water and ceremonial movement shape an immersive guest experience.",
          fa: "اقامتگاهی ساحلی و یادمانی که در آن معماری، باغ‌ها، آب و توالی حرکتی، تجربه‌ای فراگیر برای مهمانان می‌آفریند."
        },
        archiveDescription: {
          en: "Dariush Hotel Kish is conceived as a monumental coastal retreat where architecture, gardens, water and ceremonial movement shape an immersive guest experience. The project combines the symbolic language of ancient Persian architecture with the comfort and grandeur of a destination resort.",
          fa: "هتل داریوش کیش به‌عنوان اقامتگاهی ساحلی و یادمانی شکل گرفته است؛ جایی که معماری، باغ‌ها، آب و توالی حرکتی، تجربه‌ای فراگیر برای مهمانان می‌آفریند. این پروژه زبان نمادین معماری ایران باستان را با آسایش و شکوه یک ریزورت مقصد تلفیق می‌کند."
        },
        lead: {
          en: "Set between ceremonial gardens and the waters of the Persian Gulf, the project frames hospitality as an experience of arrival, identity and landscape.",
          fa: "این پروژه در میان باغ‌های تشریفاتی و آب‌های خلیج فارس، مهمان‌نوازی را به تجربه‌ای از ورود، هویت و منظر تبدیل می‌کند."
        },
        chapters: [
          { en: "Inspired by the spatial memory of Persepolis, Dariush Hotel Kish reinterprets monumentality through a resort typology. Axial movement, sculpted gardens, elevated columns and carefully composed views create a destination that is both iconic and deeply experiential.",
            fa: "هتل داریوش کیش با الهام از حافظه فضایی تخت‌جمشید، شکوه یادمانی را در قالب یک ریزورت بازخوانی می‌کند. حرکت محوری، باغ‌های مجسمه‌وار، ستون‌های مرتفع و قاب‌بندی دقیق دیدها، مقصدی شاخص و در عین حال تجربه‌محور می‌آفرینند." },
          { en: "The project organises guest arrival around a monumental central axis, integrates gardens and water into the spatial sequence, and establishes a visual dialogue between architecture and the Gulf horizon. The result is a destination defined by identity, ceremony and immersive atmosphere.",
            fa: "پروژه ورود مهمان را حول یک محور یادمانی سازمان‌دهی می‌کند، باغ و آب را وارد توالی فضایی می‌سازد و میان معماری و افق خلیج فارس گفت‌وگویی بصری شکل می‌دهد. حاصل این رویکرد، مقصدی مبتنی بر هویت، تشریفات و اتمسفری فراگیر است." },
          { en: "Light-coloured stone, carved ornament, sculptural columns, water reflections and carefully controlled lighting give the project its memorable atmosphere. The material palette reinforces a sense of permanence and ceremonial presence, while the hospitality programme softens this monumentality through comfort and visual richness.",
            fa: "سنگ روشن، تزئینات حجاری‌شده، ستون‌های مجسمه‌وار، بازتاب آب و نورپردازی کنترل‌شده، اتمسفر ماندگار پروژه را شکل می‌دهند. پالت متریال، حس ماندگاری و حضور تشریفاتی را تقویت می‌کند، در حالی که برنامه اقامتی این یادمان‌گونگی را با آسایش و غنای بصری تعدیل می‌سازد." },
          { en: "Dariush Hotel Kish stands as a destination where heritage reference, hospitality and landscape are brought together in a single immersive environment. Its identity is defined not only by image, but by sequence, atmosphere and the lasting memory of arrival.",
            fa: "هتل داریوش کیش مقصدی است که در آن ارجاع به میراث، مهمان‌نوازی و منظر در یک محیط فراگیر کنار هم قرار می‌گیرند. هویت این پروژه نه فقط با تصویر، بلکه با توالی فضایی، اتمسفر و خاطره ماندگارِ ورود تعریف می‌شود." }
        ],
        seoTitle: { en: "Dariush Hotel Kish | Tarh & Afarinesh", fa: "هتل داریوش کیش | طرح و آفرینش" },
        seoDescription: {
          en: "Dariush Hotel Kish is a luxury resort project on Kish Island that combines Persian cultural references, ceremonial arrival, monumental landscape and a strong coastal hospitality experience.",
          fa: "هتل داریوش کیش یک پروژه اقامتی لوکس در جزیره کیش است که ارجاعات فرهنگی ایرانی، ورود تشریفاتی، منظر یادمانی و تجربه‌ای قوی از مهمان‌نوازی ساحلی را در کنار هم قرار می‌دهد."
        },
        socialDescription: {
          en: "A Persepolis-inspired resort where ceremonial arrival, gardens and the Persian Gulf define the guest experience.",
          fa: "ریزورتی با الهام از تخت‌جمشید که ورود تشریفاتی، باغ‌ها و خلیج فارس تجربه مهمان را در آن تعریف می‌کنند."
        }
      },
      quote: { en: "Identity is defined not only by image, but by the lasting memory of arrival.",
               fa: "هویت نه فقط با تصویر، بلکه با خاطره ماندگارِ ورود تعریف می‌شود.", by: null },
      facts: [
        { value: "2003", note: { en: "Completed", fa: "سال تکمیل" } },
        { value: "Kish", note: { en: "Island Destination", fa: "مقصد جزیره‌ای" } },
        { value: "Resort", note: { en: "Hotel Typology", fa: "گونه اقامتی" } },
        { value: "Axial", note: { en: "Ceremonial Sequence", fa: "توالی تشریفاتی" } },
        { value: "Gardens", note: { en: "Landscape Estate", fa: "محوطه باغ‌مانند" } },
        { value: "Gulf", note: { en: "Coastal Horizon", fa: "افق ساحلی" } }
      ],
      drawings: [],
      presentation: { ratio: "16/9", previewSize: [100, 56], plate: 3, heroTheme: "dark",
                      density: "rich", homepageRatio: "16/9" },
      media: [
        media({ id: "p004-main-axis-night", src: "assets/projects/project-004/04_main_axis_night.jpg",
                roles: ["hero", "homepage", "viewer"], ratio: "16/9", sourceType: "user-supplied-project-reference",
                objectPosition: "50% 48%", heroPosition: "50% 48%", homepagePosition: "50% 48%",
                tabletPosition: "50% 48%", mobilePosition: "50% 46%", theme: "dark",
                alt: { en: "Night view along the ceremonial main axis of Dariush Hotel Kish, with reflecting pools leading to the illuminated monumental entrance.",
                       fa: "نمای شبانه محور تشریفاتی اصلی هتل داریوش کیش با آب‌نماهای بازتابی رو به ورودی یادمانی روشن." },
                sourceFile: "04_original_main_axis_night.jpg" }),
        media({ id: "p004-aerial-resort-context", src: "assets/projects/project-004/03_aerial_resort_context.jpg",
                roles: ["archive", "story", "viewer"], ratio: "3/2", sourceType: "user-supplied-project-reference",
                objectPosition: "50% 52%", archivePosition: "50% 52%", mobilePosition: "50% 50%",
                alt: { en: "Aerial view of Dariush Hotel Kish showing the symmetrical resort plan, formal gardens and the Persian Gulf beyond.",
                       fa: "نمای هوایی هتل داریوش کیش با پلان متقارن مجموعه، باغ‌های رسمی و خلیج فارس در پس‌زمینه." },
                sourceFile: "03_original_aerial_resort_context.jpg" }),
        media({ id: "p004-garden-edge-day", src: "assets/projects/project-004/02_garden_edge_day.jpg",
                roles: ["story", "landscape", "viewer"], ratio: "3/2", sourceType: "user-supplied-project-reference",
                alt: { en: "Daylight view of the garden edge at Dariush Hotel Kish, with colonnades, gilded capitals and flowering planting.",
                       fa: "نمای روز از لبه باغ هتل داریوش کیش با ستون‌بندی، سرستون‌های زراندود و پوشش گیاهی گل‌دار." },
                sourceFile: "02_original_garden_edge_day.jpg" }),
        media({ id: "p004-entry-twilight", src: "assets/projects/project-004/01_entry_twilight.jpg",
                roles: ["story", "detail", "viewer"], ratio: "3/2", sourceType: "user-supplied-project-reference",
                caption: { en: "Carved reliefs and sculpted guardians at the entrance threshold.",
                           fa: "نقش‌برجسته‌ها و نگهبانان حجاری‌شده در آستانه ورودی." },
                alt: { en: "Twilight view of the carved Achaemenid-inspired reliefs and sculpted figures flanking the hotel entrance.",
                       fa: "نمای غروب از نقش‌برجسته‌های الهام‌گرفته از هخامنشی و پیکره‌های حجاری‌شده در دو سوی ورودی هتل." },
                sourceFile: "01_original_entry_twilight.jpg" }),
        media({ id: "p004-blue-hour-front", src: "assets/projects/project-004/05_blue_hour_front.jpg",
                roles: ["story", "exterior", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation", theme: "dark",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial blue-hour visualisation of the hotel frontage, colonnade and reflecting water axis.",
                       fa: "تصویرسازی غروب از نمای اصلی هتل، ستون‌بندی و محور آب بازتابی." },
                sourceFile: "05_generated_blue_hour_front.jpg" }),
        media({ id: "p004-seaside-palace-context", src: "assets/projects/project-004/06_seaside_palace_context.jpg",
                roles: ["story", "context", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of the resort's garden court with fountains, columns and the sea beyond.",
                       fa: "تصویرسازی حیاط باغ مجموعه با فواره‌ها، ستون‌ها و دریا در پس‌زمینه." },
                sourceFile: "06_generated_seaside_palace_context.jpg" }),
        media({ id: "p004-resort-gardens-aerial", src: "assets/projects/project-004/07_resort_gardens_aerial.jpg",
                roles: ["story", "landscape", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial aerial visualisation of the formal resort gardens, water axis and symmetrical arrival court.",
                       fa: "تصویرسازی هوایی از باغ‌های رسمی مجموعه، محور آب و پیش‌فضای متقارن ورود." },
                sourceFile: "07_generated_resort_gardens_aerial.jpg" }),
        media({ id: "p004-arrival-golden-hour", src: "assets/projects/project-004/08_arrival_golden_hour.jpg",
                roles: ["story", "arrival", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial golden-hour visualisation of guests arriving beneath the monumental entrance portal.",
                       fa: "تصویرسازی ورود مهمانان در نور طلایی عصر، زیر دروازه یادمانی ورودی." },
                sourceFile: "08_generated_arrival_golden_hour.jpg" }),
        media({ id: "p004-grand-lobby", src: "assets/projects/project-004/09_grand_lobby.jpg",
                roles: ["story", "interior", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of the grand lobby with colossal columns, carved reliefs and a view through to the sea.",
                       fa: "تصویرسازی لابی بزرگ با ستون‌های عظیم، نقش‌برجسته‌های حجاری‌شده و دید امتدادیافته تا دریا." },
                sourceFile: "09_generated_grand_lobby.jpg" }),
        media({ id: "p004-twilight-seaside", src: "assets/projects/project-004/10_twilight_seaside_view.jpg",
                roles: ["story", "twilight", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation", theme: "dark",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                caption: { en: "As night falls, the illuminated axis reads across the whole estate.",
                           fa: "با فرارسیدن شب، محور روشن در سراسر مجموعه خوانده می‌شود." },
                alt: { en: "Editorial twilight visualisation of the illuminated resort, gardens and shoreline.",
                       fa: "تصویرسازی غروب از مجموعه روشن، باغ‌ها و خط ساحلی." },
                sourceFile: "10_generated_twilight_seaside_view.jpg" }),
        media({ id: "p004-resortscape-gulf", src: "assets/projects/project-004/11_resortscape_persian_gulf.jpg",
                roles: ["story", "coastal", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of the resort's pool terraces and palm landscape opening toward the Persian Gulf.",
                       fa: "تصویرسازی تراس‌های استخر و نخلستان مجموعه که به سوی خلیج فارس گشوده می‌شوند." },
                sourceFile: "11_generated_resortscape_persian_gulf.jpg" }),
        media({ id: "p004-luxury-suite", src: "assets/projects/project-004/12_luxury_suite.jpg",
                roles: ["story", "interior", "viewer"], ratio: "4/3", sourceType: "editorial-visualisation",
                credit: { en: "Editorial visualisation based on project references", fa: "تصویرسازی تحریریه‌ای بر اساس منابع پروژه" },
                alt: { en: "Editorial visualisation of a guest suite with carved relief headboard, Persian textiles and a sea-facing balcony.",
                       fa: "تصویرسازی سوئیت مهمان با نقش‌برجسته حجاری‌شده، منسوجات ایرانی و بالکن رو به دریا." },
                sourceFile: "12_generated_luxury_suite.jpg" })
      ],
      story: [
        { type: "full-image", mediaId: "p004-aerial-resort-context",
          title: { en: "Overview", fa: "معرفی پروژه" },
          body: { en: "Dariush Hotel Kish is a hospitality landmark on Kish Island that combines resort living with a strong narrative of cultural memory. The project organises guest arrival around a monumental central axis, integrates gardens and water into the spatial sequence, and establishes a visual dialogue between architecture and the Gulf horizon. The result is a destination defined by identity, ceremony and immersive atmosphere.",
                  fa: "هتل داریوش کیش یک نشانه اقامتی در جزیره کیش است که زندگی ریزورتی را با روایتی پررنگ از حافظه فرهنگی پیوند می‌دهد. پروژه ورود مهمان را حول یک محور یادمانی سازمان‌دهی می‌کند، باغ و آب را وارد توالی فضایی می‌سازد و میان معماری و افق خلیج فارس گفت‌وگویی بصری شکل می‌دهد. حاصل این رویکرد، مقصدی مبتنی بر هویت، تشریفات و اتمسفری فراگیر است." } },
        { type: "image-text", mediaId: "p004-garden-edge-day", role: "experience",
          title: { en: "Landscape & Arrival", fa: "منظر و ورود" },
          body: { en: "The arrival sequence is conceived as an unfolding experience: broad forecourts, framed symmetry, reflective water elements and lush planting prepare the guest for a monumental threshold. The landscape is not background; it is an active part of the project identity, extending the architecture into a resort-scale garden setting.",
                  fa: "توالی ورود به‌صورت تجربه‌ای تدریجی طراحی شده است: پیش‌فضاهای گسترده، تقارن قاب‌شده، آب‌نماهای بازتابی و پوشش گیاهی غنی، مهمان را برای رسیدن به آستانه‌ای یادمانی آماده می‌کنند. منظر در این پروژه پس‌زمینه نیست؛ بلکه بخشی فعال از هویت آن است و معماری را در مقیاس یک باغ‌ریزورت گسترش می‌دهد." },
          caption: { en: "Colonnades, gilded capitals and the garden edge.", fa: "ستون‌بندی، سرستون‌های زراندود و لبه باغ." } },
        { type: "sticky-narrative", role: "strategy",
          mediaIds: ["p004-entry-twilight", "p004-arrival-golden-hour", "p004-resort-gardens-aerial",
                     "p004-seaside-palace-context", "p004-grand-lobby", "p004-luxury-suite",
                     "p004-resortscape-gulf", "p004-blue-hour-front", "p004-twilight-seaside"],
          title: { en: "Design Concept", fa: "ایده طراحی" },
          body: { en: "The design draws on Achaemenid references not as decoration, but as a spatial framework. Monumental gateways, colonnades, sculptural reliefs and long ceremonial vistas shape the visitor's movement from arrival to interior: a reinterpretation of Persepolis-inspired grandeur, a ceremonial sequence from forecourt to lobby, architecture integrated with landscape and water, and a destination identity rooted in Persian heritage. Inside, the project continues its language of grandeur through high-volume spaces, axial composition and a carefully staged sense of arrival. Public interiors emphasise scale and visual drama, while guest spaces balance elegance, warmth and expansive views — an experience designed to move seamlessly between spectacle and comfort.",
                  fa: "ایده طراحی از ارجاعات هخامنشی نه به‌عنوان تزئین، بلکه به‌عنوان یک چارچوب فضایی استفاده می‌کند. دروازه‌های یادمانی، ستون‌بندی‌ها، نقش‌برجسته‌های حجمی و دیدهای طولانی تشریفاتی، حرکت بازدیدکننده را از لحظه ورود تا فضاهای داخلی هدایت می‌کنند: بازخوانی شکوه فضایی الهام‌گرفته از تخت‌جمشید، توالی تشریفاتی از پیش‌فضا تا لابی، ادغام معماری با منظر و آب، و هویت مقصدی با ریشه در میراث ایرانی. در داخل، زبان شکوه پروژه با فضاهای مرتفع، ترکیب‌بندی محوری و حس ورودِ حساب‌شده ادامه می‌یابد. فضاهای عمومی بر مقیاس و تاثیر بصری تکیه دارند، در حالی که فضاهای اقامتی میان ظرافت، گرما و دیدهای گسترده تعادل برقرار می‌کنند؛ تجربه‌ای که میان نمایش و آسایش پیوسته در حرکت است." } }
      ]
    }),
    project({
      id: "project-005", slug: "brick-datum", sortOrder: 5,
      title: { en: "Brick Datum", fa: "تراز آجر" },
      proposition: { en: "One material, read three ways.", fa: "یک مصالح، سه خوانش" },
      location: { en: "Tehran", fa: "تهران" }, year: "2024", years: "2022–2024",
      status: "Completed", typology: "Workplace", expertise: ["architecture"],
      presentation: { ratio: "4/3", previewSize: [94, 56], plate: 0 },
      media: [media({ id: "p005-hero", plate: 0, roles: ["hero", "archive"], ratio: "4/3" })]
    }),
    project({
      id: "project-006", slug: "shade-market", sortOrder: 6,
      title: { en: "Shade Market", fa: "بازار سایه" },
      proposition: { en: "Trade under a borrowed roof.", fa: "داد‌وستد زیر سقفی عاریتی" },
      location: { en: "Yazd", fa: "یزد" }, year: "2023", years: "2023",
      status: "Concept", typology: "Commercial", expertise: ["urban-design"],
      /* deliberately sparse — proves the detail template omits absent modules */
      presentation: { ratio: "16/10", previewSize: [100, 50], plate: 2, density: "sparse" },
      media: [media({ id: "p006-hero", plate: 2, roles: ["hero", "archive"], ratio: "16/10" })]
    }),
    project({
      id: "project-007", slug: "quiet-renovation", sortOrder: 7,
      title: { en: "Quiet Renovation", fa: "بازآفرینی آرام" },
      proposition: { en: "Subtraction as the main gesture.", fa: "کاستن، به‌جای افزودن" },
      location: { en: "Tehran", fa: "تهران" }, year: "2023", years: "2022–2023",
      status: "Completed", typology: "Renovation", expertise: ["interior-architecture"],
      presentation: { ratio: "3/4", previewSize: [72, 64], plate: 1 },
      media: [media({ id: "p007-hero", plate: 1, roles: ["hero", "archive"], ratio: "3/4" })]
    }),
    project({
      id: "project-008", slug: "northern-terraces", sortOrder: 8,
      title: { en: "Northern Terraces", fa: "مجموعه مسکونی تراس‌های شمالی و باغ‌های پیوسته" },
      proposition: { en: "Terraces that keep the garden.", fa: "تراس‌هایی که باغ را نگه می‌دارند" },
      location: { en: "Karaj", fa: "کرج" }, year: "2022", years: "2019–2022",
      status: "Progress", typology: "Residential", expertise: ["sustainable-design"],
      presentation: { ratio: "2/1", previewSize: [100, 46], plate: 3 },
      media: [media({ id: "p008-hero", plate: 3, roles: ["hero", "archive"], ratio: "2/1" })]
    })
  ];

  /* ---------- prototype detail defaults -------------------------------------
     The editorial copy the prototype detail template used to author inline.
     ONLY prototype records may read these. A draft or real record never inherits
     them — a missing real value hides its module instead. */
  var PROTOTYPE_DETAIL = {
    lead: { en: "Project lead paragraph. Placeholder editorial copy that opens the design proposition and hands the reader on to the longer narrative.",
            fa: "بند راهنمای پروژه. متنی جایگزین با لحن تحریری که گزاره اصلی طرح را باز می‌کند و خواننده را به روایت می‌رساند." },
    chapters: [
      { en: "Opening narrative paragraph. Placeholder copy at a realistic length so column widths and line measure can be judged against genuine editorial density rather than lorem.",
        fa: "بند نخست روایت پروژه. متن جایگزین با طولی واقعی تا ستون‌بندی و طول سطر در فارسی سنجیده شود و ریتم بندها حفظ شود." },
      { en: "Second paragraph. Structure, light and material described at enough length to evaluate text density and where image interruptions belong in the flow.",
        fa: "بند دوم. توضیح سازه، نور و مصالح در سطحی که بتوان تراکم متن را ارزیابی کرد و جای تصاویر میان متن مشخص شود." },
      { en: "Third paragraph. The relationship to the urban context and the intermediate courtyards, with references to the plans and sections that follow.",
        fa: "بند سوم. رابطه پروژه با زمینه شهری و حیاط‌های میانی، همراه با ارجاع به نقشه‌ها و مقاطع." },
      { en: "Fourth paragraph. Construction stage, facade detailing and what changed on site between design and delivery.",
        fa: "بند چهارم. مرحله اجرا، جزئیات نما و آنچه در ساخت تغییر کرد." }
    ],
    chaptersSparse: [
      { en: "Short placeholder narrative. This project is at concept stage and carries little content; the template has to hold without leaving dead space.",
        fa: "متن کوتاه جایگزین. این پروژه در مرحله مفهومی است و محتوای کمی دارد؛ قالب باید بدون فضای خالی ناخواسته کار کند." }
    ],
    team: [
      { role: { en: "Lead architect", fa: "معمار مسئول" }, name: { en: "Placeholder name", fa: "نام جایگزین" } },
      { role: { en: "Design team", fa: "تیم طراحی" }, name: { en: "Four people — placeholder", fa: "چهار نفر — جایگزین" } },
      { role: { en: "Structure", fa: "سازه" }, name: { en: "Placeholder consultant", fa: "همکار جایگزین" } },
      { role: { en: "Services", fa: "تأسیسات" }, name: { en: "Placeholder consultant", fa: "همکار جایگزین" } },
      { role: { en: "Landscape", fa: "منظر" }, name: { en: "Placeholder consultant", fa: "همکار جایگزین" } }
    ],
    captionA: { en: "Intermediate courtyard — portrait", fa: "حیاط میانی — پرتره" },
    pull: { en: "Nine volumes, nine courts: density converted into shared ground.",
            fa: "نه حجم، نه حیاط: تراکم به فضای مشترک تبدیل می‌شود." },
    pullBody: { en: "Supporting placeholder paragraph, long enough to judge the relationship between the image column and the text column beside it.",
                fa: "متن پشتیبان جایگزین. طول این بند به اندازه‌ای است که رابطه ستون تصویر و ستون متن سنجیده شود." },
    narrativeTitle: { en: "From grid to courtyard", fa: "از شبکه به حیاط" },
    narrativeBody: { en: "Sticky narrative chapter. The text holds position while the media passes it; the counter marks which image you are beside.",
                     fa: "بخش روایی چسبان. متن در جای خود می‌ماند و تصاویر از کنارش می‌گذرند؛ شمارنده وضعیت را نشان می‌دهد." },
    programme: { en: "Residential, ground-floor retail, public courtyard", fa: "مسکونی، تجاری در همکف، حیاط عمومی" },
    builtArea: "12,500 m²",
    siteArea: "4,200 m²",
    photographyCredit: { en: "To be credited", fa: "به‌زودی" },
    client: { en: "Placeholder client", fa: "کارفرمای جایگزین" },
    facts: [
      { value: "12,500", note: { en: "square metres across nine volumes", fa: "متر مربع زیربنا در نه حجم" }, col: "1 / span 4" },
      { value: "42%", note: { en: "of the ground plane left open", fa: "سطح باز در تراز همکف" }, col: "6 / span 3" },
      { value: "09", note: { en: "intermediate courtyards", fa: "حیاط میانی" }, col: "10 / span 3" },
      { value: "2022–26", note: { en: "from first study to completion", fa: "از مطالعه تا بهره‌برداری" }, col: "1 / span 5" }
    ],
    quote: { en: "\u201cThe building is not finished. It has simply been handed to the city.\u201d",
             fa: "«ساختمان تمام نشده است؛ فقط به شهر تحویل داده شده.»" },
    quoteBy: { en: "Lead architect — placeholder", fa: "معمار مسئول — جایگزین" },
    viewer: [
      { plate: 1, caption: { en: "Landscape — full bleed", fa: "نمای بیرونی — تمام‌عرض" } },
      { plate: 2, caption: { en: "Portrait 3:4 — interior", fa: "پرتره ۳:۴ — فضای داخلی" } },
      { plate: 0, caption: { en: "Ground floor plan 1:200", fa: "پلان همکف ۱:۲۰۰" } }
    ]
  };

  /* §11 — adapts the approved prototype composition into canonical story blocks,
     so prototype and real content share one renderer. */
  function protoStory(c, o) {
    var d = PROTOTYPE_DETAIL;
    var pres = c.presentation || {};
    var base = pres.plate != null ? pres.plate : 0;
    var plate = function (n) {
      return window.TA_MEDIA
        ? window.TA_MEDIA.resolve({ plate: (base + n) % 4, ratio: null }, { context: "story", lang: o.lang })
        : null;
    };
    var sparse = pres.density === "sparse", rich = pres.density === "rich";
    var out = [{ type: "full-image", media: [plate(1)], caption: null, title: null, body: null }];
    if (!sparse) {
      out.push({ type: "image-text", media: [plate(2)],
                 title: d.pull, body: d.pullBody, caption: d.captionA });
    }
    if (rich) {
      out.push({ type: "sticky-narrative", media: [plate(0), plate(1), plate(2)],
                 title: d.narrativeTitle, body: d.narrativeBody, caption: null });
      out.push({ type: "quote", media: [], title: null, body: d.quote, by: d.quoteBy });
    }
    return out;
  }

  /* ---------- resolver ------------------------------------------------------ */
  var byId = {}, bySlug = {}, legacy = {};
  P.forEach(function (p, i) {
    byId[p.id] = p; bySlug[p.slug] = p;
    /* compatibility with existing p=<index> routes and transitions */
    legacy[i] = p.id;
    p.legacyIndex = i;
  });

  function lang(v, l) {
    if (v == null) return null;
    if (typeof v === "string") return v;
    return v[l] != null ? v[l] : null;
  }

  window.TA_PROJECTS = {
    all: function () { return P.slice(); },
    published: function () { return P.filter(function (p) { return p.published; }); },
    byId: function (id) { return byId[id] || null; },
    bySlug: function (s) { return bySlug[s] || null; },
    byIndex: function (i) { return byId[legacy[i]] || null; },
    indexOf: function (id) { var p = byId[id]; return p ? p.legacyIndex : -1; },
    featured: function () { return P.filter(function (p) { return p.published && p.homepageFeatured; }); },
    homepage: function () {
      return P.filter(function (p) { return p.published === true && p.homepageFeatured === true; })
              .sort(function (a, b) { return (a.homepageOrder || 99) - (b.homepageOrder || 99); });
    },
    forExpertise: function (slug) {
      return P.filter(function (p) { return p.published && p.expertise.indexOf(slug) >= 0; });
    },
    related: function (id, n) {
      var p = byId[id];
      if (!p) return [];
      if (p.relatedProjects.length) {
        return p.relatedProjects.map(function (r) { return byId[r]; })
                 .filter(function (r) { return r && r.published; });
      }
      /* fall back through published projects only */
      var pub = P.filter(function (x) { return x.published; });
      var at = pub.indexOf(p), out = [];
      if (at < 0) return [];
      for (var k = 1; k <= (n || 2); k++) out.push(pub[(at + k) % pub.length]);
      return out;
    },
    /* one asset may hold several roles; hero is the default.
       strict:true returns null rather than falling back, for QA. */
    media: function (id, role, opt) {
      var p = byId[id];
      if (!p || !p.media.length) return null;
      var want = role || "hero";
      for (var i = 0; i < p.media.length; i++) {
        if (p.media[i].roles.indexOf(want) >= 0) return p.media[i];
      }
      return (opt && opt.strict) ? null : p.media[0];
    },
    mediaExact: function (id, role) { return this.media(id, role, { strict: true }); },
    /* §09 — a story module names an asset; this resolves it from the project's own set */
    mediaById: function (projectId, mediaId) {
      var c = byId[projectId];
      if (!c || !mediaId) return null;
      for (var i = 0; i < c.media.length; i++) if (c.media[i].id === mediaId) return c.media[i];
      return null;
    },
    /* §10 — render-ready story blocks; one renderer serves prototype and real alike */
    story: function (projectId, opt) {
      var c = byId[projectId];
      if (!c) return [];
      var self = this, o = opt || {};
      /* §11 — prototype records are adapted into the SAME blocks real content uses,
         so there is one renderer, not two. */
      if (c.contentState === "prototype" && c.story.length === 0) return protoStory(c, o);
      var vis = function (m) {
        if (!m) return null;
        if (c.contentState === "real" && c.published === true && !m.src) return null;
        return window.TA_MEDIA
          ? window.TA_MEDIA.resolve(m, { context: "story", lang: o.lang })
          : null;
      };
      var out = [];
      c.story.forEach(function (b) {
        var block = { type: b.type, role: b.role || null, title: b.title, body: b.body,
                      caption: b.caption, credit: b.credit, by: b.by, media: [] };
        if (b.mediaId) {
          var one = vis(self.mediaById(projectId, b.mediaId));
          if (one) block.media.push(one);
        }
        (b.mediaIds || []).forEach(function (mid) {
          var v = vis(self.mediaById(projectId, mid));
          if (v) block.media.push(v);
        });
        /* §06/§15 — a module with no usable media is omitted rather than faked */
        var needsMedia = b.type !== "quote" && b.type !== "text";
        if (needsMedia && block.media.length === 0) return;
        if (b.type === "image-pair" && block.media.length < 2) return;
        out.push(block);
      });
      return out;
    },
    /* resolved drawings, each carrying only the metadata actually supplied */
    drawingList: function (projectId, opt) {
      var c = byId[projectId];
      if (!c) return [];
      var self = this, o = opt || {};
      var out = [];
      c.drawings.forEach(function (d) {
        /* canonical reference first, direct media only as legacy fallback */
        var m = d.mediaId ? self.mediaById(projectId, d.mediaId) : d.media;
        if (!m) return;
        if (c.contentState === "real" && c.published === true && !m.src) return;
        var v = window.TA_MEDIA ? window.TA_MEDIA.resolve(m, { context: "drawing", lang: o.lang }) : null;
        if (!v) return;
        out.push({ id: d.id, type: d.type, title: d.title, level: d.level,
                   scale: d.scale, caption: d.caption, credit: d.credit, visual: v });
      });
      return out;
    },
    /* §10 — the one call a template needs: canonical asset → renderable state */
    visual: function (id, role, context, opt) {
      var m = this.media(id, role);
      var o = opt || {};
      var v = window.TA_MEDIA
        ? window.TA_MEDIA.resolve(m, { context: context || role, breakpoint: o.breakpoint, lang: o.lang })
        : { isRealMedia: false, plate: m ? m.plate : 0 };
      /* §27 — published real content must never present a prototype plate as
         photography. Missing real media resolves to an explicit neutral state. */
      var c = byId[id];
      if (c && c.contentState === "real" && c.published === true && !v.isRealMedia) {
        return {
          missingRealMedia: true, isRealMedia: false, plate: null,
          backgroundImage: "none", backgroundColor: "#E8E8E4",
          backgroundSize: "auto", backgroundPosition: "50% 50%", backgroundRepeat: "no-repeat",
          ratio: v.ratio || null, alt: "", decorative: true, theme: v.theme || "light"
        };
      }
      v.missingRealMedia = false;
      return v;
    },
    /* crop resolution: context → generic → focal point → centre */
    position: function (m, context) {
      if (!m) return "50% 50%";
      var key = context ? context + "Position" : null;
      if (key && m[key]) return m[key];
      if (m.objectPosition) return m.objectPosition;
      if (m.focalPoint) return (m.focalPoint.x * 100) + "% " + (m.focalPoint.y * 100) + "%";
      return "50% 50%";
    },
    /* real records never inherit prototype facts; a missing value stays missing */
    field: function (p, path, l) {
      if (!p) return null;
      var v = p[path];
      if (v == null) return null;
      return lang(v, l || "en");
    },
    /* §25 — prototype defaults are available ONLY to prototype records */
    prototypeDetail: function (p) {
      return (p && p.contentState === "prototype") ? PROTOTYPE_DETAIL : null;
    },
    lang: lang,
    isPrototype: function (p) { return !p || p.contentState === "prototype"; },
    isReal: function (p) { return !!p && p.contentState === "real"; }
  };
})();
