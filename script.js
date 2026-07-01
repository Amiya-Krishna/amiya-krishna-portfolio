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
    title: "Community Discussion Forum with Real-Time Chat",
    isLive: false,

    problem:
      "Online communities are usually forced to pick one: slow-paced threaded discussions, or fast real-time chat. Splitting the two across separate tools kills engagement and context.",

    solution:
      "Built a MERN + Socket.IO platform that merges both worlds in one app — persistent discussion threads with comments live alongside real-time messaging, so a conversation can start async and move to live chat instantly.",

    desc: [
      "15+ REST APIs across Auth, Posts & Notifications",
      "JWT Authentication with bcrypt password hashing",
      "Socket.IO — live chat, typing indicators & online presence",
      "Real-time notifications for replies, mentions & messages",
      "MongoDB + Mongoose schema design across 4 collections",
      "Role-based authorization on protected routes"
    ],

    tags: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],

    link: "https://github.com/Amiya-Krishna/Community-Discussion-Forum-with-Real-Time-Chat",
    live: "#",

    gallery: [
      { src: "assets/projects/forum-dashboard.jpg", alt: "Discussion feed dashboard" },
      { src: "assets/projects/forum-create-discussion.jpg", alt: "Create discussion thread" },
      { src: "assets/projects/forum-comments.jpg", alt: "Live comments & replies" }
    ],

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

    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "JWT"],

    link: "https://github.com/Amiya-Krishna/college-discovery",
    live: "https://amiya-krishna-portfolio.vercel.app",

    gallery: [
      { src: "assets/projects/college-discovery-list.jpg", alt: "College search & filter page" },
      { src: "assets/projects/college-discovery-predictor.jpg", alt: "Rank-based college predictor" },
      { src: "assets/projects/college-discovery-compare.jpg", alt: "Side-by-side college comparison" }
    ],
    diagram: "assets/projects/college-discovery-architecture.svg",

    status: "Live in production on Vercel"
  },

  {
    title: "Job Application Tracker Portal",
    isLive: false,

    problem:
      "Job seekers applying to dozens of roles quickly lose track of which stage each application is at — spreadsheets and email threads don't scale past a handful of applications.",

    solution:
      "A centralized MERN dashboard where users log every application, move it through hiring stages (Applied → Interview → Offer), and search, filter & sort their pipeline — all scoped to a JWT-authenticated account so data stays private per user.",

    desc: [
      "Track applications through custom hiring stages",
      "Full CRUD via RESTful API (create, update, delete jobs)",
      "Search, filter & sort applications by company, role & status",
      "JWT Authentication with per-user data isolation",
      "MongoDB + Mongoose data modelling",
      "Responsive dashboard built with React & Tailwind CSS"
    ],

    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],

    link: "https://github.com/Amiya-Krishna/Job-Application-Tracker-Portal",
    live: "#",

    gallery: [
      { src: "assets/projects/tracker-dashboard.jpg", alt: "Job application dashboard" },
      { src: "assets/projects/tracker-postman.jpg", alt: "API tested with Postman" },
      { src: "assets/projects/tracker-login.jpg", alt: "Secure login screen" }
    ],

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

    // Tags
    document.getElementById("modal-tags").innerHTML =
        p.tags.map(tag => `<span class="tag">${tag}</span>`).join("");

    // Proof gallery
    const galleryEl = document.getElementById("modal-gallery");
    if (p.gallery && p.gallery.length) {
        galleryEl.innerHTML = p.gallery.map(g =>
            `<img src="${g.src}" alt="${g.alt}" loading="lazy">`
        ).join("");
        galleryEl.style.display = "grid";
        galleryEl.classList.toggle("modal-gallery-single", p.gallery.length === 1);
    } else {
        galleryEl.innerHTML = "";
        galleryEl.style.display = "none";
    }

    // System architecture diagram (optional, separate from screenshots)
    const diagramWrap = document.getElementById("modal-diagram-wrap");
    const diagramEl = document.getElementById("modal-diagram");
    if (p.diagram) {
        diagramEl.innerHTML = `<img src="${p.diagram}" alt="${p.title} system architecture diagram" loading="lazy">`;
        diagramWrap.style.display = "block";
    } else {
        diagramEl.innerHTML = "";
        diagramWrap.style.display = "none";
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


