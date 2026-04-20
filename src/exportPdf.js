import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { PLANS, getCompForPlan, GESTORE_NOME_SISTEMA } from './exportPiani.js';
import { GESTORE_IDS } from './data.js';

// Colori SempliCom
const YELLOW   = [245, 196, 0];    // #F5C400
const PINK     = [233, 30, 140];   // #E91E8C
const DARKGRAY = [85, 85, 85];     // #555555
const LIGHTGRAY= [245, 245, 245];
const WHITE    = [255, 255, 255];

function getCategoryColor(cat) {
    if (cat === 'ENERGIA') return [255, 193, 7];
    if (cat === 'TELECOM')  return [233, 30, 140];
    if (cat === 'DEVICE')   return [100, 100, 200];
    return [150, 150, 150];
}

function segLabel(seg) {
    if (seg === 'RES') return 'Privato';
    if (seg === 'BIZ') return 'Business';
    return seg || '';
}

function tipoLabel(row) {
    if (row.cat === 'TELECOM') return 'Telefonia';
    if (row.tipo === 'Luce') return 'Energia Elettrica';
    if (row.tipo === 'Gas') return 'Gas';
    if (row.tipo === 'Luce/Gas') return 'Luce + Gas';
    return row.tipo || row.cat || '';
}

export async function exportPianoPdf(data, planName) {
    const plan = PLANS.find(p => p.name === planName);
    if (!plan) return;

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();

    // ── Carica logo ──
    let logoDataUrl = null;
    try {
        const resp = await fetch('/logo-semplicom.png');
        const blob = await resp.blob();
        logoDataUrl = await new Promise(res => {
            const reader = new FileReader();
            reader.onload = () => res(reader.result);
            reader.readAsDataURL(blob);
        });
    } catch (_) { /* logo non disponibile */ }

    // ── Header ──
    const drawHeader = () => {
        // Barra superiore gialla
        doc.setFillColor(...YELLOW);
        doc.rect(0, 0, pageW, 22, 'F');

        // Logo
        if (logoDataUrl) {
            doc.addImage(logoDataUrl, 'PNG', 8, 2, 55, 18);
        }

        // Nome piano
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(...WHITE);
        doc.text(planName, pageW / 2, 13, { align: 'center' });

        // Data
        const today = new Date().toLocaleDateString('it-IT');
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(`Piano compensi — ${today}`, pageW - 8, 13, { align: 'right' });

        // Riga fucsia sotto header
        doc.setFillColor(...PINK);
        doc.rect(0, 22, pageW, 2, 'F');
    };

    // ── Footer ──
    const drawFooter = (pageNum, totalPages) => {
        doc.setFillColor(...DARKGRAY);
        doc.rect(0, pageH - 8, pageW, 8, 'F');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(...WHITE);
        doc.text('SempliCom — Documento riservato', 8, pageH - 3);
        doc.text(`Pagina ${pageNum} di ${totalPages}`, pageW - 8, pageH - 3, { align: 'right' });
    };

    // ── Prepara righe tabella ──
    const rows = [];
    data.forEach(row => {
        const id = row.gestoreId ?? GESTORE_IDS[row.fornitore] ?? GESTORE_IDS[row.provider] ?? '';
        const gestore = row.gestoreNome ?? (id && GESTORE_NOME_SISTEMA[id]) ?? row.provider ?? '';
        const { base, rid } = getCompForPlan(row, planName, plan.ratio);

        const tipi = (row.tipo && row.tipo.includes('Luce') && row.tipo.includes('Gas'))
            ? ['Energia Elettrica', 'Gas']
            : [tipoLabel(row)];

        tipi.forEach(tipo => {
            rows.push({
                gestore,
                prodotto: row.product,
                segmento: segLabel(row.segment),
                tipo,
                base,
                rid,
                massimo: base + rid,
                cat: row.cat,
            });
        });
    });

    // Ordina per gestore poi prodotto
    rows.sort((a, b) => a.gestore.localeCompare(b.gestore) || a.prodotto.localeCompare(b.prodotto));

    // ── Genera tabella ──
    drawHeader();

    autoTable(doc, {
        startY: 27,
        margin: { left: 6, right: 6, bottom: 12 },
        head: [[
            'Gestore', 'Prodotto', 'Segmento', 'Tipo', 'Base (€)', 'RID (€)', 'Massimo (€)'
        ]],
        body: rows.map(r => [
            r.gestore,
            r.prodotto,
            r.segmento,
            r.tipo,
            r.base > 0 ? `€ ${r.base}` : '—',
            r.rid  > 0 ? `€ ${r.rid}`  : '—',
            r.massimo > 0 ? `€ ${r.massimo}` : '—',
        ]),
        headStyles: {
            fillColor: DARKGRAY,
            textColor: WHITE,
            fontStyle: 'bold',
            fontSize: 8,
            halign: 'center',
        },
        columnStyles: {
            0: { cellWidth: 42, fontStyle: 'bold' },
            1: { cellWidth: 60 },
            2: { cellWidth: 22, halign: 'center' },
            3: { cellWidth: 32, halign: 'center' },
            4: { cellWidth: 28, halign: 'right', fontStyle: 'bold', textColor: [0, 120, 0] },
            5: { cellWidth: 24, halign: 'right', textColor: PINK },
            6: { cellWidth: 30, halign: 'right', fontStyle: 'bold' },
        },
        alternateRowStyles: { fillColor: LIGHTGRAY },
        rowStyles: { fontSize: 8, cellPadding: 2.5 },
        didParseCell: (data) => {
            // Colora riga in base alla categoria
            if (data.section === 'body') {
                const r = rows[data.row.index];
                if (!r) return;
                if (data.column.index === 0) {
                    const color = getCategoryColor(r.cat);
                    data.cell.styles.fillColor = color;
                    data.cell.styles.textColor = WHITE;
                }
            }
        },
        didDrawPage: (hookData) => {
            const pageNum  = doc.internal.getCurrentPageInfo().pageNumber;
            const totalPages = doc.internal.getNumberOfPages();
            if (hookData.pageNumber > 1) drawHeader();
            drawFooter(pageNum, totalPages);
        },
        showHead: 'everyPage',
    });

    // Fix footer su ultima pagina
    const total = doc.internal.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
        doc.setPage(i);
        drawFooter(i, total);
    }

    const today = new Date().toISOString().slice(0, 10);
    const safeName = planName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const pdfBytes = doc.output('arraybuffer');
    saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `piano_${safeName}_${today}.pdf`);
}
