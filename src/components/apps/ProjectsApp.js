"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Coins, GraduationCap, MessagesSquare, Globe, Filter, ShieldCheck, X, CheckCircle2, ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/data/profile";
import ExplorerLayout, { SidebarItem, SidebarSection, SidebarSearch, SidebarEmpty } from "../ExplorerLayout";

const INSTALL_STEPS = ["Fetching dependencies", "Compiling", "Linking", "Finishing up"];

// Some project links (e.g. a GitHub repo page) send X-Frame-Options/CSP headers
// that refuse to be framed at all - embedding those would just show a blank
// box with no way to detect *why*. Skip the iframe for known unframeable hosts
// and send visitors straight to a new tab instead.
const UNFRAMEABLE_HOSTS = ["github.com", "www.github.com"];

function isFrameable(url) {
  try {
    return !UNFRAMEABLE_HOSTS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

const iconMap = {
  mic: Mic,
  coins: Coins,
  gradcap: GraduationCap,
  chat: MessagesSquare,
  globe: Globe,
  filter: Filter,
};

function ExeIcon({ project }) {
  const Icon = iconMap[project.iconKey];
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: 10,
        background: `linear-gradient(160deg, ${project.color}, rgba(0,0,0,0.35))`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
        flexShrink: 0,
      }}
    >
      <Icon size={26} color="white" />
      {/* shortcut arrow badge */}
      <div
        style={{
          position: "absolute",
          bottom: -3,
          left: -3,
          width: 18,
          height: 18,
          borderRadius: 4,
          background: "rgba(20,20,20,0.9)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function ExeIconSmall({ project }) {
  const Icon = iconMap[project.iconKey];
  return (
    <div
      style={{
        width: 20, height: 20, borderRadius: 4,
        background: `linear-gradient(160deg, ${project.color}, rgba(0,0,0,0.35))`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}
    >
      <Icon size={12} color="white" />
    </div>
  );
}

function RunDialog({ project, onClose, onLaunch }) {
  const Icon = iconMap[project.iconKey];
  const [phase, setPhase] = useState("confirm"); // confirm | installing | done
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const startInstall = () => {
    setPhase("installing");
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 6 + Math.random() * 10);
        if (next >= 100) {
          clearInterval(intervalRef.current);
          setPhase("done");
          setTimeout(() => {
            onLaunch(project);
            onClose();
          }, 500);
        }
        return next;
      });
    }, 140);
  };

  const stepLabel = INSTALL_STEPS[Math.min(INSTALL_STEPS.length - 1, Math.floor((progress / 100) * INSTALL_STEPS.length))];

  return (
    <div
      onClick={phase === "confirm" ? onClose : undefined}
      style={{
        position: "absolute", inset: 0, zIndex: 20,
        background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in"
        style={{
          width: 420,
          maxWidth: "90%",
          background: "#232323",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 10,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", gap: 14, padding: "20px 20px 16px", alignItems: "flex-start" }}>
          <div
            style={{
              width: 44, height: 44, borderRadius: 8,
              background: `linear-gradient(160deg, ${project.color}, rgba(0,0,0,0.35))`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <Icon size={22} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600 }}>
              {phase === "confirm" ? `Do you want to run ${project.exeName}?` : project.exeName}
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
              {project.title}
            </p>
          </div>
          {phase === "confirm" && (
            <button
              onClick={onClose}
              style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {phase === "confirm" && (
          <div style={{ padding: "0 20px 16px" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 12 }}>
              {project.description}
            </p>
            <ul style={{ margin: "0 0 14px 18px", padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              {project.highlights.map((h, i) => (
                <li key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  {h}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {project.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 11, padding: "3px 10px", borderRadius: 999,
                    background: "rgba(0,120,212,0.18)", border: "1px solid rgba(0,120,212,0.4)",
                    color: "#7cc0f5",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {phase !== "confirm" && (
          <div style={{ padding: "4px 20px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 12.5, color: "rgba(255,255,255,0.7)" }}>
              {phase === "done" ? (
                <>
                  <CheckCircle2 size={15} color="#4ade80" />
                  Ready - opening {project.exeName}...
                </>
              ) : (
                <>{stepLabel}...</>
              )}
            </div>
            <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%", borderRadius: 999,
                  width: `${progress}%`,
                  background: phase === "done" ? "#4ade80" : "var(--win-blue)",
                  transition: "width 0.15s ease-out, background 0.2s",
                }}
              />
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 20px", background: "rgba(255,255,255,0.03)",
            borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 11, color: "rgba(255,255,255,0.45)",
          }}
        >
          <ShieldCheck size={14} />
          Publisher: Manas Yadav - unsigned indie project, runs anyway.
        </div>

        {phase === "confirm" && (
          <div style={{ display: "flex", gap: 10, padding: "14px 20px", justifyContent: "flex-end" }}>
            <button
              onClick={onClose}
              style={{
                padding: "8px 18px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent", color: "white", fontSize: 13, cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={startInstall}
              style={{
                padding: "8px 18px", borderRadius: 6, border: "none",
                background: "var(--win-blue)", color: "white", fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}
            >
              Run
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const OFFLINE_TIMEOUT_MS = 9000;

function ProjectViewer({ project, onBack }) {
  const hasLink = Boolean(project.link);
  const [loaded, setLoaded] = useState(false);
  const [offline, setOffline] = useState(!hasLink);
  const frameable = hasLink && isFrameable(project.link);

  // A dead/unreachable site never fires the iframe's onLoad, so there's no direct
  // way to detect that failure - a timeout is the standard fallback: if nothing
  // has loaded after a generous window, assume the site is down rather than
  // leaving a "Loading..." spinner running forever.
  useEffect(() => {
    if (!frameable || loaded) return;
    const timer = setTimeout(() => setOffline(true), OFFLINE_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [frameable, loaded]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)",
            border: "none", borderRadius: 6, padding: "6px 12px", color: "white", fontSize: 12.5, cursor: "pointer",
          }}
        >
          <ArrowLeft size={14} />
          Projects
        </button>
        <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{project.title}</span>
        {hasLink && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)",
              border: "none", borderRadius: 6, padding: "6px 12px", color: "white", fontSize: 12.5, textDecoration: "none",
            }}
          >
            <ExternalLink size={13} />
            Open in new tab
          </a>
        )}
      </div>

      {!hasLink || (frameable && offline) ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", maxWidth: 360, textAlign: "center" }}>
            The site is not online right now.
          </p>
          {hasLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "9px 18px", borderRadius: 6,
                background: "var(--win-blue)", color: "white", fontSize: 13, fontWeight: 500, textDecoration: "none",
              }}
            >
              <ExternalLink size={14} />
              Try in new tab
            </a>
          )}
        </div>
      ) : frameable ? (
        <div style={{ flex: 1, position: "relative", background: "white" }}>
          {!loaded && (
            <div
              style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                background: "#1a1a1a", color: "rgba(255,255,255,0.5)", fontSize: 13,
              }}
            >
              Loading {project.title}...
            </div>
          )}
          <iframe
            src={project.link}
            title={project.title}
            loading="lazy"
            onLoad={() => { setLoaded(true); setOffline(false); }}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", maxWidth: 360, textAlign: "center" }}>
            This project links to its source repository, which can&apos;t be previewed inline here.
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 18px", borderRadius: 6,
              background: "var(--win-blue)", color: "white", fontSize: 13, fontWeight: 500, textDecoration: "none",
            }}
          >
            <ExternalLink size={14} />
            Open repository
          </a>
        </div>
      )}
    </div>
  );
}

export default function ProjectsApp() {
  const [selected, setSelected] = useState(null);
  const [running, setRunning] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [query, setQuery] = useState("");

  const filteredProjects = projects.filter((p) => p.exeName.toLowerCase().includes(query.toLowerCase()));

  if (activeProject) {
    return <ProjectViewer project={activeProject} onBack={() => setActiveProject(null)} />;
  }

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <ExplorerLayout
        breadcrumb={<>This PC <span style={{ opacity: 0.5 }}>›</span> Projects</>}
        sidebar={
          <>
            <SidebarSearch value={query} onChange={setQuery} />
            <SidebarSection label="Quick access" />
            {filteredProjects.length === 0 ? (
              <SidebarEmpty query={query} />
            ) : (
              filteredProjects.map((project) => (
                <SidebarItem
                  key={project.id}
                  icon={<ExeIconSmall project={project} />}
                  label={project.exeName}
                  active={selected === project.id}
                  onClick={() => setSelected(project.id)}
                />
              ))
            )}
          </>
        }
      >
        <div onClick={() => setSelected(null)} style={{ height: "100%" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 18 }}>
            {projects.length} items - double-click a project to run it
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, 96px)",
              gap: 20,
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.24, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => { e.stopPropagation(); setSelected(project.id); }}
                onDoubleClick={(e) => { e.stopPropagation(); setRunning(project); }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  padding: "12px 6px", borderRadius: 6, cursor: "pointer", textAlign: "center",
                  background: selected === project.id ? "rgba(0,120,212,0.25)" : "transparent",
                  border: selected === project.id ? "1px solid rgba(0,120,212,0.5)" : "1px solid transparent",
                }}
              >
                <ExeIcon project={project} />
                <span style={{ fontSize: 12, wordBreak: "break-word" }}>{project.exeName}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </ExplorerLayout>

      {running && (
        <RunDialog
          project={running}
          onClose={() => setRunning(null)}
          onLaunch={(project) => { setRunning(null); setActiveProject(project); }}
        />
      )}
    </div>
  );
}
