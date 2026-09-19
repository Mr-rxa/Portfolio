# PORTFOLIO — MASTER IMPLEMENTATION PLAN (for Antigravity)

Paste this whole file as the first prompt / save it as `PLAN.md` in the repo and tell the agent: "Read PLAN.md fully. Work phase by phase. After each phase, run the app, test it in the browser, and show me screenshots before moving on."

---

## 0. Who this is for

Rahul Sharma — B.Tech IT student (PIET, grad 2028), AI/ML + data/BI builder. Interned at Revolt Motors (EV bikes: complaints, EOD reports, AI Retail War Room). Projects: AI Retail War Room, CausalEV, Rice Disease Intelligence, Smart Ambulance, Olist analysis, NLP work, cattle breed recognition (research paper).

Audience: recruiters, hiring managers, startup founders, other engineers. They give it ~30 seconds first, and 5 minutes only if hooked.

## 1. The concept (decision made — do not redesign)

**Working title: "Causal Portfolio" (site name: `rahul.dev` / RS)**

Instead of a generic 3D "OS" or floating-planets world, the whole site is **one living causal graph of Rahul's work**. Nodes = projects, technologies, experience, education. Edges = real relationships (this project used this tech; this internship led to this project).

Why this is different: the site's navigation IS the proof of skill (data + causality + systems thinking), it fits the CausalEV / EV-industry story, and every visual element carries real information. No decorative particles.

### The three signature moments (build these exceptionally well; everything else is supporting)

1. **Hero: Live EV Battery Twin.**
   First screen = a small, real interactive simulation: sliders for *ambient temperature* and *discharge rate* drive a live degradation/range curve and a causal chain (Temperature → Cell chemistry → Degradation → Battery performance → EV range) that lights up as values change. Simple physics-inspired model in JS is fine (label it "illustrative model, see CausalEV for the real one"). Headline: one line, e.g. "I turn messy data into decisions." Two buttons: `Explore the graph` and `Recruiter view`.

2. **The Graph (main navigation).**
   Force-directed graph (d3-force rendered in canvas/WebGL). Hover a tech node (Python, SQL, Flask, Prophet, React…) → every project and experience that used it lights up, others dim. Click a project node → the graph smoothly zooms/morphs into that project's case study (no page reload). Camera has inertia. Works with keyboard (Tab through nodes, Enter to open).

3. **Project "Playable Proofs".**
   Each major project has a small interactive demo, not screenshots:
   - **Smart Ambulance:** canvas map, ambulances move, routes draw themselves to hospital nodes, user can drop an incident and watch re-routing.
   - **AI Retail War Room:** mini command-center dashboard with animated KPIs, forecast line, anomaly flag (use sample/synthetic data, never real company data).
   - **CausalEV:** the hero graph, expanded — click an edge to see the mechanism explained.
   - **Rice Disease:** leaf image → model → prediction flow, with a "try a sample leaf" button (pre-computed outputs are fine).
   - **Olist:** orders as a point cloud, cluster by category/region toggles.

### Supporting features (small, cheap, personality)
- **Terminal** (`~` key or button): `help, about, projects, stack, experience, resume, contact` + 3 easter eggs (`sudo make_coffee`, `matrix`, `secret`). Commands also navigate the graph ("projects ai" → camera flies to AI cluster). Keyword matching only, no LLM.
- **Boot sequence:** max 2 seconds, plays once per session, skippable by click/key. Not a gate.
- **Recruiter view** (toggle, always visible): a clean, fast, fully readable single-column version with resume, projects, experience, links. This protects you from the #1 failure of experimental portfolios — recruiters who can't find things.
- **Custom cursor** with contextual labels (EXPLORE / OPEN) on desktop only.

### Explicitly CUT from the original ChatGPT doc
Rapier/physics collisions, Konami code, sound design, full 3D room "Revolt Command Center", particle-word morphing core, full 3D navigable world, natural-language nav. (Optionally revisit sound and Konami after launch.) Reason: scope kills portfolios; each is decoration, not proof.

## 2. Design rules

- Rule: **every effect must encode information or signal a transition.** No effect without a reason.
- Palette: near-black background `#0A0B0D`, off-white text `#EDEAE3`, one primary accent (electric lime `#C6FF3D` or signal orange `#FF5B1F` — pick one, use sparingly), one muted secondary for edges/dimmed nodes. No purple-blue gradients, no neon glow borders.
- Type: one strong display face (e.g. Space Grotesk / Sora / Instrument Serif for contrast) + one mono (JetBrains Mono) for data/terminal. Big confident typography, tight spacing.
- Motion: ease-out, 200–600 ms, springs for panels. Respect `prefers-reduced-motion` (replace motion with fades).
- Layout: strong grid, generous whitespace; case studies read like editorial articles.
- Personal touch: RS monogram, subtle Haryana-inspired detail (e.g. a Phulkari-inspired line pattern used ONLY in the footer/loader — subtle, optional).
- Copy: concrete and specific ("Cut EOD reporting from X to Y"), never "passionate developer".

## 3. Tech stack

