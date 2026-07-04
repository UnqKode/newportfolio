"use client";

import { useState } from "react";
import { games } from "@/data/games";
import ExplorerLayout, { SidebarItem, SidebarSection, SidebarSearch, SidebarEmpty } from "../ExplorerLayout";
import { ExeIcon, ExeIconSmall, RunDialog, GameViewer } from "../games/GameLauncher";

export default function GamesApp() {
  const [selected, setSelected] = useState(null);
  const [launching, setLaunching] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  const [query, setQuery] = useState("");

  const filteredGames = games.filter((g) => g.exeName.toLowerCase().includes(query.toLowerCase()));

  // Nothing about this app ever renders an <iframe> until activeGame is set, so
  // opening the folder itself costs nothing beyond icons and text - the actual
  // game (and GameDistribution's SDK) only loads on demand, per game.
  if (activeGame) {
    return <GameViewer game={activeGame} onBack={() => setActiveGame(null)} backLabel="Games" />;
  }

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <ExplorerLayout
        breadcrumb={<>This PC <span style={{ opacity: 0.5 }}>›</span> Games</>}
        sidebar={
          <>
            <SidebarSearch value={query} onChange={setQuery} />
            <SidebarSection label="Quick access" />
            {filteredGames.length === 0 ? (
              <SidebarEmpty query={query} />
            ) : (
              filteredGames.map((game) => (
                <SidebarItem
                  key={game.id}
                  icon={<ExeIconSmall game={game} />}
                  label={game.exeName}
                  active={selected === game.id}
                  onClick={() => setSelected(game.id)}
                />
              ))
            )}
          </>
        }
      >
        <div onClick={() => setSelected(null)} style={{ height: "100%" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 18 }}>
            {games.length} items - double-click a game to run it
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 96px)", gap: 20 }}>
            {games.map((game) => (
              <div
                key={game.id}
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
                <span style={{ fontSize: 12, wordBreak: "break-word" }}>{game.exeName}</span>
              </div>
            ))}
          </div>
        </div>
      </ExplorerLayout>

      {launching && (
        <RunDialog
          game={launching}
          onClose={() => setLaunching(null)}
          onLaunch={(game) => { setLaunching(null); setActiveGame(game); }}
        />
      )}
    </div>
  );
}
