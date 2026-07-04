"use client";

import { Search } from "lucide-react";

export function SidebarSearch({ value, onChange, placeholder = "Find a setting" }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 8, margin: "0 6px 10px",
        padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.05)",
      }}
    >
      <Search size={13} color="rgba(255,255,255,0.5)" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Filter sidebar items"
        style={{
          background: "transparent", border: "none", outline: "none", flex: 1,
          fontSize: 12, color: "white", minWidth: 0,
        }}
      />
    </div>
  );
}

export function SidebarEmpty({ query }) {
  return (
    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", padding: "4px 12px" }}>
      No results for &quot;{query}&quot;.
    </p>
  );
}

export function SidebarSection({ label }) {
  return (
    <div
      style={{
        fontSize: 11, textTransform: "uppercase", letterSpacing: 0.6,
        color: "rgba(255,255,255,0.35)", padding: "14px 12px 6px", fontWeight: 600,
      }}
    >
      {label}
    </div>
  );
}

export function SidebarItem({ icon, label, active, disabled, onClick }) {
  return (
    <button
      className={`sp-nav-item${active ? " active" : ""}`}
      onClick={disabled ? undefined : onClick}
      style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        padding: "7px 12px", borderRadius: 6, border: "none",
        background: active ? "rgba(0,120,212,0.25)" : "transparent",
        color: disabled ? "rgba(255,255,255,0.3)" : active ? "#7cc0f5" : "rgba(255,255,255,0.85)",
        fontSize: 13, textAlign: "left", cursor: disabled ? "default" : onClick ? "pointer" : "default",
        transition: "background 150ms ease-out",
      }}
      onMouseEnter={(e) => { if (!active && !disabled) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
      onMouseLeave={(e) => { if (!active && !disabled) e.currentTarget.style.background = "transparent"; }}
    >
      {icon}
      {label}
    </button>
  );
}

export default function ExplorerLayout({ breadcrumb, sidebar, children }) {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{
          width: 180, flexShrink: 0, overflowY: "auto",
          background: "rgba(255,255,255,0.02)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          padding: "10px 6px",
        }}
      >
        {sidebar}
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {breadcrumb && (
          <div
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "10px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: 12.5,
              color: "rgba(255,255,255,0.5)", flexShrink: 0,
            }}
          >
            {breadcrumb}
          </div>
        )}
        <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
