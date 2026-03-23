import { useState } from "react";

const TABS = ["All", "Tracks", "Profiles", "Playlists", "Albums"];
const SORT_OPTIONS = ["Relevance", "Recommended", "In Your Feed", "New", "Comment count"];
const DEFAULT_SORT = "Relevance";

// Each sort option has a accent color and icon character
const SORT_META = {
  "Relevance":     { color: "#f50",    icon: "◎", label: "Sorted by relevance" },
  "Recommended":   { color: "#a78bfa", icon: "✦", label: "Showing recommended" },
  "In Your Feed":  { color: "#34d399", icon: "⊛", label: "From your feed" },
  "New":           { color: "#38bdf8", icon: "◈", label: "Newest first" },
  "Comment count": { color: "#fb923c", icon: "◉", label: "Most discussed first" },
};

const ALL_RESULTS = {
  Relevance: [
    { id: 1, type: "profile", title: "070 Shake", subtitle: "North Bergen", meta: "90.4K Followers", verified: true, grad: "linear-gradient(135deg,#f97316,#ec4899)" },
    { id: 2, type: "track", title: "Glitter", subtitle: "070 Shake", meta: "16.1K · 3:13", grad: "linear-gradient(135deg,#8b5cf6,#3b82f6)" },
    { id: 3, type: "track", title: "Cocoon", subtitle: "070 Shake", meta: "329K · 3:21", grad: "linear-gradient(135deg,#10b981,#06b6d4)" },
    { id: 4, type: "track", title: "Morrow", subtitle: "070 Shake", meta: "616K · 4:08", grad: "linear-gradient(135deg,#f59e0b,#ef4444)" },
    { id: 5, type: "track", title: "Guilty Conscience", subtitle: "070 Shake", meta: "1.2M · 3:33", grad: "linear-gradient(135deg,#6366f1,#ec4899)" },
    { id: 6, type: "track", title: "Uptown (Don't Remix)", subtitle: "070 Shake", meta: "1.1M · 4:19", grad: "linear-gradient(135deg,#14b8a6,#84cc16)" },
  ],
  Recommended: [
    { id: 7, type: "track", title: "Take Me Where Your Heart Is", subtitle: "Q", meta: "472 · 3:12", grad: "linear-gradient(135deg,#0ea5e9,#8b5cf6)" },
    { id: 8, type: "track", title: "Bound", subtitle: "Wet, Blood Orange", meta: "52.3K · 3:40", grad: "linear-gradient(135deg,#f43f5e,#fb923c)" },
    { id: 9, type: "track", title: "Heybb!", subtitle: "binki", meta: "179K · 2:28", grad: "linear-gradient(135deg,#a3e635,#22d3ee)" },
    { id: 10, type: "track", title: "Go Away", subtitle: "Omar Apollo", meta: "165K · 3:27", grad: "linear-gradient(135deg,#c084fc,#f472b6)" },
    { id: 11, type: "track", title: "Summertime Magic", subtitle: "Childish Gambino", meta: "3.83M · 3:33", grad: "linear-gradient(135deg,#fbbf24,#f97316)" },
    { id: 12, type: "track", title: "Cosmic Freeway (feat. Max of…", subtitle: "Yeek featuring Max of Homest…", meta: "13.1K · 6:02", grad: "linear-gradient(135deg,#34d399,#3b82f6)" },
  ],
};
for (const key of Object.keys(ALL_RESULTS)) {
  if (!ALL_RESULTS[key]) ALL_RESULTS[key] = ALL_RESULTS.Relevance.slice().reverse();
}
SORT_OPTIONS.forEach(k => { if (!ALL_RESULTS[k]) ALL_RESULTS[k] = ALL_RESULTS.Relevance.slice().reverse(); });

function Avatar({ item }) {
  return (
    <div style={{
      width: 46, height: 46,
      borderRadius: item.type === "profile" ? "50%" : 8,
      background: item.grad,
      flexShrink: 0,
    }} />
  );
}

