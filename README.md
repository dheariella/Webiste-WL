# Website Wahyu Lestari Textile

Website profil toko kain **Wahyu Lestari Textile** (Bandung): profil usaha, keunggulan,
katalog *product knowledge* (nama kain, kode, komposisi, lebar kain, harga, pilihan warna),
artikel/blog, dan tombol *call to action* yang langsung membuka WhatsApp.

Situs **statis** (HTML + CSS + JavaScript biasa). Tanpa Node.js, tanpa proses build, tanpa
database. Cukup unggah foldernya ke hosting mana pun.

---

## 1. Website ini tersambung ke Google Sheet Anda

Isi website dibaca langsung dari empat Google Sheet di folder Drive **Website WL**.
Anda ubah di sheet, website ikut berubah &mdash; tidak perlu menyentuh kode.

| Sheet di Drive | Mengatur apa |
|---|---|
| `WL — KAIN` | Daftar kain: nama, kategori, komposisi, lebar, gramasi, harga, satuan, urutan |
| `WL — WARNA` | Pilihan warna tiap kain |
| `WL — PENGATURAN` | Nama toko, WhatsApp, alamat, jam buka, Instagram, email, minimal order, ongkir |
| `WL — TEKS` | Tulisan di halaman: judul beranda, Tentang Kami, keunggulan, FAQ, dan lainnya |

**Cara kerjanya.** Setiap halaman dibuka, website menampilkan salinan data yang tersimpan
di dalamnya dulu (cepat, selalu ada), lalu di latar belakang membaca Google Sheet dan
memperbarui isinya. Kalau sheet tidak bisa dibaca &mdash; belum dibagikan, tidak ada internet,
Google sedang bermasalah &mdash; website tetap tampil memakai salinan terakhir. Tidak pernah kosong.

Perubahan di sheet umumnya muncul di website dalam **sekitar 5 menit** (Google menyimpan
sementara isi sheet sebelum membagikannya).

### Yang harus dilakukan sekali saja agar sambungan aktif

**1. Bagikan keempat sheet.** Buka tiap sheet → tombol **Share** → bagian *General access* →
ubah dari *Restricted* menjadi **Anyone with the link**, peran **Viewer** → Done.

Selama ini belum dilakukan, website tetap jalan normal memakai salinan datanya.

**2. Isi sheet `WL — TEKS`.** Sheet itu sudah dibuatkan tetapi masih kosong.

Prosesnya **dimulai dari dalam sheet**, bukan dengan menyeret berkas ke folder Google Drive.
Menyeret berkas ke Drive hanya menaruh berkas CSV di sana dan tidak mengisi sheet apa pun.

1. Unduh berkas [`data/WL-TEKS.csv`](data/WL-TEKS.csv) dari repositori ini
   (klik berkasnya → tombol **Download raw file**).
2. Buka sheet `WL — TEKS` di Google Sheets.
3. Menu **File → Import**.
4. Muncul jendela dengan beberapa tab: *My Drive · Shared with me · Shared drives · Recent ·
   Upload*. Pilih tab **Upload** lalu seret berkas yang baru diunduh.
   Bila berkasnya sudah terlanjur ada di Google Drive, pilih tab **My Drive** atau **Recent**
   lalu klik berkas `WL-TEKS.csv` → **Select**.
5. Barulah muncul pilihan *Import location*. Pilih **Replace current sheet** → **Import data**.

Setelah itu sheet berisi 151 baris: setiap baris adalah satu potongan tulisan di website,
lengkap dengan teks yang sekarang tampil.

Cara ini dipakai supaya ID sheet-nya tidak berubah, sehingga alamat di `config.js` tetap
cocok. Bila Anda memilih jalan pintas (klik kanan CSV di Drive → **Open with → Google
Sheets**), Google membuat sheet **baru** dengan ID berbeda — alamat `teks` pada bagian
`sheet` di `assets/js/config.js` harus diganti dengan ID sheet yang baru itu.

**3. Matikan bila perlu.** Bila suatu saat ingin memutus sambungan, buka
`assets/js/config.js` dan ubah `aktif: true` menjadi `aktif: false` pada bagian `sheet`.

---

## 2. Mengubah tulisan di website

Semua lewat sheet **`WL — TEKS`**. Aturannya:

- **Kolom `kunci` jangan diubah.** Itu penanda yang dipakai website untuk tahu tulisan ini
  muncul di sebelah mana.
- **Kolom `halaman` dan `bagian`** hanya penunjuk lokasi supaya mudah dicari. Boleh diabaikan.
- **Kolom `isi`** inilah yang Anda ubah.
- **Kalau kolom `isi` dikosongkan**, website memakai tulisan bawaannya. Aman kalau ada baris
  yang belum sempat diisi.

### Angka yang mengisi dirinya sendiri

Di beberapa baris ada penanda dalam kurung kurawal. Website menggantinya dengan angka
sebenarnya saat halaman dibuka, jadi Anda tidak perlu memperbarui angka setiap kali
menambah kain:

| Penanda | Diganti menjadi | Nilai sekarang |
|---|---|---|
| `{jumlah_kain}` | Banyaknya kain di katalog | 33 |
| `{jumlah_warna}` | Total pilihan warna | 150 |
| `{jumlah_kategori}` | Banyaknya kategori | 6 |
| `{jumlah_sublim}` | Banyaknya kain Kerudung Sublim | 21 |

Contoh: kalau kolom `isi` ditulis `Sekarang ada {jumlah_kain} jenis kain`, yang tampil di
website adalah "Sekarang ada 33 jenis kain" &mdash; dan berubah sendiri jadi 34 begitu Anda
menambah satu kain di sheet `WL — KAIN`.

