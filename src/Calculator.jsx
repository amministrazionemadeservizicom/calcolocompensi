import { useState, useMemo } from "react";

const fmt = (v) => v.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

// ═══════ SUPERMONEY LOGIC ═══════
const SM_CLUSTERS = [
    { id: "E1", label: "E1 — Edison/Eni/Iren Rev", base: 95 },
    { id: "E2", label: "E2 — Acea/Iren Quick/FW En.", base: 80 },
    { id: "E3", label: "E3 — Iren PS/Illumia/Wekiwi", base: 55 },
];
const SM_RID_TIERS = [
    { label: "< 60%", min: 0, max: 59, value: 5 },
    { label: "60 – 65%", min: 60, max: 65, value: 20 },
    { label: "65 – 70%", min: 66, max: 70, value: 30 },
    { label: "> 70%", min: 71, max: 100, value: 35 },
];
function smRidBonus(pct) {
    if (pct > 70) return 35;
    if (pct >= 65) return 30;
    if (pct >= 60) return 20;
    return 5;
}
function smCanvassEntry(qty) {
    let total = 0;
    if (qty <= 250) return qty * 5;
    total += 250 * 5;
    if (qty <= 350) return total + (qty - 250) * 14;
    total += 100 * 14;
    if (qty <= 500) return total + (qty - 350) * 18;
    return total + 150 * 18; // cap at 500
}
function smCanvassGold(qty) {
    if (qty > 1500) return qty * 30;
    if (qty > 1000) return qty * 20;
    if (qty > 500) return qty * 10;
    return 0;
}

// ═══════ AGN LOGIC ═══════
const AGN_PRODUCTS = [
    { id: "dom_std", label: "Domestico Standard", segment: "RES", gettone: 40, rinnovo: 36 },
    { id: "dom_sil", label: "Domestico Silver", segment: "RES", gettone: 80, rinnovo: 72 },
    { id: "dom_gold", label: "Domestico Gold", segment: "RES", gettone: 100, rinnovo: 90 },
    { id: "cond_std", label: "Condominio Standard", segment: "COND", gettone: 100, rinnovo: 50, ricMwh: 5 },
    { id: "cond_gold", label: "Condominio Gold", segment: "COND", gettone: 200, rinnovo: 175, ricMwh: 5 },
    { id: "cond_plat", label: "Condominio Platinum", segment: "COND", gettone: 350, rinnovo: 200, ricMwh: 5 },
    { id: "cond_dia", label: "Condominio Diamond", segment: "COND", gettone: 400, rinnovo: 300, ricMwh: 5 },
    { id: "biz", label: "Business", segment: "BIZ", gettone: 120, rinnovo: 60, ricMwh: 2 },
    { id: "biz_sa", label: "Business SA", segment: "BIZ", gettone: 240, rinnovo: 180, ricMwh: 2 },
];

// ═══════ MAGIS LOGIC ═══════
const MAGIS_PRODUCTS = [
    { id: "dom_a", label: "Domestico Tipo A", segment: "RES", gettone: 90, ricEE: 0.010, ricGas: 0.05 },
    { id: "dom_m", label: "Domestico Tipo M", segment: "RES", gettone: 60, ricEE: 0.010, ricGas: 0.05 },
    { id: "dom_b", label: "Domestico Tipo B", segment: "RES", gettone: 40, ricEE: 0.003, ricGas: 0.05 },
    { id: "au_a", label: "Altri Usi Tipo A", segment: "BIZ", gettone: 150, ricEE: 0.0040, ricGas: 0.05 },
    { id: "au_m", label: "Altri Usi Tipo M", segment: "BIZ", gettone: 120, ricEE: 0.0030, ricGas: 0.05 },
    { id: "au_b", label: "Altri Usi Tipo B", segment: "BIZ", gettone: 90, ricEE: 0.0020, ricGas: 0.05 },
    { id: "au_l", label: "Altri Usi Tipo L", segment: "BIZ", gettone: 50, ricEE: 0.0015, ricGas: 0.05 },
];
function magisCanvass(pdp) {
    if (pdp > 120) return 15;
    if (pdp >= 81) return 10;
    if (pdp >= 50) return 5;
    return 0;
}

