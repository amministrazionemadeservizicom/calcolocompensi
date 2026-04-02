// ═══════════════════════════════════════════════════════════════
// ALLEGATO A — PIANO COMPENSI RIF. MARZO 2026
// Dati estratti dal PDF "Allegato A - A 03 2026.pdf"
// e dal file Excel "Calcolatore_Completo_SM_AGN_Magis.xlsx"
// ═══════════════════════════════════════════════════════════════

export const CATEGORIES = {
    ENERGIA: "⚡ Energia",
    TELECOM: "📡 Telecomunicazioni",
};

export const DATA = [
    // ═══════════════════ ESTRA ═══════════════════
    { fornitore: "Promup", cat: "ENERGIA", provider: "Estra", segment: "RES", product: "Luce/Gas", tipo: "Luce/Gas", gettone: 100, rid: 10, bolweb: 0, consenso: 0, massimo: 125, note: "FullDigital+OTP 10€, >100pz 5€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Estra", segment: "RES", product: "Promo Luce/Gas", tipo: "Luce/Gas", gettone: 60, rid: 10, bolweb: 0, consenso: 0, massimo: 85 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Estra", segment: "RES", product: "Cambio Promo", tipo: "Luce/Gas", gettone: 25, rid: 0, bolweb: 0, consenso: 0, massimo: 25 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Estra", segment: "BIZ", product: "Luce", tipo: "Luce", gettone: 130, rid: 10, bolweb: 0, consenso: 0, massimo: 155 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Estra", segment: "BIZ", product: "Gas", tipo: "Gas", gettone: 130, rid: 10, bolweb: 0, consenso: 0, massimo: 155 },

    // ═══════════════════ FASTWEB ENERGIA ═══════════════════
    { fornitore: "Promup", cat: "ENERGIA", provider: "Fastweb En.", segment: "RES", product: "Luce FIX", tipo: "Luce", gettone: 105, rid: 0, bolweb: 0, consenso: 0, massimo: 105 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Fastweb En.", segment: "RES", product: "Luce FLEX", tipo: "Luce", gettone: 105, rid: 0, bolweb: 0, consenso: 0, massimo: 105 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Fastweb En.", segment: "RES", product: "Luce LIGHT/FULL/MAXI", tipo: "Luce", gettone: 110, rid: 0, bolweb: 0, consenso: 0, massimo: 110 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Fastweb En.", segment: "BIZ", product: "Luce", tipo: "Luce", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120 },

    // ═══════════════════ EDISON RES ═══════════════════
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "EDISON WiFi", tipo: "WiFi", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "World Luce / Superflex Luce", tipo: "Luce", gettone: 80, rid: 15, bolweb: 4, consenso: 0, massimo: 99 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "Dynamic Luce", tipo: "Luce", gettone: 35, rid: 15, bolweb: 4, consenso: 0, massimo: 54 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "VAS Ti Protegge Light", tipo: "VAS", gettone: 8, rid: 0, bolweb: 0, consenso: 0, massimo: 8 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "VAS Ti Protegge", tipo: "VAS", gettone: 36, rid: 0, bolweb: 0, consenso: 0, massimo: 36 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "VAS Manut. Clima Mono Split", tipo: "VAS", gettone: 28, rid: 0, bolweb: 0, consenso: 0, massimo: 28 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "VAS Manut. Clima Dual/Trial", tipo: "VAS", gettone: 30, rid: 0, bolweb: 0, consenso: 0, massimo: 30 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "VAS Elettrodomestici Extra", tipo: "VAS", gettone: 32, rid: 0, bolweb: 0, consenso: 0, massimo: 32 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "World Gas / Superflex Gas", tipo: "Gas", gettone: 95, rid: 15, bolweb: 4, consenso: 0, massimo: 114 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "Dynamic Gas", tipo: "Gas", gettone: 45, rid: 15, bolweb: 4, consenso: 0, massimo: 64 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "VAS Manut. Caldaia Base", tipo: "VAS", gettone: 20, rid: 0, bolweb: 0, consenso: 0, massimo: 20 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "RES", product: "VAS Manut. Caldaia Extra", tipo: "VAS", gettone: 20, rid: 0, bolweb: 0, consenso: 0, massimo: 20 },

    // ═══════════════════ EDISON BIZ ═══════════════════
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "World Luce", tipo: "Luce", gettone: 115, rid: 5, bolweb: 5, consenso: 0, massimo: 135, note: ">10pz 10€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Dynamic Luce", tipo: "Luce", gettone: 115, rid: 5, bolweb: 5, consenso: 0, massimo: 135, note: ">10pz 10€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Premium Luce Index/AQ-50", tipo: "Luce", gettone: 165, rid: 5, bolweb: 5, consenso: 0, massimo: 185, note: ">10pz 10€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Flex/Superflex Business Luce", tipo: "Luce", gettone: 155, rid: 5, bolweb: 5, consenso: 0, massimo: 175, note: ">10pz 10€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "TOP50 (no sconto) RID", tipo: "Luce", gettone: 170, rid: 0, bolweb: 0, consenso: 0, massimo: 180, note: ">10pz 10€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "TOP50 (sconto 50) RID", tipo: "Luce", gettone: 65, rid: 0, bolweb: 0, consenso: 0, massimo: 75, note: ">10pz 10€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "World Gas", tipo: "Gas", gettone: 115, rid: 5, bolweb: 5, consenso: 0, massimo: 135, note: ">10pz 10€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Dynamic Gas", tipo: "Gas", gettone: 115, rid: 5, bolweb: 5, consenso: 0, massimo: 135, note: ">10pz 10€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Premium Gas Index/AQ-50", tipo: "Gas", gettone: 165, rid: 5, bolweb: 5, consenso: 0, massimo: 185 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Flex/Superflex Business Gas", tipo: "Gas", gettone: 155, rid: 5, bolweb: 5, consenso: 0, massimo: 175 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "TOP40 (no sconto) RID", tipo: "Gas", gettone: 150, rid: 0, bolweb: 0, consenso: 0, massimo: 160 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "TOP40 (sconto 50) RID", tipo: "Gas", gettone: 50, rid: 0, bolweb: 0, consenso: 0, massimo: 60 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Condominio Flex Luce", tipo: "Luce", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Condominio Energy+", tipo: "Luce", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "Ric. 7€/PDP" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison", segment: "BIZ", product: "Condominio Flex Gas", tipo: "Gas", gettone: 65, rid: 0, bolweb: 0, consenso: 0, massimo: 65 },

    // ═══════════════════ EDISON SOLUZIONE IN BORSA ═══════════════════
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison SiB", segment: "BIZ", product: "Luce Sconto 1€/MWh", tipo: "Luce", gettone: 0, rid: 0, bolweb: 5, consenso: 0, massimo: 0, note: "Gett. 3,25€/MWh" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison SiB", segment: "BIZ", product: "Luce Sconto 2€/MWh", tipo: "Luce", gettone: 0, rid: 0, bolweb: 5, consenso: 0, massimo: 0, note: "Gett. 2,75€/MWh" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison SiB", segment: "BIZ", product: "Luce Sconto 3€/MWh", tipo: "Luce", gettone: 0, rid: 0, bolweb: 5, consenso: 0, massimo: 0, note: "Gett. 2,50€/MWh" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison SiB", segment: "BIZ", product: "Luce Sconto 4€/MWh", tipo: "Luce", gettone: 0, rid: 0, bolweb: 5, consenso: 0, massimo: 0, note: "Gett. 2,25€/MWh" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison SiB", segment: "BIZ", product: "Luce Sconto 5€/MWh", tipo: "Luce", gettone: 0, rid: 0, bolweb: 5, consenso: 0, massimo: 0, note: "Gett. 2,00€/MWh" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison SiB", segment: "BIZ", product: "Gas 0€ sconto", tipo: "Gas", gettone: 0, rid: 0, bolweb: 5, consenso: 0, massimo: 0, note: "Gett. 0,0060€/Smc" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison SiB", segment: "BIZ", product: "Gas 0,010€ sconto", tipo: "Gas", gettone: 0, rid: 0, bolweb: 5, consenso: 0, massimo: 0, note: "Gett. 0,0060€/Smc" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Edison SiB", segment: "BIZ", product: "Gas 0,020€ sconto", tipo: "Gas", gettone: 0, rid: 0, bolweb: 5, consenso: 0, massimo: 0, note: "Gett. 0,0050€/Smc" },

    // ═══════════════════ A2A ═══════════════════
    { fornitore: "Promup", cat: "ENERGIA", provider: "A2A", segment: "RES", product: "Luce/Gas Domestici", tipo: "Luce/Gas", gettone: 80, rid: 10, bolweb: 3, consenso: 0, massimo: 117, note: "Ricorrente 24€ al 13°mese" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Luce A (fino 7kW)", tipo: "Luce", gettone: 145, rid: 12, bolweb: 3, consenso: 0, massimo: 232, note: "Ricorrente 72€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Luce B (>7 fino 17kW)", tipo: "Luce", gettone: 160, rid: 12, bolweb: 3, consenso: 0, massimo: 247, note: "Ricorrente 72€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Luce C (>17 fino 50kW)", tipo: "Luce", gettone: 180, rid: 12, bolweb: 3, consenso: 0, massimo: 267, note: "Ricorrente 72€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Luce D (>50 fino 100kW)", tipo: "Luce", gettone: 190, rid: 12, bolweb: 3, consenso: 0, massimo: 277, note: "Ricorrente 72€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Luce E (>100kW)", tipo: "Luce", gettone: 280, rid: 12, bolweb: 3, consenso: 0, massimo: 367, note: "Ricorrente 72€" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "A2A", segment: "BIZ", product: "Gas", tipo: "Gas", gettone: 145, rid: 12, bolweb: 3, consenso: 0, massimo: 232, note: "Ricorrente 72€" },

    // ═══════════════════ AXPO ═══════════════════
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "RES", product: "Limit.e Luce", tipo: "Luce", gettone: 55, rid: 0, bolweb: 0, consenso: 0, massimo: 55 },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "RES", product: "Value", tipo: "Luce/Gas", gettone: 70, rid: 0, bolweb: 0, consenso: 0, massimo: 70, note: "Ric. 2€/PDP" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "RES", product: "Smart", tipo: "Luce/Gas", gettone: 90, rid: 0, bolweb: 0, consenso: 0, massimo: 90, note: "Ric. 2€/PDP" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "BIZ", product: "Luce >0.5-≤6.6kW", tipo: "Luce", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120, note: "Ric. 3,20€/PDP" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "BIZ", product: "Luce >7-≤10kW", tipo: "Luce", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120, note: "Ric. 4€/PDP" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "BIZ", product: "Luce >11-≤20kW", tipo: "Luce", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120, note: "Ric. 4,80€/PDP" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "BIZ", product: "Luce >20-≤55kW", tipo: "Luce", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120, note: "Ric. 5,60€/PDP" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "BIZ", product: "Gas 0-4.999Smc", tipo: "Gas", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120, note: "Ric. 4€/PDP" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "BIZ", product: "Gas 5-9.999Smc", tipo: "Gas", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120, note: "Ric. 4,80€/PDP" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "BIZ", product: "Gas 10-20.000Smc", tipo: "Gas", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120, note: "Ric. 6,40€/PDP" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "PMI", product: "Scegli 2.0 Luce Standard", tipo: "Luce", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "Ric. €/MWh variabile" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "PMI", product: "Scegli 2.0 Light Luce", tipo: "Luce", gettone: 50, rid: 0, bolweb: 0, consenso: 0, massimo: 50, note: "Ric. variabile €/PDP" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "PMI", product: "Scegli Dinamico 2.0 Gas", tipo: "Gas", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "Ric. c€/Smc variabile" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "Axpo", segment: "PMI", product: "Scegli 2.0 Light Gas", tipo: "Gas", gettone: 50, rid: 0, bolweb: 0, consenso: 0, massimo: 50, note: "Ric. variabile €/PDP" },

    // ═══════════════════ AGN ENERGIA (da Excel) ═══════════════════
    { fornitore: "Promup", cat: "ENERGIA", provider: "AGN Energia", segment: "RES", product: "Domestico Standard", tipo: "Luce/Gas", gettone: 40, rid: 0, bolweb: 0, consenso: 0, massimo: 40, note: "Rinnovo 36€/anno" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "AGN Energia", segment: "RES", product: "Domestico Silver", tipo: "Luce/Gas", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "Rinnovo 72€/anno" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "AGN Energia", segment: "RES", product: "Domestico Gold", tipo: "Luce/Gas", gettone: 100, rid: 0, bolweb: 0, consenso: 0, massimo: 100, note: "Rinnovo 90€/anno" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "AGN Energia", segment: "COND", product: "Condominio Standard", tipo: "Luce/Gas", gettone: 100, rid: 0, bolweb: 0, consenso: 0, massimo: 100, note: "Rinnovo 50€/anno, Ric. 5€/MWh" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "AGN Energia", segment: "COND", product: "Condominio Gold", tipo: "Luce/Gas", gettone: 200, rid: 0, bolweb: 0, consenso: 0, massimo: 200, note: "Rinnovo 175€/anno, Ric. 5€/MWh" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "AGN Energia", segment: "COND", product: "Condominio Platinum", tipo: "Luce/Gas", gettone: 350, rid: 0, bolweb: 0, consenso: 0, massimo: 350, note: "Rinnovo 200€/anno, Ric. 5€/MWh" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "AGN Energia", segment: "COND", product: "Condominio Diamond", tipo: "Luce/Gas", gettone: 400, rid: 0, bolweb: 0, consenso: 0, massimo: 400, note: "Rinnovo 300€/anno, Ric. 5€/MWh" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "AGN Energia", segment: "BIZ", product: "Business", tipo: "Luce/Gas", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120, note: "Rinnovo 60€/anno, Ric. 2€/MWh" },
    { fornitore: "Promup", cat: "ENERGIA", provider: "AGN Energia", segment: "BIZ", product: "Business SA", tipo: "Luce/Gas", gettone: 240, rid: 0, bolweb: 0, consenso: 0, massimo: 240, note: "Rinnovo 180€/anno, Ric. 2€/MWh, no vincolo FV" },

    // ═══════════════════ FASTWEB TELECOM RES ═══════════════════
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Casa Start", tipo: "Fisso", gettone: 110, rid: 0, bolweb: 0, consenso: 0, massimo: 110, note: "Postepay 90€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Casa Start FWA/Light FWA", tipo: "Fisso", gettone: 110, rid: 0, bolweb: 0, consenso: 0, massimo: 110, note: "Postepay 90€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Casa Pro", tipo: "Fisso", gettone: 145, rid: 0, bolweb: 0, consenso: 0, massimo: 145, note: "Postepay 125€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Casa Pro Booster", tipo: "Fisso", gettone: 160, rid: 0, bolweb: 0, consenso: 0, massimo: 160, note: "Postepay 140€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Casa Ultra", tipo: "Fisso", gettone: 160, rid: 0, bolweb: 0, consenso: 0, massimo: 160, note: "Postepay 140€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Mobile Ultra", tipo: "Mobile", gettone: 60, rid: 0, bolweb: 0, consenso: 0, massimo: 70, note: "NL 60€ / Port. 70€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Mobile Start", tipo: "Mobile", gettone: 20, rid: 0, bolweb: 0, consenso: 0, massimo: 30, note: "NL 20€ / Port. 30€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Mobile Pro", tipo: "Mobile", gettone: 40, rid: 0, bolweb: 0, consenso: 0, massimo: 48, note: "NL 40€ / Port. 48€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb", segment: "RES", product: "Mobile Power", tipo: "Mobile", gettone: 55, rid: 0, bolweb: 0, consenso: 0, massimo: 65, note: "NL 55€ / Port. 65€" },

    // ═══════════════════ FASTWEB BIZ ═══════════════════
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business Light", tipo: "Fisso", gettone: 200, rid: 0, bolweb: 0, consenso: 0, massimo: 200 },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business", tipo: "Fisso", gettone: 275, rid: 0, bolweb: 0, consenso: 0, massimo: 275 },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business Opzione Backup", tipo: "Fisso", gettone: 285, rid: 0, bolweb: 0, consenso: 0, massimo: 285 },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business Plus", tipo: "Fisso", gettone: 315, rid: 0, bolweb: 0, consenso: 0, massimo: 315 },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business Plus Booster/Backup", tipo: "Fisso", gettone: 335, rid: 0, bolweb: 0, consenso: 0, massimo: 335 },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business Plus p.IVAx2", tipo: "Fisso", gettone: 250, rid: 0, bolweb: 0, consenso: 0, massimo: 250 },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business Pro p.IVAx2", tipo: "Fisso", gettone: 320, rid: 0, bolweb: 0, consenso: 0, massimo: 320 },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "Business Pro", tipo: "Fisso", gettone: 465, rid: 0, bolweb: 0, consenso: 0, massimo: 465 },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "NeXXt Mobile Freedom (Port.)", tipo: "Mobile", gettone: 105, rid: 0, bolweb: 0, consenso: 0, massimo: 105, note: "NL 45€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "NeXXt Mobile Business", tipo: "Mobile", gettone: 70, rid: 0, bolweb: 0, consenso: 0, massimo: 70, note: "NL 35€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "Fastweb BIZ", segment: "BIZ", product: "NeXXt Mobile Unlimited (Port.)", tipo: "Mobile", gettone: 150, rid: 0, bolweb: 0, consenso: 0, massimo: 165, note: "NL 70€, Conv. 85€/165€" },

    // ═══════════════════ TIM RES ═══════════════════
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "Premium Base RID (NIP)", tipo: "Fisso", gettone: 130, rid: 0, bolweb: 0, consenso: 0, massimo: 130, note: "ULL 150€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "Wifi Casa/TV S/M/L RID (NIP)", tipo: "Fisso", gettone: 160, rid: 0, bolweb: 0, consenso: 0, massimo: 160, note: "ULL 180€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "Wifi Casa FWA RID (NIP)", tipo: "Fisso", gettone: 150, rid: 0, bolweb: 0, consenso: 0, massimo: 150, note: "ULL 170€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "Wifi Special Carta Giovani RID", tipo: "Fisso", gettone: 130, rid: 0, bolweb: 0, consenso: 0, massimo: 130, note: "ULL 150€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "Wifi Casa Sconto Mobile RID", tipo: "Fisso", gettone: 135, rid: 0, bolweb: 0, consenso: 0, massimo: 135, note: "ULL 155€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "Premium Base BP", tipo: "Fisso", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "Wifi Casa/TV BP", tipo: "Fisso", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "TIMVISION Intrattenimento", tipo: "Opzione", gettone: 25, rid: 0, bolweb: 0, consenso: 0, massimo: 25 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "TIMVISION con Netflix", tipo: "Opzione", gettone: 15, rid: 0, bolweb: 0, consenso: 0, massimo: 15 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "TIMVISION con Disney+", tipo: "Opzione", gettone: 10, rid: 0, bolweb: 0, consenso: 0, massimo: 10 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "TIMVISION Calcio/Sport Light", tipo: "Opzione", gettone: 10, rid: 0, bolweb: 0, consenso: 0, massimo: 10 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "TIMVISION Gold", tipo: "Opzione", gettone: 30, rid: 0, bolweb: 0, consenso: 0, massimo: 30 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "TIM Unica Power", tipo: "Opzione", gettone: 8, rid: 0, bolweb: 0, consenso: 0, massimo: 8 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "Amazon Prime", tipo: "Opzione", gettone: 3, rid: 0, bolweb: 0, consenso: 0, massimo: 3 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM", segment: "RES", product: "Opzioni Mobile", tipo: "Mobile", gettone: 10, rid: 0, bolweb: 0, consenso: 0, massimo: 10 },

    // ═══════════════════ TIM BUSINESS ═══════════════════
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM BIZ", segment: "BIZ", product: "Fisso", tipo: "Fisso", gettone: 250, rid: 0, bolweb: 0, consenso: 0, massimo: 250, note: "LA 230€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM BIZ", segment: "BIZ", product: "NIP Old", tipo: "Fisso", gettone: 180, rid: 0, bolweb: 0, consenso: 0, massimo: 180 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM BIZ", segment: "BIZ", product: "NIP/CB", tipo: "Fisso", gettone: 65, rid: 0, bolweb: 0, consenso: 0, massimo: 65 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM BIZ", segment: "BIZ", product: "Suprema", tipo: "Fisso", gettone: 250, rid: 0, bolweb: 0, consenso: 0, massimo: 250 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM BIZ", segment: "BIZ", product: "FWA Sempre Connesso Speedy", tipo: "Fisso", gettone: 145, rid: 0, bolweb: 0, consenso: 0, massimo: 145 },
    { fornitore: "Promup", cat: "TELECOM", provider: "TIM BIZ", segment: "BIZ", product: "Ovunque Sei", tipo: "Mobile", gettone: 30, rid: 0, bolweb: 0, consenso: 0, massimo: 30 },

    // ═══════════════════ WINDTRE ═══════════════════
    { fornitore: "Promup", cat: "TELECOM", provider: "WindTre", segment: "RES", product: "FTTC (LNA)", tipo: "Fisso", gettone: 180, rid: 0, bolweb: 0, consenso: 0, massimo: 180 },
    { fornitore: "Promup", cat: "TELECOM", provider: "WindTre", segment: "RES", product: "FTTH (LNA)", tipo: "Fisso", gettone: 200, rid: 0, bolweb: 0, consenso: 0, massimo: 200 },
    { fornitore: "Promup", cat: "TELECOM", provider: "WindTre", segment: "RES", product: "FWA (LNA)", tipo: "Fisso", gettone: 180, rid: 0, bolweb: 0, consenso: 0, massimo: 180 },
    { fornitore: "Promup", cat: "TELECOM", provider: "WindTre", segment: "RES", product: "Netflix", tipo: "Opzione", gettone: 8, rid: 0, bolweb: 0, consenso: 0, massimo: 8 },
    { fornitore: "Promup", cat: "TELECOM", provider: "WindTre", segment: "RES", product: "Mobile Sim (NL)", tipo: "Mobile", gettone: 15, rid: 0, bolweb: 0, consenso: 0, massimo: 15 },
    { fornitore: "Promup", cat: "TELECOM", provider: "WindTre", segment: "RES", product: "Mobile Sim (Port.)", tipo: "Mobile", gettone: 30, rid: 0, bolweb: 0, consenso: 0, massimo: 30 },
    { fornitore: "Promup", cat: "TELECOM", provider: "WindTre", segment: "BIZ", product: "Super Fibra FTTC", tipo: "Fisso", gettone: 65, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "LNA 65€ / LA 80€, Conv. 15-25€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "WindTre", segment: "BIZ", product: "Super Fibra FTTH", tipo: "Fisso", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 95, note: "LNA 80€ / LA 95€, Conv. 15-25€" },
    { fornitore: "Promup", cat: "TELECOM", provider: "WindTre", segment: "BIZ", product: "Sim Convergenza", tipo: "Mobile", gettone: 25, rid: 0, bolweb: 0, consenso: 0, massimo: 25 },

    // ═══════════════════ SUPERMONEY (da Excel — SuperMoney) ═══════════════════
    // --- Cluster E1 (€20 + €75 = €95) ---
    { fornitore: "SuperMoney", cat: "ENERGIA", provider: "Edison (SM)", segment: "BIZ", product: "Edison Revolucion", tipo: "Luce/Gas", gettone: 95, rid: 35, bolweb: 0, consenso: 0, massimo: 130, note: "Cluster E1, Comm. €20+€75, RID >70%" },
    { fornitore: "SuperMoney", cat: "ENERGIA", provider: "Eni (SM)", segment: "BIZ", product: "Eni Plenitude", tipo: "Luce/Gas", gettone: 95, rid: 35, bolweb: 0, consenso: 0, massimo: 130, note: "Cluster E1, Comm. €20+€75, RID >70%" },
    { fornitore: "SuperMoney", cat: "ENERGIA", provider: "Iren (SM)", segment: "BIZ", product: "Iren Revolucion", tipo: "Luce/Gas", gettone: 95, rid: 35, bolweb: 0, consenso: 0, massimo: 130, note: "Cluster E1, Comm. €20+€75, RID >70%" },
    // --- Cluster E2 (€20 + €60 = €80) ---
    { fornitore: "SuperMoney", cat: "ENERGIA", provider: "Acea (SM)", segment: "BIZ", product: "Acea Fix", tipo: "Luce/Gas", gettone: 80, rid: 35, bolweb: 0, consenso: 0, massimo: 115, note: "Cluster E2, Comm. €20+€60, RID >70%" },
    { fornitore: "SuperMoney", cat: "ENERGIA", provider: "Iren (SM)", segment: "BIZ", product: "Iren Quick", tipo: "Luce/Gas", gettone: 80, rid: 35, bolweb: 0, consenso: 0, massimo: 115, note: "Cluster E2, Comm. €20+€60, RID >70%" },
    { fornitore: "SuperMoney", cat: "ENERGIA", provider: "Fastweb En. (SM)", segment: "BIZ", product: "Fastweb Energia", tipo: "Luce/Gas", gettone: 80, rid: 35, bolweb: 0, consenso: 0, massimo: 115, note: "Cluster E2, Comm. €20+€60, RID >70%" },
    // --- Cluster E3 (€20 + €35 = €55) ---
    { fornitore: "SuperMoney", cat: "ENERGIA", provider: "Iren (SM)", segment: "BIZ", product: "Iren Prezzo Sicuro", tipo: "Luce/Gas", gettone: 55, rid: 35, bolweb: 0, consenso: 0, massimo: 90, note: "Cluster E3, Comm. €20+€35, RID >70%" },
    { fornitore: "SuperMoney", cat: "ENERGIA", provider: "Illumia (SM)", segment: "BIZ", product: "Illumia", tipo: "Luce/Gas", gettone: 55, rid: 35, bolweb: 0, consenso: 0, massimo: 90, note: "Cluster E3, Comm. €20+€35, RID >70%" },
    { fornitore: "SuperMoney", cat: "ENERGIA", provider: "Wekiwi (SM)", segment: "BIZ", product: "Wekiwi", tipo: "Luce/Gas", gettone: 55, rid: 35, bolweb: 0, consenso: 0, massimo: 90, note: "Cluster E3, Comm. €20+€35, RID >70%" },

    // ═══════════════════ AGN ENERGIA (da Excel — Diretto) ═══════════════════
    { fornitore: "Diretto", cat: "ENERGIA", provider: "AGN Dir.", segment: "RES", product: "Domestico Standard", tipo: "Luce/Gas", gettone: 40, rid: 0, bolweb: 0, consenso: 0, massimo: 40, note: "Rinnovo 36€/anno" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "AGN Dir.", segment: "RES", product: "Domestico Silver", tipo: "Luce/Gas", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "Rinnovo 72€/anno" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "AGN Dir.", segment: "RES", product: "Domestico Gold", tipo: "Luce/Gas", gettone: 100, rid: 0, bolweb: 0, consenso: 0, massimo: 100, note: "Rinnovo 90€/anno" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "AGN Dir.", segment: "COND", product: "Condominio Standard", tipo: "Luce/Gas", gettone: 100, rid: 0, bolweb: 0, consenso: 0, massimo: 100, note: "Rinnovo 50€/anno, Ric. 5€/MWh" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "AGN Dir.", segment: "COND", product: "Condominio Gold", tipo: "Luce/Gas", gettone: 200, rid: 0, bolweb: 0, consenso: 0, massimo: 200, note: "Rinnovo 175€/anno, Ric. 5€/MWh" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "AGN Dir.", segment: "COND", product: "Condominio Platinum", tipo: "Luce/Gas", gettone: 350, rid: 0, bolweb: 0, consenso: 0, massimo: 350, note: "Rinnovo 200€/anno, Ric. 5€/MWh" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "AGN Dir.", segment: "COND", product: "Condominio Diamond", tipo: "Luce/Gas", gettone: 400, rid: 0, bolweb: 0, consenso: 0, massimo: 400, note: "Rinnovo 300€/anno, Ric. 5€/MWh" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "AGN Dir.", segment: "BIZ", product: "Business", tipo: "Luce/Gas", gettone: 120, rid: 0, bolweb: 0, consenso: 0, massimo: 120, note: "Rinnovo 60€/anno, Ric. 2€/MWh" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "AGN Dir.", segment: "BIZ", product: "Business SA", tipo: "Luce/Gas", gettone: 240, rid: 0, bolweb: 0, consenso: 0, massimo: 240, note: "Rinnovo 180€/anno, Ric. 2€/MWh, no vincolo FV" },

    // ═══════════════════ MAGIS ENERGIA (da Excel — Diretto) ═══════════════════
    { fornitore: "Diretto", cat: "ENERGIA", provider: "Magis Dir.", segment: "RES", product: "Domestico Tipo A", tipo: "Luce/Gas", gettone: 90, rid: 15, bolweb: 0, consenso: 5, massimo: 110, note: "SDD 15€, Paperless 5€, Ric.EE €0,010/kWh" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "Magis Dir.", segment: "RES", product: "Domestico Tipo M", tipo: "Luce/Gas", gettone: 60, rid: 15, bolweb: 0, consenso: 5, massimo: 80, note: "SDD 15€, Paperless 5€, Ric.EE €0,010/kWh" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "Magis Dir.", segment: "RES", product: "Domestico Tipo B", tipo: "Luce/Gas", gettone: 40, rid: 15, bolweb: 0, consenso: 5, massimo: 60, note: "SDD 15€, Paperless 5€, Ric.EE €0,003/kWh" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "Magis Dir.", segment: "BIZ", product: "Altri Usi Tipo A", tipo: "Luce", gettone: 150, rid: 15, bolweb: 0, consenso: 5, massimo: 170, note: "SDD 15€, Paperless 5€, Ric.EE €0,0040/kWh" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "Magis Dir.", segment: "BIZ", product: "Altri Usi Tipo M", tipo: "Luce", gettone: 120, rid: 15, bolweb: 0, consenso: 5, massimo: 140, note: "SDD 15€, Paperless 5€, Ric.EE €0,0030/kWh" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "Magis Dir.", segment: "BIZ", product: "Altri Usi Tipo B", tipo: "Luce", gettone: 90, rid: 15, bolweb: 0, consenso: 5, massimo: 110, note: "SDD 15€, Paperless 5€, Ric.EE €0,0020/kWh" },
    { fornitore: "Diretto", cat: "ENERGIA", provider: "Magis Dir.", segment: "BIZ", product: "Altri Usi Tipo L", tipo: "Luce", gettone: 50, rid: 15, bolweb: 0, consenso: 5, massimo: 70, note: "SDD 15€, Paperless 5€, Ric.EE €0,0015/kWh" },
    {
        fornitore: "Diretto",
        cat: "ENERGIA",
        provider: "Alperia",
        segment: "RES",
        product: "Home Digital / Start / Smile Safety",
        tipo: "Luce/Gas",
        gettone: 30,
        rid: 0,
        bolweb: 0,
        consenso: 0,
        massimo: 30,
        note: "From Alperia PDF"
    },
    {
        fornitore: "Diretto",
        cat: "ENERGIA",
        provider: "Alperia",
        segment: "RES",
        product: "Home Standard / Pure",
        tipo: "Luce/Gas",
        gettone: 50,
        rid: 0,
        bolweb: 0,
        consenso: 0,
        massimo: 50,
        note: "From Alperia PDF"
    },
    {
        fornitore: "Diretto",
        cat: "ENERGIA",
        provider: "Alperia",
        segment: "RES",
        product: "Home Pro / Clear / Prime",
        tipo: "Luce/Gas",
        gettone: 70,
        rid: 0,
        bolweb: 0,
        consenso: 0,
        massimo: 70,
        note: "From Alperia PDF"
    },
    {
        fornitore: "Diretto",
        cat: "ENERGIA",
        provider: "Alperia",
        segment: "RES",
        product: "Home Premium",
        tipo: "Luce/Gas",
        gettone: 100,
        rid: 0,
        bolweb: 0,
        consenso: 0,
        massimo: 100,
        note: "From Alperia PDF"
    },

    // ═══════════════════════════════════════════════════════════════
    // 2GEST — PIANO COMPENSI APRILE 2026
    // ═══════════════════════════════════════════════════════════════

    // ─────────────── VODAFONE (BIZ) ───────────────
    { fornitore: "2GEST", cat: "TELECOM", provider: "Vodafone", segment: "BIZ", product: "One Net Ufficio/Azienda", tipo: "Fisso", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "6 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Vodafone", segment: "BIZ", product: "Fissa Smart/Comfort/Extra", tipo: "Fisso", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "7 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Vodafone", segment: "BIZ", product: "Extra Servizi Fissa", tipo: "Fisso", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "4 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Vodafone", segment: "BIZ", product: "Easy Rent", tipo: "Fisso", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "5 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Vodafone", segment: "BIZ", product: "Easy Deal", tipo: "Fisso", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "2 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Vodafone", segment: "BIZ", product: "SIM", tipo: "Mobile", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "4 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Vodafone", segment: "BIZ", product: "Bundle SDM + MOVYLO", tipo: "Digital", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "5 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Vodafone", segment: "BIZ", product: "Digital Tutto", tipo: "Digital", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "4 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Vodafone", segment: "BIZ", product: "PA", tipo: "Fisso", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "2 canoni T0" },

    // ─────────────── FASTWEB (2G) — TELECOM RES ───────────────
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "RES", product: "Casa Ultra", tipo: "Fisso", gettone: 110, rid: 0, bolweb: 0, consenso: 0, massimo: 110 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "RES", product: "Casa Pro", tipo: "Fisso", gettone: 100, rid: 0, bolweb: 0, consenso: 0, massimo: 100 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "RES", product: "Casa Start", tipo: "Fisso", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "RES", product: "Casa FWA", tipo: "Fisso", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "RES", product: "Casa FWA Start", tipo: "Fisso", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "RES", product: "Mobile Start", tipo: "Mobile", gettone: 5, rid: 0, bolweb: 0, consenso: 0, massimo: 5 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "RES", product: "Mobile Pro", tipo: "Mobile", gettone: 10, rid: 0, bolweb: 0, consenso: 0, massimo: 10 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "RES", product: "Mobile Ultra", tipo: "Mobile", gettone: 15, rid: 0, bolweb: 0, consenso: 0, massimo: 15 },

    // ─────────────── FASTWEB (2G) — TELECOM BIZ ───────────────
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "BIZ", product: "Business Light", tipo: "Fisso", gettone: 130, rid: 0, bolweb: 0, consenso: 0, massimo: 130 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "BIZ", product: "Business", tipo: "Fisso", gettone: 200, rid: 0, bolweb: 0, consenso: 0, massimo: 200 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "BIZ", product: "Business Plus", tipo: "Fisso", gettone: 260, rid: 0, bolweb: 0, consenso: 0, massimo: 260 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "BIZ", product: "Business Pro", tipo: "Fisso", gettone: 300, rid: 0, bolweb: 0, consenso: 0, massimo: 300 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "BIZ", product: "NeXXt Mobile Business", tipo: "Mobile", gettone: 15, rid: 0, bolweb: 0, consenso: 0, massimo: 15 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "BIZ", product: "NeXXt Mobile Business Freedom", tipo: "Mobile", gettone: 30, rid: 0, bolweb: 0, consenso: 0, massimo: 30 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Fastweb (2G)", segment: "BIZ", product: "NeXXt Mobile Business Unlimited", tipo: "Mobile", gettone: 35, rid: 0, bolweb: 0, consenso: 0, massimo: 35 },

    // ─────────────── FASTWEB (2G) — ENERGIA RES ───────────────
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Fastweb (2G)", segment: "RES", product: "Fastweb FLEX", tipo: "Luce", gettone: 85, rid: 0, bolweb: 0, consenso: 0, massimo: 85, note: "Switch/Voltura/Subentro; SSD obbligatorio" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Fastweb (2G)", segment: "RES", product: "Fastweb FIX", tipo: "Luce", gettone: 85, rid: 0, bolweb: 0, consenso: 0, massimo: 85, note: "Solo Switch; SSD obbligatorio" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Fastweb (2G)", segment: "RES", product: "Fastweb LIGHT/FULL/MAXI", tipo: "Luce", gettone: 85, rid: 0, bolweb: 0, consenso: 0, massimo: 85, note: "Solo Switch; SSD obbligatorio" },

    // ─────────────── WIND3 (2G) — BIZ ───────────────
    { fornitore: "2GEST", cat: "TELECOM", provider: "Wind3 (2G)", segment: "BIZ", product: "OFFICE PLUS SPECIAL 1 Canale Voce", tipo: "Fisso", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "2,5 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Wind3 (2G)", segment: "BIZ", product: "OFFICE PLUS 2 Canali Voce", tipo: "Fisso", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "4 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Wind3 (2G)", segment: "BIZ", product: "OFFICE MAXI 3-8 Canali Voce", tipo: "Fisso", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "5 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Wind3 (2G)", segment: "BIZ", product: "SIM", tipo: "Mobile", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "4 canoni T0 + 1 canone T8" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Wind3 (2G)", segment: "BIZ", product: "CONNECT FTTC/FTTH", tipo: "Dati", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "4 canoni T0 (solo servizio)" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Wind3 (2G)", segment: "BIZ", product: "CONNECT BEA/Ponte Radio/FWA", tipo: "Dati", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "3 canoni T0 (solo servizio)" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Wind3 (2G)", segment: "BIZ", product: "CONNECT Terminating Ethernet", tipo: "Dati", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "3 canoni T0 (solo servizio)" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "Wind3 (2G)", segment: "BIZ", product: "CONNECT Radiolink EOLO", tipo: "Dati", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "4 canoni T0 (solo servizio)" },

    // ─────────────── TIM (2G) — RES ───────────────
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "RES", product: "Tutte le offerte — ULL", tipo: "Fisso", gettone: 140, rid: 0, bolweb: 0, consenso: 0, massimo: 140, note: "SSD obbl. (assenza → 50%)" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "RES", product: "Tutte le offerte — NIP", tipo: "Fisso", gettone: 110, rid: 0, bolweb: 0, consenso: 0, massimo: 110, note: "SSD obbl. (assenza → 50%)" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "RES", product: "Opzione VOCE", tipo: "Opzione", gettone: 5, rid: 0, bolweb: 0, consenso: 0, massimo: 5, note: "Solo se opzione a pagamento" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "RES", product: "Opzione MOBILE", tipo: "Opzione", gettone: 5, rid: 0, bolweb: 0, consenso: 0, massimo: 5, note: "Solo se opzione a pagamento" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "RES", product: "TIMVISION Gold", tipo: "Opzione", gettone: 25, rid: 0, bolweb: 0, consenso: 0, massimo: 25 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "RES", product: "TIMVISION Calcio e Sport", tipo: "Opzione", gettone: 20, rid: 0, bolweb: 0, consenso: 0, massimo: 20 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "RES", product: "TIMVISION con Netflix", tipo: "Opzione", gettone: 10, rid: 0, bolweb: 0, consenso: 0, massimo: 10 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "RES", product: "TIMVISION Family", tipo: "Opzione", gettone: 20, rid: 0, bolweb: 0, consenso: 0, massimo: 20 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "RES", product: "TIMVISION Intrattenimento", tipo: "Opzione", gettone: 15, rid: 0, bolweb: 0, consenso: 0, massimo: 15 },

    // ─────────────── TIM (2G) — BIZ ───────────────
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "BIZ", product: "SOHO — Tutte le offerte", tipo: "Fisso", gettone: 170, rid: 0, bolweb: 0, consenso: 0, massimo: 170 },
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "BIZ", product: "SME — Tutte le offerte", tipo: "Fisso", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "3 canoni T0" },
    { fornitore: "2GEST", cat: "TELECOM", provider: "TIM (2G)", segment: "BIZ", product: "Mobile BIZ — Tutte le offerte", tipo: "Mobile", gettone: 0, rid: 0, bolweb: 0, consenso: 0, massimo: 0, note: "3 canoni T0" },

    // ─────────────── ENEL ENERGIA — RES ───────────────
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Enel Energia", segment: "RES", product: "Luce", tipo: "Luce", gettone: 70, rid: 10, bolweb: 0, consenso: 0, massimo: 80, note: "+10€ RID+Bol.Web" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Enel Energia", segment: "RES", product: "Gas", tipo: "Gas", gettone: 70, rid: 10, bolweb: 0, consenso: 0, massimo: 80, note: "+10€ RID+Bol.Web" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Enel Energia", segment: "RES", product: "Fibra", tipo: "Fibra", gettone: 95, rid: 0, bolweb: 0, consenso: 0, massimo: 95 },

    // ─────────────── PLENITUDE — ENERGIA ───────────────
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Plenitude", segment: "RES", product: "Tutte le Offerte", tipo: "Luce/Gas", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "SSD obbl. (assenza → 50%); subentro non remunerato" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Plenitude", segment: "BIZ", product: "Tutte le Offerte", tipo: "Luce/Gas", gettone: 60, rid: 0, bolweb: 0, consenso: 0, massimo: 60, note: "SSD obbl. (assenza → 50%)" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Plenitude", segment: "RES", product: "Adotta un Pannello", tipo: "VAS", gettone: 5, rid: 0, bolweb: 0, consenso: 0, massimo: 5 },

    // ─────────────── EDISON (2G) — RES ───────────────
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Edison (2G)", segment: "RES", product: "Luce Indicizzata", tipo: "Luce", gettone: 85, rid: 0, bolweb: 0, consenso: 0, massimo: 85, note: "SSD non obbl. (assenza → 50%); Churn 6m <20%" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Edison (2G)", segment: "RES", product: "Gas Indicizzato", tipo: "Gas", gettone: 85, rid: 0, bolweb: 0, consenso: 0, massimo: 85, note: "SSD non obbl. (assenza → 50%); Churn 6m <20%" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Edison (2G)", segment: "RES", product: "Luce Fissa", tipo: "Luce", gettone: 65, rid: 0, bolweb: 0, consenso: 0, massimo: 65, note: "SSD non obbl. (assenza → 50%); Churn 6m <20%" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Edison (2G)", segment: "RES", product: "Gas Fisso", tipo: "Gas", gettone: 65, rid: 0, bolweb: 0, consenso: 0, massimo: 65, note: "SSD non obbl. (assenza → 50%); Churn 6m <20%" },

    // ─────────────── HERAcomm — ENERGIA ───────────────
    { fornitore: "2GEST", cat: "ENERGIA", provider: "HERAcomm", segment: "RES", product: "Luce", tipo: "Luce", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75, note: "SSD non obbl. (assenza → 50%); Churn 6m <20%" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "HERAcomm", segment: "RES", product: "Gas", tipo: "Gas", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75, note: "SSD non obbl. (assenza → 50%)" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "HERAcomm", segment: "BIZ", product: "Luce", tipo: "Luce", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75, note: "SSD non obbl. (assenza → 50%)" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "HERAcomm", segment: "BIZ", product: "Gas", tipo: "Gas", gettone: 75, rid: 0, bolweb: 0, consenso: 0, massimo: 75, note: "SSD non obbl. (assenza → 50%)" },

    // ─────────────── ARGOS — ENERGIA ───────────────
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Argos", segment: "RES", product: "Luce", tipo: "Luce", gettone: 65, rid: 15, bolweb: 0, consenso: 0, massimo: 80, note: "+15€ RID+Bol.Web; SSD RES non obbl." },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Argos", segment: "RES", product: "Gas", tipo: "Gas", gettone: 65, rid: 15, bolweb: 0, consenso: 0, massimo: 80, note: "+15€ RID+Bol.Web; SSD RES non obbl." },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Argos", segment: "BIZ", product: "Luce", tipo: "Luce", gettone: 65, rid: 15, bolweb: 0, consenso: 0, massimo: 80, note: "+15€ RID+Bol.Web; SSD BIZ obbl." },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Argos", segment: "BIZ", product: "Gas", tipo: "Gas", gettone: 65, rid: 15, bolweb: 0, consenso: 0, massimo: 80, note: "+15€ RID+Bol.Web; SSD BIZ obbl." },

    // ─────────────── LUCE E GAS ITALIA — ENERGIA ───────────────
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Luce e Gas", segment: "RES", product: "Luce", tipo: "Luce", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "SSD non obbl. (assenza → 50%); escluse CAL/BAS/CAM" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Luce e Gas", segment: "RES", product: "Gas", tipo: "Gas", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "SSD non obbl. (assenza → 50%); escluse CAL/BAS/CAM" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Luce e Gas", segment: "BIZ", product: "Luce", tipo: "Luce", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "SSD non obbl. (assenza → 50%); escluse CAL/BAS/CAM" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Luce e Gas", segment: "BIZ", product: "Gas", tipo: "Gas", gettone: 80, rid: 0, bolweb: 0, consenso: 0, massimo: 80, note: "SSD non obbl. (assenza → 50%); escluse CAL/BAS/CAM" },

    // ─────────────── SENTRA — ENERGIA ───────────────
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Sentra", segment: "RES", product: "Luce", tipo: "Luce", gettone: 65, rid: 0, bolweb: 0, consenso: 0, massimo: 65, note: "SSD non obbl. (assenza → 50%)" },
    { fornitore: "2GEST", cat: "ENERGIA", provider: "Sentra", segment: "RES", product: "Gas", tipo: "Gas", gettone: 65, rid: 0, bolweb: 0, consenso: 0, massimo: 65, note: "SSD non obbl. (assenza → 50%)" },
];