### Tanda baca khusus

Kolom `isi` boleh berisi penanda HTML sederhana bila perlu:
`<strong>tebal</strong>`, `<em>miring</em>`, `&mdash;` untuk tanda pisah panjang,
`&amp;` untuk tanda "dan". Tanpa itu pun tetap aman &mdash; tulis biasa saja.

---

## 3. Yang masih perlu Anda lengkapi

Beberapa kolom di Google Sheet masih kosong, sehingga bagiannya **sengaja disembunyikan**
di website supaya tidak tampil setengah jadi. Begitu diisi di sheet, bagiannya otomatis muncul.

| Kolom kosong | Ada di | Efeknya sekarang |
|---|---|---|
| `gramasi_gsm` | sheet KAIN (semua baris) | Baris "Gramasi" dan filter gramasi tidak ditampilkan |
| `cocok_untuk` | sheet KAIN (semua baris) | Daftar "Cocok untuk" tidak ditampilkan |
| `deskripsi` | sheet KAIN (semua baris) | Paragraf penjelasan per kain tidak ditampilkan |
| `harga_roll` | sheet KAIN (semua baris) | Baris "Harga per roll" tidak ditampilkan |
| `kode_hex`, `link_foto` | sheet WARNA | Warna tampil sebagai nama saja, belum ada kotak warna atau foto |
| `min_order` | sheet PENGATURAN | Blok "Minimal pembelian" di halaman kontak tidak ditampilkan |
| `info_ongkir` | sheet PENGATURAN | Blok "Pengiriman" di halaman kontak tidak ditampilkan |

Untuk `cocok_untuk`, pisahkan dengan koma: `Kerudung segi empat, Tunik, Dress`.

**Kolom `tampilkan`.** Isi `YA` agar kain atau warna itu tampil di website. Isi apa pun
selain itu (misalnya `TIDAK`) untuk menyembunyikannya tanpa perlu menghapus barisnya &mdash;
berguna saat stok sedang kosong.

**Dua baris yang perlu dicek ulang di sheet KAIN:** `PS1 Modal Viscose (Rayon Nola)` dan
`PS2 Rayon Spandex` tercatat berkomposisi **Polyester**. Nama kainnya menunjukkan serat
rayon/viscose, jadi kemungkinan kolom komposisinya belum disesuaikan.

**Kode kain tidak ditampilkan ke pembeli.** Kolom `kode_kain` tetap dipakai di balik layar
untuk menghubungkan kain dengan warnanya dan untuk tautan langsung, tetapi tidak muncul di
kartu maupun halaman detail, dan tidak ikut terkirim dalam pesan WhatsApp.

## 4. Struktur folder

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
assets/js/sheet-sync.js Membaca Google Sheet dan memperbarui isi halaman
data/WL-TEKS.csv        Isi awal untuk sheet WL — TEKS (diimpor sekali)
sitemap.xml, robots.txt Untuk mesin pencari
```

---

## 5. Mengubah data toko lewat kode (bila sheet dimatikan)

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

## 6. Menambah atau mengubah kain lewat kode (bila sheet dimatikan)

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

## 7. Menambah artikel baru

1. Salin salah satu file di folder `blog/` menjadi file baru.
2. Ubah `<title>`, `<meta name="description">`, judul `<h1>`, daftar isi, dan isinya.
3. Tambahkan kartu artikel di `blog.html` (salin satu blok `<article class="post-card">`),
   dan bila ingin tampil di beranda, di `index.html`.
4. Tambahkan alamatnya ke `sitemap.xml`.

Enam artikel yang sekarang ada: beda voal/paris/ceruti, apa itu kain PFP, menghitung
kebutuhan kain dari yard, memilih lebar kain, memilih bahan gamis, dan merawat kerudung voal.

---

## 8. Cara tombol WhatsApp bekerja

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

## 9. Logo

Logo asli (`WL logo.pdf` di akar repositori) sudah dipakai di website. Berkas PDF-nya vektor
murni, jadi bisa diubah menjadi SVG tanpa kehilangan ketajaman:

| Berkas | Dipakai di | Keterangan |
|---|---|---|
| `assets/img/logo.svg` | cadangan / bahan promosi | Logo penuh, kotak 1080&times;1080 dengan latar warna merek |
| `assets/img/logo-mark.svg` | header dan footer | Monogram WL saja, putih, latar transparan |
| `assets/img/favicon.svg` | ikon tab browser | Monogram di atas kotak membulat warna merek |

Warna merek dari logo, **#002F3D**, kini dipakai sebagai warna utama website
(`--navy-900` di `assets/css/style.css`). Seluruh bagian gelap &mdash; hero, footer, tombol
utama &mdash; mengikuti warna ini.

Bila logo diganti di kemudian hari, timpa ketiga berkas SVG di atas dengan versi baru
memakai nama berkas yang sama; tidak ada bagian lain yang perlu disunting.

## 10. Cara mempublikasikan

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

## 11. Catatan teknis

- Tampilan responsif untuk ponsel, tablet, dan desktop; sudah diuji pada lebar 390 px.
- Huruf dari Google Fonts; bila tidak termuat, tampilan tetap rapi dengan huruf sistem.
- Tidak ada pelacak, cookie, atau data pengunjung yang disimpan.
- Sudah dilengkapi meta description per halaman, `sitemap.xml`, `robots.txt`, dan data
  terstruktur schema.org `Store` di beranda.
- Harga yang tampil disertai keterangan bahwa harga dapat berubah dan perlu dikonfirmasi
  lewat WhatsApp.
