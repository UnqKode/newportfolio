"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Power, Search } from "lucide-react";

export default function StartMenu({ apps, onOpen, onLock }) {
  const [query, setQuery] = useState("");
  const filteredApps = query
    ? apps.filter(app => app.title.toLowerCase().includes(query.toLowerCase()))
    : apps;

  return (
    <motion.div
      className="mica-panel start-menu"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: 600, height: 600, padding: 24, display: 'flex', flexDirection: 'column',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search Bar */}
      <div style={{
        width: '100%', height: 40, background: 'rgba(255,255,255,0.05)',
        borderRadius: 20, display: 'flex', alignItems: 'center', padding: '0 16px',
        border: '1px solid var(--win-dark-border)', borderBottom: '2px solid var(--win-blue)',
        marginBottom: 24
      }}>
        <Search size={16} style={{ marginRight: 12, opacity: 0.6 }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for apps, settings, and documents"
          autoFocus
          style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, outline: 'none' }}
        />
      </div>

      {/* Pinned Apps */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{query ? 'Search results' : 'Pinned'}</span>
        </div>
        {filteredApps.length === 0 ? (
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>No apps found for &quot;{query}&quot;.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
            {filteredApps.map(app => (
              <div
                key={`start-${app.id}`}
                onClick={() => onOpen(app)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: '12px 0', borderRadius: 4, cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  {app.icon}
                </div>
                <span style={{ fontSize: 12, textAlign: 'center' }}>{app.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Profile/Power Bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 4, cursor: 'pointer' }}
             onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
             onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/maya-logo.svg" alt="" width={18} height={18} style={{ filter: 'invert(1)' }} />
          </div>
          <span style={{ fontSize: 14 }}>Manas Yadav</span>
        </div>
        <button
          onClick={onLock}
          style={{ width: 40, height: 40, borderRadius: 4, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          title="Lock Screen"
        >
          <Power size={18} />
        </button>
      </div>
    </motion.div>
  );
}
