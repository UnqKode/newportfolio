"use client";

import { useEffect, useRef, useState } from "react";
import { profile, socials, projects, skillGroups } from "@/data/profile";

const PROMPT = "manas@portfolio:~$";

function buildHelp() {
  return [
    "Available commands:",
    "  whoami      - who is this, anyway",
    "  about       - a short bio",
    "  skills      - tech I work with",
    "  projects    - things I've shipped",
    "  contact     - how to reach me",
    "  resume      - open the resume",
    "  ls          - list \"files\" on this desktop",
    "  date        - current date & time",
    "  clear       - clear the terminal",
    "  sudo ...    - try it and see",
    "  hack        - for the curious",
    "  matrix      - red pill or blue pill",
    "  coffee      - brew status",
  ].join("\n");
}

function runCommand(raw) {
  const cmd = raw.trim();
  const lower = cmd.toLowerCase();

  if (cmd === "") return "";
  if (lower === "help") return buildHelp();
  if (lower === "whoami") return `${profile.name.toLowerCase().replace(" ", "-")}\n${profile.tagline}`;
  if (lower === "about") return profile.bio.join("\n\n");
  if (lower === "skills") {
    return skillGroups.map((g) => `${g.group}: ${g.items.join(", ")}`).join("\n");
  }
  if (lower === "projects") {
    return projects.map((p) => `${p.exeName.padEnd(16)} ${p.description}`).join("\n");
  }
  if (lower === "contact") {
    return [
      `email    ${profile.email}`,
      ...socials.map((s) => `${s.name.toLowerCase().padEnd(9)}${s.url}`),
    ].join("\n");
  }
  if (lower === "resume") {
    if (typeof window !== "undefined") window.open("/resume.pdf", "_blank", "noopener,noreferrer");
    return "Opening resume.pdf in a new tab...";
  }
  if (lower === "ls") {
    return ["About.exe", "Projects/", "Skills.exe", "Contact.exe", "Resume.pdf", "readme.txt"].join("   ");
  }
  if (lower === "cat readme.txt" || lower === "cat readme") {
    return "This isn't a real filesystem - but the person who built it is real, and open to work.";
  }
  if (lower === "date") return new Date().toString();
  if (lower === "clear" || lower === "cls") return "__CLEAR__";
  if (lower.startsWith("sudo")) return "Permission denied: you're not root here - you're a recruiter. 😄";
  if (lower === "rm -rf /" || lower.startsWith("rm -rf")) return "Nice try. This portfolio has better backups than that.";
  if (lower === "hack" || lower === "hack the mainframe") {
    return "__HACK__";
  }
  if (lower === "matrix") {
    return "Wake up, Manas...\nThe matrix has you.\n(Follow the white rabbit - or just check out /projects)";
  }
  if (lower === "coffee") return "☕ Brewing... error: caffeine.h not found. Try again after 8am.";
  if (lower === "vim" || lower === "vi") return "Nice - but you'll never leave. Type 'clear' to escape instead.";
  if (lower === "exit" || lower === "quit") return "There's no exit command here - just click the × above. 👋";
  return `command not found: ${cmd}\nType 'help' for a list of commands.`;
}

const HACK_LINES = [
  "Initiating totally real hack sequence...",
  "Bypassing firewall... [OK]",
  "Cracking mainframe encryption... [OK]",
  "Downloading more RAM... [OK]",
  "Access granted.",
  "Just kidding - but nice try. 😄",
];

export default function TerminalApp() {
  const [history, setHistory] = useState([
    { type: "output", text: `${profile.name} - terminal v1.0\nType 'help' to get started.` },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const pushLine = (entry) => setHistory((prev) => [...prev, entry]);

  const runHackSequence = async () => {
    for (const line of HACK_LINES) {
      await new Promise((r) => setTimeout(r, 450));
      pushLine({ type: "output", text: line });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input;
    pushLine({ type: "input", text: cmd });

    const result = runCommand(cmd);
    if (result === "__CLEAR__") {
      setHistory([]);
    } else if (result === "__HACK__") {
      runHackSequence();
    } else if (result) {
      pushLine({ type: "output", text: result });
    }
    setInput("");
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        height: "100%",
        background: "#0c0c0c",
        color: "#e6e6e6",
        fontFamily: "'Cascadia Code', 'Consolas', 'SFMono-Regular', monospace",
        fontSize: 13,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        cursor: "text",
      }}
    >
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto" }}>
        {history.map((entry, i) => (
          <div key={i} style={{ whiteSpace: "pre-wrap", marginBottom: entry.type === "input" ? 0 : 10, lineHeight: 1.6 }}>
            {entry.type === "input" ? (
              <span>
                <span style={{ color: "#4ec9b0" }}>{PROMPT}</span> {entry.text}
              </span>
            ) : (
              <span style={{ color: "rgba(230,230,230,0.85)" }}>{entry.text}</span>
            )}
          </div>
        ))}
        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#4ec9b0", flexShrink: 0 }}>{PROMPT}</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "#e6e6e6", fontFamily: "inherit", fontSize: 13,
            }}
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
