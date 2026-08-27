/* ──────────────────────────────────────────
   CANVAS PARTICLE BACKGROUND
────────────────────────────────────────── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

/* ──────────────────────────────────────────
   SCROLL PROGRESS
────────────────────────────────────────── */
const bar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  const h = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / h * 100) + '%';
});

/* ──────────────────────────────────────────
   TYPING EFFECT
────────────────────────────────────────── */
const phrases = [
  "Full Stack Developer",
  "React & Next.js Developer",
  "Node.js Backend Developer",
  "Open to Internship Opportunities"
  ];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 45 : 80);
}
type();

/* ──────────────────────────────────────────
   REVEAL ON SCROLL
────────────────────────────────────────── */
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('show'), 0);
    }
  });
}, { threshold: .08 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 6) * 0.07 + 's';
  revObs.observe(el);
});

/* ──────────────────────────────────────────
   ACTIVE NAV
────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let curr = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) curr = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + curr ? 'var(--cyan)' : '';
  });
});

/* ──────────────────────────────────────────
   MOBILE NAV TOGGLE
────────────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navLinksList = document.querySelector('.nav-links');

if (navToggle && navLinksList) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksList.classList.toggle('open');
  });

  navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinksList.classList.remove('open');
    });
  });
}

/* ──────────────────────────────────────────
   THEME TOGGLE
────────────────────────────────────────── */
const themeBtn = document.getElementById('theme-toggle');
let isDark = true;
themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
});

