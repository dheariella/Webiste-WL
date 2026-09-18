# Website Wahyu Lestari Textile

Website profil toko kain **Wahyu Lestari Textile** (Bandung): profil usaha, keunggulan,
katalog *product knowledge* (nama kain, kode, komposisi, lebar kain, harga, pilihan warna),
artikel/blog, dan tombol *call to action* yang langsung membuka WhatsApp.

Situs **statis** (HTML + CSS + JavaScript biasa). Tanpa Node.js, tanpa proses build, tanpa
database. Cukup unggah foldernya ke hosting mana pun.

---

## 1. Dari mana datanya

Isi website diambil dari folder Google Drive **Website WL**:

| Sumber di Drive | Dipakai untuk | File di repositori ini |
|---|---|---|
| Sheet `WL — PENGATURAN` | Nama toko, WhatsApp, alamat, jam buka, Instagram, email | `assets/js/config.js` |
| Sheet `WL — KAIN` | 33 jenis kain: kode, nama, kategori, komposisi, lebar, harga, satuan | `assets/js/produk-data.js` |
| Sheet `WL — WARNA` | 150 nama warna berstatus READY, dikelompokkan per kode kain | `assets/js/produk-data.js` |

Data di sini adalah **salinan**, bukan sambungan langsung ke Google Sheet. Kalau sheet
diperbarui, datanya perlu disalin lagi ke dua file di atas (lihat bagian 4 dan 5).

`DATA WEBSITE WL.xlsx` tidak terbaca lewat konektor Drive dan tampaknya merupakan versi
awal dari ketiga sheet di atas, jadi tidak dipakai. `WL logo.pdf` juga belum dipakai —
lihat bagian 8.

---

## 2. Yang masih perlu Anda lengkapi

Beberapa kolom di Google Sheet masih kosong, sehingga bagiannya **sengaja disembunyikan**
di website supaya tidak tampil setengah jadi. Begitu diisi, bagiannya otomatis muncul.

| Kolom kosong | Ada di | Efeknya sekarang |
|---|---|---|
| `gramasi_gsm` | sheet KAIN (semua baris) | Baris "Gramasi" dan filter gramasi di katalog tidak ditampilkan |
| `cocok_untuk` | sheet KAIN (semua baris) | Daftar "Cocok untuk" tidak ditampilkan |
| `deskripsi` | sheet KAIN (semua baris) | Paragraf penjelasan per kain tidak ditampilkan |
| `harga_roll` | sheet KAIN (semua baris) | Baris "Harga per roll" tidak ditampilkan |
| `kode_hex`, `link_foto` | sheet WARNA | Warna tampil sebagai nama saja, belum ada kotak warna atau foto |
| `min_order` | sheet PENGATURAN | Blok "Minimal pembelian" di halaman kontak tidak ditampilkan |
| `info_ongkir` | sheet PENGATURAN | Blok "Pengiriman" di halaman kontak tidak ditampilkan |
| `pesan_whatsapp` | sheet PENGATURAN | Dipakai teks bawaan di `config.js` |

**Dua baris yang perlu dicek ulang di sheet KAIN:** `PS1 Modal Viscose (Rayon Nola)` dan
`PS2 Rayon Spandex` tercatat berkomposisi **Polyester**. Nama kainnya menunjukkan serat
rayon/viscose, jadi kemungkinan kolom komposisinya belum disesuaikan. Website menampilkan
apa adanya sesuai sheet — silakan perbaiki di sheet lalu salin ulang bila memang keliru.

---

## 3. Struktur folder

```
index.html              Beranda: hero, statistik, keunggulan, kategori, cara pesan, FAQ
tentang.html            Profil toko dan layanan
produk.html             Katalog 33 kain: cari, filter kategori & lebar, urutkan, detail
blog.html               Daftar artikel
kontak.html             Alamat, jam buka, formulir penyusun pesan WhatsApp
404.html                Halaman tidak ditemukan
blog/                   Isi artikel (6 artikel)
assets/css/style.css    Seluruh tampilan
assets/js/config.js     >> DATA TOKO — dari sheet PENGATURAN
assets/js/produk-data.js>> DATA KAIN & WARNA — dari sheet KAIN + WARNA
assets/js/main.js       Menu, tautan WhatsApp, animasi
assets/js/produk.js     Pencarian, filter, dan detail katalog
sitemap.xml, robots.txt Untuk mesin pencari
```

---

## 4. Mengubah data toko

Buka `assets/js/config.js`. Isinya sudah sesuai sheet PENGATURAN per 18 September 2026:

| Isi | Nilai sekarang |
|---|---|
| `brand` | Wahyu Lestari Textile |
| `tagline` | Your Fabric Partner |
| `waNumber` | 6282123879317 |
| `alamat` | Jalan Dulatip No. 69, Kota Bandung |
| `jam` | Senin–Jumat 09.00–16.30, Sabtu 09.00–16.00, Minggu tutup |
| `instagram` | @wltextile |
| `email` | wahyulestari90817@gmail.com |
| `tampilkanHarga` | `true` — harga per yard tampil di katalog |

Ubah `tampilkanHarga` menjadi `false` bila sewaktu-waktu Anda ingin menyembunyikan harga
dari website; kartu kain akan berubah menjadi hanya tombol tanya via WhatsApp.

