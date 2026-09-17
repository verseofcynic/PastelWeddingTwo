(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const data = weddingData;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    applyTheme();
    populateStaticData();
    renderStory();
    renderEvents();
    renderGallery();
    setupOpening();
    setupMusic();
    setupCountdown();
    setupCalendar();
    setupLightbox();
    setupScrollReveal();
    setupNavHash();
    document.title = `${data.couple.bride} & ${data.couple.groom} · Wedding Invitation`;

    setTimeout(() => $("#preloader")?.classList.add("is-hidden"), 500);
  }

  function applyTheme() {
    const root = document.documentElement;
    Object.entries(data.theme || {}).forEach(([key, value]) => {
      const map = {
        primaryColor: "--olive",
        secondaryColor: "--sage",
        paperColor: "--paper",
        textColor: "--ink",
        accentColor: "--gold"
      };
      if (map[key]) root.style.setProperty(map[key], value);
    });
  }

  function setText(selector, value) {
    $$(selector).forEach(el => el.textContent = value ?? "");
  }

  function populateStaticData() {
    setText("[data-bride]", data.couple.bride);
    setText("[data-groom]", data.couple.groom);
    setText("[data-initials]", data.couple.initials);
    setText("[data-display-date]", data.wedding.displayDate);
    setText("[data-day]", data.wedding.day);
    setText("[data-day-number]", parseInt(data.wedding.date.slice(8, 10), 10));
    setText("[data-month-year]", formatMonthYear(data.wedding.date));
    setText("[data-time]", data.wedding.time);
    setText("[data-opening-kicker]", data.invitation.openingKicker);
    setText("[data-invitation-heading]", data.invitation.heading);
    setText("[data-invitation-message]", data.invitation.message);
    setText("[data-story-intro]", data.invitation.storyIntro);
    setText("[data-venue-name]", data.venue.name);
    setText("[data-venue-address]", data.venue.address);
    setText("[data-rsvp-message]", data.rsvp.message);

    $("#mainPhoto").src = data.gallery?.[0] || "assets/images/couple-main.svg";
    $("#mainPhoto").alt = `${data.couple.bride} and ${data.couple.groom}`;

    const map = $("#mapButton");
    if (map) map.href = data.venue.mapUrl || "#";

    $("#brideParents").innerHTML = (data.families?.brideParents || []).map(escapeHTML).join("<br>");
    $("#groomParents").innerHTML = (data.families?.groomParents || []).map(escapeHTML).join("<br>");

    const rsvpButton = $("#rsvpButton");
    const whatsappButton = $("#whatsappButton");
    if (!data.rsvp?.enabled) {
      $("#rsvp")?.setAttribute("hidden", "");
    } else {
      rsvpButton.href = data.rsvp.url || "#";
      const number = (data.rsvp.whatsappNumber || "").replace(/[^\d]/g, "");
      const message = encodeURIComponent(data.rsvp.whatsappMessage || "Hi! I would like to RSVP.");
      if (number) whatsappButton.href = `https://wa.me/${number}?text=${message}`;
      else whatsappButton.hidden = true;
    }

    const qrSection = $("#qrSection");
    if (data.qr?.enabled && data.qr.image) {
      qrSection.hidden = false;
      $("#qrImage").src = data.qr.image;
    }
  }

  function renderStory() {
    const target = $("#storyTimeline");
    target.innerHTML = "";
    (data.storyTimeline || []).forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "timeline-item reveal";
      article.style.setProperty("--delay", `${index * 80}ms`);
      article.innerHTML = `
        <div class="timeline-dot">✦</div>
        <div class="timeline-year">${escapeHTML(item.date)}</div>
        <div class="timeline-card">
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description)}</p>
        </div>`;
      target.appendChild(article);
    });
  }

  function renderEvents() {
    const target = $("#eventsGrid");
    target.innerHTML = "";
    (data.events || []).forEach((event, index) => {
      const card = document.createElement("article");
      card.className = "event-card reveal";
      card.style.setProperty("--delay", `${index * 80}ms`);
      const icon = iconFor(event.icon);
      card.innerHTML = `
        <div class="event-icon">${icon}</div>
        <p class="event-number">0${index + 1}</p>
        <h3>${escapeHTML(event.title)}</h3>
        <div class="event-rule"></div>
        <p class="event-date">${escapeHTML(event.date)}</p>
        <p class="event-time">${escapeHTML(event.time)}</p>
        <p class="event-venue">${escapeHTML(event.venue)}</p>
        <p class="event-address">${escapeHTML(event.address)}</p>
        <a class="text-link" href="${safeUrl(event.mapUrl || data.venue.mapUrl)}" target="_blank" rel="noopener">View Location <span>↗</span></a>`;
      target.appendChild(card);
    });
  }

  function renderGallery() {
    const target = $("#galleryGrid");
    target.innerHTML = "";
    const photos = data.gallery || [];
    photos.forEach((src, index) => {
      const button = document.createElement("button");
      button.className = `gallery-item gallery-${(index % 5) + 1} reveal`;
      button.type = "button";
      button.style.setProperty("--delay", `${index * 60}ms`);
      button.innerHTML = `<img src="${escapeAttr(src)}" alt="${escapeAttr(`${data.couple.bride} and ${data.couple.groom} photo ${index + 1}`)}" loading="lazy"><span class="gallery-hover">View</span>`;
      button.addEventListener("click", () => openLightbox(index));
      target.appendChild(button);
    });
  }