/* ──────────────────────────────────────────
   PROJECT MODALS
────────────────────────────────────────── */
const projectData = [
  {
    title: "Job Application Tracker — Ingestion, Matching & Analytics Engine",
    isLive: true,

    problem:
      "Job seekers applying to dozens of roles lose track of stages fast — spreadsheets don't scale. Worse, manually reading every new listing and judging fit against your own profile wastes hours that should go into actual applications.",

    solution:
      "A centralized React/Vite + Express + PostgreSQL (Prisma ORM) tracker for the core CRUD workflow, extended with a second system: a BullMQ/Redis worker fleet that ingests listings from four channels — manual entry, Gmail inbox scanning, a Manifest V3 browser extension, and a live discovery API — deduplicates them, scores them against a stored profile with TF-IDF and optional embeddings, semi-automates the apply flow via Playwright (stopping before the final submit click), and feeds a live per-user analytics dashboard.",

    desc: [
      "Full CRUD job tracker: company, role, status, interview date & notes",
      "JWT Authentication (bcryptjs) with per-user data isolation",
      "Unified ingestion: manual entry, Gmail inbox scanning (Google OAuth2, read-only), a Manifest V3 browser extension, and the Remotive discovery API",
      "Ingestion pipeline: normalize → dedup → insert → enqueue match",
      "TF-IDF + keyword matcher, plus a provider-agnostic embeddings scorer",
      "Learning service nudges per-skill weights from interview/offer/rejection outcomes",
      "Human-in-the-loop apply engine via Playwright (stops before final submit)",
      "Per-user analytics dashboard (Recharts): response-rate and stage-conversion funnel, computed live from each user's own tracked jobs"
    ],

    architecture: [
      "API process (Express 5) stays thin — all heavy work (ingestion, scraping, matching, applying, analytics) runs across five dedicated BullMQ workers in a separate Node process, so a Playwright crash never takes the API down",
      "Data access is Prisma-first; a thin $queryRawUnsafe wrapper (lib/prisma.js) covers the SQL-heavy analytics, dedup and learning-loop queries",
      "Single hosted PostgreSQL instance shared by both the original tracker (users, tracked_jobs) and the new engine (jobs, companies, applications, match_scores, user_profile, job_sources, analytics_daily, scrape_runs)",
      "Matching is provider-agnostic: scoreEmbedding() takes an injected embedFn so it isn't locked to one AI vendor",
      "Deduplication runs exact-hash first, then fuzzy (Jaro-Winkler title + TF-IDF description) before insert",
      "Job discovery is adapter-based: Remotive's public API is genuinely wired up, while LinkedIn/Indeed adapters honestly report 'unavailable' — no partner API access, and the project deliberately avoids scraping or anti-bot bypasses to fake results"
    ],

    scaling: [
      "Redis-backed token-bucket rate limiter, capped per target domain, with randomized human-like delays to avoid hammering source sites",
      "Workers run as their own process (npm run worker) so ingestion/apply load never blocks user-facing API requests",
      "ATS field selectors are adapter-based (adapters/) — extending to a new job board means adding an adapter, not rewriting the engine",
      "Next steps called out directly in the repo: add a stage-history table so analytics can measure 'ever reached Interview/Offer' instead of only current status, and move matching to pgvector-backed embeddings once the corpus outgrows TF-IDF"
    ],

    metrics: [
      { num: "8", label: "New DB Tables" },
      { num: "5", label: "Background Workers" },
      { num: "2", label: "Matching Algorithms" },
      { num: "9", label: "New REST Route Groups" }
    ],

    tags: ["React 19 + Vite", "Express 5", "PostgreSQL + Prisma", "BullMQ + Redis", "Playwright", "JWT"],

    link: "https://github.com/Amiya-Krishna/Automated-Job-Application-Tracking-System-with-Email-Ingestion-and-Analytics-Pipeline",
    live: "https://job-application-tracker-portal-ten.vercel.app",

    gallery: [
      { src: "assets/projects/tracker-dashboard.jpg", alt: "Job application dashboard" },
      { src: "assets/projects/tracker-add-jobs.jpg", alt: "API tested with Postman" },
      { src: "assets/projects/tracker-email-integration.jpg", alt: "Secure login screen" }
    ],
    diagram: "assets/projects/Job_tracker_system_architecture.png",
    demoVideo: "", // paste a .mp4/.webm or .gif URL here later

    status: "Built & feature-complete — live demo deploying"
  },

  {
    title: "College Discovery Platform",
    isLive: true,

    problem:
      "With thousands of colleges, shifting fees, and confusing rank cutoffs, students end up piecing together decisions from scattered PDFs, forums, and outdated rank-predictor sites.",

    solution:
      "A Next.js App Router monolith (TypeScript, Prisma, PostgreSQL) that lets students search & filter colleges, run a weighted rank-based admission predictor, compare shortlists side by side, and get AI-assisted guidance — all behind Zod-validated APIs and HTTP-only JWT cookie auth.",

    desc: [
      "Search & filter across colleges by state, type & fees",
      "Weighted rank-prediction engine (rank, budget & placement scoring)",
      "Side-by-side college comparison tool",
      "AI guidance chat via a server-side Groq API proxy",
      "JWT auth in HTTP-only cookies + middleware-enforced access control",
      "Zod-validated API routes with Prisma ORM over PostgreSQL",
      "Email-based password reset flow (Resend) with expiring tokens"
    ],

    architecture: [
      "Next.js App Router as the single composition layer — src/app/api holds route handlers colocated with the pages that call them",
      "middleware.ts centralizes access control, checking the JWT cookie before requests reach any protected route handler",
      "Relational schema (Prisma): User, College, Course, Review, SavedCollege (unique userId+collegeId), PasswordResetToken",
      "Recommendation weights (rank/fees/placement) are environment-configurable, not hardcoded"
    ],

    scaling: [
      "Indexed lookup fields on college name, location, rating, and user-saved records for fast filtered reads",
      "Cascade-safe deletes on Course/Review so removing a college doesn't orphan child records",
      "Global Prisma Client reuse in development prevents connection-pool churn on hot reload",
      "Password reset tokens are single-use and expiring — no long-lived reset links"
    ],

    metrics: [
      { num: "14", label: "API Routes" },
      { num: "6", label: "Prisma Models" },
      { num: "3", label: "Comparison Slots" },
      { num: "1hr", label: "Reset Token TTL" }
    ],

    tags: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Zod", "JWT"],

    link: "https://github.com/Amiya-Krishna/college-discovery",
    live: "https://college-discovery-vert.vercel.app",

    gallery: [
      { src: "assets/projects/college-discovery-list.jpg", alt: "College search & filter page" },
      { src: "assets/projects/college-discovery-predictor.jpg", alt: "Rank-based college predictor" },
      { src: "assets/projects/college-discovery-compare.jpg", alt: "Side-by-side college comparison" }
    ],
    diagram: "assets/projects/college-discovery-architecture.png",
    demoVideo: "", // paste a .mp4/.webm or .gif URL here later

    status: "Live in production on Vercel"
  },

  {
    title: "Real-Time Discussion Platform (WebSocket Architecture)",
    isLive: true,

    problem:
      "Online communities are usually forced to pick one: slow-paced threaded discussions, or fast real-time chat. Splitting the two across separate tools kills engagement and context.",

    solution:
      "Built a MERN + Socket.IO platform that merges both worlds in one app — persistent discussion threads with comments live alongside real-time messaging, so a conversation can start async and move to live chat instantly.",

    desc: [
      "15+ REST APIs across Auth, Posts & Notifications",
      "JWT Authentication with bcrypt password hashing",
      "Socket.IO — live chat, typing indicators & online presence",
      "Real-time notifications for replies, mentions & messages persisted to the DB",
      "Multi-emoji reactions, rich text posts, image uploads (Multer), @mentions with autocomplete",
      "Infinite scroll — feed loads in pages of 8 instead of fetching everything at once"
    ],

    architecture: [
      "Express REST API and a Socket.IO layer run side by side in the same Node process, sharing auth/session context",
      "MongoDB + Mongoose schema design across Users, Posts, Comments & Notifications collections",
      "Role-based authorization middleware guards protected routes on both REST and socket events",
      "Uploaded images served from server/uploads via Multer in dev — repo explicitly flags this needs to move to S3/Cloudinary for production since free-tier hosts use ephemeral disks"
    ],

    scaling: [
      "Infinite scroll (paged fetch of 8) instead of loading the full feed, to keep initial payloads small as post volume grows",
      "Socket.IO falls back to HTTP long-polling when WebSocket transport isn't available",
      "Notification documents carry a type + link back to the source post, so read/unread state persists across sessions instead of living only in memory",
      "Known scaling gap called out directly: local-disk image storage won't survive redeploys on ephemeral hosts — next step is swapping in object storage"
    ],

    metrics: [
      { num: "15+", label: "REST Endpoints" },
      { num: "4", label: "Mongo Collections" },
      { num: "6", label: "Emoji Reactions" },
      { num: "8", label: "Posts / Page" }
    ],

    tags: ["React 18", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],

    link: "https://github.com/Amiya-Krishna/Community-Discussion-Forum-with-Real-Time-Chat",
    live: "https://community-discussion-forum-with-rea-roan.vercel.app",

    gallery: [
      { src: "assets/projects/forum-dashboard.jpg", alt: "Discussion feed dashboard" },
      { src: "assets/projects/forum-create-discussion.jpg", alt: "Create discussion thread" },
      { src: "assets/projects/forum-comments.jpg", alt: "Live comments & replies" }
    ],
    diagram: "assets/projects/system_architecture.png",
    demoVideo: "", // paste a .mp4/.webm or .gif URL here later

    status: "Built & feature-complete — live demo deploying"
  }
];