export const PROVIDER_COLORS = {
    "Estra": "#E65100",
    "Fastweb En.": "#FFD600", "Edison": "#2E7D32", "Edison SiB": "#1B5E20",
    "A2A": "#00BCD4", "Axpo": "#FF9800", "AGN Energia": "#AB47BC",
    "Fastweb": "#FFD600", "Fastweb BIZ": "#FFC107",
    "TIM": "#003399", "TIM BIZ": "#0D47A1",
    "WindTre": "#FF6600",
    "SM E1": "#607D8B", "SM E2": "#78909C", "SM E3": "#90A4AE",
    "Eni": "#FFCA28", "Acea": "#5C6BC0", "Illumia": "#EF5350", "Wekiwi": "#66BB6A", "Iren": "#42A5F5",
    "Edison (SM)": "#388E3C", "Eni (SM)": "#FFCA28", "Iren (SM)": "#42A5F5",
    "Acea (SM)": "#5C6BC0", "Fastweb En. (SM)": "#FDD835",
    "Illumia (SM)": "#EF5350", "Wekiwi (SM)": "#66BB6A",
    "AGN Dir.": "#CE93D8", "Magis Dir.": "#4DB6AC",
    // 2GEST
    "Vodafone": "#E60000",
    "Fastweb (2G)": "#FFD600",
    "Wind3 (2G)": "#FF5722",
    "TIM (2G)": "#1565C0",
    "Enel Energia": "#006633",
    "Plenitude": "#FF6F00",
    "Edison (2G)": "#43A047",
    "HERAcomm": "#B71C1C",
    "Argos": "#7B1FA2",
    "Luce e Gas": "#00838F",
    "Sentra": "#5D4037",
};
export const GESTORE_IDS = {
    // Promup — Energia
    "Estra": 16,
    "Fastweb En.": 24,
    "Edison": 5,
    "Edison SiB": 5,
    "A2A": 6,
    "Axpo": 13,
    "AGN Energia": 66,
    // Promup — Telecom
    "Fastweb": 34,
    "Fastweb BIZ": 34,
    "TIM": 3,
    "TIM BIZ": 3,
    "WindTre": 32,
    // SuperMoney — Comparatore
    "Edison (SM)": 5,
    "Eni (SM)": 61,
    "Iren (SM)": 69,
    "Acea (SM)": 58,
    "Fastweb En. (SM)": 72,
    "Illumia (SM)": 71,
    // Diretto
    "AGN Dir.": 66,
    "Magis Dir.": 65,
    "Alperia": 20,
    // 2GEST — Telecom
    "Vodafone": 31,
    "Fastweb (2G)": 34,
    "Wind3 (2G)": 32,
    "TIM (2G)": 3,
    // 2GEST — Energia
    "Enel Energia": 1,
    "Plenitude": 4,
    "Edison (2G)": 5,
    "HERAcomm": 9,
    "Argos": 57,
};

