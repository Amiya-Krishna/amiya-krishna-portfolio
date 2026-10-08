/* ──────────────────────────────────────────
   CANVAS PARTICLE BACKGROUND
────────────────────────────────────────── */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ──────────────────────────────────────────
   SCROLL PROGRESS
────────────────────────────────────────── */
const bar = document.getElementById("scroll-bar");
window.addEventListener("scroll", () => {
  const h = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / h) * 100 + "%";
});

/* ──────────────────────────────────────────
   TYPING EFFECT
────────────────────────────────────────── */
const phrases = [
  "Full Stack Developer",
  "React & Next.js Developer",
  "Node.js Backend Developer",
  "Open to Internship Opportunities",
];
let pi = 0,
  ci = 0,
  deleting = false;
const typedEl = document.getElementById("typed-text");

function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 45 : 80);
}
type();

/* ──────────────────────────────────────────
   REVEAL ON SCROLL
────────────────────────────────────────── */
const revObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("show"), 0);
      }
    });
  },
  { threshold: 0.08 },
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 6) * 0.07 + "s";
  revObs.observe(el);
});

/* ──────────────────────────────────────────
   ACTIVE NAV
────────────────────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let curr = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 200) curr = s.id;
  });
  navLinks.forEach((a) => {
    a.style.color = a.getAttribute("href") === "#" + curr ? "var(--cyan)" : "";
  });
});

/* ──────────────────────────────────────────
   MOBILE NAV TOGGLE
────────────────────────────────────────── */
document.querySelectorAll(".proj-card[role="link"]').forEach((card) => {
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.click();
    }
  });
});

const navToggle = document.getElementById("nav-toggle");
const navLinksList = document.querySelector(".nav-links");

if (navToggle && navLinksList) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinksList.classList.toggle("open");
  });

  navLinksList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("open");
      navLinksList.classList.remove("open");
    });
  });
}

/* ──────────────────────────────────────────
   THEME TOGGLE
────────────────────────────────────────── */
const themeBtn = document.getElementById("theme-toggle");
let isDark = true;
themeBtn.addEventListener("click", () => {
  isDark = !isDark;
  document.body.setAttribute("data-theme", isDark ? "dark" : "light");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
});

/* ──────────────────────────────────────────
   LIGHTBOX — full-size image viewer
────────────────────────────────────────── */
const lightboxOverlay = document.getElementById("lightbox-overlay");
const lightboxImg = document.getElementById("lightbox-img");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightboxOverlay.classList.add("open");
  resetZoom();
}

function closeLightbox(e) {
  if (
    !e ||
    e.target === lightboxOverlay ||
    e.target.closest(".lightbox-close")
  ) {
    lightboxOverlay.classList.remove("open");
    lightboxImg.src = "";
    resetZoom();
  }
}

