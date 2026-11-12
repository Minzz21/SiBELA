/**
 * SiBELA - Data Studi Kasus Interaktif Modul 1 (Sishankamnas & Komponen Pertahanan)
 * Evaluasi Otomatis Sistem Berbasis Identifikasi Kalimat Sishankamrata
 * TP 10.D.6: Mengidentifikasi sishankamnas & ancaman nirmiliter
 */

export const STUDI_KASUS_MATERI_1 = {
  id: 'kasus-natuna-sishankamrata',
  judul: 'Operasi Kesiapsiagaan Pertahanan Semesta di Wilayah Pesisir Kepulauan',
  topik: 'Penerapan Sishankamrata & Komponen Pertahanan Negara',
  pengantar: 'Sebuah narasi kasus tentang bagaimana bangsa Indonesia merespons dinamika dan potensi ancaman kedaulatan di wilayah perbatasan laut dan pesisir:',
  instruksi: 'Bacalah teks narasi studi kasus di bawah dengan seksama. Identifikasi dan ketuk/klik kalimat-kalimat yang merupakan penerapan Sistem Pertahanan dan Keamanan Rakyat Semesta (Sishankamrata) yang benar (meliputi peran Komponen Utama, Komponen Cadangan, Komponen Pendukung, serta Tiga Ciri Sishankamrata). Sistem akan menilai hasil identifikasimu secara otomatis.',
  totalKalimatBenar: 5,
  kalimat: [
    {
      id: 1,
      teks: 'Pangkalan TNI Angkatan Laut dan Kodim setempat segera menggelar patroli terpadu di wilayah perairan dan daratan pesisir untuk menangkal potensi intrusi kapal asing.',
      isCorrect: true,
      kategori: 'Komponen Utama (TNI)',
      kategoriBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      alasan: 'TNI (AD, AL, AU) adalah Komponen Utama pertahanan negara yang dipersiapkan langsung dan siap sedia menghadapi ancaman militer di garda terdepan.'
    },
    {
      id: 2,
      teks: 'Mendengar kabar ketegangan tersebut, sekelompok pemuda berinisiatif membeli senjata api rakitan di pasar gelap untuk melakukan penyerangan mandiri tanpa melapor ke aparat berwenang.',
      isCorrect: false,
      kategori: 'Tindakan Ilegal / Main Hakim Sendiri',
      kategoriBadge: 'bg-rose-100 text-rose-800 border-rose-300',
      alasan: 'Warga sipil dilarang keras membeli senjata ilegal atau bertindak anarkis tanpa komando resmi. Bela negara harus taat hukum dan berada di bawah koordinasi negara.'
    },
    {
      id: 3,
      teks: 'Kementerian Pertahanan menyiagakan warga sipil terlatih alumni Komponen Cadangan (Komcad) untuk siap dimobilisasi memperkuat pasukan utama apabila Presiden dan DPR menetapkan status darurat.',
      isCorrect: true,
      kategori: 'Komponen Cadangan (Komcad)',
      kategoriBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      alasan: 'Komponen Cadangan terdiri dari sumber daya nasional yang dilatih sukarela dan sah menurut UU No. 23/2019 untuk dimobilisasi memperbesar Komponen Utama.'
    },
    {
      id: 4,
      teks: 'Petugas Palang Merah Indonesia (PMI), tenaga medis puskesmas, dan sukarelawan logistik bergotong royong mendirikan posko darurat guna menjamin pasokan medis dan pangan bagi warga.',
      isCorrect: true,
      kategori: 'Komponen Pendukung & Kesemestaan',
      kategoriBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      alasan: 'Warga sipil, tenaga medis, dan relawan logistik merupakan Komponen Pendukung yang mendayagunakan seluruh potensi non-militer (wujud Ciri Kesemestaan Sishankamrata).'
    },
    {
      id: 5,
      teks: 'Di tengah situasi siaga, seorang oknum menyebarkan potongan video hoaks bernada provokatif di media sosial yang menuduh aparat sengaja membiarkan musuh masuk hingga menimbulkan kepanikan warga.',
      isCorrect: false,
      kategori: 'Ancaman Nirmiliter (Disinformasi)',
      kategoriBadge: 'bg-rose-100 text-rose-800 border-rose-300',
      alasan: 'Penyebaran hoaks dan provokasi adalah bentuk ancaman nirmiliter yang memecah belah persatuan bangsa, bertentangan total dengan semangat bela negara.'
    },
    {
      id: 6,
      teks: 'Pemerintah daerah bersama perangkat desa dan tokoh adat menyusun peta jalur evakuasi warga dan penempatan logistik sesuai dengan kondisi geografis pesisir berbukit dan pulau-pulau kecil.',
      isCorrect: true,
      kategori: 'Ciri Kewilayahan Sishankamrata',
      kategoriBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      alasan: 'Gelar pertahanan dan perlindungan yang disesuaikan dengan kondisi geografis NKRI sebagai negara kepulauan merupakan penerapan Ciri Kewilayahan Sishankamrata.'
    },
    {
      id: 7,
      teks: 'Sebagian pedagang besar memanfaatkan kepanikan warga untuk menimbun stok beras dan minyak goreng lalu menjualnya dengan harga tiga kali lipat demi meraup keuntungan pribadi.',
      isCorrect: false,
      kategori: 'Pelanggaran Ketahanan Ekonomi',
      kategoriBadge: 'bg-rose-100 text-rose-800 border-rose-300',
      alasan: 'Menimbun kebutuhan pokok saat kondisi genting melanggar hukum, merugikan rakyat luas, dan merusak pilar ketahanan pangan nasional.'
    },
    {
      id: 8,
      teks: 'Seluruh koordinasi pertahanan dan perlindungan terpadu ini diabdikan untuk menjamin keselamatan jiwa, ketenteraman hidup, dan hak-hak asasi seluruh warga masyarakat tanpa terkecuali.',
      isCorrect: true,
      kategori: 'Ciri Kerakyatan Sishankamrata',
      kategoriBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      alasan: 'Orientasi pertahanan yang diabdikan oleh, bersama, dan sebesar-besarnya demi kemaslahatan dan keselamatan seluruh rakyat merupakan inti Ciri Kerakyatan Sishankamrata.'
    }
  ]
};

