/* =========================================================================
   KONFIGURASI SITUS — UBAH DI SINI SAJA
   Semua nomor WhatsApp, alamat, dan identitas toko diambil dari file ini.
   Tidak perlu mengedit file HTML satu per satu.
   ========================================================================= */
window.SITE = {
  // Nama & identitas toko
  brand: "WL Textile",
  tagline: "Grosir & Eceran Kain Berkualitas",
  deskripsiSingkat:
    "Supplier kain untuk konveksi, brand fashion, penjahit, dan seragam. " +
    "Stok lengkap, gramasi jujur, potong meteran maupun roll.",

  // Nomor WhatsApp format internasional TANPA tanda + dan tanpa spasi.
  // Contoh: 0812-3456-7890  ->  "6281234567890"
  waNumber: "6281234567890",

  // Teks default yang muncul di chat WhatsApp saat tombol diklik
  waDefaultText:
    "Halo WL Textile, saya mau tanya-tanya soal kain. Boleh minta info stok dan harganya?",

  // Kontak lain
  telepon: "0812-3456-7890",
  email: "halo@wltextile.co.id",

  // Lokasi toko
  alamat: "Jl. Tekstil Raya No. 12, Blok A",
  kota: "Bandung, Jawa Barat 40234",
  mapsUrl: "https://maps.google.com/?q=Jl.+Tekstil+Raya+No.+12+Bandung",

  // Jam operasional
  jam: [
    { hari: "Senin – Jumat", buka: "08.00 – 17.00 WIB" },
    { hari: "Sabtu", buka: "08.00 – 15.00 WIB" },
    { hari: "Minggu & Hari Libur", buka: "Tutup (chat tetap dibalas)" }
  ],

  // Media sosial (kosongkan string bila belum punya)
  instagram: "https://instagram.com/",
  tiktok: "https://tiktok.com/",
  shopee: "",

  // Angka-angka untuk bagian statistik di beranda
  stats: [
    { angka: "12+", label: "Tahun melayani konveksi" },
    { angka: "150+", label: "Jenis & varian kain" },
    { angka: "2.000+", label: "Pelanggan brand & konveksi" },
    { angka: "24 jam", label: "Respons chat maksimal" }
  ]
};
