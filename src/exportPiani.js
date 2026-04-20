import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { GESTORE_IDS } from './data.js';
import { CSV_COMPENSI } from './csvCompensazioni.js';

// ── 16 piani con ratio vs FEDERAZIENDE (calcolati dal CSV aprile 2026) ──
export const PLANS = [
    { name: 'AFF FEDER',          ratio: 0.700 },
    { name: 'FEDERAZIENDE',       ratio: 1.000 },
    { name: 'PIANO CONSULENTE J', ratio: 0.708 },
    { name: 'PIANO EKO',          ratio: 0.749 },
    { name: 'PIANO TAFURO',       ratio: 1.155 },
    { name: 'PIANO MASTER',       ratio: 1.089 },
    { name: 'PIANO GENTILE',      ratio: 1.134 },
    { name: 'PIANO BLASI',        ratio: 1.199 },
    { name: 'PIANO CONSULENTE',   ratio: 0.770 },
    { name: 'PIANO CONS GENT',    ratio: 0.909 },
    { name: 'PIANO CONSULENTE C', ratio: 0.937 },
    { name: 'ALMAVIRIA',          ratio: 1.103 },
    { name: 'ALMAVIRIA A',        ratio: 1.084 },
    { name: 'ALMAVIRIA B',        ratio: 1.084 },
    { name: 'PIANO CAPITAL',      ratio: 0.662 },
    { name: 'ILGRECO',            ratio: 1.101 },
    { name: '10 CONS',            ratio: 0.848 },
    { name: 'PIANO CASSANO',      ratio: 0.800 },
];

export const PLAN_NAMES = PLANS.map(p => p.name);

// AFF FEDER = gettone × 0.5  →  FEDER = gettone × 0.5/0.700  →  Piano = FEDER × ratio
const FEDER_FACTOR = 0.5 / 0.700;

// Noleggio: PIANO BLASI (massimo) = gettone × 0.60  →  FEDER = gettone × 0.60/BLASI_RATIO
// Wind Tre: fasce per gettone — <100: -30%, 100-600: -40%, >600: -50%
// Garantisce: AFF FEDER = FEDER × 0.700 (-30%), CONS GENT = GENTILE × 0.80 (-20%)
const BLASI_RATIO = PLANS.find(p => p.name === 'PIANO BLASI').ratio; // 1.199
const NOLEGGIO_FEDER_FACTOR = 0.60 / BLASI_RATIO;
const NOLEGGIO_IDS = new Set([49, 50, 73]);

function windtreFederFactor(gettone) {
    if (gettone > 600) return 0.50 / BLASI_RATIO;
    if (gettone >= 100) return 0.60 / BLASI_RATIO;
    return 0.70 / BLASI_RATIO;
}

const r10 = (v) => Math.floor(v / 10) * 10;  // base: arrotonda per difetto alla decina
const r1  = (v) => Math.floor(v);             // RID: arrotonda per difetto all'intero

// ── Lookup compenso dal CSV; fallback a formula ──
const rnd10 = (v) => Math.round(v / 10) * 10;
const rnd5  = (v) => Math.round(v / 5)  * 5;

