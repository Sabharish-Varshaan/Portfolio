import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Terminal from "@/components/Terminal";
import { TechTile, TechChip } from "@/components/TechCube";
import TwinChat from "@/components/TwinChat";
import {
  profile, about, principles, stack, journey, certifications, projects, topSkills, languages,
} from "@/lib/data";

function Heading({ idx, title, sub }: { idx: string; title: string; sub?: string }) {
  return (
    <Reveal className="sec-head">
      <span className="eyebrow">{idx}</span>
      <h2>{title}</h2>
      {sub && <p className="muted">{sub}</p>}
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        {/* HERO */}
        <section className="hero wrap">
          <div className="hero-copy">
            <span className="pill"><b className="dot" /> Open to opportunities · {profile.location}</span>
            <h1>
              Sabharish<br />
              <span className="grad">Varshaan S</span>
            </h1>
            <p className="role">{profile.role}</p>
            <p className="lead">{profile.tagline}</p>
            <div className="cta">
              <a className="btn" href="#work">View work <span>→</span></a>
              <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="btn ghost" href={`mailto:${profile.email}`}>Email</a>
            </div>
            <ul className="chips">
              {["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"].map((s) => <TechChip key={s} name={s} />)}
            </ul>
          </div>
          <div className="hero-art"><Terminal /></div>
        </section>

        {/* STATS */}
        <section className="wrap">
          <Reveal className="stats">
            {[
              ["2,500+", "Students served by my platform"],
              ["3", "Production-style projects"],
              ["1y 8m", "Intellects Club (Member to Lead)"],
              ["9.48", "CGPA (B.Tech CSE)"],
            ].map(([v, l]) => (
              <div key={l}><strong>{v}</strong><span>{l}</span></div>
            ))}
          </Reveal>
        </section>

        {/* ABOUT */}
        <section id="about" className="wrap sec">
          <Heading idx="01 / About" title="Engineering for the parts that only show up under real use." />
          <div className="about-grid">
            <Reveal className="about-text">
              {about.map((p) => <p key={p}>{p}</p>)}
            </Reveal>
            <div className="principles">
              {principles.map((p, i) => (
                <Reveal key={p.k} delay={i * 90} className="card">
                  <span className="k">{p.k}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="wrap sec">
          <Heading idx="02 / Stack" title="Tools I reach for." sub="Core stack: Python, FastAPI, PostgreSQL, Redis, SQLAlchemy, REST, JWT/RBAC, Docker, Git." />
          <Reveal className="topskills">
            <span className="mono sm">Top skills</span>
            {topSkills.map((s) => <b key={s}>{s}</b>)}
            <span className="mono sm lang">Languages</span>
            {languages.map((l) => <b key={l.name}>{l.name} <em>{l.level}</em></b>)}
          </Reveal>
          <div className="stack-grid">
            {stack.map((g, i) => (
              <Reveal key={g.group} delay={i * 80} className="card">
                <h3 className="mono sm">{g.group}</h3>
                <ul className="tiles">
                  {g.items.map((t) => <TechTile key={t} name={t} />)}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="wrap sec">
          <Heading idx="03 / Career journey" title="From member to lead engineer." />
          <ol className="timeline">
            {journey.map((j, i) => (
              <Reveal as="li" key={j.title + j.when} delay={i * 80}>
                <span className="node" />
                <div className="tl-card">
                  <div className="tl-top">
                    <span className="mono when">{j.when}</span>
                    <span className="tag">{j.tag}</span>
                  </div>
                  <h3>{j.title}</h3>
                  <p className="org">{j.org}</p>
                  <p>{j.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="certs">
            <h3 className="mono sm">Certifications</h3>
            <ul>
              {certifications.map((c) => <li key={c}><span>✓</span>{c}</li>)}
            </ul>
          </Reveal>
        </section>

        {/* WORK */}
        <section id="work" className="wrap sec">
          <Heading idx="04 / Work" title="Selected work." sub="Three backend-heavy systems, from campus infrastructure to claims automation and clinical decision support." />
          <div className="proj-list">
            {projects.map((p, i) => (
              <Reveal key={p.n} delay={i * 80} className="proj">
                <div className="proj-main">
                  <span className="mono n">{p.n}</span>
                  <span className="eyebrow">{p.kind}</span>
                  <h3>{p.title}</h3>
                  <p className="desc">{p.desc}</p>
                  <ul className="pts">
                    {p.points.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
                <div className="proj-side">
                  <ul className="tchips">{p.stack.map((t) => <TechChip key={t} name={t} />)}</ul>
                  <a className="btn ghost btn-sm" href={p.link} target="_blank" rel="noreferrer">{p.linkLabel}</a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="wrap sec">
          <Reveal className="contact">
            <span className="eyebrow">05 / Contact</span>
            <h2>Let&apos;s build something <span className="grad">reliable</span>.</h2>
            <p className="muted">Open to backend internships, SDE roles and technical collaborations.</p>
            <div className="cta center">
              <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
              <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </Reveal>
        </section>
      </main>
      <TwinChat />
      <footer className="wrap foot">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="mono">Chennai · Built with Next.js</span>
      </footer>
    </>
  );
}
