/* مغامرة فهد في الأمن السيبراني – منطق اللعبة
   لا يُرسل أي اسم أو نتيجة إلى أي خادم؛ كل شيء يعمل داخل المتصفح. */
(function () {
  "use strict";
  const D = window.GAME_DATA, I = window.ICONS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* تجاهل */ } }
  };

  /* ---------- الأيقونات والشخصية ---------- */
  function paintIcons(root = document) {
    $$("[data-icon]", root).forEach((el) => { const k = el.dataset.icon; if (I[k]) el.innerHTML = I[k]; else if (I.card[k]) el.innerHTML = I.card[k]; });
    $$("[data-fahd]", root).forEach((el) => { el.innerHTML = fahdHTML; });
  }
  let fahdHTML = I.fahd;
  // إذا وُضعت صورة فهد الكرتونية في fahd.png تُستخدم بدل الشخصية الافتراضية
  const customFahd = new Image();
  customFahd.onload = () => { fahdHTML = '<img src="fahd.png" alt="شخصية فهد">'; $$("[data-fahd]").forEach((el) => (el.innerHTML = fahdHTML)); };
  customFahd.src = "fahd.png";

  // شعار وزارة التعليم: يظهر فقط إذا وُضع الملف الأصلي في assets/moe-logo.png
  const moe = $("#moeLogo");
  if (moe) {
    const showMoe = () => { moe.hidden = false; $("#moePlaceholder").hidden = true; };
    moe.addEventListener("load", showMoe);
    if (moe.complete && moe.naturalWidth) showMoe();
  }

  /* ---------- الصوت (نغمات مولّدة أصلية) ---------- */
  let soundOn = store.get("fahd-sound") !== "off";
  let actx = null, unlocked = false;
  // الجوال (خاصة آيفون) لا يسمح بالصوت إلا بعد أول لمسة، وقد يكتمه زر الصامت:
  // نفتح الصوت عند أول لمسة، ونطلب وضع التشغيل كي لا يكتمه زر الصامت في آيفون.
  function getCtx() {
    if (!actx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) { /* غير مدعوم */ }
      actx = new AC();
    }
    return actx;
  }
  function unlockAudio() {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state !== "running") ctx.resume().catch(() => {});
    if (!unlocked) {
      try { // صوت صامت قصير جدًا يفتح قناة الصوت في آيفون
        const b = ctx.createBuffer(1, 1, 22050), src = ctx.createBufferSource();
        src.buffer = b; src.connect(ctx.destination); src.start(0);
        unlocked = true;
      } catch (e) { /* تجاهل */ }
    }
  }
  ["pointerdown", "touchstart", "touchend", "click", "keydown"].forEach((ev) =>
    document.addEventListener(ev, unlockAudio, { capture: true, passive: true }));
  document.addEventListener("visibilitychange", () => { if (!document.hidden && actx && actx.state !== "running") actx.resume().catch(() => {}); });

  function playTone(ctx, freq, start, dur, type, vol) {
    const t = ctx.currentTime + 0.02 + start;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  function tone(freq, start, dur, type = "sine", vol = 0.25) {
    if (!soundOn) return;
    try {
      const ctx = getCtx();
      if (!ctx) return;
      if (ctx.state === "running") playTone(ctx, freq, start, dur, type, vol);
      else ctx.resume().then(() => playTone(ctx, freq, start, dur, type, vol)).catch(() => {});
    } catch (e) { /* لا صوت */ }
  }
  const sfx = {
    tap: () => tone(660, 0, 0.08, "triangle", 0.18),
    good: () => { tone(523, 0, 0.12, "triangle"); tone(659, 0.1, 0.12, "triangle"); tone(784, 0.2, 0.22, "triangle"); },
    bad: () => { tone(392, 0, 0.16, "sine", 0.14); tone(330, 0.15, 0.26, "sine", 0.14); },
    cpu: () => { tone(300, 0, 0.1, "square", 0.08); tone(240, 0.09, 0.12, "square", 0.08); },
    win: () => [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, i * 0.12, 0.2, "triangle", 0.16)),
    draw: () => { tone(523, 0, 0.18, "triangle"); tone(523, 0.2, 0.25, "triangle"); }
  };
  const btnSound = $("#btnSound");
  function renderSound() {
    btnSound.innerHTML = soundOn ? I.soundOn : I.soundOff;
    btnSound.setAttribute("aria-pressed", String(soundOn));
    btnSound.setAttribute("aria-label", soundOn ? "إيقاف الصوت" : "تشغيل الصوت");
  }
  btnSound.addEventListener("click", () => { soundOn = !soundOn; store.set("fahd-sound", soundOn ? "on" : "off"); renderSound(); sfx.tap(); });

  /* ---------- التنقل ---------- */
  const btnHome = $("#btnHome");
  btnHome.innerHTML = I.home;
  const titles = { home: "مغامرة فهد في الأمن السيبراني", xo: "تحدي X-O السيبراني", cards: "اختبر أمانك الرقمي", result: "أحسنت يا بطل!", share: "مشاركة اللعبة" };
  let current = "home";
  function show(name) {
    if (!$("#scr-" + name)) name = "home";
    current = name;
    $$(".screen").forEach((s) => s.classList.remove("active"));
    $("#scr-" + name).classList.add("active");
    btnHome.hidden = name === "home";
    $("#topTitle").textContent = titles[name];
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    if (name !== "result") $("#confetti").innerHTML = "";
    if (name === "xo") enterXO();
    if (name === "cards") startCards();
    if (name === "share") enterShare();
  }
  function go(name) {
    const h = name === "home" ? "" : name;
    if (name === "result") { show("result"); return; }
    if (location.hash.slice(1) === h) show(name);
    else location.hash = h; // يُعالَج في hashchange
  }
  window.addEventListener("hashchange", () => {
    const h = location.hash.slice(1);
    show(["xo", "cards", "share"].includes(h) ? h : "home");
  });
  btnHome.addEventListener("click", () => { sfx.tap(); closeModal(qModal); go("home"); });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-go]");
    if (b) { sfx.tap(); go(b.dataset.go); }
  });

  /* ---------- رسائل التشجيع والنجوم ---------- */
  const toast = $("#toast");
  let toastT;
  function cheer(text) {
    toast.hidden = true; void toast.offsetWidth;
    toast.textContent = text; toast.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(() => (toast.hidden = true), 1650);
  }
  function starBurst(el) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (let i = 0; i < 10; i++) {
      const s = document.createElement("div");
      s.className = "burst"; s.innerHTML = I.star;
      s.style.left = cx - 15 + "px"; s.style.top = cy - 15 + "px";
      document.body.appendChild(s);
      const a = (Math.PI * 2 * i) / 10, d = 70 + Math.random() * 50;
      s.animate([{ transform: "translate(0,0) scale(.4)", opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) scale(1.1) rotate(180deg)`, opacity: 0 }], { duration: 800, easing: "cubic-bezier(.2,.8,.3,1)" }).onfinish = () => s.remove();
    }
  }

  /* ---------- النوافذ ---------- */
  const qModal = $("#qModal"), howModal = $("#howModal");
  let lastFocus = null;
  function openModal(m) { lastFocus = document.activeElement; m.hidden = false; const f = m.querySelector("button:not([hidden])"); f && f.focus(); }
  function closeModal(m) { if (m.hidden) return; m.hidden = true; lastFocus && lastFocus.focus && lastFocus.focus(); }
  $("#btnHow").addEventListener("click", () => { sfx.tap(); openModal(howModal); });
  $("#btnHowClose").addEventListener("click", () => { sfx.tap(); closeModal(howModal); });
  howModal.addEventListener("click", (e) => { if (e.target === howModal) closeModal(howModal); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModal(howModal); if (!qModal.hidden) cancelQuestion(); } });

  /* ================= تحدي X-O ================= */
  const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  const boardEl = $("#board");
  const xo = { board: Array(9).fill(null), locked: false, over: false, pending: -1, qPool: [], q: null, qCount: 0, correct: 0, wrong: 0, points: 0, wins: 0, draws: 0, losses: 0, started: false };

  function winnerOf(b) {
    for (const l of LINES) { const [a, c, d] = l; if (b[a] && b[a] === b[c] && b[a] === b[d]) return { who: b[a], line: l }; }
    return b.every(Boolean) ? { who: "draw", line: [] } : null;
  }

  function renderBoard() {
    boardEl.innerHTML = "";
    xo.board.forEach((v, i) => {
      const c = document.createElement("button");
      c.type = "button"; c.className = "cell" + (v ? "" : " empty"); c.dataset.i = i;
      c.setAttribute("aria-label", `المربع ${i + 1}: ${v === "P" ? "درعك" : v === "C" ? "الفيروس" : "فارغ"}`);
      c.innerHTML = v === "P" ? I.shield : v === "C" ? I.virus : '<span class="ph"></span>';
      c.disabled = !!v || xo.locked || xo.over;
      boardEl.appendChild(c);
    });
  }
  function setTurn(text, cpu) { const t = $("#xoTurn"); t.textContent = text; t.classList.toggle("cpu", !!cpu); }
  function guide(text) { $("#xoGuide").textContent = text; }
  function updateScore() { $("#xoWins").textContent = xo.wins; $("#xoDraws").textContent = xo.draws; $("#xoLosses").textContent = xo.losses; }

  function enterXO() {
    if (!xo.started) { $("#xoIntro").hidden = false; $("#xoGame").hidden = true; }
  }
  function newRound() {
    xo.board = Array(9).fill(null); xo.locked = false; xo.over = false; xo.pending = -1;
    xo.correct = 0; xo.wrong = 0; xo.points = 0; xo.qCount = 0;
    xo.qPool = shuffle(D.questions);
    xo.started = true;
    $("#xoIntro").hidden = true; $("#xoGame").hidden = false;
    setTurn("دورك: اختر مربعًا");
    guide("هيا نحمي عالمنا الرقمي!");
    renderBoard(); updateScore();
  }
  $("#btnStartXO").addEventListener("click", () => { sfx.good(); newRound(); });
  $("#btnRestartXO").addEventListener("click", () => { sfx.tap(); newRound(); });

  boardEl.addEventListener("click", (e) => {
    const c = e.target.closest(".cell");
    if (!c || xo.locked || xo.over) return;
    const i = +c.dataset.i;
    if (xo.board[i]) return;
    sfx.tap();
    xo.pending = i;
    askQuestion();
  });

  function nextQuestion() {
    if (!xo.qPool.length) xo.qPool = shuffle(D.questions.filter((q) => q !== xo.q));
    return xo.qPool.pop();
  }
  function askQuestion() {
    xo.q = nextQuestion(); xo.qCount++;
    $("#qNum").textContent = "السؤال " + xo.qCount;
    $("#qText").textContent = xo.q.q;
    $("#qFeedback").hidden = true;
    $("#qAnswers").hidden = false;
    $$("#qAnswers .ans").forEach((b) => (b.disabled = false));
    if (qModal.hidden) openModal(qModal); else $("#qAnswers .ans").focus();
  }
  function cancelQuestion() { closeModal(qModal); xo.pending = -1; }

  $("#qAnswers").addEventListener("click", (e) => {
    const b = e.target.closest(".ans");
    if (!b || b.disabled) return;
    $$("#qAnswers .ans").forEach((x) => (x.disabled = true)); // منع النقر المزدوج
    const said = b.dataset.a === "1";
    if (said === xo.q.a) {
      xo.correct++; xo.points += 10;
      sfx.good();
      const msg = pick(D.cheers);
      closeModal(qModal);
      placePlayer(xo.pending, msg);
    } else {
      xo.wrong++;
      sfx.bad();
      const fb = $("#qFeedback");
      fb.className = "q-feedback bad";
      $("#qFbTitle").textContent = pick(D.retry);
      $("#qFbWhy").textContent = `الإجابة الصحيحة: «${xo.q.a ? "نعم" : "لا"}». ${xo.q.why}`;
      $("#qAnswers").hidden = true;
      fb.hidden = false;
      $("#btnQNext").focus();
      guide("لا بأس، نتعلّم معًا!");
    }
  });
  $("#btnQNext").addEventListener("click", () => { sfx.tap(); askQuestion(); });
  $("#btnQCancel").addEventListener("click", () => { sfx.tap(); cancelQuestion(); });

  function placePlayer(i, msg) {
    if (i < 0 || xo.board[i]) return;
    xo.board[i] = "P"; xo.pending = -1;
    renderBoard();
    starBurst(boardEl.children[i]);
    cheer(msg); guide(msg);
    if (checkEnd()) return;
    xo.locked = true; renderBoard();
    setTurn("الفيروس يفكّر...", true);
    setTimeout(cpuMove, 900);
  }

  // مستوى سهل: يكمل خطه أحيانًا ويصدّ قليلًا، فيستطيع الطفل هزيمته في أغلب الجولات
  function findLine(mark) {
    for (const l of LINES) {
      const vals = l.map((k) => xo.board[k]);
      if (vals.filter((v) => v === mark).length === 2 && vals.includes(null)) return l[vals.indexOf(null)];
    }
    return -1;
  }
  function cpuChoice() {
    const empties = xo.board.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
    const win = findLine("C");
    if (win >= 0 && Math.random() < 0.6) return win;
    const block = findLine("P");
    if (block >= 0 && Math.random() < 0.35) return block;
    if (!xo.board[4] && Math.random() < 0.25) return 4;
    return pick(empties);
  }
  function cpuMove() {
    if (xo.over) return;
    const i = cpuChoice();
    xo.board[i] = "C";
    sfx.cpu();
    xo.locked = false;
    renderBoard();
    if (checkEnd()) return;
    setTurn("دورك: اختر مربعًا");
  }

  function checkEnd() {
    const r = winnerOf(xo.board);
    if (!r) return false;
    xo.over = true; xo.locked = true;
    renderBoard();
    r.line.forEach((k) => boardEl.children[k].classList.add("win", ...(r.who === "C" ? ["lose"] : [])));
    let sub;
    if (r.who === "P") { xo.wins++; xo.points += 30; sfx.win(); setTurn("فزت! درعك هزم الفيروس 🎉"); guide("أحسنت يا بطل!"); sub = "فزت على الفيروس بثلاثة دروع!"; }
    else if (r.who === "C") { xo.losses++; sfx.draw(); setTurn("الفيروس فاز هذه المرة", true); guide("حاول مرة أخرى، أنت تستطيع!"); sub = "الفيروس فاز هذه المرة، لكنك تعلّمت الكثير!"; }
    else { xo.draws++; sfx.draw(); setTurn("تعادل! لا أحد فاز"); guide("رائع! كانت جولة قوية!"); sub = "تعادل! أنت والفيروس أقوياء."; }
    updateScore();
    const stars = r.who === "P" ? 3 : r.who === "draw" ? 2 : 1;
    setTimeout(() => showResult({ mode: "xo", correct: xo.correct, points: xo.points, sub, stars }), 1700);
    return true;
  }

  /* ================= اختبر أمانك الرقمي ================= */
  const cs = { deck: [], idx: 0, points: 0, correct: 0, busy: false };
  const CARDS_PER_ROUND = 5;
  // طابوران (آمن / غير آمن) يدوران بين الجولات حتى تظهر بطاقات جديدة في كل مرة
  const queues = { s: [], u: [] };
  function loadQueue(key, items) {
    let q = [];
    try { q = JSON.parse(store.get("fahd-q-" + key) || "[]").filter((i) => Number.isInteger(i) && i >= 0 && i < D.cards.length && items.includes(i)); } catch (e) { q = []; }
    return q;
  }
  function drawFrom(key, n) {
    const ids = D.cards.map((c, i) => i).filter((i) => (key === "s") === D.cards[i].safe);
    if (!queues[key].length) queues[key] = loadQueue(key, ids);
    const out = [];
    while (out.length < n) {
      if (!queues[key].length) queues[key] = shuffle(ids.filter((i) => !out.includes(i)));
      out.push(queues[key].shift());
    }
    store.set("fahd-q-" + key, JSON.stringify(queues[key]));
    return out;
  }
  function startCards() {
    const safeCount = Math.random() < 0.5 ? 2 : 3; // مزيج متوازن من الآمن وغير الآمن
    const picked = drawFrom("s", safeCount).concat(drawFrom("u", CARDS_PER_ROUND - safeCount));
    cs.deck = shuffle(picked.map((i) => D.cards[i])); cs.idx = 0; cs.points = 0; cs.correct = 0;
    $("#progress").setAttribute("aria-valuemax", cs.deck.length);
    renderCard();
  }
  function renderCard() {
    const c = cs.deck[cs.idx];
    cs.busy = false;
    $("#sitIcon").innerHTML = I.card[c.icon] || I.card.shield;
    $("#sitText").textContent = c.t;
    $("#cardCount").textContent = `${cs.idx + 1} / ${cs.deck.length}`;
    $("#cardPoints").textContent = cs.points;
    $("#progressFill").style.width = (cs.idx / cs.deck.length) * 100 + "%";
    $("#progress").setAttribute("aria-valuenow", cs.idx);
    $("#cardFeedback").hidden = true;
    $("#answerRow").hidden = false;
    $$("#answerRow .ans").forEach((b) => (b.disabled = false));
    const s = $("#situation"); s.classList.remove("flip"); void s.offsetWidth; s.classList.add("flip");
  }
  $("#answerRow").addEventListener("click", (e) => {
    const b = e.target.closest(".ans");
    if (!b || cs.busy) return;
    cs.busy = true;
    $$("#answerRow .ans").forEach((x) => (x.disabled = true));
    const c = cs.deck[cs.idx];
    const ok = (b.dataset.safe === "1") === c.safe;
    const fb = $("#cardFeedback");
    if (ok) {
      cs.correct++; cs.points += 10; sfx.good(); starBurst(b);
      fb.className = "feedback good";
      $("#fbTitle").textContent = "✓ " + pick(D.cheers);
    } else {
      sfx.bad();
      fb.className = "feedback bad";
      $("#fbTitle").textContent = `هذا ${c.safe ? "تصرف آمن ✓" : "تصرف غير آمن !"}`;
    }
    $("#fbWhy").textContent = c.why;
    $("#cardPoints").textContent = cs.points;
    $("#progressFill").style.width = ((cs.idx + 1) / cs.deck.length) * 100 + "%";
    $("#answerRow").hidden = true;
    $("#btnNextCard").textContent = cs.idx === cs.deck.length - 1 ? "النتيجة" : "التالي";
    fb.hidden = false;
    $("#btnNextCard").focus();
  });
  $("#btnNextCard").addEventListener("click", () => {
    sfx.tap();
    if (cs.idx < cs.deck.length - 1) { cs.idx++; renderCard(); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const ratio = cs.correct / cs.deck.length;
    const stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;
    const sub = `أجبت ${cs.correct} من ${cs.deck.length} مواقف بشكل صحيح.`;
    if (stars === 3) sfx.win(); else sfx.good();
    showResult({ mode: "cards", correct: cs.correct, points: cs.points, sub, stars });
  });

  /* ================= شاشة الاحتفال والوسام ================= */
  let lastResult = null;
  function showResult(r) {
    lastResult = r;
    $("#resSub").textContent = r.sub;
    $("#resCorrect").textContent = r.correct;
    $("#resPoints").textContent = r.points;
    $("#resTip").textContent = pick(D.tips);
    $("#resStars").innerHTML = [0, 1, 2].map((k) => `<span class="${k < r.stars ? "" : "dim"}" style="animation-delay:${0.2 + k * 0.2}s">${I.star}</span>`).join("");
    show("result");
    paintIcons($("#scr-result"));
    confetti();
    drawBadge();
  }
  $("#btnReplay").addEventListener("click", () => {
    sfx.tap();
    if (lastResult && lastResult.mode === "xo") { go("xo"); newRound(); } else go("cards");
  });

  function confetti() {
    const box = $("#confetti"); box.innerHTML = "";
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let i = 0; i < 28; i++) {
      const s = document.createElement("i");
      s.innerHTML = I.star;
      s.style.left = Math.random() * 100 + "%";
      s.style.animationDuration = 2.4 + Math.random() * 2.4 + "s";
      s.style.animationDelay = Math.random() * 1.2 + "s";
      const sc = 0.6 + Math.random() * 0.9; s.style.width = s.style.height = 26 * sc + "px";
      box.appendChild(s);
    }
  }

  const nameInput = $("#heroName");
  nameInput.addEventListener("input", () => {
    nameInput.value = nameInput.value.replace(/[<>{}0-9٠-٩@#$%^&*_=+\\/|"`~]/g, "");
    drawBadge();
  });

  let logoImg = null;
  function loadLogo() {
    return new Promise((res) => {
      if (logoImg) return res(logoImg);
      const img = new Image();
      img.onload = () => { logoImg = img; res(img); };
      img.onerror = () => res(null);
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(I.logo.trim().replace("<svg ", '<svg width="240" height="240" '));
    });
  }
  async function drawBadge() {
    const cv = $("#badgeCanvas"), ctx = cv.getContext("2d");
    const W = cv.width, cx = W / 2;
    try { await document.fonts.load('900 60px "Cairo Local"'); await document.fonts.load('700 30px "Cairo Local"'); } catch (e) { /* خط بديل */ }
    const F = (w, s) => `${w} ${s}px "Cairo Local", "Cairo", Tahoma, Arial, sans-serif`;
    ctx.clearRect(0, 0, W, W);
    ctx.direction = "rtl"; ctx.textAlign = "center"; ctx.textBaseline = "middle";

    // الشرائط
    const ribbon = (x, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, 520); ctx.lineTo(x + 110, 520); ctx.lineTo(x + 110, 790); ctx.lineTo(x + 55, 740); ctx.lineTo(x, 790); ctx.closePath(); ctx.fill(); };
    ribbon(cx - 170, "#16d6b4"); ribbon(cx + 60, "#3fe0ff");

    // الإطار الذهبي المسنن
    ctx.save(); ctx.translate(cx, 360);
    ctx.beginPath();
    for (let i = 0; i < 64; i++) { const a = (Math.PI * 2 * i) / 64, r = i % 2 ? 300 : 318; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    ctx.closePath();
    const g = ctx.createLinearGradient(0, -320, 0, 320); g.addColorStop(0, "#ffe680"); g.addColorStop(1, "#d99a00");
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(0, 0, 270, 0, Math.PI * 2);
    const g2 = ctx.createRadialGradient(0, -80, 40, 0, 0, 280); g2.addColorStop(0, "#16407f"); g2.addColorStop(1, "#071a3d");
    ctx.fillStyle = g2; ctx.fill();
    ctx.lineWidth = 8; ctx.strokeStyle = "#ffd23f"; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 252, 0, Math.PI * 2); ctx.lineWidth = 2; ctx.strokeStyle = "rgba(63,224,255,.6)"; ctx.stroke();
    ctx.restore();

    const logo = await loadLogo();
    if (logo) ctx.drawImage(logo, cx - 85, 140, 170, 170);

    ctx.fillStyle = "#ffd23f"; ctx.font = F(900, 46);
    ctx.fillText("بطل الأمن السيبراني", cx, 360, 440);
    const nm = nameInput.value.trim();
    ctx.fillStyle = "#ffffff"; ctx.font = F(900, nm ? 58 : 34);
    ctx.fillText(nm || "ألعب وأتعلم.. وأحمي نفسي", cx, 438, 420);
    // نجوم
    const stars = lastResult ? lastResult.stars : 3;
    for (let k = 0; k < 3; k++) drawStar(ctx, cx + (1 - k) * 70, 512, 26, k < stars ? "#ffd23f" : "rgba(255,255,255,.25)");
    ctx.fillStyle = "#b9cbe8"; ctx.font = F(700, 24);
    ctx.fillText(lastResult ? `${lastResult.points} نقطة` : "", cx, 562);

    // اللوحة السفلية
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, 40, 680, W - 80, 108, 24); ctx.fill();
    ctx.fillStyle = "#0b1d3f"; ctx.font = F(900, 32);
    ctx.fillText("مبادرة الأمن السيبراني – 1448هـ", cx, 714, W - 120);
    ctx.font = F(700, 26);
    ctx.fillText("مدرسة أم المؤمنين أم سلمة للطفولة المبكرة بغالب", cx, 756, W - 120);
  }
  function drawStar(ctx, x, y, r, col) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (Math.PI * i) / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
    ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  }
  function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

  function saveCanvas(cv, filename) {
    try {
      cv.toBlob((blob) => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob); a.download = filename;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      }, "image/png");
    } catch (e) { cheer("تعذّر التحميل، اضغط مطولًا على الصورة لحفظها"); }
  }
  $("#btnSaveBadge").addEventListener("click", () => { sfx.tap(); saveCanvas($("#badgeCanvas"), "وسام-بطل-الأمن-السيبراني.png"); });
  $("#btnPrintBadge").addEventListener("click", () => { sfx.tap(); window.print(); });

  /* ================= المشاركة ورمز QR ================= */
  const urlIn = $("#shareUrl");
  function enterShare() {
    // يُملأ الرابط تلقائيًا فقط إذا كانت اللعبة منشورة فعلًا على GitHub Pages أو Netlify
    if (!urlIn.value && location.protocol === "https:" && /(\.github\.io|\.netlify\.app)$/.test(location.hostname)) {
      urlIn.value = location.origin + location.pathname;
    }
  }
  $("#btnMakeQR").addEventListener("click", () => {
    sfx.tap();
    const err = $("#shareErr");
    let u = urlIn.value.trim();
    err.hidden = true;
    try {
      const parsed = new URL(u);
      if (parsed.protocol !== "https:") throw new Error();
      u = parsed.href;
    } catch (e) {
      err.textContent = "اكتب رابطًا كاملًا يبدأ بـ https://";
      err.hidden = false; $("#qrOut").hidden = true; return;
    }
    drawQR(u);
    $("#qrOut").hidden = false;
  });
  function drawQR(url) {
    const qr = qrcode(0, "M"); qr.addData(url); qr.make();
    const n = qr.getModuleCount();
    const cv = $("#qrCanvas"), ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height, size = 520, cell = size / (n + 8), off = (W - cell * n) / 2, top = 110 + cell * 4;
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#071a3d"; ctx.fillRect(0, 0, W, 96);
    ctx.direction = "rtl"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffd23f"; ctx.font = '900 36px "Cairo Local", Tahoma, sans-serif';
    ctx.fillText("مغامرة فهد في الأمن السيبراني", W / 2, 50);
    ctx.fillStyle = "#071a3d";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) ctx.fillRect(off + c * cell, top + r * cell, Math.ceil(cell), Math.ceil(cell));
    ctx.font = '800 28px "Cairo Local", Tahoma, sans-serif';
    ctx.fillText("امسح الرمز وابدأ اللعب", W / 2, H - 70);
    ctx.direction = "ltr"; ctx.font = '600 18px "Cairo Local", Arial, sans-serif'; ctx.fillStyle = "#16407f";
    ctx.fillText(url.length > 60 ? url.slice(0, 58) + "…" : url, W / 2, H - 30);
  }
  $("#btnSaveQR").addEventListener("click", () => { sfx.tap(); saveCanvas($("#qrCanvas"), "رمز-QR-مغامرة-فهد.png"); });
  $("#btnCopyUrl").addEventListener("click", () => {
    sfx.tap();
    const u = urlIn.value.trim();
    const done = () => cheer("تم نسخ الرابط");
    if (navigator.clipboard) navigator.clipboard.writeText(u).then(done, () => { urlIn.select(); });
    else urlIn.select();
  });

  /* ---------- البدء ---------- */
  paintIcons();
  renderSound();
  const h0 = location.hash.slice(1);
  show(["xo", "cards", "share"].includes(h0) ? h0 : "home");

  // واجهة اختبار صغيرة (للتحقق الآلي فقط)
  window.__fahdTest = { xo, cs, winnerOf, LINES };
})();
