export const translations = {
  en: {
    nav: { map: 'Map', zakat: 'Zakat', events: 'Events', profile: 'Profile' },
    language: { english: 'English', arabic: 'العربية', change: 'Change language' },
    map: {
      title: 'Ighatha — إغاثة',
      sub: '{count} urgent needs nearby',
      requestHelp: 'Request help',
      filters: {
        all: 'All', urgent: 'Urgent', blood: 'Blood', food: 'Food', medical: 'Medical', orphan: 'Orphans'
      },
      showing: 'Showing {count} needs',
      tapPin: 'Tap a pin to see details',
      donateBlood: 'I can donate blood',
      sendZakat: 'Send Zakat / Donate',
      share: 'Share with others',
      contactSent: 'Contact info sent to you',
      thanks: 'JazakAllahu Khairan',
      modalTitle: 'Request help',
      needType: {
        blood: 'Blood donation', food: 'Food support', medical: 'Medical support', orphan: 'Orphan care', shelter: 'Shelter aid', student: 'Student support', funeral: 'Funeral aid', traveler: 'Traveler support', women: 'Women’s needs'
      },
      modalHint: 'Your request will be reviewed before appearing on the map.',
      placeholder: 'Describe the need clearly and honestly. Allah is witness.',
      noNeeds: 'No needs found near you',
      verifiedOrganisation: 'Verified Organisation',
      masjidVouched: 'Masjid-vouched',
      urgent: 'Urgent'
    },
    login: {
      heading: 'One ummah. No one left behind.',
      kicker: 'A calmer way to care',
      role: 'I am joining as…',
      roleHint: 'Select the path that best fits how you will give, receive, or coordinate care.',
      createAccount: 'Create account',
      signIn: 'Sign in',
      email: 'Email address',
      password: 'Password',
      confirmPassword: 'Retype password',
      organization: 'Organisation name',
      name: 'Your name',
      sex: 'Sex',
      sexPlaceholder: 'Select sex',
      bloodType: 'Blood type',
      bloodTypePlaceholder: 'Blood type (optional)',
      age: 'Age',
      agePlaceholder: 'Your age',
      male: 'Male',
      female: 'Female',
      preferNot: 'Prefer not to say',
      join: 'Join Silah',
      signInButton: 'Sign in to Silah',
      back: '← Back',
      disclaimer: 'By joining, you agree to use this platform with sincerity and honesty. Allah is witness to all intentions.',
    },
    daily: {
      greeting: 'السَّلَامُ عَلَيْكُمْ',
      ayahBadge: 'Ayah of the day',
      dhikrBadge: 'Daily Dhikr',
      challengeBadge: 'Sunnah challenge',
      complete: '✓ Alhamdulillah — completed',
      count: 'Tap to count — اللهم اجعلنا من الذاكرين',
      challengeAction: 'I will do this today',
      challengeDone: '✓ May Allah accept it',
      enter: 'Enter Silah',
      skip: 'Skip for now',
    },
    profile: {
      impactTitle: 'Your impact',
      badgesTitle: 'Badges — أوسمة',
      impactNote: 'Impact is private. Only you can see these numbers. Your deeds are between you and Allah.',
      badgeNote: 'Badges show trust and reliability — not competition. No leaderboards. No rankings.',
      account: 'Account',
      settings: { notifications: 'Notifications', location: 'My location', masjid: 'My masjid', language: 'Language' },
      signOut: 'Sign out',
      trusted: 'Masjid-vouched'
    },
    events: {
      title: 'Events — فعاليات',
      sub: 'Join prayer, learning & community',
      organise: '+ Organise',
      all: 'All events',
      salah: 'Salah',
      halaqa: 'Halaqa',
      volunteer: 'Volunteer',
      sistersOnly: 'Sisters only',
      attending: 'attending',
      join: 'Join & earn ajr',
      joined: '✓ Joined — earn ajr',
      modalTitle: 'Organise an event',
      selectPlaceholder: 'Type of event…',
      eventTitle: 'Event title',
      location: 'Location / Masjid name',
      details: 'Details for attendees…',
      optionSalah: 'Group Salah (Jama\'a)',
      optionHalaqa: 'Halaqa / Quran circle',
      optionVolunteer: 'Volunteer day',
      optionEid: 'Eid coordination',
      optionSisters: 'Sisters\' circle',
      post: 'Post event'
    },
    zakat: {
      title: 'Zakat — زكاة',
      sub: 'Calculate, then give directly to verified needs',
      fields: {
        cash: 'Cash on hand',
        savings: 'Bank savings',
        gold: 'Gold & silver',
        business: 'Business assets',
        investments: 'Investments'
      },
      placeholderAmount: '0 MAD',
      nisab: 'Nisab today ≈ {amount} MAD (silver standard). Zakat is 2.5% of total assets held for one lunar year.',
      assets: 'Your zakatable assets (MAD)',
      totalAssets: 'Total assets',
      nisabThreshold: 'Nisab threshold',
      aboveNisab: '✓ Above nisab',
      belowNisab: '✗ Below nisab',
      zakatDue: 'Zakat due (2.5%)',
      distribute: 'Distribute my Zakat now →',
      noZakat: 'Alhamdulillah — no Zakat due. Consider giving Sadaqa voluntarily.',
      distributeTitle: 'Distribute to verified needs',
      remaining: 'Remaining to distribute',
      totalAssigned: 'Total assigned',
      confirm: 'Confirm Zakat distribution',
      confirmationTitle: 'JazakAllahu Khairan',
      confirmationText: 'Your Zakat of {amount} MAD has been recorded and will be distributed to your chosen recipients. May Allah accept it and bless your wealth.',
      confirmationSub: 'Funds are held in escrow and released upon recipient confirmation. You will receive an anonymised impact update. No public announcement is made — your deed is between you and Allah.'
    },
    roles: {
      muslim: { label: 'Individual', ar: 'فرد', desc: 'Ask for support, give quietly, or join community care.', descAr: 'اطلب الدعم أو ساعد بهدوء أو شارك في رعاية المجتمع.' },
      masjid: { label: 'Masjid care team', ar: 'فريق المسجد', desc: 'Verify local needs and coordinate trusted support.', descAr: 'توثيق الاحتياجات المحلية وتنسيق الدعم الموثوق.' },
      org: { label: 'Charity organisation', ar: 'منظمة خيرية', desc: 'Publish verified cases with dignity and clarity.', descAr: 'نشر الحالات الموثقة بكرامة ووضوح.' },
      hospital: { label: 'Hospital or clinic', ar: 'مستشفى أو عيادة', desc: 'Share urgent medical needs with the community.', descAr: 'مشاركة الاحتياجات الطبية العاجلة مع المجتمع.' }
    }
  },
  ar: {
    nav: { map: 'الخريطة', zakat: 'الزكاة', events: 'الفعاليات', profile: 'الملف' },
    language: { english: 'English', arabic: 'العربية', change: 'تغيير اللغة' },
    map: {
      title: 'إغاثة — Ighatha',
      sub: 'هناك {count} حالة عاجلة بالقرب منك',
      requestHelp: 'طلب مساعدة',
      filters: {
        all: 'الكل', urgent: 'عاجل', blood: 'الدم', food: 'الطعام', medical: 'طبي', orphan: 'الأيتام'
      },
      showing: 'عرض {count} حالة',
      tapPin: 'انقر على الدبوس لعرض التفاصيل',
      donateBlood: 'يمكنني التبرع بالدم',
      sendZakat: 'أرسل الزكاة / تبرع',
      share: 'مشاركة مع الآخرين',
      contactSent: 'تم إرسال بيانات الاتصال',
      thanks: 'جزاك الله خيرًا',
      modalTitle: 'طلب مساعدة',
      needType: {
        blood: 'تبرع بالدم', food: 'مساعدة غذائية', medical: 'مساعدة طبية', orphan: 'رعاية الأيتام', shelter: 'مساعدة سكنية', student: 'دعم الطالب', funeral: 'مساعدة جنازة', traveler: 'دعم المسافر', women: 'احتياجات النساء'
      },
      modalHint: 'سيتم مراجعة طلبك قبل ظهوره على الخريطة.',
      placeholder: 'صف الحاجة بوضوح وأمانة. الله شهيد.',
      noNeeds: 'لا توجد احتياجات قريبة منك',
      verifiedOrganisation: 'منظمة موثقة',
      masjidVouched: 'موثق من المسجد',
      urgent: 'عاجل'
    },
    login: {
      heading: 'أمة واحدة. لا يترك أحد وراءها.',
      kicker: 'رعاية أهدأ وأكثر رحمة',
      role: 'أنضم كـ…',
      roleHint: 'اختر المسار الأقرب لطريقة عطائك أو طلبك للدعم أو تنسيقك للرعاية.',
      createAccount: 'إنشاء حساب',
      signIn: 'تسجيل الدخول',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'أعد كتابة كلمة المرور',
      organization: 'اسم المنظمة',
      name: 'اسمك',
      sex: 'الجنس',
      sexPlaceholder: 'اختر الجنس',
      bloodType: 'فصيلة الدم',
      bloodTypePlaceholder: 'فصيلة الدم (اختياري)',
      age: 'العمر',
      agePlaceholder: 'عمرك',
      male: 'ذكر',
      female: 'أنثى',
      preferNot: 'أفضل عدم الإجابة',
      join: 'انضم إلى صِلة',
      signInButton: 'تسجيل الدخول إلى صِلة',
      back: '← عودة',
      disclaimer: 'بإنضمامك، توافق على استخدام هذا المنصة بإخلاص وأمانة. الله شهيد على كل النوايا.'
    },
    daily: {
      greeting: 'السَّلَامُ عَلَيْكُمْ',
      ayahBadge: 'آية اليوم',
      dhikrBadge: 'الذكر اليومي',
      challengeBadge: 'تحدي السنة',
      complete: '✓ الحمد لله — اكتملت',
      count: 'اضغط للعد — اللهم اجعلنا من الذاكرين',
      challengeAction: 'سأفعل هذا اليوم',
      challengeDone: '✓ تقبل الله',
      enter: 'ادخل إلى صِلة',
      skip: 'تخطي الآن'
    },
    profile: {
      impactTitle: 'تأثيرك',
      badgesTitle: 'أوسمة',
      impactNote: 'التأثير خاص. فقط يمكنك رؤية هذه الأرقام. عملك بينك وبين الله.',
      badgeNote: 'الأوسمة تظهر الثقة والموثوقية — ليست منافسة. لا يوجد لوحات صدارة.',
      account: 'الحساب',
      settings: { notifications: 'الإشعارات', location: 'موقعي', masjid: 'مسجدي', language: 'اللغة' },
      signOut: 'تسجيل الخروج',
      trusted: 'موثق من المسجد'
    },
    events: {
      title: 'فعاليات',
      sub: 'انضم إلى الصلاة والتعلم والمجتمع',
      organise: '+ أنشئ',
      all: 'كل الفعاليات',
      salah: 'صلاة',
      halaqa: 'حلقة',
      volunteer: 'تطوع',
      sistersOnly: 'مخصص للسيدات',
      attending: 'منضمون',
      join: 'انضم واكسب أجر',
      joined: '✓ انضممت — اكسب أجر',
      modalTitle: 'نظم حدثًا',
      selectPlaceholder: 'نوع الحدث…',
      eventTitle: 'عنوان الحدث',
      location: 'الموقع / اسم المسجد',
      details: 'تفاصيل للحضور…',
      optionSalah: 'صلاة جماعية',
      optionHalaqa: 'حلقة / حلقة القرآن',
      optionVolunteer: 'يوم تطوعي',
      optionEid: 'تنسيق عيد',
      optionSisters: 'دائرة الأخوات',
      post: 'نشر الحدث'
    },
    zakat: {
      title: 'الزكاة',
      sub: 'احسب ثم أعط مباشرة للاحتياجات الموثوقة',
      fields: {
        cash: 'نقد متوفر',
        savings: 'مدخرات في البنك',
        gold: 'الذهب والفضة',
        business: 'أصول الأعمال',
        investments: 'الاستثمارات'
      },
      placeholderAmount: '0 د.م',
      nisab: 'النباب اليوم ≈ {amount} د.م (معيار الفضة). الزكاة 2.5% من إجمالي الأموال المحتفظ بها سنة هجرية.',
      assets: 'أصولك الزكوية (د.م)',
      totalAssets: 'إجمالي الأصول',
      nisabThreshold: 'حد النصاب',
      aboveNisab: '✓ فوق النصاب',
      belowNisab: '✗ تحت النصاب',
      zakatDue: 'الزكاة المستحقة (2.5%)',
      distribute: 'وزع زكاتي الآن →',
      noZakat: 'الحمد لله — لا زكاة مستحقة. فكر في صدقة تطوعية.',
      distributeTitle: 'وزع على الاحتياجات الموثوقة',
      remaining: 'المتبقي للتوزيع',
      totalAssigned: 'الإجمالي المخصص',
      confirm: 'تأكيد توزيع الزكاة',
      confirmationTitle: 'جزاك الله خيرًا',
      confirmationText: 'زكاتك بقيمة {amount} د.م تم تسجيلها وسيتم توزيعها على المستفيدين الذين اخترتهم. نسأل الله قبولها وبركة المال.',
      confirmationSub: 'الأموال محفوظة في الأمانة وتُفرج بعد تأكيد المستفيد. ستحصل على تحديث أثر مجهول. لا يوجد إعلان عام — عملك بينك وبين الله.'
    },
    roles: {
      muslim: { label: 'Individual', ar: 'فرد', desc: 'Ask for support, give quietly, or join community care.', descAr: 'اطلب الدعم أو ساعد بهدوء أو شارك في رعاية المجتمع.' },
      masjid: { label: 'Masjid care team', ar: 'فريق المسجد', desc: 'Verify local needs and coordinate trusted support.', descAr: 'توثيق الاحتياجات المحلية وتنسيق الدعم الموثوق.' },
      org: { label: 'Charity organisation', ar: 'منظمة خيرية', desc: 'Publish verified cases with dignity and clarity.', descAr: 'نشر الحالات الموثقة بكرامة ووضوح.' },
      hospital: { label: 'Hospital or clinic', ar: 'مستشفى أو عيادة', desc: 'Share urgent medical needs with the community.', descAr: 'مشاركة الاحتياجات الطبية العاجلة مع المجتمع.' }
    }
  }
}

export function t(locale, path, vars = {}) {
  const segments = path.split('.')
  let current = translations[locale] || translations.en
  for (const segment of segments) {
    current = current?.[segment]
    if (current == null) break
  }
  let text = typeof current === 'string' ? current : path
  Object.entries(vars).forEach(([key, value]) => {
    text = text.replace(new RegExp(`\{${key}\}`, 'g'), value)
  })
  return text
}
