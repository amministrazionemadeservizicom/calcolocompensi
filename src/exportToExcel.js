import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Export compensation data to an Excel workbook.
 * Generates a sheet for each discount percentage from -15% to -70%.
 * Each sheet contains the original fields plus a calculated discounted compensation.
 */
export function exportToExcel(data, selectedDiscount = 0) {
    // Define discount levels (negative percentages)
    const discounts = [-15, -20, -25, -30, -35, -40, -45, -50, -55, -60, -65, -70];

    const wb = XLSX.utils.book_new();

    discounts.forEach(d => {
        const sheetData = data.map(row => {
            // Calculate discounted compensation based on the "massimo" field (total max)
            const discounted = row.massimo * (1 + d / 100);
            // Determine gestore type: AGN rows are considered "Diretto"
            const gestoreTipo = row.provider && (row.provider.includes('AGN') || row.provider === 'Alperia') ? 'Diretto' : row.provider;
            return {
                ID_Gestore: row.provider, // placeholder, user can map IDs later
                Fornitore: row.fornitore,
                Gestore: row.provider,
                TipoGestore: gestoreTipo,
                Prodotto: row.product,
                Tipo: row.tipo,
                Gettone: row.gettone,
                RID: row.rid,
                BolWeb: row.bolweb,
                Consenso: row.consenso,
                Massimo: row.massimo,
                Discount: `${d}%`,
                Compensazione_Scontata: discounted
            };
        });
        const ws = XLSX.utils.json_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(wb, ws, `${d}%`);
    });

    // Also add a sheet with the currently selected discount for convenience
    if (selectedDiscount !== 0) {
        const d = selectedDiscount;
        const sheetData = data.map(row => {
            const discounted = row.massimo * (1 + d / 100);
            return {
                ID_Gestore: row.provider,
                Fornitore: row.fornitore,
                Gestore: row.provider,
                Prodotto: row.product,
                Tipo: row.tipo,
                Gettone: row.gettone,
                RID: row.rid,
                BolWeb: row.bolweb,
                Consenso: row.consenso,
                Massimo: row.massimo,
                Discount: `${d}%`,
                Compensazione_Scontata: discounted
            };
        });
        const ws = XLSX.utils.json_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(wb, ws, `Selezionato_${d}%`);
    }

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'compensi_scontati.xlsx');
}