export function getCompForPlan(row, planName, planRatio) {
    // Piani con formula fissa: ignorano sempre compOverride
    // PIANO BLASI = gettone -20%
    if (planName === 'PIANO BLASI') {
        return {
            base: rnd10((row.gettone || 0) * 0.80),
            rid:  rnd5((row.rid  || 0) * 0.80),
        };
    }

    // Override per-prodotto: ha priorità su tutto il resto
    if (row.compOverride?.[planName]) {
        return row.compOverride[planName];
    }

    // AFF FEDER = sempre esattamente FEDERAZIENDE × 0.70, arrotondato a decina/5
    if (planName === 'AFF FEDER') {
        const feder = getCompForPlan(row, 'FEDERAZIENDE', 1.000);
        return {
            base: rnd10(feder.base * 0.70),
            rid:  rnd5(feder.rid  * 0.70),
        };
    }

    // ALMAVIRIA A = gettone × 0.68
    if (planName === 'ALMAVIRIA A') {
        return {
            base: rnd10((row.gettone || 0) * 0.68),
            rid:  rnd5((row.rid  || 0) * 0.68),
        };
    }

    // PIANO CASSANO = gettone -30%
    if (planName === 'PIANO CASSANO') {
        return {
            base: rnd10((row.gettone || 0) * 0.70),
            rid:  rnd5((row.rid  || 0) * 0.70),
        };
    }

    // ILGRECO = gettone -10%
    if (planName === 'ILGRECO') {
        return {
            base: rnd10((row.gettone || 0) * 0.90),
            rid:  rnd5((row.rid  || 0) * 0.90),
        };
    }

    // ALMAVIRIA e ALMAVIRIA B = gettone -15% poi -10% = × 0.765
    if (planName === 'ALMAVIRIA' || planName === 'ALMAVIRIA B') {
        return {
            base: rnd10((row.gettone || 0) * 0.765),
            rid:  rnd5((row.rid  || 0) * 0.765),
        };
    }

    const id   = row.gestoreId ?? GESTORE_IDS[row.fornitore] ?? GESTORE_IDS[row.provider] ?? '';
    const nome = (id && GESTORE_NOME_SISTEMA[id]) ?? row.provider ?? '';

    // Noleggio (49=NAL, 50=Stampanti, 73=Tech): formula dedicata, bypass CSV
    if (NOLEGGIO_IDS.has(id)) {
        return {
            base: r10(row.gettone * NOLEGGIO_FEDER_FACTOR * planRatio),
            rid:  Math.floor((row.rid * NOLEGGIO_FEDER_FACTOR * planRatio) / 5) * 5,
        };
    }

    // Wind Tre (32): fasce gettone <100→-30%, 100-600→-40%, >600→-50%
    if (id === 32) {
        const factor = windtreFederFactor(row.gettone);
        return {
            base: r10(row.gettone * factor * planRatio),
            rid:  Math.floor((row.rid * factor * planRatio) / 5) * 5,
        };
    }

    let csvEntry = null;
    if (row.csvKey) {
        csvEntry = CSV_COMPENSI[row.csvKey]?.[planName];
    } else {
        const key = `${nome}|${row.product}`;
        csvEntry = CSV_COMPENSI[key]?.[planName];
    }

    let result;
    if (csvEntry) {
        // Lion (id=60): importi contrattuali precisi, non arrotondare alla decina
        const base = id === 60 ? Math.floor(csvEntry.base) : r10(csvEntry.base);
        result = { base, rid: Math.floor(csvEntry.rid / 5) * 5 };
    } else {
        result = {
            base: r10(row.gettone * FEDER_FACTOR * planRatio),
            rid:  Math.floor((row.rid * FEDER_FACTOR * planRatio) / 5) * 5,
        };
    }

    // FEDERAZIENDE: arrotonda base a decina più vicina, rid a multiplo di 5 più vicino
    if (planName === 'FEDERAZIENDE') {
        return { base: rnd10(result.base), rid: rnd5(result.rid) };
    }
    return result;
}

// ── Nomi canonici di sistema per ID gestore ──
export const GESTORE_NOME_SISTEMA = {
    3:  "Tim",
    5:  "Edison Energia",
    6:  "A2A Energia",
    7:  "Iren Mercato Libero",
    16: "Estra Energie",
    31: "Vodafone",
    32: "Wind Tre",
    34: "Fastweb",
    48: "PLENITUDE FIBRA",
    49: "Noleggio A Lungo Termine",
    50: "Noleggio Stampanti",
    58: "Acea Comparatore",
    59: "PLENITUDE COMPARATORE",
    65: "Magis Energia",
    66: "AGN ENERGIA",
    69: "Iren Comparatore",
    70: "Hera Est Energy Comparatore",
    71: "Illumia Comparatore",
    72: "Fastweb Energia Comparatore",
    73: "Noleggio Tech",
    60: "Lion",
    76: "Semplicom",
    77: "Edison Teleselling",
    78: "Vodafone Comparatore",
    33: "Sky",
    79: "Sky",
};

// ── Recupera nome gestore ufficiale e ID dal row ──
function getGestoreInfo(row) {
    const id = row.gestoreId ?? GESTORE_IDS[row.fornitore] ?? GESTORE_IDS[row.provider] ?? '';
    const nome = row.gestoreNome ?? (id && GESTORE_NOME_SISTEMA[id]) ?? row.provider;
    return { id, nome };
}

// ── Tipo Prodotto per il sistema (valori validi: Energia Elettrica | Gas | Telefonia | Altro) ──
function getTipoProdotto(row, tipoOverride) {
    if (tipoOverride) return tipoOverride;
    if (row.cat === 'TELECOM') return 'Telefonia';
    if (row.cat === 'DEVICE') return 'Altro';
    if (row.cat === 'ALTRO')  return 'Altro';
    const t = row.tipo || '';
    if (t === 'Gas') return 'Gas';
    return 'Energia Elettrica';
}

// ── Tipo Cliente ──
function getTipoCliente(row) {
    if (row.segment === 'RES') return 'Privato';
    if (row.segment === 'COND') return 'Condominio';
    return 'Business';
}

/**
 * Genera Excel identico al formato piano_aff_feder_2026-04-18.xlsx
 *
 * Colonne:
 *   Nome Piano | Data Inizio | Data Fine | Stato
 *   Nome Gestore | ID Gestore | Tipo Prodotto | Tipo Cliente | Prodotto
 *   Importo | DescImp2 | Importo2 | DescImp3 | Importo3 | DescImp4 | Importo4 | DescImp5 | Importo5
 *
 * @param {Array}       data           - DATA array da data.js
 * @param {string|null} selectedPlan   - null = tutti i piani (16 fogli), stringa = piano singolo
 */
