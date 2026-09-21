/* =========================================================================
   ikon.js — pustaka ikon website
   Semua ikon bergaya garis 24×24 agar serasi. Dipakai oleh halaman
   (untuk menggambar ikon) dan oleh editor (untuk daftar pilihannya).
   ========================================================================= */
(function () {
  "use strict";

  /* nama yang tampil di editor : bentuk garis ikonnya */
  var IKON = {
    "gunting":      '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9"/><path d="M14.5 14.5 20 20"/><path d="M8.1 8.1 12 12"/>',
    "penggaris":    '<path d="M3 9h18v6H3z"/><path d="M7 9v3M11 9v3M15 9v3M19 9v3"/>',
    "meteran":      '<path d="M4 7h16v10H4z"/><path d="M8 7v4M12 7v4M16 7v4"/><circle cx="12" cy="15" r="1.5"/>',
    "palet":        '<path d="M12 21a9 9 0 1 1 9-9c0 1.7-1.3 3-3 3h-1.5a1.5 1.5 0 0 0-1.1 2.5A1.5 1.5 0 0 1 14 21h-2Z"/><circle cx="7.5" cy="12" r="1"/><circle cx="10" cy="8" r="1"/><circle cx="15" cy="8.5" r="1"/>',
    "printer":      '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
    "toko":         '<path d="M3 9h18l-1-5H4L3 9Z"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/>',
    "truk":         '<path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.3a4 4 0 0 0-1.2-2.9L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    "paket":        '<path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z"/><path d="m3 7 9 5 9-5"/><path d="M12 12v10"/>',
    "chat":         '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z"/>',
    "telepon":      '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    "surat":        '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
    "peta":         '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    "instagram":    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
    "jam":          '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "kalender":     '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/>',
    "bintang":      '<path d="m12 3 2.7 6.2 6.3.5-4.8 4.2 1.5 6.1L12 16.8 6.3 20l1.5-6.1L3 9.7l6.3-.5L12 3Z"/>',
    "hati":         '<path d="M12 20s-7-4.4-7-9.3A4 4 0 0 1 12 8a4 4 0 0 1 7 2.7C19 15.6 12 20 12 20Z"/>',
    "perisai":      '<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    "centang":      '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
    "label":        '<path d="M20.6 13.4 12 22l-9-9V4h9l8.6 8.6a1.4 1.4 0 0 1 0 2Z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
    "kilau":        '<path d="m12 3 1.9 4.9L19 10l-5.1 2.1L12 17l-1.9-4.9L5 10l5.1-2.1L12 3Z"/><path d="M18 16.5 18.8 19 21 19.8 18.8 20.6 18 23l-.8-2.4L15 19.8l2.2-.8Z"/>',
    "api":          '<path d="M12 22a6 6 0 0 0 6-6c0-4-4-5-4-9 0 0-3 1.5-3 5 0 1.5-1.5 1.5-1.5 0 0 0-1.5 1.5-1.5 4a6 6 0 0 0 4 6Z"/>',
    "daun":         '<path d="M4 20c0-8 6-14 16-14 0 10-6 14-12 14-2 0-4-.5-4 0Z"/><path d="M8 16c3-3 6-5 10-6"/>',
    "tetes":        '<path d="M12 3s6 6.4 6 10a6 6 0 0 1-12 0c0-3.6 6-10 6-10Z"/>',
    "matahari":     '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    "kaos":         '<path d="M8 3 4 5.5 6 9l2-1v13h8V8l2 1 2-3.5L16 3a4 4 0 0 1-8 0Z"/>',
    "gantungan":    '<path d="M12 8a2.5 2.5 0 1 1 2.5-2.5"/><path d="M12 8 3.5 14.5a1 1 0 0 0 .6 1.8h15.8a1 1 0 0 0 .6-1.8L12 8Z"/>',
    "gulungan":     '<ellipse cx="6" cy="12" rx="3" ry="8"/><path d="M6 4h10a3 8 0 0 1 0 16H6"/><path d="M16 4v16"/>',
    "lipatan":      '<path d="M3 6c3 0 3 3 6 3s3-3 6-3 3 3 6 3"/><path d="M3 12c3 0 3 3 6 3s3-3 6-3 3 3 6 3"/><path d="M3 18c3 0 3 3 6 3"/>',
    "timbangan":    '<path d="M12 3v18"/><path d="M5 7h14"/><path d="M8 7 5 14h6L8 7Z"/><path d="M16 7l-3 7h6l-3-7Z"/>',
    "dompet":       '<path d="M3 7a2 2 0 0 1 2-2h12v4"/><rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="17" cy="13" r="1.3"/>',
    "kartu":        '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    "diskon":       '<path d="m19 5-14 14"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',
    "orang":        '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    "grup":         '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><path d="M17 5.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14.5a6 6 0 0 1 4 5.5"/>',
    "gambar":       '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m4 17 5-5 4 4 3-2 4 4"/>',
    "kamera":       '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/>',
    "tautan":       '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
    "gembok":       '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    "info":         '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.8" r=".9"/>',
    "tanya":        '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4v.6"/><circle cx="12" cy="16.8" r=".9"/>',
    "globe":        '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/>'
  };

  window.IKON = IKON;

  window.gambarIkon = function (nama) {
    var isi = IKON[nama];
    if (!isi) return "";
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + isi + "</svg>";
  };
})();
