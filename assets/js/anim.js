/* =========================================================================
   anim.js — menyalakan animasi dan menghitung angka statistik
   Dikendalikan dua baris di sheet WL — TEKS:
     _animasi            -> "nyala" (bawaan) atau "mati"
     _animasi_kecepatan  -> "lambat", "sedang" (bawaan), atau "cepat"
   ========================================================================= */
(function () {
  "use strict";

  var KECEPATAN = { lambat: ".95s", sedang: ".65s", cepat: ".38s" };
  var pengamat = null;

  function pengaturan() {
    var T = window.TEKS || {};
    return {
      nyala: String(T._animasi || "nyala").toLowerCase() !== "mati",
      kecepatan: String(T._animasi_kecepatan || "sedang").toLowerCase()
    };
  }

  function terapkanAnimasi() {
    var p = pengaturan();
    var akar = document.documentElement;
    akar.setAttribute("data-animasi", p.nyala ? "nyala" : "mati");
    akar.style.setProperty("--anim-durasi", KECEPATAN[p.kecepatan] || KECEPATAN.sedang);
    if (p.nyala) amati(); else tampilkanSemua();
  }
  window.terapkanAnimasi = terapkanAnimasi;

  function tampilkanSemua() {
    document.querySelectorAll("[data-anim], .reveal").forEach(function (el) {
      el.classList.add("tampil", "is-visible");
    });
    document.querySelectorAll("[data-hitung]").forEach(function (el) {
      el.textContent = el.getAttribute("data-hitung-asli") || el.textContent;
    });
  }

  /* ---------- Muncul saat digulir ---------- */
  function amati() {
    var item = document.querySelectorAll("[data-anim]:not(.tampil), .reveal:not(.is-visible)");
    if (!item.length) return;
    if (!("IntersectionObserver" in window)) { tampilkanSemua(); return; }
    if (!pengamat) {
      pengamat = new IntersectionObserver(function (baris) {
        baris.forEach(function (b) {
          if (!b.isIntersecting) return;
          var el = b.target;
          var tunda = parseInt(el.getAttribute("data-anim-tunda") || "0", 10);
          setTimeout(function () {
            el.classList.add("tampil", "is-visible");
            if (el.hasAttribute("data-hitung")) hitungNaik(el);
          }, tunda);
          pengamat.unobserve(el);
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    }
    item.forEach(function (el) { pengamat.observe(el); });
  }

  /* ---------- Angka yang menghitung naik ---------- */
  function hitungNaik(el) {
    var tujuanTeks = el.getAttribute("data-hitung-asli") || el.textContent.trim();
    el.setAttribute("data-hitung-asli", tujuanTeks);
    var angka = tujuanTeks.replace(/[^0-9]/g, "");
    if (!angka) { el.textContent = tujuanTeks; return; }
    var tujuan = parseInt(angka, 10);
    var depan = tujuanTeks.slice(0, tujuanTeks.indexOf(angka));
    var belakang = tujuanTeks.slice(tujuanTeks.indexOf(angka) + angka.length);
    var mulai = performance.now();
    var lama = tujuan > 400 ? 1400 : 1000;
    function langkah(kini) {
      var maju = Math.min(1, (kini - mulai) / lama);
      var halus = 1 - Math.pow(1 - maju, 3);
      el.textContent = depan + Math.round(tujuan * halus) + belakang;
      if (maju < 1) requestAnimationFrame(langkah);
      else el.textContent = tujuanTeks;
    }
    requestAnimationFrame(langkah);
  }

  /* ---------- Sorotan mengikuti kursor ---------- */
  function sorotKursor() {
    document.addEventListener("pointermove", function (e) {
      var kartu = e.target.closest && e.target.closest(".kain-card");
      if (!kartu) return;
      var r = kartu.getBoundingClientRect();
      kartu.style.setProperty("--kursor-x", (e.clientX - r.left) + "px");
      kartu.style.setProperty("--kursor-y", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* ---------- Deretan nama kain berjalan ---------- */
  function siapkanPita() {
    document.querySelectorAll(".pita-jalur").forEach(function (jalur) {
      if (jalur.getAttribute("data-siap")) return;
      var isi = jalur.querySelector(".pita-isi");
      if (!isi) return;
      jalur.appendChild(isi.cloneNode(true)); // salinan kedua agar gulirannya mulus
      jalur.setAttribute("data-siap", "1");
    });
  }

  function mulai() {
    siapkanPita();
    sorotKursor();
    terapkanAnimasi();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mulai);
  else mulai();
})();
