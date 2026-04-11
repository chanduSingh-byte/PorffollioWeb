import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const ROLES = [
  "Web Developer",
  "API Developer",
  "FullStack Developer",
  "Apps Script Developer",
];

const SKILLS = [
  { name: "HTML / CSS / JS", level: 92, color: "#f7df1e" },
  { name: "React / JSX", level: 85, color: "#61dafb" },
  { name: "Google Apps Script", level: 88, color: "#34a853" },
  { name: "Tailwind CSS", level: 90, color: "#38bdf8" },
  { name: "Node.js", level: 75, color: "#68a063" },
  { name: "Python", level: 70, color: "#3572a5" },
];

const TOOLS = [
  "SweetAlert2","AOS","Vite","Git",
  "Google Sheets","Firebase","Electron","Figma",
];

const PROJECTS = [
  {
    title: "Ludo Supreme",
    desc: "Full-featured browser Ludo game with AI opponents, animated tokens, dice physics, and multiplayer mode.",
    tags: ["JS", "Canvas", "Game AI"],
    color: "#ff6b6b",
    icon: "♟",
    link: "#",
  },
  {
    title: "Mind Hub",
    desc: "Multi-game arcade hub with 6+ mini-games, distinct themed interfaces, leaderboards, and sound effects.",
    tags: ["React", "CSS", "Audio API"],
    color: "#ffd93d",
    icon: "🧩",
    link: "#",
  },
  {
    title: "Rework Entry Form",
    desc: "Internal QC tool with cascading dropdowns (Process→Part→Jobcard), Google Sheets integration via Apps Script API.",
    tags: ["Apps Script", "HTML", "GSheets"],
    color: "#6bcb77",
    icon: "📋",
    link: "#",
  },
  {
    title: "MailCraft",
    desc: "Node.js/Express email sender app with dark-themed UI, HTML email templates, and batch dispatch.",
    tags: ["Node.js", "Express", "Nodemailer"],
    color: "#4d96ff",
    icon: "✉",
    link: "#",
  },
  {
    title: "IT Support Portal",
    desc: "Rebuilt IT ticketing system with Tailwind, SweetAlert2, AOS animations, and real-time status tracking.",
    tags: ["Tailwind", "SweetAlert2", "AOS"],
    color: "#c77dff",
    icon: "🖥",
    link: "#",
  },
  {
    title: "GitHub Cheatsheet",
    desc: "Interactive daily-use Git & GitHub commands reference with search, copy-to-clipboard, and category filters.",
    tags: ["React", "Vite", "Tailwind"],
    color: "#ff9a3c",
    icon: "📖",
    link: "#",
  },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Twitter", href: "https://twitter.com/" },
  { label: "Email", href: "mailto:chandan@example.com" },
];

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────

