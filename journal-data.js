/* Tarh & Afarinesh — Journal dataset.
   Single source for the Journal archive and detail template, and for the
   Related Journal / Knowledge links on Project Detail and Expertise.
   ALL CONTENT IS TEMPORARY PLACEHOLDER — no real events, research, publications,
   authors, press or dates. date is held as a neutral token so presentation can
   later be Gregorian or Jalali per language without changing the model.
   projectId points at the canonical record in projects-data.js, so no project
   title, location or year is duplicated here. Legacy route indexes appear only
   when a URL is built.
   exp = Expertise slugs, validated against expertise-data.js. */
(function () {
  var TYPES = [
    { id:"all",      en:"All",             fa:"همه" },
    { id:"news",     en:"News",            fa:"اخبار" },
    { id:"article",  en:"Articles",        fa:"مقاله‌ها" },
    { id:"research", en:"Research",        fa:"پژوهش" },
    { id:"paper",    en:"Papers",          fa:"گزارش‌ها" },
    { id:"book",     en:"Books",           fa:"کتاب‌ها" },
    { id:"update",   en:"Project updates", fa:"گزارش پروژه‌ها" }
  ];
  var TYPE_ONE = {
    news:["News","اخبار"], article:["Article","مقاله"], research:["Research","پژوهش"],
    paper:["Paper","گزارش"], book:["Publication","انتشارات"], update:["Project update","گزارش پروژه"]
  };
  var AUTHORS = {
    p1:["Person 01","فرد ۰۱"], p2:["Person 02","فرد ۰۲"], p3:["Person 03","فرد ۰۳"],
    studio:["Tarh & Afarinesh","طرح و آفرینش"], guest:["Guest author","نویسنده مهمان"]
  };

  var E = [
    { id:"research-courtyard-climate-infrastructure", slug:"courtyard-as-climate-infrastructure",
      type:"research", featured:true, sortOrder:20260927, date:"2026-09-26",
      en:"Courtyard as Climate Infrastructure", fa:"حیاط به‌مثابه زیرساخت اقلیمی",
      subtitleEn:"Spatial strategies for shade, air, thermal transition and everyday life.",
      subtitleFa:"راهبردهای فضایی برای سایه، جریان هوا، گذار حرارتی و زندگی روزمره.",
      excerptEn:"What changes when the courtyard is treated not as leftover open space, but as part of the building's environmental system? This study examines shade, porosity, vegetation, sectional depth and circulation as architectural variables that mediate climate and everyday occupation.",
      excerptFa:"اگر حیاط نه به‌عنوان فضای باز باقی‌مانده، بلکه به‌عنوان بخشی از سیستم محیطی ساختمان در نظر گرفته شود چه چیزی تغییر می‌کند؟ این پژوهش سایه، نفوذپذیری، پوشش گیاهی، عمق مقطع و حرکت را به‌عنوان متغیرهای معماری برای میانجی‌گری میان اقلیم و حضور روزمره بررسی می‌کند.",
      author:"studio", roleEn:"Studio Research", roleFa:"پژوهش استودیو", projectId:null,
      exp:["architecture","sustainable-design"], rich:true,
      hero:{ src:"assets/journal/research-courtyard/research-courtyard-hero.webp", ratio:"16/9", objectPosition:"50% 50%", crop:"cover" },
      heroCaptionEn:"Conceptual courtyard study — shade, landscape and environmental transition.",
      heroCaptionFa:"مطالعه مفهومی حیاط — سایه، منظر و گذار محیطی.",
      heroCreditEn:"Tarh & Afarinesh — Studio Research", heroCreditFa:"طرح و آفرینش — پژوهش استودیو",
      leadEn:"The courtyard is often described as a typology. For this study, we treat it instead as an environmental interface: a spatial device that organises solar exposure, air movement, vegetation, thresholds and patterns of occupation before mechanical systems are considered.",
      leadFa:"حیاط اغلب به‌عنوان یک تیپ معماری توصیف می‌شود. در این پژوهش، آن را به‌جای یک فرم ثابت، به‌عنوان یک رابط محیطی در نظر می‌گیریم؛ ابزاری فضایی که پیش از ورود سیستم‌های مکانیکی، تابش خورشید، حرکت هوا، پوشش گیاهی، آستانه‌ها و الگوهای حضور را سازمان می‌دهد.",
      body:[
        { type:"heading", en:"Research question", fa:"پرسش پژوهش" },
        { type:"paragraph",
          en:"What happens when the courtyard is designed as part of the climatic section of a building rather than as an open space placed inside a plan? An open void can provide daylight and a view of the sky, but a climatic courtyard must also manage exposure, depth, air, vegetation and the sequence between protected and exposed space.",
          fa:"چه اتفاقی می‌افتد اگر حیاط به‌جای یک فضای باز درون پلان، به‌عنوان بخشی از مقطع اقلیمی ساختمان طراحی شود؟ یک فضای خالی می‌تواند نور روز و دید به آسمان ایجاد کند، اما یک حیاط اقلیمی باید هم‌زمان میزان تابش، عمق، جریان هوا، پوشش گیاهی و توالی میان فضای محافظت‌شده و فضای باز را نیز مدیریت کند." },
        { type:"paragraph",
          en:"The central question is therefore not whether a project contains a courtyard, but what environmental and spatial work that courtyard is asked to perform.",
          fa:"بنابراین پرسش اصلی این نیست که آیا یک پروژه دارای حیاط هست یا نه؛ بلکه این است که حیاط قرار است چه کار محیطی و فضایی انجام دهد." },
        { type:"heading", en:"Working hypothesis", fa:"فرضیه اولیه" },
        { type:"paragraph",
          en:"The environmental value of a courtyard is produced less by its existence than by the relationships around it. Height-to-width proportion, threshold depth, orientation, permeability, planting and material reflectance collectively determine whether the court behaves as an exposed void or as a moderated micro-environment.",
          fa:"ارزش محیطی حیاط کمتر از صرفِ وجود آن و بیشتر از روابط پیرامون آن شکل می‌گیرد. نسبت ارتفاع به عرض، عمق آستانه‌ها، جهت‌گیری، میزان نفوذپذیری، پوشش گیاهی و بازتاب مصالح در کنار هم تعیین می‌کنند که حیاط به‌صورت یک فضای خالی در معرض شرایط بیرونی عمل کند یا به یک ریزاقلیم تعدیل‌شده تبدیل شود." },
        { type:"quote", en:"The courtyard becomes useful when its edges begin to perform.",
          fa:"حیاط زمانی مؤثر می‌شود که لبه‌های آن شروع به کار کنند.",
          byEn:"Tarh & Afarinesh — Research note", byFa:"طرح و آفرینش — یادداشت پژوهش" },
        { type:"heading", en:"Method: comparing spatial variables", fa:"روش: مقایسه متغیرهای فضایی" },
        { type:"paragraph",
          en:"This is a qualitative design study rather than a measured performance report. Conceptual configurations are examined through spatial imagery, section and layered axonometric studies. Each configuration changes a limited set of architectural variables while preserving the courtyard as the organising centre.",
          fa:"این پژوهش یک مطالعه کیفی طراحی است، نه گزارشی مبتنی بر اندازه‌گیری عملکرد. پیکربندی‌های مفهومی از طریق تصویر فضایی، مقطع و مطالعات آکسونومتریک لایه‌ای بررسی می‌شوند. در هر حالت، تعداد محدودی از متغیرهای معماری تغییر می‌کند، در حالی که حیاط به‌عنوان مرکز سازمان‌دهنده حفظ می‌شود." },
        { type:"image", media:{ src:"assets/journal/research-courtyard/research-courtyard-axon.webp", ratio:"3/4" },
          captionEn:"Exploded courtyard study — solar exposure, airflow, thermal mass and planted microclimate.",
          captionFa:"مطالعه انفجاری حیاط — تابش خورشید، جریان هوا، جرم حرارتی و ریزاقلیم کاشته‌شده." },
        { type:"heading", en:"Observation 01 — The edge matters more than the centre", fa:"مشاهده ۰۱ — لبه مهم‌تر از مرکز است" },
        { type:"paragraph",
          en:"The strongest spatial difference appears at the perimeter. Deep colonnades and recessed openings create an inhabitable band around the court, allowing movement, pause and visual connection to occur in shade rather than directly under the sky.",
          fa:"بیشترین تفاوت فضایی در پیرامون حیاط ظاهر می‌شود. رواق‌های عمیق و بازشوهای عقب‌نشسته نواری قابل‌سکونت در اطراف حیاط ایجاد می‌کنند و اجازه می‌دهند حرکت، مکث و ارتباط بصری در سایه اتفاق بیفتند، نه مستقیماً زیر آسمان." },
        { type:"image", media:{ src:"assets/journal/research-courtyard/research-courtyard-principles.webp", ratio:"16/9" },
          captionEn:"Four environmental variables: shade, airflow, vegetation and thermal transition.",
          captionFa:"چهار متغیر محیطی: سایه، جریان هوا، پوشش گیاهی و گذار حرارتی." },
        { type:"heading", en:"Observation 02 — Porosity must be calibrated", fa:"مشاهده ۰۲ — نفوذپذیری باید تنظیم شود" },
        { type:"paragraph",
          en:"A completely sealed courtyard can protect from external conditions but may become spatially static. A completely open edge increases exposure. The useful condition lies between these extremes: openings and screens positioned to support air movement and visual continuity while retaining depth and shade.",
          fa:"حیاط کاملاً بسته می‌تواند از شرایط بیرونی محافظت کند اما ممکن است از نظر فضایی ایستا شود. در مقابل، لبه کاملاً باز میزان مواجهه را افزایش می‌دهد. وضعیت مؤثرتر میان این دو قرار می‌گیرد: بازشوها و پوسته‌هایی که حرکت هوا و پیوستگی بصری را ممکن می‌کنند و در عین حال عمق و سایه را حفظ می‌کنند." },
        { type:"heading", en:"Observation 03 — Landscape is part of the section", fa:"مشاهده ۰۳ — منظر بخشی از مقطع است" },
        { type:"paragraph",
          en:"Planting is most effective when it participates in the architectural section rather than arriving as decoration after the geometry has been resolved. Trees can extend shade, soften reflected light, establish seasonal change and give scale to large mineral surfaces.",
          fa:"پوشش گیاهی زمانی بیشترین تأثیر را دارد که بخشی از مقطع معماری باشد، نه عنصری تزئینی که پس از حل هندسه اضافه شود. درختان می‌توانند سایه را گسترش دهند، نور بازتابی را نرم کنند، تغییرات فصلی ایجاد کنند و به سطوح بزرگ و معدنی مقیاس بدهند." },
        { type:"image", media:{ src:"assets/journal/research-courtyard/research-courtyard-section.webp", ratio:"16/9" },
          captionEn:"Sectional study of protected interiors, shaded thresholds and the open courtyard.",
          captionFa:"مطالعه مقطعی فضای داخلی محافظت‌شده، آستانه‌های سایه‌دار و حیاط باز." },
        { type:"image", media:{ src:"assets/journal/research-courtyard/research-courtyard-time-study.webp", ratio:"16/9" },
          captionEn:"The courtyard through the day — changing light, shadow and thermal perception.",
          captionFa:"حیاط در طول روز — تغییر نور، سایه و ادراک حرارتی." },
        { type:"heading", en:"Design findings", fa:"یافته‌های طراحی" },
        { type:"paragraph",
          en:"The study suggests four recurring principles. First, a courtyard performs more effectively when shade is spatial rather than merely applied as an object. Second, environmental moderation depends strongly on the depth and porosity of its perimeter. Third, vegetation is most useful when integrated with circulation and section. Fourth, the courtyard should be understood as a sequence of climatic conditions rather than a single open room.",
          fa:"این مطالعه چهار اصل تکرارشونده را نشان می‌دهد. نخست، حیاط زمانی مؤثرتر عمل می‌کند که سایه یک کیفیت فضایی باشد، نه صرفاً یک عنصر افزوده‌شده. دوم، تعدیل شرایط محیطی به‌شدت به عمق و نفوذپذیری پیرامون آن وابسته است. سوم، پوشش گیاهی زمانی مفیدتر است که با مسیر حرکت و مقطع یکپارچه شود. چهارم، حیاط باید به‌عنوان توالی‌ای از شرایط اقلیمی درک شود، نه یک اتاق باز واحد." },
        { type:"heading", en:"From typology to design tool", fa:"از تیپولوژی تا ابزار طراحی" },
        { type:"paragraph",
          en:"The contemporary value of the courtyard may lie less in reproducing a historical form and more in recovering its capacity to organise relationships: between sun and shade, open and protected space, landscape and material, movement and pause.",
          fa:"ارزش معاصر حیاط شاید کمتر در تکرار یک فرم تاریخی و بیشتر در بازیابی توانایی آن برای سازمان‌دهی روابط باشد: رابطه میان آفتاب و سایه، فضای باز و محافظت‌شده، منظر و مصالح، حرکت و مکث." },
        { type:"heading", en:"Limits and next step", fa:"محدودیت‌ها و گام بعد" },
        { type:"paragraph",
          en:"This research is intentionally qualitative. The studies establish spatial hypotheses rather than verified performance values. A next phase could test selected configurations using solar analysis, daylight studies, airflow simulation and climate-specific material assumptions.",
          fa:"این پژوهش عمداً کیفی است. مطالعات ارائه‌شده فرضیه‌های فضایی را شکل می‌دهند و نه مقادیر عملکردی تأییدشده. در مرحله بعد می‌توان برخی پیکربندی‌ها را با تحلیل تابش خورشیدی، مطالعات نور روز، شبیه‌سازی جریان هوا و فرضیات مصالح متناسب با اقلیم ارزیابی کرد." }
      ] },

    { id:"article-shade-is-a-material", slug:"shade-is-a-material",
      type:"article", sortOrder:20260926, date:"2026",
      en:"Shade Is a Material", fa:"سایه یک ماده است",
      excerptEn:"Architecture is often described through what is built. Yet some of its strongest spatial effects come from what is deliberately withheld: direct sun, immediate views and instant transitions. Shade can be designed as deliberately as stone, glass or concrete.",
      excerptFa:"معماری اغلب با آنچه ساخته می‌شود توصیف می‌شود؛ بااین‌حال بخشی از اثرگذارترین کیفیت‌های فضایی آن از چیزهایی می‌آید که عمداً مهار می‌شوند: نور مستقیم، دید فوری و گذار بی‌واسطه. سایه را می‌توان به همان اندازه سنگ، شیشه یا بتن طراحی کرد.",
      author:"studio", roleEn:"Studio Essay", roleFa:"مقاله استودیو", projectId:null,
      exp:["architecture","sustainable-design"], rich:true,
      hero:{ src:"assets/journal/shade-is-a-material/shade-is-a-material-hero.webp", ratio:"16/9", objectPosition:"50% 52%", crop:"cover" },
      heroCaptionEn:"Conceptual study — mass, threshold and reflected daylight.",
      heroCaptionFa:"مطالعه مفهومی — جرم، آستانه و نور بازتابی.",
      heroCreditEn:"Editorial architectural study", heroCreditFa:"مطالعه تصویری تحریریه",
      leadEn:"We tend to describe shade as the absence of light. In architecture, it can be much more active than that: a measurable depth, a climatic buffer, a visual pause and a material condition that changes throughout the day.",
      leadFa:"ما معمولاً سایه را نبودِ نور می‌دانیم. در معماری، سایه می‌تواند بسیار فعال‌تر از این تعریف باشد: عمقی قابل اندازه‌گیری، حائلی اقلیمی، مکثی بصری و کیفیتی مادی که در طول روز پیوسته تغییر می‌کند.",
      body:[
        { type:"heading", en:"From absence to substance", fa:"از فقدان تا ماده" },
        { type:"paragraph",
          en:"When a wall thickens around an opening, when a roof extends beyond the facade, or when a screen filters the sun before it reaches the interior, architecture is doing more than blocking light. It is giving shade dimension. The result has width, depth, temperature and duration. It can be crossed, occupied and remembered.",
          fa:"وقتی دیوار در اطراف یک بازشو ضخیم می‌شود، وقتی سقف از خط نما فراتر می‌رود یا وقتی یک پوسته پیش از رسیدن آفتاب به فضای داخلی آن را فیلتر می‌کند، معماری صرفاً نور را مسدود نمی‌کند؛ به سایه بُعد می‌دهد. نتیجه دارای عرض، عمق، دما و مدت‌زمان است؛ می‌توان از آن عبور کرد، در آن مکث کرد و آن را به خاطر سپرد." },
        { type:"paragraph",
          en:"This shift matters because it changes the designer's question. Instead of asking only where light should enter, we can ask how long the transition into light should take, how much contrast the eye should meet, and whether the edge between bright and dark should be sharp, layered or gradual.",
          fa:"این تغییر نگاه مهم است، زیرا پرسش طراح را عوض می‌کند. به‌جای اینکه فقط بپرسیم نور از کجا وارد شود، می‌توانیم بپرسیم گذار به روشنایی چقدر طول بکشد، چشم با چه میزان کنتراست روبه‌رو شود و مرز میان روشن و تاریک تیز، لایه‌لایه یا تدریجی باشد." },
        { type:"quote", en:"\u201cGood shade does not erase light; it gives light something to measure itself against.\u201d",
          fa:"«سایه‌ی خوب نور را حذف نمی‌کند؛ به نور چیزی می‌دهد تا در برابر آن سنجیده شود.»",
          byEn:"Tarh & Afarinesh — Studio note", byFa:"طرح و آفرینش — یادداشت استودیو" },
        { type:"heading", en:"Depth before darkness", fa:"عمق پیش از تاریکی" },
        { type:"paragraph",
          en:"The quality of shade depends less on darkness than on depth. A thin overhang can reduce glare, but a deep threshold can become a room in its own right. It slows movement, protects the eye from abrupt contrast and creates an intermediate condition between exterior and interior.",
          fa:"کیفیت سایه کمتر به تاریکی و بیشتر به عمق وابسته است. یک پیش‌آمدگی باریک می‌تواند خیرگی را کاهش دهد، اما یک آستانه عمیق می‌تواند خود به فضایی مستقل تبدیل شود؛ حرکت را کند کند، چشم را از تغییر ناگهانی کنتراست محافظت کند و وضعیتی میان بیرون و درون بسازد." },
        { type:"paragraph",
          en:"In warm climates this spatial depth also becomes environmental performance. Recesses, colonnades, screens and planted courts reduce solar exposure before mechanical systems are asked to respond. Their value is not only technical. They give climatic intelligence a visible architectural form.",
          fa:"در اقلیم‌های گرم، این عمق فضایی به عملکرد محیطی نیز تبدیل می‌شود. فرورفتگی‌ها، رواق‌ها، پوسته‌های مشبک و حیاط‌های کاشته‌شده پیش از آنکه سیستم‌های مکانیکی وارد عمل شوند، تابش مستقیم را کاهش می‌دهند. ارزش آن‌ها فقط فنی نیست؛ هوشمندی اقلیمی را به یک فرم معماری قابل مشاهده تبدیل می‌کنند." },
        { type:"heading", en:"Thresholds as climatic rooms", fa:"آستانه به‌مثابه فضای اقلیمی" },
        { type:"paragraph",
          en:"A threshold is often treated as a line on plan: inside on one side, outside on the other. In experience, the most convincing thresholds are rarely lines. They are sequences. A shaded walk, a compressed opening, a filtered screen, a court and finally a room can form a gradual environmental transition rather than a single door.",
          fa:"آستانه در نقشه اغلب به‌صورت یک خط دیده می‌شود: داخل در یک سو و بیرون در سوی دیگر. اما در تجربه، قانع‌کننده‌ترین آستانه‌ها معمولاً خط نیستند؛ توالی‌اند. یک مسیر سایه‌دار، یک بازشوی فشرده، پوسته‌ای فیلترکننده، یک حیاط و در نهایت فضای داخلی می‌توانند به‌جای یک درِ منفرد، گذار محیطی تدریجی بسازند." },
        { type:"heading", en:"A surface that changes with time", fa:"سطحی که با زمان تغییر می‌کند" },
        { type:"paragraph",
          en:"Unlike most finishes, shade is never fixed. Its geometry is recalculated by the sun every hour. A perforated wall projects one pattern in the morning and another late in the day; a tree makes the same stone surface read differently in winter and summer. Designing shade therefore means designing with time as much as with form.",
          fa:"برخلاف بسیاری از پوشش‌ها، سایه هرگز ثابت نیست. هندسه آن در هر ساعت با حرکت خورشید دوباره محاسبه می‌شود. یک دیوار مشبک صبح الگویی ایجاد می‌کند و عصر الگویی دیگر؛ یک درخت باعث می‌شود همان سطح سنگی در زمستان و تابستان متفاوت خوانده شود. بنابراین طراحی سایه به همان اندازه که طراحی با فرم است، طراحی با زمان نیز هست." },
        { type:"paragraph",
          en:"This is where restraint becomes useful. A space does not need several competing gestures if one calibrated opening can register the movement of a day. Material texture, reveal depth and orientation can do the work quietly. The architecture becomes richer not because more has been added, but because changing conditions are allowed to become visible.",
          fa:"اینجاست که خویشتن‌داری اهمیت پیدا می‌کند. اگر یک بازشوی دقیق بتواند حرکت یک روز را ثبت کند، فضا به چندین حرکت فرمی رقیب نیاز ندارد. بافت مصالح، عمق بازشو و جهت‌گیری می‌توانند بی‌صدا کار خود را انجام دهند. معماری نه از طریق افزودن عناصر بیشتر، بلکه با اجازه دادن به آشکار شدن شرایط متغیر غنی‌تر می‌شود." },
        { type:"heading", en:"Designing for the unbuilt", fa:"طراحی برای آنچه ساخته نمی‌شود" },
        { type:"paragraph",
          en:"To treat shade as a material is ultimately to recognise that architectural form is shaped by voids, intervals and controlled absences as much as by solid construction. The depth of a wall matters because of the darkness it holds. A courtyard matters because it makes a fragment of sky legible. A screen matters because of the light that passes through it.",
          fa:"در نهایت، ماده دانستنِ سایه یعنی پذیرفتن اینکه فرم معماری به همان اندازه که با ساختِ جرم شکل می‌گیرد، با خلأها، فاصله‌ها و نبودهای کنترل‌شده نیز ساخته می‌شود. عمق دیوار به‌خاطر تاریکی‌ای که در خود نگه می‌دارد اهمیت پیدا می‌کند؛ حیاط به‌خاطر تکه‌ای از آسمان که خوانا می‌کند و پوسته به‌خاطر نوری که از آن عبور می‌کند." },
        { type:"paragraph",
          en:"The task is not to make every space dramatic. It is to decide where light should be immediate and where it should be earned; where the body should feel exposed and where it should feel protected. In that sense, shade is not the opposite of architecture's visible materials. It is one of the conditions that allows them to be perceived.",
          fa:"هدف این نیست که هر فضا نمایشی باشد. مسئله این است که تعیین کنیم کجا نور باید بی‌واسطه باشد و کجا باید به آن رسید؛ کجا بدن باید خود را در معرض احساس کند و کجا در پناه. از این منظر، سایه مقابل مصالح مرئی معماری نیست؛ یکی از شرایطی است که امکان درک آن‌ها را فراهم می‌کند." }
      ],
      media:{
        wide:{ media:{ src:"assets/journal/shade-is-a-material/shade-is-a-material-wide.webp", ratio:"16/9", objectPosition:"50% 48%", crop:"cover" },
          captionEn:"A deep corridor turns solar control into spatial rhythm.", captionFa:"یک راهروی عمیق، کنترل تابش را به ریتم فضایی تبدیل می‌کند.",
          creditEn:"Conceptual architectural study", creditFa:"مطالعه مفهومی معماری" },
        pair:{ a:{ src:"assets/journal/shade-is-a-material/shade-is-a-material-pair-a.webp", ratio:"3/4", objectPosition:"45% 50%", crop:"cover" },
          b:{ src:"assets/journal/shade-is-a-material/shade-is-a-material-pair-b.webp", ratio:"1/1", objectPosition:"52% 45%", crop:"cover" },
          captionEn:"Filtered light on stone; mass organised around courts and thresholds.",
          captionFa:"نور فیلترشده بر سنگ؛ جرم سازمان‌یافته پیرامون حیاط‌ها و آستانه‌ها." }
      } },

    { id:"journal-01-sbid-2015", slug:"tarh-afarinesh-sbid-international-design-awards-2015",
      type:"news", sortOrder:20260928, date:"2015",
      en:"Tarh & Afarinesh at the SBID International Design Awards 2015",
      fa:"طرح و آفرینش در جوایز بین‌المللی طراحی SBID 2015",
      excerptEn:"Tarh & Afarinesh was recognised at the SBID International Design Awards 2015 in connection with Best Hotel Design, reflecting the studio's continuing engagement with hospitality architecture and interior design.",
      excerptFa:"طرح و آفرینش در جوایز بین‌المللی طراحی SBID سال ۲۰۱۵ در ارتباط با بخش «Best Hotel Design» مورد تقدیر قرار گرفت؛ رویدادی که بخشی از حضور حرفه‌ای مجموعه در حوزه معماری و طراحی داخلی فضاهای هتلداری را ثبت می‌کند.",
      author:"studio",
      hero:{ src:"assets/journal/journal-01-sbid-cover-panel.webp", ratio:"1600/979", objectPosition:"50% 30%", crop:"cover",
        alt:{ en:"Tarh & Afarinesh representatives holding a green SBID trophy in front of a board reading International Design Awards and Best Hotel Design.",
              fa:"نمایندگان طرح و آفرینش در مقابل پنلی با عنوان International Design Awards و Best Hotel Design در حال نمایش تندیس سبز SBID." } },
      exp:[],
      body:[
        { type:"paragraph",
          en:"The supplied archive documents Tarh & Afarinesh's presence at the SBID International Design Awards 2015, where the practice received recognition associated with Best Hotel Design.",
          fa:"آرشیو تصویری موجود، حضور طرح و آفرینش در جوایز بین‌المللی طراحی SBID سال ۲۰۱۵ را ثبت می‌کند؛ رویدادی که در آن مجموعه در ارتباط با بخش «Best Hotel Design» مورد تقدیر قرار گرفته است." },
        { type:"paragraph",
          en:"The photographs also point to the IKIA 3 & 4 Star Hotel project as part of the event narrative, positioning the recognition within the studio's hospitality portfolio.",
          fa:"تصاویر همچنین به پروژه IKIA 3 & 4 Star Hotel اشاره دارند و این تقدیر را در امتداد تجربه مجموعه در طراحی فضاهای هتلداری و مهمان‌نوازی قرار می‌دهند." }
      ],
      media:{
        gallery:[
          { media:{ src:"assets/journal/journal-01-sbid-duo-award.webp", ratio:"1200/1246",
              alt:{ en:"Two representatives holding the green SBID trophy in front of the event sponsor wall.",
                    fa:"دو نماینده طرح و آفرینش با تندیس سبز SBID در مقابل دیوار رویداد." } },
            captionEn:"", captionFa:"" },
          { media:{ src:"assets/journal/journal-01-sbid-portrait-award.webp", ratio:"1186/1326",
              alt:{ en:"A formal portrait of a Tarh & Afarinesh representative holding the SBID trophy.",
                    fa:"پرتره رسمی یکی از نمایندگان طرح و آفرینش در حال در دست داشتن تندیس SBID." } },
            captionEn:"", captionFa:"" },
          { media:{ src:"assets/journal/journal-01-sbid-banner-portrait.webp", ratio:"1070/1470",
              alt:{ en:"A Tarh & Afarinesh representative holding the SBID trophy beside the event banner.",
                    fa:"نماینده طرح و آفرینش در کنار بنر رویداد و تندیس SBID." } },
            captionEn:"", captionFa:"" },
          { media:{ src:"assets/journal/journal-01-sbid-ikia-team.webp", ratio:"1070/1470",
              alt:{ en:"Tarh & Afarinesh representatives photographed at the event with a display mentioning IKIA 3 & 4 Star Hotel.",
                    fa:"تصویر نمایندگان طرح و آفرینش در رویداد، همراه با نمایشگری که به IKIA 3 & 4 Star Hotel اشاره می‌کند." } },
            captionEn:"", captionFa:"" }
        ]
      } },

    { id:"article-01", slug:"article-01", type:"article", sortOrder:202699, date:"[DATE] · [YEAR]",
      en:"The courtyard as public infrastructure, not private luxury",
      fa:"حیاط به‌عنوان زیرساخت عمومی، نه تجملی خصوصی",
      excerptEn:"Placeholder excerpt for the featured article. Written at a realistic length so the archive's editorial hierarchy can be judged with genuine copy.",
      excerptFa:"چکیده جایگزین برای مقاله شاخص. با طولی واقعی نوشته شده تا سلسله‌مراتب تحریری آرشیو با متن حقیقی سنجیده شود.",
      author:"p1", roleEn:"[ROLE]", roleFa:"[سمت]",
      hero:{ src:"assets/journal/research-courtyard/research-courtyard-section.webp", ratio:"16/9", objectPosition:"50% 50%", crop:"cover" },
      heroTheme:"light", projectId:"project-001", exp:["architecture","urban-design"], rich:true,
      body:[
        { type:"paragraph",
          en:"First placeholder paragraph. Its length is chosen so the reading measure and leading of long-form English copy can be judged at a genuine density rather than with filler.",
          fa:"بند نخست متن جایگزین. طول این بند به‌گونه‌ای انتخاب شده که طول سطر و فاصله سطرها در متن بلند فارسی سنجیده شود و خوانش آرام بماند." },
        { type:"heading", en:"Context", fa:"زمینه" },
        { type:"paragraph",
          en:"Second placeholder paragraph on the urban context and the question this piece begins from.",
          fa:"بند دوم جایگزین درباره زمینه شهری و پرسشی که این نوشته از آن آغاز می‌شود." },
        { type:"quote", en:"\u201cThe courtyard is the city's most private public space.\u201d", fa:"«حیاط، خصوصی‌ترین فضای عمومی شهر است.»",
          byEn:"Person 01 — placeholder", byFa:"فرد ۰۱ — جایگزین" },
        { type:"heading", en:"Method", fa:"روش" },
        { type:"paragraph",
          en:"Third placeholder paragraph: how the work was done, what was sampled and what was measured.",
          fa:"بند سوم جایگزین: شرح روش کار، نمونه‌ها و آنچه اندازه‌گیری شد." },
        { type:"heading", en:"Findings", fa:"یافته‌ها" },
        { type:"paragraph",
          en:"Fourth placeholder paragraph with preliminary findings and a reference to the related project.",
          fa:"بند چهارم جایگزین با نتایج مقدماتی و ارجاع به پروژه مرتبط." },
        { type:"heading", en:"Application", fa:"کاربرد" },
        { type:"paragraph",
          en:"Closing placeholder paragraph: how the findings return to design decisions.",
          fa:"بند پایانی جایگزین: چگونه این یافته‌ها به تصمیم‌های طراحی بازمی‌گردند." }
      ],
      media:{
        wide:{ media:{ src:"assets/journal/research-courtyard/research-courtyard-time-study.webp", ratio:"16/9" }, captionEn:"[CAPTION]", captionFa:"[شرح تصویر]", creditEn:"[CREDIT]", creditFa:"[عکاس]" },
        pair:{ a:{ src:"assets/journal/research-courtyard/research-courtyard-axon.webp", ratio:"3/4" }, b:{ src:"assets/journal/research-courtyard/research-courtyard-principles.webp", ratio:"1/1" }, captionEn:"[CAPTION]", captionFa:"[شرح تصویر]" }
      },
      video:{ src:null, poster:{ src:"assets/journal/research-courtyard/research-courtyard-hero.webp", ratio:"16/9" }, duration:"[DURATION]", captionEn:"[CAPTION]", captionFa:"[شرح]", transcript:null } },

  ];

  var byId = function (id) { for (var i = 0; i < E.length; i++) if (E[i].id === id) return E[i]; return null; };

  /* one media resolver: real src when supplied, plate only as fallback.
     Returns a renderable visual state — templates never branch on media kind.
     Delegates to window.TA_MEDIA so real src paths get window.TA_ASSET_BASE
     applied, same as every other data module (projects-data.js etc). */
  var resolveMedia = function (media, ratioOverride, positionOverride) {
    if (window.TA_MEDIA) {
      var v = window.TA_MEDIA.resolve(media);
      v.ratio = ratioOverride || v.ratio || "16/9";
      if (positionOverride) v.backgroundPosition = positionOverride;
      return v;
    }
    var PLATES = [
      "repeating-linear-gradient(-45deg,#E8E8E4 0 18px,#E1E1DC 18px 36px)",
      "repeating-linear-gradient(-45deg,#DEDED8 0 18px,#D7D7D1 18px 36px)",
      "repeating-linear-gradient(-45deg,#E4E7E6 0 18px,#DCE1E0 18px 36px)",
      "repeating-linear-gradient(-45deg,#D9EFED 0 18px,#CFE8E5 18px 36px)"
    ];
    if (!media) {
      return { backgroundImage:PLATES[0], backgroundSize:"auto", backgroundPosition:"0% 0%",
               backgroundRepeat:"repeat", ratio:ratioOverride || "16/9", isRealMedia:false, theme:"light" };
    }
    if (media.src) {
      return {
        backgroundImage:"url(" + media.src + ")",
        backgroundSize:media.crop === "contain" ? "contain" : "cover",
        backgroundPosition:positionOverride || media.objectPosition || "50% 50%",
        backgroundRepeat:"no-repeat",
        ratio:ratioOverride || media.ratio || "16/9",
        isRealMedia:true,
        theme:media.theme || "light"
      };
    }
    return {
      backgroundImage:PLATES[(media.plate || 0) % 4],
      backgroundSize:"auto", backgroundPosition:"0% 0%", backgroundRepeat:"repeat",
      ratio:ratioOverride || media.ratio || "16/9", isRealMedia:false, theme:media.theme || "light"
    };
  };

  E.sort(function (a, b) { return (b.sortOrder || 0) - (a.sortOrder || 0); });

  window.TA_JOURNAL = {
    resolveMedia: resolveMedia,
    entries:E, types:TYPES, typeOne:TYPE_ONE, authors:AUTHORS,
    byId: byId,
    bySlug: function (s) { for (var i = 0; i < E.length; i++) if (E[i].slug === s) return E[i]; return null; },
    featured: function () { for (var i = 0; i < E.length; i++) if (E[i].featured) return E[i]; return E[0]; },
    /* relationships used by Project Detail and Expertise Knowledge */
    forProject: function (projectId) {
      return E.filter(function (e) { return e.projectId === projectId; });
    },
    /* §27 — an unpublished project offers no public inline reference */
    project: function (projectId) {
      var D = window.TA_PROJECTS;
      if (!D || !projectId) return null;
      var c = D.byId(projectId);
      if (!c || c.published !== true) return null;
      var v = D.visual(c.id, "archive", "archive");
      return { id: c.id, routeIndex: c.legacyIndex, en: c.title.en, fa: c.title.fa,
               locEn: c.location ? c.location.en : null, locFa: c.location ? c.location.fa : null,
               year: c.year, plate: v.plate, background: v.backgroundImage,
               backgroundSize: v.backgroundSize, backgroundPosition: v.backgroundPosition,
               backgroundRepeat: v.backgroundRepeat, isRealMedia: v.isRealMedia };
    },
    routeIndex: function (projectId) {
      var D = window.TA_PROJECTS;
      return D ? D.indexOf(projectId) : -1;
    },
    forExpertise: function (slug) { return E.filter(function (e) { return (e.exp || []).indexOf(slug) >= 0; }); },
    related: function (id, n) {
      var e = byId(id);
      if (!e) return [];
      var same = E.filter(function (x) {
        if (x.id === e.id) return false;
        if (x.type === e.type) return true;
        if (e.projectId && x.projectId === e.projectId) return true;
        return (x.exp || []).some(function (s) { return (e.exp || []).indexOf(s) >= 0; });
      });
      return same.slice(0, n || 3);
    },
    next: function (id) {
      for (var i = 0; i < E.length; i++) if (E[i].id === id) return E[(i + 1) % E.length];
      return E[0];
    }
  };
})();
