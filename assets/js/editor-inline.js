/* =========================================================================
   editor-inline.js — dimuat di dalam pratinjau editor (?editor=1)

   Tugasnya:
   - membuat setiap tulisan bisa diklik lalu diketik langsung di tempat
   - memberi tiap bagian halaman tombol naik, turun, dan sembunyikan
   - menerima perubahan teks, warna, dan urutan dari jendela editor

   Berkas ini tidak pernah dimuat pada kunjungan biasa.
   ========================================================================= */
(function () {
  "use strict";

  var ASAL = location.origin;
  var sedang = null;        // elemen yang sedang diketik
  var sedangPunyaTag = false;
  var jedaKirim = null;

  /* ------------------------------------------------------------ gaya */
  var gaya = document.createElement("style");
  gaya.textContent = [
    '[data-teks]{outline:1px dashed rgba(194,112,61,.5);outline-offset:3px;cursor:text;border-radius:3px;',
    '  transition:outline-color .12s ease,background-color .12s ease}',
    '[data-teks]:hover{outline:2px solid var(--terra,#c2703d);background:rgba(194,112,61,.09)}',
    '[data-teks][contenteditable="true"]{outline:2px solid var(--terra,#c2703d);background:#fffdf9;',
    '  box-shadow:0 0 0 4px rgba(194,112,61,.16);cursor:text}',
    '[data-teks][contenteditable="true"]:focus{outline:2px solid var(--terra,#c2703d)}',
    '@keyframes kedipEditor{0%,100%{background:rgba(194,112,61,.14)}50%{background:rgba(194,112,61,.4)}}',
    '[data-teks].kedip{animation:kedipEditor .7s ease 2}',
    '.wa-float{display:none !important}',
    '[data-bagian]{position:relative}',
    '[data-bagian].bagian-lewat{outline:2px dashed rgba(0,47,61,.35);outline-offset:-4px}',
    '[data-bagian].bagian-tersembunyi{opacity:.42;filter:grayscale(.55)}',
    '.tanda-sembunyi{position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:40;',
    '  background:#002f3d;color:#fff;font:700 11px/1 system-ui,sans-serif;letter-spacing:.08em;',
    '  text-transform:uppercase;padding:7px 12px;border-radius:999px;pointer-events:none}',
    '#alatBagian{position:absolute;z-index:50;display:none;gap:4px;padding:4px;border-radius:999px;',
    '  background:#002f3d;box-shadow:0 6px 20px rgba(0,47,61,.35)}',
    '#alatBagian.tampil{display:flex}',
    '#alatBagian button{font:700 12px/1 system-ui,sans-serif;color:#fff;background:transparent;border:0;',
    '  padding:7px 11px;border-radius:999px;cursor:pointer;white-space:nowrap}',
    '#alatBagian button:hover{background:rgba(255,255,255,.18)}',
    '#alatBagian button[disabled]{opacity:.35;cursor:default}',
    '#alatBagian .pisah{width:1px;background:rgba(255,255,255,.25);margin:4px 2px}',
    '#alatGambar{position:absolute;z-index:51;display:none;align-items:center;gap:6px;',
    '  background:#c2703d;color:#fff;border:0;border-radius:999px;padding:8px 14px;cursor:pointer;',
    '  font:700 12px/1 system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,47,61,.35)}',
    '#alatGambar.tampil{display:inline-flex}',
    '[data-gambar].gambar-lewat{outline:3px solid #c2703d;outline-offset:-3px}',
    '#alatIkon{position:absolute;z-index:52;display:none;align-items:center;gap:6px;',
    '  background:#002f3d;color:#fff;border:0;border-radius:999px;padding:7px 13px;cursor:pointer;',
    '  font:700 12px/1 system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,47,61,.35)}',
    '#alatIkon.tampil{display:inline-flex}',
    '[data-ikon].ikon-lewat{outline:2px solid #002f3d;outline-offset:4px;border-radius:6px}'
  ].join("");
  document.documentElement.appendChild(gaya);

  /* ------------------------------------------------- alat untuk bagian */
  var alat = document.createElement("div");
  alat.id = "alatBagian";
  alat.innerHTML =
    '<button type="button" data-aksi="naik" title="Pindah ke atas">&uarr; Naik</button>' +
    '<button type="button" data-aksi="turun" title="Pindah ke bawah">&darr; Turun</button>' +
    '<span class="pisah"></span>' +
    '<button type="button" data-aksi="sembunyi">Sembunyikan</button>';
  document.body.appendChild(alat);
  var bagianTersorot = null;

  var alatGambar = document.createElement("button");
  alatGambar.id = "alatGambar";
  alatGambar.type = "button";
  alatGambar.textContent = "Ganti gambar";
  document.body.appendChild(alatGambar);
  var slotTersorot = null;

  function tempatkanAlatGambar(slot) {
    var r = slot.getBoundingClientRect();
    alatGambar.style.top = (window.scrollY + r.top + 12) + "px";
    alatGambar.style.left = (window.scrollX + r.left + 12) + "px";
  }

  function sorotSlot(slot) {
    if (slotTersorot === slot) return;
    if (slotTersorot) slotTersorot.classList.remove("gambar-lewat");
    slotTersorot = slot;
    if (!slot) { alatGambar.classList.remove("tampil"); return; }
    slot.classList.add("gambar-lewat");
    alatGambar.textContent = slot.classList.contains("ada-gambar") ? "Ganti gambar" : "Tambah gambar";
    alatGambar.classList.add("tampil");
    tempatkanAlatGambar(slot);
  }

  var alatIkon = document.createElement("button");
  alatIkon.id = "alatIkon";
  alatIkon.type = "button";
  alatIkon.textContent = "Ganti ikon";
  document.body.appendChild(alatIkon);
  var ikonTersorot = null;

  function tempatkanAlatIkon(el) {
    var r = el.getBoundingClientRect();
    alatIkon.style.top = (window.scrollY + r.bottom + 8) + "px";
    alatIkon.style.left = (window.scrollX + r.left) + "px";
  }

  function sorotIkon(el) {
    if (ikonTersorot === el) return;
    if (ikonTersorot) ikonTersorot.classList.remove("ikon-lewat");
    ikonTersorot = el;
    if (!el) { alatIkon.classList.remove("tampil"); return; }
    el.classList.add("ikon-lewat");
    alatIkon.classList.add("tampil");
    tempatkanAlatIkon(el);
  }

  alatIkon.addEventListener("click", function (e) {
    e.preventDefault();
    if (!ikonTersorot) return;
    parent.postMessage({ dari: "pratinjau", jenis: "ikon",
                         kunci: ikonTersorot.getAttribute("data-ikon"),
                         bawaan: ikonTersorot.getAttribute("data-ikon-bawaan") || "" }, ASAL);
  });

  alatGambar.addEventListener("click", function (e) {
    e.preventDefault();
    if (!slotTersorot) return;
    parent.postMessage({ dari: "pratinjau", jenis: "gambar",
                         kunci: slotTersorot.getAttribute("data-gambar") }, ASAL);
  });

  function tempatkanAlat(sec) {
    var r = sec.getBoundingClientRect();
    alat.style.top = (window.scrollY + r.top + 12) + "px";
    alat.style.left = (window.scrollX + r.right - alat.offsetWidth - 16) + "px";
  }

  function sorotBagian(sec) {
    if (bagianTersorot === sec) return;
    if (bagianTersorot) bagianTersorot.classList.remove("bagian-lewat");
    bagianTersorot = sec;
    if (!sec) { alat.classList.remove("tampil"); return; }
    sec.classList.add("bagian-lewat");
    var sembunyi = sec.classList.contains("bagian-tersembunyi");
    alat.querySelector('[data-aksi="sembunyi"]').textContent = sembunyi ? "Tampilkan" : "Sembunyikan";
    alat.classList.add("tampil");
    tempatkanAlat(sec);
  }

  document.addEventListener("mousemove", function (e) {
    if (sedang) return;
    if (alat.contains(e.target)) return;
    var sec = e.target.closest && e.target.closest("[data-bagian]");
    sorotBagian(sec || null);
    if (alatIkon.contains(e.target)) return;
    var kotakIkon = e.target.closest && e.target.closest("[data-ikon]");
    sorotIkon(kotakIkon || null);
    if (alatGambar.contains(e.target)) return;
    var slot = e.target.closest && e.target.closest("[data-gambar]");
    sorotSlot(slot || null);
  });
  window.addEventListener("scroll", function () {
    if (bagianTersorot) tempatkanAlat(bagianTersorot);
    if (slotTersorot) tempatkanAlatGambar(slotTersorot);
    if (ikonTersorot) tempatkanAlatIkon(ikonTersorot);
  }, { passive: true });
  window.addEventListener("resize", function () {
    if (bagianTersorot) tempatkanAlat(bagianTersorot);
    if (slotTersorot) tempatkanAlatGambar(slotTersorot);
    if (ikonTersorot) tempatkanAlatIkon(ikonTersorot);
  });

  alat.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b || !bagianTersorot) return;
    e.preventDefault();
    parent.postMessage({
      dari: "pratinjau", jenis: "bagian",
      aksi: b.getAttribute("data-aksi"),
      nama: bagianTersorot.getAttribute("data-bagian")
    }, ASAL);
  });

  /* --------------------------------------------- mengetik di tempat */
  function bersihkan(html) {
    var wadah = document.createElement("div");
    wadah.innerHTML = html;
    (function bersihNode(induk) {
      [].slice.call(induk.childNodes).forEach(function (n) {
        if (n.nodeType === 3) return;
        if (n.nodeType !== 1) { n.remove(); return; }
        var tag = n.tagName.toLowerCase();
        if (["strong", "b", "em", "i", "br"].indexOf(tag) === -1) {
          while (n.firstChild) induk.insertBefore(n.firstChild, n);
          n.remove();
        } else {
          [].slice.call(n.attributes).forEach(function (a) { n.removeAttribute(a.name); });
          bersihNode(n);
        }
      });
    })(wadah);
    return wadah.innerHTML.replace(/ /g, " ").replace(/<br>\s*$/i, "").trim();
  }

  function nilaiMentah(el) {
    var k = el.getAttribute("data-teks");
    var T = window.TEKS || {};
    return typeof T[k] === "string" && T[k] !== "" ? T[k] : el.innerHTML;
  }

  function mulaiKetik(el, e) {
    if (sedang === el) return;
    if (sedang) selesaiKetik();
    sedang = el;
    var mentah = nilaiMentah(el);
    sedangPunyaTag = /<[a-z][\s\S]*>/i.test(mentah);
    if (sedangPunyaTag) el.innerHTML = mentah;
    else el.textContent = mentah;
    el.setAttribute("contenteditable", "true");
    el.setAttribute("spellcheck", "true");
    el.focus();
    // letakkan kursor di tempat yang diklik
    if (e && document.caretRangeFromPoint) {
      var r = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (r) {
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
      }
    }
    sorotBagian(null);
    parent.postMessage({ dari: "pratinjau", jenis: "pilih", kunci: el.getAttribute("data-teks") }, ASAL);
  }

  function bacaIsi(el) {
    return sedangPunyaTag ? bersihkan(el.innerHTML) : el.textContent.replace(/ /g, " ").trim();
  }

  function kirimIsi(el) {
    parent.postMessage({
      dari: "pratinjau", jenis: "ubah",
      kunci: el.getAttribute("data-teks"), isi: bacaIsi(el)
    }, ASAL);
  }

  function selesaiKetik() {
    if (!sedang) return;
    var el = sedang;
    sedang = null;
    clearTimeout(jedaKirim);
    el.removeAttribute("contenteditable");
    el.removeAttribute("spellcheck");
    kirimIsi(el);
    parent.postMessage({ dari: "pratinjau", jenis: "selesai" }, ASAL);
  }

  document.addEventListener("mousedown", function (e) {
    var sasaran = e.target.closest && e.target.closest("[data-teks]");
    if (sedang && sasaran !== sedang) selesaiKetik();
  }, true);

  document.addEventListener("click", function (e) {
    if (alat.contains(e.target) || alatGambar.contains(e.target) || alatIkon.contains(e.target)) return;
    var sasaran = e.target.closest && e.target.closest("[data-teks]");
    if (sasaran) {
      e.preventDefault();
      e.stopPropagation();
      mulaiKetik(sasaran, e);
      return;
    }
    var tautan = e.target.closest && e.target.closest("a[href], button");
    if (tautan) e.preventDefault();
  }, true);

  document.addEventListener("input", function (e) {
    if (!sedang || e.target !== sedang) return;
    clearTimeout(jedaKirim);
    jedaKirim = setTimeout(function () { kirimIsi(sedang); }, 180);
  });

  document.addEventListener("keydown", function (e) {
    if (!sedang) return;
    if (e.key === "Enter") { e.preventDefault(); selesaiKetik(); }
    else if (e.key === "Escape") { e.preventDefault(); selesaiKetik(); }
  }, true);

  document.addEventListener("paste", function (e) {
    if (!sedang) return;
    e.preventDefault();
    var teks = (e.clipboardData || window.clipboardData).getData("text/plain");
    document.execCommand("insertText", false, teks);
  }, true);

  document.addEventListener("submit", function (e) { e.preventDefault(); }, true);

  /* ----------------------------------- bagian tersembunyi tetap terlihat */
  function tandaiTersembunyi() {
    document.querySelectorAll("[data-bagian]").forEach(function (el) {
      var lama = el.querySelector(":scope > .tanda-sembunyi");
      if (el.hidden) {
        el.hidden = false;
        el.classList.add("bagian-tersembunyi");
        if (!lama) {
          var t = document.createElement("span");
          t.className = "tanda-sembunyi";
          t.textContent = "Disembunyikan";
          el.appendChild(t);
        }
      } else {
        el.classList.remove("bagian-tersembunyi");
        if (lama) lama.remove();
      }
    });
  }

  /* --------------------------------------------- pesan dari editor */
  function sorot(kunci) {
    var el = document.querySelector('[data-teks="' + kunci + '"]');
    if (!el) return;
    var det = el.closest("details");
    if (det) det.open = true;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("kedip");
    void el.offsetWidth;
    el.classList.add("kedip");
  }

  window.addEventListener("message", function (e) {
    if (e.origin !== ASAL || !e.data || e.data.dari !== "editor") return;
    var d = e.data;
    if (d.jenis === "teks") {
      window.TEKS = d.isi || {};
      if (window.terapkanTeks && !sedang) window.terapkanTeks();
      else if (window.terapkanTampilan) window.terapkanTampilan();
      tandaiTersembunyi();
    } else if (d.jenis === "sorot") {
      sorot(d.kunci);
    } else if (d.jenis === "ketik") {
      var el = document.querySelector('[data-teks="' + d.kunci + '"]');
      if (el) { sorot(d.kunci); mulaiKetik(el, null); }
    }
  });

  function laporSiap() {
    var kunci = [].map.call(document.querySelectorAll("[data-teks]"), function (el) {
      return el.getAttribute("data-teks");
    });
    var gambar = [].map.call(document.querySelectorAll("[data-gambar]"), function (el) {
      return el.getAttribute("data-gambar");
    });
    var ikon = [].map.call(document.querySelectorAll("[data-ikon]"), function (el) {
      return { kunci: el.getAttribute("data-ikon"), bawaan: el.getAttribute("data-ikon-bawaan") || "" };
    });
    var bagian = [].map.call(document.querySelectorAll("[data-bagian]"), function (el) {
      var j = el.querySelector("h1, h2, h3");
      return { nama: el.getAttribute("data-bagian"), judul: j ? j.textContent.trim().slice(0, 44) : "Bagian" };
    });
    parent.postMessage({ dari: "pratinjau", jenis: "siap", kunci: kunci, bagian: bagian, gambar: gambar, ikon: ikon }, ASAL);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(laporSiap, 60); });
  } else {
    setTimeout(laporSiap, 60);
  }
})();
