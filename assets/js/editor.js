/* =========================================================================
   editor.js — otak halaman editor.html
   Menyatukan: sumber teks (sheet atau salinan bawaan), pratinjau di dalam
   iframe, daftar tulisan yang bisa diubah, dan ekspor hasilnya.
   Perubahan disimpan sementara di browser (localStorage) sampai Anda
   mengunduh CSV atau menyalinnya ke Google Sheet.
   ========================================================================= */
(function () {
  "use strict";

  var ASAL = location.origin;
  var SIMPANAN = "wl-editor-perubahan-v1";

  var HALAMAN = [
    { berkas: "index.html", nama: "Beranda" },
    { berkas: "tentang.html", nama: "Tentang Kami" },
    { berkas: "produk.html", nama: "Katalog" },
    { berkas: "blog.html", nama: "Artikel" },
    { berkas: "kontak.html", nama: "Kontak" }
  ];

  var asli = {};        // kunci -> teks sumber (dari sheet atau CSV bawaan)
  var meta = {};        // kunci -> { halaman, bagian }
  var urutanKunci = []; // urutan asli dari CSV
  var ubah = {};        // kunci -> teks baru (hanya yang berbeda dari asli)
  var kunciDiHalaman = [];
  var kunciAktif = null;
  var sumberTeks = "";

  var elPratinjau = document.getElementById("pratinjau");
  var elDaftar = document.getElementById("daftar");
  var elCari = document.getElementById("cari");
  var elJumlah = document.getElementById("jumlahUbah");
  var elSumber = document.getElementById("sumber");
  var elPilihHalaman = document.getElementById("pilihHalaman");
  var elStatus = document.getElementById("status");
  var elHanyaHalaman = document.getElementById("hanyaHalaman");

  /* ------------------------------------------------ simpanan sementara */
  function muatSimpanan() {
    try { ubah = JSON.parse(localStorage.getItem(SIMPANAN)) || {}; }
    catch (e) { ubah = {}; }
  }
  function simpan() {
    try { localStorage.setItem(SIMPANAN, JSON.stringify(ubah)); } catch (e) {}
  }

  function nilai(kunci) {
    return kunci in ubah ? ubah[kunci] : (asli[kunci] || "");
  }
  function berubah(kunci) {
    return kunci in ubah && ubah[kunci] !== (asli[kunci] || "");
  }

  /* ------------------------------------------------ memuat sumber teks */
  function ambilCsv(url) {
    return fetch(url, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    });
  }

  function pasangSumber(baris, dariMana) {
    asli = {}; meta = {}; urutanKunci = [];
    baris.forEach(function (r) {
      var k = (r.kunci || "").trim();
      if (!k || /^(CARA_PAKAI|ATURAN_\d+)$/.test(k)) return;
      asli[k] = (r.isi || "").trim();
      meta[k] = { halaman: (r.halaman || "Lainnya").trim(), bagian: (r.bagian || "").trim() };
      urutanKunci.push(k);
    });
    sumberTeks = dariMana;
    elSumber.textContent = dariMana;
  }

  function muatSumber() {
    var cfgSheet = (window.SITE && window.SITE.sheet) || {};
    var dariSheet = cfgSheet.aktif && cfgSheet.teks
      ? ambilCsv(cfgSheet.teks).then(function (t) {
          var baris = window.csvKeObjek(t);
          var berisi = baris.filter(function (r) {
            return (r.kunci || "").trim() && !/^(CARA_PAKAI|ATURAN_\d+)$/.test(r.kunci.trim());
          });
          if (berisi.length < 20) throw new Error("sheet belum diisi");
          pasangSumber(baris, "Google Sheet WL — TEKS");
          return true;
        })
      : Promise.reject(new Error("sambungan sheet tidak aktif"));

    return dariSheet.catch(function () {
      return ambilCsv("data/WL-TEKS.csv").then(function (t) {
        pasangSumber(window.csvKeObjek(t), "salinan bawaan (data/WL-TEKS.csv)");
        return false;
      });
    });
  }

  /* ------------------------------------------------ daftar di panel kanan */
  function ringkas(teks, panjang) {
    var polos = String(teks).replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
    return polos.length > panjang ? polos.slice(0, panjang) + "…" : polos;
  }

  function gambarDaftar() {
    var q = (elCari.value || "").trim().toLowerCase();
    var batasiHalaman = elHanyaHalaman.checked && kunciDiHalaman.length;
    var tampil = urutanKunci.filter(function (k) {
      if (batasiHalaman && kunciDiHalaman.indexOf(k) === -1) return false;
      if (!q) return true;
      return (k + " " + nilai(k) + " " + meta[k].halaman + " " + meta[k].bagian).toLowerCase().indexOf(q) !== -1;
    });

    if (!tampil.length) {
      elDaftar.innerHTML = '<p class="kosong">Tidak ada tulisan yang cocok.</p>';
      return;
    }

    var html = "", bagianTerakhir = "";
    tampil.forEach(function (k) {
      var m = meta[k];
      var judulBagian = m.halaman + (m.bagian ? " · " + m.bagian : "");
      if (judulBagian !== bagianTerakhir) {
        bagianTerakhir = judulBagian;
        html += '<h3 class="grup">' + judulBagian + "</h3>";
      }
      html += '<button type="button" class="baris' + (berubah(k) ? " diubah" : "") +
              (k === kunciAktif ? " aktif" : "") + '" data-kunci="' + k + '">' +
              '<span class="cuplik">' + (ringkas(nilai(k), 70) || "(kosong)") + "</span>" +
              '<span class="kunci-kecil">' + k + "</span></button>";
    });
    elDaftar.innerHTML = html;
  }

  function perbaruiJumlah() {
    var n = Object.keys(ubah).filter(berubah).length;
    elJumlah.textContent = n;
    document.body.classList.toggle("ada-perubahan", n > 0);
  }

  /* ------------------------------------------------ kotak ubah */
  function bukaKunci(k, gulirDaftar) {
    kunciAktif = k;
    var m = meta[k] || { halaman: "", bagian: "" };
    var kotak = document.getElementById("kotakUbah");
    kotak.hidden = false;
    document.getElementById("kotakLokasi").textContent = m.halaman + (m.bagian ? " · " + m.bagian : "");
    document.getElementById("kotakKunci").textContent = k;
    var ta = document.getElementById("kotakIsi");
    ta.value = nilai(k);
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
    document.getElementById("tombolKembalikan").hidden = !berubah(k);
    var adaPenanda = /\{jumlah_[a-z]+\}/.test(nilai(k));
    document.getElementById("catatanPenanda").hidden = !adaPenanda;
    gambarDaftar();
    if (gulirDaftar) {
      var b = elDaftar.querySelector('.baris[data-kunci="' + k + '"]');
      if (b) b.scrollIntoView({ block: "center" });
    }
    kirimKePratinjau({ jenis: "sorot", kunci: k });
  }

  function tutupKotak() {
    kunciAktif = null;
    document.getElementById("kotakUbah").hidden = true;
    kirimKePratinjau({ jenis: "lepas" });
    gambarDaftar();
  }

  /* ------------------------------------------------ pratinjau */
  function kirimKePratinjau(pesan) {
    if (!elPratinjau.contentWindow) return;
    pesan.dari = "editor";
    try { elPratinjau.contentWindow.postMessage(pesan, ASAL); } catch (e) {}
  }

  function kirimTeks() {
    var gabung = {};
    urutanKunci.forEach(function (k) { gabung[k] = nilai(k); });
    kirimKePratinjau({ jenis: "teks", isi: gabung });
  }

  function bukaHalaman(berkas) {
    elStatus.textContent = "Memuat pratinjau…";
    elPratinjau.src = berkas + "?editor=1";
  }

  window.addEventListener("message", function (e) {
    if (e.origin !== ASAL || !e.data || e.data.dari !== "pratinjau") return;
    if (e.data.jenis === "siap") {
      kunciDiHalaman = e.data.kunci || [];
      kirimTeks();
      elStatus.textContent = kunciDiHalaman.length + " tulisan bisa diklik di halaman ini";
      gambarDaftar();
      if (kunciAktif && kunciDiHalaman.indexOf(kunciAktif) !== -1) {
        kirimKePratinjau({ jenis: "sorot", kunci: kunciAktif });
      }
    } else if (e.data.jenis === "pilih") {
      bukaKunci(e.data.kunci, true);
    }
  });

  /* ------------------------------------------------ ekspor */
  function csvLengkap() {
    var baris = [["kunci", "halaman", "bagian", "isi", "keterangan"]];
    urutanKunci.forEach(function (k) {
      baris.push([k, meta[k].halaman, meta[k].bagian, nilai(k), ""]);
    });
    return window.keCSV(baris);
  }

  function unduh(namaBerkas, isi, tipe) {
    var blob = new Blob(["﻿" + isi], { type: tipe + ";charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = namaBerkas;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  function salin(teks, tombol) {
    var selesai = function () {
      var asliTeks = tombol.textContent;
      tombol.textContent = "Tersalin";
      tombol.classList.add("sukses");
      setTimeout(function () { tombol.textContent = asliTeks; tombol.classList.remove("sukses"); }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(teks).then(selesai, function () { salinCadangan(teks, selesai); });
    } else { salinCadangan(teks, selesai); }
  }
  function salinCadangan(teks, selesai) {
    var ta = document.createElement("textarea");
    ta.value = teks;
    ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); selesai(); } catch (e) { alert("Tidak bisa menyalin otomatis. Salin manual dari kotak isian."); }
    ta.remove();
  }

  /* ------------------------------------------------ pasang kejadian */
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

    elCari.addEventListener("input", gambarDaftar);
    elHanyaHalaman.addEventListener("change", gambarDaftar);

    elDaftar.addEventListener("click", function (e) {
      var b = e.target.closest(".baris");
      if (b) bukaKunci(b.getAttribute("data-kunci"), false);
    });

    var ta = document.getElementById("kotakIsi");
    ta.addEventListener("input", function () {
      if (!kunciAktif) return;
      if (ta.value === (asli[kunciAktif] || "")) delete ubah[kunciAktif];
      else ubah[kunciAktif] = ta.value;
      simpan();
      perbaruiJumlah();
      document.getElementById("tombolKembalikan").hidden = !berubah(kunciAktif);
      document.getElementById("catatanPenanda").hidden = !/\{jumlah_[a-z]+\}/.test(ta.value);
      kirimTeks();
      gambarDaftar();
    });

    document.getElementById("tombolTutupKotak").addEventListener("click", tutupKotak);
    document.getElementById("tombolKembalikan").addEventListener("click", function () {
      if (!kunciAktif) return;
      delete ubah[kunciAktif];
      simpan(); perbaruiJumlah(); kirimTeks();
      bukaKunci(kunciAktif, false);
    });

    document.getElementById("tombolUnduh").addEventListener("click", function () {
      unduh("WL-TEKS.csv", csvLengkap(), "text/csv");
    });

    document.getElementById("tombolSalin").addEventListener("click", function () {
      var kunciBerubah = urutanKunci.filter(berubah);
      if (!kunciBerubah.length) { alert("Belum ada tulisan yang diubah."); return; }
      salin(kunciBerubah.map(function (k) { return k + "\t" + nilai(k); }).join("\n"), this);
    });

    document.getElementById("tombolReset").addEventListener("click", function () {
      var n = Object.keys(ubah).filter(berubah).length;
      if (!n) { alert("Belum ada perubahan."); return; }
      if (!confirm("Buang " + n + " perubahan dan kembalikan semua tulisan ke semula?")) return;
      ubah = {}; simpan(); perbaruiJumlah(); kirimTeks(); gambarDaftar();
      if (kunciAktif) bukaKunci(kunciAktif, false);
    });

    window.addEventListener("beforeunload", function (e) {
      if (Object.keys(ubah).filter(berubah).length) { e.preventDefault(); e.returnValue = ""; }
    });
  }

  /* ------------------------------------------------ mulai */
  muatSimpanan();
  pasang();
  muatSumber().then(function () {
    perbaruiJumlah();
    gambarDaftar();
    bukaHalaman(HALAMAN[0].berkas);
  }).catch(function (e) {
    elStatus.textContent = "Gagal memuat daftar tulisan: " + e.message;
  });
})();
