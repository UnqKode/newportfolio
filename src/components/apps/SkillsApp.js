"use client";

import { useRef, useState } from "react";
import { Code2, Layout, Server, Database, Cloud, TestTube2, Wrench, Sparkles } from "lucide-react";
import { skillGroups } from "@/data/profile";
import ExplorerLayout, { SidebarItem, SidebarSection, SidebarSearch, SidebarEmpty } from "../ExplorerLayout";

const groupIcons = {
  Languages: Code2,
  Frontend: Layout,
  "Backend & Infrastructure": Server,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  "Testing & Quality": TestTube2,
  "Developer Tools": Wrench,
  Specialized: Sparkles,
};

export default function SkillsApp() {
  const [active, setActive] = useState(skillGroups[0].group);
  const [query, setQuery] = useState("");
  const refs = useRef({});

  const goTo = (group) => {
    setActive(group);
    refs.current[group]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredGroups = skillGroups.filter((g) => g.group.toLowerCase().includes(query.toLowerCase()));

  return (
    <ExplorerLayout
      breadcrumb={<>This PC <span style={{ opacity: 0.5 }}>›</span> Skills</>}
      sidebar={
        <>
          <SidebarSearch value={query} onChange={setQuery} />
          <SidebarSection label="Categories" />
          {filteredGroups.length === 0 ? (
            <SidebarEmpty query={query} />
          ) : (
            filteredGroups.map((g) => {
              const Icon = groupIcons[g.group] || Code2;
              return (
                <SidebarItem
                  key={g.group}
                  icon={<Icon size={15} />}
                  label={g.group}
                  active={active === g.group}
                  onClick={() => goTo(g.group)}
                />
              );
            })
          )}
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 560 }}>
        {skillGroups.map((g) => (
          <div key={g.group} ref={(el) => (refs.current[g.group] = el)}>
            <h3
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: 0.6,
                marginBottom: 10,
              }}
            >
              {g.group}
            </h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {g.items.map((item) => (
                <span
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    padding: "7px 14px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--win-blue)",
                      display: "inline-block",
                    }}
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ExplorerLayout>
  );
}
