/**
 * SiBELA - Data Kutipan Motivasi & Tantangan Harian Bela Negara
 * Nilai-nilai Kurikulum Berbasis Cinta (KBC / Hubbul Wathan)
 */

export const quotesBelaNegara = [
  {
    id: 1,
    teks: "Bela negara bukan hanya tugas prajurit TNI, tetapi hak dan kewajiban moral seluruh rakyat Indonesia sesuai peran dan profesinya masing-masing.",
    tokoh: "Amanat UUD 1945 Pasal 27 Ayat 3",
    tantangan: "Saring sebelum sebar: Periksa kebenaran satu berita di media sosialmu hari ini sebelum membagikannya!"
  },
  {
    id: 2,
    teks: "Cinta tanah air adalah bagian dari iman (Hubbul Wathan Minal Iman). Jagalah persatuan dan keharmonisan di manapun kamu berada.",
    tokoh: "Nilai Kurikulum Berbasis Cinta (KBC)",
    tantangan: "Tunjukkan empati: Berikan apresiasi atau bantuan kecil kepada teman sekelasmu tanpa membedakan latar belakang."
  },
  {
    id: 3,
    teks: "Bangsa yang besar adalah bangsa yang tidak pernah melupakan jasa para pahlawannya dan bertekad melanjutkan cita-cita kemerdekaan.",
    tokoh: "Ir. Soekarno",
    tantangan: "Disiplin belajar: Luangkan waktu 15 menit hari ini untuk menuntaskan materi modul Pendidikan Pancasila secara fokus."
  },
  {
    id: 4,
    teks: "Pertahanan negara yang kokoh dibangun dari masyarakat yang cerdas, toleran, dan berintegritas tinggi dalam kehidupan sehari-hari.",
    tokoh: "Prinsip Sishankamnas",
    tantangan: "Cintai produk lokal: Prioritaskan menggunakan karya atau produk buatan bangsa sendiri hari ini!"
  },
  {
    id: 5,
    teks: "Diplomasi Indonesia berprinsip bebas dan aktif, mendayung di antara dua karang demi terwujudnya perdamaian dunia yang abadi.",
    tokoh: "Drs. Mohammad Hatta",
    tantangan: "Eksplorasi wawasan: Telusuri satu peran diplomasi Indonesia di kancah PBB atau ASEAN di Modul 2!"
  },
  {
    id: 6,
    teks: "Kemerdekaan ialah hak segala bangsa, dan oleh sebab itu penjajahan di atas dunia harus dihapuskan karena tidak sesuai dengan perikemanusiaan dan perikeadilan.",
    tokoh: "Pembukaan UUD 1945 Alinea I",
    tantangan: "Tegakkan toleransi: Dengarkan dan hargai pendapat orang lain dalam diskusi kelas dengan lapang dada."
  }
];

/**
 * Mendapatkan kutipan acak
 */
export function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotesBelaNegara.length);
  return quotesBelaNegara[randomIndex];
}
