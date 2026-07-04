"use client";

import { useState, cloneElement } from "react";
import { AnimatePresence } from "framer-motion";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import Window from "./Window";
import QuickSettings from "./QuickSettings";
import ContextMenu from "./ContextMenu";
import NotificationToast from "./NotificationToast";
import { Terminal } from "lucide-react";
import AboutApp from "./apps/AboutApp";
import ProjectsApp from "./apps/ProjectsApp";
import ContactApp from "./apps/ContactApp";
import ResumeApp from "./apps/ResumeApp";
import SkillsApp from "./apps/SkillsApp";
import BrowserApp from "./apps/BrowserApp";
import StoreApp from "./apps/StoreApp";
import TerminalApp from "./apps/TerminalApp";
import RecycleBinApp from "./apps/RecycleBinApp";
import GamesApp from "./apps/GamesApp";
import OldPortfolioApp from "./apps/OldPortfolioApp";

const desktopApps = [
  { id: 'about', title: 'About Me', icon: <img src="/icon-about.svg" alt="" width={32} height={32} />, content: <AboutApp /> },
  { id: 'projects', title: 'Projects', icon: <img src="/icon-projects.svg" alt="" width={32} height={32} />, content: <ProjectsApp /> },
  { id: 'skills', title: 'Skills', icon: <img src="/icon-skills.svg" alt="" width={32} height={32} />, content: <SkillsApp /> },
  { id: 'contact', title: 'Contact', icon: <img src="/icon-contact.svg" alt="" width={32} height={32} />, content: <ContactApp /> },
  { id: 'resume', title: 'Resume', icon: <img src="/icon-resume.svg" alt="" width={32} height={32} />, content: <ResumeApp /> },
  { id: 'terminal', title: 'Terminal', icon: <Terminal size={32} color="#4ec9b0" />, content: <TerminalApp /> },
  { id: 'games', title: 'Games', icon: <img src="/icon-games.svg" alt="" width={32} height={32} />, content: <GamesApp /> },
  { id: 'recycle', title: 'Recycle Bin', icon: <img src="/icon-recyclebin.svg" alt="" width={32} height={32} />, content: <RecycleBinApp /> },
  { id: 'oldportfolio', title: 'Old Portfolio', icon: <img src="/icon-oldportfolio.svg" alt="" width={32} height={32} />, content: <OldPortfolioApp /> },
];

const browserApp = { id: 'browser', title: 'Microsoft Edge', icon: <img src="/edge.png" alt="" width={20} height={20} />, content: <BrowserApp /> };
const storeApp = { id: 'store', title: 'Microsoft Store', icon: <img src="/microsoftstore.png" alt="" width={20} height={20} />, content: <StoreApp /> };

export default function Desktop({ onLock }) {
  const [startOpen, setStartOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [contextMenu, setContextMenu] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [iconSize, setIconSize] = useState('large');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const openWindow = (app) => {
    if (!windows.find(w => w.id === app.id)) {
      setWindows([...windows, app]);
    }

    if (activeWindow === app.id && !minimizedWindows[app.id]) {
      // If it's already active and open, clicking taskbar minimizes it
      setMinimizedWindows(prev => ({ ...prev, [app.id]: true }));
      setActiveWindow(null);
    } else {
      // Unminimize and focus
      setMinimizedWindows(prev => ({ ...prev, [app.id]: false }));
      setActiveWindow(app.id);
    }

    setStartOpen(false);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimizeWindow = (id) => {
    setMinimizedWindows(prev => ({ ...prev, [id]: true }));
    if (activeWindow === id) setActiveWindow(null);
  };

  const orderedApps = sortDirection
    ? [...desktopApps].sort((a, b) =>
        sortDirection === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      )
    : desktopApps;

  const iconPx = iconSize === 'large' ? 32 : 22;
  const tileWidth = iconSize === 'large' ? 80 : 64;

  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    setStartOpen(false);
    setQuickOpen(false);
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleRefresh = () => {
    setContextMenu(null);
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <div
      className="animate-fade-in"
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      onClick={() => { setStartOpen(false); setQuickOpen(false); setContextMenu(null); setSelectedIcon(null); }}
      onContextMenu={handleDesktopContextMenu}
    >
      {/* Desktop Icons */}
      <div
        className={refreshing ? 'desktop-refreshing' : ''}
        style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'flex-start', gap: 20, padding: 20, height: 'calc(100% - 48px)' }}
      >
        {orderedApps.map(app => (
          <div
            key={`desktop-${app.id}`}
            onClick={(e) => { e.stopPropagation(); setSelectedIcon(app.id); }}
            onDoubleClick={(e) => { e.stopPropagation(); openWindow(app); }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', width: tileWidth,
              padding: 10, borderRadius: 4, cursor: 'pointer', transition: 'background 0.1s',
              background: selectedIcon === app.id ? 'rgba(255,255,255,0.15)' : 'transparent',
            }}
            onMouseEnter={(e) => { if (selectedIcon !== app.id) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={(e) => { if (selectedIcon !== app.id) e.currentTarget.style.background = 'transparent'; }}
          >
            {iconSize === 'large'
              ? app.icon
              : cloneElement(app.icon, app.icon.type === 'img' ? { width: iconPx, height: iconPx } : { size: iconPx })}
            <span style={{ fontSize: 12, marginTop: 5, textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
              {app.title}
            </span>
          </div>
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map(win => (
          <Window
            key={win.id}
            app={win}
            isActive={activeWindow === win.id}
            isMinimized={minimizedWindows[win.id]}
            onFocus={() => {
              setActiveWindow(win.id);
              setMinimizedWindows(prev => ({ ...prev, [win.id]: false }));
            }}
            onMinimize={() => minimizeWindow(win.id)}
            onClose={() => closeWindow(win.id)}
          />
        ))}
      </AnimatePresence>

      {/* Start Menu Overlay */}
      <AnimatePresence>
        {startOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'fixed', bottom: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10001 }}
          >
            <StartMenu apps={desktopApps} onOpen={openWindow} onLock={onLock} />
          </div>
        )}
      </AnimatePresence>

      {/* Quick Settings Overlay */}
      <AnimatePresence>
        {quickOpen && (
          <QuickSettings onClose={() => setQuickOpen(false)} />
        )}
      </AnimatePresence>

      {/* Right-click context menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            sortDirection={sortDirection}
            iconSize={iconSize}
            onRefresh={handleRefresh}
            onToggleSort={() => { setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc'); setContextMenu(null); }}
            onToggleIconSize={() => { setIconSize(prev => prev === 'large' ? 'small' : 'large'); setContextMenu(null); }}
            onPersonalize={() => { setContextMenu(null); setQuickOpen(true); }}
            onAboutPC={() => { setContextMenu(null); openWindow(desktopApps.find(a => a.id === 'about')); }}
            onClose={() => setContextMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Notification toast */}
      <NotificationToast onOpen={() => openWindow(desktopApps.find(a => a.id === 'contact'))} />

      {/* Taskbar */}
      <Taskbar
        openWindows={windows}
        activeWindow={activeWindow}
        onAppClick={openWindow}
        fileExplorerApp={desktopApps.find(a => a.id === 'projects')}
        browserApp={browserApp}
        storeApp={storeApp}
        startOpen={startOpen}
        toggleStart={(e) => { e.stopPropagation(); setStartOpen(!startOpen); setQuickOpen(false); }}
        toggleQuick={(e) => { e.stopPropagation(); setQuickOpen(!quickOpen); setStartOpen(false); }}
      />
    </div>
  );
}
