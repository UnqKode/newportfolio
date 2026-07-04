"use client";

import { Mail, Copy, Check, Briefcase, Clock, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { profile, socials } from "@/data/profile";
import { GithubIcon, LinkedinIcon, InstagramIcon, RedditIcon } from "../icons/BrandIcons";
import ExplorerLayout, { SidebarItem, SidebarSection, SidebarSearch, SidebarEmpty } from "../ExplorerLayout";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  reddit: RedditIcon,
};

const socialAccents = {
  github: "#8b949e",
  linkedin: "#0a66c2",
  instagram: "#dc2743",
  reddit: "#ff4500",
};

function Card({ title, icon, children, style }) {
  return (
    <div className="sp-card sp-stagger" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12, ...style }}>
      {title && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600 }}>
          {icon}
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export default function ContactApp() {
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState("");

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const openLink = (url) => window.open(url, "_blank", "noopener,noreferrer");

  const q = query.toLowerCase();
  const showEmail = "email".includes(q);
  const filteredSocials = socials.filter((s) => s.name.toLowerCase().includes(q));
  const noResults = !showEmail && filteredSocials.length === 0;

  return (
    <ExplorerLayout
      breadcrumb={<>This PC <span style={{ opacity: 0.5 }}>›</span> Contact</>}
      sidebar={
        <>
          <SidebarSearch value={query} onChange={setQuery} />
          {noResults ? (
            <SidebarEmpty query={query} />
          ) : (
            <>
              {showEmail && (
                <>
                  <SidebarSection label="Quick access" />
                  <SidebarItem icon={<Mail size={15} />} label="Email" onClick={() => openLink(profile.gmailComposeUrl)} />
                </>
              )}
              {filteredSocials.length > 0 && (
                <>
                  <SidebarSection label="Socials" />
                  {filteredSocials.map((s) => {
                    const Icon = socialIcons[s.key];
                    return (
                      <SidebarItem key={s.key} icon={<Icon size={15} />} label={s.name} onClick={() => openLink(s.url)} />
                    );
                  })}
                </>
              )}
            </>
          )}
        </>
      }
    >
      <div style={{ maxWidth: 720, width: "100%", margin: "0 auto" }}>
        {/* Hero card */}
        <div
          className="sp-card sp-stagger"
          style={{
            display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
            padding: 20, marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 56, height: 56, borderRadius: 12,
              background: "linear-gradient(135deg, #0078d4, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <Mail size={26} color="white" />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
              Let&apos;s build something awesome together.
            </h2>
            <p style={{ fontSize: 13, color: "var(--sp-text-faint)" }}>
              Open to freelance work, collaborations, and interesting ideas.
            </p>
          </div>
          <span className="sp-chip" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className="sp-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            Open to work
          </span>
        </div>

        <div className="sp-two-col" style={{ marginBottom: 16 }}>
          <Card title="Get in touch" icon={<Sparkles size={15} color="var(--win-blue)" />} style={{ animationDelay: "60ms" }}>
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

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
              <a
                href={profile.gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "10px 18px", borderRadius: "var(--radius-control)",
                  background: "var(--win-blue)", color: "white", fontSize: 13.5, fontWeight: 500,
                  transition: "filter 150ms ease-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
              >
                <Mail size={15} />
                Say Hello
              </a>
              <button
                onClick={copyEmail}
                title="Copy email"
                style={{
                  width: 40, height: 40, borderRadius: "var(--radius-control)", flexShrink: 0,
                  border: "1px solid var(--sp-card-border)", background: "var(--sp-card-bg)",
                  color: "var(--sp-text)", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "background 150ms ease-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--sp-card-bg)")}
              >
                {copied ? <Check size={15} color="#4ade80" /> : <Copy size={15} />}
              </button>
            </div>
            <p style={{ fontSize: 11.5, color: "var(--sp-text-faint)", textAlign: "center" }}>
              {copied ? "Copied to clipboard!" : profile.email}
            </p>
          </Card>

          <Card title="Find me elsewhere" icon={<Sparkles size={15} color="var(--win-blue)" />} style={{ animationDelay: "120ms" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {socials.map((s) => {
                const Icon = socialIcons[s.key];
                const accent = socialAccents[s.key] || "var(--win-blue)";
                return (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sp-tile"
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 12px", background: "var(--sp-card-bg)",
                      color: "var(--sp-text-dim)", textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                        background: `${accent}22`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <Icon size={16} color={accent} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--sp-text)" }}>{s.name}</span>
                  </a>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </ExplorerLayout>
  );
}