if (lightboxOverlay && lightboxImg) {
  let scale = 1;
  let translateX = 0,
    translateY = 0;
  let isDragging = false;
  let startX, startY;
  let lastTapTime = 0;
  let lastTouchDist = null;
  let touchStartX, touchStartY;

  const MIN_SCALE = 1;
  const MAX_SCALE = 5;

  function clampTranslate() {
    const rect = lightboxImg.getBoundingClientRect();
    const maxX = Math.max(0, (rect.width * scale - rect.width) / 2);
    const maxY = Math.max(0, (rect.height * scale - rect.height) / 2);
    translateX = Math.min(maxX, Math.max(-maxX, translateX));
    translateY = Math.min(maxY, Math.max(-maxY, translateY));
  }

  function updateTransform(withTransition = false) {
    lightboxImg.style.transition = withTransition
      ? "transform 0.25s ease"
      : "none";
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    lightboxImg.style.cursor =
      scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in";
  }

  function resetZoom(withTransition = false) {
    scale = 1;
    translateX = 0;
    translateY = 0;
    isDragging = false;
    updateTransform(withTransition);
  }

  // Scroll/trackpad zoom, centered on cursor position
  lightboxOverlay.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const prevScale = scale;
      const delta = -e.deltaY * 0.0015;
      scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta * scale));

      if (scale === MIN_SCALE) {
        translateX = 0;
        translateY = 0;
      } else {
        const rect = lightboxImg.getBoundingClientRect();
        const cx = e.clientX - rect.left - rect.width / 2;
        const cy = e.clientY - rect.top - rect.height / 2;
        const ratio = scale / prevScale - 1;
        translateX -= cx * ratio;
        translateY -= cy * ratio;
        clampTranslate();
      }
      updateTransform();
    },
    { passive: false },
  );

  // Double-click to toggle zoom
  lightboxImg.addEventListener("dblclick", () => {
    if (scale > 1) {
      resetZoom(true);
    } else {
      scale = 2.5;
      updateTransform(true);
    }
  });

  // Drag to pan — only active when zoomed in
  lightboxImg.addEventListener("mousedown", (e) => {
    if (scale <= 1) return;
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    updateTransform();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    clampTranslate();
    updateTransform();
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      updateTransform();
    }
  });

  // Mobile: pinch-to-zoom, drag-to-pan, double-tap
  lightboxOverlay.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 2) {
        lastTouchDist = getTouchDist(e.touches);
      } else if (e.touches.length === 1) {
        const now = Date.now();
        if (now - lastTapTime < 300) {
          if (scale > 1) resetZoom(true);
          else {
            scale = 2.5;
            updateTransform(true);
          }
        }
        lastTapTime = now;

        if (scale > 1) {
          isDragging = true;
          touchStartX = e.touches[0].clientX - translateX;
          touchStartY = e.touches[0].clientY - translateY;
        }
      }
    },
    { passive: true },
  );

  lightboxOverlay.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = getTouchDist(e.touches);
        if (lastTouchDist) {
          const delta = (dist - lastTouchDist) * 0.01;
          scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
          if (scale === MIN_SCALE) {
            translateX = 0;
            translateY = 0;
          }
          clampTranslate();
          updateTransform();
        }
        lastTouchDist = dist;
      } else if (e.touches.length === 1 && isDragging) {
        e.preventDefault();
        translateX = e.touches[0].clientX - touchStartX;
        translateY = e.touches[0].clientY - touchStartY;
        clampTranslate();
        updateTransform();
      }
    },
    { passive: false },
  );

  lightboxOverlay.addEventListener("touchend", (e) => {
    if (e.touches.length < 2) lastTouchDist = null;
    if (e.touches.length === 0) isDragging = false;
  });

  function getTouchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox({ target: lightboxOverlay });
});
/* ──────────────────────────────────────────
   EMAIL COPY
────────────────────────────────────────── */
function copyEmail() {
  navigator.clipboard.writeText("amiyakrishna04@gmail.com").then(() => {
    const btn = document.getElementById("copy-btn");
    btn.textContent = "COPIED ✓";
    btn.classList.add("copied");

    setTimeout(() => {
      btn.textContent = "COPY";
      btn.classList.remove("copied");
    }, 2000);
  });
}

/* ──────────────────────────────────────────
   WHATSAPP DIRECT CONTACT
────────────────────────────────────────── */
(function setupWhatsApp() {
  const PHONE = "919305559247"; // country code + number, no + or leading 0
  const MESSAGE =
    "Hi Krishna, I saw your portfolio and wanted to connect regarding an opportunity.";
  const waLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  ["hero-whatsapp", "contact-whatsapp", "whatsapp-float"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = waLink;
  });
})();

