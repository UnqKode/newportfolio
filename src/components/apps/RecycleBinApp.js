"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import ExplorerLayout, { SidebarItem, SidebarSection, SidebarSearch, SidebarEmpty } from "../ExplorerLayout";

const NAV = [{ key: "empty", label: "Recently deleted" }];

export default function RecycleBinApp() {
  const [query, setQuery] = useState("");
  const filteredNav = NAV.filter((n) => n.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <ExplorerLayout
      breadcrumb={<>This PC <span style={{ opacity: 0.5 }}>›</span> Recycle Bin</>}
      sidebar={
        <>
          <SidebarSearch value={query} onChange={setQuery} />
          <SidebarSection label="Recycle Bin" />
          {filteredNav.length === 0 ? (
            <SidebarEmpty query={query} />
          ) : (
            filteredNav.map((n) => (
              <SidebarItem key={n.key} icon={<Trash2 size={15} />} label={n.label} active />
            ))
          )}
        </>
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 10,
          textAlign: "center",
        }}
      >
        <Trash2 size={48} color="rgba(255,255,255,0.25)" />
        <h3 style={{ fontSize: 16, fontWeight: 600 }}>This folder is empty</h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", maxWidth: 280 }}>
          I don&apos;t delete my work - old projects just become GitHub history.
        </p>
      </div>
    </ExplorerLayout>
  );
}
