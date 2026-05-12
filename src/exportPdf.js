import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { PLANS, getCompForPlan, GESTORE_NOME_SISTEMA } from './exportPiani.js';
import { GESTORE_IDS } from './data.js';

const YELLOW    = [245, 196, 0];
const PINK      = [233, 30, 140];
const GRAY      = [85, 85, 85];
const LIGHTGRAY = [248, 248, 248];
const ROW_YELLOW = [255, 251, 220];
const ROW_PINK   = [255, 232, 245];
const LINEGRAY  = [220, 220, 220];
const WHITE     = [255, 255, 255];
const BLACK     = [30, 30, 30];

function segLabel(seg) {
    if (seg === 'RES') return 'Privato';
    if (seg === 'BIZ') return 'Business';
    return seg || '';
}

function tipoLabel(row) {
    if (row.cat === 'TELECOM') return 'Telefonia';
    if (row.tipo === 'Luce') return 'Energia Elettrica';
    if (row.tipo === 'Gas') return 'Gas';
    return row.tipo || row.cat || '';
}

function productLabel(row) {
    if (row.fornitore === 'Noleggio Tech' && row.cat === 'DEVICE' && row.periodo) {
        return `${row.product} – ${row.periodo}`;
    }
    return row.product;
}

async function loadLogo() {
    try {
        const resp = await fetch('/logo-semplicom.png');
        const blob = await resp.blob();
        const dataUrl = await new Promise(res => {
            const reader = new FileReader();
            reader.onload = () => res(reader.result);
            reader.readAsDataURL(blob);
        });
        // Ottieni dimensioni reali per mantenere proporzioni
        const { w, h } = await new Promise(res => {
            const img = new Image();
            img.onload = () => res({ w: img.naturalWidth, h: img.naturalHeight });
            img.src = dataUrl;
        });
        return { dataUrl, ratio: w / h };
    } catch (_) { return null; }
}

function drawPageHeader(doc, logoDataUrl, planName, gestoreName, pageW) {
    // Sfondo bianco
    doc.setFillColor(...WHITE);
    doc.rect(0, 0, pageW, 38, 'F');

    // Linea gialla sinistra decorativa
    doc.setFillColor(...YELLOW);
    doc.rect(0, 0, 4, 38, 'F');

    // Logo con proporzioni corrette (altezza fissa 18mm)
    if (logoDataUrl) {
        const logoH = 18;
        const logoW = logoH * logoDataUrl.ratio;
        doc.addImage(logoDataUrl.dataUrl, 'PNG', 10, 10, logoW, logoH);
    }

    // Piano name (piccolo, sopra)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...PINK);
    doc.text(`PIANO COMPENSI · ${planName}`, pageW / 2, 11, { align: 'center' });

    // Gestore name (grande, centrato)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...BLACK);
    doc.text(gestoreName, pageW / 2, 24, { align: 'center' });

    // Data (destra)
    const today = new Date().toLocaleDateString('it-IT');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...GRAY);
    doc.text(today, pageW - 10, 11, { align: 'right' });

    // Linea separatrice
    doc.setDrawColor(...LINEGRAY);
    doc.setLineWidth(0.3);
    doc.line(10, 36, pageW - 10, 36);
}

function drawPageFooter(doc, pageNum, totalPages, pageW, pageH) {
    doc.setDrawColor(...LINEGRAY);
    doc.setLineWidth(0.3);
    doc.line(10, pageH - 10, pageW - 10, pageH - 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...GRAY);
    doc.text('SempliCom · Documento riservato · uso interno', 10, pageH - 5);
    doc.text(`${pageNum} / ${totalPages}`, pageW - 10, pageH - 5, { align: 'right' });

    // Puntino fucsia decorativo
    doc.setFillColor(...PINK);
    doc.circle(pageW / 2, pageH - 5.5, 0.8, 'F');
}

function getStornoText(gestoreName, info) {
    const name = gestoreName.toLowerCase();
    const { cat, fornitore } = info || {};

    // Telefonia: 12 mesi (Fastweb e Sky: 6 mesi)
    if (cat === 'TELECOM') {
        if (name.includes('fastweb') || name.includes('sky')) return '6 mesi';
        return '12 mesi';
    }
    // Iren diretto (non comparatore): 6 mesi (3 al 100% + 3 al 50%)
    if (name.includes('iren') && !name.includes('comparatore')) {
        return '6 mesi (3 mesi al 100% + 3 mesi al 50%)';
    }
    // Magis: 6 mesi
    if (name.includes('magis')) return '6 mesi';
    // SuperMoney: 3 mesi
    if (fornitore === 'SuperMoney') return '3 mesi';
    // Default: 4 mesi
    return '4 mesi';
}

function drawRulesBox(doc, y, pageW, stornoText) {
    const boxX = 10;
    const boxW = pageW - 20;
    const boxH = 22;
    if (y + boxH > doc.internal.pageSize.getHeight() - 14) return; // non c'è spazio

    // Sfondo box
    doc.setFillColor(255, 248, 230);
    doc.roundedRect(boxX, y, boxW, boxH, 2, 2, 'F');
    doc.setDrawColor(...YELLOW);
    doc.setLineWidth(0.5);
    doc.roundedRect(boxX, y, boxW, boxH, 2, 2, 'S');

    // Titolo
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...GRAY);
    doc.text('REGOLE CONTRATTUALI', boxX + 4, y + 5.5);

    // Storno
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 30, 30);
    doc.text('Storno:', boxX + 4, y + 11.5);
    doc.setFont('helvetica', 'normal');
    doc.text(stornoText, boxX + 22, y + 11.5);

    // Penale
    doc.setFont('helvetica', 'bold');
    doc.text('Penale contratto falso / intestatario deceduto:', boxX + 4, y + 18);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...PINK);
    doc.text('€ 500 – € 10.000', boxX + 95, y + 18);
}

