import {
  siPython, siFastapi, siSqlalchemy, siPostgresql, siRedis, siDocker, siGit, siGithub,
  siReact, siNextdotjs, siTypescript, siSupabase, siScikitlearn, siOllama,
  siJsonwebtokens,
} from "simple-icons";

type Brand = { path: string; hex: string };
const brand = (i: { path: string; hex: string }): Brand => ({ path: i.path, hex: i.hex });

// Official brand marks (simple-icons). Names match the labels used on the site.
const logos: Record<string, Brand> = {
  Python: brand(siPython),
  FastAPI: brand(siFastapi),
  SQLAlchemy: brand(siSqlalchemy),
  PostgreSQL: brand(siPostgresql),
  Redis: brand(siRedis),
  Docker: brand(siDocker),
  Git: brand(siGit),
  GitHub: brand(siGithub),
  React: brand(siReact),
  "Next.js": brand(siNextdotjs),
  TypeScript: brand(siTypescript),
  Supabase: brand(siSupabase),
  "Scikit-Learn": brand(siScikitlearn),
  "Ollama/Mistral": brand(siOllama),
  JWT: brand(siJsonwebtokens),
  "Stateful JWT": brand(siJsonwebtokens),
  "JWT & RBAC": brand(siJsonwebtokens),
};

// Generic line glyphs (24x24) for concepts that have no brand logo.
const glyphs: Record<string, { d: string; hex: string }> = {
  "REST API design": { hex: "7dffd0", d: "M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" },
  "Database Optimization": { hex: "5b8cff", d: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" },
  "Data Structures & Algorithms": { hex: "b6ff3b", d: "M12 4v4m0 0-6 5m6-5 6 5M6 13v3m12-3v3M10 4h4v4h-4zM4 16h4v4H4zm12 0h4v4h-4z" },
  RBAC: { hex: "b6ff3b", d: "M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Zm-3 9 2.2 2.2L15.5 10" },
  Authentication: { hex: "b6ff3b", d: "M7 11V8a5 5 0 0 1 10 0v3M5 11h14v9H5zM12 15v2" },
  "Rate limiting": { hex: "ffb23b", d: "M4 16a8 8 0 1 1 16 0M12 16l4-5M7 16h.01M17 16h.01M12 8v.01" },
  FAISS: { hex: "5b8cff", d: "M4 6h16M4 12h10M4 18h6m6-4 4 4m-2.5-6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" },
  APScheduler: { hex: "5b8cff", d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2" },
};

const lum = (hex: string) => {
  const n = parseInt(hex, 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
};

export function TechCube({ name, size = 44 }: { name: string; size?: number }) {
  const b = logos[name];
  const g = glyphs[name];
  const hex = b ? b.hex : g ? g.hex : "b6ff3b";
  // Near-black brand colours vanish on a dark cube, so those get a light cube with the dark logo.
  const dark = lum(hex) < 0.3;
  const color = "#" + hex;
  const mark = b ? (
    <svg viewBox="0 0 24 24" fill={color}><path d={b.path} /></svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={g ? g.d : "M12 3 4 7v10l8 4 8-4V7l-8-4Z"} />
    </svg>
  );
  return (
    <span className={`cube${dark ? " on-light" : ""}`} aria-hidden="true" style={{ "--s": `${size}px`, "--c": color } as React.CSSProperties}>
      <span className="cube-in">
        <i className="f front">{mark}</i>
        <i className="f back">{mark}</i>
        <i className="f right">{mark}</i>
        <i className="f left">{mark}</i>
        <i className="f top">{mark}</i>
        <i className="f bottom">{mark}</i>
      </span>
    </span>
  );
}

export function TechTile({ name }: { name: string }) {
  return (
    <li className="tile" title={name}>
      <TechCube name={name} size={46} />
      <span>{name}</span>
    </li>
  );
}

export function TechChip({ name }: { name: string }) {
  return (
    <li className="tchip" title={name}>
      <TechCube name={name} size={18} />
      <span>{name}</span>
    </li>
  );
}
