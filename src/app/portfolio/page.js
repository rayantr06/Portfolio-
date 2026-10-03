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
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children} <span aria-hidden="true">↗</span></a>;
}

export default function PortfolioPage() {
  const projects = buildProjectSeed();

  return (
    <div className={styles.page} lang="en" id="top">
      <a href="#main" className={styles.skip}>Skip to content</a>
      <header className={styles.header}>
        <a href="#top" className={styles.brand}><span className={styles.monogram}>rt.</span><span>Rayan Terki</span></a>
        <nav aria-label="Portfolio navigation" className={styles.nav}>
          <a href="#work">Selected work</a><a href="#skills">Skills</a><a href="#about">About</a>
          <a href="#contact" className={styles.navContact}>Let’s connect <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main id="main">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.profileRow}>
            <Image src="/profile-rayan.png" alt="Rayan Terki" width={88} height={88} sizes="88px" priority className={styles.avatar} />
            <div className={styles.identity}>
              <h1 id="hero-title">Rayan Terki</h1>
              <p className={styles.role}>Software Developer</p>
              <p className={styles.focus}>Python · C# · TypeScript <span>· Full-Stack &amp; Applied AI</span></p>
              <p className={styles.location}><span className={styles.dot} />Based in Canada</p>
            </div>
            <div className={styles.actions}><a href="#work" className={styles.primary}>View projects <span aria-hidden="true">↓</span></a><ExternalLink href={profile.github} className={styles.textLink}>GitHub</ExternalLink><ExternalLink href={profile.linkedin} className={styles.textLink}>LinkedIn</ExternalLink></div>
          </div>
          <p className={styles.lead}>I build web applications, backend APIs and software tools that connect data, models and user workflows. My role in collaborative projects is software development.</p>
        </section>

        <section id="work" className={styles.section} aria-labelledby="work-title">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>01 / Selected work</p><h2 id="work-title">Selected projects</h2><p>Collaborative projects. Personal engineering contributions.</p></div>
          <div className={styles.projectGrid}>
            {projects.map((project, index) => (
              <article key={project.slug} className={styles.project}>
                <Image src={`/project-images/${project.slug}.png`} alt={`Illustration for ${project.title}`} width={1280} height={640} sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw" className={styles.projectImage} />
                <div className={styles.projectBody}>
                <div className={styles.cardTop}><span>{project.category}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
                <h3>{project.title}</h3><p className={styles.description}>{project.shortDescription}</p>
                <div className={styles.contribution}><h4>My contribution</h4><p>{project.role}</p></div>
                <ul className={styles.tags} aria-label={`${project.title} technologies`}>
                  {project.technologies.split(",").map(technology => <li key={technology}>{technology.trim()}</li>)}
                </ul>
                <div className={styles.cardLink}>
                  {project.githubUrl ? <ExternalLink href={project.githubUrl}>View repository</ExternalLink> : project.demoUrl ? <ExternalLink href={project.demoUrl}>Visit website</ExternalLink> : <span>Research prototype</span>}
                </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className={`${styles.section} ${styles.skills}`} aria-labelledby="skills-title">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>02 / Technical toolkit</p><h2 id="skills-title">Technologies</h2></div>
          <div className={styles.skillGrid}>{profile.skillGroups.map(group => <div key={group.name}><h3>{group.name}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
        </section>

        <section id="about" className={`${styles.section} ${styles.about}`} aria-labelledby="about-title">
          <div><p className={styles.eyebrow}>03 / About me</p><h2 id="about-title">About</h2><div className={styles.bio}>{profile.summary.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div>
          <div className={styles.education}><h3>Education</h3>{profile.education.map(item => <article key={item.school}><p className={styles.dates}>{item.dates}</p><h4>{item.school}</h4><p>{item.program}</p><p className={styles.credential}>{item.credential}</p></article>)}</div>
        </section>

        <section id="contact" className={styles.contact} aria-labelledby="contact-title">
          <p className={styles.eyebrow}>04 / Let’s connect</p><h2 id="contact-title">Let’s build something.</h2><p>{profile.availability}.</p>
          <div className={styles.contactLinks}><a href={`mailto:${profile.email}`} className={styles.primary}>Email me <span aria-hidden="true">↗</span></a><ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink><ExternalLink href={profile.github}>GitHub</ExternalLink></div>
        </section>
      </main>
      <footer className={styles.footer}><span>Rayan Terki · Software Developer</span><a href="#top">Back to top <span aria-hidden="true">↑</span></a></footer>
    </div>
  );
}