- Vite + React + TypeScript
- Tailwind CSS
- d3-force + d3 (graph layout, scales) rendered on `<canvas>` or via Three.js/R3F for the graph if performance needs it
- Three.js / @react-three/fiber + drei — ONLY for the graph/one hero shader if needed; don't build a full 3D world
- GSAP (+ ScrollTrigger) for transitions; Lenis for smooth scroll (disable on reduced-motion)
- Zustand for global state (active node, view mode, terminal open)
- MDX or typed TS objects for content (projects, experience, journey) — content lives in `/src/content`, separate from UI
- Deploy: GitHub → Vercel, custom domain, Vercel Analytics
- Testing: Playwright smoke tests (Recruiter view loads, graph renders, terminal opens), Lighthouse CI

## 4. Information architecture

```
/                  Hero (battery twin) → Graph
/#/project/:slug   Case study (opens from graph, deep-linkable)
/#/experience      Revolt Motors story
/#/journey         Education + timeline
/#/contact         Links, email, resume download
/recruiter         Clean single-page recruiter view (also toggle)
```
Every graph node must have a real, crawlable, semantic HTML counterpart (for SEO, screen readers, no-JS fallback). Add Open Graph image + proper `<title>`/meta.

## 5. Build phases (agent should complete in order, verifying each in the browser)

**Phase 1 — Foundation (1 day)**
Repo, Vite/TS/Tailwind, design tokens, fonts, layout shell, content schema in `/src/content` with placeholder data, Recruiter view fully working.
Accept: Recruiter view is complete, fast, and looks good on its own.

**Phase 2 — The Graph (2–3 days)**
Data model of nodes/edges from content, force layout, hover-highlight by tech, click-to-focus, zoom/pan with inertia, keyboard nav, mobile touch.
Accept: 60fps with ~60 nodes on a mid laptop; hovering "Python" highlights all its projects.

**Phase 3 — Hero: Battery Twin (1–2 days)**
Sliders + live curves + causal chain highlighting, mobile-friendly.
Accept: hero is understood in 5 seconds without reading anything.

**Phase 4 — Case study system + first two Playable Proofs (3–4 days)**
Reusable case-study template (problem → approach → architecture → result → what I'd do next), then Smart Ambulance and War Room demos.
Accept: each case study deep-links and has a working demo.

**Phase 5 — Remaining proofs, Experience, Journey (3 days)**
CausalEV expanded, Rice Disease, Olist, Revolt experience page, education timeline.

**Phase 6 — Terminal, boot, cursor, easter eggs (1–2 days)**

**Phase 7 — Performance, accessibility, polish (2 days)**
Budget: LCP < 2.5 s on 4G, initial JS < 250 KB gz (lazy-load graph/3D), Lighthouse ≥ 90 perf, ≥ 95 a11y. Reduced-motion mode, WebGL fallback to the Recruiter view, low-power detection (reduce node effects), keyboard-only path through the whole site, alt text, focus states, no layout shift.

**Phase 8 — Launch**
Domain, OG images, analytics, README with architecture diagram, share on LinkedIn/GitHub with a 30-second screen recording.

## 6. Agent working rules

- Never fabricate metrics, company data, or project results. Use `TODO_RAHUL:` placeholders and list them at the end of each phase.
- Use synthetic/sample data for anything related to Revolt Motors — no confidential information.
- Commit after each phase with a clear message.
- After each phase: run the dev server, open it with the browser agent, test desktop + a 390px mobile viewport, and report issues found.
- Prefer small, readable components; no giant files; comment shader/simulation logic.
- If a feature threatens the performance budget, simplify it and tell me.

## 7. What Rahul must supply (the site is only as strong as this)

- Real numbers per project (rows of data, accuracy/MAPE/F1, time saved, users)
- 2–3 sentences per project: problem, your specific contribution, outcome
- GitHub links, live demo links, resume PDF, professional photo (optional), LinkedIn, email
- Internship story at Revolt (safe-to-share version: what you built, tools, impact)
- One line about what you want to be hired for (data engineering / AI engineer / BI)

## 8. Antigravity setup

Antigravity is a VS Code–style agent IDE, so most of the setup is project config rather than plugins. Check its current docs for exact menu names since this is a fast-moving product.

- **Rules file:** put section 2 (design rules) and section 6 (agent working rules) into the workspace rules (e.g. an `.agent/rules` file or the equivalent) so every agent session follows them.
- **Browser agent / Chrome extension:** enable it — it lets the agent open the site, click through, and screenshot. This is the single most useful thing for a visual project.
- **MCP (optional but good):** a docs server such as Context7 so the agent uses current Three.js / GSAP / Tailwind APIs rather than outdated ones.
- **Editor extensions:** ESLint, Prettier, Tailwind CSS IntelliSense, a GLSL/shader syntax extension (if you write shaders), and Error Lens.
- **Workflow tip:** use planning mode for each phase, and keep the model on the strongest available option for Phases 2–4 (the graph and simulations are the hard part).

## 9. Success criteria

A visitor should, within 30 seconds, (a) understand who Rahul is and what he does, (b) play with something they've never seen on a portfolio, and (c) find the resume without hunting. A recruiter who never touches the graph should still leave impressed by the Recruiter view.
