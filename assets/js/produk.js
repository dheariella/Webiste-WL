/* =========================================================================
   produk.js — katalog & product knowledge
   Pencarian, filter kategori, filter lebar kain, urutan, dan detail kain.
   Bagian yang datanya masih kosong di sheet (gramasi, deskripsi, cocok
   untuk, harga roll) otomatis disembunyikan sampai datanya diisi.
   ========================================================================= */
(function () {
  "use strict";

  var DATA = window.KAIN || [];
  var grid = document.getElementById("kainGrid");
  if (!grid) return;

  var S = window.SITE || {};
  var TAMPIL_HARGA = S.tampilkanHarga !== false;

  var inputCari = document.getElementById("cariKain");
  var pilihLebar = document.getElementById("filterLebar");
  var pilihGramasi = document.getElementById("filterGramasi");
  var pilihUrutan = document.getElementById("urutanKain");
  var wadahChip = document.getElementById("chipKategori");
  var infoJumlah = document.getElementById("jumlahHasil");
  var modal = document.getElementById("modalKain");
  var modalIsi = document.getElementById("modalIsi");

  var kategoriAktif = "Semua";
  var adaGramasi = DATA.some(function (k) { return k.gsm; });

  /* ---------- Pembantu ---------- */
  function rupiah(n) {
    return "Rp " + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function hargaTeks(k) {
    if (!TAMPIL_HARGA || !k.harga) return "";
    return rupiah(k.harga) + " / " + (k.satuan || "").toLowerCase();
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------- Isi pilihan filter dari data ---------- */
  var kategori = ["Semua"].concat(
    DATA.map(function (k) { return k.kategori; }).filter(function (v, i, a) { return a.indexOf(v) === i; })
  );
  wadahChip.innerHTML = kategori
    .map(function (k, i) {
      var jml = k === "Semua" ? DATA.length : DATA.filter(function (x) { return x.kategori === k; }).length;
      return '<button type="button" class="chip' + (i === 0 ? " is-active" : "") +
             '" data-kategori="' + esc(k) + '">' + esc(k) + ' <span class="chip-count">' + jml + "</span></button>";
    })
    .join("");

  var lebarUnik = DATA.map(function (k) { return k.lebarCm; })
    .filter(function (v, i, a) { return v && a.indexOf(v) === i; })
    .sort(function (a, b) { return a - b; });
  pilihLebar.innerHTML = '<option value="semua">Semua lebar</option>' +
    lebarUnik.map(function (l) { return '<option value="' + l + '">' + l + " cm</option>"; }).join("");

  // Filter gramasi hanya ditampilkan bila kolom gramasi di sheet sudah diisi
  if (!adaGramasi && pilihGramasi) {
    var bungkus = pilihGramasi.closest(".field");
    if (bungkus) bungkus.hidden = true;
  }

  wadahChip.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;
    kategoriAktif = chip.getAttribute("data-kategori");
    wadahChip.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
    chip.classList.add("is-active");
    render();
  });

  /* ---------- Penyaringan ---------- */
  function cocokKataKunci(k, q) {
    if (!q) return true;
    var teks = [k.nama, k.kode, k.kategori, k.komposisi, k.lebar, k.deskripsi]
      .concat(k.cocok || [])
      .concat(k.warna || [])
      .join(" ")
      .toLowerCase();
    return q.split(/\s+/).every(function (kata) { return teks.indexOf(kata) !== -1; });
  }

  function saring() {
    var q = (inputCari.value || "").trim().toLowerCase();
    var lebar = pilihLebar.value;
    var gram = pilihGramasi ? pilihGramasi.value : "semua";

    var hasil = DATA.filter(function (k) {
      if (kategoriAktif !== "Semua" && k.kategori !== kategoriAktif) return false;
      if (lebar !== "semua" && String(k.lebarCm) !== lebar) return false;
      if (adaGramasi && gram !== "semua") {
        if (!k.gsm) return false;
        if (gram === "ringan" && !(k.gsm < 100)) return false;
        if (gram === "sedang" && !(k.gsm >= 100 && k.gsm <= 150)) return false;
        if (gram === "tebal" && !(k.gsm > 150)) return false;
      }
      return cocokKataKunci(k, q);
    });

    var urut = pilihUrutan.value;
    if (urut === "termurah") hasil.sort(function (a, b) { return a.harga - b.harga; });
    else if (urut === "termahal") hasil.sort(function (a, b) { return b.harga - a.harga; });
    else if (urut === "nama") hasil.sort(function (a, b) { return a.nama.localeCompare(b.nama, "id"); });
    else if (urut === "warna") hasil.sort(function (a, b) { return (b.warna || []).length - (a.warna || []).length; });
    else hasil.sort(function (a, b) { return a.urutan - b.urutan; });
    return hasil;
  }

  /* ---------- Kartu kain ---------- */
  function barisSpek(label, nilai) {
    if (!nilai) return "";
    return '<div class="spec-row"><dt>' + label + "</dt><dd>" + nilai + "</dd></div>";
  }

  function kartu(k) {
    var w = k.swatch || ["#d8d2c6", "#a79f90"];
    var jmlWarna = (k.warna || []).length;
    return (
      '<article class="kain-card" id="' + k.id + '">' +
        '<div class="kain-thumb" style="background:linear-gradient(135deg,' + w[0] + "," + w[1] + ')">' +
          '<span class="badge">' + esc(k.kategori) + "</span>" +
          (k.stok ? '<span class="badge badge--stok">' + esc(k.stok) + "</span>" : "") +
        "</div>" +
        '<div class="kain-body">' +
          '<span class="kain-kode">' + esc(k.kode) + "</span>" +
          "<h3>" + esc(k.nama) + "</h3>" +
          '<p class="kain-komposisi">' + esc(k.komposisi) + "</p>" +
          '<dl style="margin:0">' +
            barisSpek("Lebar kain", esc(k.lebar)) +
            barisSpek("Gramasi", k.gramasi ? esc(k.gramasi) : "") +
            barisSpek("Pilihan warna", jmlWarna ? jmlWarna + " warna" : "") +
            (TAMPIL_HARGA ? barisSpek("Harga", '<span class="harga">' + hargaTeks(k) + "</span>") : "") +
          "</dl>" +
          '<div class="kain-actions">' +
            '<button type="button" class="btn btn-outline btn-sm" data-detail="' + k.id + '">Detail</button>' +
            '<a class="btn btn-wa btn-sm" data-wa data-wa-text="Halo WL Textile, saya mau tanya kain ' +
              esc(k.nama) + " (kode " + esc(k.kode) + '). Boleh minta info stok warna dan harganya?">Pesan</a>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function render() {
    var hasil = saring();
    if (!hasil.length) {
      grid.innerHTML =
        '<div class="empty-state" style="grid-column:1/-1"><p><strong>Kain yang Anda cari belum tampil di sini.</strong></p>' +
        "<p>Stok kami berganti dan tidak semuanya tercatat di halaman ini.</p>" +
        '<a class="btn btn-wa" data-wa data-wa-text="Halo WL Textile, saya mencari kain tertentu tapi belum ketemu di katalog website. Boleh dibantu?">Tanyakan via WhatsApp</a></div>';
    } else {
      grid.innerHTML = hasil.map(kartu).join("");
    }
    infoJumlah.textContent =
      "Menampilkan " + hasil.length + " dari " + DATA.length + " jenis kain" +
      (kategoriAktif !== "Semua" ? " · " + kategoriAktif : "");
    if (window.pasangTautanWa) window.pasangTautanWa(grid);
  }

  /* ---------- Modal detail ---------- */
  function barisTabel(label, nilai) {
    if (!nilai) return "";
    return "<tr><th>" + label + "</th><td>" + nilai + "</td></tr>";
  }

  function bukaDetail(id) {
    var k = DATA.filter(function (x) { return x.id === id; })[0];
    if (!k) return;
    var w = k.swatch || ["#d8d2c6", "#a79f90"];
    var warna = k.warna || [];

    modalIsi.innerHTML =
      '<div class="modal-head" style="background:linear-gradient(135deg,' + w[1] + ',#1b3651)">' +
        '<button type="button" class="modal-close" aria-label="Tutup">&times;</button>' +
        "<h2>" + esc(k.nama) + "</h2>" +
        "<p>" + esc(k.kode) + " · " + esc(k.kategori) + "</p>" +
      "</div>" +
      '<div class="modal-body">' +
        (k.deskripsi ? "<p>" + esc(k.deskripsi) + "</p>" : "") +
        '<table class="spec-table"><tbody>' +
          barisTabel("Kode kain", esc(k.kode)) +
          barisTabel("Kategori", esc(k.kategori)) +
          barisTabel("Komposisi", esc(k.komposisi)) +
          barisTabel("Lebar kain", esc(k.lebar)) +
          barisTabel("Gramasi", k.gramasi ? esc(k.gramasi) : "") +
          (TAMPIL_HARGA ? barisTabel("Harga", '<span class="harga">' + hargaTeks(k) + "</span>") : "") +
          (TAMPIL_HARGA && k.hargaRoll ? barisTabel("Harga per roll", rupiah(k.hargaRoll)) : "") +
          barisTabel("Satuan jual", esc(k.satuan)) +
          barisTabel("Pilihan warna", warna.length ? warna.length + " warna" : "") +
          barisTabel("Status stok", k.stok ? esc(k.stok) : "") +
        "</tbody></table>" +
        (k.ketKategori ? '<p class="small muted">' + esc(k.ketKategori) + "</p>" : "") +
        (k.cocok && k.cocok.length
          ? '<h4 class="label-kecil">Cocok untuk</h4><ul class="pill-list">' +
            k.cocok.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>"
          : "") +
        (warna.length
          ? '<h4 class="label-kecil">Warna tersedia (' + warna.length + ")</h4>" +
            '<ul class="pill-list pill-list--warna">' +
            warna.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" +
            '<p class="small muted">Nama warna mengikuti katalog pabrik. Warna di layar bisa berbeda dari aslinya — minta foto atau sampel sebelum pesan banyak.</p>'
          : "") +
        (TAMPIL_HARGA
          ? '<p class="small muted">Harga dapat berubah sewaktu-waktu. Konfirmasi harga terbaru dan ketersediaan stok lewat WhatsApp.</p>'
          : "") +
        '<a class="btn btn-wa btn-block btn-lg" data-wa data-wa-text="Halo WL Textile, saya tertarik dengan ' +
          esc(k.nama) + " (kode " + esc(k.kode) + ", lebar " + esc(k.lebar) +
          '). Boleh minta info stok warna, harga terbaru, dan minimal ordernya?">Pesan ' + esc(k.nama) + "</a>" +
      "</div>";

    if (window.pasangTautanWa) window.pasangTautanWa(modalIsi);
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var tutup = modalIsi.querySelector(".modal-close");
    if (tutup) tutup.focus();
  }

  function tutupDetail() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  grid.addEventListener("click", function (e) {
    var tombol = e.target.closest("[data-detail]");
    if (tombol) bukaDetail(tombol.getAttribute("data-detail"));
  });
  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.closest(".modal-close")) tutupDetail();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) tutupDetail();
  });

  [inputCari, pilihLebar, pilihGramasi, pilihUrutan].forEach(function (el) {
    if (!el) return;
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  render();

  /* Buka detail otomatis bila halaman dibuka dengan #kode-kain (mis. dari artikel) */
  if (location.hash) {
    var id = location.hash.slice(1).toLowerCase();
    if (DATA.some(function (k) { return k.id === id; })) bukaDetail(id);
  }
})();
