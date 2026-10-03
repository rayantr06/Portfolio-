import Image from "next/image";
import { profile } from "@/lib/content/profile";
import { buildProjectSeed } from "@/lib/content/projectsSeed";
import styles from "./portfolio.module.css";

export const metadata = {
  title: "Rayan Terki — Software Developer",
  description: "Software developer in Canada. Selected projects in Python, C# and TypeScript, from web applications to backend APIs and model integration.",
  openGraph: { title: "Rayan Terki — Software Developer", description: "Selected projects and personal software development contributions.", type: "profile", firstName: "Rayan", lastName: "Terki" },
};

const visuals = {
  "lidal-pulse": { image: "lidal-pulse-preview", alt: "LIDAL Pulse explorer with simulated test data", note: "Prototype · test data" },
  ouiagent: { image: "ouiagent-preview", alt: "OuiAgent public website", note: "Public website" },
  "alerte-ia": { image: "alerte-ia-blue", alt: "Alerte IA research prototype illustration: audio becomes structured information", note: "Project illustration" },
  safar: { image: "safar-interface", alt: "Safar DZ public website with its travel category carousel", note: "Public website" },
  "let-data-dz": { image: "let-data-dz-form", alt: "Let-Data-DZ audio collection form: role and scenario theme selection", note: "Public collection form" },
  "gestion-tournoi-golf": { image: "golf-interface", alt: "FairwayElite golf tournament interface preview from the project repository", note: "Repository UI preview" },
};

const descriptions = {
  "lidal-pulse": "A collaborative marketing intelligence application. I connect Python/FastAPI services with React/TypeScript interfaces, multilingual NLP workflows and language models.",
  ouiagent: "A bilingual marketplace for clients and independent security agents. I contribute to the Next.js application, including agent discovery, booking and account workflows.",
  "alerte-ia": "A collaborative emergency-call research prototype. I develop collection and annotation tools, integrate models, and contribute to the operator interface for transcription and structured incident information.",
  safar: "A collaborative travel and booking platform with client, partner and admin interfaces. My contributions include authentication routes and fixes to partner booking rendering.",
  "let-data-dz": "Browser-based audio collection connected to Drive and Sheets. I work on browser recording and collection workflows using HTML, CSS, JavaScript and Apps Script.",
  "gestion-tournoi-golf": "A team ASP.NET Core MVC application. My contributions include interface improvements, database query fixes, integration tests and PostgreSQL deployment adjustments.",
};

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>;
}