export function exportPiani(data, selectedPlan = null) {
    const wb = XLSX.utils.book_new();

    // selectedPlan può essere: null (tutti), stringa (nome piano), oppure oggetto {name, ratio}
    const plansToExport = selectedPlan == null
        ? PLANS
        : typeof selectedPlan === 'object'
            ? [selectedPlan]
            : PLANS.filter(p => p.name === selectedPlan);

    plansToExport.forEach(plan => {
        const LION_EXCLUDED = new Set(['FEDERAZIENDE', 'AFF FEDER']);
        const sheetData = data.flatMap(row => {
            const { id, nome } = getGestoreInfo(row);

            // Lion non è convenzionato con FEDERAZIENDE e AFF FEDER
            if (id === 60 && LION_EXCLUDED.has(plan.name)) return [];

            const { base: importo, rid: importo2 } = getCompForPlan(row, plan.name, plan.ratio);

            const makeRow = (tipoProdotto = getTipoProdotto(row)) => ({
                'Nome Piano':    plan.name,
                'Data Inizio':   '01/01/2026',
                'Data Fine':     '31/12/2026',
                'Stato':         1,
                'Nome Gestore':  nome,
                'ID Gestore':    id,
                'Tipo Prodotto': tipoProdotto,
                'Tipo Cliente':  getTipoCliente(row),
                'Prodotto':      (row.fornitore === 'Noleggio Tech' && row.cat === 'DEVICE')
                    ? `${row.product} – ${row.periodo || '24/36 mesi'}`
                    : row.product,
                'Importo':       importo,
                'DescImp2':      'RID',
                'Importo2':      importo2 || 0,
                'DescImp3':      null,
                'Importo3':      null,
                'DescImp4':      null,
                'Importo4':      null,
                'DescImp5':      null,
                'Importo5':      null,
            });

            // Prodotti con tipo che include sia Luce che Gas → due righe separate
            if (row.tipo && row.tipo.includes('Luce') && row.tipo.includes('Gas')) {
                return [makeRow('Energia Elettrica'), makeRow('Gas')];
            }
            return [makeRow()];
        });

        const ws = XLSX.utils.json_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(wb, ws, plan.name.substring(0, 31));
    });

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob  = new Blob([wbout], { type: 'application/octet-stream' });
    const today = new Date().toISOString().slice(0, 10);

    if (selectedPlan == null) {
        saveAs(blob, `tutti_piani_${today}.xlsx`);
    } else {
        const planName = typeof selectedPlan === 'object' ? selectedPlan.name : selectedPlan;
        const safeName = planName.toLowerCase().replace(/[^a-z0-9]/g, '_');
        saveAs(blob, `piano_${safeName}_${today}.xlsx`);
    }
}



/**
 * Genera CSV compensi con i valori reali calcolati da getCompForPlan (stessi valori del UI).
 */
export function exportCompensazioni(data) {
    const today = new Date().toISOString().slice(0, 10);

    const fmtNum = (v) => {
        const n = Math.round(v * 100) / 100;
        return String(n);
    };

    // Intestazione
    const headerCols = ['TipoProdotto', 'Gestore', 'Prodotto'];
    for (const plan of PLANS) {
        headerCols.push(`${plan.name}_Base`);
        headerCols.push(`${plan.name}_RID`);
        headerCols.push(`${plan.name}_Ricorrente`);
    }

    const csvRows = [headerCols.join(';')];

    // ── Tutti i prodotti di data.js ──
    data.forEach(row => {
        const { nome } = getGestoreInfo(row);
        const tipoCliente = getTipoCliente(row);

        const productName = (row.fornitore === 'Noleggio Tech' && row.cat === 'DEVICE')
            ? `${row.product} – ${row.periodo || '24/36 mesi'}`
            : row.product;

        const makeRow = (tipoProdotto) => {
            const cols = [tipoProdotto, nome, `${tipoCliente} – ${productName}`];
            for (const plan of PLANS) {
                const { base, rid } = getCompForPlan(row, plan.name, plan.ratio);
                cols.push(fmtNum(base));
                cols.push(fmtNum(rid));
                cols.push('');
            }
            return cols.join(';');
        };

        // Solo prodotti combinati Luce/Gas generano due righe separate
        if (row.tipo && row.tipo.includes('Luce') && row.tipo.includes('Gas')) {
            csvRows.push(makeRow('Energia Elettrica'));
            csvRows.push(makeRow('Gas'));
        } else {
            csvRows.push(makeRow(getTipoProdotto(row)));
        }
    });

    const bom = '\uFEFF';
    const blob = new Blob([bom + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `compensi_${today}.csv`);
}
