/* =========================================================================
   main.js — dipakai di semua halaman
   - mengisi data toko dari config.js ke dalam HTML
   - membuat semua tautan WhatsApp
   - menu mobile, animasi reveal, tahun otomatis di footer
   ========================================================================= */
(function () {
  "use strict";

  var S = window.SITE || {};

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
    var th = document.querySelector("[data-tahun]");
    if (th) th.textContent = new Date().getFullYear();
    if (S.brand) {
      document.title = document.title.replace(/WL Textile/g, S.brand);
    }
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

  document.addEventListener("DOMContentLoaded", function () {
    isiTeks();
    isiJam();
    isiStats();
    pasangTautanWa(document);
    menuMobile();
    tandaiMenuAktif();
    reveal();
  });
})();
