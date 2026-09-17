/* =========================================================================
   DATA KAIN — sumber tunggal untuk halaman katalog & product knowledge.
   Menambah kain baru = menyalin satu blok di bawah, lalu ubah isinya.
   Field `gsm` dipakai untuk filter gramasi (isi angka rata-rata).
   ========================================================================= */
window.KAIN = [
  /* ---------------- Kaos & Rajut ---------------- */
  {
    id: "combed-30s",
    nama: "Katun Combed 30s",
    kategori: "Kaos & Rajut",
    komposisi: "100% katun (benang combed)",
    gramasi: "140 – 160 gsm",
    gsm: 150,
    lebar: "Tubular 90 cm / open width 160 cm",
    konstruksi: "Single knit",
    tekstur: "Halus, ringan, jatuh mengikuti badan",
    satuan: "Kiloan (roll ±25 kg) atau meteran",
    warna: "60+ warna ready stock",
    swatch: ["#e9e4dc", "#b9b1a5"],
    kelebihan: [
      "Paling adem dan nyaman untuk iklim tropis",
      "Serat halus, hasil sablon rapi dan tajam",
      "Pilihan warna paling lengkap di pasaran"
    ],
    kekurangan: [
      "Lebih tipis, kurang cocok untuk kaos oversized tebal",
      "Bisa menyusut 3–5% pada pencucian pertama"
    ],
    cocok: ["Kaos distro", "Kaos promosi", "Kaos komunitas", "Inner hijab"],
    perawatan: "Cuci dengan air dingin, balik bagian dalam saat menjemur, hindari pemutih dan setrika langsung di atas sablon.",
    catatan: "Combed 30s adalah standar kaos retail Indonesia. Untuk brand yang ingin kesan premium ringan, ini pilihan paling aman."
  },
  {
    id: "combed-24s",
    nama: "Katun Combed 24s",
    kategori: "Kaos & Rajut",
    komposisi: "100% katun (benang combed)",
    gramasi: "170 – 190 gsm",
    gsm: 180,
    lebar: "Tubular 95 cm / open width 170 cm",
    konstruksi: "Single knit",
    tekstur: "Sedang, sedikit lebih berisi dari 30s",
    satuan: "Kiloan (roll ±25 kg) atau meteran",
    warna: "50+ warna ready stock",
    swatch: ["#d8d2c6", "#a79f90"],
    kelebihan: [
      "Tebal seimbang — tidak menerawang, tetap adem",
      "Bentuk kaos lebih rapi dan tidak mudah melar",
      "Favorit untuk kaos brand lokal dan seragam kelas"
    ],
    kekurangan: [
      "Sedikit lebih panas dibanding 30s",
      "Harga per potong lebih tinggi karena bahan lebih berat"
    ],
    cocok: ["Kaos brand lokal", "Kaos oversized", "Seragam kelas", "Merchandise"],
    perawatan: "Cuci terpisah untuk warna gelap pada 3 kali pencucian pertama. Jemur terbalik di tempat teduh.",
    catatan: "Jika ragu memilih antara 30s dan 20s, ambil 24s. Ini jalan tengah yang paling sering dipesan ulang."
  },
  {
    id: "combed-20s",
    nama: "Katun Combed 20s",
    kategori: "Kaos & Rajut",
    komposisi: "100% katun (benang combed)",
    gramasi: "200 – 220 gsm",
    gsm: 210,
    lebar: "Tubular 100 cm / open width 180 cm",
    konstruksi: "Single knit",
    tekstur: "Tebal, kokoh, permukaan padat",
    satuan: "Kiloan (roll ±25 kg) atau meteran",
    warna: "40+ warna ready stock",
    swatch: ["#c9c2b4", "#8f8878"],
    kelebihan: [
      "Tebal dan tidak menerawang, terlihat mewah",
      "Awet dipakai bertahun-tahun, cocok untuk heavyweight tee",
      "Jatuh kain bagus untuk potongan boxy/oversized"
    ],
    kekurangan: [
      "Lebih panas dipakai saat siang hari",
      "Waktu kering lebih lama setelah dicuci"
    ],
    cocok: ["Heavyweight tee", "Kaos oversized", "Kaos outdoor", "Kaos event premium"],
    perawatan: "Hindari mesin pengering bersuhu tinggi agar tidak menyusut berlebihan.",
    catatan: "Tren streetwear membuat 20s makin diminati. Perhatikan biaya produksi karena konsumsi bahan per potong lebih besar."
  },
  {
    id: "cotton-carded",
    nama: "Cotton Carded 20s",
    kategori: "Kaos & Rajut",
    komposisi: "100% katun (benang carded)",
    gramasi: "180 – 210 gsm",
    gsm: 195,
    lebar: "Tubular 95 cm / open width 170 cm",
    konstruksi: "Single knit",
    tekstur: "Sedikit berbulu halus, serat kurang rata",
    satuan: "Kiloan (roll ±25 kg)",
    warna: "30+ warna dasar",
    swatch: ["#d6cec0", "#9c9384"],
    kelebihan: [
      "Harga paling ekonomis untuk kaos berbahan katun asli",
      "Tetap menyerap keringat karena 100% katun",
      "Ideal untuk order massal dengan budget ketat"
    ],
    kekurangan: [
      "Permukaan kurang halus dibanding combed",
      "Hasil sablon detail halus kurang setajam combed"
    ],
    cocok: ["Kaos partai/promosi", "Kaos pabrik", "Seragam kegiatan", "Kaos bagi-bagi"],
    perawatan: "Cuci normal. Setrika suhu sedang.",
    catatan: "Bedakan carded dan combed dengan meraba: carded terasa sedikit berbulu karena serat pendek tidak disisir."
  },
  {
    id: "cotton-bamboo",
    nama: "Katun Bamboo",
    kategori: "Kaos & Rajut",
    komposisi: "60% katun, 40% serat bambu (viscose)",
    gramasi: "150 – 170 gsm",
    gsm: 160,
    lebar: "Tubular 95 cm",
    konstruksi: "Single knit",
    tekstur: "Sangat lembut, dingin saat disentuh, jatuh",
    satuan: "Kiloan atau meteran",
    warna: "24 warna",
    swatch: ["#dbe3dc", "#9aab9f"],
    kelebihan: [
      "Terasa dingin dan lembut — kelas premium",
      "Anti bakteri alami, minim bau",
      "Drape bagus untuk potongan kaos modern"
    ],
    kekurangan: [
      "Harga di atas combed",
      "Lebih mudah melar bila dijemur digantung"
    ],
    cocok: ["Kaos premium", "Pakaian bayi & anak", "Baju tidur", "Inner"],
    perawatan: "Jemur dengan posisi rebah/dilipat, jangan digantung di bagian leher.",
    catatan: "Cocok untuk brand yang menargetkan pasar kaos premium dengan sentuhan lembut sejak pegangan pertama."
  },
  {
    id: "lacoste-cvc",
    nama: "Lacoste CVC (Pique)",
    kategori: "Kaos & Rajut",
    komposisi: "60% katun, 40% polyester",
    gramasi: "180 – 220 gsm",
    gsm: 200,
    lebar: "Tubular 100 cm",
    konstruksi: "Pique / rajut berpori",
    tekstur: "Bertekstur kotak-kotak kecil, berpori",
    satuan: "Kiloan (roll ±22 kg)",
    warna: "35+ warna",
    swatch: ["#cfd8dd", "#8d9aa3"],
    kelebihan: [
      "Standar bahan polo shirt di seluruh dunia",
      "Warna tidak mudah pudar berkat campuran polyester",
      "Pori-pori membuat sirkulasi udara baik"
    ],
    kekurangan: [
      "Kurang menyerap keringat dibanding katun murni",
      "Tekstur berpori membuat sablon halus kurang rapi (lebih cocok bordir)"
    ],
    cocok: ["Polo shirt", "Seragam kantor", "Kaos kerah event", "Merchandise korporat"],
    perawatan: "Cuci suhu normal, setrika suhu sedang dari sisi dalam.",
    catatan: "Untuk polo shirt, gunakan bordir logo — hasilnya jauh lebih rapi dan awet dibanding sablon di atas tekstur pique."
  },
  {
    id: "baby-terry",
    nama: "Baby Terry",
    kategori: "Kaos & Rajut",
    komposisi: "70% katun, 30% polyester",
    gramasi: "240 – 280 gsm",
    gsm: 260,
    lebar: "Open width 180 cm",
    konstruksi: "French terry (bagian dalam berbentuk loop)",
    tekstur: "Luar halus, dalam berlubang seperti handuk kecil",
    satuan: "Kiloan (roll ±25 kg)",
    warna: "28 warna",
    swatch: ["#cbc6bd", "#8a8378"],
    kelebihan: [
      "Tebal tapi tidak panas — ideal untuk hoodie harian",
      "Menyerap keringat lebih baik dari fleece",
      "Bagian dalam loop memberi kesan casual yang disukai"
    ],
    kekurangan: [
      "Loop dalam bisa tertarik bila tersangkut benda tajam",
      "Kurang hangat untuk daerah dingin"
    ],
    cocok: ["Hoodie", "Sweater", "Jogger pants", "Jaket santai"],
    perawatan: "Balik saat mencuci dan menjemur agar bagian loop tidak kusut.",
    catatan: "Baby terry adalah pilihan hoodie untuk Indonesia. Fleece sering terasa terlalu panas di kota dataran rendah."
  },
  {
    id: "fleece-cvc",
    nama: "Fleece CVC",
    kategori: "Kaos & Rajut",
    komposisi: "60% katun, 40% polyester",
    gramasi: "280 – 320 gsm",
    gsm: 300,
    lebar: "Open width 180 cm",
    konstruksi: "Brushed back fleece",
    tekstur: "Bagian dalam berbulu halus",
    satuan: "Kiloan (roll ±25 kg)",
    warna: "26 warna",
    swatch: ["#c4bdb2", "#7f786d"],
    kelebihan: [
      "Hangat dan empuk, kesan tebal premium",
      "Bentuk jaket/hoodie tegak dan rapi",
      "Bagian dalam nyaman langsung di kulit"
    ],
    kekurangan: [
      "Terasa panas di daerah dataran rendah",
      "Bulu dalam bisa menipis setelah banyak pencucian"
    ],
    cocok: ["Hoodie tebal", "Jaket varsity", "Sweater dingin", "Seragam komunitas"],
    perawatan: "Cuci air dingin, jangan disikat pada bagian berbulu.",
    catatan: "Untuk daerah pegunungan atau brand outdoor, fleece jauh lebih tepat dibanding baby terry."
  },
  {
    id: "hyget",
    nama: "Hyget / PE Kaos",
    kategori: "Kaos & Rajut",
    komposisi: "100% polyester",
    gramasi: "100 – 130 gsm",
    gsm: 115,
    lebar: "Tubular 90 cm",
    konstruksi: "Single knit polyester",
    tekstur: "Tipis, licin, ringan",
    satuan: "Kiloan atau lembaran",
    warna: "20+ warna terang",
    swatch: ["#dfd9cf", "#a49a8c"],
    kelebihan: [
      "Harga paling murah untuk kaos massal",
      "Cepat kering dan ringan dibawa",
      "Warna cerah menyala, cocok untuk kaos kampanye"
    ],
    kekurangan: [
      "Tidak menyerap keringat, panas dipakai lama",
      "Tipis dan cenderung menerawang"
    ],
    cocok: ["Kaos kampanye", "Kaos partai", "Kaos event sekali pakai", "Kaos bagi-bagi"],
    perawatan: "Cuci air dingin, setrika suhu rendah agar tidak meleleh.",
    catatan: "Jelaskan sejak awal ke klien bahwa hyget bukan bahan pakai harian — ini bahan volume dengan budget terendah."
  },
  {
    id: "dryfit-micro",
    nama: "Dry Fit / Micro Polyester",
    kategori: "Kaos & Rajut",
    komposisi: "100% polyester microfiber",
    gramasi: "130 – 160 gsm",
    gsm: 145,
    lebar: "Open width 150 – 160 cm",
    konstruksi: "Interlock / mesh berpori",
    tekstur: "Licin, elastis ringan, cepat kering",
    satuan: "Meteran atau roll",
    warna: "30+ warna, bisa printing sublim",
    swatch: ["#cdd6d6", "#8b9a9a"],
    kelebihan: [
      "Menghantar keringat keluar (moisture wicking)",
      "Sangat cepat kering, ringan saat berkeringat",
      "Mendukung printing sublimasi full colour"
    ],
    kekurangan: [
      "Mudah menyimpan bau jika tidak langsung dicuci",
      "Kurang nyaman untuk pemakaian santai sehari-hari"
    ],
    cocok: ["Jersey olahraga", "Baju futsal & lari", "Seragam gowes", "Baju senam"],
    perawatan: "Cuci segera setelah dipakai, hindari pelembut kain agar daya serap keringat tetap bekerja.",
    catatan: "Wajib untuk jersey printing. Sublimasi hanya menempel sempurna pada serat polyester."
  },

  /* ---------------- Katun Woven ---------------- */
  {
    id: "katun-jepang",
    nama: "Katun Jepang",
    kategori: "Katun Woven",
    komposisi: "100% katun (sebagian varian 90% katun 10% poly)",
    gramasi: "120 – 140 gsm",
    gsm: 130,
    lebar: "110 – 150 cm",
    konstruksi: "Plain weave kerapatan tinggi",
    tekstur: "Halus, agak dingin, motif tajam",
    satuan: "Meteran / roll 40 – 50 yard",
    warna: "Polos & ratusan motif",
    swatch: ["#e4ded2", "#b0a692"],
    kelebihan: [
      "Warna motif tajam dan tidak mudah luntur",
      "Adem, halus, dan nyaman untuk kemeja harian",
      "Serat rapat sehingga jahitan terlihat rapi"
    ],
    kekurangan: [
      "Harga di atas katun lokal",
      "Perlu disetrika karena mudah kusut"
    ],
    cocok: ["Kemeja pria & wanita", "Dress", "Seragam batik kombinasi", "Kerajinan/quilting"],
    perawatan: "Cuci dengan deterjen lembut, setrika suhu sedang saat kain agak lembap.",
    catatan: "Banyak 'katun jepang' di pasar sebenarnya katun lokal bermotif. Cek kerapatan dengan menerawang ke cahaya."
  },
  {
    id: "katun-toyobo",
    nama: "Katun Toyobo",
    kategori: "Katun Woven",
    komposisi: "100% katun premium",
    gramasi: "110 – 130 gsm",
    gsm: 120,
    lebar: "150 cm",
    konstruksi: "Plain weave halus",
    tekstur: "Ringan, licin, sedikit berkilau lembut",
    satuan: "Meteran / roll",
    warna: "40+ warna polos",
    swatch: ["#e8e2d6", "#b7ad98"],
    kelebihan: [
      "Jatuh kain sangat rapi untuk kemeja formal",
      "Adem dan ringan meski berwarna gelap",
      "Terlihat mahal tanpa kesan berkilau berlebihan"
    ],
    kekurangan: [
      "Mudah kusut bila dilipat lama",
      "Harga premium"
    ],
    cocok: ["Kemeja koko", "Kemeja formal", "Gamis pria", "Seragam kantor kelas atas"],
    perawatan: "Gantung setelah dipakai, setrika suhu sedang dengan alas kain tipis.",
    catatan: "Pilihan utama untuk baju koko premium menjelang Lebaran — pesan jauh hari karena stok cepat habis."
  },
  {
    id: "katun-poplin",
    nama: "Katun Poplin",
    kategori: "Katun Woven",
    komposisi: "100% katun",
    gramasi: "110 – 130 gsm",
    gsm: 120,
    lebar: "115 – 150 cm",
    konstruksi: "Poplin (plain weave rapat)",
    tekstur: "Rata, sedikit kaku, permukaan bersih",
    satuan: "Meteran / roll",
    warna: "50+ warna polos",
    swatch: ["#e6e1d8", "#b3aa9b"],
    kelebihan: [
      "Permukaan rata sehingga bordir dan print rapi",
      "Harga bersahabat untuk produksi kemeja massal",
      "Mudah dijahit, tidak licin di mesin"
    ],
    kekurangan: [
      "Terasa agak kaku sebelum beberapa kali pencucian",
      "Mudah kusut"
    ],
    cocok: ["Kemeja seragam", "Baju anak", "Apron & seragam F&B", "Tas kain ringan"],
    perawatan: "Cuci normal, setrika suhu sedang-tinggi.",
    catatan: "Untuk seragam sekolah dan F&B, poplin memberi rasio harga-tampilan terbaik."
  },
  {
    id: "linen-euro",
    nama: "Linen Euro",
    kategori: "Katun Woven",
    komposisi: "70% katun, 30% linen (varian linen look: 100% polyester)",
    gramasi: "160 – 190 gsm",
    gsm: 175,
    lebar: "145 – 150 cm",
    konstruksi: "Plain weave serat kasar",
    tekstur: "Bertekstur serat terlihat, kaku alami",
    satuan: "Meteran / roll",
    warna: "30+ warna earth tone",
    swatch: ["#ded5c3", "#b09c7f"],
    kelebihan: [
      "Tampilan natural dan berkelas, tren untuk fashion modest",
      "Adem dan bersirkulasi baik",
      "Jatuh kain tegas, bagus untuk kulot dan outer"
    ],
    kekurangan: [
      "Mudah kusut — bagian dari karakter linen",
      "Serat bisa menipis di titik lipatan bila sering disetrika panas"
    ],
    cocok: ["Kemeja santai", "Kulot & celana", "Outer", "Gamis casual"],
    perawatan: "Cuci dengan tangan atau mesin mode lembut, setrika saat masih lembap.",
    catatan: "Bedakan linen asli dan 'linen look' polyester: linen asli terasa dingin dan makin lembut setelah dicuci."
  },
  {
    id: "tc-teteron",
    nama: "TC (Teteron Cotton)",
    kategori: "Katun Woven",
    komposisi: "35% katun, 65% polyester",
    gramasi: "130 – 160 gsm",
    gsm: 145,
    lebar: "150 cm",
    konstruksi: "Plain weave",
    tekstur: "Halus, kaku ringan, tidak mudah kusut",
    satuan: "Meteran / roll",
    warna: "40+ warna",
    swatch: ["#dcd9d0", "#a5a094"],
    kelebihan: [
      "Tidak mudah kusut dan cepat kering",
      "Warna stabil meski sering dicuci",
      "Harga ekonomis untuk seragam jumlah besar"
    ],
    kekurangan: [
      "Kurang menyerap keringat dibanding katun murni",
      "Terasa lebih panas saat siang"
    ],
    cocok: ["Seragam sekolah", "Seragam kantor", "Kemeja kerja lapangan", "Sprei ekonomis"],
    perawatan: "Cuci normal, setrika suhu sedang.",
    catatan: "Untuk seragam yang dipakai setiap hari dan dicuci sering, TC lebih tahan bentuk dibanding katun 100%."
  },

  /* ---------------- Rayon & Viscose ---------------- */
  {
    id: "rayon-viscose",
    nama: "Rayon Viscose",
    kategori: "Rayon & Viscose",
    komposisi: "100% rayon viscose",
    gramasi: "110 – 130 gsm",
    gsm: 120,
    lebar: "115 – 150 cm",
    konstruksi: "Plain weave ringan",
    tekstur: "Sangat jatuh, licin, dingin di kulit",
    satuan: "Meteran / roll",
    warna: "Polos & motif",
    swatch: ["#e3dee9", "#a89fb5"],
    kelebihan: [
      "Paling adem untuk daerah panas",
      "Jatuh kain mengalir, cantik untuk dress dan daster",
      "Menyerap keringat dengan baik"
    ],
    kekurangan: [
      "Melemah saat basah, jangan diperas terlalu kuat",
      "Bisa menyusut bila direndam air panas"
    ],
    cocok: ["Daster & homewear", "Dress", "Blouse", "Kemeja santai"],
    perawatan: "Cuci air dingin, jangan diperas kuat, jemur di tempat teduh.",
    catatan: "Rayon jadi primadona busana rumahan karena adem. Sarankan pelanggan mencuci dengan tangan untuk potongan berlapis."
  },
  {
    id: "rayon-spandex",
    nama: "Rayon Spandex",
    kategori: "Rayon & Viscose",
    komposisi: "95% rayon, 5% spandex",
    gramasi: "150 – 180 gsm",
    gsm: 165,
    lebar: "150 – 160 cm",
    konstruksi: "Rajut elastis",
    tekstur: "Lentur dua arah, lembut, mengikuti bentuk tubuh",
    satuan: "Kiloan atau meteran",
    warna: "30+ warna",
    swatch: ["#ded8e3", "#a197ac"],
    kelebihan: [
      "Elastis, nyaman untuk potongan pas badan",
      "Tidak mudah kusut",
      "Tetap adem berkat serat rayon"
    ],
    kekurangan: [
      "Elastisitas berkurang bila terkena panas tinggi",
      "Harus dijahit dengan mesin obras/overdeck agar jahitan ikut melar"
    ],
    cocok: ["Legging", "Inner hijab", "Kaos wanita", "Baju senam ringan"],
    perawatan: "Hindari air panas dan pengering mesin agar spandex tidak mati.",
    catatan: "Jangan setrika langsung di atas kain — spandex akan kehilangan daya elastisnya secara permanen."
  },
  {
    id: "rayon-crinkle",
    nama: "Rayon Crinkle",
    kategori: "Rayon & Viscose",
    komposisi: "100% rayon",
    gramasi: "120 – 140 gsm",
    gsm: 130,
    lebar: "140 cm (setelah crinkle menyusut)",
    konstruksi: "Plain weave dengan proses crinkle",
    tekstur: "Berkerut alami, tidak rata",
    satuan: "Meteran / roll",
    warna: "25+ warna",
    swatch: ["#e0dbd2", "#aca394"],
    kelebihan: [
      "Tidak perlu disetrika — kerutan adalah motifnya",
      "Ringan dan adem, praktis untuk bepergian",
      "Memberi volume pada gamis dan rok"
    ],
    kekurangan: [
      "Lebar kain lebih sempit karena efek kerut",
      "Kerutan bisa berkurang jika disetrika panas"
    ],
    cocok: ["Gamis", "Rok panjang", "Tunik", "Outer ringan"],
    perawatan: "Cuci lembut, jangan disetrika. Keringkan dengan cara digantung.",
    catatan: "Hitung kebutuhan bahan dengan lebar setelah crinkle, bukan lebar sebelum proses — banyak konveksi kekurangan bahan karena ini."
  },

  /* ---------------- Hijab & Gamis ---------------- */
  {
    id: "ceruty-babydoll",
    nama: "Ceruty Babydoll",
    kategori: "Hijab & Gamis",
    komposisi: "100% polyester",
    gramasi: "80 – 100 gsm",
    gsm: 90,
    lebar: "150 cm",
    konstruksi: "Crepe halus",
    tekstur: "Ringan, sedikit bertekstur pasir, tidak licin",
    satuan: "Meteran / roll 25 – 50 yard",
    warna: "50+ warna",
    swatch: ["#e6dee6", "#b0a2b2"],
    kelebihan: [
      "Ringan dan tidak licin saat dikenakan sebagai hijab",
      "Jatuh kain rapi tanpa perlu banyak disetrika",
      "Tersedia sangat banyak pilihan warna"
    ],
    kekurangan: [
      "Menerawang, wajib pakai furing untuk gamis",
      "Kurang menyerap keringat"
    ],
    cocok: ["Hijab pashmina & segi empat", "Gamis berlapis", "Tunik", "Outer ringan"],
    perawatan: "Cuci dengan tangan, setrika suhu rendah.",
    catatan: "Untuk gamis, pasangkan dengan furing ero atau hycon agar tidak menerawang dan tetap adem."
  },
  {
    id: "wolfis",
    nama: "Wolfis (Wollycrepe)",
    kategori: "Hijab & Gamis",
    komposisi: "100% polyester",
    gramasi: "110 – 130 gsm",
    gsm: 120,
    lebar: "150 cm",
    konstruksi: "Crepe rapat",
    tekstur: "Rata, adem, tidak menerawang",
    satuan: "Meteran / roll",
    warna: "60+ warna",
    swatch: ["#dcd7cd", "#a39b8c"],
    kelebihan: [
      "Tidak menerawang sehingga tidak perlu furing",
      "Warna tidak mudah pudar",
      "Harga terjangkau untuk produksi gamis massal"
    ],
    kekurangan: [
      "Kurang menyerap keringat",
      "Terasa panas bila dipakai di ruang tanpa sirkulasi"
    ],
    cocok: ["Gamis syar'i", "Seragam pengajian", "Khimar", "Rok panjang"],
    perawatan: "Cuci normal, setrika suhu rendah–sedang.",
    catatan: "Wolfis adalah tulang punggung produksi gamis seragam karena warnanya seragam antar-roll bila diambil satu batch."
  },
  {
    id: "moscrepe",
    nama: "Moscrepe",
    kategori: "Hijab & Gamis",
    komposisi: "100% polyester",
    gramasi: "130 – 150 gsm",
    gsm: 140,
    lebar: "150 cm",
    konstruksi: "Crepe bertekstur",
    tekstur: "Bertekstur pasir halus, lentur, jatuh",
    satuan: "Meteran / roll",
    warna: "40+ warna",
    swatch: ["#d9d3cb", "#a29889"],
    kelebihan: [
      "Tidak menerawang dan tidak perlu disetrika",
      "Jatuh kain mewah untuk gamis dan kulot",
      "Tahan kusut saat dibawa bepergian"
    ],
    kekurangan: [
      "Kurang menyerap keringat",
      "Permukaan bertekstur membuat bordir halus kurang tajam"
    ],
    cocok: ["Gamis", "Kulot", "Blouse kerja", "Seragam kondangan"],
    perawatan: "Cuci mesin mode lembut, gantung — hampir tidak perlu setrika.",
    catatan: "Pilihan aman untuk seragam keluarga: rapi dipakai seharian tanpa perlu disetrika ulang."
  },
  {
    id: "diamond-italiano",
    nama: "Diamond Italiano",
    kategori: "Hijab & Gamis",
    komposisi: "100% polyester",
    gramasi: "100 – 120 gsm",
    gsm: 110,
    lebar: "150 cm",
    konstruksi: "Crepe bertekstur berlian",
    tekstur: "Bertekstur timbul halus, ringan",
    satuan: "Meteran / roll",
    warna: "45+ warna",
    swatch: ["#e1dbdf", "#aca0a8"],
    kelebihan: [
      "Ringan namun tetap tidak terlalu menerawang",
      "Tekstur membuat tampilan lebih berkelas",
      "Tidak mudah kusut"
    ],
    kekurangan: [
      "Perlu furing untuk warna terang",
      "Tidak menyerap keringat"
    ],
    cocok: ["Hijab segi empat", "Gamis", "Tunik", "Dress muslim"],
    perawatan: "Cuci tangan atau mesin lembut, jangan disetrika panas agar tekstur tidak rata.",
    catatan: "Sering dipakai untuk hijab segi empat karena teksturnya membuat lipatan lebih rapi di wajah."
  },
  {
    id: "sifon-silk",
    nama: "Sifon Silk",
    kategori: "Hijab & Gamis",
    komposisi: "100% polyester",
    gramasi: "60 – 80 gsm",
    gsm: 70,
    lebar: "150 cm",
    konstruksi: "Chiffon tipis",
    tekstur: "Sangat tipis, licin, ringan",
    satuan: "Meteran / roll",
    warna: "60+ warna & motif printing",
    swatch: ["#eae4e8", "#bcb0ba"],
    kelebihan: [
      "Sangat ringan, cocok untuk layer dan detail",
      "Media terbaik untuk printing motif halus",
      "Harga ekonomis"
    ],
    kekurangan: [
      "Sangat menerawang, wajib lapis",
      "Licin sehingga sulit dijahit tanpa pengalaman"
    ],
    cocok: ["Hijab printing", "Layer gamis", "Lengan balon", "Aksen dress"],
    perawatan: "Cuci tangan dengan air dingin, jangan diperas, setrika suhu paling rendah.",
    catatan: "Gunakan jarum ukuran 9–11 dan kertas roti saat menjahit agar kain tidak tertarik mesin."
  },
  {
    id: "satin-roberto",
    nama: "Satin Roberto",
    kategori: "Hijab & Gamis",
    komposisi: "100% polyester",
    gramasi: "90 – 110 gsm",
    gsm: 100,
    lebar: "150 cm",
    konstruksi: "Satin weave",
    tekstur: "Berkilau di satu sisi, licin, jatuh",
    satuan: "Meteran / roll",
    warna: "50+ warna",
    swatch: ["#e7dfd4", "#bda98f"],
    kelebihan: [
      "Tampilan mewah dan berkilau untuk acara formal",
      "Jatuh kain mengalir sangat bagus",
      "Warna terlihat lebih dalam karena efek kilau"
    ],
    kekurangan: [
      "Mudah tergores dan meninggalkan bekas jarum",
      "Licin, butuh keahlian menjahit"
    ],
    cocok: ["Gaun pesta", "Kebaya modern", "Hijab formal", "Inner & furing mewah"],
    perawatan: "Cuci tangan, setrika dari sisi dalam dengan suhu rendah.",
    catatan: "Coba jahit di kain sisa dulu — bekas jarum pada satin tidak bisa dihilangkan."
  },

  /* ---------------- Seragam & Drill ---------------- */
  {
    id: "drill-japan",
    nama: "Japan Drill",
    kategori: "Seragam & Drill",
    komposisi: "65% katun, 35% polyester",
    gramasi: "230 – 260 gsm",
    gsm: 245,
    lebar: "150 cm",
    konstruksi: "Twill (garis diagonal rapat)",
    tekstur: "Serat diagonal halus, padat, sedikit lentur",
    satuan: "Meteran / roll 40 – 60 yard",
    warna: "35+ warna seragam",
    swatch: ["#cfcabf", "#8e877a"],
    kelebihan: [
      "Serat paling rapat di kelas drill — terlihat rapi dan mahal",
      "Kuat untuk pemakaian harian jangka panjang",
      "Warna stabil setelah puluhan kali pencucian"
    ],
    kekurangan: [
      "Harga paling tinggi di antara jenis drill",
      "Agak berat untuk kemeja lengan panjang di daerah panas"
    ],
    cocok: ["Seragam kantor", "Wearpack", "Jaket kerja", "Celana kerja"],
    perawatan: "Cuci normal, setrika suhu sedang-tinggi, jemur terbalik untuk warna gelap.",
    catatan: "Untuk seragam korporat yang dipakai bertahun-tahun, selisih harga dengan American drill biasanya terbayar oleh keawetan."
  },
  {
    id: "american-drill",
    nama: "American Drill",
    kategori: "Seragam & Drill",
    komposisi: "50% katun, 50% polyester",
    gramasi: "200 – 230 gsm",
    gsm: 215,
    lebar: "150 cm",
    konstruksi: "Twill sedang",
    tekstur: "Diagonal terlihat, lebih ringan dari japan drill",
    satuan: "Meteran / roll",
    warna: "30+ warna",
    swatch: ["#d2ccc1", "#948d80"],
    kelebihan: [
      "Harga menengah dengan tampilan tetap rapi",
      "Lebih ringan sehingga nyaman untuk seragam harian",
      "Mudah didapat dalam jumlah besar"
    ],
    kekurangan: [
      "Serat tidak serapat japan drill",
      "Bisa muncul bulu halus setelah pemakaian lama"
    ],
    cocok: ["Seragam sekolah", "Seragam organisasi", "Kemeja lapangan", "Rok seragam"],
    perawatan: "Cuci normal, hindari pemutih pada warna gelap.",
    catatan: "Pilihan paling sering diambil untuk seragam sekolah karena keseimbangan harga dan kerapian."
  },
  {
    id: "twill-ripstop",
    nama: "Ripstop",
    kategori: "Seragam & Drill",
    komposisi: "65% polyester, 35% katun",
    gramasi: "180 – 210 gsm",
    gsm: 195,
    lebar: "150 cm",
    konstruksi: "Anyaman kotak penguat (ripstop)",
    tekstur: "Bermotif kotak-kotak halus timbul, ringan",
    satuan: "Meteran / roll",
    warna: "20+ warna termasuk motif loreng",
    swatch: ["#cdd1c4", "#8b9081"],
    kelebihan: [
      "Anyaman kotak mencegah sobekan melebar",
      "Ringan namun kuat untuk aktivitas lapangan",
      "Cepat kering"
    ],
    kekurangan: [
      "Tekstur kotak kurang cocok untuk seragam formal",
      "Kurang menyerap keringat"
    ],
    cocok: ["Seragam lapangan", "Baju outdoor", "Tactical pants", "Seragam pramuka/komunitas"],
    perawatan: "Cuci normal, hindari sikat kasar.",
    catatan: "Nama 'ripstop' berasal dari fungsinya: menghentikan robekan. Pilihan tepat untuk kerja lapangan."
  },
  {
    id: "oxford",
    nama: "Oxford",
    kategori: "Seragam & Drill",
    komposisi: "60% katun, 40% polyester",
    gramasi: "150 – 180 gsm",
    gsm: 165,
    lebar: "150 cm",
    konstruksi: "Basket weave",
    tekstur: "Tekstur anyaman terlihat, sedikit kasar",
    satuan: "Meteran / roll",
    warna: "25+ warna",
    swatch: ["#dad7cd", "#9fa094"],
    kelebihan: [
      "Tampilan kasual-formal yang khas",
      "Kuat dan tidak mudah kusut",
      "Cocok untuk kemeja kerja yang sering dipakai"
    ],
    kekurangan: [
      "Sedikit lebih kaku dari poplin",
      "Tekstur membuat sablon halus kurang rapi"
    ],
    cocok: ["Kemeja kantor kasual", "Seragam F&B", "Kemeja formal semi-santai"],
    perawatan: "Cuci normal, setrika suhu sedang.",
    catatan: "Oxford button-down adalah pilihan aman untuk seragam kantor yang ingin terlihat santai tapi rapi."
  },

  /* ---------------- Denim & Canvas ---------------- */
  {
    id: "denim",
    nama: "Denim",
    kategori: "Denim & Canvas",
    komposisi: "98% katun, 2% spandex (tersedia juga 100% katun rigid)",
    gramasi: "9 – 14 oz (≈ 300 – 470 gsm)",
    gsm: 380,
    lebar: "140 – 150 cm",
    konstruksi: "Twill denim (warp indigo, weft putih)",
    tekstur: "Kuat, diagonal khas, makin lentur setelah dipakai",
    satuan: "Meteran / roll",
    warna: "Indigo, black, light wash, non-wash",
    swatch: ["#c3cbd6", "#5a6d85"],
    kelebihan: [
      "Sangat awet, cocok untuk produk jangka panjang",
      "Karakter warna makin bagus seiring pemakaian (fading)",
      "Bisa dipakai untuk celana, jaket, hingga tas"
    ],
    kekurangan: [
      "Berat dan lama kering",
      "Warna indigo dapat luntur pada pencucian awal"
    ],
    cocok: ["Celana jeans", "Jaket denim", "Kemeja denim", "Tas & apron"],
    perawatan: "Cuci terbalik dengan air dingin, jangan direndam lama, jemur di tempat teduh.",
    catatan: "Satuan denim memakai ons (oz) per yard persegi. 11 oz nyaman untuk kemeja, 12–14 oz untuk celana."
  },
  {
    id: "canvas",
    nama: "Kanvas (Baby & Sueding)",
    kategori: "Denim & Canvas",
    komposisi: "100% katun atau katun-polyester",
    gramasi: "240 – 400 gsm (sesuai tipe)",
    gsm: 320,
    lebar: "150 cm",
    konstruksi: "Plain weave padat",
    tekstur: "Tebal, kaku, permukaan rata",
    satuan: "Meteran / roll",
    warna: "20+ warna netral",
    swatch: ["#ddd3c1", "#a8977c"],
    kelebihan: [
      "Sangat kuat, tahan beban berat",
      "Permukaan rata — ideal untuk sablon dan bordir besar",
      "Serbaguna untuk produk non-pakaian"
    ],
    kekurangan: [
      "Kaku dan berat untuk pakaian harian",
      "Perlu mesin jahit kuat dan jarum besar"
    ],
    cocok: ["Totebag", "Apron", "Jaket kerja", "Sepatu & interior"],
    perawatan: "Sikat lembut untuk noda, cuci air dingin, jemur terbalik.",
    catatan: "Baby canvas (±240 gsm) untuk totebag, canvas sueding (±380 gsm) untuk apron dan jaket kerja."
  },

  /* ---------------- Premium & Khusus ---------------- */
  {
    id: "velvet",
    nama: "Velvet / Bludru",
    kategori: "Premium & Khusus",
    komposisi: "90% polyester, 10% spandex",
    gramasi: "220 – 260 gsm",
    gsm: 240,
    lebar: "150 cm",
    konstruksi: "Pile weave berbulu pendek",
    tekstur: "Berbulu halus, memantulkan cahaya, elastis",
    satuan: "Meteran / roll",
    warna: "30+ warna pekat",
    swatch: ["#c3b0c6", "#6d5273"],
    kelebihan: [
      "Tampilan mewah untuk busana acara",
      "Elastis sehingga nyaman mengikuti bentuk tubuh",
      "Warna terlihat sangat pekat dan dalam"
    ],
    kekurangan: [
      "Arah bulu harus searah saat memotong — boros bahan",
      "Panas dipakai di siang hari"
    ],
    cocok: ["Gamis pesta", "Kebaya", "Blazer acara", "Dekorasi & panggung"],
    perawatan: "Cuci tangan, jangan disetrika langsung — gunakan uap dari sisi dalam.",
    catatan: "Selalu potong searah bulu untuk seluruh panel. Beda arah akan terlihat seperti beda warna."
  },
  {
    id: "scuba",
    nama: "Scuba",
    kategori: "Premium & Khusus",
    komposisi: "95% polyester, 5% spandex",
    gramasi: "260 – 300 gsm",
    gsm: 280,
    lebar: "150 – 160 cm",
    konstruksi: "Double knit berpori",
    tekstur: "Tebal, padat, elastis, permukaan rata",
    satuan: "Meteran / roll",
    warna: "25+ warna",
    swatch: ["#cbc9d2", "#7e7c8c"],
    kelebihan: [
      "Bentuk pakaian tegak dan rapi tanpa perlu interfacing",
      "Tidak mudah kusut dan tidak menerawang",
      "Tepi potongan tidak berserabut"
    ],
    kekurangan: [
      "Panas, kurang cocok untuk pemakaian seharian",
      "Berat dan agak tebal untuk gamis"
    ],
    cocok: ["Blazer", "Rok span", "Dress struktural", "Jaket fashion"],
    perawatan: "Cuci mesin mode lembut, setrika suhu rendah.",
    catatan: "Karena tepinya tidak berserabut, scuba memungkinkan finishing raw edge yang hemat waktu produksi."
  },
  {
    id: "tencel-lyocell",
    nama: "Tencel / Lyocell",
    kategori: "Premium & Khusus",
    komposisi: "100% lyocell (serat kayu eucalyptus)",
    gramasi: "120 – 150 gsm",
    gsm: 135,
    lebar: "145 – 150 cm",
    konstruksi: "Twill halus / plain weave",
    tekstur: "Sangat halus, dingin, berkilau lembut",
    satuan: "Meteran / roll",
    warna: "20+ warna",
    swatch: ["#e0e4e2", "#a2aeab"],
    kelebihan: [
      "Terasa dingin dan lembut seperti sutra",
      "Diproses secara ramah lingkungan (closed loop)",
      "Menyerap keringat lebih baik daripada katun"
    ],
    kekurangan: [
      "Harga premium",
      "Rentan meninggalkan bekas air bila terkena tetesan saat menyetrika"
    ],
    cocok: ["Kemeja premium", "Dress", "Sleepwear mewah", "Sprei hotel"],
    perawatan: "Cuci mode lembut air dingin, setrika dari sisi dalam.",
    catatan: "Untuk brand yang mengusung isu keberlanjutan, tencel adalah materi cerita yang kuat sekaligus nyaman dipakai."
  },
  {
    id: "furing-ero",
    nama: "Furing Ero",
    kategori: "Premium & Khusus",
    komposisi: "100% polyester",
    gramasi: "70 – 90 gsm",
    gsm: 80,
    lebar: "150 cm",
    konstruksi: "Plain weave licin",
    tekstur: "Tipis, licin, ringan",
    satuan: "Meteran / roll",
    warna: "30+ warna dasar",
    swatch: ["#e5e2da", "#b5b0a4"],
    kelebihan: [
      "Membuat pakaian tidak menerawang dan mudah dikenakan",
      "Harga sangat ekonomis",
      "Ringan sehingga tidak menambah beban pakaian"
    ],
    kekurangan: [
      "Tidak menyerap keringat",
      "Mudah sobek bila tertarik jahitan terlalu kencang"
    ],
    cocok: ["Furing gamis", "Furing blazer", "Lapisan rok", "Lapisan tas"],
    perawatan: "Cuci bersama pakaian utamanya, setrika suhu rendah.",
    catatan: "Untuk gamis yang dipakai seharian, pertimbangkan furing katun/hycon agar lebih menyerap keringat."
  }
];