const TRATTENUTE_SM = 0.056; // 5.60%
const TRATTENUTE_AGN = 0.056;
const TRATTENUTE_MAGIS = 0.276; // 27.60% (IVA 22% + Enasarco 1% + Ritenuta 4.60%)

const inputStyle = {
    width: "100%", padding: "8px 10px", borderRadius: 6,
    border: "1px solid #444", background: "#1a1a1a", color: "#eee",
    fontSize: 14, fontWeight: 600, textAlign: "center",
    boxSizing: "border-box",
};
const selectStyle = { ...inputStyle, textAlign: "left" };
const labelStyle = { fontSize: 11, color: "#888", marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: "0.5px" };
const resultRowStyle = { display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 };
const hrStyle = { border: "none", borderTop: "1px solid #333", margin: "10px 0" };

function ResultRow({ label, value, color = "#eee", bold = false }) {
    return (
        <div style={resultRowStyle}>
            <span style={{ color: "#999" }}>{label}</span>
            <span style={{ color, fontWeight: bold ? 700 : 500, fontSize: bold ? 15 : 13 }}>{value}</span>
        </div>
    );
}

function SMCalculator() {
    const [cluster, setCluster] = useState("E2");
    const [qty, setQty] = useState(300);
    const [ridPct, setRidPct] = useState(75);

    const calc = useMemo(() => {
        const cl = SM_CLUSTERS.find(c => c.id === cluster);
        const base = cl.base;
        const ridPerContract = smRidBonus(ridPct) * (ridPct / 100);
        const canvEntry = smCanvassEntry(Math.min(qty, 500));
        const canvGold = smCanvassGold(qty);
        const canvPerContract = qty > 0 ? (canvEntry + canvGold) / qty : 0;
        const lordoPerContract = base + ridPerContract + canvPerContract;
        const trattenute = lordoPerContract * TRATTENUTE_SM;
        const nettoPerContract = lordoPerContract - trattenute;
        const lordoTotale = lordoPerContract * qty;
        const nettoTotale = nettoPerContract * qty;
        return { base, ridBonus: smRidBonus(ridPct), ridPerContract, canvEntry, canvGold, canvPerContract, lordoPerContract, trattenute, nettoPerContract, lordoTotale, nettoTotale };
    }, [cluster, qty, ridPct]);

    return (
        <div>
            <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Cluster Prodotto</label>
                <select value={cluster} onChange={e => setCluster(e.target.value)} style={selectStyle}>
                    {SM_CLUSTERS.map(c => <option key={c.id} value={c.id}>{c.label} — {fmt(c.base)}</option>)}
                </select>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}>N° Contratti</label>
                    <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, +e.target.value || 1))} style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}>% RID/SDD</label>
                    <input type="number" min={0} max={100} value={ridPct} onChange={e => setRidPct(Math.min(100, Math.max(0, +e.target.value || 0)))} style={inputStyle} />
                </div>
            </div>

            <hr style={hrStyle} />
            <div style={{ fontSize: 11, color: "#F5C518", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Per Contratto</div>
            <ResultRow label="Commissione prodotto" value={fmt(calc.base)} />
            <ResultRow label={`Quota RID (€${calc.ridBonus} × ${ridPct}%)`} value={fmt(calc.ridPerContract)} color="#4CAF50" />
            <ResultRow label="Quota Canvass" value={fmt(calc.canvPerContract)} color="#2196F3" />
            <hr style={hrStyle} />
            <ResultRow label="LORDO / contratto" value={fmt(calc.lordoPerContract)} bold />
            <ResultRow label="Trattenute (5,60%)" value={`- ${fmt(calc.trattenute)}`} color="#ff5252" />
            <ResultRow label="NETTO / contratto" value={fmt(calc.nettoPerContract)} color="#F5C518" bold />

            <hr style={hrStyle} />
            <div style={{ fontSize: 11, color: "#F5C518", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Totale ({qty} contratti)</div>
            <ResultRow label="Comm. prodotto" value={fmt(calc.base * qty)} />
            <ResultRow label="Gara RID totale" value={fmt(calc.ridPerContract * qty)} color="#4CAF50" />
            <ResultRow label="Canvass Entry" value={fmt(calc.canvEntry)} color="#2196F3" />
            {calc.canvGold > 0 && <ResultRow label="Canvass Gold" value={fmt(calc.canvGold)} color="#FF9800" />}
            <hr style={hrStyle} />
            <ResultRow label="LORDO TOTALE" value={fmt(calc.lordoTotale)} bold />
            <ResultRow label="NETTO TOTALE" value={fmt(calc.nettoTotale)} color="#F5C518" bold />
        </div>
    );
}

function AGNCalculator() {
    const [productId, setProductId] = useState("cond_std");
    const [qty, setQty] = useState(1);

    const prod = AGN_PRODUCTS.find(p => p.id === productId);
    const lordoGettone = prod.gettone;
    const trattenute = lordoGettone * TRATTENUTE_AGN;
    const nettoGettone = lordoGettone - trattenute;

    return (
        <div>
            <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Prodotto</label>
                <select value={productId} onChange={e => setProductId(e.target.value)} style={selectStyle}>
                    {AGN_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.label} — {fmt(p.gettone)}</option>)}
                </select>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Quantità</label>
                <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, +e.target.value || 1))} style={inputStyle} />
            </div>

            <hr style={hrStyle} />
            <div style={{ fontSize: 11, color: "#F5C518", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Per Contratto</div>
            <ResultRow label="Gettone acquisizione" value={fmt(lordoGettone)} />
            <ResultRow label="Rinnovo (dal 13° mese)" value={fmt(prod.rinnovo)} color="#4CAF50" />
            {prod.ricMwh && <ResultRow label="Ricorrente" value={`${fmt(prod.ricMwh)}/MWh`} color="#2196F3" />}
            <hr style={hrStyle} />
            <ResultRow label="LORDO / contratto" value={fmt(lordoGettone)} bold />
            <ResultRow label="Trattenute (5,60%)" value={`- ${fmt(trattenute)}`} color="#ff5252" />
            <ResultRow label="NETTO / contratto" value={fmt(nettoGettone)} color="#F5C518" bold />

            <hr style={hrStyle} />
            <div style={{ fontSize: 11, color: "#F5C518", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Totale ({qty} contratti)</div>
            <ResultRow label="LORDO TOTALE" value={fmt(lordoGettone * qty)} bold />
            <ResultRow label="NETTO TOTALE" value={fmt(nettoGettone * qty)} color="#F5C518" bold />
            {prod.rinnovo > 0 && <ResultRow label="Rinnovo annuo tot." value={fmt(prod.rinnovo * qty)} color="#4CAF50" />}
        </div>
    );
}

function MagisCalculator() {
    const [productId, setProductId] = useState("dom_a");
    const [qty, setQty] = useState(80);
    const [hasSDD, setHasSDD] = useState(true);
    const [hasPaperless, setHasPaperless] = useState(true);

    const prod = MAGIS_PRODUCTS.find(p => p.id === productId);
    const sddAddon = hasSDD ? 15 : 0;
    const paperlessAddon = hasPaperless ? 5 : 0;
    const canvassPerPdp = magisCanvass(qty);
    const lordoPerContract = prod.gettone + sddAddon + paperlessAddon + canvassPerPdp;
    const trattenute = lordoPerContract * TRATTENUTE_MAGIS;
    const nettoPerContract = lordoPerContract - trattenute;

    return (
        <div>
            <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Tipo Compenso</label>
                <select value={productId} onChange={e => setProductId(e.target.value)} style={selectStyle}>
                    {MAGIS_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.label} — {fmt(p.gettone)}</option>)}
                </select>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>PdP al mese (per canvass)</label>
                <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, +e.target.value || 1))} style={inputStyle} />
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <label style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#ccc", cursor: "pointer" }}>
                    <input type="checkbox" checked={hasSDD} onChange={e => setHasSDD(e.target.checked)} style={{ accentColor: "#F5C518" }} />
                    SDD (+€15)
                </label>
                <label style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#ccc", cursor: "pointer" }}>
                    <input type="checkbox" checked={hasPaperless} onChange={e => setHasPaperless(e.target.checked)} style={{ accentColor: "#F5C518" }} />
                    Paperless (+€5)
                </label>
            </div>

            <hr style={hrStyle} />
            <div style={{ fontSize: 11, color: "#F5C518", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Per Contratto (una tantum)</div>
            <ResultRow label="Gettone base" value={fmt(prod.gettone)} />
            {hasSDD && <ResultRow label="Add-on SDD" value={fmt(15)} color="#4CAF50" />}
            {hasPaperless && <ResultRow label="Add-on Paperless" value={fmt(5)} color="#4CAF50" />}
            <ResultRow label={`Canvass (${qty} PdP → €${canvassPerPdp})`} value={fmt(canvassPerPdp)} color="#2196F3" />
            <hr style={hrStyle} />
            <ResultRow label="LORDO / contratto" value={fmt(lordoPerContract)} bold />
            <ResultRow label="Trattenute (27,60%)" value={`- ${fmt(trattenute)}`} color="#ff5252" />
            <ResultRow label="NETTO / contratto" value={fmt(nettoPerContract)} color="#F5C518" bold />

            <hr style={hrStyle} />
            <div style={{ fontSize: 11, color: "#F5C518", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Totale ({qty} PdP)</div>
            <ResultRow label="LORDO TOTALE" value={fmt(lordoPerContract * qty)} bold />
            <ResultRow label="NETTO TOTALE" value={fmt(nettoPerContract * qty)} color="#F5C518" bold />

            <hr style={hrStyle} />
            <div style={{ fontSize: 11, color: "#2196F3", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Ricorrenti (mensili)</div>
            <ResultRow label="Ric. EE (€/kWh)" value={`€ ${prod.ricEE.toFixed(4)}`} color="#2196F3" />
            <ResultRow label="Ric. Gas (€/Smc)" value={`€ ${prod.ricGas.toFixed(2)}`} color="#2196F3" />
            <ResultRow label="Ric. fisso (dal 13°m)" value="€ 4,00/PdP/mese" color="#2196F3" />
        </div>
    );
}

const TABS = [
    { id: "sm", label: "SuperMoney", color: "#78909C" },
    { id: "agn", label: "AGN Energia", color: "#CE93D8" },
    { id: "magis", label: "Magis Energia", color: "#4DB6AC" },
];

export default function Calculator({ isOpen, onToggle }) {
    const [tab, setTab] = useState("sm");

    return (
        <>
            {/* Toggle button */}
            <button
                onClick={onToggle}
                style={{
                    position: "fixed", right: isOpen ? 380 : 0, top: "50%", transform: "translateY(-50%)",
                    zIndex: 20, background: "#D6006E", color: "#fff", border: "none",
                    borderRadius: "8px 0 0 8px", padding: "14px 8px", cursor: "pointer",
                    fontSize: 13, fontWeight: 700, writingMode: "vertical-rl", textOrientation: "mixed",
                    letterSpacing: 1, transition: "right 0.3s ease", boxShadow: "-2px 0 10px rgba(0,0,0,0.5)",
                }}
            >
                {isOpen ? "▶" : "◀"} CALCOLA
            </button>

            {/* Sidebar */}
            <div style={{
                position: "fixed", right: isOpen ? 0 : -380, top: 0, bottom: 0, width: 380,
                background: "linear-gradient(180deg, #111 0%, #0D0D0D 100%)",
                borderLeft: "2px solid #D6006E", zIndex: 15,
                transition: "right 0.3s ease", overflowY: "auto",
                boxShadow: isOpen ? "-4px 0 20px rgba(0,0,0,0.7)" : "none",
                paddingBottom: 60,
            }}>
                {/* Tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid #333" }}>
                    {TABS.map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)} style={{
                            flex: 1, padding: "14px 8px", border: "none", cursor: "pointer",
                            background: tab === t.id ? "#1a1a1a" : "transparent",
                            color: tab === t.id ? t.color : "#666",
                            fontWeight: 700, fontSize: 11, letterSpacing: "0.5px",
                            borderBottom: tab === t.id ? `3px solid ${t.color}` : "3px solid transparent",
                            transition: "all 0.15s",
                        }}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Title */}
                <div style={{ padding: "16px 16px 8px" }}>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: TABS.find(t => t.id === tab).color }}>
                        🧮 {TABS.find(t => t.id === tab).label}
                    </h3>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: "#666" }}>
                        Inserisci i dati per calcolare il compenso per pezzo
                    </p>
                </div>

                {/* Calculator content */}
                <div style={{ padding: "8px 16px 20px" }}>
                    {tab === "sm" && <SMCalculator />}
                    {tab === "agn" && <AGNCalculator />}
                    {tab === "magis" && <MagisCalculator />}
                </div>
            </div>
        </>
    );
}