Isi `minOrder` dan `infoOngkir` untuk memunculkan blok ketentuan pembelian di halaman kontak.

---

## 5. Menambah atau mengubah kain

Buka `assets/js/produk-data.js`, salin satu blok yang sudah ada, lalu ubah isinya:

```js
{
  "id": "vp2",                     // huruf kecil dari kode, harus unik
  "kode": "VP2",                   // kode di sheet KAIN
  "nama": "Nama Kain",
  "kategori": "Kerudung Segi Empat",   // kategori baru otomatis jadi tombol filter
  "komposisi": "Polyester",
  "lebarCm": 125,                  // angka saja, dipakai untuk filter lebar
  "lebar": "125 cm",               // teks yang ditampilkan
  "gramasi": "",                   // isi mis. "80 – 100 gsm" bila sudah diketahui
  "gsm": null,                     // isi angka mis. 90 supaya filter gramasi aktif
  "harga": 25000,                  // angka rupiah, tanpa titik
  "satuan": "Yard",                // "Yard" atau "KG"
  "hargaRoll": null,
  "cocok": [],                     // mis. ["Kerudung segi empat", "Tunik"]
  "deskripsi": "",
  "ketKategori": "...",
  "warna": ["Navy", "Sand"],       // dari sheet WARNA, yang berstatus READY
  "stok": "READY",
  "swatch": ["#cdb0bb", "#7d5a6b"],// dua warna untuk gambar kartu
  "urutan": 35
}
```

Kartu, chip kategori, filter lebar, pencarian, dan halaman detail menyesuaikan sendiri.
Jumlah kain yang tertulis di judul `produk.html`, `index.html`, dan `404.html`
("33 jenis kain") perlu diubah manual bila jumlahnya berubah banyak.

Setiap kain punya tautan langsung, misalnya `produk.html#sv1` — membuka katalog sekaligus
menampilkan detail kain tersebut. Tautan inilah yang dipakai di dalam artikel.

---

## 6. Menambah artikel baru

1. Salin salah satu file di folder `blog/` menjadi file baru.
2. Ubah `<title>`, `<meta name="description">`, judul `<h1>`, daftar isi, dan isinya.
3. Tambahkan kartu artikel di `blog.html` (salin satu blok `<article class="post-card">`),
   dan bila ingin tampil di beranda, di `index.html`.
4. Tambahkan alamatnya ke `sitemap.xml`.

Enam artikel yang sekarang ada: beda voal/paris/ceruti, apa itu kain PFP, menghitung
kebutuhan kain dari yard, memilih lebar kain, memilih bahan gamis, dan merawat kerudung voal.

---

## 7. Cara tombol WhatsApp bekerja

Setiap elemen dengan atribut `data-wa` otomatis menjadi tautan WhatsApp ke nomor di
`config.js`:

```html
<a class="btn btn-wa" data-wa>Chat WhatsApp</a>

<!-- dengan pesan khusus -->
<a class="btn btn-wa" data-wa data-wa-text="Halo, saya mau tanya Sahara Voal.">Tanya stok</a>
```

Tombol "Pesan" pada setiap kartu kain otomatis menyertakan nama dan kode kainnya.
Formulir di halaman kontak tidak mengirim atau menyimpan data apa pun — isiannya hanya
disusun menjadi teks pesan WhatsApp.

---

## 8. Logo

Website saat ini memakai monogram **WL** yang dibuat dengan CSS, bukan file logo.
`WL logo.pdf` di Google Drive belum dipakai karena tidak bisa diambil lewat konektor.
Untuk memakainya: ekspor logo menjadi PNG atau SVG berlatar transparan, simpan sebagai
`assets/img/logo.png`, lalu ganti bagian `<span class="logo-mark">WL</span>` di setiap file
HTML dengan `<img src="assets/img/logo.png" alt="Wahyu Lestari Textile" class="logo-mark">`.

---

## 9. Cara mempublikasikan

**GitHub Pages** (gratis)
1. Buka *Settings* → *Pages* pada repositori ini.
2. Bagian *Source*, pilih *Deploy from a branch*, lalu pilih branch dan folder `/ (root)`.
3. Tunggu beberapa menit, alamat website akan muncul di halaman yang sama.

**Netlify / Vercel / cPanel**
Unggah seluruh isi folder apa adanya. Tidak ada perintah build (*build command* dikosongkan,
*publish directory* diisi `.`).

Setelah punya domain, ganti `https://www.namadomainanda.com` di `sitemap.xml` dan
`robots.txt` dengan alamat asli.

---

## 10. Catatan teknis

- Tampilan responsif untuk ponsel, tablet, dan desktop; sudah diuji pada lebar 390 px.
- Huruf dari Google Fonts; bila tidak termuat, tampilan tetap rapi dengan huruf sistem.
- Tidak ada pelacak, cookie, atau data pengunjung yang disimpan.
- Sudah dilengkapi meta description per halaman, `sitemap.xml`, `robots.txt`, dan data
  terstruktur schema.org `Store` di beranda.
- Harga yang tampil disertai keterangan bahwa harga dapat berubah dan perlu dikonfirmasi
  lewat WhatsApp.
