export const DAILY_CONTENT = [
  {
    ayah: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    ayah_translation: "Indeed, Allah is with the patient.",
    surah: "Al-Baqarah 2:153",
    sunnah: "Smile at your brother — it is sadaqa.",
    dhikr: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
    dhikr_translation: "Glory be to Allah and His praise.",
    dhikr_count: 100,
    challenge: "Give water to someone today — even a glass."
  },
  {
    ayah: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    ayah_translation: "Whoever fears Allah — He will make a way out for them.",
    surah: "At-Talaq 65:2",
    sunnah: "Visit a sick person today, even with a message.",
    dhikr: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ",
    dhikr_translation: "O Allah, I ask You for wellbeing.",
    dhikr_count: 33,
    challenge: "Remove something harmful from the path today."
  },
  {
    ayah: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
    ayah_translation: "Cooperate in righteousness and piety.",
    surah: "Al-Ma'idah 5:2",
    sunnah: "Feed someone today, even a date.",
    dhikr: "بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ",
    dhikr_translation: "In the name of Allah, I place my trust in Allah.",
    dhikr_count: 7,
    challenge: "Check on a neighbour you haven't spoken to this week."
  }
]

export const getTodayContent = () => {
  const day = new Date().getDay()
  return DAILY_CONTENT[day % DAILY_CONTENT.length]
}

export const NEEDS = [
  {
    id: 1, type: "blood", title: "Urgent: Blood O+ Needed",
    titleAr: "عاجل: بحاجة لبلازما O+",
    org: "Ibn Sina Hospital", verified: "institution",
    detail: "Patient requires surgery tomorrow morning. 2 donors needed urgently.",
    detailAr: "المريض بحاجة لعملية جراحية غدًا صباحًا. مطلوب متبرعان بشكل عاجل.",
    lat: 33.994, lng: -6.854, urgency: "critical",
    bloodType: "O+", timePosted: "2 hours ago", distance: "1.2 km"
  },
  {
    id: 2, type: "food", title: "Family Needs Groceries",
    titleAr: "أسرة تحتاج للتموين الغذائي",
    org: "Umm Yusuf", verified: "masjid",
    detail: "Single mother of 3 children, lost income last month. Needs weekly groceries.",
    detailAr: "أم وحيدة لديها 3 أطفال فقدت مصدر دخلها الشهر الماضي. تحتاج لتموين أسبوعي.",
    lat: 33.988, lng: -6.861, urgency: "high",
    timePosted: "5 hours ago", distance: "2.8 km"
  },
  {
    id: 3, type: "orphan", title: "Dar Al-Amal Orphanage",
    titleAr: "دار الأمل للأيتام",
    org: "Dar Al-Amal", verified: "institution",
    detail: "32 children. Monthly food budget short by 2,400 MAD. Verified NGO.",
    detailAr: "٣٢ طفلًا. ميزانية الطعام الشهرية تنقص ٢٤٠٠ درهم. جمعية موثوقة.",
    lat: 34.001, lng: -6.848, urgency: "high",
    timePosted: "1 day ago", distance: "3.5 km"
  },
  {
    id: 4, type: "medical", title: "Medication for Elderly Man",
    titleAr: "دواء لرجل مسن",
    org: "Al-Nour Masjid", verified: "masjid",
    detail: "Brother Hassan, 74, cannot afford monthly insulin. 350 MAD needed.",
    detailAr: "الأخ حسن، ٧٤ عامًا، لا يستطيع تحمل تكلفة الإنسولين الشهري. مطلوب ٣٥٠ درهم.",
    lat: 33.991, lng: -6.870, urgency: "high",
    timePosted: "3 hours ago", distance: "4.1 km"
  },
  {
    id: 5, type: "student", title: "Student Tuition Hardship",
    titleAr: "طالب يحتاج دعم الرسوم",
    org: "Mohamed V University", verified: "institution",
    detail: "First-year student from rural family. Tuition gap of 1,800 MAD.",
    detailAr: "طالب في السنة الأولى من أسرة ريفية. لديه فجوة في الرسوم بقيمة ١٨٠٠ درهم.",
    lat: 33.998, lng: -6.843, urgency: "medium",
    timePosted: "2 days ago", distance: "5.0 km"
  },
  {
    id: 6, type: "funeral", title: "Funeral Assistance Needed",
    titleAr: "مساعدة مالية للجنائز",
    org: "Al-Iman Masjid", verified: "masjid",
    detail: "Family cannot cover janazah and burial costs. 1,200 MAD needed.",
    detailAr: "العائلة لا تستطيع تغطية تكاليف الجنازة والدفن. مطلوب ١٢٠٠ درهم.",
    lat: 33.985, lng: -6.858, urgency: "critical",
    timePosted: "1 hour ago", distance: "2.1 km"
  },
  {
    id: 7, type: "shelter", title: "Family Facing Eviction",
    titleAr: "عائلة مهددة بالطرد",
    org: "Amal Association", verified: "institution",
    detail: "Family of 5 facing eviction in 48h. Needs temporary housing support.",
    detailAr: "عائلة مكونة من ٥ أفراد مهددة بالطرد خلال ٤٨ ساعة. تحتاج دعم سكني مؤقت.",
    lat: 34.005, lng: -6.865, urgency: "critical",
    timePosted: "4 hours ago", distance: "6.2 km"
  }
]

