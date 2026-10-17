"use client";
import { useEffect, useState } from "react";

const links = [
  ["About", "#about"],
  ["Stack", "#stack"],
  ["Journey", "#journey"],
  ["Work", "#work"],
  ["Contact", "#contact"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#top" className="brand">
        <span className="brand-mark">SV</span>
        <span className="brand-name">Sabharish Varshaan</span>
      </a>
      <nav>
        {links.map(([l, h]) => (
          <a key={h} href={h}>{l}</a>
        ))}
      </nav>
      <a className="btn btn-sm" href="#contact">Let&apos;s talk</a>
    </header>
  );
}
