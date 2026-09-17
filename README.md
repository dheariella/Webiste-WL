# Website Toko Kain — WL Textile

Website profil toko kain: profil usaha, keunggulan, katalog *product knowledge* (nama kain,
komposisi, gramasi, lebar kain, konstruksi, kelebihan/kekurangan, perawatan), artikel/blog,
dan tombol *call to action* yang langsung membuka WhatsApp.

Dibangun sebagai **situs statis** (HTML + CSS + JavaScript biasa). Tidak butuh Node.js,
tidak butuh proses build, tidak butuh database. Cukup unggah foldernya ke hosting mana pun.

---

## 1. Yang pertama harus diubah

Semua identitas toko berada di **satu file**: [`assets/js/config.js`](assets/js/config.js).
Anda tidak perlu menyunting file HTML satu per satu.

| Isi yang wajib diganti | Keterangan |
|---|---|
| `waNumber` | **Nomor WhatsApp toko.** Saat ini masih contoh: `6281234567890`. Format internasional, tanpa `+` dan tanpa spasi. Nomor `0812-3456-7890` ditulis `6281234567890`. |
| `brand`, `tagline` | Nama toko dan slogan. |
| `telepon`, `email` | Kontak lain. |
| `alamat`, `kota`, `mapsUrl` | Alamat toko dan tautan Google Maps. |
| `jam` | Jam operasional. |
| `instagram`, `tiktok`, `shopee` | Media sosial. |
| `stats` | Angka-angka di beranda (tahun berdiri, jumlah jenis kain, dll). |

> **Penting:** angka-angka di `stats`, teks "Supplier kain sejak 2014" di beranda, serta
> beberapa klaim di halaman *Tentang Kami* masih berupa contoh. Sesuaikan dengan kondisi
> toko Anda yang sebenarnya sebelum website dipublikasikan.

Beberapa teks yang perlu disesuaikan manual karena tertulis langsung di HTML:

- `index.html` — eyebrow "Supplier kain sejak 2014" dan jawaban FAQ (minimal order, ongkos sampel, dll).
- `tentang.html` — cerita dan komitmen toko.
- `sitemap.xml` dan `robots.txt` — ganti `https://www.namadomainanda.com` dengan domain asli.

---

## 2. Struktur folder

```
index.html              Beranda: hero, keunggulan, kategori, cara pesan, FAQ, CTA
tentang.html            Profil toko, nilai, dan layanan
produk.html             Katalog + product knowledge (pencarian, filter, detail spesifikasi)
blog.html               Daftar artikel
kontak.html             Alamat, jam buka, dan formulir penyusun pesan WhatsApp
404.html                Halaman tidak ditemukan
blog/                   Isi artikel (6 artikel)
assets/css/style.css    Seluruh tampilan
assets/js/config.js     >> DATA TOKO — ubah di sini
assets/js/produk-data.js>> DATA KAIN — 34 jenis kain
assets/js/main.js       Menu, tautan WhatsApp, animasi
assets/js/produk.js     Pencarian, filter, dan detail katalog
sitemap.xml, robots.txt Untuk mesin pencari
```

---

## 3. Cara menjalankan di komputer sendiri

Buka `index.html` langsung dengan browser sudah cukup. Agar semua berfungsi persis seperti
di server (termasuk tautan antar-halaman), jalankan server lokal sederhana:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

---

## 4. Menambah atau mengubah jenis kain

Buka `assets/js/produk-data.js`. Salin satu blok yang sudah ada, lalu ubah isinya:

```js
{
  id: "nama-kain-baru",          // huruf kecil, pakai tanda hubung, tidak boleh sama dengan yang lain
  nama: "Nama Kain Baru",
  kategori: "Kaos & Rajut",      // kategori baru otomatis muncul sebagai tombol filter
  komposisi: "100% katun",
  gramasi: "140 – 160 gsm",      // teks yang ditampilkan
  gsm: 150,                      // angka rata-rata, dipakai untuk filter gramasi
  lebar: "Open width 160 cm",
  konstruksi: "Single knit",
  tekstur: "Halus dan ringan",
  satuan: "Kiloan atau meteran",
  warna: "30+ warna ready stock",
  swatch: ["#e9e4dc", "#b9b1a5"], // dua warna untuk gambar kartu
  kelebihan: ["...", "..."],
  kekurangan: ["...", "..."],
  cocok: ["Kaos distro", "Kaos promosi"],
  perawatan: "Cuci air dingin, jemur terbalik.",
  catatan: "Tips singkat dari toko (opsional)."
},
```

Kartu, filter, pencarian, dan halaman detail akan menyesuaikan sendiri. Jumlah kain yang
tertulis di judul halaman `produk.html` ("34 jenis kain") perlu diubah manual bila berubah banyak.

Setiap kain punya tautan langsung, misalnya `produk.html#combed-24s` — membuka halaman
katalog sekaligus menampilkan detail kain tersebut. Tautan inilah yang dipakai di artikel.

---

## 5. Menambah artikel baru

1. Salin salah satu file di folder `blog/` menjadi file baru, misalnya `blog/judul-artikel-baru.html`.
2. Ubah `<title>`, `<meta name="description">`, judul `<h1>`, daftar isi, dan isi artikelnya.
3. Tambahkan kartu artikel baru di `blog.html` (salin satu blok `<article class="post-card">`
   yang sudah ada) dan, bila ingin tampil di beranda, di `index.html`.
4. Tambahkan alamatnya ke `sitemap.xml`.

---

## 6. Cara tombol WhatsApp bekerja

Setiap elemen yang punya atribut `data-wa` otomatis berubah menjadi tautan WhatsApp:

```html
<a class="btn btn-wa" data-wa>Chat WhatsApp</a>

<!-- dengan pesan khusus -->
<a class="btn btn-wa" data-wa data-wa-text="Halo, saya mau tanya stok Combed 24s.">Tanya stok</a>
```

Bila `data-wa-text` tidak diisi, pesan yang dipakai adalah `waDefaultText` dari `config.js`.
Tombol "Tanya harga" pada setiap kartu kain otomatis menyertakan nama kainnya.

Formulir di halaman kontak tidak mengirim data ke mana pun dan tidak menyimpan apa pun —
isiannya hanya disusun menjadi teks pesan WhatsApp yang rapi.

---

## 7. Cara mempublikasikan

**GitHub Pages** (gratis)
1. Buka *Settings* → *Pages* pada repositori ini.
2. Bagian *Source*, pilih *Deploy from a branch*, lalu pilih branch dan folder `/ (root)`.
3. Tunggu beberapa menit, alamat website akan muncul di halaman yang sama.

**Netlify / Vercel / cPanel**
Unggah seluruh isi folder ini apa adanya. Tidak ada perintah build yang perlu dijalankan
(*build command* dikosongkan, *publish directory* diisi `.`).

---

## 8. Catatan teknis

- Tampilan sudah responsif untuk ponsel, tablet, dan desktop.
- Huruf diambil dari Google Fonts; bila koneksi ke Google Fonts terhambat, tampilan tetap
  rapi dengan huruf bawaan sistem.
- Tidak ada pelacak, tidak ada cookie, dan tidak ada data pengunjung yang disimpan.
- Sudah dilengkapi `sitemap.xml`, `robots.txt`, meta description per halaman, dan data
  terstruktur `Store` (schema.org) di beranda — ganti datanya di `index.html` sesuai toko Anda.