function setupOpening() {
  const opening = $("#opening");
  const main = $("#mainContent");
  const button = $("#openInvitation");
  const seal = $("#waxSeal");

  if (!opening || !main) return;

  let openingStarted = false;

  function openInvitation() {
    if (openingStarted) return;
    openingStarted = true;

    // Prevent another click while animation is running
    if (button) button.disabled = true;
    if (seal) seal.disabled = true;

    // Start envelope animation
    opening.classList.add("opening-active");

    // Keep page locked while envelope opens
    document.body.classList.add("no-scroll");

    /*
     * Timeline:
     * 0.0s  - wax seal starts breaking/fading
     * 0.2s  - envelope flap begins opening
     * 0.6s  - invitation card rises
     * 1.7s  - opening screen disappears
     */
    setTimeout(() => {
      opening.classList.add("closing");
    }, 950);

    setTimeout(() => {
      opening.hidden = true;

      main.hidden = false;

      document.body.classList.remove("no-scroll");
      document.body.classList.add("invitation-open");

      // Music control
      $("#musicToggle").hidden = !data.music?.enabled;

      // Always return to the top of the wedding page
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });

      // Try autoplay after user interaction
      if (data.music?.enabled) {
        tryPlayMusic();
      }

    }, 1750);
  }

  // Wax seal click
  if (seal) {
    seal.addEventListener("click", openInvitation);
  }

  // Existing "Open Invitation" button
  if (button) {
    button.addEventListener("click", openInvitation);
  }

  // Also allow pressing Enter/Space when the opening dialog has focus
  opening.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      openInvitation();
    }
  });
}

  function setupMusic() {
    const audio = $("#weddingMusic");
    const toggle = $("#musicToggle");
    if (!data.music?.enabled) {
      toggle.hidden = true;
      return;
    }
    audio.src = data.music.file;
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      if (audio.paused) tryPlayMusic();
      else pauseMusic();
    });
    audio.addEventListener("play", () => {
      toggle.classList.add("playing");
      toggle.setAttribute("aria-pressed", "true");
      toggle.setAttribute("aria-label", "Pause wedding music");
    });
    audio.addEventListener("pause", () => {
      toggle.classList.remove("playing");
      toggle.setAttribute("aria-pressed", "false");
      toggle.setAttribute("aria-label", "Play wedding music");
    });
  }

  function tryPlayMusic() {
    const audio = $("#weddingMusic");
    audio.play().catch(() => {});
  }

  function pauseMusic() {
    $("#weddingMusic").pause();
  }

  function setupCountdown() {
    const target = new Date(data.wedding.date).getTime();
    const units = {
      days: $('[data-unit="days"]'),
      hours: $('[data-unit="hours"]'),
      minutes: $('[data-unit="minutes"]'),
      seconds: $('[data-unit="seconds"]')
    };
    const message = $("#countdownMessage");

    function update() {
      const diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      units.days.textContent = String(days).padStart(2, "0");
      units.hours.textContent = String(hours).padStart(2, "0");
      units.minutes.textContent = String(minutes).padStart(2, "0");
      units.seconds.textContent = String(seconds).padStart(2, "0");

      if (Date.now() >= target) {
        message.textContent = "Today is the day — let the celebration begin!";
      }
    }

    update();
    setInterval(update, 1000);
  }

  function setupCalendar() {
    $("#calendarButton").addEventListener("click", () => {
      const start = new Date(data.wedding.date);
      const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
      const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Digital Wedding Invitation//EN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@wedding-invitation`,
        `DTSTAMP:${icsDate(new Date())}`,
        `DTSTART:${icsDate(start)}`,
        `DTEND:${icsDate(end)}`,
        `SUMMARY:${data.couple.bride} & ${data.couple.groom} — Wedding`,
        `LOCATION:${data.venue.name}, ${data.venue.address}`,
        `DESCRIPTION:${data.invitation.message}`,
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slugify(data.couple.bride)}-${slugify(data.couple.groom)}-wedding.ics`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  let currentGalleryIndex = 0;
  let touchStartX = 0;

  function setupLightbox() {
    $("#lightboxClose").addEventListener("click", closeLightbox);
    $("#lightboxPrev").addEventListener("click", () => changeLightbox(-1));
    $("#lightboxNext").addEventListener("click", () => changeLightbox(1));
    $("#lightbox").addEventListener("click", e => {
      if (e.target.id === "lightbox") closeLightbox();
    });
    document.addEventListener("keydown", e => {
      if ($("#lightbox").hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") changeLightbox(-1);
      if (e.key === "ArrowRight") changeLightbox(1);
    });
    $("#lightbox").addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX, { passive: true });
    $("#lightbox").addEventListener("touchend", e => {
      const delta = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(delta) > 45) changeLightbox(delta > 0 ? -1 : 1);
    }, { passive: true });
  }

  function openLightbox(index) {
    currentGalleryIndex = index;
    updateLightbox();
    $("#lightbox").hidden = false;
    document.body.classList.add("no-scroll");
  }

  function updateLightbox() {
    const src = data.gallery[currentGalleryIndex];
    const image = $("#lightboxImage");
    image.src = src;
    image.alt = `${data.couple.bride} and ${data.couple.groom} photo ${currentGalleryIndex + 1}`;
  }

  function changeLightbox(direction) {
    const count = data.gallery.length;
    currentGalleryIndex = (currentGalleryIndex + direction + count) % count;
    updateLightbox();
  }

  function closeLightbox() {
    $("#lightbox").hidden = true;
    document.body.classList.remove("no-scroll");
  }

  function setupScrollReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

    $$(".reveal").forEach(el => observer.observe(el));
  }

  function setupNavHash() {
    // Prevent abrupt jump when landing on an internal hash.
    document.documentElement.style.scrollBehavior = "smooth";
  }

  function iconFor(type) {
    const icons = {
      ring: "◌",
      heart: "♡",
      glass: "◡"
    };
    return icons[type] || "✦";
  }

  function formatMonthYear(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }

  function icsDate(date) {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  }

  function slugify(value) {
    return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function safeUrl(value) {
    try {
      const url = new URL(value, window.location.href);
      if (["http:", "https:"].includes(url.protocol)) return url.href;
    } catch {}
    return "#";
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[c]));
  }

  function escapeAttr(value) {
    return escapeHTML(value);
  }
})();
