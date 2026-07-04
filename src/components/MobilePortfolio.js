"use client";

import { useEffect, useState } from "react";
import { Mail, Download, Briefcase, Code2 } from "lucide-react";
import { profile, socials, projects, skillGroups } from "../data/profile";
import { GithubIcon, LinkedinIcon, InstagramIcon, RedditIcon } from "./icons/BrandIcons";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  reddit: RedditIcon,
};

function Section({ title, icon, children }) {
  return (
    <section style={{ padding: "28px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        {icon}
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function MobilePortfolio() {
  const [resumeStatus, setResumeStatus] = useState("checking");

  useEffect(() => {
    fetch("/resume.pdf", { method: "HEAD" })
      .then((res) => setResumeStatus(res.ok ? "available" : "missing"))
      .catch(() => setResumeStatus("missing"));
  }, []);

  return (
    <div
      style={{
        width: "100%", height: "100vh", overflowY: "auto",
        background: "rgba(10,10,15,0.7)", color: "white",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Hero */}
      <div style={{ padding: "48px 20px 28px", textAlign: "center" }}>
        <div
          style={{
            width: 84, height: 84, borderRadius: "50%", margin: "0 auto 18px",
            background: "linear-gradient(135deg, #ef4444, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <img src="/maya-logo.svg" alt="" width={40} height={40} style={{ filter: "invert(1)" }} />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>{profile.name}</h1>
        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>{profile.tagline}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <a
            href={profile.gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
              borderRadius: 999, background: "var(--win-blue)", color: "white",
              fontSize: 13.5, fontWeight: 500,
            }}
          >
            <Mail size={15} />
            Say Hello
          </a>
          {socials.map((s) => {
            const Icon = socialIcons[s.key];
            return (
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 38, height: 38, borderRadius: 8,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                }}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>

      {/* About */}
      <Section title="About" icon={<Code2 size={17} color="var(--win-blue)" />}>
        {profile.bio.map((line, i) => (
          <p key={i} style={{ fontSize: 13.5, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", marginBottom: 10 }}>
            {line}
          </p>
        ))}
      </Section>

      {/* Projects */}
      <Section title="Projects" icon={<Briefcase size={17} color="var(--win-blue)" />}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {projects.map((p) => (
            <div
              key={p.id}
              style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10, padding: 16,
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{p.title}</h3>
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 10 }}>
                {p.description}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 10.5, padding: "3px 9px", borderRadius: 999,
                      background: "rgba(0,120,212,0.18)", border: "1px solid rgba(0,120,212,0.4)",
                      color: "#7cc0f5",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12.5, color: "#7cc0f5", fontWeight: 500 }}
              >
                View project →
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills" icon={<Code2 size={17} color="var(--win-blue)" />}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {skillGroups.map((g) => (
            <div key={g.group}>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
                {g.group}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {g.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: 12, padding: "5px 12px", borderRadius: 999,
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Resume */}
      <Section title="Resume" icon={<Download size={17} color="var(--win-blue)" />}>
        {resumeStatus === "available" ? (
          <a
            href="/resume.pdf"
            download
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px",
              borderRadius: 8, background: "var(--win-blue)", color: "white", fontSize: 13.5, fontWeight: 500,
            }}
          >
            <Download size={15} />
            Download PDF
          </a>
        ) : (
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}>
            Resume PDF coming soon - reach out directly in the meantime.
          </p>
        )}
      </Section>

      <p style={{ textAlign: "center", padding: "24px 20px 40px", fontSize: 11.5, color: "rgba(255,255,255,0.35)" }}>
        Best viewed on desktop for the full Windows 11 experience.
      </p>
    </div>
  );
}