export const STORNO_RULES = {
    "Estra": {
        storni: [
            "Storno 50% per forniture con permanenza ≤2 mesi",
            "Non vendibile in Campania",
            "Condomini solo in Toscana",
            "Full Digital + OTP solo con combo Bolletta Web + OTP",
        ],
        penali: [
            { desc: "Mancata qualificazione come incaricato Estra", importo: "200€" },
            { desc: "Errata descrizione offerta/prezzo", importo: "200€" },
            { desc: "Consenso carpito con inganno", importo: "500€" },
            { desc: "Consenso falsificato", importo: "500€" },
            { desc: "Uso difforme marchi Estra", importo: "500€" },
        ],
    },
    "Fastweb En.": {
        storni: [
            "Pagamento su segnalazioni OK CARICATO su Promup",
            "Business: potenza max 30kW, consumo max 50.000kW/anno",
        ],
        penali: [],
    },
    "Edison": {
        storni: [
            "RES: storno 50% per cessazione <4 mesi",
            "BIZ: storno 50% per cessazione <4 mesi",
            "BIZ: storno 40% per cessazione tra 5° e 7° mese",
            "Condomini Luce: 75% <4m, 50% 5°-7°m, 25% 8°-10°m",
            "Condomini Gas: storno 50% <4 mesi",
            "WiFi: storno 50% <4 mesi",
            "VAS Ti Protegge: 100% ripensamento ≤30gg, 30% <4m",
            "TOP50/TOP40: obbligatorio SDD",
            "Contratto originale: consegna entro 35gg",
        ],
        penali: [
            { desc: "Volume consumi difforme da bolletta", importo: "200€" },
            { desc: "Pratica scorretta vs domestici", importo: "100€" },
            { desc: "Pratica scorretta vs imprese", importo: "200€" },
        ],
    },
    "Edison SiB": {
        storni: [
            "Switch: acconto 30% + 70% in 12 mensilità",
            "Nuovo Allaccio/Subentro/Voltura: 100% in 12 mensilità",
            "Obbligatorio SDD",
            "Luce min 100 MWh/anno, Gas min 40.000 smc/anno",
        ],
        penali: [],
    },
    "A2A": {
        storni: [
            "Storno 100% per cessazione entro 4 mesi",
            "Storno 50% per cessazione 5°-6° mese",
            "Ricorrente: one shot al 13° mese se ancora in fornitura",
            "Condomini: non commercializzabili",
            "VAS: gettoni su % imponibile offerta VAS",
        ],
        penali: [{ desc: "Comportamenti scorretti accertati", importo: "500€" }],
    },
    "Axpo": {
        storni: [
            "Storno 100% per PDP non entrati in fornitura",
            "Storno 90% per permanenza ≤1 mese",
            "Storno 50% per permanenza 2-3 mesi",
            "Storno 20% per permanenza 4-6 mesi",
            "Ricorrente mensile per PDP attivi",
            "Condomini: solo su profili BIZ",
        ],
        penali: [],
    },
    "AGN Energia": {
        storni: [
            "Rinnovo dal 13° mese dall'attivazione",
            "Ricorrente Condomini: €5/MWh",
            "Ricorrente Business: €2/MWh",
            "Business vincolato a FV, Business SA senza vincolo",
        ],
        penali: [],
    },
    // ═══════════════════ TELECOM STORNI ═══════════════════
    "Fastweb": {
        storni: [
            "Storno 100% per nuovo contratto stesso indirizzo con disdetta ±2 mesi",
            "Mancata attivazione entro 60gg → decurtazione",
            "Storno 100% se numerazione non validata nel Tool",
            "Portabilità da Vodafone (fisso/mobile): nessun compenso",
            "Conteggio: dal 16 mese prec. al 15 mese corrente",
        ],
        penali: [],
    },
    "Fastweb BIZ": {
        storni: [
            "SHP: storno 100% per nuovo ctr stesso indirizzo con disdetta ±2 mesi",
            "SHP: Fisso ≥10pz → gettone maggiorato, solo su attivati",
            "SMALL: Fisso ≥5pz → gettone maggiorato, solo su attivati",
            "LARGE: storno 100% per recesso entro 12 mesi",
            "UPGRADE: cliente deve essere Fastweb da almeno 1 anno",
            "Portabilità Mobile da Vodafone: nessun compenso",
            "Mancata attivazione entro 60gg → decurtazione",
        ],
        penali: [],
    },
    "TIM": {
        storni: [
            "Se RID non si attiva → compenso senza RID",
            "Vietato proporre LNA a clienti già TIM (CB): storno + penale 250€/pratica",
            "Frode: storno totale",
            "Disconoscimento/denuncia: storno totale",
            "NIP a ULL in corso: storno totale",
            "Pendenze fatture (prime 2): storno compenso",
            "TIMVISION: storno 100% se recesso <120gg",
            "Opzioni: compenso a 3 mesi se pagamenti regolari",
            "Conteggio: dal 16 mese prec. al 15 mese corrente",
        ],
        penali: [
            { desc: "Attivazione a clienti già TIM (CB)", importo: "250€ + storno" },
        ],
    },
    "TIM BIZ": {
        storni: [
            "Cessazione/morosità/frode <9 mesi: storno 100%",
            "Contratti originali obbligatori entro il 5 del mese successivo",
            "Compliance: richiesta PDA originale, storno 100% se non fornita",
            "Canone ridotto (netto) per sconti/istanze al cliente",
            "Conteggio: dal 16 mese prec. al 15 mese corrente",
        ],
        penali: [],
    },
    "WindTre": {
        storni: [
            "RES: storno a 6 mesi per recesso/mancato pagamento",
            "RES: storno 100% se numerazione non validata nel Tool",
            "RES Negozio: bollettino postale → -15€ dal compenso",
            "RES Negozio: recesso/migrazione <6 mesi → storno 100%",
            "BIZ: recesso/disdetta/mancato pagamento <9 mesi → storno",
            "BIZ: SIM PostPagata→Ricaricabile <6 mesi → storno",
            "BIZ: se ordine torna da SME a MICRO <9 mesi → storno tutti gettoni aggiuntivi",
            "BIZ: % scontistica cliente si applica in proporzione al compenso",
            "Conteggio: dal 16 mese prec. al 15 mese corrente",
        ],
        penali: [],
    },
    "SM E1": {
        storni: [
            "Commissione prodotto: €20 + €75",
            "Quota RID proporzionale alla % SDD raggiunta",
            "Canvass Entry: 0-250 ctr €5, 251-350 €14, 351-500 €18",
            "Canvass Gold: >500 €10, >1000 €20, >1500 €30 (regressivo)",
            "Trattenute: Enasarco 1% + Ritenuta 4,60% = 5,60%",
        ],
        penali: [],
    },
    "SM E2": {
        storni: [
            "Commissione prodotto: €20 + €60",
            "Quota RID proporzionale alla % SDD raggiunta",
            "Canvass Entry: 0-250 ctr €5, 251-350 €14, 351-500 €18",
            "Trattenute: Enasarco 1% + Ritenuta 4,60% = 5,60%",
        ],
        penali: [],
    },
    "SM E3": {
        storni: [
            "Commissione prodotto: €20 + €35",
            "Quota RID proporzionale alla % SDD raggiunta",
            "Canvass Entry: 0-250 ctr €5, 251-350 €14, 351-500 €18",
            "Trattenute: Enasarco 1% + Ritenuta 4,60% = 5,60%",
        ],
        penali: [],
    },
    "AGN Dir.": {
        storni: [
            "Rinnovo dal 13° mese dall'attivazione",
            "Ricorrente Condomini: €5/MWh",
            "Ricorrente Business: €2/MWh",
            "Business vincolato a FV, Business SA senza vincolo",
            "Trattenute: Enasarco 1% + Ritenuta 4,60% = 5,60%",
        ],
        penali: [],
    },

    "Alperia": {
        storni: [
            "Storno 100% per i primi 3 mesi",
            "Storno 50% per i mesi 4-6"
        ],
        penali: []
    },

    // ═══════════════════ 2GEST ═══════════════════
    "Vodafone": {
        storni: [
            "Storno 100% Fisso BIZ entro 12 mesi dall'attivazione",
            "Storno 100% Mobile BIZ entro 12 mesi dall'attivazione",
            "Storno 100% Digital BIZ entro 12 mesi dall'attivazione",
            "SSD Business: minimo 90%",
            "Metodo contrattualizzazione: Cartaceo o OTP",
            "Compenso ridotto di 1 canone se cliente già Vodafone",
        ],
        penali: [
            { desc: "Disconoscimento/Segnalazione", importo: "200€" },
            { desc: "Denuncia da parte di Autorità Giudiziarie", importo: "500€" },
            { desc: "Provvedimenti Cautelari/Sanzionatori/Giudiziari", importo: "1.000€" },
        ],
    },
    "Fastweb (2G)": {
        storni: [
            "SSD Residenziale: obbligatorio",
            "SSD Business: obbligatorio",
            "Metodo contrattualizzazione RES: OTP",
            "Metodo contrattualizzazione BUS: OTP",
        ],
        penali: [
            { desc: "Disconoscimento/Segnalazione/Numero di altra persona", importo: "200€" },
            { desc: "Denuncia da parte di Autorità Giudiziarie", importo: "500€" },
            { desc: "Provvedimenti Cautelari/Sanzionatori/Giudiziari", importo: "1.000€" },
        ],
    },
    "Wind3 (2G)": {
        storni: [
            "Storno 100% Business entro 9 mesi dall'attivazione",
            "SSD: obbligatorio",
            "Metodo contrattualizzazione: OTP",
        ],
        penali: [
            { desc: "Disconoscimento/Segnalazione/Numero di altra persona", importo: "200€" },
            { desc: "Denuncia da parte di Autorità Giudiziarie", importo: "500€" },
            { desc: "Provvedimenti Cautelari/Sanzionatori/Giudiziari", importo: "1.000€" },
        ],
    },
    "TIM (2G)": {
        storni: [
            "Storno 100% Fisso RES entro 6 mesi dall'attivazione",
            "Storno 100% Fisso BUS entro 10 mesi dall'attivazione",
            "SSD Residenziale: obbligatorio (assenza → compenso ridotto al 50%)",
            "SSD Business: non obbligatorio",
            "Metodo contrattualizzazione RES/BUS: OTP",
        ],
        penali: [
            { desc: "Vendita doppia (cessazione + attivazione linea)", importo: "300€ + storno 100%" },
            { desc: "Disconoscimento/Segnalazione", importo: "200€" },
            { desc: "Denuncia da parte di Autorità Giudiziarie", importo: "500€" },
            { desc: "Provvedimenti Cautelari/Sanzionatori/Giudiziari", importo: "1.000€" },
        ],
    },
    "Enel Energia": {
        storni: [
            "Storno 100% entro 2 mesi dall'attivazione",
            "SSD: non obbligatorio",
            "Metodo contrattualizzazione RES: OTP",
            "Metodo contrattualizzazione BUS: Cartaceo",
        ],
        penali: [
            { desc: "Disconoscimento/Segnalazione/Numero di altra persona", importo: "300€" },
            { desc: "Denuncia da parte di Autorità Giudiziarie", importo: "1.000€" },
            { desc: "Provvedimenti Cautelari/Sanzionatori/Giudiziari", importo: "5.000€" },
        ],
    },
    "Plenitude": {
        storni: [
            "Nessuno storno",
            "Subentro: non remunerato",
            "SSD RES e BUS: obbligatorio (assenza → compenso ridotto al 50%)",
            "Churn 6 mesi: < 20%",
            "Metodo contrattualizzazione RES/BUS: OTP",
        ],
        penali: [
            { desc: "Disconoscimento/Segnalazione/Numero di altra persona", importo: "300€" },
            { desc: "Denuncia da parte di Autorità Giudiziarie", importo: "1.000€" },
            { desc: "Provvedimenti Cautelari/Sanzionatori/Giudiziari", importo: "5.000€" },
        ],
    },
    "Edison (2G)": {
        storni: [
            "Storno 100% entro 3 mesi dall'attivazione",
            "SSD: non obbligatorio (assenza → compenso ridotto al 50%)",
            "Churn 6 mesi: < 20%",
            "Metodo contrattualizzazione RES: OTP",
        ],
        penali: [
            { desc: "Disconoscimento/Segnalazione/Numero di altra persona", importo: "300€" },
            { desc: "Denuncia da parte di Autorità Giudiziarie", importo: "1.000€" },
            { desc: "Provvedimenti Cautelari/Sanzionatori/Giudiziari", importo: "5.000€" },
        ],
    },
    "HERAcomm": {
        storni: [
            "Storno 100% entro 1 mese dall'attivazione",
            "SSD: non obbligatorio (assenza → compenso ridotto al 50%)",
            "Churn 6 mesi: < 20%",
            "Metodo contrattualizzazione RES: OTP",
        ],
        penali: [
            { desc: "Disconoscimento/Segnalazione/Numero di altra persona", importo: "300€" },
            { desc: "Denuncia da parte di Autorità Giudiziarie", importo: "1.000€" },
            { desc: "Provvedimenti Cautelari/Sanzionatori/Giudiziari", importo: "5.000€" },
        ],
    },
    "Argos": {
        storni: [
            "Storno 100% entro 1 mese dall'attivazione",
            "SSD RES: non obbligatorio",
            "SSD BUS: obbligatorio",
            "Churn 6 mesi: < 20%",
            "Metodo contrattualizzazione RES/BUS: OTP",
        ],
        penali: [
            { desc: "Disconoscimento/Segnalazione/Numero di altra persona", importo: "300€" },
            { desc: "Denuncia da parte di Autorità Giudiziarie", importo: "1.000€" },
            { desc: "Provvedimenti Cautelari/Sanzionatori/Giudiziari", importo: "5.000€" },
        ],
    },
    "Luce e Gas": {
        storni: [
            "Storno 100% entro 3 mesi dall'attivazione",
            "SSD: non obbligatorio (assenza → compenso ridotto al 50%)",
            "Churn 6 mesi: < 20%",
            "Zone escluse: Campania, Calabria, Basilicata",
            "Metodo contrattualizzazione RES/BUS: OTP",
        ],
        penali: [
            { desc: "Disconoscimento/Segnalazione/Numero di altra persona", importo: "300€" },
            { desc: "Denuncia da parte di Autorità Giudiziarie", importo: "1.000€" },
            { desc: "Provvedimenti Cautelari/Sanzionatori/Giudiziari", importo: "3.000€" },
        ],
    },
    "Sentra": {
        storni: [
            "Storno 100% entro 3 mesi dall'attivazione",
            "SSD: non obbligatorio (assenza → compenso ridotto al 50%)",
            "Churn 6 mesi: < 20%",
            "Metodo contrattualizzazione RES/BUS: OTP",
        ],
        penali: [
            { desc: "Disconoscimento/Segnalazione/Numero di altra persona", importo: "300€" },
            { desc: "Denuncia da parte di Autorità Giudiziarie", importo: "1.000€" },
            { desc: "Provvedimenti Cautelari/Sanzionatori/Giudiziari", importo: "3.000€" },
        ],
    },
    "Magis Dir.": {
        storni: [
            "Storno 100% per PDP non entrati in fornitura",
            "Storno 50% se cliente resta <6 mesi",
            "Add-on: SDD €15, Paperless/Fatt.dig €5",
            "Canvass mensile: 50-80 PdP €5, 81-120 €10, >120 €15",
            "Ricorrente fisso: €4/PdP/mese dal 13° mese",
            "Trattenute: IVA 22% + Enasarco 1% + Ritenuta 4,60% = 27,60%",
        ],
        penali: [
            { desc: "Comportamento scorretto documentato", importo: "500€" },
            { desc: "Querela/denuncia/esposto", importo: "1.000€" },
        ],
    },
};

