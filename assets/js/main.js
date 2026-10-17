// Najot Ta'lim - Modern Cyber Neon Logic with Kinematic Scroll Engine

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Reading / Scroll Progress Bar
  const progressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  // 2. Kinematic Scroll Observer (Cinematic Blur-to-Focus reveal)
  const revealElements = document.querySelectorAll('.reveal-init, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu(show) {
    if (show) {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenu.classList.add('opacity-100');
      }, 10);
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('opacity-100');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }, 200);
    }
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // 4. Navbar Ambient Glow on Scroll
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('shadow-[0_4px_30px_rgba(0,240,255,0.15)]', 'border-b', 'border-[#00F0FF]/30');
    } else {
      navbar.classList.remove('shadow-[0_4px_30px_rgba(0,240,255,0.15)]', 'border-b', 'border-[#00F0FF]/30');
    }
  });

  // 5. Course Filter Tabs
  const filterBtns = document.querySelectorAll('.tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.filter = 'blur(0px)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px) scale(0.96)';
          card.style.filter = 'blur(4px)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });

  // 6. Direct Enrollment Link to Form with Smooth Scroll & Pulse
  const enrollButtons = document.querySelectorAll('.enroll-course-btn');
  const courseSelect = document.getElementById('courseSelect');
  const contactSection = document.getElementById('contact');

  function selectCourseAndScroll(courseValue) {
    if (courseSelect && courseValue) {
      courseSelect.value = courseValue;
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      courseSelect.classList.add('ring-2', 'ring-[#00F0FF]', 'shadow-[0_0_25px_rgba(0,240,255,0.6)]');
      setTimeout(() => {
        courseSelect.classList.remove('ring-2', 'ring-[#00F0FF]', 'shadow-[0_0_25px_rgba(0,240,255,0.6)]');
      }, 1800);
    }
  }

  enrollButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseName = btn.getAttribute('data-course');
      selectCourseAndScroll(courseName);
    });
  });

  // 7. Course Detail Modal Database with Exact Select Values
  const modalOverlay = document.getElementById('courseModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalDuration = document.getElementById('modalDuration');
  const modalLevel = document.getElementById('modalLevel');
  const modalDesc = document.getElementById('modalDesc');
  const modalTopics = document.getElementById('modalTopics');
  const modalEnrollBtn = document.getElementById('modalEnrollBtn');

  const courseDetails = {
    'ai-eng': {
      title: "AI Muhandisligi (AI Engineering)",
      selectValue: "AI Muhandisligi",
      badge: "Neon Tanlov",
      duration: "8 oy (Haftada 3 kun)",
      level: "O'rta / Yuqori",
      desc: "Neyron tarmoqlar, Large Language Models (LLM), PyTorch, OpenAI API, LangChain va sun'iy intellekt modellarini real biznes tizimlariga integratsiya qilish bo'yicha to'liq amaliy kurs.",
      topics: [
        "Python for AI & Matematik asoslar",
        "Machine Learning algoritmlari va Data Science",
        "Deep Learning & PyTorch arxitekturasi",
        "LLM & Transformers modellari bilan ishlash",
        "RAG (Retrieval-Augmented Generation) & Vector DBs",
        "Fine-tuning & AI Model deployment (FastAPI, Docker)"
      ]
    },
    'ai-auto': {
      title: "AI Avtomatlashtirish & Agentlar",
      selectValue: "AI Avtomatlashtirish",
      badge: "Trend 2026",
      duration: "4 oy (Haftada 3 kun)",
      level: "Boshlang'ich / O'rta",
      desc: "Biznes jarayonlarini avtonom AI agentlar, Make, n8n, Python va zamonaviy LLM modellar orqali 10 barobargacha tezlashtirish va avtomatlashtirish san'ati.",
      topics: [
        "AI Agentlar arxitekturasi va Prompt Engineering",
        "n8n & Make orqali murakkab tizim integratsiyalari",
        "CRM & Telegram botlarni sun'iy intellektga ulash",
        "Python orqali avtonom API boshqaruvi",
        "Mijozlarga xizmat ko'rsatishni to'liq avtomatlashtirish"
      ]
    },
    'frontend': {
      title: "Frontend Dasturlash (React / Next.js)",
      selectValue: "Frontend Dasturlash",
      badge: "Eng Talabgir",
      duration: "8 oy (Haftada 3 kun)",
      level: "Noldan professionalgacha",
      desc: "Interaktiv, tezkor va zamonaviy veb-ilovalarni yaratish: HTML, CSS, JavaScript, TypeScript, React, Next.js va Tailwind CSS asosida noldan portfoliosi bilan o'rganing.",
      topics: [
        "Zamonaviy HTML5, CSS3, Tailwind CSS & Responsive dizayn",
        "JavaScript Deep Dive (ES6+, Asinxronlik, DOM, Web API)",
        "TypeScript & Clean Code standartlari",
        "React.js (Custom Hooks, Context, State Management)",
        "Next.js 15 (App Router, Server Components, SSR, SEO)",
        "Git, GitHub va Productionga joylash (Vercel, Netlify)"
      ]
    },
    'backend': {
      title: "Backend Dasturlash (Go / Python)",
      selectValue: "Backend Dasturlash",
      badge: "Yuqori Maosh",
      duration: "9 oy (Haftada 3 kun)",
      level: "Noldan professionalgacha",
      desc: "Katta yuklamali mikroservislar, ma'lumotlar ombori, xavfsiz REST va gRPC API'lar hamda bulutli serverlar arxitekturasini noldan o'rganasiz.",
      topics: [
        "Go (Golang) / Python sintaksisi va algoritmlar",
        "PostgreSQL, Redis va ma'lumotlar bazasi optimallashuvi",
        "RESTful API & gRPC arxitekturasi",
        "Docker, Docker-compose va Containerization",
        "Mikroservislar va Message Brokers (RabbitMQ/Kafka)",
        "CI/CD va Linux serverlarni boshqarish"
      ]
    },
    'mobile': {
      title: "Mobile Dasturlash (Flutter)",
      selectValue: "Mobile Dasturlash",
      badge: "Kross-platforma",
      duration: "7 oy (Haftada 3 kun)",
      level: "Noldan professionalgacha",
      desc: "Yagona kod bazasi orqali iOS va Android qurilmalari uchun chiroyli, tezkor va xavfsiz mobil ilovalar yaratish kursi.",
      topics: [
        "Dart dasturlash tili va OOP printsiplari",
        "Flutter Widgets, Responsive dizayn va animatsiyalar",
        "State Management (Bloc, Cubit, Provider)",
        "REST API, Firebase va Mahalliy ma'lumotlar ombori",
        "App Store va Google Play'ga chiqarish jarayoni"
      ]
    },
    'graphic': {
      title: "Grafik Dizayn & Brending",
      selectValue: "Grafik Dizayn",
      badge: "Ijodiy Kasb",
      duration: "6 oy (Haftada 3 kun)",
      level: "Noldan boshlovchilar uchun",
      desc: "Kuchli vizual kontent yaratish, logotip, brend aydentikasi, ijtimoiy tarmoqlar bannerlari va qadoq dizayni bo'yicha amaliy portfolio yaratasiz.",
      topics: [
        "Kompozitsiya, ranglar psixologiyasi va tipografika",
        "Adobe Photoshop mukammal darajada",
        "Adobe Illustrator & Vektor grafikasi",
        "Brend aydentikasi va Brandbook yaratish",
        "Tijoriy buyurtmalar bilan ishlash va mijoz topish"
      ]
    },
    'uiux': {
      title: "UI/UX Dizayn",
      selectValue: "UI/UX Dizayn",
      badge: "Global Talab",
      duration: "6 oy (Haftada 3 kun)",
      level: "Noldan boshlovchilar uchun",
      desc: "Foydalanuvchilar uchun qulay, estetik va intuitiv mobil ilovalar hamda veb-saytlar interfeyslarini yaratish, tadqiqot o'tkazish va Figma'da dizayn tizimlari qurish.",
      topics: [
        "UX Research, Personalar va User Flow xaritalari",
        "Figma (Auto-layout, Components, Variants, Variables)",
        "Dizayn tizimlari (Design Systems) qurish",
        "Interaktiv prototiplash va Micro-interactions",
        "UX audit va Usability testing o'tkazish"
      ]
    },
    'foundation': {
      title: "Dasturlash Foundation (IT Start)",
      selectValue: "Dasturlash Foundation",
      badge: "Ilk Qadam",
      duration: "3 oy (Haftada 3 kun)",
      level: "Mutlaqo noldan",
      desc: "Dasturlash olamiga ilk mustahkam qadam. Algoritmik fikrlash, kompyuter arxitekturasi va mantiqiy tuzilmalarni o'rganib, asosiy yo'nalishni to'g'ri tanlaysiz.",
      topics: [
        "Kompyuter arxitekturasi va operatsion tizimlar",
        "Algoritmlar va mantiqiy masalalar yechish",
        "C va Python tillari orqali asosiy tushunchalar",
        "Git va jamoada ishlash vositalari",
        "Keyingi yo'nalishni tanlash bo'yicha mentorlik"
      ]
    },
    'cyber': {
      title: "Kiberxavfsizlik (Cybersecurity)",
      selectValue: "Kiberxavfsizlik",
      badge: "Xavfsizlik",
      duration: "8 oy (Haftada 3 kun)",
      level: "O'rta daraja",
      desc: "Tizimlarni kiberhujumlardan himoyalash, zaifliklarni aniqlash (Penetration Testing), tarmoq xavfsizligi va axborot himoyasi bo'yicha professional ta'lim.",
      topics: [
        "Linux OS boshqaruvi va Bash scripting",
        "Kompyuter tarmoqlari (TCP/IP, DNS, Routing)",
        "Axborot xavfsizligi asoslari va kriptografiya",
        "Veb va tizim zaifliklarini skanerlash (OWASP Top 10)",
        "Ethical Hacking va xavfsizlik auditi"
      ]
    },
    'marketing': {
      title: "Raqamli Marketing & SMM",
      selectValue: "Raqamli Marketing",
      badge: "Tez Natija",
      duration: "5 oy (Haftada 3 kun)",
      level: "Boshlang'ichdan professionalgacha",
      desc: "Target reklama, kontent strategiya, sotuv voronkalari, analitika va zamonaviy brendlarni ijtimoiy tarmoqlarda o'stirish sirlari.",
      topics: [
        "Target reklama (Meta Ads Manager professional darajada)",
        "Kontent marketing, Reels va Kopirayting",
        "Sotuv voronkalari (Sales Funnels) va konversiya",
        "Google Analytics va metrikalarni o'lchash",
        "Influencer marketing va byudjetni boshqarish"
      ]
    }
  };

  const detailButtons = document.querySelectorAll('.view-detail-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseKey = btn.getAttribute('data-course-key');
      const data = courseDetails[courseKey];
      if (data && modalOverlay) {
        modalTitle.textContent = data.title;
        modalBadge.textContent = data.badge;
        modalDuration.textContent = data.duration;
        modalLevel.textContent = data.level;
        modalDesc.textContent = data.desc;

        modalTopics.innerHTML = '';
        data.topics.forEach(topic => {
          const li = document.createElement('li');
          li.className = "flex items-start gap-2.5 text-slate-300 text-sm";
          li.innerHTML = `<span class="text-[#00F0FF] font-bold mt-0.5">⚡</span> <span>${topic}</span>`;
          modalTopics.appendChild(li);
        });

        // Set the exact select value for the modal enroll button
        modalEnrollBtn.setAttribute('data-course', data.selectValue);
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (modalEnrollBtn) {
    modalEnrollBtn.addEventListener('click', () => {
      const courseName = modalEnrollBtn.getAttribute('data-course');
      if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      selectCourseAndScroll(courseName);
    });
  }

  // 8. Phone Input Mask (+998 XX XXX XX XX)
  const phoneInput = document.getElementById('userPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (!x[1]) {
        e.target.value = '+998 ';
        return;
      }
      if (x[1] !== '998') {
        x[1] = '998';
      }
      e.target.value = !x[2] ? `+${x[1]} ` : `+${x[1]} (${x[2]}) ` + (x[3] ? `${x[3]}` : '') + (x[4] ? `-${x[4]}` : '') + (x[5] ? `-${x[5]}` : '');
    });

    phoneInput.addEventListener('focus', (e) => {
      if (!e.target.value) {
        e.target.value = '+998 ';
      }
    });
  }

  // 9. Cyber Toast Notification for Errors
  function showCyberToast(msg) {
    let toast = document.getElementById('cyberToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cyberToast';
      toast.className = 'fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl bg-[#090D1A] border border-[#00F0FF]/50 text-white text-xs font-mono shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center gap-3 transition-all duration-300 transform translate-y-12 opacity-0';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="text-[#00F0FF] text-base">⚠️</span> <span>${msg}</span>`;
    toast.classList.remove('translate-y-12', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-12', 'opacity-0');
    }, 4000);
  }

  // 10. Form Submission with Neon Celebration Modal
  const leadForm = document.getElementById('leadForm');
  const successModal = document.getElementById('successModal');
  const successCloseBtn = document.getElementById('successCloseBtn');
  const submittedUserName = document.getElementById('submittedUserName');
  const submitLeadBtn = document.getElementById('submitLeadBtn');

  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('userName').value.trim();
      const phone = document.getElementById('userPhone').value.trim();
      const course = document.getElementById('courseSelect').value;
      const message = document.getElementById('userMessage')?.value?.trim() || '';

      if (!name) {
        showCyberToast("Iltimos, ism va familiyangizni kiriting!");
        document.getElementById('userName').focus();
        return;
      }
      if (phone.length < 17) {
        showCyberToast("Iltimos, to'liq telefon raqamingizni kiriting: +998 (__) ___-__-__");
        document.getElementById('userPhone').focus();
        return;
      }
      if (!course) {
        showCyberToast("Iltimos, qiziqqan kursingizni tanlang!");
        document.getElementById('courseSelect').focus();
        return;
      }

      // Tugmani yuklanish holatiga o'tkazish
      const originalBtnHtml = submitLeadBtn ? submitLeadBtn.innerHTML : '';
      if (submitLeadBtn) {
        submitLeadBtn.disabled = true;
        submitLeadBtn.innerHTML = `
          <span>Yuborilmoqda...</span>
          <svg class="animate-spin w-4 h-4 text-[#00F0FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        `;
      }

      try {
        // Backend /api/send-lead endpointiga so'rov yuborish
        const response = await fetch('/api/send-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            phone,
            course,
            message
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Mahalliy zaxira sifatida saqlash
          try {
            const storedLeads = JSON.parse(localStorage.getItem('najot_talim_leads') || '[]');
            storedLeads.push({
              name,
              phone,
              course,
              message,
              timestamp: new Date().toISOString()
            });
            localStorage.setItem('najot_talim_leads', JSON.stringify(storedLeads));
          } catch (err) {
            console.warn('LocalStorage access note:', err);
          }

          if (submittedUserName) {
            submittedUserName.textContent = name;
          }

          if (successModal) {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }

          leadForm.reset();
        } else {
          // Serverdan qaytgan xatolik xabari (.env kiritilmagan yoki Telegram xatosi)
          showCyberToast(data.message || "Xatolik yuz berdi. Qaytadan urinib ko'ring.");
        }
      } catch (networkError) {
        console.error("So'rov yuborishda tarmoq xatoligi:", networkError);
        showCyberToast("Server bilan bog'lanishda xatolik yuz berdi. Iltimos, server ishlayotganini tekshiring.");
      } finally {
        // Tugmani dastlabki holatiga qaytarish
        if (submitLeadBtn) {
          submitLeadBtn.disabled = false;
          submitLeadBtn.innerHTML = originalBtnHtml;
          if (window.lucide) {
            lucide.createIcons();
          }
        }
      }
    });
  }

  if (successCloseBtn && successModal) {
    successCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 11. FAQ Accordion Toggle
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180', 'text-[#00F0FF]'));

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) {
          icon.classList.add('rotate-180', 'text-[#00F0FF]');
        }
      }
    });
  });

  // 12. Floating Back To Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 13. Global Keyboard Escape Key Handler for Accessibility
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (successModal && successModal.classList.contains('active')) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu(false);
      }
    }
  });
});
