import "./styles/styles.css";
import { bootCyberConsole, magneticButtons } from "./cyberConsole.js";
import { profile } from "./data/profile";
import { pages, pageTitle, resolvePage, type PageId } from "./lib/pages";
import { bootNeuralGrid } from "./lib/threeScene";

const app = document.querySelector<HTMLDivElement>("#app");
const canvas = document.querySelector<HTMLCanvasElement>("#neural-grid");

if (!app || !canvas) {
  throw new Error("Portfolio root or canvas is missing.");
}

const appRoot = app;
const scene = bootNeuralGrid(canvas);
let cleanupPage = () => {};

function navTemplate(active: PageId) {
  return `
    <nav class="topbar" aria-label="Portfolio pages">
      <a class="brand" href="#/home" aria-label="Nikhil Tomar home">
        <span class="brand-mark">NT</span>
        <span>
          <strong>${profile.name}</strong>
          <small>Red Team Japan Track</small>
        </span>
      </a>
      <div class="nav-links">
        ${pages
          .map(
            (page) => `
              <a class="${page.id === active ? "active" : ""}" href="#/${page.id}">
                <span>${page.glyph}</span>${page.label}
              </a>`
          )
          .join("")}
      </div>
    </nav>
  `;
}

function shell(active: PageId, body: string) {
  return `
    ${navTemplate(active)}
    <main class="page-shell" data-page="${active}">
      ${body}
    </main>
  `;
}

function homePage() {
  return shell(
    "home",
    `
      <section class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">GitHub: @${profile.handle} / ${profile.location}</p>
          <h1 class="glow-title">${profile.headline}</h1>
          <p class="hero-intro">${profile.introduction}</p>
          <div class="hero-actions">
            <a data-magnetic class="action primary" href="#/projects">View Operations</a>
            <a data-magnetic class="action ghost" href="${profile.github}" target="_blank" rel="noreferrer">Open GitHub</a>
          </div>
        </div>
        <aside class="hud-panel hero-hud" aria-label="Mission summary">
          <div class="hud-ring">
            <span>日本</span>
            <strong>N3</strong>
          </div>
          <dl class="mission-list">
            <div><dt>Goal</dt><dd>${profile.target}</dd></div>
            <div><dt>Role</dt><dd>Red Team Security</dd></div>
            <div><dt>Language</dt><dd>${profile.japaneseLevel}</dd></div>
          </dl>
          <div id="console-slot"></div>
        </aside>
      </section>
      <section class="signal-strip">
        ${profile.strengths.map((strength) => `<span>${strength}</span>`).join("")}
      </section>
    `
  );
}

function aboutPage() {
  return shell(
    "about",
    `
      <section class="two-column">
        <div>
          <p class="eyebrow">Profile Signal</p>
          <h1 class="glow-title compact">Builder, learner, operator.</h1>
          <p class="body-large">${profile.mission}</p>
          <p class="body-large">The direction is clear: combine computer science fundamentals, ethical hacking practice, automation, and Japanese communication into a strong red team career path.</p>
        </div>
        <div class="identity-card">
          <span class="scanline"></span>
          <h2>${profile.name}</h2>
          <p>New Delhi based cybersecurity enthusiast / ethical hacking learner / Japan-focused red team aspirant.</p>
          <div class="identity-grid">
            <span>Threat Hunting</span>
            <span>Ethical Hacking</span>
            <span>Python Tools</span>
            <span>Japanese N3</span>
          </div>
        </div>
      </section>
      <section class="timeline">
        ${profile.timeline
          .map(
            (item) => `
              <article class="timeline-node">
                <span>${item.year}</span>
                <h3>${item.title}</h3>
                <p>${item.detail}</p>
              </article>`
          )
          .join("")}
      </section>
    `
  );
}

function arsenalPage() {
  const cards = [
    ["Recon", "Map attack surfaces, enumerate assets, document signals, and convert noise into useful paths."],
    ["Web Security", "Practice injection, auth logic, access control, API behavior, and clean responsible reporting."],
    ["Automation", "Use Python and TypeScript to build repeatable security workflows and visual dashboards."],
    ["Red Team Labs", "Train on privilege escalation, lateral movement concepts, OPSEC, payload discipline, and reporting."],
    ["Defensive Mindset", "Understand detections, logs, threat hunting, and how defenders see attacker behavior."],
    ["Japanese Work Readiness", "Build vocabulary for technical communication, interviews, documentation, and workplace etiquette."]
  ];

  return shell(
    "arsenal",
    `
      <section class="page-heading">
        <p class="eyebrow">Security Arsenal</p>
        <h1 class="glow-title compact">Skills mapped like an operation board.</h1>
      </section>
      <section class="arsenal-grid">
        ${cards.map(([title, detail], index) => `<article class="tool-card" style="--i:${index}"><h2>${title}</h2><p>${detail}</p></article>`).join("")}
      </section>
      <section class="code-wall" aria-label="Technology stack">
        ${profile.stack.map((item) => `<code>${item}</code>`).join("")}
      </section>
    `
  );
}

function projectsPage() {
  return shell(
    "projects",
    `
      <section class="page-heading">
        <p class="eyebrow">GitHub Operations</p>
        <h1 class="glow-title compact">Projects with security signal.</h1>
      </section>
      <section class="project-grid">
        ${profile.projects
          .map(
            (project) => `
              <article class="project-card">
                <div>
                  <p>${project.role}</p>
                  <h2>${project.name}</h2>
                </div>
                <p>${project.signal}</p>
                <div class="tag-row">${project.stack.map((tag) => `<span>${tag}</span>`).join("")}</div>
                <a href="${project.github}" target="_blank" rel="noreferrer">Open repository</a>
              </article>`
          )
          .join("")}
      </section>
    `
  );
}

function japanPage() {
  return shell(
    "japan",
    `
      <section class="japan-board">
        <div>
          <p class="eyebrow">Japan Mission</p>
          <h1 class="glow-title compact">From N3 discipline to red team work in Japan.</h1>
          <p class="body-large">The portfolio frames Japanese learning as part of the engineering plan: communication, documentation, cultural readiness, and interview confidence for a future cyber security role in Japan.</p>
        </div>
        <div class="kanji-stack" aria-label="Japan goal markers">
          <span>攻</span><span>守</span><span>学</span>
        </div>
      </section>
      <section class="roadmap">
        <article><strong>01</strong><h2>N3 to N2</h2><p>Strengthen reading, listening, cyber vocabulary, and professional self-introduction.</p></article>
        <article><strong>02</strong><h2>Red Team Portfolio</h2><p>Publish labs, writeups, tooling, and reports that show responsible offensive skill.</p></article>
        <article><strong>03</strong><h2>Japan Applications</h2><p>Prepare bilingual resume assets, interview stories, and evidence of hands-on security practice.</p></article>
      </section>
    `
  );
}

const pageRenderers: Record<PageId, () => string> = {
  home: homePage,
  about: aboutPage,
  arsenal: arsenalPage,
  projects: projectsPage,
  japan: japanPage
};

function render() {
  cleanupPage();
  const active = resolvePage(window.location.hash || "#/home");
  document.title = pageTitle(active);
  appRoot.innerHTML = pageRenderers[active]();
  scene.setIntensity(active === "home" ? 1.15 : 0.72);

  const consoleSlot = appRoot.querySelector("#console-slot");
  const cleanupConsole = consoleSlot ? bootCyberConsole(consoleSlot) : () => {};
  const cleanupMagnetics = magneticButtons(appRoot);
  cleanupPage = () => {
    cleanupConsole();
    cleanupMagnetics();
  };
}

window.addEventListener("hashchange", render);
render();
