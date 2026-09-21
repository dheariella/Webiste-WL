/* =========================================================================
   sheet-sync.js — menyambungkan website ke Google Sheet
   -------------------------------------------------------------------------
   Website tetap tampil memakai salinan data di produk-data.js / config.js,
   lalu di latar belakang membaca Google Sheet dan memperbaruinya bila ada
   perubahan. Bila sheet tidak bisa dibaca (belum dibagikan, tidak ada
   internet, Google sedang bermasalah), website tetap jalan memakai salinan
   terakhir — tidak pernah kosong.

   Alamat sheet diatur di config.js pada bagian SITE.sheet.
   ========================================================================= */
(function () {
  "use strict";

  // Dalam mode editor, isi teks dikendalikan jendela editor — jangan ditimpa sheet
  if (/[?&]editor=1(&|$)/.test(location.search)) return;

  var CFG = (window.SITE && window.SITE.sheet) || {};
  if (!CFG.aktif) return;

  var BATAS_WAKTU = 8000; // ms

  /* ---------- Pembaca CSV (mendukung tanda kutip dan koma di dalam sel) ---------- */
  function baca(csv) {
    var baris = [], sel = [], isi = "", kutip = false, i, c;
    for (i = 0; i < csv.length; i++) {
      c = csv[i];
      if (kutip) {
        if (c === '"') {
          if (csv[i + 1] === '"') { isi += '"'; i++; } else { kutip = false; }
        } else { isi += c; }
      } else if (c === '"') { kutip = true; }
      else if (c === ",") { sel.push(isi); isi = ""; }
      else if (c === "\n") { sel.push(isi); baris.push(sel); sel = []; isi = ""; }
      else if (c !== "\r") { isi += c; }
    }
    if (isi !== "" || sel.length) { sel.push(isi); baris.push(sel); }
    return baris;
  }

  /* Ubah CSV menjadi daftar objek memakai baris pertama sebagai nama kolom */
  function keObjek(csv) {
    var baris = baca(csv).filter(function (b) { return b.some(function (s) { return s.trim() !== ""; }); });
    if (!baris.length) return [];
    var kepala = baris[0].map(function (h) { return h.trim().toLowerCase(); });
    return baris.slice(1).map(function (b) {
      var o = {};
      kepala.forEach(function (h, i) { if (h) o[h] = (b[i] || "").trim(); });
      return o;
    });
  }

  function ambil(url) {
    return new Promise(function (selesai, gagal) {
      var batal = setTimeout(function () { gagal(new Error("waktu habis")); }, BATAS_WAKTU);
      fetch(url, { cache: "no-store" })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.text();
        })
        .then(function (teks) { clearTimeout(batal); selesai(keObjek(teks)); })
        .catch(function (e) { clearTimeout(batal); gagal(e); });
    });
  }

  /* ---------- Pembantu ---------- */
  function angka(v) {
    var n = String(v || "").replace(/[^0-9]/g, "");
    return n ? parseInt(n, 10) : null;
  }
  function ya(v) {
    var s = String(v || "").trim().toUpperCase();
    return s === "" || s === "YA" || s === "Y" || s === "TRUE" || s === "1";
  }

  var SWATCH = {
    "Kerudung Segi Empat": ["#cdb0bb", "#7d5a6b"],
    "Kerudung Sublim":     ["#cfc6b4", "#6e6454"],
    "Kerudung Pasmina":    ["#adbccd", "#5c6f85"],
    "Bahan Gamis":         ["#b7abc9", "#5f5478"],
    "Bahan Kemeja":        ["#a8c0b6", "#4f6b60"],
    "Bahan Celana":        ["#98a3ac", "#3f4a55"]
  };
  var BAWAAN = ["#d5cec2", "#807868"];

  function ketLama(kategori) {
    var lama = (window.KAIN || []).filter(function (k) { return k.kategori === kategori; })[0];
    return lama ? lama.ketKategori : "";
  }

  /* ---------- Susun ulang daftar kain dari sheet KAIN + WARNA ---------- */
  function susunKain(barisKain, barisWarna) {
    var warnaPer = {};
    (barisWarna || []).forEach(function (w) {
      var kode = (w.kode_kain || "").trim().toUpperCase();
      if (!kode || !ya(w.tampilkan)) return;
      var nama = (w.nama_warna || "").trim();
      if (!nama) return;
      (warnaPer[kode] = warnaPer[kode] || []).push({ nama: nama, urutan: angka(w.urutan) || 999, stok: w.stok || "" });
    });
    Object.keys(warnaPer).forEach(function (kode) {
      warnaPer[kode].sort(function (a, b) { return a.urutan - b.urutan; });
    });

    var hasil = [];
    barisKain.forEach(function (r) {
      var kode = (r.kode_kain || "").trim().toUpperCase();
      var nama = (r.nama_kain || "").trim();
      if (!kode || !nama || !ya(r.tampilkan)) return;

      var kategori = (r.kategori || "Lainnya").trim();
      var lebar = angka(r.lebar_cm);
      var gsm = angka(r.gramasi_gsm);
      var daftarWarna = (warnaPer[kode] || []).map(function (w) { return w.nama; });

      hasil.push({
        id: kode.toLowerCase(),
        kode: kode,
        nama: nama,
        kategori: kategori,
        komposisi: (r.komposisi || "").trim(),
        lebarCm: lebar,
        lebar: lebar ? lebar + " cm" : (r.lebar_cm || "").trim(),
        gramasi: gsm ? gsm + " gsm" : "",
        gsm: gsm,
        harga: angka(r.harga_yard),
        satuan: (r.satuan || "Yard").trim(),
        hargaRoll: angka(r.harga_roll),
        cocok: (r.cocok_untuk || "").split(/[,;]/).map(function (s) { return s.trim(); }).filter(Boolean),
        deskripsi: (r.deskripsi || "").trim(),
        ketKategori: ketLama(kategori),
        warna: daftarWarna,
        stok: daftarWarna.length ? "READY" : "",
        swatch: SWATCH[kategori] || BAWAAN,
        urutan: angka(r.urutan) || 999
      });
    });
    hasil.sort(function (a, b) { return a.urutan - b.urutan; });
    return hasil;
  }

  /* ---------- Petakan sheet PENGATURAN ke window.SITE ---------- */
  var PETA = {
    nama_toko: "brand",
    tagline: "tagline",
    nomor_whatsapp: "waNumber",
    pesan_whatsapp: "waDefaultText",
    alamat: "alamat",
    link_maps: "mapsUrl",
    instagram: "instagramNama",
    email: "email",
    min_order: "minOrder",
    info_ongkir: "infoOngkir"
  };

  function terapkanPengaturan(baris) {
    var berubah = false;
    baris.forEach(function (r) {
      var kunci = PETA[(r.item || "").trim().toLowerCase()];
      var isi = (r.isi || "").trim();
      if (!kunci || !isi) return;
      if (kunci === "waNumber") isi = isi.replace(/[^0-9]/g, "");
      if (kunci === "instagramNama") {
        window.SITE.instagram = /^https?:/i.test(isi) ? isi : "https://instagram.com/" + isi.replace(/^@/, "");
      }
      if (window.SITE[kunci] !== isi) { window.SITE[kunci] = isi; berubah = true; }
    });
    // jam_buka ditulis sebagai satu kalimat di sheet; tampilkan apa adanya
    var jam = baris.filter(function (r) { return (r.item || "").trim().toLowerCase() === "jam_buka"; })[0];
    if (jam && (jam.isi || "").trim()) {
      var potong = jam.isi.split(/\s{2,}|\s*[;|]\s*/).map(function (s) { return s.trim(); }).filter(Boolean);
      if (potong.length > 1) {
        window.SITE.jam = potong.map(function (s) {
          var m = s.match(/^(.*?)(\d{1,2}[.:]\d{2}.*)$/);
          return m ? { hari: m[1].trim(), buka: m[2].trim() } : { hari: s, buka: "" };
        });
        berubah = true;
      }
    }
    return berubah;
  }

  /* ---------- Jalankan ---------- */
  function segarkan(apa) {
    if (apa.teks || apa.kain) { if (window.terapkanTeks) window.terapkanTeks(); }
    if (apa.pengaturan) {
      if (window.isiDataToko) window.isiDataToko();
      if (window.pasangTautanWa) window.pasangTautanWa(document);
    }
    if (apa.kain && window.renderKatalog) window.renderKatalog();
  }

  var tugas = [];
  if (CFG.kain) {
    tugas.push(Promise.all([ambil(CFG.kain), CFG.warna ? ambil(CFG.warna) : Promise.resolve([])])
      .then(function (hasil) {
        var kain = susunKain(hasil[0], hasil[1]);
        if (kain.length) { window.KAIN = kain; return { kain: true }; }
        return {};
      }));
  }
  if (CFG.pengaturan) {
    tugas.push(ambil(CFG.pengaturan).then(function (b) { return { pengaturan: terapkanPengaturan(b) }; }));
  }
  if (CFG.teks) {
    tugas.push(ambil(CFG.teks).then(function (b) {
      window.TEKS = window.TEKS || {};
      var ada = false;
      b.forEach(function (r) {
        var k = (r.kunci || "").trim();
        var isi = (r.isi || "").trim();
        if (k && isi) { window.TEKS[k] = isi; ada = true; }
      });
      return { teks: ada };
    }));
  }

  Promise.all(tugas.map(function (p) {
    return p.catch(function (e) {
      if (CFG.catatanKesalahan) console.warn("[sheet-sync] gagal membaca sheet:", e.message);
      return {};
    });
  })).then(function (hasil) {
    var gabung = hasil.reduce(function (a, b) {
      Object.keys(b).forEach(function (k) { if (b[k]) a[k] = true; });
      return a;
    }, {});
    if (Object.keys(gabung).length) segarkan(gabung);
  });
})();
