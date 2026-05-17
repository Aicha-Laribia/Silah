export const DAILY_CONTENT = [
  { ayah: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", ayah_translation: "Indeed, Allah is with the patient.", ayah_translationAr: "إن الله مع الصابرين.", surah: "Al-Baqarah 2:153", surahAr: "البقرة ٢:١٥٣", sunnah: "Smile at your brother — it is sadaqa.", sunnahAr: "ابتسم في وجه أخيك، فهي صدقة.", dhikr: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", dhikr_translation: "Glory be to Allah and His praise.", dhikr_translationAr: "سبحان الله وبحمده.", dhikr_count: 100, challenge: "Give water to someone today — even a glass.", challengeAr: "اسقِ شخصًا ماء اليوم، ولو كأسًا واحدًا." },
  { ayah: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", ayah_translation: "Whoever fears Allah — He will make a way out for them.", ayah_translationAr: "ومن يتق الله يجعل له مخرجًا.", surah: "At-Talaq 65:2", surahAr: "الطلاق ٦٥:٢", sunnah: "Visit a sick person today, even with a message.", sunnahAr: "عُد مريضًا اليوم، ولو برسالة.", dhikr: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ", dhikr_translation: "O Allah, I ask You for wellbeing.", dhikr_translationAr: "اللهم إني أسألك العافية.", dhikr_count: 33, challenge: "Remove something harmful from the path today.", challengeAr: "أزل أذى من الطريق اليوم." },
  { ayah: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ", ayah_translation: "Cooperate in righteousness and piety.", ayah_translationAr: "وتعاونوا على البر والتقوى.", surah: "Al-Ma'idah 5:2", surahAr: "المائدة ٥:٢", sunnah: "Feed someone today, even a date.", sunnahAr: "أطعم شخصًا اليوم، ولو تمرة.", dhikr: "بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ", dhikr_translation: "In the name of Allah, I place my trust in Allah.", dhikr_translationAr: "بسم الله توكلت على الله.", dhikr_count: 7, challenge: "Check on a neighbour you haven't spoken to this week.", challengeAr: "تفقد جارًا لم تحدثه هذا الأسبوع." }
]
export const getTodayContent = () => DAILY_CONTENT[new Date().getDay() % DAILY_CONTENT.length]
export const localizedField = (item, field, locale) => locale === 'ar' ? item[`${field}Ar`] || item[field] : item[field]
export const formatMoney = (amount, locale) => `${Number(amount || 0).toLocaleString(locale === 'ar' ? 'ar-MA' : 'en-US')} ${locale === 'ar' ? 'د.م' : 'MAD'}`

export const NEED_ICONS = {
  blood:    { emoji: "🩸", label: "Blood donation", labelAr: "تبرع بالدم", color: "#9B2335", bg: "#FEF2F4" },
  food:     { emoji: "🍞", label: "Food insecurity", labelAr: "حاجة غذائية", color: "#854F0B", bg: "#FFF7ED" },
  orphan:   { emoji: "🌙", label: "Orphan support", labelAr: "دعم الأيتام", color: "#1A4A2E", bg: "#EFF9F4" },
  medical:  { emoji: "💊", label: "Medical aid", labelAr: "مساعدة طبية", color: "#1A3A6B", bg: "#EEF5FD" },
  shelter:  { emoji: "🏠", label: "Shelter", labelAr: "سكن", color: "#3B6D11", bg: "#F0F7E8" },
  student:  { emoji: "📚", label: "Student hardship", labelAr: "تعثر طالب", color: "#3C3489", bg: "#F0EFFE" },
  funeral:  { emoji: "⚰️", label: "Funeral aid", labelAr: "مساعدة جنازة", color: "#444441", bg: "#F5F4F0" },
  traveler: { emoji: "🚗", label: "Stranded traveler", labelAr: "مسافر منقطع", color: "#993556", bg: "#FEF0F4" },
  transport:{ emoji: "🚌", label: "Transport", labelAr: "نقل", color: "#854F0B", bg: "#FFF7ED" },
  tutor:    { emoji: "✏️", label: "Tutoring", labelAr: "تدريس", color: "#3C3489", bg: "#F0EFFE" },
  translate:{ emoji: "🗣️", label: "Translation", labelAr: "ترجمة", color: "#1A3A6B", bg: "#EEF5FD" },
}

export const EVENT_ICONS = {
  salah:     { emoji: "🕌", color: "#1A4A2E", bg: "#EFF9F4" },
  halaqa:    { emoji: "📖", color: "#3C3489", bg: "#F0EFFE" },
  volunteer: { emoji: "🤝", color: "#854F0B", bg: "#FFF7ED" },
  eid:       { emoji: "✨", color: "#B8820D", bg: "#FFFDF0" }
}

export const NEEDS = [
  // BLOOD PING
  { id: 1, type: "blood", title: "Urgent: Blood O+ Needed", titleAr: "عاجل: مطلوب دم O+", org: "Ibn Sina Hospital", orgAr: "مستشفى ابن سينا", verified: "institution", detail: "Patient requires surgery tomorrow morning. 2 donors needed urgently.", detailAr: "المريض يحتاج إلى عملية صباح الغد. مطلوب متبرعان بشكل عاجل.", lat: 33.994, lng: -6.854, urgency: "critical", bloodType: "O+", timePosted: "2 hours ago", timePostedAr: "منذ ساعتين", distance: "1.2 km", distanceAr: "١٫٢ كم", feature: "blood_ping" },
  { id: 8, type: "blood", title: "Blood A- Needed — Pediatric", titleAr: "مطلوب دم A- لطفل", org: "Hôpital d'Enfants Rabat", orgAr: "مستشفى الأطفال بالرباط", verified: "institution", detail: "Child, 7 years old, requires transfusion. A- donors only within 10km.", detailAr: "طفل عمره ٧ سنوات يحتاج إلى نقل دم. المتبرعون من فصيلة A- فقط ضمن ١٠ كم.", lat: 33.989, lng: -6.860, urgency: "critical", bloodType: "A-", timePosted: "45 min ago", timePostedAr: "منذ ٤٥ دقيقة", distance: "2.4 km", distanceAr: "٢٫٤ كم", feature: "blood_ping" },
  // DIGNITY SHIELD
  { id: 2, type: "food", title: "Anonymous Family — Food Support", titleAr: "عائلة مجهولة - دعم غذائي", org: "Al-Nour Masjid (Trust Node)", orgAr: "مسجد النور (نقطة ثقة)", verified: "dignity_shield", detail: "Family of 4. Primary earner recently lost work. Verified offline by imam. Identity protected under Sitr.", detailAr: "عائلة من ٤ أفراد. المعيل الرئيسي فقد عمله مؤخرًا. تم التحقق خارج التطبيق من الإمام. الهوية محفوظة بالستر.", lat: 33.988, lng: -6.861, urgency: "high", timePosted: "5 hours ago", timePostedAr: "منذ ٥ ساعات", distance: "2.8 km", distanceAr: "٢٫٨ كم", anonymous: true, trustNode: "Al-Nour Masjid", trustNodeAr: "مسجد النور", feature: "dignity_shield" },
  { id: 6, type: "shelter", title: "Anonymous Case — Eviction Risk", titleAr: "حالة مجهولة - خطر إخلاء", org: "Amal Association (Trust Node)", orgAr: "جمعية أمل (نقطة ثقة)", verified: "dignity_shield", detail: "Family of 5 facing eviction within 72h. Situation verified offline. 3,200 MAD needed.", detailAr: "عائلة من ٥ أفراد مهددة بالإخلاء خلال ٧٢ ساعة. تم التحقق خارج التطبيق. المطلوب ٣٬٢٠٠ د.م.", lat: 34.005, lng: -6.865, urgency: "critical", timePosted: "4 hours ago", timePostedAr: "منذ ٤ ساعات", distance: "6.2 km", distanceAr: "٦٫٢ كم", anonymous: true, trustNode: "Amal Association", trustNodeAr: "جمعية أمل", feature: "dignity_shield" },
  // SKILL WAQF
  { id: 3, type: "transport", title: "Ride to Jumu'ah — Elderly Brother", titleAr: "توصيل إلى الجمعة - أخ مسن", org: "Al-Iman Masjid", orgAr: "مسجد الإيمان", verified: "masjid", detail: "Brother Hassan, 74, needs a ride every Friday from Hay Riad to Al-Iman Masjid. 15 min drive.", detailAr: "الأخ حسن، ٧٤ عامًا، يحتاج إلى توصيل كل جمعة من حي الرياض إلى مسجد الإيمان. الرحلة ١٥ دقيقة.", lat: 33.991, lng: -6.870, urgency: "medium", timePosted: "1 day ago", timePostedAr: "منذ يوم", distance: "4.1 km", distanceAr: "٤٫١ كم", skillType: "transport", timeNeeded: "1hr/week", timeNeededAr: "ساعة/أسبوع", feature: "skill_waqf", isSkill: true },
  { id: 4, type: "tutor", title: "Math Tutor — 1hr/week", titleAr: "مدرس رياضيات - ساعة/أسبوع", org: "Umm Khalid (Masjid-vouched)", orgAr: "أم خالد (موثقة من المسجد)", verified: "masjid", detail: "Single mother needs volunteer tutor for her son (CM2 level). 1 hour weekly. Online or in-person.", detailAr: "أم عزباء تحتاج إلى مدرس متطوع لابنها في مستوى CM2. ساعة أسبوعيًا، عن بعد أو حضوريًا.", lat: 33.998, lng: -6.843, urgency: "medium", timePosted: "2 days ago", timePostedAr: "منذ يومين", distance: "5.0 km", distanceAr: "٥٫٠ كم", skillType: "tutor", timeNeeded: "1hr/week", timeNeededAr: "ساعة/أسبوع", feature: "skill_waqf", isSkill: true },
  { id: 9, type: "translate", title: "Interpreter — French/Darija", titleAr: "مترجم - فرنسية/دارجة", org: "Ibn Sina Hospital", orgAr: "مستشفى ابن سينا", verified: "institution", detail: "Patient from rural area needs French↔Darija interpreter for medical consultation. 2hrs, this Thursday.", detailAr: "مريض من منطقة قروية يحتاج إلى مترجم بين الفرنسية والدارجة لاستشارة طبية. ساعتان هذا الخميس.", lat: 33.994, lng: -6.854, urgency: "high", timePosted: "3 hours ago", timePostedAr: "منذ ٣ ساعات", distance: "1.2 km", distanceAr: "١٫٢ كم", skillType: "translate", timeNeeded: "2hrs one-time", timeNeededAr: "ساعتان مرة واحدة", feature: "skill_waqf", isSkill: true },
  // MICRO-GRANTS
  { id: 5, type: "medical", title: "Insulin — Brother Hassan", titleAr: "أنسولين - الأخ حسن", org: "Al-Nour Masjid", orgAr: "مسجد النور", verified: "masjid", detail: "Monthly insulin for diabetic elder. Prescription uploaded and AI-verified. Amount locked to pharmacy bill.", detailAr: "أنسولين شهري لرجل مسن مصاب بالسكري. الوصفة مرفوعة ومتحقق منها بالذكاء الاصطناعي. المبلغ مخصص لفاتورة الصيدلية.", lat: 33.991, lng: -6.870, urgency: "high", timePosted: "3 hours ago", timePostedAr: "منذ ٣ ساعات", distance: "4.1 km", distanceAr: "٤٫١ كم", amount: 350, receiptVerified: true, receiptType: "pharmacy", feature: "micro_grant" },
  { id: 7, type: "student", title: "Student Tuition — Verified Bill", titleAr: "رسوم طالب - فاتورة موثقة", org: "Mohamed V University", orgAr: "جامعة محمد الخامس", verified: "institution", detail: "First-year student, rural family. University invoice AI-verified. Amount locked at 1,800 MAD.", detailAr: "طالب سنة أولى من عائلة قروية. فاتورة الجامعة متحقق منها بالذكاء الاصطناعي. المبلغ المحدد ١٬٨٠٠ د.م.", lat: 33.998, lng: -6.843, urgency: "medium", timePosted: "2 days ago", timePostedAr: "منذ يومين", distance: "5.0 km", distanceAr: "٥٫٠ كم", amount: 1800, receiptVerified: true, receiptType: "university", feature: "micro_grant" },
  { id: 10, type: "funeral", title: "Janazah — Verified Invoice", titleAr: "جنازة - فاتورة موثقة", org: "Al-Iman Masjid", orgAr: "مسجد الإيمان", verified: "masjid", detail: "Family cannot cover funeral costs. Funeral home invoice AI-verified. 1,200 MAD locked.", detailAr: "عائلة لا تستطيع تغطية تكاليف الجنازة. فاتورة دار التجهيز متحقق منها بالذكاء الاصطناعي. المبلغ المحدد ١٬٢٠٠ د.م.", lat: 33.985, lng: -6.858, urgency: "critical", timePosted: "1 hour ago", timePostedAr: "منذ ساعة", distance: "2.1 km", distanceAr: "٢٫١ كم", amount: 1200, receiptVerified: true, receiptType: "funeral_home", feature: "micro_grant" },
  { id: 11, type: "orphan", title: "Dar Al-Amal Orphanage", titleAr: "دار الأمل للأيتام", org: "Dar Al-Amal", orgAr: "دار الأمل", verified: "institution", detail: "32 children. Monthly food budget short by 2,400 MAD. Verified NGO.", detailAr: "٣٢ طفلًا. ميزانية الطعام الشهرية ينقصها ٢٬٤٠٠ د.م. جمعية موثقة.", lat: 34.001, lng: -6.848, urgency: "high", timePosted: "1 day ago", timePostedAr: "منذ يوم", distance: "3.5 km", distanceAr: "٣٫٥ كم" },
]

export const EVENTS = [
  { id: 1, type: "salah", title: "Fajr Jama'a — Masjid Al-Nour", titleAr: "جماعة الفجر - مسجد النور", time: "Tomorrow, 5:12 AM", timeAr: "غدًا، ٥:١٢ صباحًا", location: "Masjid Al-Nour, Hay Riad", locationAr: "مسجد النور، حي الرياض", lat: 33.991, lng: -6.870, attendees: 8, organizer: "Brother Karim", organizerAr: "الأخ كريم", description: "Walking together from the parking lot at 5:05 AM. All brothers welcome.", descriptionAr: "نمشي معًا من موقف السيارات عند ٥:٠٥ صباحًا. جميع الإخوة مرحب بهم." },
  { id: 2, type: "halaqa", title: "Weekly Tafsir Circle", titleAr: "حلقة التفسير الأسبوعية", time: "Friday, after Asr", timeAr: "الجمعة بعد العصر", location: "Masjid Sunnah, Témara", locationAr: "مسجد السنة، تمارة", lat: 33.927, lng: -6.914, attendees: 15, organizer: "Sheikh Abdullah", organizerAr: "الشيخ عبد الله", description: "Continuing Surah Al-Kahf. Sisters' section available.", descriptionAr: "متابعة تفسير سورة الكهف. يوجد قسم للأخوات." },
  { id: 3, type: "salah", title: "Sisters Taraweeh Circle", titleAr: "حلقة تراويح للأخوات", time: "Tonight, 9:30 PM", timeAr: "الليلة، ٩:٣٠ مساءً", location: "Private home — sisters only", locationAr: "منزل خاص - للأخوات فقط", lat: 33.995, lng: -6.857, attendees: 6, organizer: "Ustadha Fatima", organizerAr: "الأستاذة فاطمة", description: "Small intimate circle. Contact organizer for address.", descriptionAr: "حلقة صغيرة وهادئة. تواصلي مع المنظمة للحصول على العنوان.", womenOnly: true },
  { id: 4, type: "volunteer", title: "Orphanage Visit & Help", titleAr: "زيارة دار أيتام ومساعدة", time: "Saturday, 4:00 PM", timeAr: "السبت، ٤:٠٠ مساءً", location: "Dar Al-Amal, Salé", locationAr: "دار الأمل، سلا", lat: 34.001, lng: -6.848, attendees: 12, organizer: "Amal Association", organizerAr: "جمعية أمل", description: "Help prepare meals for 32 children.", descriptionAr: "المساعدة في إعداد وجبات لـ٣٢ طفلًا." }
]

export const USER_TYPES = [
  { id: "muslim",   label: "Muslim individual",  icon: "🌙", desc: "Request help, donate, join events" },
  { id: "masjid",   label: "Masjid / Imam",      icon: "🕌", desc: "Trust Node — verify & shield identities" },
  { id: "org",      label: "Organisation / NGO",  icon: "🏢", desc: "Post verified institutional needs" },
  { id: "hospital", label: "Hospital / Clinic",   icon: "🏥", desc: "Post urgent medical & blood needs" }
]

// ─── IMPACT STORIES (Sadaqah Jariyah) ────────────────────────────
export const IMPACT_STORIES = [
  {
    id: 1, type: "student",
    title: "Student you funded in March",
    titleAr: "طالب دعمته في مارس",
    amount: 1800, isBlood: false,
    updates: [
      { date: "Mar 15", dateAr: "١٥ مارس", text: "Tuition paid. First semester started.", textAr: "تم دفع الرسوم. بدأ الفصل الدراسي الأول.", done: true },
      { date: "May 2", dateAr: "٢ مايو", text: "Passed mid-term exams with distinction.", textAr: "اجتاز امتحانات منتصف الفصل بتفوق.", done: true },
      { date: "Jun 20", dateAr: "٢٠ يونيو", text: "Completed first year. Studying engineering.", textAr: "أكمل السنة الأولى. يدرس الهندسة.", done: false },
    ],
    status: "ongoing", ripples: 1
  },
  {
    id: 2, type: "food",
    title: "Anonymous family — groceries",
    titleAr: "عائلة مجهولة - مواد غذائية",
    amount: 400, isBlood: false,
    updates: [
      { date: "Apr 3", dateAr: "٣ أبريل", text: "Family received grocery support for 2 weeks.", textAr: "استلمت العائلة دعمًا غذائيًا لمدة أسبوعين.", done: true },
      { date: "Apr 18", dateAr: "١٨ أبريل", text: "Father found new work. Family is stable.", textAr: "وجد الأب عملًا جديدًا. العائلة مستقرة الآن.", done: true },
    ],
    status: "resolved", ripples: 4
  },
  {
    id: 3, type: "blood",
    title: "Blood donation — O+",
    titleAr: "تبرع بالدم - O+",
    amount: 0, isBlood: true,
    updates: [
      { date: "May 1", dateAr: "١ مايو", text: "Surgery completed successfully.", textAr: "تمت العملية بنجاح.", done: true },
      { date: "May 8", dateAr: "٨ مايو", text: "Patient discharged from hospital.", textAr: "غادر المريض المستشفى.", done: true },
    ],
    status: "resolved", ripples: 1
  }
]

// ─── DAILY CHECKLIST ──────────────────────────────────────────────
export const DEFAULT_CHECKLIST = [
  { id: "fajr",    label: "Fajr on time",            category: "salah",  iconName: "salah" },
  { id: "dhuhr",   label: "Dhuhr prayer",             category: "salah",  iconName: "salah" },
  { id: "asr",     label: "Asr prayer",               category: "salah",  iconName: "salah" },
  { id: "maghrib", label: "Maghrib prayer",           category: "salah",  iconName: "salah" },
  { id: "isha",    label: "Isha prayer",              category: "salah",  iconName: "salah" },
  { id: "quran",   label: "Read Quran (1 page min)",  category: "ibadah", iconName: "ibadah" },
  { id: "dhikr",   label: "Morning/Evening adhkar",   category: "ibadah", iconName: "ibadah" },
  { id: "sadaqa",  label: "Give any sadaqa today",    category: "giving", iconName: "giving" },
  { id: "sunnah",  label: "Daily Sunnah challenge",   category: "sunnah", iconName: "sunnah" },
]

export const WEEKLY_REPORT = {
  week: "May 11-17",
  weekAr: "١١-١٧ مايو",
  scores: {
    salah:  { done: 28, total: 35, label: "Salah",  color: "#2D8653" },
    ibadah: { done: 10, total: 14, label: "Ibadah", color: "#3C3489" },
    giving: { done: 4,  total: 7,  label: "Giving", color: "#B8820D" },
    sunnah: { done: 5,  total: 7,  label: "Sunnah", color: "#9B2335" },
  },
  topStreak: "Maghrib prayer - 7 days streak",
  topStreakAr: "صلاة المغرب - سلسلة ٧ أيام",
  improvement: "Fajr was missed 3 times. Try sleeping earlier.",
  improvementAr: "فاتتك صلاة الفجر ٣ مرات. جرّب النوم مبكرًا.",
  nextGoal: "Complete all 5 prayers on time for 3 consecutive days.",
  nextGoalAr: "أكمل الصلوات الخمس في وقتها لمدة ٣ أيام متتالية."
}