// ═══════════════════ CALCOLATORE COMPLETO (da Excel) ═══════════════════
// SuperMoney — Cluster, Gare RID, Canvass, Trattenute
export const SM_CALC = {
    clusters: {
        E1: { label: "E1 — Edison/Eni/Iren Rev", commissione: 20, prodotto: 75, totale: 95 },
        E2: { label: "E2 — Acea/Iren Quick/Fastweb En.", commissione: 20, prodotto: 60, totale: 80 },
        E3: { label: "E3 — Iren PS/Illumia/Wekiwi", commissione: 20, prodotto: 35, totale: 55 },
    },
    sogliaRid: [
        { min: 0, max: 59.99, label: "<60%", valore: 5 },
        { min: 60, max: 64.99, label: "60-65%", valore: 20 },
        { min: 65, max: 69.99, label: "65-70%", valore: 30 },
        { min: 70, max: 100, label: ">70%", valore: 35 },
    ],
    canvassEntry: [
        { min: 0, max: 250, label: "0-250 ctr", euroCtr: 5 },
        { min: 251, max: 350, label: "251-350 ctr", euroCtr: 14 },
        { min: 351, max: 500, label: "351-500 ctr", euroCtr: 18 },
    ],
    canvassGold: [
        { soglia: 500, label: ">500 ctr", euroCtr: 10 },
        { soglia: 1000, label: ">1.000 ctr", euroCtr: 20 },
        { soglia: 1500, label: ">1.500 ctr", euroCtr: 30 },
    ],
    trattenute: { enasarco: 0.01, ritenuta: 0.046, totale: 0.056 },
};

