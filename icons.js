/* أيقونات SVG محلية مرسومة برمجيًا – لا تعتمد على أي رابط خارجي */
(function () {
  const I = {};

  /* شخصية فهد الافتراضية: طفل بالثوب والشماغ يحمل درعًا */
  I.fahd = `
<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="فهد بالثوب السعودي يحمل درع الحماية">
  <defs>
    <pattern id="shm" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="10" height="10" fill="#fff"/>
      <rect width="5" height="5" fill="#d7263d"/>
      <rect x="5" y="5" width="5" height="5" fill="#d7263d"/>
    </pattern>
    <linearGradient id="thobe" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e3ecf5"/>
    </linearGradient>
    <linearGradient id="shG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2ec4ff"/><stop offset="1" stop-color="#1167d8"/>
    </linearGradient>
  </defs>
  <ellipse cx="110" cy="250" rx="70" ry="8" fill="#000" opacity=".25"/>
  <!-- الثوب -->
  <path d="M58 150 Q60 128 84 122 L136 122 Q160 128 162 150 L172 246 L48 246 Z" fill="url(#thobe)" stroke="#9fb3c8" stroke-width="2"/>
  <path d="M110 124 L110 182" stroke="#c5d3e0" stroke-width="2"/>
  <circle cx="110" cy="140" r="2.6" fill="#b7c6d6"/><circle cx="110" cy="154" r="2.6" fill="#b7c6d6"/><circle cx="110" cy="168" r="2.6" fill="#b7c6d6"/>
  <!-- الذراع اليسرى (تلوّح) -->
  <g class="fahd-wave">
    <path d="M150 140 Q178 128 184 98" stroke="#fff" stroke-width="20" stroke-linecap="round" fill="none"/>
    <path d="M150 140 Q178 128 184 98" stroke="#9fb3c8" stroke-width="22" stroke-linecap="round" fill="none" opacity=".35"/>
    <circle cx="185" cy="92" r="11" fill="#e9b88f"/>
  </g>
  <!-- الرأس -->
  <circle cx="110" cy="84" r="40" fill="#efc39b"/>
  <!-- الشماغ -->
  <path d="M64 92 Q62 40 110 36 Q158 40 156 92 L166 132 Q140 116 136 92 Q134 70 110 68 Q86 70 84 92 Q80 116 54 132 Z" fill="url(#shm)" stroke="#a51d2e" stroke-width="2"/>
  <ellipse cx="110" cy="44" rx="40" ry="10" fill="none" stroke="#1d1d2b" stroke-width="7"/>
  <ellipse cx="110" cy="44" rx="40" ry="10" fill="none" stroke="#3a3a4d" stroke-width="2" transform="translate(0 6)"/>
  <!-- الوجه -->
  <ellipse cx="96" cy="88" rx="5" ry="6.5" fill="#1f2a44"/><ellipse cx="124" cy="88" rx="5" ry="6.5" fill="#1f2a44"/>
  <circle cx="97.5" cy="85.5" r="1.8" fill="#fff"/><circle cx="125.5" cy="85.5" r="1.8" fill="#fff"/>
  <path d="M89 77 Q96 73 103 77" stroke="#3b2a1f" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M117 77 Q124 73 131 77" stroke="#3b2a1f" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse cx="86" cy="101" rx="7" ry="4" fill="#ff8f8f" opacity=".55"/><ellipse cx="134" cy="101" rx="7" ry="4" fill="#ff8f8f" opacity=".55"/>
  <path d="M98 104 Q110 116 122 104" stroke="#7a3b2a" stroke-width="3.5" fill="#fff" stroke-linecap="round"/>
  <!-- الدرع في اليد اليمنى -->
  <g transform="translate(20 132)">
    <path d="M42 0 L80 12 Q82 56 42 84 Q2 56 4 12 Z" fill="url(#shG)" stroke="#0b2a55" stroke-width="3"/>
    <rect x="28" y="36" width="28" height="22" rx="4" fill="#ffd23f" stroke="#0b2a55" stroke-width="2.5"/>
    <path d="M33 36 V28 Q42 16 51 28 V36" fill="none" stroke="#0b2a55" stroke-width="4"/>
    <circle cx="42" cy="46" r="3.2" fill="#0b2a55"/><rect x="40.6" y="47" width="2.8" height="6" fill="#0b2a55"/>
  </g>
  <circle cx="72" cy="176" r="10" fill="#e9b88f"/>
</svg>`;

  /* درع اللاعب */
  I.shield = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M50 6 L88 18 Q90 62 50 94 Q10 62 12 18 Z" fill="#1ec98b" stroke="#08402c" stroke-width="5" stroke-linejoin="round"/>
  <path d="M50 16 L78 25 Q78 58 50 82" fill="none" stroke="#bff5df" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <rect x="34" y="44" width="32" height="25" rx="5" fill="#fff" stroke="#08402c" stroke-width="4"/>
  <path d="M40 44 V36 Q50 22 60 36 V44" fill="none" stroke="#08402c" stroke-width="5" stroke-linecap="round"/>
  <circle cx="50" cy="55" r="4" fill="#08402c"/>
</svg>`;

  /* فيروس كرتوني لطيف */
  I.virus = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="#5a1a78" stroke-width="5" stroke-linecap="round">
    <line x1="50" y1="8" x2="50" y2="22"/><line x1="50" y1="78" x2="50" y2="92"/>
    <line x1="8" y1="50" x2="22" y2="50"/><line x1="78" y1="50" x2="92" y2="50"/>
    <line x1="20" y1="20" x2="30" y2="30"/><line x1="80" y1="80" x2="70" y2="70"/>
    <line x1="80" y1="20" x2="70" y2="30"/><line x1="20" y1="80" x2="30" y2="70"/>
  </g>
  <g fill="#c86bfa" stroke="#5a1a78" stroke-width="3">
    <circle cx="50" cy="7" r="5"/><circle cx="50" cy="93" r="5"/><circle cx="7" cy="50" r="5"/><circle cx="93" cy="50" r="5"/>
    <circle cx="18" cy="18" r="5"/><circle cx="82" cy="82" r="5"/><circle cx="82" cy="18" r="5"/><circle cx="18" cy="82" r="5"/>
  </g>
  <circle cx="50" cy="50" r="30" fill="#b14cf0" stroke="#5a1a78" stroke-width="5"/>
  <circle cx="38" cy="40" r="5" fill="#d9a3ff" opacity=".7"/>
  <ellipse cx="41" cy="50" rx="4.5" ry="6" fill="#2a0b3d"/><ellipse cx="59" cy="50" rx="4.5" ry="6" fill="#2a0b3d"/>
  <circle cx="42.5" cy="48" r="1.6" fill="#fff"/><circle cx="60.5" cy="48" r="1.6" fill="#fff"/>
  <path d="M42 61 Q50 67 58 61" stroke="#2a0b3d" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M55 63 l3 4 l3 -4" fill="#fff" stroke="#2a0b3d" stroke-width="1.5"/>
</svg>`;

  /* الشعار التوعوي: درع + قفل + دوائر تقنية */
  I.logo = `
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="شعار الأمن السيبراني: درع وقفل">
  <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fe0ff"/><stop offset="1" stop-color="#1a6dff"/></linearGradient></defs>
  <g stroke="#3fe0ff" stroke-width="2.5" fill="none" opacity=".8">
    <path d="M10 40 H24 L30 46"/><path d="M10 80 H22 L28 74"/><path d="M110 40 H96 L90 46"/><path d="M110 80 H98 L92 74"/>
  </g>
  <g fill="#ffd23f"><circle cx="9" cy="40" r="4"/><circle cx="9" cy="80" r="4"/><circle cx="111" cy="40" r="4"/><circle cx="111" cy="80" r="4"/></g>
  <path d="M60 8 L98 20 Q100 70 60 112 Q20 70 22 20 Z" fill="url(#lg)" stroke="#071a3d" stroke-width="4" stroke-linejoin="round"/>
  <rect x="42" y="54" width="36" height="28" rx="6" fill="#ffd23f" stroke="#071a3d" stroke-width="3.5"/>
  <path d="M48 54 V44 Q60 28 72 44 V54" fill="none" stroke="#071a3d" stroke-width="5" stroke-linecap="round"/>
  <circle cx="60" cy="66" r="4.5" fill="#071a3d"/><rect x="58" y="67" width="4" height="8" rx="1.5" fill="#071a3d"/>
</svg>`;

  /* أيقونات البطاقات */
  const wrap = (body, bg) => `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="60" cy="60" r="56" fill="${bg}"/>${body}</svg>`;
  const N = "#0b1d3f";
  I.card = {
    lock: wrap(`<rect x="34" y="54" width="52" height="40" rx="8" fill="#ffd23f" stroke="${N}" stroke-width="5"/><path d="M44 54 V42 Q60 18 76 42 V54" fill="none" stroke="${N}" stroke-width="7" stroke-linecap="round"/><circle cx="60" cy="72" r="6" fill="${N}"/>`, "#cfe9ff"),
    link: wrap(`<rect x="24" y="30" width="72" height="54" rx="10" fill="#fff" stroke="${N}" stroke-width="5"/><path d="M24 40 L60 64 L96 40" fill="none" stroke="${N}" stroke-width="5"/><circle cx="88" cy="32" r="13" fill="#ff7a2f" stroke="${N}" stroke-width="4"/><text x="88" y="38" font-size="18" font-weight="900" text-anchor="middle" fill="#fff">!</text><path d="M44 96 a9 9 0 0 1 0-13 l6-6 M76 96 a9 9 0 0 0 0-13 l-6-6 M52 90 l16 0" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/>`, "#ffe2cf"),
    download: wrap(`<rect x="34" y="18" width="52" height="84" rx="10" fill="#fff" stroke="${N}" stroke-width="5"/><path d="M60 38 V70 M46 58 L60 72 L74 58" stroke="#1ec98b" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="90" r="4" fill="${N}"/>`, "#d3f7e6"),
    key: wrap(`<circle cx="44" cy="60" r="18" fill="#ffd23f" stroke="${N}" stroke-width="5"/><circle cx="44" cy="60" r="6" fill="${N}"/><path d="M62 60 H98 M86 60 V72 M96 60 V70" stroke="${N}" stroke-width="7" stroke-linecap="round"/><path d="M80 26 l14 14 M94 26 l-14 14" stroke="#ff4d4d" stroke-width="6" stroke-linecap="round"/>`, "#ffe2cf"),
    update: wrap(`<path d="M86 52 A28 28 0 1 0 82 78" fill="none" stroke="${N}" stroke-width="8" stroke-linecap="round"/><path d="M90 34 L88 56 L68 50" fill="none" stroke="${N}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M48 62 L56 70 L72 52" stroke="#1ec98b" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, "#d3f7e6"),
    camera: wrap(`<rect x="22" y="40" width="76" height="52" rx="10" fill="#fff" stroke="${N}" stroke-width="5"/><rect x="44" y="30" width="32" height="14" rx="4" fill="#fff" stroke="${N}" stroke-width="5"/><circle cx="60" cy="66" r="14" fill="#9fd4ff" stroke="${N}" stroke-width="5"/><circle cx="92" cy="30" r="13" fill="#ff7a2f" stroke="${N}" stroke-width="4"/><text x="92" y="36" font-size="18" font-weight="900" text-anchor="middle" fill="#fff">!</text>`, "#ffe2cf"),
    chat: wrap(`<path d="M24 34 H96 V78 H52 L36 94 V78 H24 Z" fill="#fff" stroke="${N}" stroke-width="5" stroke-linejoin="round"/><circle cx="44" cy="56" r="5" fill="${N}"/><circle cx="60" cy="56" r="5" fill="${N}"/><circle cx="76" cy="56" r="5" fill="${N}"/>`, "#d3f7e6"),
    gift: wrap(`<rect x="28" y="52" width="64" height="44" rx="5" fill="#ff8fb1" stroke="${N}" stroke-width="5"/><rect x="24" y="40" width="72" height="16" rx="4" fill="#ffb3c9" stroke="${N}" stroke-width="5"/><path d="M60 40 V96" stroke="${N}" stroke-width="5"/><path d="M60 40 Q44 22 40 34 Q38 42 60 40 Q82 42 80 34 Q76 22 60 40" fill="#ffd23f" stroke="${N}" stroke-width="4"/><text x="60" y="114" font-size="14" font-weight="900" text-anchor="middle" fill="${N}">?</text>`, "#ffe2cf"),
    logout: wrap(`<rect x="26" y="24" width="44" height="72" rx="8" fill="#fff" stroke="${N}" stroke-width="5"/><path d="M58 60 H98 M86 46 L100 60 L86 74" stroke="#1a6dff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, "#d3f7e6"),
    home: wrap(`<path d="M24 60 L60 28 L96 60" fill="none" stroke="${N}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 54 V94 H86 V54" fill="#fff" stroke="${N}" stroke-width="5"/><rect x="52" y="70" width="16" height="24" fill="#ffd23f" stroke="${N}" stroke-width="4"/><circle cx="94" cy="30" r="13" fill="#ff7a2f" stroke="${N}" stroke-width="4"/><text x="94" y="36" font-size="18" font-weight="900" text-anchor="middle" fill="#fff">!</text>`, "#ffe2cf"),
    shield: wrap(`<path d="M60 18 L94 30 Q96 74 60 102 Q24 74 26 30 Z" fill="#1ec98b" stroke="${N}" stroke-width="5" stroke-linejoin="round"/><path d="M44 60 L56 72 L78 48" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, "#d3f7e6"),
    file: wrap(`<path d="M34 18 H72 L90 36 V102 H34 Z" fill="#fff" stroke="${N}" stroke-width="5" stroke-linejoin="round"/><path d="M72 18 V36 H90" fill="none" stroke="${N}" stroke-width="5"/><g transform="translate(46 50) scale(.3)">${'<circle cx="50" cy="50" r="30" fill="#b14cf0" stroke="#5a1a78" stroke-width="8"/><ellipse cx="41" cy="50" rx="5" ry="7" fill="#2a0b3d"/><ellipse cx="59" cy="50" rx="5" ry="7" fill="#2a0b3d"/>'}</g>`, "#ffe2cf")
  };

  I.star = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" fill="#ffd23f" stroke="#b8860b" stroke-width="1"/></svg>`;
  I.soundOn = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;
  I.soundOff = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 9l6 6M22 9l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  I.home = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7M6 9.5V20h5v-6h2v6h5V9.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  window.ICONS = I;
})();