export const EVENTS = [
  {
    id: 1, type: "salah", title: "Fajr Jama'a — Masjid Al-Nour",
    titleAr: "صلاة الفجر جماعة — مسجد النور",
    time: "Tomorrow, 5:12 AM", location: "Masjid Al-Nour, Hay Riad",
    lat: 33.991, lng: -6.870,
    attendees: 8, organizer: "Brother Karim",
    description: "Walking together from the parking lot at 5:05 AM. All brothers welcome.",
    descriptionAr: "سير جماعي من موقف السيارات الساعة ٥:٠٥ ص. مرحبًا بجميع الإخوة."
  },
  {
    id: 2, type: "halaqa", title: "Weekly Tafsir Circle",
    titleAr: "حلقة تفسير أسبوعية",
    time: "Friday, after Asr", location: "Masjid Sunnah, Témara",
    lat: 33.927, lng: -6.914,
    attendees: 15, organizer: "Sheikh Abdullah",
    description: "Continuing Surah Al-Kahf. Bring your Quran. Sisters' section available.",
    descriptionAr: "متابعة سورة الكهف. أحضري مصحفك. يوجد قسم خاص للأخوات."
  },
  {
    id: 3, type: "salah", title: "Sisters Taraweeh Circle",
    titleAr: "دائرة التراويح للأخوات",
    time: "Tonight, 9:30 PM", location: "Private home — sisters only",
    lat: 33.995, lng: -6.857,
    attendees: 6, organizer: "Ustadha Fatima",
    description: "Small intimate circle for sisters. Contact organizer for address.",
    descriptionAr: "دائرة صغيرة للأخوات في منزل خاص. راسلي المنسقة للحصول على العنوان.",
    womenOnly: true
  },
  {
    id: 4, type: "volunteer", title: "Orphanage Visit & Iftar Help",
    titleAr: "زيارة دار الأيتام ومساعدة الإفطار",
    time: "Saturday, 4:00 PM", location: "Dar Al-Amal, Salé",
    lat: 34.001, lng: -6.848,
    attendees: 12, organizer: "Amal Association",
    description: "Help prepare iftar for 32 children. Bring whatever you can.",
    descriptionAr: "ساعد في تجهيز الإفطار لـ٣٢ طفلًا. أحضر ما تستطيع من طعام أو ماء."
  }
]

export const USER_TYPES = [
  {
    id: "muslim", label: "Muslim individual", labelAr: "فرد مسلم",
    desc: "Request help, donate, join events",
    descAr: "أطلب مساعدة، تبرع، انضم للفعاليات"
  },
  {
    id: "masjid", label: "Masjid / Imam", labelAr: "مسجد / إمام",
    desc: "Manage community, vouch for members",
    descAr: "إدارة المجتمع، توثيق الأعضاء"
  },
  {
    id: "org", label: "Organisation / NGO", labelAr: "منظمة / جمعية",
    desc: "Post verified institutional needs",
    descAr: "نشر احتياجات مؤسسية موثوقة"
  },
  {
    id: "hospital", label: "Hospital / Clinic", labelAr: "مستشفى / عيادة",
    desc: "Post urgent medical needs",
    descAr: "نشر احتياجات طبية عاجلة"
  }
]

export const NEED_ICONS = {
  blood:   { label: "Blood donation", color: "#A32D2D", bg: "#FCEBEB" },
  food:    { label: "Groceries support", color: "#854F0B", bg: "#FAEEDA" },
  orphan:  { label: "Orphan support",  color: "#085041", bg: "#E1F5EE" },
  medical: { label: "Medical aid",     color: "#185FA5", bg: "#E6F1FB" },
  shelter: { label: "Shelter",         color: "#3B6D11", bg: "#EAF3DE" },
  student: { label: "Student hardship",color: "#3C3489", bg: "#EEEDFE" },
  funeral: { label: "Funeral aid",     color: "#444441", bg: "#F1EFE8" },
  traveler:{ label: "Stranded traveler",color: "#993556", bg: "#FBEAF0" },
  women:   { label: "Women's needs",   color: "#854F0B", bg: "#FAEEDA" }
}

export const EVENT_ICONS = {
  salah:     { color: "#085041", bg: "#E1F5EE" },
  halaqa:    { color: "#3C3489", bg: "#EEEDFE" },
  volunteer: { color: "#854F0B", bg: "#FAEEDA" },
  eid:       { color: "#D4A017", bg: "#FFFBEA" }
}
