import Image from "next/image";
import { profile } from "@/lib/content/profile";
import { buildProjectSeed } from "@/lib/content/projectsSeed";
import styles from "./portfolio.module.css";

export const metadata = {
  title: "Rayan Terki — Software Developer",
  description: "Software developer based in Canada. Python, C# and TypeScript; web applications, backend APIs and applied AI software.",
  openGraph: { title: "Rayan Terki — Software Developer", description: "Selected software projects, personal contributions and technical skills.", type: "profile", firstName: "Rayan", lastName: "Terki" },
};

function ExternalLink({ href, children, className }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<span aria-hidden="true">↗</span></a>;
}

const projectVisuals = {
  "lidal-pulse": { image: "lidal-pulse-preview", alt: "LIDALPulse explorer interface using simulated test data", note: "Prototype interface · simulated test data", code: "LP", theme: "lidal" },
  ouiagent: { image: "ouiagent-preview", alt: "Public OuiAgent website: agent discovery and booking", note: "Public website", code: "OA", theme: "oui" },
  "alerte-ia": { image: "alerte-ia", alt: "Illustration of audio and structured information for Alerte IA", note: "Project illustration", code: "AI", theme: "alerte", label: "Voice to structured information", stack: "FastAPI / Next.js" },
  safar: { image: "safar", alt: "Travel illustration for Safar", note: "Project illustration", code: "SF", theme: "safar", label: "Travel & booking workflows", stack: "Client / Partner / Admin" },
  "let-data-dz": { image: "let-data-dz-preview", alt: "Public Let-Data-DZ collection form with empty fields", note: "Public collection form", code: "LD", theme: "data" },
  "gestion-tournoi-golf": { image: "gestion-tournoi-golf", alt: "Golf illustration for the tournament management application", note: "Project illustration", code: "G06", theme: "golf", label: "Golf Tournament Management", stack: "C# / ASP.NET Core MVC" },
};

function ProjectVisual({ project, priority = false }) {
  const visual = projectVisuals[project.slug];
  return (
    <figure className={[styles.visual, styles[visual.theme], visual.label ? styles.illustrated : styles.capture].join(" ")}>
      {visual.label ? (
        <div className={styles.coverIdentity}>
          <span className={styles.coverCode}>{visual.code}</span><p>{visual.label}</p><span className={styles.coverStack}>{visual.stack}</span>
        </div>
      ) : <div className={styles.windowBar} aria-hidden="true"><span /><span /><span /><p>{project.title}</p><span className={styles.windowArrow}>↗</span></div>}
      <Image src={"/project-images/" + visual.image + ".png"} alt={visual.alt} width={visual.image === "lidal-pulse-preview" ? 1440 : visual.image === "let-data-dz-preview" ? 480 : 1280} height={visual.image === "lidal-pulse-preview" ? 1782 : visual.image === "let-data-dz-preview" ? 690 : 640} sizes="(max-width: 680px) 90vw, (max-width: 1000px) 45vw, 33vw" priority={priority} className={styles.projectImage} />
      <figcaption>{visual.note}</figcaption>
    </figure>
  );
}

