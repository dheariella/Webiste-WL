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

  /* ---------- Gambar ---------- */
  /* Mengubah tautan Google Drive menjadi alamat gambar yang bisa ditampilkan
     langsung, sekaligus membiarkan alamat biasa dan berkas lokal apa adanya. */
  function alamatGambar(nilai) {
    var v = String(nilai || "").trim();
    if (!v) return "";
    var m = v.match(/drive\.google\.com\/file\/d\/([-\w]{20,})/) ||
            v.match(/drive\.google\.com\/(?:open|uc)\?(?:[^#]*&)?id=([-\w]{20,})/) ||
            v.match(/drive\.google\.com\/thumbnail\?(?:[^#]*&)?id=([-\w]{20,})/);
    if (m) return "https://drive.google.com/thumbnail?id=" + m[1] + "&sz=w1600";
    return v;
  }
  window.alamatGambar = alamatGambar;

  function terapkanGambar() {
    var T = window.TEKS || {};
    document.querySelectorAll("[data-gambar]").forEach(function (slot) {
      var kunci = slot.getAttribute("data-gambar");
      var alamat = alamatGambar(T[kunci]);
      var img = slot.querySelector(":scope > img.gambar-isi");
      if (!alamat) {
        if (img) img.remove();
        slot.classList.remove("ada-gambar");
        return;
      }
      if (!img) {
        img = document.createElement("img");
        img.className = "gambar-isi";
        img.loading = "lazy";
        img.decoding = "async";
        img.alt = slot.getAttribute("data-gambar-alt") || "";
        slot.insertBefore(img, slot.firstChild);
      }
      if (img.getAttribute("src") !== alamat) img.setAttribute("src", alamat);
      slot.classList.add("ada-gambar");
    });
  }
  window.terapkanGambar = terapkanGambar;

  /* ---------- Terapkan tampilan khusus dari sheet (kunci berawalan _) ---------- */
  function terapkanTampilan() {
    var T = window.TEKS || {};

    // Warna
    var akar = document.documentElement;
    if (T._warna_utama) {
      akar.style.setProperty("--navy-900", T._warna_utama);
      akar.style.setProperty("--navy-800", campur(T._warna_utama, "#ffffff", 0.08));
      akar.style.setProperty("--navy-700", campur(T._warna_utama, "#ffffff", 0.16));
      akar.style.setProperty("--navy-600", campur(T._warna_utama, "#ffffff", 0.26));
    }
    if (T._warna_aksen) {
      akar.style.setProperty("--terra", T._warna_aksen);
      akar.style.setProperty("--terra-dark", campur(T._warna_aksen, "#000000", 0.14));
      akar.style.setProperty("--terra-soft", campur(T._warna_aksen, "#ffffff", 0.82));
    }

    // Bagian yang disembunyikan
    var sembunyi = (T._sembunyi || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
    document.querySelectorAll("[data-bagian]").forEach(function (el) {
      el.hidden = sembunyi.indexOf(el.getAttribute("data-bagian")) !== -1;
    });

    // Urutan bagian
    var urutan = (T._urutan || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
    if (urutan.length) {
      var induk = document.getElementById("konten");
      if (induk) {
        urutan.forEach(function (nama) {
          var el = induk.querySelector('[data-bagian="' + nama + '"]');
          if (el) induk.appendChild(el);
        });
      }
    }
  }
  window.terapkanTampilan = terapkanTampilan;

  function campur(warna, arah, kadar) {
    var a = keRgb(warna), b = keRgb(arah);
    if (!a || !b) return warna;
    var c = a.map(function (v, i) { return Math.round(v + (b[i] - v) * kadar); });
    return "#" + c.map(function (v) { return ("0" + Math.max(0, Math.min(255, v)).toString(16)).slice(-2); }).join("");
  }
  function keRgb(w) {
    var m = String(w).trim().replace(/^#/, "");
    if (m.length === 3) m = m[0] + m[0] + m[1] + m[1] + m[2] + m[2];
    if (!/^[0-9a-f]{6}$/i.test(m)) return null;
    return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
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
  window.terapkanTeks = function () {
    terapkanTeks();
    terapkanTampilan();
    terapkanGambar();
    terapkanGambar();
    if (window.terapkanAnimasi) window.terapkanAnimasi();
  };

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
    terapkanTampilan();
    terapkanGambar();
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
