/* =========================================================================
   KONFIGURASI SITUS — UBAH DI SINI SAJA
   Diambil dari Google Sheet "WL — PENGATURAN" (folder Drive: Website WL).
   Semua nomor WhatsApp, alamat, dan identitas toko dibaca dari file ini,
   jadi tidak perlu mengedit file HTML satu per satu.
   ========================================================================= */
window.SITE = {
  // Identitas toko
  brand: "Wahyu Lestari Textile",
  brandPendek: "WL Textile",
  tagline: "Your Fabric Partner",
  deskripsiSingkat:
    "Supplier kain kerudung, gamis, kemeja, dan celana di Bandung. " +
    "Voal, paris, ceruti, sublim PFP, jacquard — siap potong yard maupun roll.",

  // Nomor WhatsApp, format internasional tanpa + dan tanpa spasi
  waNumber: "6282123879317",

  // Teks default saat tombol WhatsApp diklik
  // (kolom pesan_whatsapp di sheet PENGATURAN masih kosong — ubah bila perlu)
  waDefaultText:
    "Halo WL Textile, saya mau tanya-tanya soal kain. Boleh minta info stok warna dan harganya?",

  // Kontak
  telepon: "0821-2387-9317",
  email: "wahyulestari90817@gmail.com",

  // Lokasi
  alamat: "Jalan Dulatip No. 69",
  kota: "Kota Bandung, Jawa Barat",
  mapsUrl: "https://maps.app.goo.gl/JEJead71RHPqcxR39",

  // Jam operasional
  jam: [
    { hari: "Senin – Jumat", buka: "09.00 – 16.30 WIB" },
    { hari: "Sabtu", buka: "09.00 – 16.00 WIB" },
    { hari: "Minggu & Hari Libur", buka: "Tutup" }
  ],

  // Media sosial (kosongkan string bila belum dipakai)
  instagramNama: "@wltextile",
  instagram: "https://instagram.com/wltextile",
  tiktok: "",
  shopee: "",

  // Ketentuan pembelian.
  // Kolom min_order & info_ongkir di sheet PENGATURAN masih kosong —
  // isi di sini supaya tampil di FAQ dan halaman kontak.
  minOrder: "",
  infoOngkir: "",

  // Tampilkan harga di katalog? true = tampil, false = hanya "cek via WhatsApp"
  tampilkanHarga: true,

  /* -----------------------------------------------------------------
     SAMBUNGAN KE GOOGLE SHEET
     Website membaca sheet ini setiap halaman dibuka, lalu memperbarui
     isinya. Bila sheet belum dibagikan atau tidak bisa dibaca, website
     tetap tampil memakai salinan data di produk-data.js dan config.js.

     Agar bekerja, setiap sheet harus dibagikan:
       Share -> General access -> "Anyone with the link" -> Viewer

     Ubah `aktif` menjadi false bila ingin mematikan sambungan ini.
     ----------------------------------------------------------------- */
  sheet: {
    aktif: true,
    catatanKesalahan: false, // true = tampilkan pesan gagal di Console browser
    kain:       "https://docs.google.com/spreadsheets/d/1LK0A3KV3ZzdO80ZM4WvG1WEm1LZslEXjcHR1DVFuxM8/gviz/tq?tqx=out:csv",
    warna:      "https://docs.google.com/spreadsheets/d/1goMbee3e1YOVBz7Jt2o0vW4EiMVw8qsybM1J450H-xw/gviz/tq?tqx=out:csv",
    pengaturan: "https://docs.google.com/spreadsheets/d/1ENuael-JpoK5R_ETzbKdSPTA4tG4M1hqDoFy1EYUqzc/gviz/tq?tqx=out:csv",
    teks:       "https://docs.google.com/spreadsheets/d/1jQXSY6-Qvz-xDsKgGRhgMB3GYylLHtjpVa2oYwuMxtA/gviz/tq?tqx=out:csv"
  },

  /* Angka cadangan untuk penanda {jumlah_kain}, {jumlah_warna}, {jumlah_kategori},
     dan {jumlah_sublim}, dipakai pada halaman yang belum memuat data kain.
     Begitu data kain tersedia (halaman katalog, atau setelah sinkronisasi sheet),
     angkanya dihitung ulang dari data sebenarnya. */
  angka: {
      "jumlah_kain": 33,
      "jumlah_warna": 150,
      "jumlah_kategori": 6,
      "jumlah_sublim": 21
  },

  // Angka pada bagian statistik beranda
  stats: [
    { angka: "33", label: "Jenis kain ready stock" },
    { angka: "150", label: "Pilihan warna tercatat" },
    { angka: "21", label: "Varian voal PFP siap sublim" },
    { angka: "Bandung", label: "Toko fisik, kirim se-Indonesia" }
  ]
};
