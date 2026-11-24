"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, educationalRepos, type Project } from "@/lib/projects";
import { Artwork } from "./Artwork";
import { GlassScene } from "glassy-liquid/react";
import { OrbitBackdrop } from "./OrbitBackdrop";
import { LensButton, LensBar, AdaptiveLensBar } from "./LiquidGlass";
import { repositoryMedia } from "@/lib/project-media";
import Image from "next/image";

function External({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
function ProjectDossier({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!project) return;
    const dialog = ref.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previous;
    };
  }, [project]);
  return (
    <dialog
      ref={ref}
      className="dossier"
      aria-labelledby="dossier-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <>
          <button
            autoFocus
            className="dossier-close"
            onClick={onClose}
            aria-label="Close project dossier"
          >
            ✕
          </button>
          <Artwork
            src={`/assets/projects/${project.id}`}
            alt={`${project.name} concept artwork`}
          />
          <div className="dossier-content">
            <span className="eyebrow">Project study / {project.category}</span>
            <h2 id="dossier-title">{project.name}</h2>
            <p className="dossier-headline">{project.headline}</p>
            {repositoryMedia[project.id] && (
              <figure className="dossier-evidence">
                <Image
                  src={repositoryMedia[project.id].src}
                  alt={repositoryMedia[project.id].alt}
                  width={1440}
                  height={960}
                />
                <figcaption>
                  <External href={repositoryMedia[project.id].source}>
                    {repositoryMedia[project.id].caption}
                  </External>
                </figcaption>
              </figure>
            )}
            <h3>The question</h3>
            <p>{project.purpose}</p>
            <h3>The approach</h3>
            <p>{project.approach}</p>
            <h3>Scope & limitations</h3>
            <p>{project.limit}</p>
            <div className="tags">
              {project.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <External
              href={`https://github.com/Smrbruh/${project.repo}`}
              className="solid-link"
            >
              View repository
            </External>
            <p className="art-caption">
              Concept illustration, not a product screenshot or measured result.
            </p>
          </div>
        </>
      )}
    </dialog>
  );
}
function Stars({ repo }: { repo: string }) {
  const [stars, setStars] = useState<{ count: number; date: string } | null>(
    null,
  );
  useEffect(() => {
    const key = `github-stars:${repo}`;
    let cached: { count: number; date: string } | null = null;
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      if (
        value &&
        Number.isInteger(value.count) &&
        value.count >= 0 &&
        typeof value.date === "string"
      ) {
        cached = value;
        const snapshot = cached;
        queueMicrotask(() => setStars(snapshot));
      }
    } catch {}
    if (cached && Date.now() - Date.parse(cached.date) < 3600000) return;
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/Smrbruh/${repo}`, {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error("Unavailable");
        return r.json();
      })
      .then((data) => {
        if (!Number.isInteger(data.stargazers_count)) return;
        const value = {
          count: data.stargazers_count,
          date: new Date().toISOString(),
        };
        setStars(value);
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch {}
      })
      .catch(() => {});
    return () => controller.abort();
  }, [repo]);
  return (
    <span
      className="repo-stars"
      title={
        stars
          ? `GitHub snapshot: ${stars.date}`
          : "GitHub star count unavailable"
      }
    >
      ☆ {stars ? `${stars.count} stars` : "View on GitHub"}
    </span>
  );
}
const navigation = [
  ["missions", "Work"],
  ["engineering", "Practice"],
  ["about", "About"],
  ["contact", "Contact"],
];

function ProjectPreview({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const evidence = repositoryMedia[project.id];
  const [showEvidence, setShowEvidence] = useState(false);
  return (
    <article className={`case-study case-${project.id}`}>
      <div className="case-heading">
        <span className="eyebrow">{project.category}</span>
        <h3>{project.name}</h3>
      </div>
      <div className="case-media">
        <GlassScene
          backdrop={
            showEvidence ? `#evidence-${project.id}` : `#art-${project.id} img`
          }
          className="case-scene"
        >
          <div
            id={`art-${project.id}`}
            className={
              showEvidence ? "concept-frame is-hidden" : "concept-frame"
            }
          >
            <Artwork
              src={`/assets/projects/${project.id}`}
              alt={`${project.name} concept illustration — not an application screenshot`}
            />
          </div>
          {showEvidence && evidence && (
            <Image
              id={`evidence-${project.id}`}
              className="evidence-image"
              src={evidence.src}
              alt={evidence.alt}
              width={1440}
              height={960}
            />
          )}
          <div className="case-media-controls">
            <LensBar
              appearance={showEvidence ? "light" : "dark"}
              className="gallery-controls"
            >
              {evidence && (
                <>
                  <button
                    aria-pressed={!showEvidence}
                    onClick={() => setShowEvidence(false)}
                  >
                    Concept
                  </button>
                  <button
                    aria-pressed={showEvidence}
                    onClick={() => setShowEvidence(true)}
                  >
                    {project.id === "prometheus"
                      ? "Research figure"
                      : "Interface"}
                  </button>
                  <span className="control-divider" />
                </>
              )}
              <button
                onClick={onOpen}
                aria-label={`Read ${project.name} case study`}
              >
                Read study <span aria-hidden="true">+</span>
              </button>
            </LensBar>
          </div>
        </GlassScene>
        <p className="media-caption">
          {showEvidence && evidence
            ? evidence.caption
            : "Concept artwork · illustrative, not a product screenshot"}
        </p>
      </div>
      <div className="case-description">
        <p>{project.description}</p>
        <div className="case-meta">
          <span>{project.stack.join(" / ")}</span>
          <External href={`https://github.com/Smrbruh/${project.repo}`}>
            GitHub
          </External>
        </div>
      </div>
      {project.id === "inkmath" && (
        <figure className="inkmath-evidence">
          <Image
            src={repositoryMedia.inkmath.src}
            alt={repositoryMedia.inkmath.alt}
            width={1440}
            height={960}
          />
          <figcaption>{repositoryMedia.inkmath.caption}</figcaption>
        </figure>
      )}
    </article>
  );
}

