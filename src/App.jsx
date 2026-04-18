import { useState, useMemo, useCallback } from "react";
import { DATA, CATEGORIES, PROVIDER_COLORS, STORNO_RULES, GESTORE_IDS } from "./data.js";
import Calculator from "./Calculator.jsx";

const fmt = (v) => v.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

// Riepilogo storno per ciascun fornitore (breve, per colonna tabella)
const STORNO_SUMMARY = {
  "Estra": "50% se ≤2 mesi",
  "Fastweb En.": "Su OK CARICATO Promup",
  "Edison": "RES 50% <4m; BIZ 50%<4m / 40% 5°-7°m",
  "Edison SiB": "Switch 30%+70% in 12m; obbl. SDD",
  "A2A": "100% ≤4m; 50% 5°-6°m",
  "Axpo": "100% non entrati; 90% ≤1m; 50% 2-3m; 20% 4-6m",
  "AGN Energia": "Rinnovo dal 13° mese",
  "Fastweb": "100% stesso indir. ±2m; 100% se numer. non validata",
  "Fastweb BIZ": "SHP 100% stesso indir.; LARGE 100% <12m",
  "TIM": "Storno se RID non attivo; 250€ penale LNA a CB",
  "TIM BIZ": "100% cess./morosità/frode <9m",
  "WindTre": "RES 100% <6m; BIZ 100% <9m",
  "SM E1": "Cluster E1; Canvass Entry+Gold; Enasarco+Rit. 5,60%",
  "SM E2": "Cluster E2; Canvass Entry+Gold; Enasarco+Rit. 5,60%",
  "SM E3": "Cluster E3; Canvass Entry+Gold; Enasarco+Rit. 5,60%",
  "Edison (SM)": "Cluster E1; Canvass+RID; Enasarco+Rit. 5,60%",
  "Eni (SM)": "Cluster E1; Canvass+RID; Enasarco+Rit. 5,60%",
  "Iren (SM)": "Cluster E1/E2/E3; Canvass+RID; Enasarco+Rit. 5,60%",
  "Acea (SM)": "Cluster E2; Canvass+RID; Enasarco+Rit. 5,60%",
  "Fastweb En. (SM)": "Cluster E2; Canvass+RID; Enasarco+Rit. 5,60%",
  "Illumia (SM)": "Cluster E3; Canvass+RID; Enasarco+Rit. 5,60%",
  "Wekiwi (SM)": "Cluster E3; Canvass+RID; Enasarco+Rit. 5,60%",
  "AGN Dir.": "Rinnovo 13°m; Ric. Cond 5€/MWh, Biz 2€/MWh",
  "Magis Dir.": "100% non entrati; 50% <6m; SDD/Paperless addon",
  // 2GEST
  "Vodafone": "100% ≤12m; SSD min 90%; -1 canone se già Vodafone",
  "Fastweb (2G)": "SSD obbl. RES+BIZ; OTP",
  "Wind3 (2G)": "100% ≤9m; SSD obbl.; OTP",
  "TIM (2G)": "RES 100% ≤6m; BUS 100% ≤10m; SSD obbl. (→50%)",
  "Enel Energia": "100% ≤2m; SSD non obbl.",
  "Plenitude": "Nessuno storno; SSD obbl. (→50%); Churn<20%",
  "Edison (2G)": "100% ≤3m; SSD non obbl. (→50%); Churn<20%",
  "HERAcomm": "100% ≤1m; SSD non obbl. (→50%); Churn<20%",
  "Argos": "100% ≤1m; SSD obbl. BIZ",
  "Luce e Gas": "100% ≤3m; escluse CAL/BAS/CAM; Churn<20%",
  "Sentra": "100% ≤3m; SSD non obbl. (→50%); Churn<20%",
};

const getTipoProdotto = (r) => {
  if (r.cat === "DEVICE") return "Device";
  if (r.tipo === "Luce") return "Energia Elettrica";
  if (r.tipo === "Gas") return "Gas";
  if (r.tipo === "Luce/Gas") return "Energia";
  return "Telefonia";
};