/* ──────────────────────────────────────────
   CONTACT FORM — client validation + submission
   Submits to the /api/contact serverless function.
   Mirrors the validation rules enforced server-side in api/contact.js.
────────────────────────────────────────── */
(function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("cf-name");
  const phoneInput = document.getElementById("cf-phone");
  const messageInput = document.getElementById("cf-message");
  const submitBtn = document.getElementById("cf-submit");
  const statusEl = document.getElementById("cf-status");

  const NAME_REGEX = /^[\p{L}\p{M} .'-]{2,80}$/u;
  const PHONE_INDIA_REGEX = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  const PHONE_INTL_REGEX = /^\+[1-9]\d{7,14}$/;

  function fieldWrap(input) {
    return input.closest(".form-group");
  }

  function setFieldError(input, message) {
    const wrap = fieldWrap(input);
    const errorEl = wrap.querySelector(".field-error");
    if (errorEl) errorEl.textContent = message || "";
    wrap.classList.toggle("has-error", Boolean(message));
    return !message;
  }

  function validateName() {
    const value = nameInput.value.trim().replace(/\s+/g, " ");
    if (!value) return setFieldError(nameInput, "Full name is required.");
    if (!NAME_REGEX.test(value))
      return setFieldError(nameInput, "Enter a valid name (2-80 letters).");
    return setFieldError(nameInput, "");
  }

  function validatePhone() {
    const raw = phoneInput.value.trim();
    const digitsOnly = raw.replace(/[\s\-()]/g, "");
    if (!raw) return setFieldError(phoneInput, "Phone number is required.");
    if (!PHONE_INDIA_REGEX.test(digitsOnly) && !PHONE_INTL_REGEX.test(digitsOnly))
      return setFieldError(phoneInput, "Enter a valid Indian or international phone number.");
    return setFieldError(phoneInput, "");
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (!value) return setFieldError(messageInput, "Message is required.");
    if (value.length < 10)
      return setFieldError(messageInput, "Message should be at least 10 characters.");
    if (value.length > 2000)
      return setFieldError(messageInput, "Message should be under 2000 characters.");
    return setFieldError(messageInput, "");
  }

  [
    [nameInput, validateName],
    [phoneInput, validatePhone],
    [messageInput, validateMessage],
  ].forEach(([input, validator]) => {
    input.addEventListener("blur", () => {
      input.dataset.touched = "true";
      validator();
    });
    input.addEventListener("input", () => {
      if (input.dataset.touched === "true") validator();
    });
  });

  function showStatus(kind, message) {
    statusEl.textContent = message;
    statusEl.classList.remove("success", "error");
    if (kind) statusEl.classList.add(kind);
  }

  let isSubmitting = false;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // guard against duplicate submissions

    const nameOk = validateName();
    const phoneOk = validatePhone();
    const messageOk = validateMessage();
    [nameInput, phoneInput, messageInput].forEach((i) => (i.dataset.touched = "true"));

    if (!nameOk || !phoneOk || !messageOk) {
      showStatus("error", "Please fix the highlighted fields above.");
      return;
    }

    const payload = {
      fullName: nameInput.value.trim().replace(/\s+/g, " "),
      phone: phoneInput.value.trim(),
      message: messageInput.value.trim(),
      company: form.elements["company"] ? form.elements["company"].value : "", // honeypot
    };

    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");
    showStatus("", "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        // non-JSON response, fall through to generic error below
      }

      if (response.ok && result.success) {
        form.reset();
        [nameInput, phoneInput, messageInput].forEach((i) => {
          delete i.dataset.touched;
        });
        showStatus(
          "success",
          "Thanks — your message has been sent. I'll get back to you soon.",
        );
      } else {
        if (result.fieldErrors) {
          if (result.fieldErrors.fullName) setFieldError(nameInput, result.fieldErrors.fullName);
          if (result.fieldErrors.phone) setFieldError(phoneInput, result.fieldErrors.phone);
          if (result.fieldErrors.message) setFieldError(messageInput, result.fieldErrors.message);
        }
        showStatus(
          "error",
          result.error || "Something went wrong sending your message. Please try again.",
        );
      }
    } catch {
      showStatus(
        "error",
        "Network error — please check your connection and try again.",
      );
    } finally {
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.classList.remove("is-loading");
    }
  });
})();

/* ──────────────────────────────────────────
   DSA STATS — live fetch (best effort)
   Codeforces exposes a public, CORS-enabled API,
   so its rating can be fetched directly from the browser.
   LeetCode has no official public API and does not allow
   cross-origin requests from a static site, so that card
   stays a plain profile link rather than faking a number.
────────────────────────────────────────── */
(function loadCodeforcesStat() {
  const handle = "krishna_dsa"; // update if the handle changes
  const el = document.getElementById("codeforces-stat");
  if (!el) return;

  fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "OK" && data.result && data.result[0]) {
        const user = data.result[0];
        const rating = user.rating ?? "Unrated";
        const rank = user.rank ? ` (${user.rank})` : "";
        el.textContent = `Rating: ${rating}${rank}`;
      }
    })
    .catch(() => {
      // Silently keep the "Rating: —" placeholder if the API call fails
      // (e.g. offline, handle not found, or Codeforces rate-limiting).
    });
})();
