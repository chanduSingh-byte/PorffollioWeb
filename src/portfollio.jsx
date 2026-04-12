import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { id: "home", label: "Home", num: "01", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: "about", label: "About", num: "02", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { id: "skills", label: "Skills", num: "03", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: "projects", label: "Projects", num: "04", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { id: "contact", label: "Contact", num: "05", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
];

const ROLES = ["Web Developer", "API Developer", "FullStack Developer", "Apps Script Developer"];

const SKILLS = [
  { name: "HTML / CSS / JS", level: 92, color: "#f7df1e" },
  { name: "React / JSX", level: 85, color: "#61dafb" },
  { name: "Google Apps Script", level: 88, color: "#34a853" },
  { name: "Tailwind CSS", level: 90, color: "#38bdf8" },
  { name: "Node.js", level: 75, color: "#68a063" },
  { name: "Python", level: 70, color: "#3572a5" },
];

const TOOLS = ["SweetAlert2", "AOS", "Vite", "Git", "Google Sheets", "Firebase", "Electron", "Figma"];

const PROJECTS = [
  { title: "Ludo Supreme", desc: "Full-featured browser Ludo game with AI opponents, animated tokens, dice physics, and multiplayer mode.", tags: ["JS", "Canvas", "Game AI"], color: "#ff6b6b", icon: "♟", link: "#" },
  { title: "Mind Hub", desc: "Multi-game arcade hub with 6+ mini-games, distinct themed interfaces, leaderboards, and sound effects.", tags: ["React", "CSS", "Audio API"], color: "#ffd93d", icon: "🧩", link: "#" },
  { title: "Rework Entry Form", desc: "Internal QC tool with cascading dropdowns (Process→Part→Jobcard), Google Sheets integration via Apps Script API.", tags: ["Apps Script", "HTML", "GSheets"], color: "#6bcb77", icon: "📋", link: "#" },
  { title: "MailCraft", desc: "Node.js/Express email sender app with dark-themed UI, HTML email templates, and batch dispatch.", tags: ["Node.js", "Express", "Nodemailer"], color: "#4d96ff", icon: "✉", link: "#" },
  { title: "IT Support Portal", desc: "Rebuilt IT ticketing system with Tailwind, SweetAlert2, AOS animations, and real-time status tracking.", tags: ["Tailwind", "SweetAlert2", "AOS"], color: "#c77dff", icon: "🖥", link: "#" },
  { title: "GitHub Cheatsheet", desc: "Interactive daily-use Git & GitHub commands reference with search, copy-to-clipboard, and category filters.", tags: ["React", "Vite", "Tailwind"], color: "#ff9a3c", icon: "📖", link: "#" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Twitter", href: "https://twitter.com/" },
  { label: "Email", href: "mailto:chandan@example.com" },
];

// ─── CUSTOM CURSOR ─────────────────────────────────────────────────────────────
function Cursor() {
  const [pos, setPos] = useState({ x: -99, y: -99 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => setBig(!!e.target.closest("a,button"));
    const onOut = () => setBig(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);
  const base = {
    position: "fixed", pointerEvents: "none", zIndex: 9999,
    borderRadius: "50%", mixBlendMode: "difference",
  };
  return (
    <>
      <div style={{ ...base, width: 9, height: 9, background: "var(--ac)", left: pos.x - 4, top: pos.y - 4, transform: big ? "scale(2.6)" : "scale(1)", transition: "transform .1s, left .04s, top .04s" }} />
      <div style={{ ...base, width: 34, height: 34, border: `1.5px solid ${big ? "rgba(0,245,160,.75)" : "rgba(0,245,160,.38)"}`, left: pos.x - 17, top: pos.y - 17, transform: big ? "scale(1.5)" : "scale(1)", transition: "transform .18s, left .1s, top .1s, border-color .2s" }} />
    </>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ dark, toggleDark, activeSection, scrollPct }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 500, background: dark ? "rgba(8,12,16,0.84)" : "rgba(244,247,252,0.86)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", borderBottom: "1px solid var(--bd)", transition: "background .35s" }}>

      {/* Rainbow shimmer top bar */}
      <div style={{ height: 2, background: "linear-gradient(90deg,var(--ac),var(--ac2),var(--ac3))", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)", animation: "shimmer 2.5s linear infinite" }} />
      </div>

      {/* Scroll progress bar */}
      <div style={{ height: 2, background: "linear-gradient(90deg,var(--ac),var(--ac2))", width: `${scrollPct}%`, transition: "width .1s linear" }} />

      {/* Main nav row */}
      <div style={{ height: 58, padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>

        {/* Logo + Status */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: 17, background: "linear-gradient(135deg,var(--ac),var(--ac2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.5px" }}>&lt;CS/&gt;</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 9px", background: "rgba(0,245,160,.07)", border: "1px solid rgba(0,245,160,.18)", borderRadius: 999, fontFamily: "var(--fm)", fontSize: 10, color: "var(--ac)", whiteSpace: "nowrap" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ac)", animation: "pulse 1.6s ease-in-out infinite", flexShrink: 0, display: "inline-block" }} />
            Open to work
          </div>
        </div>

        {/* Center links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2, background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 12, padding: 4 }}>
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 13px", borderRadius: 9,
                fontFamily: "var(--fm)", fontSize: 11.5,
                color: activeSection === l.id ? "var(--ac)" : "var(--mu)",
                background: activeSection === l.id ? "rgba(0,245,160,.09)" : "transparent",
                border: activeSection === l.id ? "1px solid rgba(0,245,160,.2)" : "1px solid transparent",
                transition: "all .22s", whiteSpace: "nowrap", textDecoration: "none",
              }}
            >
              <span style={{ opacity: activeSection === l.id ? 1 : 0.6, display: "flex" }}>{l.icon}</span>
              <span style={{ display: "none" }} className="nav-label">{l.label}</span>
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <button onClick={toggleDark} title="Toggle theme"
            style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid var(--bd2)", background: "var(--sf)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--mu)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
              {dark
                ? <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                : <><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></>}
            </svg>
          </button>
          <button onClick={() => scrollTo("contact")}
            style={{ padding: "7px 14px", background: "var(--ac)", color: "#000", fontFamily: "var(--fd)", fontWeight: 700, fontSize: 12, border: "none", borderRadius: 9, cursor: "pointer", letterSpacing: ".4px", transition: "all .22s", whiteSpace: "nowrap", flexShrink: 0 }}>
            Hire Me ↗
          </button>
        </div>
      </div>

      {/* Section indicator tabs */}
      <div style={{ height: 28, borderBottom: "1px solid var(--bd)", background: "var(--sf)", display: "flex", alignItems: "stretch", padding: "0 1.5rem", overflow: "hidden" }}>
        {NAV_LINKS.map((l) => (
          <div key={l.id}
            onClick={() => scrollTo(l.id)}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "0 14px", fontFamily: "var(--fm)", fontSize: 10,
              color: activeSection === l.id ? "var(--ac)" : "var(--mu)",
              borderBottom: activeSection === l.id ? "2px solid var(--ac)" : "2px solid transparent",
              transition: "all .22s", cursor: "pointer", whiteSpace: "nowrap",
            }}>
            <span style={{ fontSize: 9, opacity: 0.5 }}>{l.num}</span>
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [typed, setTyped] = useState("");
  const [ri, setRi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = ROLES[ri];
    let t;
    if (!deleting && typed.length < cur.length) t = setTimeout(() => setTyped(cur.slice(0, typed.length + 1)), 62);
    else if (!deleting) { t = setTimeout(() => setDeleting(true), 1900); }
    else if (deleting && typed.length > 0) t = setTimeout(() => setTyped(typed.slice(0, -1)), 34);
    else { setDeleting(false); setRi((ri + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [typed, deleting, ri]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const ringStyle = (size, color, duration, reverse) => ({
    position: "absolute", top: "50%", left: "50%",
    width: size, height: size, borderRadius: "50%",
    border: `1px solid ${color}`,
    transform: "translate(-50%,-50%)",
    animation: `spin ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
    pointerEvents: "none",
  });

  return (
    <section id="home" style={{ minHeight: "calc(100vh - 90px)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "3rem 1.5rem", position: "relative", overflow: "hidden" }}>
      {/* Orbs */}
      {[
        { s: 480, t: "-8%", l: "-12%", c: "rgba(0,245,160,0.055)", d: 0 },
        { s: 380, b: "-5%", r: "-8%", c: "rgba(0,180,255,0.055)", d: -3.5 },
        { s: 280, t: "38%", l: "38%", c: "rgba(124,92,252,0.04)", d: -1.8 },
      ].map((o, i) => (
        <div key={i} style={{ position: "absolute", width: o.s, height: o.s, borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none", top: o.t, left: o.l, bottom: o.b, right: o.r, background: `radial-gradient(circle,${o.c},transparent 70%)`, animation: `floatOrb 7s ease-in-out ${o.d}s infinite` }} />
      ))}
      {/* Rings */}
      <div style={ringStyle(680, "rgba(0,245,160,0.035)", 38, false)} />
      <div style={ringStyle(480, "rgba(0,180,255,0.035)", 24, true)} />
      <div style={{ ...ringStyle(320, "rgba(124,92,252,0.045)", 15, false), borderStyle: "dashed" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 16px", border: "1px solid rgba(0,245,160,.2)", borderRadius: 999, marginBottom: 26, fontFamily: "var(--fm)", fontSize: 11.5, color: "var(--ac)", background: "rgba(0,245,160,.05)", animation: "fUp .6s .1s both" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ac)", animation: "pulse 1.5s ease-in-out infinite", display: "inline-block" }} />
          Available for projects
        </div>

        <h1 style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: "clamp(50px,9.5vw,92px)", lineHeight: 1.04, letterSpacing: "-2.5px", marginBottom: 6, animation: "fUp .6s .2s both" }}>
          Chandan<br />
          <span style={{ background: "linear-gradient(135deg,var(--ac) 0%,var(--ac2) 55%,var(--ac3) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Singh</span>
        </h1>

        <div style={{ height: 42, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, animation: "fUp .6s .3s both" }}>
          <span style={{ fontFamily: "var(--fm)", fontSize: "clamp(14px,2.5vw,20px)", color: "var(--mu)", letterSpacing: ".02em" }}>
            {typed}<span style={{ color: "var(--ac)", animation: "blink 1s step-end infinite" }}>|</span>
          </span>
        </div>

        <p style={{ fontSize: 16.5, color: "var(--mu)", maxWidth: 520, margin: "0 auto 38px", lineHeight: 1.8, fontWeight: 300, animation: "fUp .6s .4s both" }}>
          Building internal tools, browser games & slick UIs at Scherdel India. Turning complex workflows into elegant interfaces.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", animation: "fUp .6s .5s both" }}>
          <button onClick={() => scrollTo("projects")} style={{ padding: "13px 28px", background: "var(--ac)", color: "#000", fontFamily: "var(--fd)", fontWeight: 700, fontSize: 13.5, border: "none", borderRadius: 11, cursor: "pointer", letterSpacing: ".5px", transition: "all .25s" }}>
            View Projects →
          </button>
          <button onClick={() => scrollTo("contact")} style={{ padding: "13px 28px", background: "transparent", color: "var(--tx)", fontFamily: "var(--fd)", fontWeight: 700, fontSize: 13.5, border: "1px solid var(--bd2)", borderRadius: 11, cursor: "pointer", letterSpacing: ".5px", transition: "all .25s" }}>
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: "5.5rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 72, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--fm)", fontSize: 11.5, color: "var(--ac)", letterSpacing: ".18em", marginBottom: 11 }}>01 — ABOUT</div>
          <h2 style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: "clamp(28px,4vw,50px)", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 26 }}>
            Crafting tools<br /><span style={{ color: "var(--mu)" }}>people love</span>
          </h2>
          <p style={{ color: "var(--mu)", lineHeight: 1.9, fontSize: 15, fontWeight: 300, marginBottom: 16 }}>
            I'm an IT Support Developer at Scherdel India, building internal tools, automating workflows, and creating slick interfaces that make people's jobs easier — from QC inspection forms to IT ticketing systems.
          </p>
          <p style={{ color: "var(--mu)", lineHeight: 1.9, fontSize: 15, fontWeight: 300, marginBottom: 24 }}>
            Beyond work, I'm always building — browser games, creative UIs, experimenting with whatever catches my eye. Self-taught, practically focused, always shipping.
          </p>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {["React", "Apps Script", "Node.js", "Tailwind", "HTML/CSS", "Python"].map((t) => (
              <span key={t} style={{ padding: "5px 13px", border: "1px solid var(--bd)", borderRadius: 7, fontFamily: "var(--fm)", fontSize: 11, color: "var(--mu)", background: "var(--sf)" }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", maxWidth: 400, margin: "0 auto", width: "100%" }}>
          <div style={{ width: "100%", aspectRatio: "1", borderRadius: 22, background: "linear-gradient(135deg,rgba(0,245,160,.07),rgba(0,180,255,.07))", border: "1px solid var(--bd)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            {/* Grid pattern */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 26px,rgba(0,245,160,.024) 26px,rgba(0,245,160,.024) 27px),repeating-linear-gradient(90deg,transparent,transparent 26px,rgba(0,245,160,.024) 26px,rgba(0,245,160,.024) 27px)" }} />
            <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: 36 }}>
              {/* Photo */}
              <div style={{ width: 120, height: 120, borderRadius: "50%", border: "2.5px solid rgba(0,245,160,.3)", margin: "0 auto 14px", overflow: "hidden", background: "linear-gradient(135deg,rgba(0,245,160,.12),rgba(0,180,255,.12))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--fd)", fontWeight: 800, fontSize: 40 }}>
                <img
                  src="/src/assets/me.jpeg"
                  alt="Chandan Singh"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                  onError={(e) => { e.target.style.display = "none"; e.target.parentNode.textContent = "CK"; }}
                />
              </div>
              <div style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: 20, background: "linear-gradient(135deg,var(--ac),var(--ac2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 3 }}>Chandan Singh</div>
              <div style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--mu)", letterSpacing: ".13em", marginBottom: 3 }}>IT SUPPORT DEV</div>
              <div style={{ fontFamily: "var(--fm)", fontSize: 10, color: "rgba(0,245,160,.5)", marginBottom: 20 }}>📍 JAIPUR, INDIA</div>
              <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
                {[["3+", "YRS"], ["15+", "PROJECTS"], ["∞", "COFFEE"]].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: 19, color: "var(--ac)" }}>{n}</div>
                    <div style={{ fontFamily: "var(--fm)", fontSize: 9, color: "var(--mu)", marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Floating badges */}
          {[
            { emoji: "⚡", style: { top: -14, right: -14, width: 50, height: 50, fontSize: 18, background: "rgba(0,245,160,.08)", borderColor: "rgba(0,245,160,.18)", animation: "fl2 3.2s ease-in-out infinite" } },
            { emoji: "🛠", style: { bottom: -12, left: -12, width: 42, height: 42, fontSize: 16, background: "rgba(0,180,255,.08)", borderColor: "rgba(0,180,255,.18)", animation: "fl2 4s ease-in-out infinite reverse" } },
          ].map((b) => (
            <div key={b.emoji} style={{ position: "absolute", borderRadius: 11, border: "1px solid", display: "flex", alignItems: "center", justifyContent: "center", ...b.style }}>{b.emoji}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ────────────────────────────────────────────────────────────────────
function Skills() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="skills" style={{ padding: "5.5rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontFamily: "var(--fm)", fontSize: 11.5, color: "var(--ac)", letterSpacing: ".18em", marginBottom: 11 }}>02 — SKILLS</div>
          <h2 style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: "clamp(28px,4vw,50px)", letterSpacing: "-1.5px" }}>Tech I work with</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 11, marginBottom: 20 }}>
          {SKILLS.map((s, i) => (
            <div key={s.name} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ padding: "17px 20px", background: hovered === i ? "var(--sf2)" : "var(--sf)", border: `1px solid ${hovered === i ? "rgba(0,245,160,.2)" : "var(--bd)"}`, borderRadius: 14, transition: "all .28s", transform: hovered === i ? "translateY(-2px)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
                <span style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 14 }}>{s.name}</span>
                <span style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 500, color: s.color }}>{s.level}%</span>
              </div>
              <div style={{ height: 4, background: "rgba(128,128,128,.13)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.level}%`, background: `linear-gradient(90deg,${s.color},${s.color}88)`, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))", gap: 7 }}>
          {TOOLS.map((t) => (
            <div key={t} style={{ padding: "10px 7px", border: "1px solid var(--bd)", borderRadius: 10, textAlign: "center", fontFamily: "var(--fm)", fontSize: 10.5, color: "var(--mu)", background: "var(--sf)", transition: "all .2s", cursor: "default" }}>{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ──────────────────────────────────────────────────────────────────
function Projects() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="projects" style={{ padding: "5.5rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ fontFamily: "var(--fm)", fontSize: 11.5, color: "var(--ac)", letterSpacing: ".18em", marginBottom: 11 }}>03 — PROJECTS</div>
        <h2 style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: "clamp(28px,4vw,50px)", letterSpacing: "-1.5px" }}>Things I've built</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16, maxWidth: 1080, margin: "0 auto" }}>
        {PROJECTS.map((p, i) => (
          <div key={p.title} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{ padding: 24, background: hovered === i ? "var(--sf2)" : "var(--sf)", border: `1px solid ${hovered === i ? p.color + "44" : "var(--bd)"}`, borderRadius: 20, transition: "all .32s", transform: hovered === i ? "translateY(-5px)" : "none", position: "relative", overflow: "hidden" }}>
            {/* Top color bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hovered === i ? `linear-gradient(90deg,${p.color},transparent)` : "transparent", transition: "all .32s", borderRadius: "20px 20px 0 0" }} />
            <div style={{ width: 44, height: 44, borderRadius: 11, background: `${p.color}18`, border: `1px solid ${p.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 13 }}>{p.icon}</div>
            <div style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 16, letterSpacing: "-.4px", marginBottom: 9 }}>{p.title}</div>
            <div style={{ color: "var(--mu)", fontSize: 13, lineHeight: 1.7, fontWeight: 300, marginBottom: 15 }}>{p.desc}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 13 }}>
              {p.tags.map((t) => (
                <span key={t} style={{ padding: "3px 9px", background: `${p.color}12`, border: `1px solid ${p.color}28`, borderRadius: 6, fontFamily: "var(--fm)", fontSize: 10, color: p.color }}>{t}</span>
              ))}
            </div>
            <a href={p.link} style={{ fontFamily: "var(--fm)", fontSize: 11, color: hovered === i ? p.color : "var(--mu)", transition: "color .2s", letterSpacing: ".05em" }}>View Project →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const submit = () => { if (form.name && form.email && form.msg) setSent(true); };
  const inp = { width: "100%", padding: "13px 17px", background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 11, color: "var(--tx)", fontSize: 14.5, fontFamily: "var(--fb)", outline: "none", marginBottom: 11, display: "block", transition: "border .22s" };

  return (
    <section id="contact" style={{ padding: "5.5rem 1.5rem 7rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--fm)", fontSize: 11.5, color: "var(--ac)", letterSpacing: ".18em", marginBottom: 11 }}>04 — CONTACT</div>
        <h2 style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: "clamp(28px,4vw,50px)", letterSpacing: "-1.5px", marginBottom: 16 }}>Let's build something</h2>
        <p style={{ color: "var(--mu)", fontSize: 15.5, fontWeight: 300, marginBottom: 44, lineHeight: 1.78 }}>Open to freelance, collabs, or just a chat about cool projects.</p>

        {sent ? (
          <div style={{ padding: 38, background: "rgba(0,245,160,.05)", border: "1px solid rgba(0,245,160,.2)", borderRadius: 22, animation: "fIn .5s ease" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
            <div style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 19, color: "var(--ac)", marginBottom: 7 }}>Message sent!</div>
            <div style={{ color: "var(--mu)", fontSize: 13.5 }}>I'll get back to you soon.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inp} onFocus={(e) => e.target.style.borderColor = "rgba(0,245,160,.4)"} onBlur={(e) => e.target.style.borderColor = "var(--bd)"} />
            <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inp} onFocus={(e) => e.target.style.borderColor = "rgba(0,245,160,.4)"} onBlur={(e) => e.target.style.borderColor = "var(--bd)"} />
            <textarea placeholder="Tell me about your project..." value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} rows={5} style={{ ...inp, resize: "vertical" }} onFocus={(e) => e.target.style.borderColor = "rgba(0,245,160,.4)"} onBlur={(e) => e.target.style.borderColor = "var(--bd)"} />
            <button onClick={submit} style={{ padding: 14, background: "var(--ac)", color: "#000", fontFamily: "var(--fd)", fontWeight: 700, fontSize: 14.5, border: "none", borderRadius: 11, cursor: "pointer", letterSpacing: ".5px", transition: "all .25s", marginTop: 5 }}>Send Message →</button>
          </div>
        )}

        <div style={{ marginTop: 52, display: "flex", justifyContent: "center", gap: 9, flexWrap: "wrap" }}>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--mu)", padding: "7px 13px", border: "1px solid var(--bd)", borderRadius: 7, background: "var(--sf)", transition: "all .2s" }}>{s.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollPct, setScrollPct] = useState(0);

  const SECS = ["home", "about", "skills", "projects", "contact"];

  useEffect(() => {
    const onScroll = () => {
      const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(Math.round((scrolled / total) * 100));
      let cur = "home";
      SECS.forEach((id) => { const el = document.getElementById(id); if (el && scrolled >= el.offsetTop - 140) cur = id; });
      setActiveSection(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const darkVars = {
    "--bg": "#080c10", "--bg2": "#0d1219",
    "--sf": "rgba(255,255,255,0.04)", "--sf2": "rgba(255,255,255,0.08)",
    "--bd": "rgba(255,255,255,0.07)", "--bd2": "rgba(255,255,255,0.13)",
    "--ac": "#00f5a0", "--ac2": "#00b4ff", "--ac3": "#7c5cfc",
    "--tx": "#f0f4f8", "--mu": "#6b7a90", "--mu2": "#3a4556",
    "--fd": "'Syne',sans-serif", "--fb": "'DM Sans',sans-serif", "--fm": "'JetBrains Mono',monospace",
  };
  const lightVars = {
    "--bg": "#f4f7fc", "--bg2": "#eaeff7",
    "--sf": "rgba(0,0,0,0.03)", "--sf2": "rgba(0,0,0,0.06)",
    "--bd": "rgba(0,0,0,0.07)", "--bd2": "rgba(0,0,0,0.13)",
    "--ac": "#00a86b", "--ac2": "#0072cc", "--ac3": "#6d48e5",
    "--tx": "#111827", "--mu": "#64748b", "--mu2": "#cbd5e1",
    "--fd": "'Syne',sans-serif", "--fb": "'DM Sans',sans-serif", "--fm": "'JetBrains Mono',monospace",
  };

  const vars = dark ? darkVars : lightVars;
  const cssVars = Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(";");

  const globalCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
    *{margin:0;padding:0;box-sizing:border-box}
    :root{${cssVars}}
    html{scroll-behavior:smooth}
    body{background:var(--bg);color:var(--tx);font-family:var(--fb);overflow-x:hidden;transition:background .35s,color .35s;cursor:none}
    a{text-decoration:none;color:inherit}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:var(--bg)}
    ::-webkit-scrollbar-thumb{background:var(--ac);border-radius:2px}
    @keyframes fUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fIn{from{opacity:0}to{opacity:1}}
    @keyframes floatOrb{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes fl2{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-7px) rotate(3deg)}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.8)}}
    @keyframes spin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
    @keyframes shimmer{from{transform:translateX(-100%)}to{transform:translateX(200%)}}
    @media(hover:none){body{cursor:auto}}
    input,textarea{color-scheme:${dark ? "dark" : "light"}}
  `;

  return (
    <>
      <style>{globalCSS}</style>

      {/* BG Grid */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: dark ? "linear-gradient(rgba(0,245,160,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,160,.02) 1px,transparent 1px)" : "linear-gradient(rgba(0,168,107,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,168,107,.05) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />

      <Cursor />
      <Navbar dark={dark} toggleDark={() => setDark((d) => !d)} activeSection={activeSection} scrollPct={scrollPct} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />

      <footer style={{ borderTop: "1px solid var(--bd)", padding: "20px 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 9, position: "relative", zIndex: 1 }}>
        <span style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--mu)" }}>© 2026 Chandan Singh</span>
        <span style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--mu)" }}>Built with React + ❤️</span>
      </footer>
    </>
  );
}