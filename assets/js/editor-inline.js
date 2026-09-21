/* =========================================================================
   editor-inline.js — dimuat di dalam pratinjau editor (?editor=1)
   Membuat setiap tulisan yang bisa diubah dapat diklik, dan menerima
   perubahan teks dari jendela editor di sebelahnya.
   Berkas ini tidak pernah dimuat pada kunjungan biasa.
   ========================================================================= */
(function () {
  "use strict";

  var ASAL = location.origin;
  var terpilih = null;

  /* ---------- Gaya khusus mode editor ---------- */
  var gaya = document.createElement("style");
  gaya.textContent =
    '[data-teks] { outline: 1px dashed rgba(194,112,61,.55); outline-offset: 3px; cursor: pointer; ' +
    '  transition: outline-color .15s ease, background-color .15s ease; border-radius: 3px; }' +
    '[data-teks]:hover { outline: 2px solid var(--terra, #c2703d); background: rgba(194,112,61,.09); }' +
    '[data-teks].sedang-diubah { outline: 2px solid var(--terra, #c2703d); background: rgba(194,112,61,.16); }' +
    '@keyframes kedipEditor { 0%,100% { background: rgba(194,112,61,.16); } 50% { background: rgba(194,112,61,.4); } }' +
    '[data-teks].kedip { animation: kedipEditor .7s ease 2; }' +
    '.wa-float { display: none !important; }';
  document.documentElement.appendChild(gaya);

  /* ---------- Matikan navigasi supaya pratinjau tidak berpindah ---------- */
  document.addEventListener("click", function (e) {
    var sasaran = e.target.closest("[data-teks]");
    if (sasaran) {
      e.preventDefault();
      e.stopPropagation();
      pilih(sasaran);
      parent.postMessage({ dari: "pratinjau", jenis: "pilih", kunci: sasaran.getAttribute("data-teks") }, ASAL);
      return;
    }
    var tautan = e.target.closest("a[href], button, summary");
    if (tautan && !tautan.closest("[data-teks]")) {
      // biarkan <summary> tetap bisa dibuka agar isi FAQ terlihat
      if (tautan.tagName !== "SUMMARY") e.preventDefault();
    }
  }, true);

  document.addEventListener("submit", function (e) { e.preventDefault(); }, true);

  function pilih(el) {
    if (terpilih) terpilih.classList.remove("sedang-diubah");
    terpilih = el;
    if (el) el.classList.add("sedang-diubah");
  }

  function sorot(kunci) {
    var el = document.querySelector('[data-teks="' + kunci + '"]');
    if (!el) return;
    pilih(el);
    // buka <details> induk bila teks ada di dalam FAQ
    var det = el.closest("details");
    if (det) det.open = true;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("kedip");
    void el.offsetWidth;
    el.classList.add("kedip");
  }

  /* ---------- Terima perintah dari jendela editor ---------- */
  window.addEventListener("message", function (e) {
    if (e.origin !== ASAL || !e.data || e.data.dari !== "editor") return;
    var d = e.data;
    if (d.jenis === "teks") {
      window.TEKS = d.isi || {};
      if (window.terapkanTeks) window.terapkanTeks();
    } else if (d.jenis === "sorot") {
      sorot(d.kunci);
    } else if (d.jenis === "lepas") {
      pilih(null);
    }
  });

  function laporSiap() {
    var kunci = [].map.call(document.querySelectorAll("[data-teks]"), function (el) {
      return el.getAttribute("data-teks");
    });
    parent.postMessage({ dari: "pratinjau", jenis: "siap", halaman: location.pathname, kunci: kunci }, ASAL);
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(laporSiap, 60);
  } else {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(laporSiap, 60); });
  }
})();
