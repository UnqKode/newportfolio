"use client";

import { useEffect, useRef, useState } from "react";
import {
  Waves, Hash, Blocks, Grid3x3, Grid2x2, CircleDot, Bomb, Puzzle,
  Hammer, Rocket, Crown, Spade, Target, Sword, ShieldCheck, X, CheckCircle2, ArrowLeft,
} from "lucide-react";

const iconMap = {
  waves: Waves, hash: Hash, blocks: Blocks, grid3x3: Grid3x3, grid2x2: Grid2x2,
  circledot: CircleDot, bomb: Bomb, puzzle: Puzzle, hammer: Hammer, rocket: Rocket,
  crown: Crown, spade: Spade, target: Target, sword: Sword,
};

const INSTALL_STEPS = ["Fetching game assets", "Warming up engine", "Almost there"];

export function GameIcon({ game, size = 26 }) {
  const Icon = iconMap[game.iconKey] || Blocks;
  return <Icon size={size} color="white" />;
}

export function ExeIcon({ game }) {
  return (
    <div
      style={{
        width: 52, height: 52, borderRadius: 10,
        background: `linear-gradient(160deg, ${game.color}, rgba(0,0,0,0.35))`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", boxShadow: "0 4px 10px rgba(0,0,0,0.35)", flexShrink: 0,
      }}
    >
      <GameIcon game={game} />
      <div
        style={{
          position: "absolute", bottom: -3, left: -3, width: 18, height: 18, borderRadius: 4,
          background: "rgba(20,20,20,0.9)", border: "1px solid rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export function ExeIconSmall({ game }) {
  return (
    <div
      style={{
        width: 20, height: 20, borderRadius: 4,
        background: `linear-gradient(160deg, ${game.color}, rgba(0,0,0,0.35))`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}
    >
      <GameIcon game={game} size={12} />
    </div>
  );
}

export function RunDialog({ game, onClose, onLaunch }) {
  const [phase, setPhase] = useState("confirm"); // confirm | loading | done
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const startLoading = () => {
    setPhase("loading");
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 8 + Math.random() * 12);
        if (next >= 100) {
          clearInterval(intervalRef.current);
          setPhase("done");
          setTimeout(() => onLaunch(game), 400);
        }
        return next;
      });
    }, 130);
  };

  const stepLabel = INSTALL_STEPS[Math.min(INSTALL_STEPS.length - 1, Math.floor((progress / 100) * INSTALL_STEPS.length))];

  return (
    <div
      onClick={phase === "confirm" ? onClose : undefined}
      style={{ position: "absolute", inset: 0, zIndex: 20, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in"
        style={{ width: 400, maxWidth: "90%", background: "#232323", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.5)", overflow: "hidden" }}
      >
        <div style={{ display: "flex", gap: 14, padding: "20px 20px 16px", alignItems: "flex-start" }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: `linear-gradient(160deg, ${game.color}, rgba(0,0,0,0.35))`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <GameIcon game={game} size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600 }}>
              {phase === "confirm" ? `Do you want to run ${game.exeName}?` : game.exeName}
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>{game.title}</p>
          </div>
          {phase === "confirm" && (
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
              <X size={16} />
            </button>
          )}
        </div>

        {phase === "confirm" ? (
          <div
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "12px 20px",
              background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.08)",
              fontSize: 11, color: "rgba(255,255,255,0.45)",
            }}
          >
            <ShieldCheck size={14} />
            Publisher: GameDistribution.com - runs in a sandboxed frame.
          </div>
        ) : (
          <div style={{ padding: "4px 20px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 12.5, color: "rgba(255,255,255,0.7)" }}>
              {phase === "done" ? (
                <>
                  <CheckCircle2 size={15} color="#4ade80" />
                  Ready - launching {game.exeName}...
                </>
              ) : (
                <>{stepLabel}...</>
              )}
            </div>
            <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%", borderRadius: 999, width: `${progress}%`,
                  background: phase === "done" ? "#4ade80" : "var(--win-blue)",
                  transition: "width 0.13s ease-out, background 0.2s",
                }}
              />
            </div>
          </div>
        )}

        {phase === "confirm" && (
          <div style={{ display: "flex", gap: 10, padding: "14px 20px", justifyContent: "flex-end" }}>
            <button onClick={onClose} style={{ padding: "8px 18px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "white", fontSize: 13, cursor: "pointer" }}>
              Cancel
            </button>
            <button onClick={startLoading} style={{ padding: "8px 18px", borderRadius: 6, border: "none", background: "var(--win-blue)", color: "white", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              Run
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function GameViewer({ game, onBack, backLabel = "Games" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)",
            border: "none", borderRadius: 6, padding: "6px 12px", color: "white", fontSize: 12.5, cursor: "pointer",
          }}
        >
          <ArrowLeft size={14} />
          {backLabel}
        </button>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{game.title}</span>
      </div>
      <iframe
        src={game.src}
        title={game.title}
        loading="lazy"
        allow="gamepad; fullscreen"
        style={{ flex: 1, width: "100%", border: "none", background: "black" }}
      />
    </div>
  );
}
