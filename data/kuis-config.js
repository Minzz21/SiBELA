/**
 * SiBELA - Konfigurasi Modul Kuis Evaluasi
 * Mengatur parameter kuis, timer, KKTP, dan opsi mode evaluasi.
 */

export const KUIS_CONFIG = {
  // Waktu per nomor soal dalam detik (bisa disesuaikan)
  waktuPerSoal: 30,

  // Nilai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)
  passingGrade: 75,

  // Durasi jeda instant feedback sebelum otomatis pindah soal (milidetik)
  feedbackDelay: 2500,

  // Jumlah soal default saat kuis dimulai
  defaultJumlahSoal: 20,

  // Opsi Mode Evaluasi Pembelajaran (2 Pilihan Modul Utama)
  modeList: [
    {
      id: 'modul1',
      label: 'Khusus Materi Modul 1: Sishankamnas',
      deskripsi: 'Fokus pemahaman Sistem Pertahanan dan Keamanan Rakyat Semesta (20 Soal).',
      count: 20,
      filter: 'modul1',
      isDefault: true
    },
    {
      id: 'modul2',
      label: 'Khusus Materi Modul 2: Peran Internasional',
      deskripsi: 'Fokus kiprah diplomasi ASEAN, PBB, OKI, G20, dan Kontingen Garuda (20 Soal).',
      count: 20,
      filter: 'modul2',
      isDefault: false
    }
  ]
};
