"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Mail, Home, Sparkles, Link2, Rss, Search, Sun, Moon, Clock, MessageCircle, Briefcase, MapPin } from "lucide-react";
import { profile, socials, projects, skillGroups } from "@/data/profile";
import { GithubIcon, LinkedinIcon, InstagramIcon, RedditIcon } from "../icons/BrandIcons";
import { SidebarItem, SidebarSection } from "../ExplorerLayout";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  reddit: RedditIcon,
};

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home },
  { key: "bio", label: "Bio", icon: Sparkles },
  { key: "interests", label: "Interests", icon: Rss },
  { key: "connect", label: "Connect", icon: Link2 },
];

const interests = [
  { id: "creative", emoji: "🎨", label: "Creative Coding", accent: "#a855f7", description: "Blending design and code into interfaces that feel alive." },
  { id: "motion", emoji: "🎬", label: "Motion & Animation", accent: "#0891b2", description: "Obsessed with the small transitions that make software feel good." },
  { id: "freelance", emoji: "🤝", label: "Freelance Collab", accent: "#16a34a", description: "Open to freelance work and collaborations - jump to Connect.", action: "connect" },
  { id: "india", icon: MapPin, label: "Based in India", accent: "#ea580c", description: "Working with clients and teams across time zones." },
  { id: "oss", emoji: "💻", label: "Open Source", accent: "#64748b", description: "Most of what I build ships as source on GitHub.", action: "github" },
];

const THEME_KEY = "about_app_theme";

function Card({ title, icon, children, style, className }) {
  return (
    <div
      className={`sp-card ${className || ""}`}
      style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12, ...style }}
    >
      {title && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 600 }}>
          {icon}
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

function BioBullet({ label }) {
  return (
    <div style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.6, color: "var(--sp-text-dim)", padding: "5px 0" }}>
      <span
        style={{
          width: 5, height: 5, borderRadius: "50%", background: "var(--win-blue)",
          opacity: 0.7, flexShrink: 0, marginTop: 8,
        }}
      />
      <span>{label}</span>
    </div>
  );
}

