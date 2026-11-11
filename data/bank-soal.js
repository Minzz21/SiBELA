/**
 * SiBELA - Bank Soal Evaluasi Pendidikan Pancasila (Kelas X)
 * Berdasarkan Modul 1 (Sishankamnas - TP 10.D.6) dan Modul 2 (Peran Indonesia di Dunia - TP 10.D.7)
 * Total: 40 Soal Pilihan Ganda Terverifikasi Lengkap dengan Kunci & Pembahasan
 */

export const bankSoal = [
  // =========================================================================
  // BAGIAN I: MATERI 1 SISTEM PERTAHANAN & KEAMANAN NASIONAL (SISHANKAMNAS)
  // =========================================================================
  {
    id: 1,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Sistem integral yang memadukan seluruh kekuatan, kemampuan, dan segenap potensi nasional untuk melindungi kedaulatan negara, keutuhan wilayah, serta keselamatan bangsa dari segala bentuk ancaman disebut ...',
    opsi: [
      'Sistem Komando Militer Terpadu',
      'Sistem Pertahanan dan Keamanan Nasional (Sishankamnas)',
      'Operasi Militer Selain Perang (OMSP)',
      'Doktrin Dwifungsi Angkatan Bersenjata'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Definisi resmi Sishankamnas adalah sistem integral yang memadukan seluruh kekuatan, kemampuan, dan segenap potensi nasional untuk melindungi kedaulatan negara, keutuhan wilayah, serta keselamatan segenap bangsa.'
  },
  {
    id: 2,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Secara etimologis dan konseptual dalam Sishankamnas, segala usaha untuk menegakkan kedaulatan negara, mempertahankan keutuhan wilayah NKRI, dan menjaga keselamatan segenap bangsa dari ancaman serta gangguan sebagaimana diatur dalam UU No. 3 Tahun 2002 merupakan makna dari kata ...',
    opsi: [
      'Sistem',
      'Pertahanan',
      'Keamanan',
      'Nasional'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Berdasarkan UU No. 3 Tahun 2002 tentang Pertahanan Negara, kata "Pertahanan" merujuk pada segala usaha menegakkan kedaulatan negara, mempertahankan keutuhan wilayah, dan keselamatan segenap bangsa.'
  },
  {
    id: 3,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Landasan filosofis penyelenggaraan Sishankamnas yang menempatkan persatuan dan keadilan sebagai fondasi kekuatan bangsa Indonesia bertumpu secara khusus pada Pancasila, terutama ...',
    opsi: [
      'Sila pertama dan sila kedua',
      'Sila kedua dan sila keempat',
      'Sila ketiga (Persatuan Indonesia) dan sila kelima (Keadilan Sosial)',
      'Sila pertama dan sila keempat'
    ],
    jawabanBenar: 2, // C
    penjelasan: 'Landasan filosofis Sishankamnas bertumpu pada Pancasila, khususnya Sila ke-3 (Persatuan Indonesia) sebagai pengikat integrasi bangsa dan Sila ke-5 (Keadilan Sosial) sebagai tujuan pertahanan semesta yang adil.'
  },
  {
    id: 4,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Pasal dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 yang menegaskan secara spesifik bahwa “Setiap warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara” adalah ...',
    opsi: [
      'Pasal 11 ayat (1) UUD NRI Tahun 1945',
      'Pasal 27 ayat (3) UUD NRI Tahun 1945',
      'Pasal 30 ayat (3) UUD NRI Tahun 1945',
      'Pasal 30 ayat (4) UUD NRI Tahun 1945'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Pasal 27 ayat (3) UUD NRI 1945 secara spesifik mengatur bahwa "Setiap warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara", sedangkan Pasal 30 mengatur tentang pertahanan dan keamanan negara.'
  },
  {
    id: 5,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Berdasarkan Pasal 30 ayat (2) UUD NRI Tahun 1945, usaha pertahanan dan keamanan negara dilaksanakan melalui sistem pertahanan dan keamanan rakyat semesta (Sishankamrata) dengan pembagian peran berupa ...',
    opsi: [
      'TNI sebagai kekuatan tunggal dan Polri sebagai kekuatan cadangan',
      'Rakyat sebagai kekuatan utama dan TNI-Polri sebagai kekuatan pendukung',
      'TNI dan Polri sebagai kekuatan utama, sedangkan rakyat sebagai kekuatan pendukung',
      'Kementerian pertahanan sebagai kekuatan utama dan lembaga swadaya sebagai pendukung'
    ],
    jawabanBenar: 2, // C
    penjelasan: 'Pasal 30 ayat (2) UUD NRI 1945 menegaskan TNI dan Kepolisian Negara Republik Indonesia sebagai kekuatan utama, dan rakyat sebagai kekuatan pendukung dalam Sishankamrata.'
  },
  {
    id: 6,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Di bawah ini yang merupakan landasan yuridis yang secara khusus mengatur tentang Pengelolaan Sumber Daya Nasional untuk Pertahanan Negara (termasuk pembentukan Komponen Cadangan) adalah ...',
    opsi: [
      'UU No. 2 Tahun 2002',
      'UU No. 3 Tahun 2002',
      'UU No. 34 Tahun 2004',
      'UU No. 23 Tahun 2019'
    ],
    jawabanBenar: 3, // D
    penjelasan: 'UU No. 23 Tahun 2019 mengatur secara khusus tentang Pengelolaan Sumber Daya Nasional untuk Pertahanan Negara (PSDN), mencakup penataan Komponen Cadangan dan Komponen Pendukung.'
  },
  {
    id: 7,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Kondisi Indonesia sebagai negara kepulauan yang luas dan terbuka, memiliki jumlah penduduk yang besar, serta keragaman suku dan budaya sehingga pertahanan tidak dapat bertumpu pada kekuatan militer semata merupakan landasan Sishankamnas dari aspek ...',
    opsi: [
      'Landasan historis',
      'Landasan geografis dan demografis',
      'Landasan yuridis formal',
      'Landasan konstitusional'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Bentuk kepulauan yang terbuka, perairan yang luas, dan jumlah penduduk besar yang majemuk merupakan landasan geografis dan demografis penyelenggaraan pertahanan semesta.'
  },
  {
    id: 8,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Dalam struktur fungsi Sishankamnas, penyelenggaraan pertahanan nirmiliter untuk menghadapi ancaman di bidang ideologi, politik, ekonomi, sosial budaya, teknologi informasi, dan keselamatan umum dilaksanakan oleh pelaksana utama yaitu ...',
    opsi: [
      'Tentara Nasional Indonesia Angkatan Darat, Laut, dan Udara',
      'Kementerian dan lembaga pemerintah nonkementerian sesuai bidangnya bersama masyarakat',
      'Detasemen Khusus Pemberantasan Terorisme Bersenjata',
      'Pasukan Pemelihara Perdamaian Perserikatan Bangsa-Bangsa'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Pertahanan nirmiliter menempatkan kementerian dan lembaga pemerintah nonkementerian di luar bidang pertahanan sebagai unsur utama sesuai bentuk ancaman yang dihadapi, didukung oleh masyarakat.'
  },
  {
    id: 9,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Indonesia menganut politik luar negeri bebas aktif dan cinta damai, sehingga kekuatan pertahanan nasional hanya digunakan untuk membela diri serta menegakkan kedaulatan, bukan untuk menginvasi negara lain. Hal ini mencerminkan prinsip Sishankamnas yaitu ...',
    opsi: [
      'Berlapis dan berlanjut',
      'Integral dan terpadu',
      'Tidak agresif dan tidak ekspansif',
      'Menyeluruh dan semesta'
    ],
    jawabanBenar: 2, // C
    penjelasan: 'Prinsip "Tidak agresif dan tidak ekspansif" menegaskan bahwa pertahanan Indonesia berwatak defensif-aktif semata untuk menjaga keutuhan wilayah dan keselamatan bangsa, bukan untuk menyerang negara lain.'
  },
  {
    id: 10,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Berdasarkan UU No. 3 Tahun 2002 dan UU No. 23 Tahun 2019, warga negara serta sumber daya nasional yang telah disiapkan dan mengikuti pelatihan dasar kemiliteran secara sukarela untuk dikerahkan melalui mobilisasi guna memperbesar kekuatan TNI disebut ...',
    opsi: [
      'Komponen Utama',
      'Komponen Cadangan',
      'Komponen Pendukung',
      'Komponen Keamanan Sipil'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Komponen Cadangan adalah sumber daya nasional yang dilatih dasar kemiliteran secara sukarela dan siap dimobilisasi oleh Presiden atas persetujuan DPR untuk memperbesar dan memperkuat Komponen Utama (TNI).'
  },
  {
    id: 11,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Tenaga kesehatan (dokter dan perawat), pakar teknologi informasi, praktisi logistik, serta pendidik/guru yang berperan melalui profesi dan keahliannya untuk meningkatkan daya tahan bangsa termasuk ke dalam ...',
    opsi: [
      'Komponen Utama',
      'Komponen Cadangan',
      'Komponen Pendukung',
      'Komponen Militer Khusus'
    ],
    jawabanBenar: 2, // C
    penjelasan: 'Komponen Pendukung adalah sumber daya nasional yang tidak dilatih militer tetapi dapat digunakan untuk meningkatkan kekuatan dan kemampuan Komponen Utama dan Cadangan melalui profesi dan keahliannya.'
  },
  {
    id: 12,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Sebagaimana diamanatkan dalam Pasal 30 ayat (4) UUD NRI Tahun 1945, fungsi Kepolisian Negara Republik Indonesia (Polri) sebagai alat negara dalam sistem keamanan nasional adalah ...',
    opsi: [
      'Menghadapi agresi militer negara asing di garis perbatasan laut dan udara',
      'Menjaga keamanan dan ketertiban masyarakat serta melindungi, mengayomi, melayani masyarakat, dan menegakkan hukum',
      'Melakukan mobilisasi wajib militer bagi seluruh pelajar tingkat menengah',
      'Menetapkan anggaran pertahanan militer bersama Dewan Perwakilan Rakyat'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Pasal 30 ayat (4) UUD 1945 menegaskan bahwa Kepolisian Negara Republik Indonesia sebagai alat negara bertugas menjaga keamanan dan ketertiban masyarakat, melindungi, mengayomi, melayani masyarakat, serta menegakkan hukum.'
  },
  {
    id: 13,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Perhatikan bentuk-bentuk ancaman berikut: (1) Agresi militer asing, (2) Krisis ekonomi dan ketergantungan impor, (3) Pemberontakan bersenjata, (4) Penyebaran hoaks dan kejahatan siber, (5) Pandemi penyakit menular. Manakah yang termasuk ke dalam kategori ancaman nonmiliter?',
    opsi: [
      '(1), (2), dan (3)',
      '(1), (3), dan (4)',
      '(2), (4), dan (5)',
      '(3), (4), dan (5)'
    ],
    jawabanBenar: 2, // C
    penjelasan: 'Krisis ekonomi (2), kejahatan siber/hoaks (4), dan pandemi penyakit (5) berdimensi nonfisik senjata sehingga dikategorikan sebagai ancaman nonmiliter. Agresi (1) dan pemberontakan bersenjata (3) adalah ancaman militer.'
  },
  {
    id: 14,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Suatu negara mengalami serangan peretasan siber terhadap jaringan infrastruktur vital, disinformasi masif di media sosial, boikot dan tekanan ekonomi, serta provokasi militer di wilayah perbatasan yang dilancarkan secara bersamaan dan terkoordinasi. Serangan gabungan ini dikategorikan sebagai ...',
    opsi: [
      'Ancaman konvensional tunggal',
      'Ancaman hibrida',
      'Ancaman ketertiban lokal',
      'Ancaman alamiah murni'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Ancaman hibrida memadukan ancaman militer konvensional, ancaman asimetris (siber, propaganda/disinformasi), dan instrumen ekonomi secara serentak untuk melemahkan ketahanan negara lawan.'
  },
  {
    id: 15,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Ketika terjadi bencana alam seperti gempa bumi atau banjir bandang, penerapan Sishankamnas tampak dari kolaborasi terpadu berbagai unsur, yaitu ...',
    opsi: [
      'Pemerintah dan badan penanggulangan bencana memimpin penanganan, TNI-Polri membantu evakuasi dan pengamanan, serta nakes, relawan, dan warga membantu logistik',
      'Seluruh penanganan evakuasi dan logistik diserahkan sepenuhnya kepada relawan asing tanpa keterlibatan pemerintah',
      'Kepolisian menutup seluruh akses bantuan masyarakat sipil karena bencana alam termasuk rahasia militer',
      'Masyarakat sipil diwajibkan mengangkat senjata di lokasi bencana sementara TNI fokus pada administrasi'
    ],
    jawabanBenar: 0, // A
    penjelasan: 'Dalam penanganan bencana, sinergi Sishankamnas diwujudkan lewat komando BNPB/pemerintah daerah, evakuasi kemanusiaan oleh TNI-Polri via OMSP, serta peran aktif masyarakat, relawan, dan nakes.'
  },
  {
    id: 16,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Konsep pertahanan semesta Indonesia berakar kuat dari pengalaman historis masa Perang Kemerdekaan (1945–1949), di mana strategi perang gerilya berhasil dijalankan karena ...',
    opsi: [
      'Tentara Indonesia memiliki persenjataan nuklir dan armada kapal induk yang lebih modern dibanding Belanda',
      'Perlawanan bersenjata tentara berjalan bersama dukungan rakyat yang menyediakan logistik, informasi, dan tempat perlindungan',
      'Seluruh wilayah Indonesia dijaga oleh pasukan aliansi pakta pertahanan Perang Dingin',
      'Pemerintah kolonial menyerahkan kedaulatan tanpa pernah melakukan agresi militer'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Kunci keberhasilan perang gerilya Jenderal Soedirman adalah kemanunggalan TNI dan rakyat, di mana rakyat memasok perbekalan dapur umum, tempat persembunyian, dan informasi telik sandi posisi musuh.'
  },
  {
    id: 17,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Pada masa Orde Baru (1966–1998) berlaku doktrin yang memberikan peran ganda bagi militer, baik sebagai kekuatan pertahanan-keamanan maupun kekuatan sosial-politik, yang kemudian dikritik karena peran militer terlalu luas. Konsep tersebut dikenal dengan nama ...',
    opsi: [
      'Komponen Cadangan Nasional',
      'Dwifungsi ABRI',
      'Operasi Militer Selain Perang',
      'Reformasi Keamanan Semesta'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Dwifungsi ABRI adalah doktrin pada era Orde Baru yang menempatkan militer sebagai kekuatan pertahanan keamanan sekaligus kekuatan sosial politik di lembaga birokrasi dan legislatif.'
  },
  {
    id: 18,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Tonggak penting pembaruan Sishankamnas pada era Reformasi (1998–sekarang) yang memastikan pertahanan berada di bawah kendali sipil dan demokratis ditandai oleh ...',
    opsi: [
      'Penggabungan kembali TNI dan Polri ke dalam satu komando kementerian dalam negeri',
      'Pemisahan tugas TNI dan Polri melalui TAP MPR No. VI dan VII/MPR/2000 serta lahirnya UU No. 2/2002, UU No. 3/2002, dan UU No. 34/2004',
      'Penghapusan Pasal 30 UUD 1945 dari konstitusi Negara Republik Indonesia',
      'Pembubaran seluruh angkatan laut dan udara untuk digantikan oleh milisi swasta'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Reformasi keamanan ditandai pemisahan kelembagaan TNI (pertahanan negara) dan Polri (keamanan ketertiban masyarakat) melalui TAP MPR No. VI & VII/MPR/2000 serta regulasi turunan di bawah kendali sipil.'
  },
  {
    id: 19,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Menurut UU No. 3 Tahun 2002, keikutsertaan warga negara dalam upaya bela negara diselenggarakan melalui empat jalur resmi berikut, kecuali ...',
    opsi: [
      'Pendidikan kewarganegaraan',
      'Pelatihan dasar kemiliteran secara wajib',
      'Pengabdian sebagai prajurit TNI secara sukarela atau wajib, serta pengabdian sesuai profesi',
      'Pembentukan kelompok bersenjata independen di luar kendali hukum negara'
    ],
    jawabanBenar: 3, // D
    penjelasan: 'Pasal 9 ayat (2) UU No. 3/2002 menetapkan 4 jalur bela negara: PKn, latihan dasar kemiliteran wajib, prajurit TNI, dan pengabdian profesi. Pembentukan milisi independen bersenjata bertentangan dengan hukum negara.'
  },
  {
    id: 20,
    kategori: 'modul1',
    labelKategori: 'Materi 1 • Sishankamnas',
    pertanyaan: 'Kebijakan pertahanan negara ditetapkan melalui mekanisme demokratis dan berada di bawah kendali sipil (Presiden dan DPR) secara konstitusional agar tidak pernah disalahgunakan untuk menindas rakyat. Hal ini merupakan perwujudan nilai Pancasila dalam Sishankamnas, khususnya ...',
    opsi: [
      'Sila Pertama (Ketuhanan Yang Maha Esa)',
      'Sila Kedua (Kemanusiaan yang Adil dan Beradab)',
      'Sila Keempat (Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan)',
      'Sila Kelima (Keadilan Sosial bagi Seluruh Rakyat Indonesia)'
    ],
    jawabanBenar: 2, // C
    penjelasan: 'Sila Keempat Pancasila menegaskan kedaulatan rakyat dan musyawarah perwakilan, di mana kebijakan pertahanan negara dirumuskan oleh Presiden dengan persetujuan lembaga perwakilan rakyat (DPR).'
  },

  // =========================================================================
  // BAGIAN II: MATERI 2 PERAN INDONESIA DI DUNIA INTERNASIONAL (TP 10.D.7)
  // =========================================================================
  {
    id: 21,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Sikap bangsa Indonesia yang menganggap dirinya sebagai bagian dari seluruh umat manusia serta menolak segala bentuk penjajahan, diskriminasi, penindasan rasial, dan imperialisme di muka bumi merupakan landasan idiil politik luar negeri RI yang berakar pada Pancasila, yaitu ...',
    opsi: [
      'Sila Pertama',
      'Sila Kedua (Kemanusiaan yang Adil dan Beradab)',
      'Sila Ketiga (Persatuan Indonesia)',
      'Sila Kelima (Keadilan Sosial bagi Seluruh Rakyat Indonesia)'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Sila Kedua Pancasila menjadi landasan moral politik luar negeri bahwa seluruh bangsa berkedudukan setara, berhak atas kemerdekaan, serta menolak kolonialisme dan penindasan kemanusiaan.'
  },
  {
    id: 22,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Amanat konstitusional yang menjadi pedoman tujuan politik luar negeri Indonesia untuk “...ikut melaksanakan ketertiban dunia yang berdasarkan kemerdekaan, perdamaian abadi dan keadilan sosial...” tercantum secara tegas dalam ...',
    opsi: [
      'Pembukaan UUD NRI Tahun 1945 Alinea Pertama',
      'Pembukaan UUD NRI Tahun 1945 Alinea Kedua',
      'Pembukaan UUD NRI Tahun 1945 Alinea Ketiga',
      'Pembukaan UUD NRI Tahun 1945 Alinea Keempat'
    ],
    jawabanBenar: 3, // D
    penjelasan: 'Alinea IV Pembukaan UUD NRI 1945 menegaskan 4 tujuan negara, salah satunya adalah ikut melaksanakan ketertiban dunia yang berdasarkan kemerdekaan, perdamaian abadi, dan keadilan sosial.'
  },
  {
    id: 23,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Berdasarkan Pasal 11 ayat (1) dan ayat (2) UUD NRI Tahun 1945, Presiden dalam menyatakan perang, membuat perdamaian, dan membuat perjanjian internasional yang menimbulkan akibat luas dan mendasar bagi kehidupan rakyat harus memperoleh persetujuan dari ...',
    opsi: [
      'Mahkamah Konstitusi (MK)',
      'Dewan Perwakilan Rakyat (DPR)',
      'Komisi Yudisial (KY)',
      'Badan Pemeriksa Keuangan (BPK)'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Pasal 11 ayat (1) dan (2) UUD NRI 1945 mewajibkan Presiden memperoleh persetujuan Dewan Perwakilan Rakyat (DPR) dalam membuat pernyataan perang, perdamaian, dan traktat internasional penting.'
  },
  {
    id: 24,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Landasan operasional hubungan luar negeri Indonesia yang menegaskan pada Pasal 3 bahwa “Politik Luar Negeri menganut prinsip bebas aktif yang diabdikan untuk kepentingan nasional” diatur di dalam ...',
    opsi: [
      'UU No. 20 Tahun 1982 tentang Pokok-Pokok Pertahanan Keamanan',
      'UU No. 37 Tahun 1999 tentang Hubungan Luar Negeri',
      'UU No. 2 Tahun 2002 tentang Kepolisian Negara Republik Indonesia',
      'UU No. 23 Tahun 2019 tentang Pengelolaan Sumber Daya Nasional'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'UU No. 37 Tahun 1999 tentang Hubungan Luar Negeri, khususnya Pasal 3, menjadi landasan operasional formal pelaksanaan prinsip politik luar negeri Bebas Aktif demi kepentingan nasional.'
  },
  {
    id: 25,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Konsep politik luar negeri “Bebas dan Aktif” dicetuskan pertama kali pada tanggal 2 September 1948 di hadapan Badan Pekerja Komite Nasional Indonesia Pusat (BP-KNIP) di Yogyakarta melalui pidato bersejarah berjudul “Mendayung Antara Dua Karang” yang disampaikan oleh ...',
    opsi: [
      'Ir. Soekarno',
      'Drs. Mohammad Hatta',
      'Sutan Sjahrir',
      'H. Adam Malik'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Wakil Presiden Drs. Mohammad Hatta menyampaikan pidato monumental berjudul "Mendayung Antara Dua Karang" di hadapan BP-KNIP di Yogyakarta pada 2 September 1948, melahirkan doktrin Bebas-Aktif.'
  },
  {
    id: 26,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Makna prinsip “Bebas” dan “Aktif” dalam doktrin politik luar negeri Indonesia yang tepat adalah ...',
    opsi: [
      'Bebas menginvasi negara tetangga dan aktif bergabung dalam pakta pertahanan militer blok adidaya',
      'Tidak mengikatkan diri secara militer/ideologis pada pakta blok adidaya (Bebas), serta proaktif menyumbangkan prakarsa diplomasi guna mewujudkan perdamaian dan keadilan dunia (Aktif)',
      'Menutup diri dari seluruh pergaulan internasional (Bebas) dan hanya mengamati konflik global tanpa mengambil tindakan (Aktif)',
      'Bebas membatalkan hukum internasional dan aktif memihak salah satu kekuatan adikuasa demi keuntungan sepihak'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Bebas berarti Indonesia berhak menentukan sikap secara independen tanpa terikat aliansi pakta militer adidaya; Aktif bermakna giat dan konstruktif memperjuangkan perdamaian dan ketertiban dunia.'
  },
  {
    id: 27,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Prinsip politik luar negeri Bebas-Aktif memiliki keselarasan filosofis dengan konsep Islam Wasathiyah yang diajarkan di madrasah, karena keduanya menekankan sikap ...',
    opsi: [
      'Tidak condong ke ekstrem kanan maupun ekstrem kiri, berdiri tegak di jalan keadilan (tawazun), toleran (tasamuh), serta menjadi juru damai (ishlah)',
      'Memutuskan hubungan diplomatik dengan seluruh negara yang memiliki sistem pemerintahan berbeda',
      'Mengutamakan kekuatan militer di atas perundingan damai dalam setiap sengketa kawasan',
      'Menghindari keanggotaan pada organisasi multilateral tingkat global maupun regional'
    ],
    jawabanBenar: 0, // A
    penjelasan: 'Islam Wasathiyah mengedepankan sikap moderat di tengah (wasath), seimbang (tawazun), toleran (tasamuh), dan juru damai (ishlah), selaras dengan watak diplomasi Bebas-Aktif Indonesia.'
  },
  {
    id: 28,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'ASEAN (Association of Southeast Asian Nations) didirikan pada tanggal 8 Agustus 1967 melalui penandatanganan Deklarasi Bangkok oleh lima negara pendiri. Tokoh delegasi Indonesia yang menandatangani deklarasi tersebut serta lokasi permanen Sekretariat Jenderal ASEAN adalah ...',
    opsi: [
      'Ali Alatas; berkedudukan di Kuala Lumpur, Malaysia',
      'H. Adam Malik; berkedudukan di Jl. Sisingamangaraja No. 70A, Jakarta Selatan, Indonesia',
      'Marty Natalegawa; berkedudukan di Bangkok, Thailand',
      'Retno Marsudi; berkedudukan di Manila, Filipina'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Menteri Luar Negeri RI H. Adam Malik mewakili Indonesia menandatangani Deklarasi Bangkok 1967, dan Gedung Sekretariat ASEAN berkedudukan permanen di Kebayoran Baru, Jakarta Selatan.'
  },
  {
    id: 29,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Dalam rekam jejak kepemimpinan Indonesia di ASEAN, kesepakatan Bali Concord II (2003) menghasilkan tonggak sejarah penting bagi integrasi kawasan Asia Tenggara, yaitu ...',
    opsi: [
      'Pembentukan pakta pertahanan militer bersenjata ASEAN untuk menghadapi Perang Dingin',
      'Menggagas terbentuknya Komunitas ASEAN (ASEAN Community) yang bertumpu pada 3 pilar: Politik-Keamanan (APSC), Ekonomi (AEC), dan Sosial-Budaya (ASCC)',
      'Penyatuan mata uang tunggal seluruh negara Asia Tenggara pada tahun 2004',
      'Pemindahan markas besar PBB dari New York ke Nusa Dua, Bali'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'KTT ASEAN ke-9 di Bali (2003) menghasilkan Bali Concord II yang memprakarsai pembentukan Komunitas ASEAN dengan 3 pilar utama: Politik-Keamanan, Ekonomi, dan Sosial-Budaya.'
  },
  {
    id: 30,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Kontribusi diplomasi Indonesia di kawasan Asia Tenggara untuk mengakhiri perang saudara di Kamboja pada tahun 1988–1989 serta menjaga kawasan Indo-Pasifik tetap terbuka, inklusif, dan berbasis hukum internasional (UNCLOS 1982) pada tahun 2019 diwujudkan melalui ...',
    opsi: [
      'Jakarta Informal Meeting (JIM I & II) dan inisiasi ASEAN Outlook on the Indo-Pacific (AOIP 2019)',
      'Deklarasi Rabat dan pembentukan Komite Enam Filipina Selatan',
      'Pengiriman Kontingen Garuda I ke Terusan Suez dan Deklarasi G20 Bali',
      'Penandatanganan Piagam San Francisco dan Perjanjian Linggarjati'
    ],
    jawabanBenar: 0, // A
    penjelasan: 'Indonesia memfasilitasi JIM I & II di Bogor/Jakarta (1988–1989) sebagai jalan pembuka Perjanjian Damai Paris 1991 untuk Kamboja, serta memprakarsai lahirnya AOIP 2019 demi stabilitas Indo-Pasifik.'
  },
  {
    id: 31,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Indonesia resmi bergabung menjadi anggota Perserikatan Bangsa-Bangsa (PBB) ke-60 pada 28 September 1950, sempat keluar pada 7 Januari 1965, dan kembali bergabung pada 28 September 1966. Hingga saat ini, rekam jejak keanggotaan Indonesia di Dewan Keamanan (DK) PBB dan Dewan HAM PBB mencatat bahwa ...',
    opsi: [
      'Indonesia merupakan anggota tetap DK PBB yang memiliki hak veto sejak tahun 1950',
      'Indonesia telah 4 kali terpilih sebagai Anggota Tidak Tetap DK PBB (1973–1974, 1995–1996, 2007–2008, 2019–2020) dan terpilih di Dewan HAM PBB 2024–2026 dengan rekor 186 suara',
      'Indonesia belum pernah menjadi anggota DK PBB maupun Dewan HAM PBB sejak kembali bergabung pada 1966',
      'Indonesia hanya pernah satu kali menjadi anggota DK PBB pada masa Perang Kemerdekaan 1945–1949'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Indonesia telah 4 kali dipercaya dunia sebagai Anggota Tidak Tetap DK PBB dan terpilih kembali sebagai anggota Dewan HAM PBB periode 2024–2026 dengan perolehan rekor 186 suara dari 193 negara.'
  },
  {
    id: 32,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Dalam memperjuangkan kemerdekaan bangsa Palestina di forum PBB dan OKI, Indonesia secara konsisten mendorong penyelesaian konflik melalui Two-State Solution (Solusi Dua Negara) yang berarti ...',
    opsi: [
      'Membagi wilayah Palestina kepada negara-negara adidaya anggota tetap Dewan Keamanan PBB',
      'Resolusi konflik internasional yang mengakui berdirinya dua negara berdaulat, yakni Palestina merdeka yang hidup berdampingan secara damai dengan Israel berlandaskan perbatasan pra-1967',
      'Menjadikan seluruh wilayah Timur Tengah sebagai zona administrasi langsung di bawah sekretariat ASEAN',
      'Menghapuskan kedaulatan seluruh negara di kawasan Laut Mediterania'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Two-State Solution (Solusi Dua Negara) adalah prinsip resolusi konflik internasional yang mengakui berdirinya negara Palestina yang berdaulat berdampingan secara damai dengan batas perbatasan pra-1967.'
  },
  {
    id: 33,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Melalui Organisasi Kerja Sama Islam (OKI) yang bermarkas di Jeddah, Indonesia memimpin Komite Enam OKI (1993–1996) hingga berhasil memfasilitasi penandatanganan Perjanjian Perdamaian Final (Final Peace Agreement) di Jakarta pada 2 September 1996 yang mengakhiri konflik bersenjata antara ...',
    opsi: [
      'Pemerintah Kamboja dan faksi Khmer Merah',
      'Pemerintah Filipina dan Front Pembebasan Nasional Moro (MNLF) pimpinan Nur Misuari',
      'Pemerintah Mesir dan Inggris-Prancis dalam Krisis Terusan Suez',
      'Pemerintah Lebanon dan milisi di Republik Demokratik Kongo'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Diplomasi perdamaian Indonesia melalui Komite Enam OKI berhasil mendamaikan Pemerintah Republik Filipina dan faksi MNLF Nur Misuari melalui Final Peace Agreement di Jakarta pada 2 September 1996.'
  },
  {
    id: 34,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Pada tahun 2016, Indonesia menjadi tuan rumah KTT Luar Biasa OKI ke-5 di Jakarta. Capaian utama dari pertemuan tingkat tinggi tersebut adalah ...',
    opsi: [
      'Pembentukan mata uang tunggal bagi seluruh negara anggota OKI di Asia dan Afrika',
      'Lahirnya Deklarasi Jakarta (Jakarta Declaration) dan Resolusi Khusus mengenai Palestina dan Al-Quds Al-Syarif serta seruan boikot produk dari wilayah pendudukan ilegal Israel',
      'Pembubaran permanen Komite Perdamaian OKI di kawasan Asia Tenggara',
      'Kesepakatan pembangunan pangkalan senjata nuklir bersama di Timur Tengah'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'KTT Luar Biasa OKI ke-5 di Jakarta (2016) menghasilkan Deklarasi Jakarta dan resolusi perlindungan status Al-Quds Al-Syarif serta penguatan boikot terhadap pemukiman ilegal.'
  },
  {
    id: 35,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Sebagai satu-satunya negara di Asia Tenggara yang menjadi anggota tetap G20, Indonesia memegang Presidensi KTT G20 di Nusa Dua, Bali pada 15–16 November 2022. Tema yang diusung serta terobosan dana kesehatan global yang lahir dari kepemimpinan Indonesia tersebut adalah ...',
    opsi: [
      'Tema “A True Partner for World Peace” dan pembentukan dana militer SEANWFZ',
      'Tema “Recover Together, Recover Stronger” serta peluncuran Pandemic Fund (bekerja sama dengan Bank Dunia & WHO) dan komitmen transisi energi JETP',
      'Tema “Mendayung Antara Dua Karang” dan penghapusan seluruh perdagangan internasional',
      'Tema “One Vision, One Identity” dan pembentukan Pakta Pertahanan Atlantik Utara'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Presidensi G20 Bali 2022 sukses mengusung tema "Recover Together, Recover Stronger", meluncurkan Pandemic Fund untuk ketahanan kesehatan dunia, dan komitmen Just Energy Transition Partnership (JETP).'
  },
  {
    id: 36,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'G20 menerapkan sistem kepemimpinan Troika dalam penyelenggaraan presidensi tahunannya. Yang dimaksud dengan sistem Troika adalah ...',
    opsi: [
      'Kepemimpinan tetap oleh tiga negara pemilik senjata nuklir terbesar di dunia',
      'Format kepemimpinan tiga serangkai yang terdiri dari negara pemegang presidensi tahun sebelumnya, tahun berjalan, dan tahun berikutnya',
      'Pembagian hak suara berdasarkan tiga benua terbesar tanpa pergiliran tuan rumah',
      'Sistem pemungutan suara tertutup yang hanya diikuti oleh tiga menteri keuangan Eropa'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Sistem Troika G20 adalah mekanisme kepemimpinan tiga serangkai yang memadukan presidensi tahun lalu (past), tahun berjalan (present), dan tahun berikutnya (future) demi kontinuitas agenda.'
  },
  {
    id: 37,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Pengiriman Pasukan Pemelihara Perdamaian PBB oleh Indonesia (Kontingen Garuda) merupakan wujud pelaksanaan Operasi Militer Selain Perang (OMSP) sesuai UU No. 34 Tahun 2004 Pasal 7. Misi pertama Kontingen Garuda I dikirimkan pada Januari 1957 untuk merespons Krisis Terusan Suez dengan tujuan negara ...',
    opsi: [
      'Lebanon Selatan (sebagai bagian dari misi UNIFIL)',
      'Republik Demokratik Kongo (sebagai bagian dari misi MONUSCO)',
      'Semenanjung Sinai, Mesir (sebagai bagian dari misi UNEF di bawah komando Letkol Hartoyo)',
      'Bosnia-Herzegovina (sebagai bagian dari misi UNPROFOR)'
    ],
    jawabanBenar: 2, // C
    penjelasan: 'Kontingen Garuda I diberangkatkan pada 8 Januari 1957 menuju Semenanjung Sinai, Mesir di bawah komando Letkol Inf. Hartoyo (Yonif 15/Diponegoro) dalam misi UNEF menyusul Krisis Terusan Suez.'
  },
  {
    id: 38,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Saat ini Indonesia termasuk Top 10 kontributor pasukan perdamaian PBB di dunia dengan dua misi aktif terbesar, yaitu menjaga garis demarkasi Blue Line di Lebanon Selatan dan melindungi warga sipil di Republik Demokratik Kongo. Nama kedua misi PBB tersebut secara berturut-turut adalah ...',
    opsi: [
      'UNEF dan UNPROFOR',
      'UNIFIL (di Naqoura, Lebanon Selatan) dan MONUSCO (di Goma, Republik Demokratik Kongo)',
      'UNTAC dan UNMIS',
      'MINUSCA dan UNAMID'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Dua misi penjaga perdamaian PBB terbesar Kontingen Garuda saat ini adalah UNIFIL di Naqoura Lebanon Selatan (penjaga Blue Line) dan MONUSCO di Goma Republik Demokratik Kongo.'
  },
  {
    id: 39,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Prajurit Kontingen Garuda (termasuk prajurit perempuan / Srikandi Garuda) sangat dihormati oleh masyarakat lokal di daerah konflik karena menerapkan pendekatan Winning Hearts and Minds, yang diwujudkan melalui ...',
    opsi: [
      'Penggunaan senjata berat secara represif terhadap warga sipil di sekitar markas PBB',
      'Pendekatan kebudayaan, senyum-sapa-salam, gotong royong, pengobatan gratis, pembangunan air bersih, serta pendampingan korban trauma perempuan dan anak',
      'Pengambilalihan pemerintahan lokal dan penghapusan adat istiadat masyarakat setempat',
      'Penolakan berinteraksi dengan warga lokal maupun pengungsi selama masa penugasan'
    ],
    jawabanBenar: 1, // B
    penjelasan: 'Winning Hearts and Minds adalah pendekatan diplomasi kultural dan kemanusiaan prajurit Garuda lewat salam sapa, bakti sosial, sanitasi air bersih, serta pendampingan trauma psikologis oleh Srikandi Garuda.'
  },
  {
    id: 40,
    kategori: 'modul2',
    labelKategori: 'Materi 2 • Peran Internasional',
    pertanyaan: 'Dalam menyusun laporan studi geopolitik dan hubungan internasional di era digital, siswa wajib memvalidasi informasi menggunakan teknik CRAAP Test (Currency, Relevance, Authority, Accuracy, Purpose). Manakah di bawah ini yang merupakan pasangan domain rujukan primer resmi yang paling kredibel untuk memverifikasi kebijakan diplomasi Indonesia dan misi perdamaian PBB?',
    opsi: [
      'kemlu.go.id dan peacekeeping.un.org',
      'geopolitik-dunia.blogspot.com dan pesan berantai grup WhatsApp',
      'Video opini anonim di TikTok dan info-perang.wordpress.com',
      'Kolom komentar media sosial Instagram dan forum diskusi tanpa redaksi'
    ],
    jawabanBenar: 0, // A
    penjelasan: 'Situs kemlu.go.id (Kementerian Luar Negeri RI) dan peacekeeping.un.org (Misi Penjaga Perdamaian PBB) adalah domain institusi resmi berotoritas tinggi (Authority) dan memiliki akurasi faktual terverifikasi (Accuracy).'
  }
];

/**
 * Helper: Mengacak urutan array menggunakan algoritma Fisher-Yates
 */
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Helper: Mengambil paket soal berdasarkan mode/filter yang dipilih
 * Mengacak urutan soal dan mengacak 4 posisi opsi jawaban per soal tanpa mengubah kunci
 */
export function generateQuizDeck(filter = 'modul1', count = 20) {
  let pool = [];

  if (filter === 'modul1') {
    pool = bankSoal.filter(q => q.kategori === 'modul1');
    pool = shuffleArray(pool).slice(0, count);
  } else if (filter === 'modul2') {
    pool = bankSoal.filter(q => q.kategori === 'modul2');
    pool = shuffleArray(pool).slice(0, count);
  } else if (filter === 'all') {
    pool = shuffleArray(bankSoal).slice(0, count);
  } else {
    // Default 'mix': ambil proporsional 50% Modul 1 dan 50% Modul 2
    const half = Math.floor(count / 2);
    const m1 = shuffleArray(bankSoal.filter(q => q.kategori === 'modul1')).slice(0, half);
    const m2 = shuffleArray(bankSoal.filter(q => q.kategori === 'modul2')).slice(0, count - half);
    pool = shuffleArray([...m1, ...m2]);
  }

  // Acak opsi jawaban di setiap soal dengan tetap mempertahankan pemetaan jawaban benar
  return pool.map((q, idx) => {
    const items = q.opsi.map((optText, optIdx) => ({
      text: optText,
      isCorrect: optIdx === q.jawabanBenar
    }));

    const shuffledItems = shuffleArray(items);
    const newJawabanBenarIndex = shuffledItems.findIndex(item => item.isCorrect);

    return {
      indexNomor: idx + 1,
      id: q.id,
      kategori: q.kategori,
      labelKategori: q.labelKategori,
      pertanyaan: q.pertanyaan,
      opsi: shuffledItems.map(item => item.text),
      jawabanBenar: newJawabanBenarIndex,
      penjelasan: q.penjelasan
    };
  });
}

