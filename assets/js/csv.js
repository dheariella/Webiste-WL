/* =========================================================================
   csv.js — pembaca CSV sederhana, dipakai oleh halaman alat bantu
   (editor.html dan cek-sheet.html). Mendukung tanda kutip, koma di dalam
   sel, dan baris baru di dalam sel.
   ========================================================================= */
(function () {
  "use strict";

  function bacaCSV(csv) {
    var baris = [], sel = [], isi = "", kutip = false, i, c;
    for (i = 0; i < csv.length; i++) {
      c = csv[i];
      if (kutip) {
        if (c === '"') {
          if (csv[i + 1] === '"') { isi += '"'; i++; } else { kutip = false; }
        } else { isi += c; }
      } else if (c === '"') { kutip = true; }
      else if (c === ",") { sel.push(isi); isi = ""; }
      else if (c === "\n") { sel.push(isi); baris.push(sel); sel = []; isi = ""; }
      else if (c !== "\r") { isi += c; }
    }
    if (isi !== "" || sel.length) { sel.push(isi); baris.push(sel); }
    return baris.filter(function (b) { return b.some(function (s) { return s.trim() !== ""; }); });
  }

  function csvKeObjek(csv) {
    var baris = bacaCSV(csv);
    if (!baris.length) return [];
    var kepala = baris[0].map(function (h) { return h.trim().toLowerCase(); });
    return baris.slice(1).map(function (b) {
      var o = {};
      kepala.forEach(function (h, i) { if (h) o[h] = (b[i] || "").trim(); });
      return o;
    });
  }

  function selCSV(nilai) {
    var s = String(nilai == null ? "" : nilai);
    return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  function keCSV(barisArray) {
    return barisArray.map(function (b) { return b.map(selCSV).join(","); }).join("\r\n") + "\r\n";
  }

  window.bacaCSV = bacaCSV;
  window.csvKeObjek = csvKeObjek;
  window.keCSV = keCSV;
})();
