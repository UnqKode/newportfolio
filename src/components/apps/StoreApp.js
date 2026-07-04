"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Library } from "lucide-react";
import { GithubIcon } from "../icons/BrandIcons";
import { games } from "@/data/games";
import ExplorerLayout, { SidebarItem, SidebarSection, SidebarSearch, SidebarEmpty } from "../ExplorerLayout";
import { ExeIcon, RunDialog, GameViewer } from "../games/GameLauncher";

const NAV = [
  { key: "home", icon: Home, label: "Home" },
  { key: "library", icon: Library, label: "Library" },
];

export default function StoreApp() {
  const [view, setView] = useState("home");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [launching, setLaunching] = useState(null);
  const [activeGame, setActiveGame] = useState(null);

  const filteredNav = NAV.filter((n) => n.label.toLowerCase().includes(query.toLowerCase()));

  if (activeGame) {
    return <GameViewer game={activeGame} onBack={() => setActiveGame(null)} backLabel="Store" />;
  }

  return (
    <ExplorerLayout
      sidebar={
        <>
          <SidebarSearch value={query} onChange={setQuery} />
          <SidebarSection label="Store" />
          {filteredNav.length === 0 ? (
            <SidebarEmpty query={query} />
          ) : (
            filteredNav.map((n) => (
              <SidebarItem key={n.key} icon={<n.icon size={15} />} label={n.label} active={view === n.key} onClick={() => setView(n.key)} />
            ))
          )}
        </>
      }
    >
      {view === "home" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 12,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GithubIcon size={30} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 600 }}>This app isn&apos;t available yet</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", maxWidth: 280 }}>
            The real apps live on GitHub - source code, commits, and all.
          </p>
          <a
            href="https://github.com/UnqKode"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 8,
              padding: "8px 18px",
              borderRadius: 999,
              background: "var(--win-blue)",
              color: "white",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            View on GitHub
          </a>
        </div>
      ) : (
        <div style={{ position: "relative", height: "100%" }}>
          <div onClick={() => setSelected(null)} style={{ height: "100%" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 18 }}>
              {games.length} games installed - double-click one to play
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 96px)", gap: 20 }}>
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.24, delay: index * 0.025, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => { e.stopPropagation(); setSelected(game.id); }}
                  onDoubleClick={(e) => { e.stopPropagation(); setLaunching(game); }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    padding: "12px 6px", borderRadius: 6, cursor: "pointer", textAlign: "center",
                    background: selected === game.id ? "rgba(0,120,212,0.25)" : "transparent",
                    border: selected === game.id ? "1px solid rgba(0,120,212,0.5)" : "1px solid transparent",
                  }}
                >
                  <ExeIcon game={game} />
                  <span style={{ fontSize: 12, wordBreak: "break-word" }}>{game.title}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {launching && (
            <RunDialog
              game={launching}
              onClose={() => setLaunching(null)}
              onLaunch={(game) => { setLaunching(null); setActiveGame(game); }}
            />
          )}
        </div>
      )}
    </ExplorerLayout>
  );
}
