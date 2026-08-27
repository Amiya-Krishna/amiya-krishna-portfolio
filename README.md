# Amiya Krishna — Backend-Leaning Full Stack Developer Portfolio

Personal portfolio website of **Amiya Krishna**, a B.Tech CSE student building backend-heavy full-stack systems (queues, workers, relational + NoSQL data modeling, real-time architecture), targeting Backend/Full Stack Software Engineering internships.

🔗 **Live site:** _add your deployed portfolio URL here once hosted (e.g. Vercel/Netlify/GitHub Pages)_
📄 **Resume:** [`resume/Amiya_Krishna_Resume.pdf`](resume/Amiya_Krishna_Resume.pdf)

---

## 👋 About

I'm a B.Tech (CSE, 3rd year) student focused on backend engineering — relational and NoSQL schema design, REST API design, JWT/cookie auth, and background job systems (BullMQ + Redis, Socket.IO). This site is a single, fast-loading landing page built to give recruiters everything they need in a few seconds, with real GitHub-sourced case studies instead of generic project blurbs.

---

## ✨ Features

- **Project case studies, not just links** — each project card opens a full case-study modal with Problem → Solution, Key Features, **Architecture & Tech Decisions**, **Scaling Considerations**, and **Metrics & Scope** — all sourced from the actual GitHub READMEs.
- **Featured Project deep dive** — a dedicated section breaking down the most technically deep project (the Job Tracker's BullMQ/Redis matching engine) beyond what fits in a modal.
- **Engineering Depth section** — APIs, database design, system architecture, and performance/reliability details pulled from real repo data.
- **DSA / Problem Solving section** — placeholders for LeetCode/Codeforces/GfG profiles, clearly marked to be filled in.
- **Technical Blogs section** — placeholder cards for planned write-ups tied to the actual projects.
- **GitHub Highlights section** — top repos with live-sourced descriptions and language badges.
- **WhatsApp direct contact** — floating button, hero CTA, and contact-section card, all linking to `wa.me` with a pre-filled message.
- **Live vs. in-progress status badges**, dark/light theme toggle, scroll reveal animations, one-click resume download, and email copy-to-clipboard.
- Fully responsive — works down to mobile widths.

---

## 🛠 Built With

Plain, dependency-free front end — no framework, no build step:

- **HTML5 / CSS3** — custom design system using CSS variables for theming
- **Vanilla JavaScript** — scroll reveal (IntersectionObserver), typing effect, project modal logic, theme toggle, WhatsApp link builder
- **Google Fonts** — Space Grotesk, Orbitron, JetBrains Mono

---

## 📁 Project Structure

```
My Portfolio/
├── index.html                 # All page sections (hero, about, projects, featured, engineering, dsa, blogs, github, skills, contact)
├── style.css                  # Design system + component styles
├── script.js                  # Project case-study data, modal logic, WhatsApp wiring, animations
├── assets/projects/           # Screenshots & diagrams used in project cards/modals
├── resume/
│   └── Amiya_Krishna_Resume.pdf
└── README.md
```

---

## 🚀 Running Locally

No build tools required — it's static HTML/CSS/JS.

```bash
git clone https://github.com/Amiya-Krishna/<this-repo>.git
cd "My Portfolio"

# open directly
open index.html         # macOS
start index.html         # Windows

# or serve it (recommended, avoids any local file restrictions)
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 💼 Featured Projects

| Project                                              | Description                                                                                                                                                               | Stack                                                        | Links                                                                                                                                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Job Application Tracker + Matching Engine** ⭐     | React/Vite + Express + PostgreSQL tracker extended with a BullMQ/Redis worker fleet doing ingestion, TF-IDF/embedding matching, fuzzy dedup, and semi-automated applying. | React · Express 5 · PostgreSQL · BullMQ · Redis · Playwright | [Live](https://Job Application Tracker — Ingestion, Matching & Analytics Engine-ten.vercel.app) · [Code](https://github.com/Amiya-Krishna/Job Application Tracker — Ingestion, Matching & Analytics Engine) |
| **Collexa — College Decision Intelligence Platform** | Search, filter, compare and get an AI-assisted, rank-based college recommendation. Live in production.                                                                    | Next.js 16 · TypeScript · Prisma · PostgreSQL · Zod          | [Live](https://Collexa — College Decision Intelligence Platform-vert.vercel.app) · [Code](https://github.com/Amiya-Krishna/Collexa — College Decision Intelligence Platform)                                |
| **Real-Time Discussion Platform**                    | Threaded discussions with real-time chat, notifications, and JWT auth via Socket.IO.                                                                                      | React · Node.js · Express · MongoDB · Socket.IO              | [Code](https://github.com/Amiya-Krishna/Community-Discussion-Forum-with-Real-Time-Chat)                                                                                                                     |

Full case studies (problem, solution, architecture, scaling, metrics, screenshots) are available on the [live site](#) under the Projects section — data is grounded in the actual repo READMEs, not invented.

---

## 📬 Contact

- **Email:** [amiyakrishna04@gmail.com](mailto:amiyakrishna04@gmail.com)
- **WhatsApp:** [wa.me/919305559247](https://wa.me/919305559247)
- **GitHub:** [github.com/Amiya-Krishna](https://github.com/Amiya-Krishna)
- **LinkedIn:** [linkedin.com/in/amiya-krishna](https://www.linkedin.com/in/amiya-krishna)
- **Location:** Lucknow, Uttar Pradesh, India — open to Remote / Hybrid / On-site internships

---

⭐ If you're a recruiter or hiring manager and this portfolio was useful, feel free to reach out on WhatsApp or email — I'm actively looking for Backend / Full Stack Software Engineering internship opportunities.
