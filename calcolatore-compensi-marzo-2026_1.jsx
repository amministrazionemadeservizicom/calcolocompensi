import { useState, useMemo, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// ALLEGATO A — PIANO COMPENSI RIF. MARZO 2026
// Calcolatore Compensi — Tutti i gestori su una pagina
// Nessuna ritenuta d'acconto — Nessun Enasarco
// ═══════════════════════════════════════════════════════════════

const CATEGORIES = {
  ENERGIA: "⚡ Energia",
  TELECOM: "📡 Telecomunicazioni",
  GREEN: "🌱 Green & Efficientamento",
  NLT: "🚗 Noleggio Lungo Termine",
  DIGITAL: "💻 Digiton",
};

const DATA = [
  // ═══════════════════ ACEA ═══════════════════
  { cat: "ENERGIA", provider: "ACEA", segment: "RES", product: "Flex Casa", tipo: "Luce/Gas", gettone: 90, rid: 20, bolweb: 5, consenso: 5, massimo: 120 },
  { cat: "ENERGIA", provider: "ACEA", segment: "RES", product: "Fix Casa / Sprint Casa", tipo: "Luce/Gas", gettone: 70, rid: 20, bolweb: 5, consenso: 5, massimo: 100 },
  { cat: "ENERGIA", provider: "ACEA", segment: "BIZ", product: "Luce ≤10kW", tipo: "Luce", gettone: 100, rid: 20, bolweb: 5, consenso: 5, massimo: 130 },
  { cat: "ENERGIA", provider: "ACEA", segment: "BIZ", product: "Luce >10kW", tipo: "Luce", gettone: 130, rid: 20, bolweb: 5, consenso: 5, massimo: 160 },
  { cat: "ENERGIA", provider: "ACEA", segment: "BIZ", product: "Condominio Luce", tipo: "Luce", gettone: 80, rid: 30, bolweb: 5, consenso: 5, massimo: 120 },
  { cat: "ENERGIA", provider: "ACEA", segment: "BIZ", product: "Gas Business", tipo: "Gas", gettone: 105, rid: 20, bolweb: 5, consenso: 5, massimo: 135 },
  { cat: "ENERGIA", provider: "ACEA", segment: "BIZ", product: "Condominio Gas", tipo: "Gas", gettone: 150, rid: 30, bolweb: 5, consenso: 5, massimo: 190 },

  // ═══════════════════ UPENERGY ═══════════════════
  { cat: "ENERGIA", provider: "UpEnergy", segment: "RES", product: "Life-UP", tipo: "Luce&Gas", gettone: 70, rid: 0, bolweb: 0, consenso: 0, massimo: 70, ric712: 1, ric13: 4.5 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "RES", product: "Smart-UP", tipo: "Luce&Gas", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, ric712: 1.5, ric13: 5.5 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "RES", product: "Easy-UP", tipo: "Luce&Gas", gettone: 95, rid: 0, bolweb: 0, consenso: 0, massimo: 95, ric712: 2, ric13: 7.5 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "RES", product: "Trend-UP", tipo: "Luce&Gas", gettone: 115, rid: 0, bolweb: 0, consenso: 0, massimo: 115, ric712: 3.5, ric13: 10 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Boost-UP 0-5.000kWh", tipo: "Luce", gettone: 95, rid: 0, bolweb: 0, consenso: 0, massimo: 95, ric712: 3.5, ric13: 8 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Prime-UP 0-5.000kWh", tipo: "Luce", gettone: 115, rid: 0, bolweb: 0, consenso: 0, massimo: 115, ric712: 3.5, ric13: 10 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Control-UP 5-10.000kWh", tipo: "Luce", gettone: 65, rid: 0, bolweb: 0, consenso: 0, massimo: 65, ric712: 8.5, ric13: 9 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Control-UP 10-20.000kWh", tipo: "Luce", gettone: 85, rid: 0, bolweb: 0, consenso: 0, massimo: 85, ric712: 10, ric13: 13 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Control-UP 20-30.000kWh", tipo: "Luce", gettone: 115, rid: 0, bolweb: 0, consenso: 0, massimo: 115, ric712: 15, ric13: 17 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Control-UP 30-40.000kWh", tipo: "Luce", gettone: 135, rid: 0, bolweb: 0, consenso: 0, massimo: 135, ric712: 18, ric13: 20 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Control-UP 40-50.000kWh", tipo: "Luce", gettone: 165, rid: 0, bolweb: 0, consenso: 0, massimo: 165, ric712: 20, ric13: 25 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Top-UP 5-10.000kWh", tipo: "Luce", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75, ric712: 13, ric13: 12 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Top-UP 10-20.000kWh", tipo: "Luce", gettone: 105, rid: 0, bolweb: 0, consenso: 0, massimo: 105, ric712: 18, ric13: 19 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Top-UP 20-30.000kWh", tipo: "Luce", gettone: 155, rid: 0, bolweb: 0, consenso: 0, massimo: 155, ric712: 22, ric13: 25 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Top-UP 30-40.000kWh", tipo: "Luce", gettone: 195, rid: 0, bolweb: 0, consenso: 0, massimo: 195, ric712: 25, ric13: 30 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Top-UP 40-50.000kWh", tipo: "Luce", gettone: 215, rid: 0, bolweb: 0, consenso: 0, massimo: 215, ric712: 33, ric13: 35 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Infinity-UP 0-1.000Smc", tipo: "Gas", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75, ric712: 5, ric13: 9 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Infinity-UP 1-3.000Smc", tipo: "Gas", gettone: 105, rid: 0, bolweb: 0, consenso: 0, massimo: 105, ric712: 8, ric13: 12 },
  { cat: "ENERGIA", provider: "UpEnergy", segment: "BIZ", product: "Infinity-UP 3-5.000Smc", tipo: "Gas", gettone: 145, rid: 0, bolweb: 0, consenso: 0, massimo: 145, ric712: 10, ric13: 16 },

  // ═══════════════════ AUDAX ═══════════════════
  { cat: "ENERGIA", provider: "Audax", segment: "RES", product: "Luce", tipo: "Luce", gettone: 65, rid: 5, bolweb: 0, consenso: 0, massimo: 70 },
  { cat: "ENERGIA", provider: "Audax", segment: "RES", product: "Gas", tipo: "Gas", gettone: 65, rid: 5, bolweb: 0, consenso: 0, massimo: 70 },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Luce 500-5.000kWh", tipo: "Luce", gettone: 80, rid: 32, bolweb: 0, consenso: 0, massimo: 122, note: "Base A + Canvass>100pz 10€" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Luce 5-20.000kWh", tipo: "Luce", gettone: 128, rid: 32, bolweb: 0, consenso: 0, massimo: 170, note: "Base A" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Luce 20-50.000kWh", tipo: "Luce", gettone: 216, rid: 32, bolweb: 0, consenso: 0, massimo: 258, note: "Base A" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Luce 50-100.000kWh", tipo: "Luce", gettone: 288, rid: 32, bolweb: 0, consenso: 0, massimo: 330, note: "Base A" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Luce 100-200.000kWh", tipo: "Luce", gettone: 712, rid: 32, bolweb: 0, consenso: 0, massimo: 754, note: "Base A" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Luce 200-300.000kWh", tipo: "Luce", gettone: 864, rid: 32, bolweb: 0, consenso: 0, massimo: 906, note: "Base A" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Luce 300-500.000kWh", tipo: "Luce", gettone: 1296, rid: 32, bolweb: 0, consenso: 0, massimo: 1338, note: "Base A" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Gas 1-2.000Smc", tipo: "Gas", gettone: 80, rid: 32, bolweb: 0, consenso: 0, massimo: 122, note: "Base A" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Gas 2-10.000Smc", tipo: "Gas", gettone: 128, rid: 32, bolweb: 0, consenso: 0, massimo: 170, note: "Base A" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Gas 10-20.000Smc", tipo: "Gas", gettone: 328, rid: 32, bolweb: 0, consenso: 0, massimo: 370, note: "Base A" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Gas 20-40.000Smc", tipo: "Gas", gettone: 616, rid: 32, bolweb: 0, consenso: 0, massimo: 658, note: "Base A" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Gas 40-60.000Smc", tipo: "Gas", gettone: 1048, rid: 32, bolweb: 0, consenso: 0, massimo: 1090, note: "Base A" },
  { cat: "ENERGIA", provider: "Audax", segment: "BIZ", product: "Gas 60-100.000Smc", tipo: "Gas", gettone: 1656, rid: 32, bolweb: 0, consenso: 0, massimo: 1698, note: "Base A" },

  // ═══════════════════ HERA ═══════════════════
  { cat: "ENERGIA", provider: "Hera", segment: "RES", product: "Luce/Gas", tipo: "Luce/Gas", gettone: 85, rid: 20, bolweb: 0, consenso: 0, massimo: 119, note: "Polizza 10€ + BolWeb 4€" },
  { cat: "ENERGIA", provider: "Hera", segment: "BIZ", product: "Luce 0-50.000kWh", tipo: "Luce", gettone: 70, rid: 25, bolweb: 5, consenso: 0, massimo: 105, note: "PZ≤49" },
  { cat: "ENERGIA", provider: "Hera", segment: "BIZ", product: "Luce 50-100.000kWh", tipo: "Luce", gettone: 120, rid: 25, bolweb: 5, consenso: 0, massimo: 155 },
  { cat: "ENERGIA", provider: "Hera", segment: "BIZ", product: "Luce 300-500.000kWh", tipo: "Luce", gettone: 305, rid: 25, bolweb: 5, consenso: 0, massimo: 340 },
  { cat: "ENERGIA", provider: "Hera", segment: "BIZ", product: "Gas 0-10.000Smc", tipo: "Gas", gettone: 70, rid: 25, bolweb: 5, consenso: 0, massimo: 105 },
  { cat: "ENERGIA", provider: "Hera", segment: "BIZ", product: "Gas 10-30.000Smc", tipo: "Gas", gettone: 120, rid: 25, bolweb: 5, consenso: 0, massimo: 155 },
  { cat: "ENERGIA", provider: "Hera", segment: "BIZ", product: "Gas 50-75.000Smc", tipo: "Gas", gettone: 305, rid: 25, bolweb: 5, consenso: 0, massimo: 340 },

  // ═══════════════════ ESTRA ═══════════════════
  { cat: "ENERGIA", provider: "Estra", segment: "RES", product: "Luce/Gas", tipo: "Luce/Gas", gettone: 100, rid: 10, bolweb: 0, consenso: 0, massimo: 125, note: "FullDigital+OTP 10€, >100pz 5€" },
  { cat: "ENERGIA", provider: "Estra", segment: "RES", product: "Promo Luce/Gas", tipo: "Luce/Gas", gettone: 60, rid: 10, bolweb: 0, consenso: 0, massimo: 85 },
  { cat: "ENERGIA", provider: "Estra", segment: "RES", product: "Cambio Promo", tipo: "Luce/Gas", gettone: 25, rid: 0, bolweb: 0, consenso: 0, massimo: 25 },
  { cat: "ENERGIA", provider: "Estra", segment: "BIZ", product: "Luce", tipo: "Luce", gettone: 130, rid: 10, bolweb: 0, consenso: 0, massimo: 155 },
  { cat: "ENERGIA", provider: "Estra", segment: "BIZ", product: "Gas", tipo: "Gas", gettone: 130, rid: 10, bolweb: 0, consenso: 0, massimo: 155 },

  // ═══════════════════ ENEL AGENT ═══════════════════
  { cat: "ENERGIA", provider: "Enel Agent", segment: "RES", product: "Luce", tipo: "Luce", gettone: 70, rid: 4, bolweb: 1, consenso: 0, massimo: 75 },
  { cat: "ENERGIA", provider: "Enel Agent", segment: "RES", product: "Gas", tipo: "Gas", gettone: 70, rid: 4, bolweb: 1, consenso: 0, massimo: 75 },
  { cat: "ENERGIA", provider: "Enel Agent", segment: "RES", product: "Enel Fibra", tipo: "Fibra", gettone: 60, rid: 4, bolweb: 0, consenso: 0, massimo: 64 },
  { cat: "ENERGIA", provider: "Enel Agent", segment: "BIZ", product: "Luce P<4", tipo: "Luce", gettone: 75, rid: 4, bolweb: 1, consenso: 0, massimo: 80 },
  { cat: "ENERGIA", provider: "Enel Agent", segment: "BIZ", product: "Luce 4≤P<12", tipo: "Luce", gettone: 110, rid: 5, bolweb: 1, consenso: 0, massimo: 116 },
  { cat: "ENERGIA", provider: "Enel Agent", segment: "BIZ", product: "Luce 12≤P<26", tipo: "Luce", gettone: 150, rid: 15, bolweb: 1, consenso: 0, massimo: 166 },
  { cat: "ENERGIA", provider: "Enel Agent", segment: "BIZ", product: "Gas", tipo: "Gas", gettone: 110, rid: 10, bolweb: 1, consenso: 0, massimo: 121 },

  // ═══════════════════ ENEL DIGITAL ═══════════════════
  { cat: "ENERGIA", provider: "Enel Digital", segment: "RES", product: "Luce", tipo: "Luce", gettone: 100, rid: 4, bolweb: 1, consenso: 0, massimo: 105 },
  { cat: "ENERGIA", provider: "Enel Digital", segment: "RES", product: "Gas", tipo: "Gas", gettone: 100, rid: 4, bolweb: 1, consenso: 0, massimo: 105 },
  { cat: "ENERGIA", provider: "Enel Digital", segment: "RES", product: "Enel Fibra", tipo: "Fibra", gettone: 110, rid: 4, bolweb: 0, consenso: 0, massimo: 114 },
  { cat: "ENERGIA", provider: "Enel Digital", segment: "BIZ", product: "Luce P<4", tipo: "Luce", gettone: 90, rid: 4, bolweb: 1, consenso: 0, massimo: 95 },
  { cat: "ENERGIA", provider: "Enel Digital", segment: "BIZ", product: "Luce 4≤P<12", tipo: "Luce", gettone: 125, rid: 4, bolweb: 1, consenso: 0, massimo: 130 },
  { cat: "ENERGIA", provider: "Enel Digital", segment: "BIZ", product: "Luce 12≤P<26", tipo: "Luce", gettone: 150, rid: 4, bolweb: 1, consenso: 0, massimo: 155 },
  { cat: "ENERGIA", provider: "Enel Digital", segment: "BIZ", product: "Gas", tipo: "Gas", gettone: 120, rid: 4, bolweb: 1, consenso: 0, massimo: 125 },

  // ═══════════════════ ENGIE ═══════════════════
  { cat: "ENERGIA", provider: "Engie", segment: "RES", product: "Vedo Chiaro / Doppio Risparmio Luce", tipo: "Luce", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "Solo RID" },
  { cat: "ENERGIA", provider: "Engie", segment: "RES", product: "Vedo Chiaro / Doppio Risparmio Gas", tipo: "Gas", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "Solo RID" },
  { cat: "ENERGIA", provider: "Engie", segment: "BIZ", product: "Luce P≤5 RID", tipo: "Luce", gettone: 85, rid: 0, bolweb: 0, consenso: 0, massimo: 85 },
  { cat: "ENERGIA", provider: "Engie", segment: "BIZ", product: "Luce 5>P≤10 RID", tipo: "Luce", gettone: 100, rid: 0, bolweb: 0, consenso: 0, massimo: 100 },
  { cat: "ENERGIA", provider: "Engie", segment: "BIZ", product: "Luce P>10 RID", tipo: "Luce", gettone: 110, rid: 0, bolweb: 0, consenso: 0, massimo: 110 },
  { cat: "ENERGIA", provider: "Engie", segment: "BIZ", product: "Gas ≤5.000m³ RID", tipo: "Gas", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120 },
  { cat: "ENERGIA", provider: "Engie", segment: "BIZ", product: "Gas >5.000m³ RID", tipo: "Gas", gettone: 130, rid: 0, bolweb: 0, consenso: 0, massimo: 130 },

  // ═══════════════════ FASTWEB ENERGIA ═══════════════════
  { cat: "ENERGIA", provider: "Fastweb En.", segment: "RES", product: "Luce FIX", tipo: "Luce", gettone: 105, rid: 0, bolweb: 0, consenso: 0, massimo: 105 },
  { cat: "ENERGIA", provider: "Fastweb En.", segment: "RES", product: "Luce FLEX", tipo: "Luce", gettone: 105, rid: 0, bolweb: 0, consenso: 0, massimo: 105 },
  { cat: "ENERGIA", provider: "Fastweb En.", segment: "RES", product: "Luce LIGHT/FULL/MAXI", tipo: "Luce", gettone: 110, rid: 0, bolweb: 0, consenso: 0, massimo: 110 },
  { cat: "ENERGIA", provider: "Fastweb En.", segment: "BIZ", product: "Luce", tipo: "Luce", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120 },

  // ═══════════════════ MAGIS ENERGIA ═══════════════════
  { cat: "ENERGIA", provider: "Magis", segment: "RES", product: "Mia Luce/Gas (B)", tipo: "Luce/Gas", gettone: 35, rid: 12, bolweb: 0, consenso: 0, massimo: 51, note: "Paperless 4€" },
  { cat: "ENERGIA", provider: "Magis", segment: "RES", product: "Scudo Smeraldo Luce/Gas (A)", tipo: "Luce/Gas", gettone: 80, rid: 12, bolweb: 0, consenso: 0, massimo: 96 },
  { cat: "ENERGIA", provider: "Magis", segment: "RES", product: "Mia Fix Smart (B)", tipo: "Luce/Gas", gettone: 35, rid: 12, bolweb: 0, consenso: 0, massimo: 51 },
  { cat: "ENERGIA", provider: "Magis", segment: "RES", product: "Mia Fix PRO / PRO (M)", tipo: "Luce/Gas", gettone: 55, rid: 12, bolweb: 0, consenso: 0, massimo: 71 },
  { cat: "ENERGIA", provider: "Magis", segment: "BIZ", product: "Proxima Small (M)", tipo: "Luce/Gas", gettone: 105, rid: 12, bolweb: 0, consenso: 0, massimo: 121 },
  { cat: "ENERGIA", provider: "Magis", segment: "BIZ", product: "Proxima Extra Small (A)", tipo: "Luce/Gas", gettone: 135, rid: 12, bolweb: 0, consenso: 0, massimo: 151 },
  { cat: "ENERGIA", provider: "Magis", segment: "BIZ", product: "Proxima Medium (B)", tipo: "Luce/Gas", gettone: 80, rid: 12, bolweb: 0, consenso: 0, massimo: 96 },
  { cat: "ENERGIA", provider: "Magis", segment: "BIZ", product: "Proxima Large (L)", tipo: "Luce/Gas", gettone: 45, rid: 12, bolweb: 0, consenso: 0, massimo: 61 },

  // ═══════════════════ EDISON RES ═══════════════════
  { cat: "ENERGIA", provider: "Edison", segment: "RES", product: "World Luce / Superflex Luce", tipo: "Luce", gettone: 80, rid: 15, bolweb: 4, consenso: 0, massimo: 99 },
  { cat: "ENERGIA", provider: "Edison", segment: "RES", product: "Dynamic Luce", tipo: "Luce", gettone: 35, rid: 15, bolweb: 4, consenso: 0, massimo: 54 },
  { cat: "ENERGIA", provider: "Edison", segment: "RES", product: "World Gas / Superflex Gas", tipo: "Gas", gettone: 95, rid: 15, bolweb: 4, consenso: 0, massimo: 114 },
  { cat: "ENERGIA", provider: "Edison", segment: "RES", product: "Dynamic Gas", tipo: "Gas", gettone: 45, rid: 15, bolweb: 4, consenso: 0, massimo: 64 },
  { cat: "ENERGIA", provider: "Edison", segment: "RES", product: "Edison WiFi", tipo: "WiFi", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75 },

  // ═══════════════════ EDISON BIZ ═══════════════════
  { cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "World Luce", tipo: "Luce", gettone: 115, rid: 5, bolweb: 5, consenso: 0, massimo: 135, note: ">10pz 10€" },
  { cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Premium Luce Index/AQ-50", tipo: "Luce", gettone: 165, rid: 5, bolweb: 5, consenso: 0, massimo: 185 },
  { cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Flex Business Luce", tipo: "Luce", gettone: 155, rid: 5, bolweb: 5, consenso: 0, massimo: 175 },
  { cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "TOP50 (no sconto) RID", tipo: "Luce", gettone: 170, rid: 0, bolweb: 0, consenso: 0, massimo: 180 },
  { cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "World Gas", tipo: "Gas", gettone: 115, rid: 5, bolweb: 5, consenso: 0, massimo: 135 },
  { cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Premium Gas Index/AQ-50", tipo: "Gas", gettone: 165, rid: 5, bolweb: 5, consenso: 0, massimo: 185 },
  { cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "TOP40 (no sconto) RID", tipo: "Gas", gettone: 150, rid: 0, bolweb: 0, consenso: 0, massimo: 160 },
  { cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Condominio Flex Luce", tipo: "Luce", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75 },

  // ═══════════════════ SORGENIA ═══════════════════
  { cat: "ENERGIA", provider: "Sorgenia", segment: "RES", product: "Luce/Gas (solo RID)", tipo: "Luce/Gas", gettone: 70, rid: 0, bolweb: 0, consenso: 0, massimo: 70 },
  { cat: "ENERGIA", provider: "Sorgenia", segment: "BIZ", product: "Mass Market P<6", tipo: "Luce", gettone: 110, rid: 15, bolweb: 0, consenso: 0, massimo: 125 },
  { cat: "ENERGIA", provider: "Sorgenia", segment: "BIZ", product: "Mass Market P≥6", tipo: "Luce", gettone: 175, rid: 15, bolweb: 0, consenso: 0, massimo: 190 },
  { cat: "ENERGIA", provider: "Sorgenia", segment: "BIZ", product: "Mass Market Gas <1000smc", tipo: "Gas", gettone: 110, rid: 15, bolweb: 0, consenso: 0, massimo: 125 },
  { cat: "ENERGIA", provider: "Sorgenia", segment: "BIZ", product: "Mass Market Gas ≥1000smc", tipo: "Gas", gettone: 175, rid: 15, bolweb: 0, consenso: 0, massimo: 190 },
  { cat: "ENERGIA", provider: "Sorgenia", segment: "COND", product: "Condomini P<6", tipo: "Luce", gettone: 55, rid: 0, bolweb: 0, consenso: 0, massimo: 55, ric712: 6 },
  { cat: "ENERGIA", provider: "Sorgenia", segment: "COND", product: "Condomini P≥6", tipo: "Luce", gettone: 70, rid: 0, bolweb: 0, consenso: 0, massimo: 70, ric712: 6 },

  // ═══════════════════ A2A ═══════════════════
  { cat: "ENERGIA", provider: "A2A", segment: "RES", product: "Luce/Gas Domestici", tipo: "Luce/Gas", gettone: 80, rid: 10, bolweb: 3, consenso: 0, massimo: 117, note: "Ricorrente 24€ al 13°mese" },
  { cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Luce A (fino 7kW)", tipo: "Luce", gettone: 145, rid: 12, bolweb: 3, consenso: 0, massimo: 232, note: "Ricorrente 72€" },
  { cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Luce B (>7 fino 17kW)", tipo: "Luce", gettone: 160, rid: 12, bolweb: 3, consenso: 0, massimo: 247, note: "Ricorrente 72€" },
  { cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Luce C (>17 fino 50kW)", tipo: "Luce", gettone: 180, rid: 12, bolweb: 3, consenso: 0, massimo: 267, note: "Ricorrente 72€" },
  { cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Luce D (>50 fino 100kW)", tipo: "Luce", gettone: 190, rid: 12, bolweb: 3, consenso: 0, massimo: 277, note: "Ricorrente 72€" },
  { cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Luce E (>100kW)", tipo: "Luce", gettone: 280, rid: 12, bolweb: 3, consenso: 0, massimo: 367, note: "Ricorrente 72€" },
  { cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Gas", tipo: "Gas", gettone: 145, rid: 12, bolweb: 3, consenso: 0, massimo: 232, note: "Ricorrente 72€" },

  // ═══════════════════ AXPO ═══════════════════
  { cat: "ENERGIA", provider: "Axpo", segment: "RES", product: "Limit.e Luce", tipo: "Luce", gettone: 55, rid: 0, bolweb: 0, consenso: 0, massimo: 55 },
  { cat: "ENERGIA", provider: "Axpo", segment: "RES", product: "Value", tipo: "Luce/Gas", gettone: 70, rid: 0, bolweb: 0, consenso: 0, massimo: 70, note: "Ric. 2€/PDP" },
  { cat: "ENERGIA", provider: "Axpo", segment: "RES", product: "Smart", tipo: "Luce/Gas", gettone: 90, rid: 0, bolweb: 0, consenso: 0, massimo: 90, note: "Ric. 2€/PDP" },
  { cat: "ENERGIA", provider: "Axpo", segment: "BIZ", product: "Luce >0.5-≤6.6kW", tipo: "Luce", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120, note: "Ric. 3,20€/PDP" },
  { cat: "ENERGIA", provider: "Axpo", segment: "BIZ", product: "Gas 0-4.999Smc", tipo: "Gas", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120, note: "Ric. 4€/PDP" },

  // ═══════════════════ FASTWEB TELECOM RES ═══════════════════
  { cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Casa Start", tipo: "Fisso", gettone: 110, rid: 0, bolweb: 0, consenso: 0, massimo: 110, note: "NL/Port. Postepay 90€" },
  { cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Casa Pro", tipo: "Fisso", gettone: 145, rid: 0, bolweb: 0, consenso: 0, massimo: 145, note: "Postepay 125€" },
  { cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Casa Pro Booster", tipo: "Fisso", gettone: 160, rid: 0, bolweb: 0, consenso: 0, massimo: 160, note: "Postepay 140€" },
  { cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Casa Ultra", tipo: "Fisso", gettone: 160, rid: 0, bolweb: 0, consenso: 0, massimo: 160, note: "Postepay 140€" },
  { cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Mobile Ultra", tipo: "Mobile", gettone: 60, rid: 0, bolweb: 0, consenso: 0, massimo: 70, note: "NL 60€ / Port. 70€" },
  { cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Mobile Pro", tipo: "Mobile", gettone: 40, rid: 0, bolweb: 0, consenso: 0, massimo: 48, note: "NL 40€ / Port. 48€" },
  { cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Mobile Power", tipo: "Mobile", gettone: 55, rid: 0, bolweb: 0, consenso: 0, massimo: 65, note: "NL 55€ / Port. 65€" },

  // ═══════════════════ FASTWEB BIZ SHP ═══════════════════
  { cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business Light", tipo: "Fisso", gettone: 200, rid: 0, bolweb: 0, consenso: 0, massimo: 200 },
  { cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business", tipo: "Fisso", gettone: 275, rid: 0, bolweb: 0, consenso: 0, massimo: 275 },
  { cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business Plus", tipo: "Fisso", gettone: 315, rid: 0, bolweb: 0, consenso: 0, massimo: 315 },
  { cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business Pro", tipo: "Fisso", gettone: 465, rid: 0, bolweb: 0, consenso: 0, massimo: 465 },
  { cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "NeXXt Mobile Freedom (Port.)", tipo: "Mobile", gettone: 105, rid: 0, bolweb: 0, consenso: 0, massimo: 105 },
  { cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "NeXXt Mobile Unlimited (Port.)", tipo: "Mobile", gettone: 150, rid: 0, bolweb: 0, consenso: 0, massimo: 165 },

  // ═══════════════════ TIM AGENT ═══════════════════
  { cat: "TELECOM", provider: "TIM", segment: "RES", product: "Premium Base RID (NIP)", tipo: "Fisso", gettone: 130, rid: 0, bolweb: 0, consenso: 0, massimo: 130, note: "ULL 150€" },
  { cat: "TELECOM", provider: "TIM", segment: "RES", product: "Wifi Casa / TV RID (NIP)", tipo: "Fisso", gettone: 160, rid: 0, bolweb: 0, consenso: 0, massimo: 160, note: "ULL 180€" },
  { cat: "TELECOM", provider: "TIM", segment: "RES", product: "Wifi Casa FWA RID (NIP)", tipo: "Fisso", gettone: 150, rid: 0, bolweb: 0, consenso: 0, massimo: 150, note: "ULL 170€" },
  { cat: "TELECOM", provider: "TIM", segment: "RES", product: "TIMVISION Intrattenimento", tipo: "Opzione", gettone: 25, rid: 0, bolweb: 0, consenso: 0, massimo: 25 },
  { cat: "TELECOM", provider: "TIM", segment: "RES", product: "TIMVISION Gold", tipo: "Opzione", gettone: 30, rid: 0, bolweb: 0, consenso: 0, massimo: 30 },

  // ═══════════════════ WINDTRE ═══════════════════
  { cat: "TELECOM", provider: "WindTre", segment: "RES", product: "FTTC (LNA)", tipo: "Fisso", gettone: 180, rid: 0, bolweb: 0, consenso: 0, massimo: 180 },
  { cat: "TELECOM", provider: "WindTre", segment: "RES", product: "FTTH (LNA)", tipo: "Fisso", gettone: 200, rid: 0, bolweb: 0, consenso: 0, massimo: 200 },
  { cat: "TELECOM", provider: "WindTre", segment: "RES", product: "FWA (LNA)", tipo: "Fisso", gettone: 180, rid: 0, bolweb: 0, consenso: 0, massimo: 180 },
  { cat: "TELECOM", provider: "WindTre", segment: "RES", product: "Mobile Sim (Port.)", tipo: "Mobile", gettone: 30, rid: 0, bolweb: 0, consenso: 0, massimo: 30, note: "LNA 15€" },

  // ═══════════════════ SKY ═══════════════════
  { cat: "TELECOM", provider: "Sky", segment: "RES", product: "Triple Play WiFi+TV", tipo: "Pack", gettone: 310, rid: 0, bolweb: 0, consenso: 0, massimo: 310 },
  { cat: "TELECOM", provider: "Sky", segment: "RES", product: "Sky TV Only", tipo: "TV", gettone: 232, rid: 0, bolweb: 0, consenso: 0, massimo: 232 },
  { cat: "TELECOM", provider: "Sky", segment: "RES", product: "Sky TV Intrattenimento Plus", tipo: "TV", gettone: 164, rid: 0, bolweb: 0, consenso: 0, massimo: 164 },
  { cat: "TELECOM", provider: "Sky", segment: "RES", product: "Sky Wifi Only CC/RID", tipo: "WiFi", gettone: 160, rid: 0, bolweb: 0, consenso: 0, massimo: 160 },
  { cat: "TELECOM", provider: "Sky", segment: "RES", product: "Upselling Sky Wifi", tipo: "WiFi", gettone: 165, rid: 0, bolweb: 0, consenso: 0, massimo: 165 },
  { cat: "TELECOM", provider: "Sky", segment: "BIZ", product: "BAR Promo con canone", tipo: "TV", gettone: 240, rid: 0, bolweb: 0, consenso: 0, massimo: 240 },
  { cat: "TELECOM", provider: "Sky", segment: "BIZ", product: "Negozio Smart 24,90€", tipo: "TV", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80 },
  { cat: "TELECOM", provider: "Sky", segment: "BIZ", product: "WiFi Only Business", tipo: "WiFi", gettone: 200, rid: 0, bolweb: 0, consenso: 0, massimo: 200 },

  // ═══════════════════ GREEN / EFFICIENTAMENTO ═══════════════════
  { cat: "GREEN", provider: "Effic. Energetico", segment: "RES/BIZ", product: "Impianto+Accumulo (config.)", tipo: "FV", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "10% imp. + 7% accumulo su imponibile" },
  { cat: "GREEN", provider: "Effic. Energetico", segment: "RES/BIZ", product: "Solo Impianto (config.)", tipo: "FV", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "10% su base imponibile" },
  { cat: "GREEN", provider: "Effic. Energetico", segment: "RES", product: "Pacchetti Imp.+Acc.", tipo: "FV", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "6% su base imponibile" },
  { cat: "GREEN", provider: "Effic. Energetico", segment: "RES/BIZ", product: "WallBox 7kWp Tesla", tipo: "WallBox", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120 },
  { cat: "GREEN", provider: "Effic. Energetico", segment: "RES/BIZ", product: "WallBox da 7kWp Monofase", tipo: "WallBox", gettone: 112, rid: 0, bolweb: 0, consenso: 0, massimo: 112 },
  { cat: "GREEN", provider: "Effic. Energetico", segment: "RES/BIZ", product: "WallBox da 22kWp", tipo: "WallBox", gettone: 160, rid: 0, bolweb: 0, consenso: 0, massimo: 160 },
  { cat: "GREEN", provider: "Effic. Energetico", segment: "RES/BIZ", product: "Pompa di Calore", tipo: "PdC", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "6% su base imponibile" },
  { cat: "GREEN", provider: "Effic. Energetico", segment: "RES", product: "Lead RES", tipo: "Lead", gettone: 200, rid: 0, bolweb: 0, consenso: 0, massimo: 200 },

  // ═══════════════════ A2A VAS ═══════════════════
  { cat: "GREEN", provider: "A2A VAS", segment: "RES", product: "Caldaia Standard", tipo: "VAS", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "11,5% su imponibile offerta" },
  { cat: "GREEN", provider: "A2A VAS", segment: "RES", product: "Caldaia Premium", tipo: "VAS", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "12,5% su imponibile offerta" },
  { cat: "GREEN", provider: "A2A VAS", segment: "RES", product: "Condizionatore Lite", tipo: "VAS", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "12% su imponibile offerta" },
  { cat: "GREEN", provider: "A2A VAS", segment: "RES", product: "FV senza Accumulo A2A", tipo: "VAS", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "8,5% su imponibile" },
  { cat: "GREEN", provider: "A2A VAS", segment: "RES", product: "FV con Accumulo A2A Plus", tipo: "VAS", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "11,5% su imponibile" },
  { cat: "GREEN", provider: "A2A VAS", segment: "RES", product: "WallBox A2A 7,4kWp", tipo: "VAS", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "9,5% su imponibile" },

  // ═══════════════════ NLT ═══════════════════
  { cat: "NLT", provider: "NLT Ayvens", segment: "BIZ", product: "% su Calcolatore 0-20 ordini", tipo: "Auto", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "70% su calcolatore" },
  { cat: "NLT", provider: "NLT Ayvens", segment: "BIZ", product: "% su Calcolatore 21-35 ordini", tipo: "Auto", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "75% su calcolatore" },
  { cat: "NLT", provider: "NLT Ayvens", segment: "BIZ", product: "% su Calcolatore 36-50 ordini", tipo: "Auto", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "80% su calcolatore" },
  { cat: "NLT", provider: "NLT UniPol", segment: "BIZ", product: "Auto fino 20.000€", tipo: "Auto", gettone: 250, rid: 0, bolweb: 0, consenso: 0, massimo: 250 },
  { cat: "NLT", provider: "NLT UniPol", segment: "BIZ", product: "Auto 20-30.000€", tipo: "Auto", gettone: 375, rid: 0, bolweb: 0, consenso: 0, massimo: 375 },
  { cat: "NLT", provider: "NLT UniPol", segment: "BIZ", product: "Auto 30-40.000€", tipo: "Auto", gettone: 425, rid: 0, bolweb: 0, consenso: 0, massimo: 425 },
  { cat: "NLT", provider: "NLT UniPol", segment: "BIZ", product: "Auto 40-50.000€", tipo: "Auto", gettone: 500, rid: 0, bolweb: 0, consenso: 0, massimo: 500 },
  { cat: "NLT", provider: "NLT UniPol", segment: "BIZ", product: "Auto 50-60.000€", tipo: "Auto", gettone: 650, rid: 0, bolweb: 0, consenso: 0, massimo: 650 },
  { cat: "NLT", provider: "NLT UniPol", segment: "BIZ", product: "Auto 60-70.000€", tipo: "Auto", gettone: 900, rid: 0, bolweb: 0, consenso: 0, massimo: 900 },
  { cat: "NLT", provider: "NLT UniPol", segment: "BIZ", product: "Auto 70-80.000€", tipo: "Auto", gettone: 1100, rid: 0, bolweb: 0, consenso: 0, massimo: 1100 },
  { cat: "NLT", provider: "NLT Arval", segment: "BIZ", product: "Canoni 0-5.000€", tipo: "Auto", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75 },
  { cat: "NLT", provider: "NLT Arval", segment: "BIZ", product: "Canoni 5-7.500€", tipo: "Auto", gettone: 125, rid: 0, bolweb: 0, consenso: 0, massimo: 125 },
  { cat: "NLT", provider: "NLT Arval", segment: "BIZ", product: "Canoni 7.500-10.000€", tipo: "Auto", gettone: 225, rid: 0, bolweb: 0, consenso: 0, massimo: 225 },
  { cat: "NLT", provider: "NLT Arval", segment: "BIZ", product: "Canoni 10-14.000€", tipo: "Auto", gettone: 300, rid: 0, bolweb: 0, consenso: 0, massimo: 300 },
  { cat: "NLT", provider: "NLT Arval", segment: "BIZ", product: "Canoni 24-40.000€", tipo: "Auto", gettone: 525, rid: 0, bolweb: 0, consenso: 0, massimo: 525 },
  { cat: "NLT", provider: "NLT Arval", segment: "BIZ", product: "Canoni 50-100.000€", tipo: "Auto", gettone: 775, rid: 0, bolweb: 0, consenso: 0, massimo: 775 },

  // ═══════════════════ DIGITON ═══════════════════
  { cat: "DIGITAL", provider: "Digiton", segment: "BIZ", product: "Social Go (4+ canoni)", tipo: "Social", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "8% su canoni da 4 in poi" },
  { cat: "DIGITAL", provider: "Digiton", segment: "BIZ", product: "Social Plus (4+ canoni)", tipo: "Social", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "8% su canoni da 4 in poi" },
  { cat: "DIGITAL", provider: "Digiton", segment: "BIZ", product: "All Comunication", tipo: "Digital", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "8% su tutti i canoni" },
  { cat: "DIGITAL", provider: "Digiton", segment: "BIZ", product: "One Page / Multipage / E-comm", tipo: "Web", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "8% solo 1° canone" },
  { cat: "DIGITAL", provider: "Digiton", segment: "BIZ", product: "Logo / Reel / Spot / Shooting", tipo: "Creativo", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "8% solo 1° canone" },
];

const PROVIDER_COLORS = {
  "ACEA": "#00B2A9", "UpEnergy": "#E91E63", "Audax": "#FFB300", "Hera": "#2196F3",
  "Estra": "#E65100", "Enel Agent": "#1565C0", "Enel Digital": "#1976D2", "Engie": "#0D47A1",
  "Fastweb En.": "#FFD600", "Magis": "#C62828", "Edison": "#2E7D32", "Sorgenia": "#4CAF50",
  "A2A": "#00BCD4", "Axpo": "#FF9800", "Fastweb": "#FFD600", "Fastweb BIZ": "#FFC107",
  "TIM": "#003399", "WindTre": "#FF6600", "Sky": "#E91E9B", "Effic. Energetico": "#388E3C",
  "A2A VAS": "#26A69A", "NLT Ayvens": "#5C6BC0", "NLT UniPol": "#7B1FA2", "NLT Arval": "#6A1B9A",
  "Digiton": "#FF7043",
};

const fmt = (v) => v.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

export default function App() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("ALL");
  const [segFilter, setSegFilter] = useState("ALL");
  const [provFilter, setProvFilter] = useState("ALL");
  const [qty, setQty] = useState(1);
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    return DATA.filter(r => {
      if (catFilter !== "ALL" && r.cat !== catFilter) return false;
      if (segFilter !== "ALL" && r.segment !== segFilter) return false;
      if (provFilter !== "ALL" && r.provider !== provFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return (r.provider + " " + r.product + " " + r.tipo + " " + (r.note || "")).toLowerCase().includes(s);
      }
      return true;
    });
  }, [search, catFilter, segFilter, provFilter]);

  const providers = useMemo(() => [...new Set(DATA.filter(r => catFilter === "ALL" || r.cat === catFilter).map(r => r.provider))].sort(), [catFilter]);
  const segments = useMemo(() => [...new Set(DATA.map(r => r.segment))].sort(), []);

  const totalMax = useMemo(() => filtered.reduce((s, r) => s + r.massimo * qty, 0), [filtered, qty]);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#0D0D0D", color: "#E8E8E8", minHeight: "100vh", padding: "0" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #D6006E 0%, #2D2D2D 60%)", padding: "28px 24px 20px", borderBottom: "2px solid #F5C518" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
              📋 Calcolatore Compensi — Allegato A
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#F5C518", fontWeight: 600 }}>
              Piano Compensi Rif. Marzo 2026 • Netto (no ritenuta / no Enasarco)
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
        <select value={segFilter} onChange={e => setSegFilter(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: "#eee", fontSize: 13 }}>
          <option value="ALL">Tutti i segmenti</option>
          {segments.map(s => <option key={s} value={s}>{s}</option>)}
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
              {["Gestore", "Seg.", "Prodotto", "Tipo", "Gettone", "RID", "Bol.Web", "Cons.", "MASSIMO", qty > 1 ? `x${qty}` : null, "Note"].filter(Boolean).map((h, i) => (
                <th key={i} style={{
                  padding: "10px 8px", background: "#222", color: "#aaa", fontWeight: 600, textAlign: i >= 4 && i <= 9 ? "right" : "left",
                  borderBottom: "2px solid #D6006E", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap"
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const isExp = expanded === i;
              const pc = PROVIDER_COLORS[r.provider] || "#666";
              return (
                <tr key={i} onClick={() => setExpanded(isExp ? null : i)}
                  style={{ background: isExp ? "#1f1f1f" : i % 2 === 0 ? "#111" : "#0D0D0D", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1a1a1a"}
                  onMouseLeave={e => e.currentTarget.style.background = isExp ? "#1f1f1f" : i % 2 === 0 ? "#111" : "#0D0D0D"}>
                  <td style={{ padding: "9px 8px", whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-block", width: 4, height: 18, background: pc, borderRadius: 2, marginRight: 8, verticalAlign: "middle" }} />
                    <span style={{ fontWeight: 600, color: pc }}>{r.provider}</span>
                  </td>
                  <td style={{ padding: "9px 6px" }}>
                    <span style={{
                      display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                      background: r.segment === "RES" ? "#1B5E20" : r.segment === "BIZ" ? "#0D47A1" : r.segment === "COND" ? "#4A148C" : "#E65100",
                      color: "#fff"
                    }}>{r.segment}</span>
                  </td>
                  <td style={{ padding: "9px 8px", fontWeight: 500, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.product}</td>
                  <td style={{ padding: "9px 6px", color: "#888", fontSize: 12 }}>{r.tipo}</td>
                  <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 600, color: r.gettone > 0 ? "#eee" : "#555" }}>{r.gettone > 0 ? fmt(r.gettone) : "—"}</td>
                  <td style={{ padding: "9px 6px", textAlign: "right", color: r.rid > 0 ? "#4CAF50" : "#333" }}>{r.rid > 0 ? fmt(r.rid) : "—"}</td>
                  <td style={{ padding: "9px 6px", textAlign: "right", color: r.bolweb > 0 ? "#2196F3" : "#333" }}>{r.bolweb > 0 ? fmt(r.bolweb) : "—"}</td>
                  <td style={{ padding: "9px 6px", textAlign: "right", color: r.consenso > 0 ? "#FF9800" : "#333" }}>{r.consenso > 0 ? fmt(r.consenso) : "—"}</td>
                  <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, color: "#F5C518", fontSize: 14 }}>{r.massimo > 0 ? fmt(r.massimo) : "% vedi note"}</td>
                  {qty > 1 && <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, color: "#D6006E" }}>{r.massimo > 0 ? fmt(r.massimo * qty) : "—"}</td>}
                  <td style={{ padding: "9px 8px", color: "#888", fontSize: 11, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {r.note || ""}
                    {r.ric712 ? ` | Ric.7-12m: ${r.ric712}€` : ""}
                    {r.ric13 ? ` | Ric.13+: ${r.ric13}€` : ""}
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
        <span style={{ color: "#666" }}>SempliCom • MADE SRL Semplificata • Allegato A — Marzo 2026</span>
        <span style={{ color: "#F5C518", fontWeight: 700, fontSize: 14 }}>
          Totale: {fmt(totalMax)} {qty > 1 && `(${filtered.length} × ${qty})`}
        </span>
      </div>
    </div>
  );
}