function Cursor({ dark }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => {
      if (e.target.closest("a, button, [data-hover]")) setBig(true);
    };
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

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: pos.x - 5,
          top: pos.y - 5,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "transform .1s",
          transform: big ? "scale(2.5)" : "scale(1)",
          mixBlendMode: "difference",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: pos.x - 20,
          top: pos.y - 20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(0,245,160,0.35)",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "all .2s ease",
          transform: big ? "scale(1.6)" : "scale(1)",
        }}
      />
    </>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav({ dark, toggleDark }) {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 2rem",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? dark
            ? "rgba(8,12,16,0.92)"
            : "rgba(245,248,252,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all .4s ease",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 20,
          background: "linear-gradient(135deg,var(--accent),var(--accent2))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.5px",
          cursor: "default",
        }}
      >
        &lt;Chandan/&gt;
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {NAV_LINKS.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            data-hover
            onClick={() => setActive(l)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 500,
              color: active === l ? "var(--accent)" : "var(--muted)",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: 8,
              background:
                active === l ? "rgba(0,245,160,0.08)" : "transparent",
              border:
                active === l
                  ? "1px solid rgba(0,245,160,0.2)"
                  : "1px solid transparent",
              transition: "all .2s ease",
            }}
          >
            {l}
          </a>
        ))}

        {/* Dark/Light Toggle */}
        <button
          data-hover
          onClick={toggleDark}
          title="Toggle theme"
          style={{
            marginLeft: 8,
            width: 38,
            height: 22,
            borderRadius: 11,
            border: "1px solid var(--border)",
            background: dark ? "rgba(0,245,160,0.15)" : "rgba(0,0,0,0.08)",
            cursor: "pointer",
            position: "relative",
            transition: "all .3s ease",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 3,
              left: dark ? 18 : 3,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: dark ? "var(--accent)" : "#f59e0b",
              transition: "left .3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
            }}
          >
            {dark ? "🌙" : "☀"}
          </div>
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [typed, setTyped] = useState("");
  const [ri, setRi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = ROLES[ri];
    let t;
    if (!deleting && typed.length < cur.length) {
      t = setTimeout(() => setTyped(cur.slice(0, typed.length + 1)), 60);
    } else if (!deleting && typed.length === cur.length) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typed.length > 0) {
      t = setTimeout(() => setTyped(typed.slice(0, -1)), 35);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setRi((ri + 1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [typed, deleting, ri]);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "6rem 2rem 4rem",
        overflow: "hidden",
      }}
    >
      {/* Orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(0,245,160,0.07),transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(0,180,255,0.07),transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: "1px solid rgba(0,245,160,0.05)",
            animation: "spin 30s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "1px solid rgba(0,180,255,0.05)",
            animation: "spin 20s linear infinite reverse",
          }}
        />
      </div>

      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          maxWidth: 800,
        }}
      >
        <div
          className="fade-up d1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            border: "1px solid rgba(0,245,160,0.2)",
            borderRadius: 100,
            marginBottom: 24,
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--accent)",
            background: "rgba(0,245,160,0.05)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          Available for projects
        </div>

        <h1
          className="fade-up d2"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(48px,8vw,88px)",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            marginBottom: 8,
          }}
        >
          Chandan
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg,var(--accent) 0%,var(--accent2) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Singh
          </span>
        </h1>

        <div
          className="fade-up d3"
          style={{
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(16px,2.5vw,22px)",
              color: "var(--muted)",
              letterSpacing: "0.02em",
            }}
          >
            {typed}
            <span
              style={{ color: "var(--accent)", animation: "pulse 1s infinite" }}
            >
              |
            </span>
          </span>
        </div>

        <p
          className="fade-up d4"
          style={{
            fontSize: 17,
            color: "var(--muted)",
            maxWidth: 560,
            margin: "0 auto 40px",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Building internal tools, browser games, and slick UI at Scherdel
          India. Turning complex workflows into elegant interfaces.
        </p>

        <div
          className="fade-up d5"
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            data-hover
            onClick={() =>
              document
                .getElementById("projects")
                .scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "14px 32px",
              background: "var(--accent)",
              color: "#000",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 14,
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "all .2s ease",
            }}
          >
            View Projects →
          </button>
          <button
            data-hover
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "14px 32px",
              background: "transparent",
              color: "var(--text)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 14,
              border: "1px solid var(--border)",
              borderRadius: 10,
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "all .2s ease",
            }}
          >
            Contact Me
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "var(--muted)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.12em",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(var(--accent),transparent)",
          }}
        />
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section
      id="about"
      style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: 80,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--accent)",
              letterSpacing: "0.15em",
              marginBottom: 12,
            }}
          >
            01. ABOUT
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px,4vw,52px)",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Crafting tools
            <br />
            <span style={{ color: "var(--muted)" }}>people love</span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.85,
              fontSize: 16,
              fontWeight: 300,
              marginBottom: 20,
            }}
          >
            I'm an IT Support Developer at Scherdel India, where I build
            internal tools, automate workflows, and create slick interfaces that
            make people's jobs easier. From QC inspection forms to IT ticketing
            systems — I turn problems into polished solutions.
          </p>
          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.85,
              fontSize: 16,
              fontWeight: 300,
              marginBottom: 32,
            }}
          >
            Beyond work, I'm always building — browser games, creative UIs, and
            experimenting with whatever catches my eye. Self-taught, practically
            focused, always shipping.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["React", "Apps Script", "Node.js", "Tailwind", "HTML/CSS"].map(
              (t) => (
                <span
                  key={t}
                  style={{
                    padding: "6px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--muted)",
                    background: "var(--surface)",
                  }}
                >
                  {t}
                </span>
              )
            )}
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: 24,
              background:
                "linear-gradient(135deg,rgba(0,245,160,0.1),rgba(0,180,255,0.1))",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 30px,rgba(0,245,160,0.03) 30px,rgba(0,245,160,0.03) 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(0,245,160,0.03) 30px,rgba(0,245,160,0.03) 31px)`,
              }}
            />
            <div
              style={{
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                padding: 40,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 72,
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg,var(--accent),var(--accent2))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                }}
              >
                CK
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--muted)",
                  marginTop: 12,
                  letterSpacing: "0.15em",
                }}
              >
                IT SUPPORT DEV
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "rgba(0,245,160,0.5)",
                  marginTop: 6,
                  letterSpacing: "0.1em",
                }}
              >
                JAIPUR, INDIA
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  justifyContent: "center",
                  marginTop: 24,
                }}
              >
                {[
                  ["3+", "Years Coding"],
                  ["15+", "Projects"],
                  ["∞", "Coffee"],
                ].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: 22,
                        color: "var(--accent)",
                      }}
                    >
                      {n}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--muted)",
                        marginTop: 2,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: -16,
              right: -16,
              width: 80,
              height: 80,
              borderRadius: 16,
              background: "rgba(0,245,160,0.08)",
              border: "1px solid rgba(0,245,160,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "float 3s ease-in-out infinite",
              fontSize: 32,
            }}
          >
            ⚡
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -16,
              left: -16,
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "rgba(0,180,255,0.08)",
              border: "1px solid rgba(0,180,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "float 4s ease-in-out infinite reverse",
              fontSize: 24,
            }}
          >
            🛠
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="skills"
      style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--accent)",
              letterSpacing: "0.15em",
              marginBottom: 12,
            }}
          >
            02. SKILLS
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px,4vw,52px)",
              letterSpacing: "-1.5px",
            }}
          >
            Tech I work with
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "20px 24px",
                background:
                  hovered === i ? "rgba(255,255,255,0.05)" : "var(--surface)",
                border: `1px solid ${
                  hovered === i ? "rgba(0,245,160,0.2)" : "var(--border)"
                }`,
                borderRadius: 16,
                transition: "all .3s ease",
                cursor: "default",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {s.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: s.color,
                    fontWeight: 500,
                  }}
                >
                  {s.level}%
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  background: "rgba(128,128,128,0.15)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${s.level}%`,
                    background: `linear-gradient(90deg,${s.color},${s.color}88)`,
                    borderRadius: 2,
                    boxShadow: `0 0 10px ${s.color}44`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))",
            gap: 10,
          }}
        >
          {TOOLS.map((t) => (
            <div
              key={t}
              data-hover
              style={{
                padding: "12px 8px",
                border: "1px solid var(--border)",
                borderRadius: 10,
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--muted)",
                background: "var(--surface)",
                transition: "all .2s",
                cursor: "default",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function Projects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="projects"
      style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--accent)",
              letterSpacing: "0.15em",
              marginBottom: 12,
            }}
          >
            03. PROJECTS
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px,4vw,52px)",
              letterSpacing: "-1.5px",
            }}
          >
            Things I've built
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 20,
          }}
        >
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-hover
              style={{
                padding: 28,
                background:
                  hovered === i ? "rgba(255,255,255,0.05)" : "var(--surface)",
                border: `1px solid ${
                  hovered === i ? p.color + "44" : "var(--border)"
                }`,
                borderRadius: 20,
                transition: "all .35s ease",
                cursor: "default",
                transform: hovered === i ? "translateY(-5px)" : "translateY(0)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background:
                    hovered === i
                      ? `linear-gradient(90deg,${p.color},transparent)`
                      : "transparent",
                  transition: "all .35s ease",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${p.color}15`,
                    border: `1px solid ${p.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 18,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {p.title}
                </h3>
              </div>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  fontWeight: 300,
                  marginBottom: 20,
                }}
              >
                {p.desc}
              </p>
              <div
                style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}
              >
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "4px 10px",
                      background: `${p.color}10`,
                      border: `1px solid ${p.color}25`,
                      borderRadius: 6,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: p.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.link}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: hovered === i ? p.color : "var(--muted)",
                  textDecoration: "none",
                  transition: "color .2s",
                  letterSpacing: "0.05em",
                }}
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  const submit = () => {
    if (form.name && form.email && form.msg) setSent(true);
  };

  return (
    <section
      id="contact"
      style={{ padding: "6rem 2rem 8rem", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--accent)",
            letterSpacing: "0.15em",
            marginBottom: 12,
          }}
        >
          04. CONTACT
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(32px,4vw,52px)",
            letterSpacing: "-1.5px",
            marginBottom: 16,
          }}
        >
          Let's build something
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 16,
            fontWeight: 300,
            marginBottom: 48,
            lineHeight: 1.7,
          }}
        >
          Open to freelance, collabs, or just a chat about cool projects.
        </p>

        {sent ? (
          <div
            style={{
              padding: 40,
              background: "rgba(0,245,160,0.05)",
              border: "1px solid rgba(0,245,160,0.2)",
              borderRadius: 20,
              animation: "fadeIn .5s ease",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 20,
                color: "var(--accent)",
                marginBottom: 8,
              }}
            >
              Message sent!
            </div>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>
              I'll get back to you soon.
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              ["name", "Your Name", "text"],
              ["email", "your@email.com", "email"],
            ].map(([k, ph, type]) => (
              <input
                key={k}
                type={type}
                placeholder={ph}
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                style={{
                  padding: "14px 18px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  color: "var(--text)",
                  fontSize: 15,
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  transition: "border .2s ease",
                  width: "100%",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(0,245,160,0.4)")
                }
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            ))}
            <textarea
              placeholder="Tell me about your project..."
              value={form.msg}
              onChange={(e) => setForm({ ...form, msg: e.target.value })}
              rows={5}
              style={{
                padding: "14px 18px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                color: "var(--text)",
                fontSize: 15,
                fontFamily: "var(--font-body)",
                outline: "none",
                resize: "vertical",
                transition: "border .2s ease",
                width: "100%",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(0,245,160,0.4)")
              }
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
            <button
              data-hover
              onClick={submit}
              style={{
                padding: "15px 32px",
                background: "var(--accent)",
                color: "#000",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                borderRadius: 12,
                cursor: "pointer",
                letterSpacing: "0.5px",
                transition: "all .2s",
                marginTop: 4,
                width: "100%",
              }}
            >
              Send Message →
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: 60,
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              data-hover
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--muted)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                padding: "8px 14px",
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--surface)",
                transition: "all .2s",
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "24px 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <span
        style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}
      >
        © 2026 Chandan Singh
      </span>
      <span
        style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}
      >
        Built with React + ❤️
      </span>
    </footer>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [dark, setDark] = useState(true);

  const theme = dark
    ? {
        "--bg": "#080c10",
        "--bg2": "#0d1219",
        "--surface": "rgba(255,255,255,0.04)",
        "--border": "rgba(255,255,255,0.08)",
        "--accent": "#00f5a0",
        "--accent2": "#00b4ff",
        "--text": "#f0f4f8",
        "--muted": "#6b7a90",
      }
    : {
        "--bg": "#f5f8fc",
        "--bg2": "#eef2f7",
        "--surface": "rgba(0,0,0,0.03)",
        "--border": "rgba(0,0,0,0.08)",
        "--accent": "#00a86b",
        "--accent2": "#0072cc",
        "--text": "#111827",
        "--muted": "#6b7280",
      };

  const cssVars = Object.entries(theme)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
    *{margin:0;padding:0;box-sizing:border-box}
    :root{
      --font-display:'Syne',sans-serif;
      --font-body:'DM Sans',sans-serif;
      --font-mono:'JetBrains Mono',monospace;
      ${cssVars}
    }
    html{scroll-behavior:smooth}
    body{background:var(--bg);color:var(--text);font-family:var(--font-body);overflow-x:hidden;transition:background .3s ease,color .3s ease}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:var(--bg)}
    ::-webkit-scrollbar-thumb{background:var(--accent);border-radius:2px}
    @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(0,245,160,0.2)}50%{box-shadow:0 0 40px rgba(0,245,160,0.5)}}
    .fade-up{animation:fadeUp 0.7s cubic-bezier(.22,1,.36,1) both}
    .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}.d4{animation-delay:.4s}.d5{animation-delay:.5s}
    input,textarea{color-scheme:${dark ? "dark" : "light"}}
  `;

  return (
    <>
      <style>{globalStyles}</style>
      <Cursor dark={dark} />
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(0,245,160,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,160,0.025) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <Nav dark={dark} toggleDark={() => setDark((d) => !d)} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}