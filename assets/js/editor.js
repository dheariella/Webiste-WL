/* =========================================================================
   editor.js — otak halaman editor.html
   Mengatur pratinjau, pengubahan teks langsung di halaman, warna,
   urutan bagian, serta ekspor hasilnya ke CSV untuk Google Sheet.
   Perubahan disimpan sementara di browser sampai diekspor.
   ========================================================================= */
(function () {
  "use strict";

  var ASAL = location.origin;
  var SIMPANAN = "wl-editor-perubahan-v2";
  var KHUSUS = {
    _warna_utama: { halaman: "Tampilan", bagian: "Warna", label: "Warna utama" },
    _warna_aksen: { halaman: "Tampilan", bagian: "Warna", label: "Warna aksen" },
    _sembunyi:    { halaman: "Tampilan", bagian: "Bagian", label: "Bagian disembunyikan" },
    _urutan:      { halaman: "Tampilan", bagian: "Bagian", label: "Urutan bagian" },
    _animasi:     { halaman: "Tampilan", bagian: "Animasi", label: "Animasi nyala/mati" },
    _animasi_kecepatan: { halaman: "Tampilan", bagian: "Animasi", label: "Kecepatan animasi" },
    _huruf:      { halaman: "Tampilan", bagian: "Bentuk", label: "Pasangan huruf" },
    _sudut:      { halaman: "Tampilan", bagian: "Bentuk", label: "Kelengkungan sudut" },
    _kartu:      { halaman: "Tampilan", bagian: "Bentuk", label: "Gaya kartu" },
    _tombol:     { halaman: "Tampilan", bagian: "Bentuk", label: "Bentuk tombol" },
    _kerapatan:  { halaman: "Tampilan", bagian: "Bentuk", label: "Kerapatan" }
  };
  var WARNA_BAWAAN = {
    _warna_utama: "#002f3d", _warna_aksen: "#c2703d",
    _animasi: "nyala", _animasi_kecepatan: "sedang",
    _huruf: "bawaan", _sudut: "sedang", _kartu: "bayangan",
    _tombol: "bulat", _kerapatan: "normal"
  };

  var HALAMAN = [
    { berkas: "index.html", nama: "Beranda" },
    { berkas: "tentang.html", nama: "Tentang Kami" },
    { berkas: "produk.html", nama: "Katalog" },
    { berkas: "blog.html", nama: "Artikel" },
    { berkas: "kontak.html", nama: "Kontak" }
  ];

  var asli = {}, meta = {}, urutanKunci = [], ubah = {};
  var kunciDiHalaman = [], bagianDiHalaman = [], gambarDiHalaman = [], ikonDiHalaman = [];
  var kunciAktif = null, sedangKetik = false, gambarAktif = null;
  var ikonAktif = null, ikonBawaanAktif = "";

  var $ = function (id) { return document.getElementById(id); };
  var elPratinjau = $("pratinjau"), elDaftar = $("daftar"), elCari = $("cari");
  var elJumlah = $("jumlahUbah"), elSumber = $("sumber"), elStatus = $("status");
  var elPilihHalaman = $("pilihHalaman"), elHanyaHalaman = $("hanyaHalaman");

  /* ----------------------------------------------------- simpanan */
  function muatSimpanan() {
    try { ubah = JSON.parse(localStorage.getItem(SIMPANAN)) || {}; } catch (e) { ubah = {}; }
  }
  function simpan() {
    try { localStorage.setItem(SIMPANAN, JSON.stringify(ubah)); } catch (e) {}
  }
  function bawaan(k) { return k in WARNA_BAWAAN ? WARNA_BAWAAN[k] : (asli[k] || ""); }
  function nilai(k) { return k in ubah ? ubah[k] : bawaan(k); }
  function berubah(k) { return k in ubah && ubah[k] !== bawaan(k); }
  function jumlahUbah() { return Object.keys(ubah).filter(berubah).length; }

  function setNilai(k, v) {
    if (v === bawaan(k)) delete ubah[k]; else ubah[k] = v;
    simpan();
    perbaruiJumlah();
  }

  /* ----------------------------------------------- memuat sumber teks */
  function ambilCsv(url) {
    return fetch(url, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    });
  }
  function pasangSumber(baris, dari) {
    asli = {}; meta = {}; urutanKunci = [];
    baris.forEach(function (r) {
      var k = (r.kunci || "").trim();
      if (!k || /^(CARA_PAKAI|ATURAN_\d+)$/.test(k)) return;
      asli[k] = (r.isi || "").trim();
      meta[k] = { halaman: (r.halaman || "Lainnya").trim(), bagian: (r.bagian || "").trim() };
      urutanKunci.push(k);
    });
    Object.keys(KHUSUS).forEach(function (k) {
      if (!(k in asli)) { asli[k] = ""; meta[k] = KHUSUS[k]; urutanKunci.push(k); }
    });
    elSumber.textContent = dari;
  }
  function muatSumber() {
    var c = (window.SITE && window.SITE.sheet) || {};
    var dariSheet = c.aktif && c.teks
      ? ambilCsv(c.teks).then(function (t) {
          var b = window.csvKeObjek(t);
          if (b.filter(function (r) { return (r.kunci || "").trim() && !/^(CARA_PAKAI|ATURAN_\d+)$/.test(r.kunci.trim()); }).length < 20)
            throw new Error("sheet belum diisi");
          pasangSumber(b, "Google Sheet WL — TEKS");
        })
      : Promise.reject(new Error("sheet tidak aktif"));
    return dariSheet.catch(function () {
      return ambilCsv("data/WL-TEKS.csv").then(function (t) {
        pasangSumber(window.csvKeObjek(t), "salinan bawaan");
      });
    });
  }

  /* ----------------------------------------------------- pratinjau */
  function kirim(pesan) {
    if (!elPratinjau.contentWindow) return;
    pesan.dari = "editor";
    try { elPratinjau.contentWindow.postMessage(pesan, ASAL); } catch (e) {}
  }
  function kirimTeks() {
    var g = {};
    urutanKunci.forEach(function (k) { var v = nilai(k); if (v !== "") g[k] = v; });
    kirim({ jenis: "teks", isi: g });
  }
  function bukaHalaman(berkas) {
    elStatus.textContent = "Memuat pratinjau…";
    kunciAktif = null; sedangKetik = false;
    elPratinjau.src = berkas + "?editor=1";
  }

  /* -------------------------------------------------- daftar tulisan */
  function ringkas(t, n) {
    var p = String(t).replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
    return p.length > n ? p.slice(0, n) + "…" : p;
  }
  function gambarDaftar() {
    var q = (elCari.value || "").trim().toLowerCase();
    var batas = elHanyaHalaman.checked && kunciDiHalaman.length;
    var tampil = urutanKunci.filter(function (k) {
      if (k in KHUSUS) return false;
      if (batas && kunciDiHalaman.indexOf(k) === -1) return false;
      if (!q) return true;
      return (k + " " + nilai(k) + " " + meta[k].halaman + " " + meta[k].bagian).toLowerCase().indexOf(q) !== -1;
    });
    if (!tampil.length) { elDaftar.innerHTML = '<p class="kosong">Tidak ada tulisan yang cocok.</p>'; return; }
    var html = "", grup = "";
    tampil.forEach(function (k) {
      var g = meta[k].halaman + (meta[k].bagian ? " · " + meta[k].bagian : "");
      if (g !== grup) { grup = g; html += '<h3 class="grup">' + g + "</h3>"; }
      html += '<button type="button" class="baris' + (berubah(k) ? " diubah" : "") +
              (k === kunciAktif ? " aktif" : "") + '" data-kunci="' + k + '">' +
              ringkas(nilai(k), 74) + "</button>";
    });
    elDaftar.innerHTML = html;
  }
  function perbaruiJumlah() {
    var n = jumlahUbah();
    elJumlah.textContent = n;
    document.body.classList.toggle("ada-perubahan", n > 0);
  }

  /* ----------------------------------------------------- bagian halaman */
  function daftarUrutan() {
    return (nilai("_urutan") || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function daftarSembunyi() {
    return (nilai("_sembunyi") || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function urutanHalamanIni() {
    var tersimpan = daftarUrutan();
    var namaHalaman = bagianDiHalaman.map(function (b) { return b.nama; });
    var dari = tersimpan.filter(function (n) { return namaHalaman.indexOf(n) !== -1; });
    namaHalaman.forEach(function (n) { if (dari.indexOf(n) === -1) dari.push(n); });
    return dari;
  }
  function simpanUrutanHalaman(baru) {
    var namaHalaman = bagianDiHalaman.map(function (b) { return b.nama; });
    var lain = daftarUrutan().filter(function (n) { return namaHalaman.indexOf(n) === -1; });
    setNilai("_urutan", lain.concat(baru).join(","));
  }
  function geserBagian(nama, arah) {
    var u = urutanHalamanIni();
    var i = u.indexOf(nama);
    var j = i + arah;
    if (i === -1 || j < 0 || j >= u.length) return;
    u.splice(j, 0, u.splice(i, 1)[0]);
    simpanUrutanHalaman(u);
    kirimTeks();
    elStatus.textContent = "Urutan bagian diubah.";
  }
  function alihSembunyi(nama) {
    var s = daftarSembunyi();
    var i = s.indexOf(nama);
    if (i === -1) s.push(nama); else s.splice(i, 1);
    setNilai("_sembunyi", s.join(","));
    kirimTeks();
    elStatus.textContent = i === -1 ? "Bagian disembunyikan." : "Bagian ditampilkan kembali.";
  }

  /* ------------------------------------------------------- pesan masuk */
  window.addEventListener("message", function (e) {
    if (e.origin !== ASAL || !e.data || e.data.dari !== "pratinjau") return;
    var d = e.data;
    if (d.jenis === "siap") {
      kunciDiHalaman = d.kunci || [];
      bagianDiHalaman = d.bagian || [];
      gambarDiHalaman = d.gambar || [];
      ikonDiHalaman = d.ikon || [];
      ikonDiHalaman.forEach(function (o) {
        if (!(o.kunci in meta)) {
          asli[o.kunci] = "";
          meta[o.kunci] = { halaman: "Tampilan", bagian: "Ikon", label: "Ikon" };
          urutanKunci.push(o.kunci);
          KHUSUS[o.kunci] = meta[o.kunci];
        }
      });
      gambarDiHalaman.forEach(function (k) {
        if (!(k in meta)) {
          asli[k] = "";
          meta[k] = { halaman: "Tampilan", bagian: "Gambar", label: "Gambar" };
          urutanKunci.push(k);
          KHUSUS[k] = meta[k];
        }
      });
      kirimTeks();
      elStatus.textContent = "Klik tulisan mana pun untuk mengubahnya · " +
        kunciDiHalaman.length + " tulisan, " + bagianDiHalaman.length + " bagian di halaman ini";
      gambarDaftar();
    } else if (d.jenis === "pilih") {
      sedangKetik = true;
      kunciAktif = d.kunci;
      gambarDaftar();
      var b = elDaftar.querySelector('.baris[data-kunci="' + d.kunci + '"]');
      if (b) b.scrollIntoView({ block: "nearest" });
    } else if (d.jenis === "ubah") {
      setNilai(d.kunci, d.isi);
      gambarDaftar();
    } else if (d.jenis === "selesai") {
      sedangKetik = false;
      kirimTeks();
    } else if (d.jenis === "ikon") {
      bukaDialogIkon(d.kunci, d.bawaan);
    } else if (d.jenis === "gambar") {
      bukaDialogGambar(d.kunci);
    } else if (d.jenis === "bagian") {
      if (d.aksi === "naik") geserBagian(d.nama, -1);
      else if (d.aksi === "turun") geserBagian(d.nama, 1);
      else if (d.aksi === "sembunyi") alihSembunyi(d.nama);
    }
  });

  /* -------------------------------------------------------- dialog ikon */
  function gambarPetakIkon() {
    var q = ($("ikonCari").value || "").trim().toLowerCase();
    var semua = Object.keys(window.IKON || {}).filter(function (n) { return !q || n.indexOf(q) !== -1; });
    var kini = nilai(ikonAktif) || ikonBawaanAktif;
    $("ikonPetak").innerHTML = semua.length
      ? semua.map(function (n) {
          return '<button type="button" class="ikon-pilihan' + (n === kini ? " aktif" : "") +
                 '" data-ikon-nama="' + n + '">' + window.gambarIkon(n) + "<span>" + n + "</span></button>";
        }).join("")
      : '<p class="kosong" style="grid-column:1/-1">Tidak ada ikon yang cocok.</p>';
  }
  function bukaDialogIkon(kunci, bawaan) {
    ikonAktif = kunci;
    ikonBawaanAktif = bawaan || "";
    $("ikonCari").value = "";
    gambarPetakIkon();
    $("dialogIkon").hidden = false;
    $("ikonCari").focus();
  }
  function tutupDialogIkon() { $("dialogIkon").hidden = true; ikonAktif = null; }

  /* ------------------------------------------------------ dialog gambar */
  function bukaDialogGambar(kunci) {
    gambarAktif = kunci;
    var d = $("dialogGambar");
    $("gambarAlamat").value = /^data:/.test(nilai(kunci)) ? "" : nilai(kunci);
    $("gambarPeringatan").hidden = !/^data:/.test(nilai(kunci));
    $("gambarHapus").hidden = !nilai(kunci);
    d.hidden = false;
    $("gambarAlamat").focus();
  }
  function tutupDialogGambar() {
    $("dialogGambar").hidden = true;
    gambarAktif = null;
  }
  function setGambar(v) {
    if (!gambarAktif) return;
    setNilai(gambarAktif, v);
    kirimTeks();
    gambarDaftar();
  }

  /* ----------------------------------------------------------- ekspor */
  function csvLengkap() {
    var b = [["kunci", "halaman", "bagian", "isi", "keterangan"]];
    urutanKunci.forEach(function (k) {
      var v = nilai(k);
      if (k in KHUSUS && !v) return;
      if (/^data:/.test(v)) return;   // gambar dari komputer hanya pratinjau, tidak diekspor
      b.push([k, meta[k].halaman, meta[k].bagian, v, k in KHUSUS ? KHUSUS[k].label : ""]);
    });
    return window.keCSV(b);
  }
  function unduh(nama, isi) {
    var blob = new Blob(["﻿" + isi], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = nama;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function salin(teks, tombol) {
    var beres = function () {
      var t = tombol.textContent;
      tombol.textContent = "Tersalin"; tombol.classList.add("sukses");
      setTimeout(function () { tombol.textContent = t; tombol.classList.remove("sukses"); }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(teks).then(beres, function () { cadangan(teks, beres); });
    } else cadangan(teks, beres);
  }
  function cadangan(teks, beres) {
    var ta = document.createElement("textarea");
    ta.value = teks; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); beres(); } catch (e) { alert("Tidak bisa menyalin otomatis."); }
    ta.remove();
  }

  /* ------------------------------------------------------------ pasang */
  function pasang() {
    HALAMAN.forEach(function (h, i) {
      var o = document.createElement("option");
      o.value = h.berkas; o.textContent = h.nama;
      elPilihHalaman.appendChild(o);
      if (i === 0) elPilihHalaman.value = h.berkas;
    });
    elPilihHalaman.addEventListener("change", function () { bukaHalaman(this.value); });

    document.querySelectorAll("[data-lebar]").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll("[data-lebar]").forEach(function (x) { x.classList.remove("aktif"); });
        b.classList.add("aktif");
        elPratinjau.parentElement.style.maxWidth = b.getAttribute("data-lebar");
      });
    });

    ["_warna_utama", "_warna_aksen"].forEach(function (k) {
      var inp = $(k === "_warna_utama" ? "warnaUtama" : "warnaAksen");
      inp.value = nilai(k) || WARNA_BAWAAN[k];
      inp.addEventListener("input", function () {
        setNilai(k, inp.value);
        kirimTeks();
        gambarDaftar();
      });
    });

    $("tombolTampilan").addEventListener("click", function (e) {
      e.stopPropagation();
      var p = $("panelTampilan");
      p.hidden = !p.hidden;
      this.setAttribute("aria-expanded", p.hidden ? "false" : "true");
    });
    $("panelTampilan").addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("click", function () { $("panelTampilan").hidden = true;
      $("tombolTampilan").setAttribute("aria-expanded", "false"); });

    [["pilihHuruf", "_huruf"], ["pilihSudut", "_sudut"], ["pilihKartu", "_kartu"],
     ["pilihTombol", "_tombol"], ["pilihKerapatan", "_kerapatan"]].forEach(function (p) {
      var el = $(p[0]);
      el.value = nilai(p[1]) || WARNA_BAWAAN[p[1]];
      el.addEventListener("change", function () {
        setNilai(p[1], this.value); kirimTeks(); gambarDaftar();
      });
    });

    $("ikonCari").addEventListener("input", gambarPetakIkon);
    $("ikonPetak").addEventListener("click", function (e) {
      var b = e.target.closest(".ikon-pilihan");
      if (!b || !ikonAktif) return;
      setNilai(ikonAktif, b.getAttribute("data-ikon-nama"));
      kirimTeks(); gambarPetakIkon(); gambarDaftar();
    });
    $("ikonBawaan").addEventListener("click", function () {
      if (!ikonAktif) return;
      setNilai(ikonAktif, "");
      kirimTeks(); gambarPetakIkon(); gambarDaftar();
    });
    $("ikonTutup").addEventListener("click", tutupDialogIkon);

    $("pilihAnimasi").value = nilai("_animasi") || "nyala";
    $("pilihAnimasi").addEventListener("change", function () {
      setNilai("_animasi", this.value); kirimTeks(); gambarDaftar();
    });
    $("pilihKecepatan").value = nilai("_animasi_kecepatan") || "sedang";
    $("pilihKecepatan").addEventListener("change", function () {
      setNilai("_animasi_kecepatan", this.value); kirimTeks(); gambarDaftar();
    });

    $("gambarAlamat").addEventListener("input", function () { setGambar(this.value.trim()); });
    $("gambarTutup").addEventListener("click", tutupDialogGambar);
    $("gambarHapus").addEventListener("click", function () {
      setGambar(""); $("gambarAlamat").value = ""; $("gambarPeringatan").hidden = true; this.hidden = true;
    });
    $("gambarBerkas").addEventListener("change", function () {
      var f = this.files && this.files[0];
      if (!f) return;
      if (f.size > 3 * 1024 * 1024) { alert("Berkas terlalu besar untuk pratinjau (maksimal 3 MB)."); return; }
      var pembaca = new FileReader();
      pembaca.onload = function () {
        setGambar(pembaca.result);
        $("gambarAlamat").value = "";
        $("gambarPeringatan").hidden = false;
        $("gambarHapus").hidden = false;
      };
      pembaca.readAsDataURL(f);
      this.value = "";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!$("dialogGambar").hidden) tutupDialogGambar();
      else if (!$("dialogIkon").hidden) tutupDialogIkon();
      else if (!$("panelTampilan").hidden) $("panelTampilan").hidden = true;
    });

    $("tombolPanel").addEventListener("click", function () {
      document.body.classList.toggle("panel-tertutup");
      this.setAttribute("aria-expanded", document.body.classList.contains("panel-tertutup") ? "false" : "true");
    });

    elCari.addEventListener("input", gambarDaftar);
    elHanyaHalaman.addEventListener("change", gambarDaftar);
    elDaftar.addEventListener("click", function (e) {
      var b = e.target.closest(".baris");
      if (b) kirim({ jenis: "ketik", kunci: b.getAttribute("data-kunci") });
    });

    $("tombolUnduh").addEventListener("click", function () { unduh("WL-TEKS.csv", csvLengkap()); });
    $("tombolSalin").addEventListener("click", function () {
      var k = urutanKunci.filter(berubah);
      if (!k.length) { alert("Belum ada yang diubah."); return; }
      salin(k.map(function (x) { return x + "\t" + nilai(x); }).join("\n"), this);
    });
    $("tombolReset").addEventListener("click", function () {
      var n = jumlahUbah();
      if (!n) { alert("Belum ada perubahan."); return; }
      if (!confirm("Buang " + n + " perubahan dan kembalikan semuanya ke semula?")) return;
      ubah = {}; simpan(); perbaruiJumlah();
      $("warnaUtama").value = WARNA_BAWAAN._warna_utama;
      $("warnaAksen").value = WARNA_BAWAAN._warna_aksen;
      $("pilihAnimasi").value = "nyala";
      $("pilihKecepatan").value = "sedang";
      ["pilihHuruf", "pilihSudut", "pilihKartu", "pilihTombol", "pilihKerapatan"].forEach(function (id, i) {
        $(id).value = ["bawaan", "sedang", "bayangan", "bulat", "normal"][i];
      });
      bukaHalaman(elPilihHalaman.value);
      gambarDaftar();
    });

    window.addEventListener("beforeunload", function (e) {
      if (jumlahUbah()) { e.preventDefault(); e.returnValue = ""; }
    });
  }

  muatSimpanan();
  pasang();
  muatSumber().then(function () {
    perbaruiJumlah(); gambarDaftar(); bukaHalaman(HALAMAN[0].berkas);
  }).catch(function (e) {
    elStatus.textContent = "Gagal memuat daftar tulisan: " + e.message;
  });
})();
