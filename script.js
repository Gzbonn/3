/* ═══════════════════════════════════
   TheStreetBarberShop – script.js
══════════════════════════════════ */

// ── Smooth scroll with custom easing ──
function smoothScrollTo(element) {
  const start = window.scrollY;
  const target = element.getBoundingClientRect().top + window.scrollY;
  const distance = target - start;
  const duration = 1000; // 1 second for smooth scrolling
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function scroll(currentTime) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, start + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

document.querySelectorAll('a[href^="#"], [data-scroll]').forEach((el) => {
  el.addEventListener("click", (e) => {
    const targetId = el.getAttribute("href")?.startsWith("#")
      ? el.getAttribute("href")
      : el.getAttribute("data-scroll");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      smoothScrollTo(target);
    }
  });
});

// ── Mobile nav ──
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav__toggle");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => nav.classList.toggle("nav--open"));
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) nav.classList.remove("nav--open");
  });
  // Close nav on link click
  nav.querySelectorAll(".nav__links a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("nav--open"))
  );
}

// ── Scroll reveal ──
const revealEls = document.querySelectorAll(
  ".section, .service-card, .gallery__item, .booking, .about__stat, .map-card, .courses__modules li, .booking__info li"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

revealEls.forEach((el, i) => {
  el.classList.add("reveal");
  // Stagger service cards and gallery items
  if (el.classList.contains("service-card") || el.classList.contains("gallery__item")) {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  }
  revealObserver.observe(el);
});

// ── Translations ──
let currentLang = "ro";

const translations = {
  ro: {
    nav_about: "Despre",
    nav_services: "Servicii",
    nav_courses: "Cursuri",
    nav_gallery: "Galerie",
    nav_booking: "Programări",
    nav_contact: "Contact",

    hero_kicker: "Tunsori fresh. Energie de stradă.",
    hero_subtitle: "Tunsori urbane, contururi precise și vibe de cartier. Intri relaxat, ieși legendar.",
    hero_cta_primary: "Programează-te online",
    hero_cta_secondary: "Vezi serviciile",
    hero_hours_label: "Program",
    hero_hours_value: "Lun–Dum · 09:00 – 19:30",
    hero_location_label: "Locație",
    hero_location_value: "STR. ALBA IULIA 184/4",
    hero_scroll: "Derulează pentru programare",
    hero_stat_years: "Ani exp.",

    about_tag: "Despre barber shop",
    about_title: "Cultura de stradă se întâlnește cu barbering clasic.",
    about_p1: 'La <strong>TheStreetBarberShop</strong> combinăm meșteșugul vechi cu energia nouă. Fade-uri precise, bărbierit cu brici și stiluri care arată bine și la birou, și pe stradă.',
    about_p2: "Pereți plini de graffiti, hip‑hop în boxe și scaune pregătite de povești. Fără grabă, fără presiune — doar tunsori curate și vibe bun.",
    about_stat1: "Ani pe stradă",
    about_stat3: "Rating mediu clienți",

    services_tag: "Servicii",
    services_title: "Tunsori pe ritmul tău.",
    services_subtitle: "De la skin fade la tunsori clasice, păstrăm totul simplu, clar și transparent.",
    service1_title: "Street Fade",
    service1_desc: "Fade curat, contur precis, styling la final. Perfect pentru un look proaspăt.",
    service1_item1: "Mașină + foarfecă",
    service1_item2: "Contur & styling",
    service1_item3: "15–30 min",
    service2_title: "Beard Game",
    service2_desc: "Definim, conturăm și aranjăm barba cu precizie de brici.",
    service2_item1: "Prosop fierbinte",
    service2_item2: "Detalii la brici",
    service2_item3: "15–20 min",
    service3_title: "Full Street Package",
    service3_desc: "Tuns + barbă + styling. Pleci gata de poze.",
    service3_item1: "Consultație inclusă",
    service3_item2: "Produs de finisare",
    service3_item3: "30–45 min",
    service3_cta: "Programează pachetul",
    service3_badge: "Popular",
    service_book: "Programează",

    gallery_tag: "Galerie",
    gallery_title: "Tunsori, fade-uri & vibe de graffiti.",
    gallery_item1: "High fade",
    gallery_item2: "Perete graffiti",
    gallery_item3: "Bărbierit clasic",
    gallery_item4: "Scaun de stradă",

    booking_tag: "Programări online",
    booking_title: "Rezervă-ți locul în scaun.",
    booking_text: "Alege data, ora și serviciul, iar noi îți păstrăm locul. Fără mesaje în plus, fără așteptat la coadă.",
    booking_bullet1: "✓ Confirmare instant pe e‑mail",
    booking_bullet2: "Calendar cu zile și ore disponibile",
    booking_bullet3: "Poți selecta și barberul preferat",
    booking_name_label: "Nume",
    booking_name_placeholder: "Numele tău",
    booking_phone_label: "Telefon",
    booking_phone_placeholder: "+373 ...",
    booking_email_label: "Email",
    booking_email_placeholder: "email@exemplu.com",
    booking_service_label: "Serviciu",
    booking_service_placeholder: "Alege serviciul",
    booking_service1: "Street Fade",
    booking_service2: "Beard Game",
    booking_service3: "Full Street Package",
    booking_barber_label: "Barber",
    booking_barber_any: "Orice barber",
    booking_time_label: "Ora",
    booking_time_placeholder: "Alege ora",
    booking_hint: "Alege o dată din calendar pentru a vedea orele disponibile.",
    booking_notes_label: "Note (opțional)",
    booking_notes_placeholder: "Nivelul fade-ului, stilul de barbă, orice e important.",
    booking_submit: "Confirmă programarea",

    courses_tag: "Cursuri de barber de la 0",
    courses_title: "Învață meseria de barber de stradă, pas cu pas.",
    courses_p1: "Ai zero experiență, dar vrei să intri în lumea barbering-ului? La TheStreetBarberShop îți arătăm exact cum se fac fade-urile, contururile și stilurile care se poartă pe stradă.",
    courses_p2: "Lucrezi direct pe modele, în shop-ul nostru din Chișinău, alături de Daniel, David și Mihai.",
    courses_bullet1: "Bază — igienă, instrumente, tipuri de păr",
    courses_bullet2: "Fade-uri, tunsori moderne, barbă",
    courses_bullet3: "Work in shop + mindset de street barber",
    courses_name_label: "Nume",
    courses_name_placeholder: "Numele tău",
    courses_email_label: "Email",
    courses_email_placeholder: "email@exemplu.com",
    courses_experience_label: "Experiență (dacă ai)",
    courses_experience_placeholder: "Spune-ne dacă ai mai tuns sau de ce vrei să devii barber.",
    courses_submit: "Trimite cerere pentru curs",

    contact_tag: "Contact & locație",
    contact_title: "Vino la noi sau scrie-ne.",
    contact_text: "Suntem în Chișinău, STR. ALBA IULIA 184/4.",
    contact_address_label: "Adresă",
    contact_phone_label: "Telefon",
    contact_email_label: "Email",
    contact_hours_label: "Program",
    contact_hours_value: "Luni – Duminică: 09:00 – 19:30",

    map_tag: "Hartă",
    map_note: "Deschide în Google Maps →",

    footer_tagline: "Rămâi fresh. Rămâi street.",
    footer_top: "Înapoi sus ↑",

    booking_error_no_date: "Te rugăm să alegi o dată din calendar.",
    booking_error_required: "Te rugăm să completezi toate câmpurile obligatorii.",
    booking_saving: "Îți salvăm programarea…",
    booking_success: "✓ Programare confirmată! Verifică emailul pentru confirmare.",
    booking_server_error: "A apărut o eroare. Încearcă din nou sau sună-ne.",

    course_saving: "Trimitem cererea ta…",
    course_success: "✓ Cererea a fost trimisă! Te vom contacta pe email cu detalii.",
    course_error: "Te rugăm să completezi numele și emailul.",
    course_server_error: "A apărut o eroare. Încearcă din nou.",

    calendar_day_names: ["L", "Ma", "Mi", "J", "V", "S", "D"],
  },
  ru: {
    nav_about: "О нас",
    nav_services: "Услуги",
    nav_courses: "Курсы",
    nav_gallery: "Галерея",
    nav_booking: "Запись",
    nav_contact: "Контакты",

    hero_kicker: "Свежие стрижки. Уличная энергия.",
    hero_subtitle: "Городские стрижки, чёткие контуры и атмосфера улицы. Заходи расслабленным — выходи легендой.",
    hero_cta_primary: "Записаться онлайн",
    hero_cta_secondary: "Посмотреть услуги",
    hero_hours_label: "Режим работы",
    hero_hours_value: "Пн–Вс · 09:00 – 19:30",
    hero_location_label: "Адрес",
    hero_location_value: "УЛ. АЛБА ЮЛИЯ 184/4",
    hero_badge_main: "Без записи",
    hero_badge_sub: "Добро пожаловать",
    hero_scroll: "Прокрутите для записи",
    hero_stat_years: "Лет опыта",

    about_tag: "О барбершопе",
    about_title: "Уличная культура встречается с классическим барберингом.",
    about_p1: "В <strong>TheStreetBarberShop</strong> мы соединяем старое мастерство с новой энергией. Чёткие фейды, бритьё опасной бритвой и стрижки, которые хорошо смотрятся и в офисе, и на улице.",
    about_p2: "Стены в граффити, хип-хоп в колонках и кресла, готовые к разговорам. Без спешки, без давления — только чистые стрижки и хорошая атмосфера.",
    about_stat1: "Лет на улице",
    about_stat3: "Средний рейтинг клиентов",

    services_tag: "Услуги",
    services_title: "Стрижки в твоём ритме.",
    services_subtitle: "От скин-фейда до классических стрижек — всё просто, чётко и прозрачно.",
    service1_title: "Street Fade",
    service1_desc: "Чистый фейд, точный контур, финальный стайлинг. Идеально для свежего образа.",
    service1_item1: "Машинка + ножницы",
    service1_item2: "Контур & стайлинг",
    service1_item3: "15–30 мин",
    service2_title: "Beard Game",
    service2_desc: "Оформляем, контурируем и укладываем бороду с точностью опасной бритвы.",
    service2_item1: "Горячее полотенце",
    service2_item2: "Детализация бритвой",
    service2_item3: "15–20 мин",
    service3_title: "Full Street Package",
    service3_desc: "Стрижка + борода + стайлинг. Выходишь готовым к фотосессии.",
    service3_item1: "Консультация включена",
    service3_item2: "Финишный продукт",
    service3_item3: "30–45 мин",
    service3_cta: "Записаться на пакет",
    service3_badge: "Популярно",
    service_book: "Записаться",

    gallery_tag: "Галерея",
    gallery_title: "Стрижки, фейды и атмосфера граффити.",
    gallery_item1: "High fade",
    gallery_item2: "Стена граффити",
    gallery_item3: "Классическое бритьё",
    gallery_item4: "Уличное кресло",

    booking_tag: "Онлайн запись",
    booking_title: "Займи своё место в кресле.",
    booking_text: "Выбери дату, время и услугу — мы сохраним твоё место. Без лишних сообщений, без очередей.",
    booking_bullet1: "✓ Мгновенное подтверждение на e-mail",
    booking_bullet2: "Календарь с доступными днями и временем",
    booking_bullet3: "Можно выбрать предпочтительного барбера",
    booking_name_label: "Имя",
    booking_name_placeholder: "Ваше имя",
    booking_phone_label: "Телефон",
    booking_phone_placeholder: "+373 ...",
    booking_email_label: "Email",
    booking_email_placeholder: "email@example.com",
    booking_service_label: "Услуга",
    booking_service_placeholder: "Выберите услугу",
    booking_service1: "Street Fade",
    booking_service2: "Beard Game",
    booking_service3: "Full Street Package",
    booking_barber_label: "Барбер",
    booking_barber_any: "Любой барбер",
    booking_time_label: "Время",
    booking_time_placeholder: "Выберите время",
    booking_hint: "Выберите дату в календаре, чтобы увидеть доступное время.",
    booking_notes_label: "Примечания (по желанию)",
    booking_notes_placeholder: "Уровень фейда, стиль бороды, всё важное.",
    booking_submit: "Подтвердить запись",

    courses_tag: "Курсы барбера с нуля",
    courses_title: "Учись мастерству уличного барбера шаг за шагом.",
    courses_p1: "Ноль опыта, но хочешь войти в мир барберинга? В TheStreetBarberShop мы покажем тебе, как делаются фейды, контуры и уличные стили.",
    courses_p2: "Работаешь напрямую с моделями в нашем шопе в Кишинёве, вместе с Daniel, David и Mihai.",
    courses_bullet1: "Основы — гигиена, инструменты, типы волос",
    courses_bullet2: "Фейды, современные стрижки, борода",
    courses_bullet3: "Работа в шопе + mindset уличного барбера",
    courses_name_label: "Имя",
    courses_name_placeholder: "Ваше имя",
    courses_email_label: "Email",
    courses_email_placeholder: "email@example.com",
    courses_experience_label: "Опыт (если есть)",
    courses_experience_placeholder: "Расскажите, стригли ли вы раньше или почему хотите стать барбером.",
    courses_submit: "Отправить заявку на курс",

    contact_tag: "Контакты & местоположение",
    contact_title: "Приходи к нам или напиши.",
    contact_text: "Мы в Кишинёве, УЛ. АЛБА ЮЛИЯ 184/4.",
    contact_address_label: "Адрес",
    contact_phone_label: "Телефон",
    contact_email_label: "Email",
    contact_hours_label: "Режим работы",
    contact_hours_value: "Пн – Вс: 09:00 – 19:30",

    map_tag: "Карта",
    map_note: "Открыть в Google Maps →",

    footer_tagline: "Оставайся свежим. Оставайся уличным.",
    footer_top: "Наверх ↑",

    booking_error_no_date: "Пожалуйста, выберите дату в календаре.",
    booking_error_required: "Пожалуйста, заполните все обязательные поля.",
    booking_saving: "Сохраняем вашу запись…",
    booking_success: "✓ Запись подтверждена! Проверьте email для подтверждения.",
    booking_server_error: "Произошла ошибка. Попробуйте ещё раз или позвоните нам.",

    course_saving: "Отправляем вашу заявку…",
    course_success: "✓ Заявка отправлена! Мы свяжемся с вами по email.",
    course_error: "Пожалуйста, заполните имя и email.",
    course_server_error: "Произошла ошибка. Попробуйте ещё раз.",

    calendar_day_names: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  },
};

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = t(el.getAttribute("data-i18n"));
    if (val.includes("<")) el.innerHTML = val;
    else el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
  document.querySelectorAll("[data-i18n-option]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n-option"));
  });
  document.documentElement.lang = currentLang === "ro" ? "ro" : "ru";
}