export async function exportPianoPdf(data, planName) {
    const plan = PLANS.find(p => p.name === planName);
    if (!plan) return;

    const logoDataUrl = await loadLogo();
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const today = new Date().toISOString().slice(0, 10);

    // ── Prepara righe per gestore ──
    const byGestore  = new Map();
    const gestoreInfo = new Map(); // gestoreName -> { fornitore, cat, provider }

    data.forEach(row => {
        const id = row.gestoreId ?? GESTORE_IDS[row.fornitore] ?? GESTORE_IDS[row.provider] ?? '';
        const gestore = row.gestoreNome ?? (id && GESTORE_NOME_SISTEMA[id]) ?? row.provider ?? '';

        if (!gestoreInfo.has(gestore)) {
            gestoreInfo.set(gestore, { fornitore: row.fornitore, cat: row.cat, provider: row.provider });
        }

        // Noleggio Tech: espandi per periodo
        const periodi = (row.fornitore === 'Noleggio Tech' && row.cat === 'DEVICE')
            ? (row.periodi ?? ['24 mesi', '36 mesi'])
            : [null];

        periodi.forEach(periodo => {
            const r = periodo ? { ...row, periodo } : row;
            const { base, rid } = getCompForPlan(r, planName, plan.ratio);

            const tipi = (row.tipo && row.tipo.includes('Luce') && row.tipo.includes('Gas'))
                ? ['Energia Elettrica', 'Gas']
                : [tipoLabel(row)];

            tipi.forEach(tipo => {
                if (!byGestore.has(gestore)) byGestore.set(gestore, []);
                byGestore.get(gestore).push({
                    prodotto: productLabel(r),
                    segmento: segLabel(row.segment),
                    tipo,
                    base,
                    rid,
                    massimo: base + rid,
                });
            });
        });
    });

    // Ordina gestori alfabeticamente
    const gestori = [...byGestore.keys()].sort((a, b) => a.localeCompare(b));

    let isFirstPage = true;
    gestori.forEach(gestoreName => {
        if (!isFirstPage) doc.addPage();
        isFirstPage = false;

        drawPageHeader(doc, logoDataUrl, planName, gestoreName, pageW);

        const rows = byGestore.get(gestoreName);

        autoTable(doc, {
            startY: 40,
            margin: { top: 40, left: 10, right: 10, bottom: 16 },
            head: [['Prodotto', 'Segmento', 'Tipo', 'Base (€)', 'RID (€)', 'Massimo (€)']],
            body: rows.map(r => [
                r.prodotto,
                r.segmento,
                r.tipo,
                r.base   > 0 ? `€ ${r.base}`    : '—',
                r.rid    > 0 ? `€ ${r.rid}`      : '—',
                r.massimo > 0 ? `€ ${r.massimo}` : '—',
            ]),
            headStyles: {
                fillColor: GRAY,
                textColor: WHITE,
                fontStyle: 'bold',
                fontSize: 8.5,
                cellPadding: 4,
            },
            columnStyles: {
                0: { cellWidth: 'auto', fontStyle: 'bold' },
                1: { cellWidth: 28, halign: 'center' },
                2: { cellWidth: 36, halign: 'center' },
                3: { cellWidth: 28, halign: 'right', fontStyle: 'bold', textColor: [0, 130, 60] },
                4: { cellWidth: 24, halign: 'right', textColor: PINK },
                5: { cellWidth: 30, halign: 'right', fontStyle: 'bold', textColor: BLACK },
            },
            alternateRowStyles: { fillColor: LIGHTGRAY },
            bodyStyles: { fontSize: 8.5, cellPadding: 3.5, textColor: BLACK, fillColor: WHITE },
            didParseCell: (hookData) => {
                // Accento giallo sul bordo sinistro prima colonna header
                if (hookData.section === 'head' && hookData.column.index === 0) {
                    hookData.cell.styles.fillColor = YELLOW;
                    hookData.cell.styles.textColor = GRAY;
                }
            },
            didDrawPage: (hookData) => {
                const pn = doc.internal.getCurrentPageInfo().pageNumber;
                const tot = doc.internal.getNumberOfPages();
                // Header su ogni pagina (anche continuazione tabella)
                if (hookData.pageNumber > 1) {
                    drawPageHeader(doc, logoDataUrl, planName, gestoreName, pageW);
                }
                drawPageFooter(doc, pn, tot, pageW, pageH);
            },
            showHead: 'everyPage',
        });

        // Box regole sotto la tabella
        const finalY = doc.lastAutoTable.finalY + 4;
        const info = gestoreInfo.get(gestoreName);
        drawRulesBox(doc, finalY, pageW, getStornoText(gestoreName, info));
    });

    // Fix footer su tutte le pagine
    const total = doc.internal.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
        doc.setPage(i);
        drawPageFooter(doc, i, total, pageW, pageH);
    }

    const safeName = planName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    saveAs(
        new Blob([doc.output('arraybuffer')], { type: 'application/pdf' }),
        `piano_${safeName}_${today}.pdf`
    );
}