// AGN Energia — Tabella compensi e formule
export const AGN_CALC = {
    domestici: [
        { tipo: "Standard", gettone: 40, rinnovo: 36 },
        { tipo: "Silver", gettone: 80, rinnovo: 72 },
        { tipo: "Gold", gettone: 100, rinnovo: 90 },
    ],
    condomini: [
        { tipo: "Standard", gettone: 100, rinnovo: 50, ricorrenteEur: 5 },
        { tipo: "Gold", gettone: 200, rinnovo: 175, ricorrenteEur: 5 },
        { tipo: "Platinum", gettone: 350, rinnovo: 200, ricorrenteEur: 5 },
        { tipo: "Diamond", gettone: 400, rinnovo: 300, ricorrenteEur: 5 },
    ],
    business: [
        { tipo: "Business", gettone: 120, rinnovo: 60, ricorrenteEur: 2, note: "vincolato a FV" },
        { tipo: "Business SA", gettone: 240, rinnovo: 180, ricorrenteEur: 2, note: "senza vincolo" },
    ],
    trattenute: { enasarco: 0.01, ritenuta: 0.046, totale: 0.056 },
};

// Magis Energia — Tabella compensi e formule
export const MAGIS_CALC = {
    domestico: [
        { tipo: "A", gettone: 90, ricorrenteEE: 0.010, ricorrenteGas: 0.050 },
        { tipo: "M", gettone: 60, ricorrenteEE: 0.010, ricorrenteGas: 0.050 },
        { tipo: "B", gettone: 40, ricorrenteEE: 0.003, ricorrenteGas: 0.050 },
    ],
    altriUsi: [
        { tipo: "A", gettone: 150, ricorrenteEE: 0.0040 },
        { tipo: "M", gettone: 120, ricorrenteEE: 0.0030 },
        { tipo: "B", gettone: 90, ricorrenteEE: 0.0020 },
        { tipo: "L", gettone: 50, ricorrenteEE: 0.0015 },
    ],
    addons: { sdd: 15, paperless: 5 },
    canvassMensile: [
        { min: 50, max: 80, label: "50-80 PdP", euroPdp: 5 },
        { min: 81, max: 120, label: "81-120 PdP", euroPdp: 10 },
        { min: 121, max: 9999, label: ">120 PdP", euroPdp: 15 },
    ],
    ricorrenteFisso: { dal13mese: 4 }, // €/PdP/mese
    stornoRegola: "50% se cliente resta <6 mesi",
    trattenute: { iva: 0.22, enasarco: 0.01, ritenuta: 0.046, totale: 0.276 },
};