const getTipoCliente = (r) => {
  if (r.segment === "RES") return "Privato";
  if (r.segment === "BIZ" || r.segment === "PMI") return "Business";
  if (r.segment === "COND") return "Condominio";
  return "-";
};

const getGestoreId = (r) => GESTORE_IDS[r.provider] ?? GESTORE_IDS[r.fornitore] ?? "-";

const SEG_LABEL = { RES: "Privato", BIZ: "Business", PMI: "Business", COND: "Condominio" };
const segLabel = (s) => SEG_LABEL[s] || s;

export default function App() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("ALL");
  const [segFilter, setSegFilter] = useState("ALL");
  const [provFilter, setProvFilter] = useState("ALL");
  const [fornitoreFilter, setFornitoreFilter] = useState("ALL");
  const [qty, setQty] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const [stornoOpen, setStornoOpen] = useState(null);
  const [calcOpen, setCalcOpen] = useState(false);
  const [discount, setDiscount] = useState(0);

  const filtered = useMemo(() => {
    return DATA.filter(r => {
      if (catFilter !== "ALL" && r.cat !== catFilter) return false;
      if (segFilter !== "ALL" && r.segment !== segFilter) return false;
      if (provFilter !== "ALL" && r.provider !== provFilter) return false;
      if (fornitoreFilter !== "ALL" && r.fornitore !== fornitoreFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return (r.fornitore + " " + r.provider + " " + r.product + " " + r.tipo + " " + (r.note || "")).toLowerCase().includes(s);
      }
      return true;
    });
  }, [search, catFilter, segFilter, provFilter, fornitoreFilter]);

  const providers = useMemo(() => [...new Set(DATA.filter(r => (catFilter === "ALL" || r.cat === catFilter) && (fornitoreFilter === "ALL" || r.fornitore === fornitoreFilter)).map(r => r.provider))].sort(), [catFilter, fornitoreFilter]);
  const segments = useMemo(() => [...new Set(DATA.map(r => r.segment))].sort(), []);
  const fornitori = useMemo(() => [...new Set(DATA.map(r => r.fornitore))].sort(), []);

  const totalMax = useMemo(() => filtered.reduce((s, r) => s + r.massimo * qty * (1 + discount / 100), 0), [filtered, qty, discount]);

  const toggleStorno = useCallback((provider, e) => {
    e.stopPropagation();
    setStornoOpen(prev => prev === provider ? null : provider);
  }, []);

  const renderStornoPanel = (provider) => {
    const rules = STORNO_RULES[provider];
    if (!rules) return null;
    if (stornoOpen !== provider) return null;

    return (
      <tr>
        <td colSpan={qty > 1 ? 15 : 14} style={{ padding: 0 }}>
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            border: "1px solid #D6006E",
            borderRadius: 8,
            margin: "4px 8px 8px",
            padding: "16px 20px",
            animation: "fadeIn 0.2s ease"
          }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {/* Storni */}
              <div style={{ flex: "1 1 300px" }}>
                <h4 style={{ margin: "0 0 10px", color: "#F5C518", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                  ⚠️ Regole di Storno
                </h4>
                <ul style={{ margin: 0, paddingLeft: 18, listStyle: "none" }}>
                  {rules.storni.map((s, i) => (
                    <li key={i} style={{ padding: "4px 0", fontSize: 12, color: "#ccc", lineHeight: 1.5 }}>
                      <span style={{ color: "#F5C518", marginRight: 6 }}>›</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Penali */}
              {rules.penali && rules.penali.length > 0 && (
                <div style={{ flex: "1 1 300px" }}>
                  <h4 style={{ margin: "0 0 10px", color: "#ff5252", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                    🚫 Penali
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: 18, listStyle: "none" }}>
                    {rules.penali.map((p, i) => (
                      <li key={i} style={{ padding: "4px 0", fontSize: 12, color: "#ccc", lineHeight: 1.5 }}>
                        <span style={{ color: "#ff5252", marginRight: 6 }}>✕</span>
                        {p.desc} — <span style={{ color: "#ff8a80", fontWeight: 600 }}>{p.importo}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
    );
  };

  // Group rows by provider to show storno panel after last row of each provider
  const rowsWithStorno = useMemo(() => {
    const result = [];
    let lastProvider = null;
    filtered.forEach((r, i) => {
      if (lastProvider && lastProvider !== r.provider && STORNO_RULES[lastProvider]) {
        result.push({ type: "storno", provider: lastProvider, key: `storno-${lastProvider}` });
      }
      result.push({ type: "row", data: r, index: i, key: `row-${i}` });
      lastProvider = r.provider;
    });
    if (lastProvider && STORNO_RULES[lastProvider]) {
      result.push({ type: "storno", provider: lastProvider, key: `storno-${lastProvider}` });
    }
    return result;
  }, [filtered]);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#0D0D0D", color: "#E8E8E8", minHeight: "100vh", padding: "0" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .storno-btn:hover { background: #D6006E !important; color: #fff !important; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #D6006E 0%, #2D2D2D 60%)", padding: "28px 24px 20px", borderBottom: "2px solid #F5C518" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
              📋 Compensi Made
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#F5C518", fontWeight: 600 }}>
              Piano Compensi Rif. Marzo 2026 • Netto (no ritenuta / no Enasarco) • Click su gestore per dettagli storni
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "8px 14px" }}>
            <span style={{ fontSize: 13, color: "#aaa" }}>Quantità per prodotto:</span>
            <input type="number" min={1} max={999} value={qty} onChange={e => setQty(Math.max(1, +e.target.value || 1))}
              style={{ width: 60, padding: "6px 8px", borderRadius: 6, border: "1px solid #F5C518", background: "#1a1a1a", color: "#F5C518", fontSize: 15, fontWeight: 700, textAlign: "center" }} />
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ padding: "14px 24px", background: "#141414", borderBottom: "1px solid #222", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <input
          type="text" placeholder="🔍 Cerca prodotto, gestore, tipo..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: "1 1 200px", padding: "10px 14px", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: "#eee", fontSize: 14 }}
        />
        <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setProvFilter("ALL"); }}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: "#eee", fontSize: 13 }}>
          <option value="ALL">Tutte le categorie</option>
          {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={fornitoreFilter} onChange={e => { setFornitoreFilter(e.target.value); setProvFilter("ALL"); }}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: "#eee", fontSize: 13 }}>
          <option value="ALL">Tutti i fornitori</option>
          {fornitori.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        {/* Discount selector */}
        <select value={discount} onChange={e => setDiscount(parseInt(e.target.value))}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: "#eee", fontSize: 13, marginLeft: 8 }}>
          <option value={0}>Nessuno sconto</option>
          {[-15, -20, -25, -30, -35, -40, -45, -50, -55, -60, -65, -70].map(d => (
            <option key={d} value={d}>{d}%</option>
          ))}
        </select>
        {/* Export button */}
        <button onClick={() => import('./exportToExcel').then(m => m.exportToExcel(DATA, discount))}
          style={{ padding: "8px 12px", borderRadius: 6, background: "#D6006E", color: "#fff", border: "none", marginLeft: 8, cursor: "pointer" }}>
          Export Excel
        </button>
        <select value={segFilter} onChange={e => setSegFilter(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: "#eee", fontSize: 13 }}>
          <option value="ALL">Tutti i segmenti</option>
          {segments.map(s => <option key={s} value={s}>{segLabel(s)}</option>)}
        </select>
        <select value={provFilter} onChange={e => setProvFilter(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: "#eee", fontSize: 13 }}>
          <option value="ALL">Tutti i gestori</option>
          {providers.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* SUMMARY BAR */}
      <div style={{ padding: "10px 24px", background: "#1a1a1a", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 13, color: "#888" }}>
          {filtered.length} prodotti trovati su {DATA.length}
        </span>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#F5C518" }}>
          Totale Gettoni Massimi (x{qty}): {fmt(totalMax)}
        </span>
      </div>

      {/* TABLE */}
      <div style={{ overflowX: "auto", padding: "0 12px 40px" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 3px", fontSize: 13 }}>
          <thead>
            <tr style={{ position: "sticky", top: 0, zIndex: 2 }}>
              {["Fornitore di Servizio", "ID", "Gestore", "Seg.", "Prodotto", "Tipo", "Gettone", "RID", "Bol.Web", "Cons.", "MASSIMO", qty > 1 ? `x${qty}` : null, "Tipo Prodotto", "Tipo Cliente", "Storno", "Note"].filter(Boolean).map((h, i) => {
                const isNumCol = qty > 1 ? (i >= 6 && i <= 11) : (i >= 6 && i <= 10);
                return (
                  <th key={i} style={{
                    padding: "10px 8px", background: "#222", color: "#aaa", fontWeight: 600, textAlign: isNumCol ? "right" : "left",
                    borderBottom: "2px solid #D6006E", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap"
                  }}>{h}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rowsWithStorno.map((item) => {
              if (item.type === "storno") {
                return stornoOpen === item.provider ? (
                  <tr key={item.key}><td colSpan={qty > 1 ? 15 : 14} style={{ padding: 0 }}>
                    <div style={{
                      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                      border: "1px solid #D6006E", borderRadius: 8,
                      margin: "4px 8px 8px", padding: "16px 20px",
                      animation: "fadeIn 0.2s ease"
                    }}>
                      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                        <div style={{ flex: "1 1 300px" }}>
                          <h4 style={{ margin: "0 0 10px", color: "#F5C518", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                            ⚠️ Regole di Storno — {item.provider}
                          </h4>
                          <ul style={{ margin: 0, paddingLeft: 18, listStyle: "none" }}>
                            {STORNO_RULES[item.provider].storni.map((s, i) => (
                              <li key={i} style={{ padding: "4px 0", fontSize: 12, color: "#ccc", lineHeight: 1.5 }}>
                                <span style={{ color: "#F5C518", marginRight: 6 }}>›</span>{s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {STORNO_RULES[item.provider].penali?.length > 0 && (
                          <div style={{ flex: "1 1 300px" }}>
                            <h4 style={{ margin: "0 0 10px", color: "#ff5252", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                              🚫 Penali
                            </h4>
                            <ul style={{ margin: 0, paddingLeft: 18, listStyle: "none" }}>
                              {STORNO_RULES[item.provider].penali.map((p, i) => (
                                <li key={i} style={{ padding: "4px 0", fontSize: 12, color: "#ccc", lineHeight: 1.5 }}>
                                  <span style={{ color: "#ff5252", marginRight: 6 }}>✕</span>
                                  {p.desc} — <span style={{ color: "#ff8a80", fontWeight: 600 }}>{p.importo}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </td></tr>
                ) : null;
              }

              const r = item.data;
              const i = item.index;
              const pc = PROVIDER_COLORS[r.provider] || "#666";
              const hasStorno = !!STORNO_RULES[r.provider];

              return (
                <tr key={item.key}
                  style={{ background: i % 2 === 0 ? "#111" : "#0D0D0D", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1a1a1a"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#111" : "#0D0D0D"}>
                  <td style={{ padding: "9px 8px", whiteSpace: "nowrap", fontWeight: 700, color: r.fornitore === "Promup" ? "#F5C518" : "#4DD0E1" }}>{r.fornitore}</td>
                  <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 600, color: "#fff" }}>{getGestoreId(r)}</td>
                  <td style={{ padding: "9px 8px", whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-block", width: 4, height: 18, background: pc, borderRadius: 2, marginRight: 8, verticalAlign: "middle" }} />
                    <span style={{ fontWeight: 600, color: pc }}>{r.provider}</span>
                    {hasStorno && (
                      <button className="storno-btn" onClick={(e) => toggleStorno(r.provider, e)}
                        style={{
                          marginLeft: 8, padding: "2px 6px", fontSize: 10, fontWeight: 700,
                          background: stornoOpen === r.provider ? "#D6006E" : "transparent",
                          color: stornoOpen === r.provider ? "#fff" : "#D6006E",
                          border: "1px solid #D6006E", borderRadius: 4, cursor: "pointer",
                          transition: "all 0.15s", verticalAlign: "middle"
                        }}>
                        {stornoOpen === r.provider ? "▲" : "▼"} STORNI
                      </button>
                    )}
                  </td>
                  <td style={{ padding: "9px 6px" }}>
                    <span style={{
                      display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                      background: r.segment === "RES" ? "#1B5E20" : r.segment === "BIZ" ? "#0D47A1" : r.segment === "COND" ? "#4A148C" : r.segment === "PMI" ? "#BF360C" : "#E65100",
                      color: "#fff"
                    }}>{segLabel(r.segment)}</span>
                  </td>
                  <td style={{ padding: "9px 8px", fontWeight: 500, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.product}</td>
                  <td style={{ padding: "9px 6px", color: "#888", fontSize: 12 }}>{r.tipo}</td>
                  <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 600, color: r.gettone > 0 ? "#eee" : "#555" }}>{r.gettone > 0 ? fmt(r.gettone * (1 + discount / 100)) : "—"}</td>
                  <td style={{ padding: "9px 6px", textAlign: "right", color: r.rid > 0 ? "#4CAF50" : "#333" }}>{r.rid > 0 ? fmt(r.rid * (1 + discount / 100)) : "—"}</td>
                  <td style={{ padding: "9px 6px", textAlign: "right", color: r.bolweb > 0 ? "#2196F3" : "#333" }}>{r.bolweb > 0 ? fmt(r.bolweb * (1 + discount / 100)) : "—"}</td>
                  <td style={{ padding: "9px 6px", textAlign: "right", color: r.consenso > 0 ? "#FF9800" : "#333" }}>{r.consenso > 0 ? fmt(r.consenso * (1 + discount / 100)) : "—"}</td>
                  <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, color: "#F5C518", fontSize: 14 }}>{r.massimo > 0 ? fmt(r.massimo * (1 + discount / 100)) : "% vedi note"}</td>
                  {qty > 1 && <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, color: "#D6006E" }}>{r.massimo > 0 ? fmt(r.massimo * qty * (1 + discount / 100)) : "—"}</td>}
                  <td style={{ padding: "9px 6px", fontSize: 11, color: "#90CAF9" }}>{getTipoProdotto(r)}</td>
                  <td style={{ padding: "9px 6px", fontSize: 11, color: "#A5D6A7" }}>{getTipoCliente(r)}</td>
                  <td style={{ padding: "9px 8px", color: "#FF9800", fontSize: 11, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {STORNO_SUMMARY[r.provider] || "—"}
                  </td>
                  <td style={{ padding: "9px 8px", color: "#888", fontSize: 11, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {r.note || ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "#555" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16 }}>Nessun prodotto trovato</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Prova a modificare i filtri o la ricerca</div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1a1a1a", borderTop: "1px solid #333", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, zIndex: 10 }}>
        <span style={{ color: "#666" }}>SempliCom • MADE SRL</span>
        <span style={{ color: "#F5C518", fontWeight: 700, fontSize: 14 }}>
          Totale: {fmt(totalMax)} {qty > 1 && `(${filtered.length} × ${qty})`}
        </span>
      </div>

      {/* CALCULATOR SIDEBAR */}
      <Calculator isOpen={calcOpen} onToggle={() => setCalcOpen(v => !v)} discount={discount} />
    </div>
  );
}
