/**
 * Konfigurasi Integrasi Eksternal SiBELA
 *
 * Panduan lengkap cara mendapatkan URL & Entry ID Google Form / Apps Script
 * tersedia di: docs/setup-google-sheets.md
 */

export const SHEETS_CONFIG = {
  /**
   * Metode pengiriman rekap ke Google Sheets:
   * - 'google-form' : Hidden <form> + <iframe> submit (direkomendasikan, bebas CORS)
   * - 'apps-script' : Webhook POST fetch() ke Google Apps Script Web App
   */
  METHOD: 'apps-script', // <-- UBAH BAGIAN INI

  /**
   * Opsi A (Direkomendasikan): Action URL Google Form (.../formResponse)
   * Ganti placeholder di bawah dengan URL formResponse milik guru/sekolah.
   */
  GOOGLE_FORM_ACTION: 'https://docs.google.com/forms/d/e/1FAIpQLSe_CONTOH_FORM_ID_GANTI/formResponse',

  /**
   * Pemetaan field payload SiBELA -> name="entry.xxxxxxx" pada Google Form.
   */
  GOOGLE_FORM_ENTRIES: {
    nama: 'entry.1000001',
    skor: 'entry.1000002',
    studiKasus: 'entry.1000003',
    mindMap: 'entry.1000004',
    organisasiPeta: 'entry.1000005',
    timestamp: 'entry.1000006'
  },

  /**
   * Opsi B: URL Web App Google Apps Script (digunakan jika METHOD === 'apps-script').
   */
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzUC37MHEd0jQipY-aiJsQ_YOdgANYs81NTF2cEsQFmZZ5SK2JdeGfh1pTGyMfPTIorNA/exec', // <-- UBAH BAGIAN INI

  /**
   * Batas waktu tunggu pengiriman (milidetik) sebelum dianggap gagal/timeout.
   */
  SUBMIT_TIMEOUT_MS: 10000
};