export function Archive() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("top");
  const [inOrbit, setInOrbit] = useState(false);
  useEffect(() => {
    const enter = () => setInOrbit(true);
    let frame = 0;
    try {
      if (sessionStorage.getItem("smrbruh-intro") === "complete")
        frame = requestAnimationFrame(enter);
    } catch {}
    window.addEventListener("launch-complete", enter);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("launch-complete", enter);
    };
  }, []);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState<Project | null>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
          gsap.fromTo(
            el,
            { y: 26, opacity: 0.35 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            },
          ),
        );
        gsap.utils.toArray<HTMLElement>(".case-scene").forEach((el) =>
          gsap.fromTo(
            el,
            { clipPath: "inset(4% 0 4% 0)" },
            {
              clipPath: "inset(0% 0 0% 0)",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          ),
        );
        gsap.to(".practice-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: ".practice-image",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      },
      root,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-20% 0px -50% 0px" },
    );
    navigation.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      mm.revert();
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);
  useEffect(() => {
    if (!menu) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menu]);
  const shown = projects.filter(
    (p) =>
      filter === "All work" ||
      (filter === "Applications"
        ? ["inkmath", "qadam", "komek-kids"].includes(p.id)
        : ["orbit", "prometheus", "1c2api"].includes(p.id)),
  );
  return (
    <div id="portfolio" ref={root}>
      <a href="#missions" className="skip-link">
        Skip to selected work
      </a>
      <header className="floating-header">
        <div className="nav-scene">
          <AdaptiveLensBar className="navigation-lens">
            <a className="wordmark" href="#top" aria-label="SMRBRUH home">
              smrbruh<span>.</span>
            </a>
            <nav aria-label="Main navigation" className="desktop-navigation">
              {navigation.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                >
                  {label}
                </a>
              ))}
            </nav>
            <span className="nav-descriptor">Independent portfolio</span>
            <button
              className="mobile-menu"
              aria-expanded={menu}
              aria-controls="mobile-navigation"
              onClick={() => setMenu(!menu)}
            >
              {menu ? "Close" : "Menu"}
            </button>
          </AdaptiveLensBar>
          {menu && (
            <AdaptiveLensBar panel className="mobile-navigation-lens">
              <nav id="mobile-navigation" aria-label="Mobile navigation">
                {navigation.map(([id, label]) => (
                  <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                    {label}
                  </a>
                ))}
              </nav>
            </AdaptiveLensBar>
          )}
        </div>
      </header>
      <main>
        <section id="top" className="editorial-hero">
          <GlassScene backdrop=".hero-scene video" className="hero-scene">
            <OrbitBackdrop inOrbit={inOrbit} />
            <div className="hero-scrim" />
            <div className="hero-kicker">
              <span>Bakdaulet Sotsial / Portfolio</span>
              <span>Astana, Kazakhstan</span>
            </div>
            <h1 id="archive-title" tabIndex={-1}>
              BAKDAULET
              <br />
              SOTSIAL
            </h1>
            <div className="hero-bottom">
              <p>
                Software Engineering.
                <br />
                Cybersecurity.
                <br />
                Applied Research.
              </p>
              <div className="hero-actions">
                <LensButton
                  onClick={() =>
                    window.dispatchEvent(new Event("replay-launch"))
                  }
                >
                  Initiate Launch <span aria-hidden="true">+</span>
                </LensButton>
                <a href="#missions">Explore Work</a>
              </div>
              <span className="hero-footnote">
                Beyond the interface.
                <br />
                Closer to the work.
              </span>
            </div>
          </GlassScene>
        </section>
        <section className="introduction wrap">
          <span className="eyebrow">An independent practice</span>
          <p className="reveal">
            I build tools to make
            <br />
            complex ideas <span>tangible.</span>
          </p>
          <div className="intro-note">
            From a local-first notebook to numerical experiments.
            <br />A selection of software, systems and questions worth pursuing.
          </div>
        </section>
        <section id="missions" className="selected-work wrap">
          <div className="work-header">
            <h2>
              Selected work<span className="subtle-dot">.</span>
            </h2>
            <div
              className="work-filter"
              role="group"
              aria-label="Filter projects"
            >
              {["All work", "Applications", "Systems & research"].map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="case-list">
            {shown.map((p) => (
              <ProjectPreview
                key={p.id}
                project={p}
                onOpen={() => setSelected(p)}
              />
            ))}
          </div>
        </section>
        <section id="engineering" className="practice">
          <div className="wrap">
            <div className="practice-top">
              <span className="eyebrow">Engineering & research</span>
              <h2 className="reveal">
                The interface
                <br />
                is only the
                <br />
                <span>beginning.</span>
              </h2>
              <p>
                Understand the system.
                <br />
                Make the assumptions visible.
                <br />
                Keep the work open to inspection.
              </p>
            </div>
            <div className="practice-image">
              <Artwork
                src="/assets/site/mission-control"
                alt="An architectural view from a space observatory"
              />
            </div>
            <div className="practice-bottom">
              <p className="practice-intro">
                A developing practice.
                <br />
                Grounded in real projects.
              </p>
              <div className="discipline-list">
                <details open>
                  <summary>
                    Software & systems <span>+</span>
                  </summary>
                  <p>
                    TypeScript interfaces, Python tooling and local desktop
                    applications. InkMath and 1C2API turn specific workflow
                    problems into inspectable tools.
                  </p>
                  <button onClick={() => setSelected(projects[0])}>
                    Explore InkMath
                  </button>
                </details>
                <details>
                  <summary>
                    Algorithms & applied ML <span>+</span>
                  </summary>
                  <p>
                    ORBIT compares PPO with A* in simulation. Qadam connects
                    place retrieval with routing and optional generative
                    assistance. The baseline matters as much as the experiment.
                  </p>
                  <button onClick={() => setSelected(projects[1])}>
                    Explore ORBIT
                  </button>
                </details>
                <details>
                  <summary>
                    Numerical research <span>+</span>
                  </summary>
                  <p>
                    PROMETHEUS explores plane-stress finite elements and SIMP/OC
                    topology optimization. It is a numerical baseline, not
                    certified hardware.
                  </p>
                  <button onClick={() => setSelected(projects[3])}>
                    Read the research scope
                  </button>
                </details>
                <details>
                  <summary>
                    Cybersecurity foundations <span>+</span>
                  </summary>
                  <p>
                    Studying cybersecurity at Astana IT University while
                    developing a practical understanding of systems, their
                    boundaries and their failure modes.
                  </p>
                  <a href="#about">Education & background</a>
                </details>
              </div>
            </div>
          </div>
        </section>
        <section id="open-source" className="open-source wrap">
          <div className="open-source-heading">
            <span className="eyebrow">
              Open source / Educational repositories
            </span>
            <h2 className="reveal">
              Learning,
              <br />
              in public.
            </h2>
            <p>
              Lecture notes and problem solving.
              <br />
              My most-starred educational repositories.
            </p>
          </div>
          <div className="repo-list">
            {educationalRepos.map((repo) => (
              <External
                key={repo.repo}
                className="educational-repo"
                href={`https://github.com/Smrbruh/${repo.repo}`}
              >
                <span className="math-symbol" aria-hidden="true">
                  {repo.symbol}
                </span>
                <div>
                  <h3>{repo.name}</h3>
                  <p>{repo.subtitle}</p>
                </div>
                <Stars repo={repo.repo} />
              </External>
            ))}
          </div>
        </section>
        <section id="about" className="about wrap">
          <div className="about-name">
            <span className="eyebrow">A little background</span>
            <h2>
              Bakdaulet
              <br />
              Sotsial.
            </h2>
            <p>Also known as smrbruh.</p>
          </div>
          <div className="about-content">
            <p className="about-lead reveal">
              A student of systems.
              <br />A builder by practice.
            </p>
            <p>
              I’m a second-year Cybersecurity student at Astana IT University in
              Kazakhstan. I work across desktop software, developer tools,
              robotics simulation and numerical research.
            </p>
            <p>
              Each project starts with something I want to understand—and
              becomes something others can inspect, run and question.
            </p>
            <dl className="background-list">
              <div>
                <dt>Education</dt>
                <dd>
                  Astana IT University
                  <span>BSc Cybersecurity · Second year</span>
                </dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>
                  Independent project work
                  <span>Open-source tools, applications and experiments</span>
                </dd>
              </div>
              <div>
                <dt>Research</dt>
                <dd>
                  Numerical methods & applied ML
                  <span>
                    Finite elements, topology optimization and navigation
                  </span>
                </dd>
              </div>
              <div>
                <dt>Résumé</dt>
                <dd>
                  <External href="https://t.me/stcrs">Request a copy</External>
                  <span>Available on request; no PDF published here.</span>
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <section id="contact" className="contact">
          <div className="wrap">
            <span className="eyebrow">Start a conversation</span>
            <h2 className="reveal">
              Let’s make
              <br />
              something
              <br />
              <em>worth building.</em>
            </h2>
            <div className="contact-bottom">
              <p>
                A useful tool. A difficult question.
                <br />
                An idea that needs a second perspective.
              </p>
              <div className="contact-links">
                <External href="https://t.me/stcrs">
                  Telegram <span>@stcrs</span>
                </External>
                <External href="https://www.linkedin.com/in/bakdaulet-sotsial-06a16b377/">
                  LinkedIn <span>Bakdaulet Sotsial</span>
                </External>
                <External href="https://github.com/Smrbruh">
                  GitHub <span>@Smrbruh</span>
                </External>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="wrap">
        <a href="#top" className="wordmark">
          smrbruh<span>.</span>
        </a>
        <span>© {new Date().getFullYear()} Bakdaulet Sotsial</span>
        <a href="#top">Back to top</a>
      </footer>
      <ProjectDossier project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
