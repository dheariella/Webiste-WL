/* =========================================================================
   produk.js — katalog & product knowledge
   Pencarian, filter kategori, filter gramasi, urutan, dan detail spesifikasi.
   ========================================================================= */
(function () {
  "use strict";

  var DATA = window.KAIN || [];
  var grid = document.getElementById("kainGrid");
  if (!grid) return;

  var inputCari = document.getElementById("cariKain");
  var pilihGramasi = document.getElementById("filterGramasi");
  var pilihUrutan = document.getElementById("urutanKain");
  var wadahChip = document.getElementById("chipKategori");
  var infoJumlah = document.getElementById("jumlahHasil");
  var modal = document.getElementById("modalKain");
  var modalIsi = document.getElementById("modalIsi");

  var kategoriAktif = "Semua";

  /* ---------- Chip kategori ---------- */
  var kategori = ["Semua"].concat(
    DATA.map(function (k) { return k.kategori; }).filter(function (v, i, a) { return a.indexOf(v) === i; })
  );
  wadahChip.innerHTML = kategori
    .map(function (k, i) {
      return '<button type="button" class="chip' + (i === 0 ? " is-active" : "") + '" data-kategori="' + k + '">' + k + "</button>";
    })
    .join("");
  wadahChip.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;
    kategoriAktif = chip.getAttribute("data-kategori");
    wadahChip.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
    chip.classList.add("is-active");
    render();
  });

  /* ---------- Penyaringan ---------- */
  function cocokGramasi(kain) {
    var v = pilihGramasi.value;
    if (v === "ringan") return kain.gsm < 150;
    if (v === "sedang") return kain.gsm >= 150 && kain.gsm <= 250;
    if (v === "tebal") return kain.gsm > 250;
    return true;
  }

  function cocokKataKunci(kain, q) {
    if (!q) return true;
    var teks = [kain.nama, kain.kategori, kain.komposisi, kain.tekstur, kain.konstruksi]
      .concat(kain.cocok || [])
      .join(" ")
      .toLowerCase();
    return q.split(/\s+/).every(function (kata) { return teks.indexOf(kata) !== -1; });
  }

  function saring() {
    var q = (inputCari.value || "").trim().toLowerCase();
    var hasil = DATA.filter(function (k) {
      return (kategoriAktif === "Semua" || k.kategori === kategoriAktif) && cocokGramasi(k) && cocokKataKunci(k, q);
    });
    var urut = pilihUrutan.value;
    if (urut === "ringan") hasil.sort(function (a, b) { return a.gsm - b.gsm; });
    else if (urut === "tebal") hasil.sort(function (a, b) { return b.gsm - a.gsm; });
    else hasil.sort(function (a, b) { return a.nama.localeCompare(b.nama, "id"); });
    return hasil;
  }

  /* ---------- Kartu kain ---------- */
  function kartu(k) {
    var warna = k.swatch || ["#d8d2c6", "#a79f90"];
    return (
      '<article class="kain-card" id="' + k.id + '">' +
        '<div class="kain-thumb" style="background:linear-gradient(135deg,' + warna[0] + "," + warna[1] + ')">' +
          '<span class="badge">' + k.kategori + "</span>" +
        "</div>" +
        '<div class="kain-body">' +
          "<h3>" + k.nama + "</h3>" +
          '<p class="kain-komposisi">' + k.komposisi + "</p>" +
          "<dl style=\"margin:0\">" +
            '<div class="spec-row"><dt>Gramasi</dt><dd>' + k.gramasi + "</dd></div>" +
            '<div class="spec-row"><dt>Lebar kain</dt><dd>' + k.lebar + "</dd></div>" +
            '<div class="spec-row"><dt>Konstruksi</dt><dd>' + k.konstruksi + "</dd></div>" +
          "</dl>" +
          '<div class="kain-actions">' +
            '<button type="button" class="btn btn-outline btn-sm" data-detail="' + k.id + '">Detail lengkap</button>' +
            '<a class="btn btn-wa btn-sm" data-wa data-wa-text="Halo, saya mau tanya stok dan harga kain ' + k.nama + '. Terima kasih.">Tanya harga</a>' +
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
        "<p>Stok kami berganti setiap minggu dan tidak semuanya tercatat di halaman ini.</p>" +
        '<a class="btn btn-wa" data-wa data-wa-text="Halo, saya mencari kain tertentu tapi belum ketemu di katalog website. Boleh dibantu?">Tanyakan langsung via WhatsApp</a></div>';
    } else {
      grid.innerHTML = hasil.map(kartu).join("");
    }
    infoJumlah.textContent =
      "Menampilkan " + hasil.length + " dari " + DATA.length + " jenis kain" +
      (kategoriAktif !== "Semua" ? " · kategori " + kategoriAktif : "");
    if (window.pasangTautanWa) window.pasangTautanWa(grid);
  }

  /* ---------- Modal detail ---------- */
  function daftar(judul, isi, kelas) {
    if (!isi || !isi.length) return "";
    return (
      '<div class="' + (kelas || "") + '"><h4>' + judul + "</h4><ul>" +
      isi.map(function (i) { return "<li>" + i + "</li>"; }).join("") +
      "</ul></div>"
    );
  }

  function bukaDetail(id) {
    var k = DATA.filter(function (x) { return x.id === id; })[0];
    if (!k) return;
    var warna = k.swatch || ["#d8d2c6", "#a79f90"];
    modalIsi.innerHTML =
      '<div class="modal-head" style="background:linear-gradient(135deg,' + warna[1] + ",#1b3651)\">" +
        '<button type="button" class="modal-close" aria-label="Tutup">&times;</button>' +
        "<h2>" + k.nama + "</h2><p>" + k.kategori + " · " + k.komposisi + "</p>" +
      "</div>" +
      '<div class="modal-body">' +
        "<table class=\"spec-table\"><tbody>" +
          "<tr><th>Komposisi</th><td>" + k.komposisi + "</td></tr>" +
          "<tr><th>Gramasi</th><td>" + k.gramasi + "</td></tr>" +
          "<tr><th>Lebar kain</th><td>" + k.lebar + "</td></tr>" +
          "<tr><th>Konstruksi</th><td>" + k.konstruksi + "</td></tr>" +
          "<tr><th>Tekstur</th><td>" + k.tekstur + "</td></tr>" +
          "<tr><th>Satuan jual</th><td>" + k.satuan + "</td></tr>" +
          "<tr><th>Ketersediaan warna</th><td>" + k.warna + "</td></tr>" +
          "<tr><th>Perawatan</th><td>" + k.perawatan + "</td></tr>" +
        "</tbody></table>" +
        "<h4 style=\"font-family:var(--font-sans);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-mute)\">Cocok untuk</h4>" +
        '<ul class="pill-list">' + (k.cocok || []).map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul>" +
        '<div class="pro-con">' +
          daftar("Kelebihan", k.kelebihan, "pro") +
          daftar("Yang perlu diperhatikan", k.kekurangan, "con") +
        "</div>" +
        (k.catatan ? '<blockquote style="margin:0 0 22px;padding:16px 20px;border-left:4px solid var(--terra);background:var(--terra-soft);border-radius:0 8px 8px 0"><strong>Catatan dari kami:</strong> ' + k.catatan + "</blockquote>" : "") +
        '<a class="btn btn-wa btn-block btn-lg" data-wa data-wa-text="Halo, saya tertarik dengan ' + k.nama + " (" + k.gramasi + '). Boleh minta info stok warna, harga, dan minimal order?">Tanya stok &amp; harga ' + k.nama + "</a>" +
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

  /* ---------- Reset & event ---------- */
  [inputCari, pilihGramasi, pilihUrutan].forEach(function (el) {
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  render();

  /* Buka detail otomatis bila halaman dibuka dengan #id-kain (mis. dari artikel) */
  if (location.hash) {
    var id = location.hash.slice(1);
    if (DATA.some(function (k) { return k.id === id; })) bukaDetail(id);
  }
})();
