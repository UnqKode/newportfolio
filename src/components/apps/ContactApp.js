"use client";

import { Mail, Copy } from "lucide-react";
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
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 520 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Let&apos;s build something awesome together.</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            Open to freelance work, collaborations, and interesting ideas.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a
            href={profile.gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 20px",
              borderRadius: 999,
              background: "var(--win-blue)",
              color: "white",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <Mail size={16} />
            Say Hello - {profile.email}
          </a>
          <button
            onClick={copyEmail}
            title="Copy email"
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Copy size={15} />
          </button>
          {copied && <span style={{ fontSize: 12, color: "#7cc0f5" }}>Copied!</span>}
        </div>

        <div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Find me elsewhere
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {socials.map((s) => {
              const Icon = socialIcons[s.key];
              return (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 14px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 13,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                >
                  <Icon size={16} />
                  {s.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </ExplorerLayout>
  );
}