const overlay = document.getElementById("modal-overlay");

function openModal(i) {
    const p = projectData[i];

    document.getElementById("modal-title").textContent = p.title;

    // Status badge
    const statusEl = document.getElementById("modal-status");
    statusEl.textContent = (p.isLive ? "🟢 " : "🛠 ") + p.status;
    statusEl.className = "modal-status " + (p.isLive ? "status-live" : "status-progress");

    // Problem / Solution
    document.getElementById("modal-problem").textContent = p.problem;
    document.getElementById("modal-solution").textContent = p.solution;

    // Features
    document.getElementById("modal-desc").innerHTML =
        p.desc.map(feature => `<li>${feature}</li>`).join("");

    // Architecture & tech decisions
    const archEl = document.getElementById("modal-architecture");
    const archWrap = archEl.closest(".modal-section");
    if (p.architecture && p.architecture.length) {
        archEl.innerHTML = p.architecture.map(item => `<li>${item}</li>`).join("");
        archWrap.style.display = "";
    } else {
        archEl.innerHTML = "";
        archWrap.style.display = "none";
    }

    // Scaling considerations
    const scaleEl = document.getElementById("modal-scaling");
    const scaleWrap = scaleEl.closest(".modal-section");
    if (p.scaling && p.scaling.length) {
        scaleEl.innerHTML = p.scaling.map(item => `<li>${item}</li>`).join("");
        scaleWrap.style.display = "";
    } else {
        scaleEl.innerHTML = "";
        scaleWrap.style.display = "none";
    }

    // Metrics & scope
    const metricsEl = document.getElementById("modal-metrics");
    const metricsWrap = document.getElementById("modal-metrics-wrap");
    if (p.metrics && p.metrics.length) {
        metricsEl.innerHTML = p.metrics.map(m =>
            `<div class="metric-box"><span class="metric-num">${m.num}</span><div class="metric-label">${m.label}</div></div>`
        ).join("");
        metricsWrap.style.display = "";
    } else {
        metricsEl.innerHTML = "";
        metricsWrap.style.display = "none";
    }

    // Tags
    document.getElementById("modal-tags").innerHTML =
        p.tags.map(tag => `<span class="tag">${tag}</span>`).join("");

    // Proof gallery (each photo opens full-size in the lightbox on click)
    const galleryEl = document.getElementById("modal-gallery");
    if (p.gallery && p.gallery.length) {
        galleryEl.innerHTML = p.gallery.map(g =>
            `<img src="${g.src}" alt="${g.alt}" loading="lazy" onclick="event.stopPropagation(); openLightbox('${g.src}', '${g.alt.replace(/'/g, "\\'")}')">`
        ).join("");
        galleryEl.style.display = "grid";
        galleryEl.classList.toggle("modal-gallery-single", p.gallery.length === 1);
    } else {
        galleryEl.innerHTML = "";
        galleryEl.style.display = "none";
    }

    // System architecture diagram (optional, separate from screenshots, also opens in lightbox)
    const diagramWrap = document.getElementById("modal-diagram-wrap");
    const diagramEl = document.getElementById("modal-diagram");
    if (p.diagram) {
        const diagramAlt = `${p.title} system architecture diagram`;
        diagramEl.innerHTML = `<img src="${p.diagram}" alt="${diagramAlt}" loading="lazy" onclick="event.stopPropagation(); openLightbox('${p.diagram}', '${diagramAlt.replace(/'/g, "\\'")}')">`;
        diagramWrap.style.display = "block";
    } else {
        diagramEl.innerHTML = "";
        diagramWrap.style.display = "none";
    }

    // Demo video (GIF or MP4) — leave p.demoVideo blank until a link is ready
    const videoBox = document.getElementById("modal-video-box");
    if (p.demoVideo) {
        const isGif = /\.gif$/i.test(p.demoVideo);
        videoBox.innerHTML = isGif
            ? `<img src="${p.demoVideo}" alt="${p.title} demo">`
            : `<video src="${p.demoVideo}" controls playsinline preload="metadata"></video>`;
    } else {
        videoBox.innerHTML = `
            <div class="modal-video-empty">
              <span>🎬</span>
              Demo video coming soon
            </div>`;
    }

    // GitHub Link
    document.getElementById("modal-link").href = p.link;

    // Live Project button
    const liveBtn = document.getElementById("modal-live");
    if (p.isLive) {
        liveBtn.href = p.live;
        liveBtn.target = "_blank";
        liveBtn.textContent = "Live Demo ↗";
        liveBtn.classList.remove("btn-disabled");
        liveBtn.removeAttribute("aria-disabled");
    } else {
        liveBtn.href = "#";
        liveBtn.removeAttribute("target");
        liveBtn.textContent = "Live Demo — Coming Soon";
        liveBtn.classList.add("btn-disabled");
        liveBtn.setAttribute("aria-disabled", "true");
    }

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeModal(e) {
    if (!e || e.target === overlay || e.currentTarget.classList.contains("modal-close")) {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
    }
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal({ target: overlay });
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
    if (!e || e.target === lightboxOverlay || e.target.closest(".lightbox-close")) {
        lightboxOverlay.classList.remove("open");
        lightboxImg.src = "";
        resetZoom();
    }
}

if (lightboxOverlay && lightboxImg) {

    let scale = 1;
    let translateX = 0, translateY = 0;
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
        lightboxImg.style.transition = withTransition ? "transform 0.25s ease" : "none";
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        lightboxImg.style.cursor = scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in";
    }

    function resetZoom(withTransition = false) {
        scale = 1;
        translateX = 0;
        translateY = 0;
        isDragging = false;
        updateTransform(withTransition);
    }

    // Scroll/trackpad zoom, centered on cursor position
    lightboxOverlay.addEventListener("wheel", (e) => {
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
    }, { passive: false });

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
    lightboxOverlay.addEventListener("touchstart", (e) => {
        if (e.touches.length === 2) {
            lastTouchDist = getTouchDist(e.touches);
        } else if (e.touches.length === 1) {
            const now = Date.now();
            if (now - lastTapTime < 300) {
                if (scale > 1) resetZoom(true);
                else { scale = 2.5; updateTransform(true); }
            }
            lastTapTime = now;

            if (scale > 1) {
                isDragging = true;
                touchStartX = e.touches[0].clientX - translateX;
                touchStartY = e.touches[0].clientY - translateY;
            }
        }
    }, { passive: true });

    lightboxOverlay.addEventListener("touchmove", (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const dist = getTouchDist(e.touches);
            if (lastTouchDist) {
                const delta = (dist - lastTouchDist) * 0.01;
                scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
                if (scale === MIN_SCALE) { translateX = 0; translateY = 0; }
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
    }, { passive: false });

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

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox({ target: lightboxOverlay });
});
/* ──────────────────────────────────────────
   EMAIL COPY
────────────────────────────────────────── */
function copyEmail() {
  navigator.clipboard.writeText('amiyakrishna04@gmail.com').then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'COPIED ✓';
    btn.classList.add('copied');

    setTimeout(() => {
      btn.textContent = 'COPY';
      btn.classList.remove('copied');
    }, 2000);
  });
}


/* ──────────────────────────────────────────
   WHATSAPP DIRECT CONTACT
────────────────────────────────────────── */
(function setupWhatsApp() {
  const PHONE = "919305559247"; // country code + number, no + or leading 0
  const MESSAGE = "Hi Krishna, I saw your portfolio and wanted to connect regarding an opportunity.";
  const waLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  ["hero-whatsapp", "contact-whatsapp", "whatsapp-float"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = waLink;
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
    .then(res => res.json())
    .then(data => {
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