function ResultItem({ item, accentColor }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "9px 14px", cursor: "pointer",
        background: hover ? "rgba(255,255,255,0.05)" : "transparent",
        transition: "background 0.15s",
        borderLeft: `2px solid ${hover ? accentColor + "55" : "transparent"}`,
      }}
    >
      <Avatar item={item} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 13.5, fontWeight: 500, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {item.title}
          </span>
          {item.verified && (
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="7" cy="7" r="7" fill="#f50" />
              <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{item.subtitle}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
          {item.type === "track" && <svg width="9" height="9" viewBox="0 0 10 10"><polygon points="2,1 9,5 2,9" fill="rgba(255,255,255,0.35)" /></svg>}
          {item.type === "profile" && (
            <svg width="9" height="9" viewBox="0 0 10 10">
              <circle cx="5" cy="3.5" r="2" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none" />
              <path d="M1.5 9c0-2 1.5-3 3.5-3s3.5 1 3.5 3" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
          )}
          {item.meta}
        </div>
      </div>
      <button style={{ background: "none", border: "none", padding: "4px 0 4px 8px", cursor: "pointer", color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="3" r="1.4" /><circle cx="8" cy="8" r="1.4" /><circle cx="8" cy="13" r="1.4" />
        </svg>
      </button>
    </div>
  );
}

function ActiveFilterBanner({ sortBy, onClear, accent }) {
  const meta = SORT_META[sortBy];
  return (
    <div style={{
      margin: "0 14px 10px",
      borderRadius: 10,
      background: accent + "18",
      border: `1px solid ${accent}44`,
      padding: "8px 12px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      animation: "fadeSlideIn 0.22s ease",
    }}>
      {/* colored dot */}
      <div style={{
        width: 7, height: 7, borderRadius: "50%",
        background: accent, flexShrink: 0,
        boxShadow: `0 0 6px ${accent}99`,
      }} />
      <span style={{ flex: 1, fontSize: 12, color: accent, fontWeight: 500, letterSpacing: 0.2 }}>
        {meta.label}
      </span>
      {/* clear button */}
      <button
        onClick={onClear}
        style={{
          background: accent + "22", border: `1px solid ${accent}44`,
          borderRadius: 6, padding: "2px 8px",
          fontSize: 11, color: accent, cursor: "pointer", fontWeight: 500,
          display: "flex", alignItems: "center", gap: 4,
        }}
      >
        <svg width="8" height="8" viewBox="0 0 10 10">
          <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Clear
      </button>
    </div>
  );
}

function PhoneScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  const [showSheet, setShowSheet] = useState(false);
  const [pendingSort, setPendingSort] = useState(DEFAULT_SORT);

  const isFiltered = sortBy !== DEFAULT_SORT;
  const accent = SORT_META[sortBy].color;
  const results = ALL_RESULTS[sortBy] || ALL_RESULTS.Relevance;

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sheetUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#111", overflow: "hidden", position: "relative", borderRadius: "inherit" }}>

        {/* Status Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px 4px", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
          <span>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <svg width="15" height="11" viewBox="0 0 16 12" fill="#fff"><rect x="0" y="4" width="3" height="8" rx="1" /><rect x="4.5" y="2.5" width="3" height="9.5" rx="1" /><rect x="9" y="1" width="3" height="11" rx="1" /><rect x="13.5" y="0" width="2.5" height="12" rx="1" opacity=".3" /></svg>
            <svg width="15" height="11" viewBox="0 0 24 12" fill="#fff"><path d="M1 6C3 2 7 0 12 0s9 2 11 6" opacity=".3" /><path d="M4 6c1.5-2.5 4.5-4 8-4s6.5 1.5 8 4" opacity=".6" /><path d="M7.5 6C8.5 4.5 10 3.5 12 3.5s3.5 1 4.5 2.5" /><circle cx="12" cy="9" r="2" /></svg>
            <div style={{ width: 22, height: 11, border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 3, padding: "1.5px", display: "flex", gap: "1.5px" }}>
              <div style={{ flex: 1, background: "#fff", borderRadius: 1 }} /><div style={{ flex: 1, background: "#fff", borderRadius: 1 }} /><div style={{ flex: 0.5, background: "rgba(255,255,255,0.25)", borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ padding: "8px 14px 0", flexShrink: 0 }}>
          <div style={{
            background: "rgba(255,255,255,0.09)", borderRadius: 20,
            display: "flex", alignItems: "center", padding: "8px 12px", gap: 8,
            border: isFiltered ? `1px solid ${accent}44` : "1px solid transparent",
            transition: "border-color 0.3s",
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none" /><path d="M11 11l3 3" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" /></svg>
            <span style={{ flex: 1, fontSize: 14, color: "rgba(255,255,255,0.9)" }}>070 shake</span>
            <button style={{ background: "rgba(255,255,255,0.18)", border: "none", width: 17, height: 17, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
              <svg width="9" height="9" viewBox="0 0 10 10"><path d="M2 2l6 6M8 2l-6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", padding: "8px 14px 0", borderBottom: "1px solid rgba(255,255,255,0.07)", overflowX: "auto", flexShrink: 0 }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: "none", border: "none", padding: "5px 12px 9px",
              fontSize: 13, fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.38)",
              cursor: "pointer", whiteSpace: "nowrap", position: "relative", flexShrink: 0,
            }}>
              {tab}
              {activeTab === tab && <div style={{ position: "absolute", bottom: 0, left: 12, right: 12, height: 2, background: "#f50", borderRadius: 1 }} />}
            </button>
          ))}
        </div>

        {/* Filter Row — sort pill changes color when active */}
        <div style={{ display: "flex", gap: 6, padding: "8px 14px 6px", flexShrink: 0 }}>
          {/* Sort pill */}
          <button
            onClick={() => { setPendingSort(sortBy); setShowSheet(true); }}
            style={{
              background: isFiltered ? accent + "22" : "none",
              border: isFiltered ? `1px solid ${accent}66` : "1px solid transparent",
              borderRadius: 20,
              padding: isFiltered ? "3px 10px 3px 8px" : "3px 0",
              fontSize: 12.5,
              color: isFiltered ? accent : "rgba(255,255,255,0.65)",
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 5,
              transition: "all 0.25s",
              fontWeight: isFiltered ? 600 : 400,
            }}
          >
            {isFiltered && (
              <span style={{ fontSize: 13, lineHeight: 1 }}>{SORT_META[sortBy].icon}</span>
            )}
            {sortBy}
            {isFiltered && !showSheet && (
              <span style={{ fontSize: 10, fontWeight: 700, color: accent, background: accent + "22", border: `1px solid ${accent}55`, borderRadius: 12, padding: "2px 6px", marginLeft: 6, letterSpacing: 0.4 }}>
                FILTERED
              </span>
            )}
            <svg width="11" height="11" viewBox="0 0 12 12"><path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
          </button>

          {/* Time pill (static) */}
          <button style={{ background: "none", border: "1px solid transparent", borderRadius: 20, padding: "3px 0", fontSize: 12.5, color: "rgba(255,255,255,0.65)", cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
            All time
            <svg width="11" height="11" viewBox="0 0 12 12"><path d="M3 4.5l3 3 3-3" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
          </button>

        </div>

        {/* Active filter banner */}
        {isFiltered && (
          <ActiveFilterBanner
            sortBy={sortBy}
            accent={accent}
            onClear={() => setSortBy(DEFAULT_SORT)}
          />
        )}

        {/* Results — left border track shows accent when filtered */}
        <div style={{
          flex: 1, overflowY: "auto", paddingBottom: 4,
          borderLeft: isFiltered ? `3px solid ${accent}` : "3px solid transparent",
          transition: "border-color 0.3s",
        }}>
          {results.map(item => (
            <ResultItem key={item.id} item={item} accentColor={accent} />
          ))}
        </div>

        {/* Bottom Nav */}
        <div style={{ background: "#1a1a1a", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", padding: "9px 0 18px", flexShrink: 0 }}>
          {[
            { label: "Home", icon: <path d="M3 10V6.5L7 3l4 3.5V10H8.5V7.5h-3V10H3z" fill="currentColor" /> },
            { label: "Feed", icon: <><rect x="3" y="3" width="8" height="1.5" rx=".75" fill="currentColor" /><rect x="3" y="6.25" width="8" height="1.5" rx=".75" fill="currentColor" /><rect x="3" y="9.5" width="5" height="1.5" rx=".75" fill="currentColor" /></> },
            { label: "Search", icon: <><circle cx="6.5" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>, active: true },
            { label: "Library", icon: <><rect x="3" y="3" width="2" height="8" rx="1" fill="currentColor" /><rect x="7" y="5" width="2" height="6" rx="1" fill="currentColor" /><rect x="11" y="2" width="2" height="9" rx="1" fill="currentColor" /></> },
            { label: "Upgrade", icon: <path d="M7 3L9.5 8H11.5L7 13L2.5 8H4.5L7 3Z" fill="currentColor" /> },
          ].map(({ label, icon, active }) => (
            <button key={label} style={{ flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", color: active ? "#f50" : "rgba(255,255,255,0.3)", padding: "1px 0" }}>
              <svg width="20" height="20" viewBox="0 0 14 14">{icon}</svg>
              <span style={{ fontSize: 9.5, fontWeight: active ? 600 : 400 }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Bottom Sheet */}
        {showSheet && (
          <div
            onClick={e => { if (e.target === e.currentTarget) setShowSheet(false); }}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 20, display: "flex", alignItems: "flex-end", borderRadius: "inherit" }}
          >
            <div style={{ width: "100%", background: "#1e1e1e", borderRadius: "14px 14px 0 0", paddingBottom: 24, animation: "sheetUp 0.25s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px 10px" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Sort by</span>
                <button onClick={() => setShowSheet(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              </div>

              {SORT_OPTIONS.map(opt => {
                const meta = SORT_META[opt];
                const selected = pendingSort === opt;
                return (
                  <button key={opt} onClick={() => setPendingSort(opt)} style={{
                    width: "100%", background: selected ? meta.color + "14" : "none",
                    border: "none", padding: "11px 18px",
                    display: "flex", alignItems: "center", gap: 13, cursor: "pointer",
                    transition: "background 0.15s",
                  }}>
                    {/* Radio */}
                    <div style={{
                      width: 19, height: 19, borderRadius: "50%",
                      border: `2px solid ${selected ? meta.color : "rgba(255,255,255,0.28)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      transition: "border-color 0.15s",
                    }}>
                      {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: meta.color }} />}
                    </div>
                    {/* Icon */}
                    <span style={{ fontSize: 15, color: meta.color, lineHeight: 1, flexShrink: 0 }}>{meta.icon}</span>
                    {/* Label */}
                    <span style={{ fontSize: 14, color: selected ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: selected ? 500 : 400 }}>{opt}</span>
                    {/* remove explicit 'FILTER' badge on menu options */}
                  </button>
                );
              })}

              <div style={{ padding: "10px 18px 0" }}>
                <button
                  onClick={() => { setSortBy(pendingSort); setShowSheet(false); }}
                  style={{
                    width: "100%",
                    background: SORT_META[pendingSort].color,
                    border: "none", borderRadius: 22,
                    padding: "12px", fontSize: 14, fontWeight: 600, color: "#fff", cursor: "pointer",
                    transition: "background 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  <span style={{ fontSize: 15 }}>{SORT_META[pendingSort].icon}</span>
                  Apply — {pendingSort}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      <div style={{
        width: 375, height: 812,
        borderRadius: 52,
        background: "#000",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.8), inset 0 0 0 1.5px rgba(255,255,255,0.06)",
        padding: 10,
        position: "relative",
        flexShrink: 0,
      }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 44, overflow: "hidden", position: "relative", background: "#111" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 30, background: "#000", borderRadius: "0 0 18px 18px", zIndex: 30 }} />
          <PhoneScreen />
        </div>
        <div style={{ position: "absolute", left: -3, top: 120, width: 3, height: 36, background: "#1c1c1c", borderRadius: "3px 0 0 3px" }} />
        <div style={{ position: "absolute", left: -3, top: 168, width: 3, height: 56, background: "#1c1c1c", borderRadius: "3px 0 0 3px" }} />
        <div style={{ position: "absolute", left: -3, top: 236, width: 3, height: 56, background: "#1c1c1c", borderRadius: "3px 0 0 3px" }} />
        <div style={{ position: "absolute", right: -3, top: 160, width: 3, height: 72, background: "#1c1c1c", borderRadius: "0 3px 3px 0" }} />
      </div>
    </div>
  );
}
