// translation.js - Bilingual support for English and Arabic

const translations = {
    en: {
        // Loading
        "loading.text": "Powering Your Future...",
        
        // Navigation
        "nav.logo": "ElectroTeam",
        "nav.home": "Home",
        "nav.about": "About",
        "nav.services": "Services",
        "nav.whyus": "Why Us",
        "nav.projects": "Projects",
        "nav.team": "Team",
        "nav.contact": "Contact",
        
        // Hero Section
        "hero.title": "Powering Your<br /><span>Future</span> With<br />Modern Energy",
        "hero.subtitle": "Reliable electricity solutions for homes and businesses across Algeria.",
        "hero.consultation": "Get Free Consultation",
        "hero.services": "Our Services",
        "hero.stats.years": "+ 5 Years",
        "hero.stats.yearsText": "in the Business",
        "hero.stats.support": "24/7",
        "hero.stats.supportText": "Emergency Support",
        "hero.stats.quality": "100%",
        "hero.stats.qualityText": "Quality Guarantee",
        
        // About Section
        "about.title": "About <span>Electro Team</span>",
        "about.subtitle": "Leading the energy revolution since 2020",
        "about.slide1.title": "Who We Are",
        "about.slide1.description": "At Electro Team, we are dedicated to delivering top-tier electrical solutions across Algeria. With years of expertise, our team of skilled professionals specializes in electrical installations, maintenance, and troubleshooting.",
        "about.slide1.feature1": "Licensed & Certified",
        "about.slide1.feature2": "Safety First Approach",
        "about.slide2.title": "Our Mission & Vision",
        "about.slide2.description": "To provide reliable, efficient, and safe electrical solutions that power homes and businesses across Algeria, using the latest technology and certified materials.",
        "about.slide2.feature1": "Customer Satisfaction",
        "about.slide2.feature2": "Innovation Driven",
        "about.slide3.title": "Our Core Values",
        "about.slide3.description": "We prioritize safety in every project, following strict protocols and using certified safety equipment. Building lasting relationships with our clients through transparent communication and quality work.",
        "about.slide3.feature1": "Safety Certified",
        "about.slide3.feature2": "Trust & Reliability",
        
        // Services Section
        "services.title": "Our <span>Services</span>",
        "services.subtitle": "Comprehensive electrical solutions for every need",
        "services.card1.title": "Electrical Installation",
        "services.card1.description": "Comprehensive electrical setups for new buildings, renovations, and expansions.",
        "services.card1.feature1": "Complete wiring solutions",
        "services.card1.feature2": "Panel upgrades",
        "services.card1.feature3": "Circuit installations",
        "services.card2.title": "Maintenance & Repair",
        "services.card2.description": "Regular inspections and prompt repairs to keep systems running smoothly.",
        "services.card2.feature1": "24/7 emergency service",
        "services.card2.feature2": "Preventive maintenance",
        "services.card2.feature3": "Troubleshooting",
        "services.card3.title": "Lighting Solutions",
        "services.card3.description": "Design and installation of efficient lighting for all spaces.",
        "services.card3.feature1": "LED lighting systems",
        "services.card3.feature2": "Smart home lighting",
        "services.card3.feature3": "Commercial lighting",
        "services.card4.title": "Safety Systems",
        "services.card4.description": "Installation of security cameras, alarm systems, and electrical safety equipment.",
        "services.card4.feature1": "Security camera installation",
        "services.card4.feature2": "Alarm systems",
        "services.card4.feature3": "Electrical safety equipment",
        "services.cta": "Learn More",
        
        // Why Us Section
        "whyus.title": "Why <span>Choose Us</span>",
        "whyus.subtitle": "The Electro Team difference",
        "whyus.feature1.title": "Certified Professionals",
        "whyus.feature1.description": "All our electricians are licensed, insured, and continuously trained on the latest electrical codes and safety standards.",
        "whyus.feature1.badge": "Licensed",
        "whyus.feature2.title": "24/7 Emergency Service",
        "whyus.feature2.description": "Electrical emergencies don't wait for business hours. That's why we offer round-the-clock emergency services for urgent repairs.",
        "whyus.feature2.badge": "Always Available",
        "whyus.feature3.title": "Quality Guarantee",
        "whyus.feature3.description": "All our installations come with comprehensive warranties. We stand behind our work and ensure complete customer satisfaction.",
        "whyus.feature3.badge": "5-Year Warranty",
        "whyus.feature4.title": "Transparent Pricing",
        "whyus.feature4.description": "No hidden costs. We provide detailed quotes and explain every aspect of the work before starting any project.",
        "whyus.feature4.badge": "No Surprises",
        "whyus.dot1": "Certified",
        "whyus.dot2": "24/7 Service",
        "whyus.dot3": "Quality",
        "whyus.dot4": "Pricing",
        
        // Projects Section
        "projects.title": "Our <span>Projects</span>",
        "projects.subtitle": "Successfully completed projects across Algeria",
        "projects.project1.title": "Commercial Office Building",
        "projects.project1.description": "Full electrical installation including backup generators, emergency lighting, and energy management system for a modern 10-story office complex in Algiers.",
        "projects.project1.date": "Completed: 2023",
        "projects.project1.location": "Algiers, Algeria",
        "projects.project1.detail": "10 Floors",
        "projects.project2.title": "Industrial Plant Upgrade",
        "projects.project2.description": "Complete electrical overhaul with new control systems, safety upgrades, and energy-efficient lighting for increased production efficiency in Annaba.",
        "projects.project2.date": "Completed: 2023",
        "projects.project2.location": "Annaba, Algeria",
        "projects.project2.detail": "Industrial Grade",
        "projects.project3.title": "Residential Complex",
        "projects.project3.description": "Complete electrical installation for a new residential complex including wiring, lighting, and safety systems for 50 apartments in Oran.",
        "projects.project3.date": "Completed: 2024",
        "projects.project3.location": "Oran, Algeria",
        "projects.project3.detail": "50 Apartments",
        "projects.tag.commercial": "Commercial",
        "projects.tag.industrial": "Industrial",
        "projects.tag.residential": "Residential",
        
        // Team Section
        "team.title": "Our <span>Expert Team</span>",
        "team.subtitle": "Certified professionals",
        "team.member1.position": "Electrical Engineer",
        "team.member2.position": "Electrical Engineer",
        
        // Contact Section
        "contact.title": "Get In <span>Touch</span>",
        "contact.subtitle": "Contact us for electrical solutions",
        "contact.location": "Location",
        "contact.locationText": "Algiers, Ait Taya, Algeria",
        "contact.phone": "Phone",
        "contact.emergency": "24/7 Emergency Service",
        "contact.email": "Email",
        "contact.response": "Response within 24 hours",
        "contact.hoursTitle": "Working Hours",
        "contact.hoursWeek": "Mon - Fri: 8:00 AM - 6:00 PM",
        "contact.hoursSat": "Sat: 9:00 AM - 2:00 PM",
        "contact.formTitle": "Send Us a Message",
        "contact.namePlaceholder": "Your Name",
        "contact.emailPlaceholder": "Your Email",
        "contact.phonePlaceholder": "Phone Number",
        "contact.messagePlaceholder": "Your Message",
        "contact.sendButton": "Send Message",
        
        // Footer
        "footer.logo": "ElectroTeam",
        "footer.description": "Providing reliable electrical solutions since 2020. Certified, insured, and committed to excellence in every project.",
        "footer.linksTitle": "Quick Links",
        "footer.servicesTitle": "Our Services",
        "footer.contactTitle": "Contact Info",
        "footer.emergencyTitle": "24/7 Emergency Service",
        "footer.emergencyNumber": "Call Now: 05 40 32 56 16",
        "footer.copyright": "© 2025 Electro Team. All rights reserved.",
        "footer.privacy": "Privacy Policy",
        "footer.terms": "Terms of Service",
        "footer.safety": "Safety Standards"
    },
    
    ar: {
        // Loading
        "loading.text": "نشغيل مستقبلك...",
        
        // Navigation
        "nav.logo": "إلكترو<span>تيم</span>",
        "nav.home": "الرئيسية",
        "nav.about": "من نحن",
        "nav.services": "خدماتنا",
        "nav.whyus": "لماذا نحن",
        "nav.projects": "مشاريعنا",
        "nav.team": "فريقنا",
        "nav.contact": "اتصل بنا",
        
        // Hero Section
        "hero.title": "تشغيل <br /><span>مستقبلك</span> <br />بالطاقة الحديثة",
        "hero.subtitle": "حلول كهربائية موثوقة للمنازل والشركات عبر الجزائر.",
        "hero.consultation": "احصل على استشارة مجانية",
        "hero.services": "خدماتنا",
        "hero.stats.years": "+ 5 سنوات",
        "hero.stats.yearsText": "في مجال العمل",
        "hero.stats.support": "24/7",
        "hero.stats.supportText": "دعم طوارئ",
        "hero.stats.quality": "100%",
        "hero.stats.qualityText": "ضمان الجودة",
        
        // About Section
        "about.title": "عن <span>إلكترو تيم</span>",
        "about.subtitle": "قيادة ثورة الطاقة منذ 2020",
        "about.slide1.title": "من نحن",
        "about.slide1.description": "في إلكترو تيم، نحن ملتزمون بتقديم حلول كهربائية من الدرجة الأولى عبر الجزائر. مع سنوات من الخبرة، يتخصص فريقنا من المحترفين المهرة في التركيبات الكهربائية والصيانة واستكشاف الأخطاء وإصلاحها.",
        "about.slide1.feature1": "مرخص ومعتمد",
        "about.slide1.feature2": "نهج السلامة أولاً",
        "about.slide2.title": "مهمتنا ورؤيتنا",
        "about.slide2.description": "تقديم حلول كهربائية موثوقة وفعالة وآمنة تشغل المنازل والشركات في جميع أنحاء الجزائر، باستخدام أحدث التقنيات والمواد المعتمدة.",
        "about.slide2.feature1": "رضا العملاء",
        "about.slide2.feature2": "مدفوع بالابتكار",
        "about.slide3.title": "قيمنا الأساسية",
        "about.slide3.description": "نعطي الأولوية للسلامة في كل مشروع، ونتبع بروتوكولات صارمة ونستخدم معدات سلامة معتمدة. بناء علاقات دائمة مع عملائنا من خلال التواصل الشفاف والعمل الجيد.",
        "about.slide3.feature1": "معتمد في السلامة",
        "about.slide3.feature2": "الثقة والموثوقية",
        
        // Services Section
        "services.title": "خدمات<span>نا</span>",
        "services.subtitle": "حلول كهربائية شاملة لكل الاحتياجات",
        "services.card1.title": "التركيبات الكهربائية",
        "services.card1.description": "تركيبات كهربائية شاملة للمباني الجديدة والتجديدات والتوسعات.",
        "services.card1.feature1": "حلول الأسلاك الكاملة",
        "services.card1.feature2": "ترقية اللوحات",
        "services.card1.feature3": "تركيب الدوائر",
        "services.card2.title": "الصيانة والإصلاح",
        "services.card2.description": "فحوصات منتظمة وإصلاحات فورية للحفاظ على سير الأنظمة بسلاسة.",
        "services.card2.feature1": "خدمة طوارئ 24/7",
        "services.card2.feature2": "صيانة وقائية",
        "services.card2.feature3": "استكشاف الأخطاء",
        "services.card3.title": "حلول الإضاءة",
        "services.card3.description": "تصميم وتركيب إضاءة فعالة لجميع المساحات.",
        "services.card3.feature1": "أنظمة إضاءة LED",
        "services.card3.feature2": "إضاءة المنزل الذكي",
        "services.card3.feature3": "إضاءة تجارية",
        "services.card4.title": "أنظمة السلامة",
        "services.card4.description": "تركيب كاميرات مراقبة وأنظمة إنذار ومعدات السلامة الكهربائية.",
        "services.card4.feature1": "تركيب كاميرات المراقبة",
        "services.card4.feature2": "أنظمة الإنذار",
        "services.card4.feature3": "معدات السلامة الكهربائية",
        "services.cta": "تعرف أكثر",
        
        // Why Us Section
        "whyus.title": "لماذا <span>تختارنا</span>",
        "whyus.subtitle": "الفرق في إلكترو تيم",
        "whyus.feature1.title": "محترفون معتمدون",
        "whyus.feature1.description": "جميع كهربائينا مرخصون ومؤمنون ويتلقون تدريبًا مستمرًا على أحدث قوانين الكهرباء ومعايير السلامة.",
        "whyus.feature1.badge": "مرخص",
        "whyus.feature2.title": "خدمة طوارئ 24/7",
        "whyus.feature2.description": "طوارئ الكهرباء لا تنتظر ساعات العمل. لهذا نقدم خدمات طوارئ على مدار الساعة للإصلاحات العاجلة.",
        "whyus.feature2.badge": "متاح دائمًا",
        "whyus.feature3.title": "ضمان الجودة",
        "whyus.feature3.description": "جميع تركيباتنا تأتي مع ضمانات شاملة. نقف وراء عملنا ونضمن رضا العملاء الكامل.",
        "whyus.feature3.badge": "ضمان 5 سنوات",
        "whyus.feature4.title": "أسعار شفافة",
        "whyus.feature4.description": "لا توجد تكاليف خفية. نقدم عروض أسعار مفصلة ونشرح كل جانب من العمل قبل بدء أي مشروع.",
        "whyus.feature4.badge": "لا مفاجآت",
        "whyus.dot1": "معتمد",
        "whyus.dot2": "خدمة 24/7",
        "whyus.dot3": "الجودة",
        "whyus.dot4": "الأسعار",
        
        // Projects Section
        "projects.title": "مشاريع<span>نا</span>",
        "projects.subtitle": "مشاريع تم إنجازها بنجاح عبر الجزائر",
        "projects.project1.title": "مبنى مكتبي تجاري",
        "projects.project1.description": "تركيبات كهربائية كاملة تشمل مولدات احتياطية وإضاءة طوارئ ونظام إدارة الطاقة لمجمع مكتبي حديث من 10 طوابق في الجزائر العاصمة.",
        "projects.project1.date": "تم الإنجاز: 2023",
        "projects.project1.location": "الجزائر العاصمة، الجزائر",
        "projects.project1.detail": "10 طوابق",
        "projects.project2.title": "ترقية مصنع صناعي",
        "projects.project2.description": "إصلاح كهربائي كامل مع أنظمة تحكم جديدة وترقيات أمان وإضاءة موفرة للطاقة لزيادة كفاءة الإنتاج في عنابة.",
        "projects.project2.date": "تم الإنجاز: 2023",
        "projects.project2.location": "عنابة، الجزائر",
        "projects.project2.detail": "درجة صناعية",
        "projects.project3.title": "مجمع سكني",
        "projects.project3.description": "تركيبات كهربائية كاملة لمجمع سكني جديد تشمل الأسلاك والإضاءة وأنظمة السلامة لـ 50 شقة في وهران.",
        "projects.project3.date": "تم الإنجاز: 2024",
        "projects.project3.location": "وهران، الجزائر",
        "projects.project3.detail": "50 شقة",
        "projects.tag.commercial": "تجاري",
        "projects.tag.industrial": "صناعي",
        "projects.tag.residential": "سكني",
        
        // Team Section
        "team.title": "فريق<span>نا الخبير</span>",
        "team.subtitle": "محترفون معتمدون",
        "team.member1.position": "مهندس كهربائي",
        "team.member2.position": "مهندس كهربائي",
        
        // Contact Section
        "contact.title": "تواصل <span>معنا</span>",
        "contact.subtitle": "اتصل بنا للحصول على حلول كهربائية",
        "contact.location": "الموقع",
        "contact.locationText": "الجزائر العاصمة، آيت طاية، الجزائر",
        "contact.phone": "الهاتف",
        "contact.emergency": "خدمة طوارئ 24/7",
        "contact.email": "البريد الإلكتروني",
        "contact.response": "الرد خلال 24 ساعة",
        "contact.hoursTitle": "ساعات العمل",
        "contact.hoursWeek": "الإثنين - الجمعة: 8:00 صباحًا - 6:00 مساءً",
        "contact.hoursSat": "السبت: 9:00 صباحًا - 2:00 ظهرًا",
        "contact.formTitle": "أرسل لنا رسالة",
        "contact.namePlaceholder": "اسمك",
        "contact.emailPlaceholder": "بريدك الإلكتروني",
        "contact.phonePlaceholder": "رقم الهاتف",
        "contact.messagePlaceholder": "رسالتك",
        "contact.sendButton": "أرسل الرسالة",
        
        // Footer
        "footer.logo": "إلكترو<span>تيم</span>",
        "footer.description": "نقدم حلول كهربائية موثوقة منذ 2020. مرخصون ومؤمنون وملتزمون بالتميز في كل مشروع.",
        "footer.linksTitle": "روابط سريعة",
        "footer.servicesTitle": "خدماتنا",
        "footer.contactTitle": "معلومات الاتصال",
        "footer.emergencyTitle": "خدمة طوارئ 24/7",
        "footer.emergencyNumber": "اتصل الآن: 05 40 32 56 16",
        "footer.copyright": "© 2025 إلكترو تيم. جميع الحقوق محفوظة.",
        "footer.privacy": "سياسة الخصوصية",
        "footer.terms": "شروط الخدمة",
        "footer.safety": "معايير السلامة"
    }
};

// Current language
let currentLang = 'en';

// Function to translate the page
function translatePage(lang) {
    currentLang = lang;
    
    // Update HTML direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[lang] && translations[lang][key]) {
            if (element.hasAttribute('data-i18n-html')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update placeholder texts
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update language picker display
    const langCodeElements = document.querySelectorAll('.lang-code');
    langCodeElements.forEach(element => {
        element.textContent = lang.toUpperCase();
    });
    
    // Save language preference to localStorage
    localStorage.setItem('preferredLang', lang);
    
    console.log(`Language changed to ${lang}`);
}

// Initialize translation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    translatePage(savedLang);
    
    // Set up language picker event listeners
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            translatePage(lang);
            
            // Close dropdown
            const languagePickers = document.querySelectorAll('.language-picker');
            languagePickers.forEach(picker => {
                picker.classList.remove('active');
            });
        });
    });
    
    console.log('Translation system initialized');
});