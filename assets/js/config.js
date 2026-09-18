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

  // Angka pada bagian statistik beranda
  stats: [
    { angka: "33", label: "Jenis kain ready stock" },
    { angka: "150", label: "Pilihan warna tercatat" },
    { angka: "21", label: "Varian voal PFP siap sublim" },
    { angka: "Bandung", label: "Toko fisik, kirim se-Indonesia" }
  ]
};
