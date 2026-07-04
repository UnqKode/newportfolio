"use client";

import { useState } from "react";
import { ExternalLink, History } from "lucide-react";
import ExplorerLayout, { SidebarItem, SidebarSection } from "../ExplorerLayout";

const OLD_PORTFOLIO_URL = "https://potfolio-seven-alpha.vercel.app";

export default function OldPortfolioApp() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ExplorerLayout
      breadcrumb={<>This PC <span style={{ opacity: 0.5 }}>›</span> Old Portfolio</>}
      sidebar={
        <>
          <SidebarSection label="Quick access" />
          <SidebarItem
            icon={<ExternalLink size={15} />}
            label="Open in new tab"
            onClick={() => window.open(OLD_PORTFOLIO_URL, "_blank", "noopener,noreferrer")}
          />
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "8px 12px", marginBottom: 16, borderRadius: 8,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <History size={16} color="#7cc0f5" />
            <span style={{ fontSize: 13, fontWeight: 500 }}>{OLD_PORTFOLIO_URL.replace("https://", "")}</span>
          </div>
          <a
            href={OLD_PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 14px", borderRadius: 6,
              background: "var(--win-blue)", color: "white", fontSize: 12.5, fontWeight: 500,
            }}
          >
            <ExternalLink size={13} />
            Open in new tab
          </a>
        </div>

        <div style={{ flex: 1, position: "relative", borderRadius: 8, overflow: "hidden", background: "white" }}>
          {!loaded && (
            <div
              style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                background: "#1a1a1a", color: "rgba(255,255,255,0.5)", fontSize: 13,
              }}
            >
              Loading old portfolio...
            </div>
          )}
          <iframe
            src={OLD_PORTFOLIO_URL}
            title="Old Portfolio"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>
    </ExplorerLayout>
  );
}