export default function AboutApp() {
  const [active, setActive] = useState("home");
  const [pulseSection, setPulseSection] = useState(null);
  const [query, setQuery] = useState("");
  const [expandedTile, setExpandedTile] = useState(null);
  const [lightTheme, setLightTheme] = useState(false);

  const homeRef = useRef(null);
  const bioRef = useRef(null);
  const interestsRef = useRef(null);
  const connectRef = useRef(null);
  const refs = { home: homeRef, bio: bioRef, interests: interestsRef, connect: connectRef };

  useEffect(() => {
    // localStorage isn't available during SSR, so the theme preference can only be
    // read after mount - this deliberately runs once client-side, not a data sync.
    const saved = localStorage.getItem(THEME_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "light") setLightTheme(true);
  }, []);

  const toggleTheme = () => {
    setLightTheme((prev) => {
      const next = !prev;
      localStorage.setItem(THEME_KEY, next ? "light" : "dark");
      return next;
    });
  };

  const goTo = (key) => {
    setActive(key);
    refs[key].current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setPulseSection(key);
    setTimeout(() => setPulseSection((cur) => (cur === key ? null : cur)), 650);
  };

  const filteredNav = useMemo(
    () => NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const totalSkills = useMemo(() => skillGroups.reduce((sum, g) => sum + g.items.length, 0), []);

  const pulseStyle = (key) =>
    pulseSection === key ? { animation: "spSectionPulse 0.65s ease-out" } : {};

  const handleTileClick = (it) => {
    if (it.action === "github") {
      window.open(socials.find((s) => s.key === "github")?.url, "_blank", "noopener,noreferrer");
      return;
    }
    if (it.action === "connect") {
      goTo("connect");
      return;
    }
    setExpandedTile((cur) => (cur === it.id ? null : it.id));
  };

  const breadcrumbLabel = NAV_ITEMS.find((n) => n.key === active)?.label || "Home";

  return (
    <div className={`settings-page${lightTheme ? " light-theme" : ""}`} style={{ display: "flex", height: "100%" }}>
      <a href="#about-main-heading" className="skip-link">Skip to content</a>

      {/* Settings-style sidebar with profile header */}
      <div
        style={{
          width: 230, flexShrink: 0, overflowY: "auto",
          background: "var(--sp-sidebar-bg)",
          borderRight: "1px solid var(--sp-divider)",
          padding: "16px 6px",
          display: "flex", flexDirection: "column",
        }}
      >
        <button
          onClick={() => goTo("bio")}
          title="View bio"
          style={{
            display: "flex", alignItems: "center", gap: 12, padding: "6px 10px 16px",
            background: "transparent", border: "none", cursor: "pointer", textAlign: "left", width: "100%",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <div
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg, #ef4444, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <img src="/maya-logo.svg" alt="" width={22} height={22} style={{ filter: "invert(1)" }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", color: "var(--sp-text)" }}>{profile.name}</p>
            <p style={{ fontSize: 11, color: "var(--sp-text-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {profile.email}
            </p>
          </div>
        </button>

        <div
          style={{
            display: "flex", alignItems: "center", gap: 8, margin: "0 10px 14px",
            padding: "6px 10px", borderRadius: 999, background: "var(--sp-input-bg)",
          }}
        >
          <Search size={13} color="var(--sp-text-faint)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a setting"
            aria-label="Filter navigation"
            style={{
              background: "transparent", border: "none", outline: "none", flex: 1,
              fontSize: 12, color: "var(--sp-text)", minWidth: 0,
            }}
          />
        </div>

        {filteredNav.length === 0 ? (
          <p style={{ fontSize: 12, color: "var(--sp-text-faint)", padding: "4px 12px" }}>No results</p>
        ) : (
          filteredNav.map((item) => (
            <SidebarItem
              key={item.key}
              icon={<item.icon size={15} />}
              label={item.label}
              active={active === item.key}
              onClick={() => goTo(item.key)}
            />
          ))
        )}

        <SidebarSection label="Status" />
        <button
          onClick={() => goTo("connect")}
          style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%", background: "transparent",
            border: "none", cursor: "pointer", padding: "6px 12px", fontSize: 13, color: "var(--sp-text-dim)", textAlign: "left",
          }}
        >
          <span className="sp-pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", flexShrink: 0 }} />
          Open to work
        </button>

        <div style={{ marginTop: "auto", paddingTop: 16 }}>
          <button
            onClick={toggleTheme}
            style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", background: "transparent",
              border: "1px solid var(--sp-card-border)", borderRadius: 6, cursor: "pointer",
              padding: "7px 12px", fontSize: 12.5, color: "var(--sp-text-dim)",
            }}
          >
            {lightTheme ? <Moon size={14} /> : <Sun size={14} />}
            {lightTheme ? "Switch to dark" : "Switch to light"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", padding: 24, display: "flex", flexDirection: "column" }}>
        <div className="sp-page" style={{ maxWidth: 1200, width: "100%", margin: "0 auto", flex: 1 }}>
          <p className="sp-caption" style={{ fontSize: 12, marginBottom: 4 }}>About Me &rsaquo; {breadcrumbLabel}</p>
          <h1 id="about-main-heading" style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>{breadcrumbLabel}</h1>

          {/* Identity card */}
          <div
            ref={homeRef}
            className="sp-card sp-stagger"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: 18, marginBottom: 20, flexWrap: "wrap", gap: 16,
              ...pulseStyle("home"),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div
                style={{
                  width: 64, height: 64, borderRadius: 10,
                  background: "linear-gradient(135deg, #ef4444, #7c3aed)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >
                <img src="/maya-logo.svg" alt="" width={32} height={32} style={{ filter: "invert(1)" }} />
              </div>
              <div>
                <p style={{ fontSize: 17, fontWeight: 700 }}>{profile.name}</p>
                <p style={{ fontSize: 12.5, color: "var(--sp-text-faint)", marginBottom: 6 }}>{profile.tagline}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span className="sp-chip">{projects.length} Projects Shipped</span>
                  <span className="sp-chip">{totalSkills}+ Technologies</span>
                  <span className="sp-chip">Open Source</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Rss size={16} color="#7cc0f5" />
                <div>
                  <p style={{ fontSize: 12.5, fontWeight: 600 }}>Status</p>
                  <p style={{ fontSize: 11, color: "var(--sp-text-faint)" }}>Open to freelance work</p>
                </div>
              </div>
              <a
                href={socials.find((s) => s.key === "github")?.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, color: "inherit" }}
              >
                <GithubIcon size={16} color="#7cc0f5" />
                <div>
                  <p style={{ fontSize: 12.5, fontWeight: 600 }}>GitHub</p>
                  <p style={{ fontSize: 11, color: "#7cc0f5" }}>@UnqKode</p>
                </div>
              </a>
            </div>
          </div>

          {/* Two column cards */}
          <div ref={bioRef} className="sp-two-col" style={{ marginBottom: 20, ...pulseStyle("bio") }}>
            <Card title="About" icon={<Sparkles size={16} color="var(--win-blue)" />} className="sp-stagger" style={{ animationDelay: "60ms" }}>
              {profile.bio.map((line, i) => (
                <BioBullet key={i} label={line} />
              ))}
            </Card>

            <Card title="Let's collaborate" icon={<Mail size={16} color="var(--win-blue)" />} className="sp-stagger" style={{ animationDelay: "120ms" }}>
              <p style={{ fontSize: 13, color: "var(--sp-text-dim)", lineHeight: 1.6 }}>
                Got an idea, a role, or a project? I&apos;d love to hear about it.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--sp-text-dim)" }}>
                  <Briefcase size={14} color="var(--sp-text-faint)" />
                  Availability: open to new projects
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--sp-text-dim)" }}>
                  <Clock size={14} color="var(--sp-text-faint)" />
                  Typical response time: 1-2 days
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--sp-text-dim)" }}>
                  <MessageCircle size={14} color="var(--sp-text-faint)" />
                  Preferred contact: email
                </div>
              </div>
              <a
                href={profile.gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 16px", borderRadius: "var(--radius-control)",
                  background: "var(--win-blue)", color: "white", fontSize: 13, fontWeight: 500,
                  transition: "background 150ms ease-out, filter 150ms ease-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
              >
                <Mail size={14} />
                Say Hello
              </a>
            </Card>
          </div>

          {/* Interests grid */}
          <div ref={interestsRef} style={{ marginBottom: 20, ...pulseStyle("interests") }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Things I&apos;m into</h3>
            <div className="sp-tiles">
              {interests.map((it, i) => (
                <button
                  key={it.id}
                  className="sp-tile sp-stagger"
                  onClick={() => handleTileClick(it)}
                  style={{
                    animationDelay: `${i * 60}ms`,
                    background: `${it.accent}14`,
                    borderColor: `${it.accent}33`,
                    padding: 14,
                    display: "flex", flexDirection: "column", gap: 10, minHeight: 92,
                    justifyContent: "space-between", textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: `${it.accent}26`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
                    }}
                  >
                    {it.icon ? <it.icon size={15} color={it.accent} /> : it.emoji}
                  </div>
                  <div>
                    <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--sp-text)" }}>{it.label}</p>
                    {expandedTile === it.id && (
                      <p style={{ fontSize: 11, color: "var(--sp-text-faint)", marginTop: 4, lineHeight: 1.5 }}>
                        {it.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Connect row */}
          <div ref={connectRef} style={{ marginBottom: 24, ...pulseStyle("connect") }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Connect</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {socials.map((s) => {
                const Icon = socialIcons[s.key];
                return (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: "var(--sp-card-bg)", border: "1px solid var(--sp-card-border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--sp-text-dim)", transition: "background 150ms ease-out",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--win-blue)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--sp-card-bg)")}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <footer
          style={{
            textAlign: "center", padding: "16px 0 4px", marginTop: 12,
            borderTop: "1px solid var(--sp-divider)", fontSize: 11.5, color: "var(--sp-text-faint)",
          }}
        >
          About Me &bull; v2.0 &bull; Built with <span style={{ color: "#ef4444" }}>&hearts;</span> in India
        </footer>
      </div>
    </div>
  );
}
