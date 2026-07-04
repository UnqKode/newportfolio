"use client";

import { Search, History } from "lucide-react";
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

const shortcuts = [
  { name: "Live portfolio", url: "https://www.itsdevmanas.xyz/" },
  ...socials,
];

export default function BrowserApp() {
  const [query, setQuery] = useState("");
  const [addressQuery, setAddressQuery] = useState("");
  const openLink = (url) => window.open(url, "_blank", "noopener,noreferrer");

  const handleAddressKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const term = addressQuery.trim();
    if (!term) return;
    openLink(`https://www.google.com/search?q=${encodeURIComponent(term)}`);
  };

  const filteredShortcuts = shortcuts.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));
  const showHistory = "history".includes(query.toLowerCase()) || "empty".includes(query.toLowerCase()) || query === "";
  const noResults = filteredShortcuts.length === 0 && !showHistory;

  return (
    <ExplorerLayout
      sidebar={
        <>
          <SidebarSearch value={query} onChange={setQuery} />
          {noResults ? (
            <SidebarEmpty query={query} />
          ) : (
            <>
              {filteredShortcuts.length > 0 && (
                <>
                  <SidebarSection label="Favorites" />
                  {filteredShortcuts.map((s) => {
                    const Icon = socialIcons[s.key];
                    return (
                      <SidebarItem
                        key={s.name}
                        icon={Icon ? <Icon size={15} /> : <Search size={15} />}
                        label={s.name}
                        onClick={() => openLink(s.url)}
                      />
                    );
                  })}
                </>
              )}
              {showHistory && (
                <>
                  <SidebarSection label="History" />
                  <SidebarItem icon={<History size={15} />} label="Empty - it's a new browser" disabled />
                </>
              )}
            </>
          )}
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, paddingTop: 24 }}>
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            height: 40,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 16px",
            color: "rgba(255,255,255,0.5)",
            fontSize: 13,
          }}
        >
          <Search size={14} />
          <input
            value={addressQuery}
            onChange={(e) => setAddressQuery(e.target.value)}
            onKeyDown={handleAddressKeyDown}
            placeholder="Search Google or type a URL"
            aria-label="Search or enter address"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "rgba(255,255,255,0.9)", fontSize: 13,
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 90px)", gap: 20 }}>
          {shortcuts.map((s) => {
            const Icon = socialIcons[s.key];
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {Icon ? <Icon size={22} /> : <span style={{ fontWeight: 700 }}>MY</span>}
                </div>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{s.name}</span>
              </a>
            );
          })}
        </div>

        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center", maxWidth: 340 }}>
          {profile.name} - {profile.tagline}
        </p>
      </div>
    </ExplorerLayout>
  );
}