function SocialIcon({ type }) {
  if (type === "github") return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.57 9.57 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.69-4.56 4.94.36.31.68.92.68 1.86v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>;
  if (type === "linkedin") return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3ZM6.5 7.7a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-3v-5.2c0-1.4-.6-2-1.6-2-1.1 0-1.7.8-1.7 2V19h-3V9h2.9v1.4A3.2 3.2 0 0 1 15.5 9c2.2 0 3.5 1.4 3.5 4.2Z" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

function ExternalLink({ href, children, className }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<Arrow /></a>;
}

function Project({ project, index }) {
  const visual = visuals[project.slug];
  const url = project.githubUrl || project.demoUrl;
  return (
    <article className={styles.project} id={project.slug}>
      <figure className={styles.thumbnail}>
        <Image src={`/project-images/${visual.image}.png`} alt={visual.alt} width={336} height={192} priority={index < 2} sizes="(max-width: 639px) 200px, 128px" />
        <figcaption>{visual.note}</figcaption>
      </figure>
      <div className={styles.projectBody}>
        <h3>{url ? <ExternalLink href={url}>{project.title}</ExternalLink> : project.title}</h3>
        <p>{descriptions[project.slug]}</p>
        {project.slug === "alerte-ia" && <p className={styles.prototypeStatus}>Research prototype · Public code forthcoming</p>}
        <ul className={styles.tags} aria-label={`${project.title} technologies`}>
          {project.technologies.split(", ").map(tech => <li key={tech}>{tech}</li>)}
        </ul>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  return (
    <div className={styles.page} id="top" data-portfolio-page>
      <a className={styles.skip} href="#content">Skip to content</a>
      <div className={styles.spotlight} data-spotlight aria-hidden="true" />
      <div className={styles.layout}>
        <header className={styles.header}>
          <div>
            <Image className={styles.avatar} src="/profile-rayan.png" alt="Rayan Terki" width={64} height={64} priority />
            <h1><a href="#top">Rayan Terki</a></h1>
            <h2>Software Developer</h2>
            <p className={styles.intro}>I build web applications and backend APIs with Python, C# and TypeScript.</p>
            <p className={styles.location}>Based in Canada</p>
            <nav className={styles.nav} aria-label="Page sections">
              {[['about','About'],['work','Projects'],['skills','Skills'],['education','Education'],['contact','Contact']].map(([id,label],i)=><a key={id} href={`#${id}`} aria-current={i===0 ? 'location' : undefined} data-section-link={id}><span className={styles.navLine} /><span>{label}</span></a>)}
            </nav>
          </div>
          <ul className={styles.socials} aria-label="Social links">
            <li><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><SocialIcon type="github" /></a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><SocialIcon type="linkedin" /></a></li>
            <li><a href={`mailto:${profile.email}`} aria-label="Email Rayan"><SocialIcon type="email" /></a></li>
          </ul>
        </header>
        <main className={styles.main} id="content">
          <section className={styles.section} id="about" aria-labelledby="about-heading" data-section>
            <h2 className={styles.sectionHeading} id="about-heading">About</h2>
            <div className={styles.about}>
              <p>I’m Rayan, a software developer based in Canada. I work with <strong>Python, C# and TypeScript</strong> to build web applications, backend APIs and tools that connect data with everyday workflows.</p>
              <p>My recent work includes <a href="#lidal-pulse">LIDAL Pulse</a>, a marketing intelligence application, and <a href="#ouiagent">OuiAgent</a>, a bilingual security marketplace. I also contribute to <a href="#alerte-ia">Alerte IA</a>, a research prototype for emergency-call transcription and incident information. In these collaborative projects, my role is software development.</p>
              <p>I earned my <strong>Computer Programming diploma at La Cité</strong> after two years of preparatory studies at ESTIN in Béjaïa. I’m interested in backend, full-stack and applied AI development roles in Canada.</p>
            </div>
          </section>
          <section className={styles.section} id="work" aria-labelledby="work-heading" data-section>
            <h2 className={styles.sectionHeading} id="work-heading">Projects</h2>
            <div className={styles.projectList}>{buildProjectSeed().map((project,index)=><Project key={project.slug} project={project} index={index} />)}</div>
            <ExternalLink href={profile.github} className={styles.moreLink}>More on GitHub</ExternalLink>
          </section>
          <section className={styles.section} id="skills" aria-labelledby="skills-heading" data-section>
            <h2 className={styles.sectionHeading} id="skills-heading">Skills</h2>
            <div className={styles.rows}>{profile.skillGroups.map(group=><article className={styles.row} key={group.name}><p className={styles.rowLabel}>{group.name}</p><ul className={styles.tags} aria-label={group.name}>{group.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div>
          </section>
          <section className={styles.section} id="education" aria-labelledby="education-heading" data-section>
            <h2 className={styles.sectionHeading} id="education-heading">Education</h2>
            <div className={styles.rows}>{profile.education.map(item=><article className={styles.row} key={item.school}><p className={styles.rowLabel}>{item.dates}</p><div><h3>{item.school}</h3><p className={styles.educationProgram}>{item.program}</p><p className={styles.credential}>{item.credential}</p></div></article>)}</div>
          </section>
          <section className={styles.section} id="contact" aria-labelledby="contact-heading" data-section>
            <h2 className={styles.sectionHeading} id="contact-heading">Contact</h2>
            <p className={styles.contactIntro}>For opportunities in backend, full-stack or applied AI development, you can reach me by email or on LinkedIn.</p>
            <a className={styles.emailLink} href={`mailto:${profile.email}`}>{profile.email}<Arrow /></a>
            <ExternalLink className={styles.moreLink} href={profile.linkedin}>Connect on LinkedIn</ExternalLink>
          </section>
          <footer className={styles.footer}>Built with Next.js. Set in Inter. Hosted on GitHub Pages.<br />Layout inspired by <a href="https://brittanychiang.com/" target="_blank" rel="noopener noreferrer">Brittany Chiang</a>.</footer>
        </main>
      </div>
    </div>
  );
}
