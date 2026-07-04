"use client";

import { useEffect, useRef, useState } from "react";
import { Download, ExternalLink, GraduationCap, Briefcase, FileText, Maximize2, Minimize2 } from "lucide-react";
import { profile } from "@/data/profile";
import ExplorerLayout, { SidebarItem, SidebarSection, SidebarSearch, SidebarEmpty } from "../ExplorerLayout";

const QUICK_ACTIONS = [
  { key: "download", icon: Download, label: "Download PDF" },
  { key: "open", icon: ExternalLink, label: "Open in new tab" },
];

export default function ResumeApp() {
  const [status, setStatus] = useState("checking"); // checking | available | missing
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [query, setQuery] = useState("");
  const viewerRef = useRef(null);

  useEffect(() => {
    fetch("/resume.pdf", { method: "HEAD" })
      .then((res) => setStatus(res.ok ? "available" : "missing"))
      .catch(() => setStatus("missing"));
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === viewerRef.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      viewerRef.current?.requestFullscreen?.();
    }
  };

  const filteredActions = QUICK_ACTIONS.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <ExplorerLayout
      breadcrumb={<>This PC <span style={{ opacity: 0.5 }}>›</span> Resume</>}
      sidebar={
        <>
          <SidebarSearch value={query} onChange={setQuery} />
          <SidebarSection label="Quick access" />
          {filteredActions.length === 0 ? (
            <SidebarEmpty query={query} />
          ) : (
            filteredActions.map((a) => (
              <SidebarItem
                key={a.key}
                icon={<a.icon size={15} />}
                label={a.label}
                disabled={status !== "available"}
                onClick={() => window.open("/resume.pdf", "_blank", "noopener,noreferrer")}
              />
            ))
          )}
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Edge-style PDF toolbar */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "8px 12px", marginBottom: 16, borderRadius: 8, flexWrap: "wrap", gap: 8,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <FileText size={16} color="#ef4444" />
            <span style={{ fontSize: 13, fontWeight: 500 }}>resume.pdf</span>
          </div>

          {status === "available" && (
            <button onClick={toggleFullscreen} title={isFullscreen ? "Exit full screen" : "Expand to full screen"} style={toolbarBtnStyle}>
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          )}

          <a
            href="/resume.pdf"
            download
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 14px", borderRadius: 6,
              background: "var(--win-blue)", color: "white", fontSize: 12.5, fontWeight: 500,
              opacity: status === "available" ? 1 : 0.5,
              pointerEvents: status === "available" ? "auto" : "none",
            }}
          >
            <Download size={13} />
            Download
          </a>
        </div>

        {status === "available" ? (
          <div
            ref={viewerRef}
            style={{
              flex: 1, overflow: "auto", borderRadius: 8,
              background: isFullscreen ? "#1a1a1a" : "transparent",
            }}
          >
            <iframe
              src="/resume.pdf#toolbar=0&navpanes=0"
              title="Resume"
              style={{ width: "100%", height: "100%", border: "none", borderRadius: 8, background: "white" }}
            />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700 }}>{profile.name}</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{profile.tagline}</p>
            </div>

            {status === "missing" && (
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}>
                The PDF hasn&apos;t been uploaded yet - here&apos;s a quick summary instead.
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                <Briefcase size={15} color="var(--win-blue)" />
                Summary
              </div>
              {profile.bio.map((line, i) => (
                <p key={i} style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
                  {line}
                </p>
              ))}
            </div>

            <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>
              <GraduationCap size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />
              For the complete work history and education timeline, see the downloadable PDF once it&apos;s uploaded.
            </p>
          </div>
        )}
      </div>
    </ExplorerLayout>
  );
}

const toolbarBtnStyle = {
  width: 28, height: 28, borderRadius: 6, border: "none",
  background: "rgba(255,255,255,0.06)", color: "white",
  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
};