// ── Language buttons ──
const langButtons = document.querySelectorAll(".nav__lang-btn");

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    if (!lang || lang === currentLang) return;
    currentLang = lang;
    langButtons.forEach((b) =>
      b.classList.toggle("nav__lang-btn--active", b.getAttribute("data-lang") === currentLang)
    );
    applyTranslations();
    renderCalendar();
    if (selectedDateInput?.value) renderTimeSlots(new Date(selectedDateInput.value + "T12:00:00"));
  });
});

// ── Calendar ──
const calendarMonthEl = document.getElementById("calendarMonth");
const calendarGridEl = document.getElementById("calendarGrid");
const timeSelectEl = document.getElementById("timeSelect");
const selectedDateInput = document.getElementById("selectedDate");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let calendarDate = new Date();
calendarDate.setDate(1);

function formatMonthYear(date) {
  const locale = currentLang === "ro" ? "ro-RO" : "ru-RU";
  return date.toLocaleString(locale, { month: "long", year: "numeric" });
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function generateTimeSlots(date) {
  const times = [];
  const openHour = 9;
  const closeHour = 19;
  for (let h = openHour; h < closeHour; h++) {
    ["00", "30"].forEach((m) => times.push(`${String(h).padStart(2, "0")}:${m}`));
  }
  // Simulate some busy slots (every 5th)
  return times.filter((_, i) => i % 5 !== 2);
}

function renderTimeSlots(date) {
  if (!timeSelectEl) return;
  const slots = generateTimeSlots(date);
  timeSelectEl.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = t("booking_time_placeholder");
  timeSelectEl.appendChild(placeholder);
  slots.forEach((time) => {
    const opt = document.createElement("option");
    opt.value = time;
    opt.textContent = time;
    timeSelectEl.appendChild(opt);
  });
}

function renderCalendar() {
  if (!calendarMonthEl || !calendarGridEl) return;
  calendarMonthEl.textContent = formatMonthYear(calendarDate);
  calendarGridEl.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayNames = translations[currentLang].calendar_day_names;
  const currentSelected = selectedDateInput?.value
    ? new Date(selectedDateInput.value + "T12:00:00")
    : null;

  dayNames.forEach((name) => {
    const el = document.createElement("div");
    el.textContent = name;
    el.className = "booking__day booking__day--name";
    calendarGridEl.appendChild(el);
  });

  for (let i = 0; i < startDay; i++) {
    const el = document.createElement("div");
    el.className = "booking__day booking__day--empty";
    calendarGridEl.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = d;
    btn.className = "booking__day";

    if (date < today) {
      btn.classList.add("booking__day--past");
      btn.disabled = true;
    } else {
      btn.classList.add("booking__day--selectable");
      if (isSameDay(date, today)) btn.classList.add("booking__day--today");
      if (currentSelected && isSameDay(date, currentSelected)) btn.classList.add("booking__day--selected");

      btn.addEventListener("click", () => {
        selectedDateInput.value = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        renderTimeSlots(date);
        document.querySelectorAll(".booking__day--selected")
          .forEach((b) => b.classList.remove("booking__day--selected"));
        btn.classList.add("booking__day--selected");
      });
    }

    calendarGridEl.appendChild(btn);
  }
}

applyTranslations();

if (prevMonthBtn && nextMonthBtn) {
  prevMonthBtn.addEventListener("click", () => {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    renderCalendar();
  });
  nextMonthBtn.addEventListener("click", () => {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    renderCalendar();
  });
}

renderCalendar();

// ── Booking form ──
const bookingForm = document.getElementById("bookingForm");
const bookingStatus = document.getElementById("bookingStatus");
const bookingSubmit = document.getElementById("bookingSubmit");

function setBookingStatus(msg, type) {
  bookingStatus.textContent = msg;
  bookingStatus.className = `booking__status ${type ? `booking__status--${type}` : ""}`;
  
  // Show the message with animation
  bookingStatus.classList.add("show");
  
  // Auto-hide success message after 5 seconds
  if (type === "success") {
    setTimeout(() => {
      bookingStatus.classList.remove("show");
      // Clear content after animation
      setTimeout(() => {
        bookingStatus.textContent = "";
        bookingStatus.className = "booking__status";
      }, 400);
    }, 5000);
  }
}

if (bookingForm && bookingStatus) {
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(bookingForm);
    const payload = {
      name: (fd.get("name") || "").trim(),
      phone: (fd.get("phone") || "").trim(),
      email: (fd.get("email") || "").trim(),
      service: fd.get("service") || "",
      barber: fd.get("barber") || "",
      time: fd.get("time") || "",
      date: selectedDateInput?.value || "",
      notes: (fd.get("notes") || "").trim(),
      lang: currentLang,
    };

    if (!payload.name || !payload.phone || !payload.email || !payload.service) {
      setBookingStatus(t("booking_error_required"), "error");
      return;
    }

    if (!payload.date) {
      setBookingStatus(t("booking_error_no_date"), "error");
      return;
    }

    if (!payload.time) {
      setBookingStatus(currentLang === "ro" ? "Te rugăm să alegi o oră." : "Пожалуйста, выберите время.", "error");
      return;
    }

    // Loading state
    bookingSubmit.classList.add("btn--loading");
    bookingSubmit.disabled = true;
    setBookingStatus(t("booking_saving"), "");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message || "Server error");

      setBookingStatus(t("booking_success"), "success");
      bookingForm.reset();
      if (selectedDateInput) selectedDateInput.value = "";
      if (timeSelectEl) {
        timeSelectEl.innerHTML = `<option value="">${t("booking_time_placeholder")}</option>`;
      }
      document.querySelectorAll(".booking__day--selected")
        .forEach((b) => b.classList.remove("booking__day--selected"));

    } catch (err) {
      console.error("Booking error:", err);
      setBookingStatus(t("booking_server_error"), "error");
    } finally {
      bookingSubmit.classList.remove("btn--loading");
      bookingSubmit.disabled = false;
    }
  });
}

// ── Course form ──
const courseForm = document.getElementById("courseForm");
const courseStatus = document.getElementById("courseStatus");

if (courseForm && courseStatus) {
  courseForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(courseForm);
    const payload = {
      name: (fd.get("name") || "").trim(),
      email: (fd.get("email") || "").trim(),
      experience: (fd.get("experience") || "").trim(),
      lang: currentLang,
    };

    if (!payload.name || !payload.email) {
      courseStatus.textContent = t("course_error");
      courseStatus.className = "booking__status booking__status--error";
      return;
    }

    const submitBtn = courseForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    courseStatus.textContent = t("course_saving");
    courseStatus.className = "booking__status";

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error();
      courseStatus.textContent = t("course_success");
      courseStatus.className = "booking__status booking__status--success";
      courseForm.reset();
    } catch {
      courseStatus.textContent = t("course_server_error");
      courseStatus.className = "booking__status booking__status--error";
    } finally {
      submitBtn.disabled = false;
    }
  });
}

// ── Footer year ──
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