export default function PortfolioPage() {
  const projects = buildProjectSeed();
  return (
    <div className={styles.page} lang="en" id="top">
      <a href="#main" className={styles.skip}>Skip to content</a>
      <header className={styles.header}>
        <a href="#top" className={styles.brand} aria-label="Rayan Terki, back to top"><span className={styles.monogram}>rt<span>.</span></span><span>DEVELOPER PORTFOLIO</span></a>
        <div className={styles.headerRight}><span className={styles.location}><span className={styles.dot} />CANADA</span><a href={"mailto:" + profile.email}>LET’S TALK <span aria-hidden="true">↗</span></a></div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Profile and navigation">
          <div className={styles.profileCard}>
            <div className={styles.identity}>
              <Image src="/profile-rayan.png" alt="Rayan Terki" width={76} height={76} sizes="76px" priority className={styles.avatar} />
              <div><p className={styles.profileName}>Rayan Terki<span aria-hidden="true">.</span></p><p className={styles.role}>Software Developer</p></div>
            </div>
            <p className={styles.profileFocus}>Full-Stack Development<br />&amp; Applied AI</p>
            <p className={styles.availability}><span className={styles.dot} />Open to roles in Canada</p>
            <nav aria-label="Portfolio navigation" className={styles.nav}>
              <a href="#work"><span><small>01</small> Selected work</span><span aria-hidden="true">↗</span></a>
              <a href="#skills"><span><small>02</small> Technical toolkit</span><span aria-hidden="true">↗</span></a>
              <a href="#about"><span><small>03</small> About &amp; education</span><span aria-hidden="true">↗</span></a>
            </nav>
            <div className={styles.socials}><ExternalLink href={profile.github}>GitHub</ExternalLink><ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink></div>
            <a href={"mailto:" + profile.email} className={styles.profileContact}>Get in touch <span aria-hidden="true">↗</span></a>
          </div>
          <p className={styles.sidebarNote}>Web applications.<br />Backend APIs.<br />Model integration.</p>
        </aside>

        <main id="main" className={styles.main}>
          <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.heroTop}><p className={styles.eyebrow}>SOFTWARE / FULL-STACK / APPLIED AI</p></div>
            <h1 id="hero-title">Software <span>Developer.</span></h1>
            <div className={styles.heroBottom}><p>I build web applications, backend APIs and tools that connect data, models and user workflows.</p><a href="#work" className={styles.circleLink} aria-label="Explore selected projects"><span aria-hidden="true">↓</span></a></div>
            <div className={styles.techStrip}><span>Python</span><span>C#</span><span>TypeScript</span><span className={styles.techDetail}>SERVICES → INTERFACES → WORKFLOWS</span></div>
          </section>

          <section id="work" className={styles.section} aria-labelledby="work-title">
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>01 / SELECTED WORK</p><h2 id="work-title">Selected projects<span>.</span></h2></div><p className={styles.sectionCount}>06 PROJECTS</p></div>
            <p className={styles.sectionIntro}>Collaborative projects, with my software development contributions.</p>
            <div className={styles.projectGrid}>
              {projects.map((project, index) => (
                <article key={project.slug} className={styles.project} id={"project-" + project.slug}>
                  <ProjectVisual project={project} priority={index < 2} />
                  <div className={styles.projectBody}>
                    <div className={styles.cardTop}><span>{project.category}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
                    <h3>{project.title}</h3><p className={styles.description}>{project.shortDescription}</p>
                    <div className={styles.contribution}><h4>My contribution</h4><p>{project.role}</p></div>
                    <ul className={styles.tags} aria-label={project.title + " technologies"}>{project.technologies.split(",").map(technology => <li key={technology}>{technology.trim()}</li>)}</ul>
                    <div className={styles.cardLink}>{project.githubUrl ? <ExternalLink href={project.githubUrl}>View repository</ExternalLink> : project.demoUrl ? <ExternalLink href={project.demoUrl}>Visit website</ExternalLink> : <span>Research prototype</span>}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" className={styles.section} aria-labelledby="skills-title">
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>02 / TECHNICAL TOOLKIT</p><h2 id="skills-title">Technical toolkit<span>.</span></h2></div></div>
            <div className={styles.skillGrid}>{profile.skillGroups.map((group, index) => <div className={styles.skillGroup} key={group.name}><span className={styles.skillNumber}>0{index + 1}</span><div><h3>{group.name}</h3><p>{group.items.join(" · ")}</p></div></div>)}</div>
          </section>

          <section id="about" className={styles.section + " " + styles.about} aria-labelledby="about-title">
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>03 / BACKGROUND</p><h2 id="about-title">About &amp; education<span>.</span></h2></div></div>
            <div className={styles.aboutGrid}><div className={styles.bio}>{profile.summary.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><div className={styles.education}><h3>Education</h3>{profile.education.map(item => <article key={item.school}><p className={styles.dates}>{item.dates}</p><h4>{item.school}</h4><p>{item.program}</p><p className={styles.credential}>{item.credential}</p></article>)}</div></div>
          </section>

          <section id="contact" className={styles.contact} aria-labelledby="contact-title"><p className={styles.eyebrow}>HAVE AN OPPORTUNITY IN MIND?</p><div className={styles.contactHeading}><h2 id="contact-title">Let’s connect<span>.</span></h2><a href={"mailto:" + profile.email} className={styles.circleLink} aria-label="Email Rayan Terki"><span aria-hidden="true">↗</span></a></div><p>{profile.availability}.</p><div className={styles.contactLinks}><a href={"mailto:" + profile.email}>{profile.email}<span aria-hidden="true">↗</span></a><ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink><ExternalLink href={profile.github}>GitHub</ExternalLink></div></section>
        </main>
      </div>
      <footer className={styles.footer}><span>RAYAN TERKI · SOFTWARE DEVELOPER</span><a href="#top">BACK TO TOP <span aria-hidden="true">↑</span></a></footer>
    </div>
  );
}