/**
 * Menghitung skor dan evaluasi pilihan kalimat siswa
 * @param {number[]} selectedIds - Array id kalimat yang dipilih siswa
 * @returns {object} Hasil evaluasi lengkap (skor, benar, salah, terlewat, predikat)
 */
export function evaluateStudiKasusMateri1(selectedIds = []) {
  const dataset = STUDI_KASUS_MATERI_1.kalimat;
  const selectedSet = new Set(selectedIds.map(Number));

  const correctSelected = [];
  const wrongSelected = [];
  const correctMissed = [];

  dataset.forEach(item => {
    const isSelected = selectedSet.has(item.id);
    if (item.isCorrect) {
      if (isSelected) {
        correctSelected.push(item);
      } else {
        correctMissed.push(item);
      }
    } else {
      if (isSelected) {
        wrongSelected.push(item);
      }
    }
  });

  const totalCorrect = STUDI_KASUS_MATERI_1.totalKalimatBenar; // 5
  // Hitung skor: Tiap kalimat benar +20 poin, tiap pilihan salah penalti -15 poin (min 0)
  const rawScore = (correctSelected.length * 20) - (wrongSelected.length * 15);
  const score = Math.max(0, Math.min(100, rawScore));

  let predikat = 'Perlu Pendalaman';
  let badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
  let pesan = 'Kamu masih perlu mempelajari kembali 3 Komponen Pertahanan dan Tiga Ciri Sishankamrata.';

  if (score === 100) {
    predikat = 'Sempurna (Sangat Kompeten)';
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    pesan = 'Luar biasa! Kamu berhasil mengidentifikasi seluruh kalimat penerapan Sishankamrata dengan tepat tanpa satupun kekeliruan.';
  } else if (score >= 80) {
    predikat = 'Sangat Baik (Kompeten)';
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    pesan = 'Hebat! Pemahamanmu mengenai sistem pertahanan semesta dan peran warga negara sudah sangat baik.';
  } else if (score >= 60) {
    predikat = 'Cukup Kompeten';
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
    pesan = 'Bagus! Sebagian besar konsep sudah kamu pahami, namun perhatikan kembali batasan peran resmi dan ancaman nirmiliter.';
  }

  return {
    score,
    predikat,
    badgeColor,
    pesan,
    totalCorrect,
    correctSelected,
    wrongSelected,
    correctMissed,
    isPerfect: score === 100
  };
}

