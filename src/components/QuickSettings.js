"use client";

import { Wifi, Bluetooth, Plane, Moon, Volume2, Sun, Battery, Settings, Edit3 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function QuickSettings({ onClose }) {
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(80);
  const [wifiOn, setWifiOn] = useState(true);
  const [btOn, setBtOn] = useState(false);

  return (
    <motion.div
      className="mica-panel"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', bottom: 60, right: 12, width: 360,
        padding: 20, display: 'flex', flexDirection: 'column', gap: 20,
        zIndex: 10001, borderRadius: 8,
        backgroundColor: 'rgba(32, 32, 32, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(30px)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Quick Actions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <QuickAction 
          icon={<Wifi size={18} />} 
          label="Wi-Fi" 
          active={wifiOn} 
          onClick={() => setWifiOn(!wifiOn)} 
        />
        <QuickAction 
          icon={<Bluetooth size={18} />} 
          label="Bluetooth" 
          active={btOn} 
          onClick={() => setBtOn(!btOn)} 
        />
        <QuickAction 
          icon={<Plane size={18} />} 
          label="Airplane mode" 
          active={false} 
        />
        <QuickAction 
          icon={<Moon size={18} />} 
          label="Night light" 
          active={false} 
        />
      </div>

      {/* Sliders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Brightness */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Sun size={20} color="rgba(255,255,255,0.8)" />
          <input 
            type="range" min="0" max="100" value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            style={{ flex: 1, accentColor: '#0078d4' }}
          />
        </div>
        {/* Volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Volume2 size={20} color="rgba(255,255,255,0.8)" />
          <input 
            type="range" min="0" max="100" value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={{ flex: 1, accentColor: '#0078d4' }}
          />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)',
        fontSize: 12, color: 'rgba(255,255,255,0.8)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Battery size={16} />
          <span>78%</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Edit3 size={16} cursor="pointer" />
          <Settings size={16} cursor="pointer" />
        </div>
      </div>
    </motion.div>
  );
}

function QuickAction({ icon, label, active, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        gap: 8, cursor: 'pointer'
      }}
    >
      <div 
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 16px', cursor: 'pointer', transition: 'all 0.1s',
          width: '100%', height: 48, borderRadius: 4,
          backgroundColor: active ? '#0078d4' : 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: active ? '#fff' : 'rgba(255,255,255,0.8)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          {icon}
        </div>

        <ChevronRight 
          size={16} 
          color={active ? '#fff' : 'rgba(255,255,255,0.5)'} 
        />
      </div>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', textAlign: 'center', width: '100%' }}>
        {label}
      </span>
    </div>
  );
}
