/* ==========================================================================
   Bilingual support (English / Arabic)
   - English is the source of truth and lives in the HTML (works without JS, good for SEO).
   - Elements marked data-i18n="key" get their content swapped for the Arabic string below.
   - data-i18n-attr="attr:key;attr2:key2" does the same for attributes (aria-label, alt, content…).
   - The page direction (RTL/LTR) and <html lang> follow the active language.
   ========================================================================== */
(() => {
    const root = document.documentElement;

    const AR = {
        // Meta & accessibility
        'meta.title': 'إسلام سالم | مطوّر Flutter أول',
        'meta.description': 'إسلام سالم — مطوّر Flutter أول بخبرة تتجاوز 5 سنوات في إطلاق تطبيقات iOS و Android الإنتاجية: خدمات المشاوير والأسواق الإلكترونية والبثّ المباشر والتعليم. من أعماله Material Stations و Aabir و Golden Voice و SAWTI وغيرها.',
        'a11y.skip': 'تخطَّ إلى المحتوى',
        'a11y.top': 'العودة إلى الأعلى',

        // Navigation & shared
        'nav.homeLabel': 'إسلام سالم — الصفحة الرئيسية',
        'nav.label': 'التنقّل الرئيسي',
        'brand.name': 'إسلام<span class="highlight"> سالم</span>',
        'nav.about': 'نبذة',
        'nav.skills': 'المهارات',
        'nav.apps': 'التطبيقات',
        'nav.experience': 'الخبرات',
        'nav.contact': 'تواصل',
        'lang.aria': 'التبديل إلى الإنجليزية',
        'lang.label': 'English',
        'theme.title': 'تبديل المظهر',
        'cta.download': 'تحميل السيرة الذاتية',
        'common.whatsapp': 'واتساب',
        'common.email': 'البريد الإلكتروني',
        'common.web': 'الويب',

        // Hero
        'hero.status': 'متاح لفرص العمل عن بُعد',
        'hero.hello': 'أهلًا، أنا',
        'hero.name': 'إسلام سالم',
        'hero.role': 'مطوّر Flutter أول',
        'hero.rotatorPrefix': 'أبني',
        'hero.description': 'مطوّر Flutter أول بخبرة تتجاوز 5 سنوات في نقل المنتجات الرقمية من التصميم المعماري إلى النشر على App Store و Google Play. أنجزتُ تطبيقات لخدمات المشاوير والبثّ المباشر والمحتوى الصوتي والأسواق متعددة البائعين لعملاء في قطر والسعودية ومصر، مع التركيز على Clean Architecture وأداء الوقت الحقيقي وكود قابل للصيانة.',
        'hero.viewApps': 'استعرض تطبيقاتي',
        'hero.socials': 'روابط التواصل الاجتماعي',
        'hero.photoAlt': 'صورة شخصية لإسلام سالم',
        'stats.years': 'سنوات الخبرة',
        'stats.projects': 'مشروع منجز',
        'stats.apps': 'تطبيق ومنصة منشورة',
        'stats.remote': 'جاهز للعمل عن بُعد',

        // About
        'about.eyebrow': 'نبذة',
        'about.title': 'عقلية هندسية، <span class="gradient-text">وتركيز على المنتج</span>',
        'about.lead': 'أنا مطوّر تطبيقات موبايل بخبرة <strong class="highlight">تتجاوز 5 سنوات</strong> في بناء تطبيقات iOS و Android عالية الأداء باستخدام <strong class="highlight">Flutter</strong>.',
        'about.p2': 'أعمل حاليًا <strong>مطوّر Flutter في SkyCrew</strong> (عن بُعد)، حيث أُسلّم تطبيقات جاهزة للإنتاج وقابلة للتوسّع، وأتعاون مع فرق دولية في <strong>قطر والسعودية</strong>.',
        'about.p3': 'يرتكز أسلوبي على <strong>Clean Architecture</strong> وحلّ المشكلات بمنهجية، وتقديم تجارب مستخدم دقيقة التنفيذ — من أول سطر برمجي حتى ظهور التطبيق على المتاجر.',
        'about.fact1': 'مصر · أعمل عن بُعد مع فرق في قطر والسعودية',
        'about.fact2': 'مطوّر Flutter في SkyCrew (2024 – الآن)',
        'about.fact3': 'بنيتُ منظومة <a href="#material-stations">Material Stations</a> متعددة التطبيقات',
        'str.arch.title': 'معمارية نظيفة',
        'str.arch.text': 'أكواد منظّمة في طبقات وقابلة للاختبار، مبنية على مبادئ SOLID و MVVM وحقن الاعتماديات.',
        'str.rt.title': 'أنظمة الوقت الحقيقي',
        'str.rt.text': 'تتبّع مباشر و WebSockets وبثّ فيديو وتشغيل صوتي يظلّ سلسًا تحت الضغط.',
        'str.ship.title': 'جاهزية النشر على المتاجر',
        'str.ship.text': 'CI/CD وإصدارات Google Play و App Store Connect لتطبيقات تعمل فعليًا في الإنتاج.',
        'str.team.title': 'العمل عن بُعد',
        'str.team.text': 'خبرة في قيادة فرق دولية موزّعة والعمل معها بكفاءة.',

        // Skills
        'skills.eyebrow': 'المهارات',
        'skills.title': 'التقنيات <span class="gradient-text">المستخدمة</span>',
        'skills.core': 'أساسيات Flutter',
        'skills.arch': 'المعمارية',
        'skills.state': 'إدارة الحالة',
        'skills.net': 'الشبكات والبيانات',
        'skills.integ': 'التكاملات',
        'skills.devops': 'DevOps والنشر',
        'skills.testing': 'الاختبار',
        'skills.platforms': 'المنصات',

        // Apps
        'apps.eyebrow': 'الأعمال',
        'apps.title': 'تطبيقات <span class="gradient-text">بنيتُها ونشرتُها</span>',
        'apps.sub': 'منتجات منشورة على Google Play و App Store والويب.',
        'apps.more': 'المزيد من الأكواد على',

        // Material Stations
        'ms.badge': 'منظومة مميّزة',
        'ms.tagline': 'سوق متعدد البائعين لمواد ومعدات البناء في السعودية — أربعة تطبيقات موبايل مترابطة بالإضافة إلى بوابات ويب.',
        'ms.storefront': 'المتجر',
        'ms.vendorPortal': 'بوابة البائعين',
        'ms.allPlay': 'كل التطبيقات على Google Play',
        'ms.flowLabel': 'آلية عمل المنظومة',
        'ms.flow1': 'العميل يتصفّح ويطلب',
        'ms.flow2': 'البائع يعتمد الطلب',
        'ms.flow3': 'يُسنَد التوصيل',
        'ms.flow4': 'السائق يوصّل للعميل',
        'ms.customer': 'العميل',
        'ms.customerText': 'تسوّق لمواد ومعدات البناء، واختر الاستلام بنفسك أو التوصيل.',
        'ms.vendor': 'البائعون',
        'ms.vendorText': 'يضيف البائعون منتجاتهم، ويستلمون الطلبات ويعتمدونها، وينسّقون التوصيل.',
        'ms.driver': 'التوصيل',
        'ms.driverText': 'يستلم السائقون الطلبات من الموزّعين ويوصّلونها إلى العملاء.',
        'ms.provider': 'الخدمات',
        'ms.providerText': 'يعرض مقدّمو الخدمات الخدمات التي يمكنهم تنفيذها على مسؤوليتهم الخاصة.',

        // Individual apps
        'aabir.cat': 'خدمة المشاوير · قطر',
        'aabir.text': 'تطبيقان منفصلان للراكب والكابتن (السائق) لخدمة المشاوير في قطر، مع تتبّع لحظي موثوق.',
        'aabir.passenger': 'الراكب',
        'aabir.captain': 'الكابتن',
        'wtour.cat': 'دليل سياحي',
        'wtour.text': 'رفيق سفر لاكتشاف المواقع التاريخية والدينية والثقافية والطبيعية، إضافة إلى الفنادق والمطاعم، مع بحث سهل واكتشاف الأماكن القريبة.',
        'story.cat': 'تقنيات التعليم',
        'story.text': 'تعلّم الإنجليزية عبر القصص بالذكاء الاصطناعي، مع تقييم فوري لدقّة النطق.',
        'sawti.cat': 'البثّ الصوتي',
        'sawti.text': 'منصة موحّدة لبثّ الراديو والمحتوى الصوتي، مع التشغيل في الخلفية ودعم الاستماع دون اتصال.',
        'golden.cat': 'التواصل الاجتماعي',
        'golden.text': 'تطبيق فيديوهات قصيرة وبثّ مباشر على غرار تيك توك، يركّز على اكتشاف المواهب.',
        'egy.cat': 'دليل سياحي',
        'egy.text': 'دليل سياحي ذكي لاستكشاف أبرز الوجهات السياحية في مصر، مع خرائط ودليل منتقى.',
        'node.cat': 'الإنتاجية · ويب',
        'node.text': 'منصة إنتاجية على الويب لتنظيم الأفكار والملاحظات في بنية شجرية مرتّبة.',
        'node.open': 'افتح تطبيق الويب',

        // Experience
        'exp.eyebrow': 'المسيرة',
        'exp.title': 'الخبرات <span class="gradient-text">العملية</span>',
        'exp.current': 'الحالي',
        'exp.flutter': 'مطوّر Flutter',
        'exp.sky.date': '2024 – الآن',
        'exp.sky.company': 'SkyCrew · قطر (عن بُعد)',
        'exp.sky.text': 'تصميم حلول Flutter قابلة للتوسّع لتطبيقات المشاوير والخدمات اللوجستية، بالتعاون مع فرق دولية عن بُعد في قطر والسعودية.',
        'exp.sky.b1': 'صمّمتُ معمارية منظومة <a href="#app-aabir">Aabir</a> للراكب والكابتن مع التتبّع اللحظي.',
        'exp.sky.b2': 'أدرتُ فرقًا دولية عن بُعد وتعاونتُ معها.',
        'exp.sky.b3': 'طبّقتُ مسارات CI/CD لإصدارات أسرع وأكثر أمانًا.',
        'exp.free.company': 'عمل حر',
        'exp.free.text': 'سلّمتُ تطبيقات موبايل عالية الجودة لعملاء دوليين، من أول سطر برمجي حتى النشر على المتاجر.',
        'exp.free.b1': 'بنيتُ تطبيق <a href="#app-golden-voice">Golden Voice</a> للفيديوهات القصيرة والبثّ المباشر.',
        'exp.free.b2': 'بنيتُ منظومة <a href="#material-stations">Material Stations</a> للتجارة الإلكترونية متعددة التطبيقات.',
        'exp.free.b3': 'نشرتُ تطبيقات على Google Play و App Store مع التركيز على الأداء والمعمارية النظيفة.',
        'exp.early.title': 'مطوّر تطبيقات موبايل',
        'exp.early.company': 'شركات ووكالات متنوعة',
        'exp.early.text': 'بدأتُ مسيرتي في تطوير تطبيقات الموبايل بالعمل على مشاريع Android الأصلية و Flutter.',

        // Contact & footer
        'contact.eyebrow': 'تواصل معي',
        'contact.title': 'لنبنِ شيئًا <span class="gradient-text">مميّزًا معًا</span>',
        'contact.sub': 'متاح للعمل عن بُعد، والعقود طويلة المدى، وأفكار المنتجات المثيرة للاهتمام.',
        'contact.phone': 'الهاتف',
        'contact.downloadPdf': 'تحميل السيرة الذاتية (PDF)',
        'contact.save': 'حفظ جهة الاتصال',
        'footer.rights': '&copy; <span class="js-year">2026</span> إسلام سالم. جميع الحقوق محفوظة.',
        'footer.note': 'بُني باستخدام HTML و CSS وقليل من JavaScript.'
    };

    // Strings that scripts create at runtime (not tied to a DOM node)
    const DYN = {
        en: {
            'theme.toLight': 'Switch to light theme',
            'theme.toDark': 'Switch to dark theme',
            'menu.open': 'Open menu',
            'menu.close': 'Close menu',
            'logo.alt': (name) => `${name} logo`,
            rotator: [
                'scalable production apps',
                'clean, testable architecture',
                'pixel-perfect interfaces',
                'real-time experiences',
                'multi-app ecosystems'
            ]
        },
        ar: {
            'theme.toLight': 'التبديل إلى المظهر الفاتح',
            'theme.toDark': 'التبديل إلى المظهر الداكن',
            'menu.open': 'فتح القائمة',
            'menu.close': 'إغلاق القائمة',
            'logo.alt': (name) => `شعار ${name}`,
            rotator: [
                'تطبيقات إنتاجية قابلة للتوسّع',
                'معمارية نظيفة وقابلة للاختبار',
                'واجهات دقيقة حتى آخر تفصيل',
                'تجارب فورية في الوقت الحقيقي',
                'منظومات متعددة التطبيقات'
            ]
        }
    };

    // Remember the English source text so switching back is lossless
    const textNodes = Array.from(document.querySelectorAll('[data-i18n]'));
    const attrNodes = Array.from(document.querySelectorAll('[data-i18n-attr]'));
    const logoNodes = Array.from(document.querySelectorAll('img[data-logo]'));

    textNodes.forEach((el) => {
        el.dataset.en = el.tagName === 'TITLE' ? el.textContent : el.innerHTML;
    });

    attrNodes.forEach((el) => {
        el._i18nAttrs = el.getAttribute('data-i18n-attr').split(';').map((pair) => {
            const [attr, key] = pair.split(':').map((s) => s.trim());
            return { attr, key, en: el.getAttribute(attr) };
        });
    });

    const warned = new Set();
    const pick = (lang, key, fallback) => {
        if (lang === 'ar') {
            if (key in AR) return AR[key];
            if (!warned.has(key)) { warned.add(key); console.warn(`[i18n] missing Arabic string: ${key}`); }
        }
        return fallback;
    };

    let current = 'en';

    const apply = (lang) => {
        current = lang === 'ar' ? 'ar' : 'en';
        root.setAttribute('lang', current);
        root.setAttribute('dir', current === 'ar' ? 'rtl' : 'ltr');

        textNodes.forEach((el) => {
            const value = pick(current, el.dataset.i18n, el.dataset.en);
            if (el.tagName === 'TITLE') el.textContent = value;
            else el.innerHTML = value;
        });

        attrNodes.forEach((el) => el._i18nAttrs.forEach(({ attr, key, en }) => {
            el.setAttribute(attr, pick(current, key, en));
        }));

        logoNodes.forEach((img) => { img.alt = DYN[current]['logo.alt'](img.dataset.logo); });
        document.querySelectorAll('.js-year').forEach((el) => { el.textContent = new Date().getFullYear(); });

        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: current } }));
    };

    const set = (lang) => {
        apply(lang);
        try { localStorage.setItem('lang', current); } catch (e) { /* storage unavailable */ }
    };

    window.I18n = {
        get lang() { return current; },
        t: (key) => DYN[current][key],
        set
    };

    apply(window.__lang || root.getAttribute('lang') || 'en');

    const toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.addEventListener('click', () => set(current === 'ar' ? 'en' : 'ar'));
})();
