"use client";

import { motion } from "framer-motion";
import { RefreshCw, ArrowDownAZ, ArrowUpZA, LayoutGrid, Grid2x2, Paintbrush, User, ZoomIn } from "lucide-react";

function MenuItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        padding: "8px 14px", background: "transparent", border: "none",
        color: "white", fontSize: 13, cursor: "pointer", textAlign: "left",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {icon}
      {label}
    </button>
  );
}

export default function ContextMenu({ x, y, sortDirection, iconSize, fontScale, onRefresh, onToggleSort, onToggleIconSize, onIncreaseFontSize, onPersonalize, onAboutPC, onClose }) {
  const nextSort = sortDirection === "asc" ? "desc" : "asc";
  return (
    <motion.div
      className="mica-panel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
      onClick={(e) => { e.stopPropagation(); onClose(); }}
      style={{
        position: "fixed", top: y, left: x, minWidth: 220,
        borderRadius: 8, padding: "6px 0", zIndex: 100000,
        backgroundColor: "rgba(32, 32, 32, 0.95)",
      }}
    >
      <MenuItem
        icon={<RefreshCw size={15} />}
        label="Refresh"
        onClick={onRefresh}
      />
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0" }} />
      <MenuItem
        icon={nextSort === "asc" ? <ArrowDownAZ size={15} /> : <ArrowUpZA size={15} />}
        label={`Sort by name (${nextSort === "asc" ? "A to Z" : "Z to A"})`}
        onClick={onToggleSort}
      />
      <MenuItem
        icon={iconSize === "large" ? <Grid2x2 size={15} /> : <LayoutGrid size={15} />}
        label={iconSize === "large" ? "Small icons" : "Large icons"}
        onClick={onToggleIconSize}
      />
      <MenuItem
        icon={<ZoomIn size={15} />}
        label={fontScale >= 1.5 ? "Increase text size (max)" : "Increase text size"}
        onClick={onIncreaseFontSize}
      />
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0" }} />
      <MenuItem
        icon={<Paintbrush size={15} />}
        label="Personalize"
        onClick={onPersonalize}
      />
      <MenuItem
        icon={<User size={15} />}
        label="About this PC"
        onClick={onAboutPC}
      />
    </motion.div>
  );
}
