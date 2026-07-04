"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function NotificationToast({ delay = 10000, onOpen }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          className="mica-panel"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => { onOpen(); setDismissed(true); }}
          style={{
            position: "fixed", bottom: 64, right: 12, width: 340,
            borderRadius: 8, padding: 14, zIndex: 20000,
            backgroundColor: "rgba(32, 32, 32, 0.95)",
            display: "flex", gap: 12, alignItems: "flex-start",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 22, flexShrink: 0 }}>👋</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Manas is open to freelance work</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Say hello - click to open Contact.</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
            style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", flexShrink: 0 }}
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
