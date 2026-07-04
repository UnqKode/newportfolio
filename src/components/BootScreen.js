"use client";

import { useEffect, useState } from "react";

function requestFullscreen() {
  const el = document.documentElement;
  const request = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
  if (request) {
    try {
      const result = request.call(el);
      if (result && typeof result.catch === "function") result.catch(() => {});
    } catch {
      // Fullscreen can be denied/unsupported (e.g. iOS Safari) - fail silently and continue booting.
    }
  }
}

export default function BootScreen({ onDone }) {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fullscreen only makes sense on a real computer screen - on phones/tablets
      // just skip the prompt and boot straight into the mobile fallback UI.
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        onDone();
      } else {
        setShowPrompt(true);
      }
    }, 1400);
    return () => clearTimeout(timer);
  }, [onDone]);

  const choose = (goFullscreen) => {
    // Must call requestFullscreen synchronously inside the click handler - browsers
    // require a direct user gesture, so this can't be deferred until after onDone().
    if (goFullscreen) requestFullscreen();
    onDone();
  };

  return (
    <div
      style={{
        position: "absolute", inset: 0, zIndex: 9999,
        background: "#000",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 28, padding: 24, textAlign: "center",
      }}
    >
      <div
        style={{
          width: 68, height: 68, borderRadius: "50%",
          background: "linear-gradient(135deg, #ef4444, #7c3aed)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 40px rgba(124,58,237,0.35)",
        }}
      >
        <img src="/maya-logo.svg" alt="" width={32} height={32} style={{ filter: "invert(1)" }} />
      </div>

      {showPrompt ? (
        <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, maxWidth: 320 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
            This portfolio is best experienced in full screen. Go full screen?
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => choose(false)}
              style={{
                padding: "9px 18px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent", color: "white", fontSize: 13, cursor: "pointer",
              }}
            >
              No, continue
            </button>
            <button
              onClick={() => choose(true)}
              style={{
                padding: "9px 18px", borderRadius: 6, border: "none",
                background: "var(--win-blue)", color: "white", fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}
            >
              Yes, go full screen
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="boot-spinner" />
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: 1, textTransform: "uppercase" }}>
            Starting Manas OS
          </p>
        </>
      )}
    </div>
  );
}
