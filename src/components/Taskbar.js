"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronUp, Volume2, Wifi, Battery, Search } from "lucide-react";
import fileExplorerIcon from "../../public/fileexplorer.png";
import storeIcon from "../../public/microsoftstore.png";
import edgeIcon from "../../public/edge.png";

function PinnedButton({ app, icon, isOpen, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      title={app.title}
      style={{
        width: 40, height: 40, borderRadius: 4, border: 'none',
        background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', position: 'relative'
      }}
      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--taskbar-hover)' }}
      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
    >
      {icon}
      {isOpen && (
        <div style={{
          position: 'absolute', bottom: 2, width: isActive ? 16 : 6, height: 3,
          background: isActive ? '#0078d4' : 'rgba(255,255,255,0.5)',
          borderRadius: 3, transition: 'width 0.2s'
        }} />
      )}
    </button>
  );
}

export default function Taskbar({ openWindows, activeWindow, onAppClick, fileExplorerApp, browserApp, storeApp, startOpen, toggleStart, toggleQuick }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isAppOpen = (id) => openWindows.some(w => w.id === id);

  return (
    <div
      className="mica-panel"
      style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%', height: 48,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 12px', zIndex: 10000, borderRadius: 0, borderBottom: 'none',
        borderLeft: 'none', borderRight: 'none'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left section (Weather/Widgets) - Optional, leaving blank for balance */}
      <div style={{ width: 150 }}></div>

      {/* Center section (Start & Apps) */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', height: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <button
          onClick={toggleStart}
          style={{
            width: 40, height: 40, borderRadius: 4, border: 'none',
            background: startOpen ? 'var(--taskbar-hover)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.1s'
          }}
          onMouseEnter={(e) => { if (!startOpen) e.currentTarget.style.background = 'var(--taskbar-hover)' }}
          onMouseLeave={(e) => { if (!startOpen) e.currentTarget.style.background = 'transparent' }}
        >
         <img src="/windows.svg" alt="Start" style={{ marginBottom: 0, width: 25 }} />
        </button>

        <button
          onClick={() => { toggleStart(); }}
          style={{
            width: '240px', height: 36,
            backgroundColor: 'rgba(41, 41, 41, 0.13)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px', // Windows 11 style pill shape
            display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px',
            cursor: 'text', transition: 'all 0.2s ease',
            margin: '0 4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(41, 41, 41, 0.13)'}
        >
          <Search color="rgba(255, 255, 255, 0.9)" size={16} strokeWidth={2} />
          <span style={{
            color: 'rgba(255, 255, 255, 0.7)', fontSize: '13px', fontWeight: '400',
            fontFamily: 'Segoe UI, system-ui, sans-serif'
          }}>
            Search
          </span>
        </button>

        <PinnedButton
          app={storeApp}
          icon={<Image src={storeIcon} alt="" width={32} height={32} />}
          isOpen={isAppOpen(storeApp.id)}
          isActive={activeWindow === storeApp.id}
          onClick={() => onAppClick(storeApp)}
        />
        <PinnedButton
          app={fileExplorerApp}
          icon={<Image src={fileExplorerIcon} alt="" width={32} height={32} />}
          isOpen={isAppOpen(fileExplorerApp.id)}
          isActive={activeWindow === fileExplorerApp.id}
          onClick={() => onAppClick(fileExplorerApp)}
        />
        <PinnedButton
          app={browserApp}
          icon={<Image src={edgeIcon} alt="" width={32} height={32} />}
          isOpen={isAppOpen(browserApp.id)}
          isActive={activeWindow === browserApp.id}
          onClick={() => onAppClick(browserApp)}
        />

        {openWindows
          .filter(app => ![fileExplorerApp.id, browserApp.id, storeApp.id].includes(app.id))
          .map(app => (
            <button
              key={`taskbar-${app.id}`}
              onClick={() => onAppClick(app)}
              style={{
                width: 40, height: 40, borderRadius: 4, border: 'none',
                background: activeWindow === app.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', position: 'relative'
              }}
              onMouseEnter={(e) => { if (activeWindow !== app.id) e.currentTarget.style.background = 'var(--taskbar-hover)' }}
              onMouseLeave={(e) => { if (activeWindow !== app.id) e.currentTarget.style.background = 'transparent' }}
            >
              {app.icon}
              <div style={{
                position: 'absolute', bottom: 2, width: activeWindow === app.id ? 16 : 6, height: 3,
                background: activeWindow === app.id ? '#0078d4' : 'rgba(255,255,255,0.5)',
                borderRadius: 3, transition: 'width 0.2s'
              }} />
            </button>
          ))}
      </div>

      {/* Right section (System Tray & Clock) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: '100%', paddingRight: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px', height: 40, borderRadius: 4, cursor: 'pointer' }}
             onMouseEnter={(e) => e.currentTarget.style.background = 'var(--taskbar-hover)'}
             onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
          <ChevronUp size={16} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px', height: 40, borderRadius: 4, cursor: 'pointer' }}
             onMouseEnter={(e) => e.currentTarget.style.background = 'var(--taskbar-hover)'}
             onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
             onClick={toggleQuick}>
          <Wifi size={16} />
          <Volume2 size={16} />
          <Battery size={16} />
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', padding: '0 8px', height: 40, borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--taskbar-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{time.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
