/* =========================================================================
   main.js — dipakai di semua halaman
   - mengisi data toko dari config.js ke dalam HTML
   - membuat semua tautan WhatsApp
   - menu mobile, animasi reveal, tahun otomatis di footer
   ========================================================================= */
(function () {
  "use strict";

  var S = window.SITE || {};
  var DIR_SKRIP = (document.currentScript && document.currentScript.src || "").replace(/[^/]+$/, "");
  var MODE_EDITOR = /[?&]editor=1(&|$)/.test(location.search);

  /* ---------- Tautan WhatsApp ---------- */
  function waLink(text) {
    var pesan = text || S.waDefaultText || "Halo, saya mau bertanya.";
    return "https://wa.me/" + (S.waNumber || "") + "?text=" + encodeURIComponent(pesan);
  }
  window.waLink = waLink; // dipakai juga oleh produk.js

  function pasangTautanWa(scope) {
    (scope || document).querySelectorAll("[data-wa]").forEach(function (el) {
      el.setAttribute("href", waLink(el.getAttribute("data-wa-text")));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }
  window.pasangTautanWa = pasangTautanWa;

  /* ---------- Penanda angka: {jumlah_kain}, {jumlah_warna}, dst ---------- */
  function angkaData() {
    var d = window.KAIN || [];
    if (!d.length) return S.angka || {};   // halaman tanpa data kain: pakai angka cadangan
    var kategori = {};
    d.forEach(function (k) { kategori[k.kategori] = 1; });
    return {
      jumlah_kain: d.length,
      jumlah_warna: d.reduce(function (n, k) { return n + ((k.warna || []).length); }, 0),
      jumlah_kategori: Object.keys(kategori).length,
      jumlah_sublim: d.filter(function (k) { return /sublim/i.test(k.kategori); }).length
    };
  }

  function gantiPenanda(teks) {
    var a = angkaData();
    return String(teks).replace(/\{(jumlah_[a-z]+)\}/g, function (cocok, kunci) {
      return kunci in a ? a[kunci] : cocok;
    });
  }

  /* ---------- Terapkan teks dari sheet WL — TEKS ---------- */
  function terapkanTeks() {
    var T = window.TEKS || {};
    document.querySelectorAll("[data-teks]").forEach(function (el) {
      var isi = T[el.getAttribute("data-teks")];
      if (typeof isi === "string" && isi !== "") {
        var baru = gantiPenanda(isi);
        if (el.innerHTML !== baru) el.innerHTML = baru;
      } else {
        // tidak ada di sheet: tetap pakai isi bawaan, tapi ganti penandanya
        if (el.innerHTML.indexOf("{jumlah_") !== -1) el.innerHTML = gantiPenanda(el.innerHTML);
      }
    });
  }
  window.terapkanTeks = terapkanTeks;

  /* ---------- Isi teks dari config ---------- */
  function isiTeks() {
    document.querySelectorAll("[data-site]").forEach(function (el) {
      var nilai = S[el.getAttribute("data-site")];
      if (typeof nilai === "string" && nilai) el.textContent = nilai;
    });
    document.querySelectorAll("[data-site-href]").forEach(function (el) {
      var nilai = S[el.getAttribute("data-site-href")];
      if (nilai) el.setAttribute("href", nilai);
      else el.closest("[data-hide-if-empty]") && el.closest("[data-hide-if-empty]").remove();
    });
    document.querySelectorAll('[data-site="telepon-link"]').forEach(function (el) {
      el.setAttribute("href", "tel:" + String(S.telepon || "").replace(/[^0-9+]/g, ""));
      el.textContent = S.telepon || "";
    });
    document.querySelectorAll('[data-site="email-link"]').forEach(function (el) {
      el.setAttribute("href", "mailto:" + (S.email || ""));
      el.textContent = S.email || "";
    });
    // Blok yang hanya tampil bila datanya sudah diisi di config.js
    document.querySelectorAll("[data-butuh]").forEach(function (el) {
      var nilai = S[el.getAttribute("data-butuh")];
      if (!nilai) el.remove();
    });
    var th = document.querySelector("[data-tahun]");
    if (th) th.textContent = new Date().getFullYear();

  }

  /* ---------- Jam operasional ---------- */
  function isiJam() {
    var wadah = document.querySelector("[data-jam]");
    if (!wadah || !Array.isArray(S.jam)) return;
    wadah.innerHTML = S.jam
      .map(function (j) {
        return "<tr><td>" + j.hari + "</td><td>" + j.buka + "</td></tr>";
      })
      .join("");
  }

  /* ---------- Statistik beranda ---------- */
  function isiStats() {
    var wadah = document.querySelector("[data-stats]");
    if (!wadah || !Array.isArray(S.stats)) return;
    wadah.innerHTML = S.stats
      .map(function (s) {
        return '<div class="stat"><strong>' + s.angka + "</strong><span>" + s.label + "</span></div>";
      })
      .join("");
  }

  /* ---------- Menu mobile ---------- */
  function menuMobile() {
    var tombol = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (!tombol || !nav) return;
    tombol.addEventListener("click", function () {
      var terbuka = nav.classList.toggle("is-open");
      tombol.setAttribute("aria-expanded", terbuka ? "true" : "false");
      tombol.setAttribute("aria-label", terbuka ? "Tutup menu" : "Buka menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        tombol.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Tandai menu halaman aktif ---------- */
  function tandaiMenuAktif() {
    var file = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").split("/").pop();
      if (href && href === file) a.classList.add("is-active");
    });
  }

  /* ---------- Animasi muncul saat discroll ---------- */
  function reveal() {
    var item = document.querySelectorAll(".reveal");
    if (!item.length) return;
    if (!("IntersectionObserver" in window)) {
      item.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    item.forEach(function (el) { io.observe(el); });
  }

  window.isiDataToko = function () {
    isiTeks();
    isiJam();
    isiStats();
  };

  document.addEventListener("DOMContentLoaded", function () {
    isiTeks();
    isiJam();
    isiStats();
    terapkanTeks();
    pasangTautanWa(document);
    menuMobile();
    tandaiMenuAktif();
    reveal();

    // Mode editor: muat alat bantu pengubah teks (tidak pernah aktif pada kunjungan biasa)
    if (MODE_EDITOR) {
      var sk = document.createElement("script");
      sk.src = DIR_SKRIP + "editor-inline.js";
      document.body.appendChild(sk);
    }
  });
})();
