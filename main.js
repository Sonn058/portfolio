/* 폴더형 포트폴리오: 탭 = 카테고리, 종이 = 프로젝트 */
(() => {
  const { PROFILE, CATEGORIES, PROJECTS } = window.PF;
  const $ = (s, el = document) => el.querySelector(s);

  const folder = $("#folder");
  const tabsEl = $("#tabs");
  const stage = $("#stage");
  const track = $("#track");
  const viewer = $("#viewer");
  const viewerInner = $("#viewer-inner");

  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const catOf = (id) => CATEGORIES.find((c) => c.id === id);
  const TILT = [-1.6, 1.1, -0.6, 1.8, -1.2, 0.5, -1.9, 1.4, -0.4, 0.9];

  // 전체 순번(파일 번호)은 data.js 의 순서를 따른다
  PROJECTS.forEach((p, i) => (p.no = pad(i + 1)));

  const state = { cat: "all", list: [], open: -1, busy: false };

  /* ───────── 자리표시 그래픽 ───────── */
  // 결정적 의사난수: 같은 프로젝트는 항상 같은 모양
  const rand = (seed) => () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);

  function visual(p, variant = 0) {
    // 대표 이미지: 자리표시 그래픽 위에 덮고, 파일이 없으면(onerror) 그래픽이 그대로 보인다
    const cover = p.image && variant === 0
      ? `<img class="cover-img" src="${esc(p.image)}" alt="${esc(p.title)}" onerror="this.remove()">` : "";
    if (p.gallery && variant > 0 && p.gallery[variant - 1]) {
      return `<img class="gal-img" src="${esc(p.gallery[variant - 1])}" alt="${esc(p.title)} ${variant}" loading="lazy">`;
    }
    const v = p.visual;
    const r = rand(p.id.length * 97 + p.title.charCodeAt(0));
    let inner = "";
    switch (v.type) {
      case "phone": {
        const ph = `<div class="ph"><i class="s"></i><i class="a"></i><i></i><i class="s"></i><i class="c"></i><i class="c"></i><i></i></div>`;
        inner = ph + ph;
        break;
      }
      case "web":
        inner = `<div class="win"><i class="s"></i><i class="h"></i><i></i><i class="s"></i><div class="row"><i class="c"></i><i class="c"></i><i class="c"></i></div></div>`;
        break;
      case "dash": {
        const bars = Array.from({ length: 9 }, () => `<b style="height:${30 + r() * 70}%"></b>`).join("");
        inner = `<div class="win dash"><i class="s"></i><i></i><div class="bars">${bars}</div><i></i><i class="s"></i><i></i></div>`;
        break;
      }
      case "orb":
        inner = `<span class="shadow"></span><span class="cyl"></span><span class="orb o2"></span><span class="orb o1"></span><span class="orb o3"></span>`;
        break;
      case "pebble":
        inner = `<div class="peb"></div><span class="sw s1"></span><span class="sw s2"></span><span class="sw s3"></span>`;
        break;
      case "lamp":
        inner = `<span class="glow"></span><span class="stem"></span><span class="base"></span><span class="shade"></span>`;
        break;
      case "mark":
        inner = `<span class="card"></span><span class="emb">${esc(v.letter || p.title[0])}</span><span class="cap">${esc(p.title)}</span>`;
        break;
      case "code": {
        const lines = Array.from({ length: 14 }, (_, i) => {
          const ind = Math.floor(r() * 3);
          const parts = Array.from({ length: 1 + Math.floor(r() * 3) }, () =>
            `<b class="${r() > 0.6 ? "k" : ""}" style="width:${8 + r() * 22}cqw"></b>`).join("");
          return `<div class="ln"><em>${i + 1}</em><b style="width:${ind * 4}cqw;background:none"></b>${parts}</div>`;
        }).join("");
        inner = `<div class="code">${lines}</div>`;
        break;
      }
      case "iso": {
        const tiles = Array.from({ length: 36 }, () => {
          const x = r();
          return `<b class="${x > 0.8 ? "k" : x > 0.68 ? "d" : ""}"></b>`;
        }).join("");
        inner = `<div class="iso">${tiles}</div>`;
        break;
      }
      case "wave": {
        const bars = Array.from({ length: 34 }, (_, i) =>
          `<b class="${i > 22 ? "g" : ""}" style="height:${12 + Math.abs(Math.sin(i * 0.55)) * 60 + r() * 28}%"></b>`).join("");
        inner = `<span class="quote">${esc(v.quote || "")}</span><div class="wave">${bars}</div><span class="rec"></span>`;
        break;
      }
      case "tetris": {
        // 10×14 판 위에 쌓인 블록 + 떨어지는 T 블록
        const cells = Array.from({ length: 140 }, (_, k) => {
          const row = Math.floor(k / 10);
          const filled = row > 8 && r() > (row > 11 ? 0.15 : 0.5);
          const falling = [24, 25, 26, 35].includes(k);
          return `<b class="${falling ? "f" : filled ? "k" : ""}"></b>`;
        }).join("");
        inner = `<div class="tet">${cells}</div>`;
        break;
      }
      case "folio":
        inner = `<span class="fb"></span><span class="fp f1"></span><span class="fp f2"></span><span class="fp f3"></span><span class="ff"></span>`;
        break;
    }
    return `<div class="vis${variant ? " v" + variant : ""}" style="--vbg:${v.bg};--ac:${v.ac}"><div class="vin">${inner}</div>${cover}</div>`;
  }

  /* ───────── 탭 ───────── */
  function renderTabs() {
    tabsEl.innerHTML = CATEGORIES.map((c, i) => {
      const n = c.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c.id).length;
      return `<button class="tab" role="tab" data-cat="${c.id}" aria-selected="${c.id === state.cat}">
        <span><span class="t-no">(${pad(i + 1)})</span>${esc(c.label)}</span><span class="t-count">${pad(n)}</span></button>`;
    }).join("");
  }

  tabsEl.addEventListener("click", (e) => {
    const t = e.target.closest(".tab");
    if (t) switchCategory(t.dataset.cat);
  });

  /* ───────── 종이(프로젝트 시트) ───────── */
  function sheetHTML(p, i) {
    const c = catOf(p.category);
    return `<div class="sheet is-out" role="button" tabindex="0" data-i="${i}" style="--r:${TILT[i % TILT.length]}deg"
        aria-label="${esc(p.title)} — ${esc(p.titleKo)} 열기">
      <div class="sheet-in">
        <span class="sheet-top"><span><span class="no">(${p.no})</span> <span class="sheet-title">${esc(p.title)}</span></span><span>${esc(c.label)}</span></span>
        <div class="sheet-vis">${visual(p)}</div>
        <span class="sheet-sum">${esc(p.summary)}</span>
        <span class="sheet-spacer"></span>
        <span class="sheet-foot"><span>${esc(p.year)}</span>${p.link
          ? `<a class="sheet-link" href="${esc(p.link.href)}" target="_blank" rel="noopener noreferrer">${esc(p.link.label)} ↗</a>`
          : `<span>${esc(p.tools[0])}</span>`}</span>
      </div>
    </div>`;
  }

  function renderSheets() {
    track.innerHTML = state.list.map(sheetHTML).join("");
    layout();
    stage.scrollLeft = 0;
    const sheets = [...track.children];
    void track.offsetWidth; // reflow → 아래에서 위로 올라오는 등장 애니메이션
    sheets.forEach((s, i) => {
      s.style.transitionDelay = `${i * 45}ms`;
      s.classList.remove("is-out");
      setTimeout(() => (s.style.transitionDelay = ""), 700 + i * 45);
    });
  }

  // 종이 개수와 폴더 너비에 맞춰 겹침 간격을 계산
  function layout() {
    const sheets = [...track.children];
    const n = sheets.length;
    if (!n) return;
    const W = stage.clientWidth;
    const sw = sheets[0].offsetWidth;
    const narrow = W < 700;
    const padL = narrow ? 18 : 290;
    const padR = narrow ? 18 : 40;
    const avail = W - padL - padR - sw;
    const minStep = sw * (narrow ? 0.6 : 0.55);
    let step = n > 1 ? Math.min(sw + 26, avail / (n - 1)) : 0;
    let start = padL;
    if (step < minStep) {
      step = minStep;
    } else {
      start = padL + Math.max(0, (avail - step * (n - 1)) / 2);
    }
    sheets.forEach((s, i) => {
      s.style.left = `${start + i * step}px`;
      s.style.zIndex = i + 1;
    });
    track.style.width = `${Math.max(W, start + step * (n - 1) + sw + padR)}px`;
    updateScrub();
  }

  function updateScrub() {
    const scrub = $("#scrub");
    const max = stage.scrollWidth - stage.clientWidth;
    scrub.hidden = max <= 2;
    if (scrub.hidden) return;
    const ratio = stage.clientWidth / stage.scrollWidth;
    const thumb = $("#scrub-thumb");
    thumb.style.width = `${ratio * 100}%`;
    thumb.style.left = `${(stage.scrollLeft / stage.scrollWidth) * 100}%`;
  }

  function renderPocket() {
    const c = catOf(state.cat);
    const idx = CATEGORIES.indexOf(c);
    $("#pocket-kicker").textContent = `(${pad(idx + 1)}) — ${c.en}`;
    $("#pocket-title").textContent = c.label;
    $("#pocket-ko").textContent = c.ko;
    $("#pocket-count").textContent = `${pad(state.list.length)} files`;
    $("#note-count").textContent = pad(state.list.length);
    $("#note-list").innerHTML = state.list
      .map((p, i) => `<li data-i="${i}"><span class="n">${p.no}</span><span>${esc(p.title)}</span></li>`).join("");
    for (const el of [$(".pocket-info"), $(".note")]) {
      el.classList.remove("swap");
      void el.offsetWidth;
      el.classList.add("swap");
    }
  }

  function filtered(cat) {
    return cat === "all" ? PROJECTS.slice() : PROJECTS.filter((p) => p.category === cat);
  }

  function switchCategory(cat, instant = false) {
    if (!catOf(cat)) cat = "all";
    if (state.busy || (cat === state.cat && track.children.length)) return;
    state.cat = cat;
    folder.dataset.cat = cat;
    renderTabs();
    history.replaceState(null, "", cat === "all" ? location.pathname : `#${cat}`);

    const old = [...track.children];
    const next = () => {
      state.list = filtered(cat);
      renderPocket();
      renderSheets();
      state.busy = false;
    };
    if (instant || !old.length) return next();
    // 기존 종이는 폴더 안으로 내려가고, 새 종이가 올라온다
    state.busy = true;
    old.reverse().forEach((s, i) => {
      s.style.transitionDelay = `${i * 30}ms`;
      s.classList.add("is-out");
    });
    setTimeout(next, 380 + old.length * 30);
  }

  /* 호버 시 인덱스 메모의 해당 줄 강조 */
  track.addEventListener("mouseover", (e) => {
    const s = e.target.closest(".sheet");
    document.querySelectorAll("#note-list li").forEach((li) => li.classList.toggle("on", s && li.dataset.i === s.dataset.i));
  });
  track.addEventListener("mouseleave", () => document.querySelectorAll("#note-list li.on").forEach((li) => li.classList.remove("on")));

  /* ───────── 가로 스크롤: 휠 · 드래그 ───────── */
  stage.addEventListener("scroll", updateScrub, { passive: true });
  stage.addEventListener("wheel", (e) => {
    if (isClosed() || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const max = stage.scrollWidth - stage.clientWidth;
    if (max <= 0) return;
    if ((e.deltaY < 0 && stage.scrollLeft <= 0) || (e.deltaY > 0 && stage.scrollLeft >= max - 1)) return;
    e.preventDefault();
    stage.scrollLeft += e.deltaY;
  }, { passive: false });

  let drag = null;
  let suppressClick = false;
  stage.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag = { x: e.clientX, left: stage.scrollLeft, moved: false, id: e.pointerId };
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 6 && stage.scrollWidth > stage.clientWidth) {
      drag.moved = true;
      stage.classList.add("dragging");
    }
    if (drag.moved) stage.scrollLeft = drag.left - dx;
  });
  window.addEventListener("pointerup", () => {
    if (drag && drag.moved) suppressClick = true;
    drag = null;
    stage.classList.remove("dragging");
  });

  track.addEventListener("click", (e) => {
    if (suppressClick) {
      suppressClick = false;
      e.preventDefault();
      return;
    }
    if (e.target.closest("a")) return; // 카드 안의 외부 링크는 새 탭으로 그대로 열린다
    const s = e.target.closest(".sheet");
    if (s) openDoc(+s.dataset.i);
  });
  track.addEventListener("keydown", (e) => {
    const s = e.target.closest(".sheet");
    if (e.target.closest("a")) return;
    if (s && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openDoc(+s.dataset.i);
    }
  });

  /* ───────── 앞판 모양: 둥근 모서리 + 가운데 엄지 홈 ───────── */
  const surface = $("#pocket-surface");
  function shapePocket() {
    const w = surface.offsetWidth;
    const h = surface.offsetHeight;
    if (!w || !h) return;
    const d = 26; // 홈 깊이 (= --lipH)
    const r = 9; // 홈 어깨 곡률
    const R = 13; // 홈 바닥 곡률
    const c = 7; // 앞판 모서리
    const x1 = Math.round(w * 0.36);
    const x2 = Math.round(w * 0.62);
    const p = [
      `M0 ${c} Q0 0 ${c} 0 H${x1 - r} Q${x1} 0 ${x1 + 2} ${r} L${x1 + 4} ${d - R}`,
      `Q${x1 + 6} ${d} ${x1 + 6 + R} ${d} H${x2 - 6 - R} Q${x2 - 6} ${d} ${x2 - 4} ${d - R} L${x2 - 2} ${r}`,
      `Q${x2} 0 ${x2 + r} 0 H${w - c} Q${w} 0 ${w} ${c} V${h - 8} Q${w} ${h} ${w - 8} ${h} H8 Q0 ${h} 0 ${h - 8} Z`,
    ].join(" ");
    surface.style.clipPath = `path("${p}")`;
  }
  new ResizeObserver(shapePocket).observe(surface);

  /* ───────── 폴더 열기 / 닫기 ───────── */
  const isClosed = () => folder.classList.contains("is-closed");

  function openFolder() {
    if (!isClosed()) return;
    folder.classList.remove("is-closed");
    setTimeout(updateScrub, 1000);
  }

  function closeFolder() {
    stage.scrollTo({ left: 0, behavior: "smooth" });
    folder.classList.add("is-closed");
  }

  // 닫힌 상태에서는 폴더 어디를 눌러도 열린다
  folder.addEventListener("click", (e) => {
    if (!isClosed()) return;
    e.stopPropagation();
    openFolder();
  }, true);

  /* ───────── 꺼낸 문서(상세 보기) ───────── */
  const rings = `<div class="rings">${"<span><i></i></span>".repeat(22)}</div>`;

  // PDF 기획안: 페이지 이미지를 문서 안에 차례로 철해 둔다
  function pdfPages(p) {
    const { title, pages } = p.pdf;
    const figs = pages.map((src, k) => {
      const n = k + 1;
      return `<figure><div class="pg"><img src="${esc(src)}" alt="${esc(title)} ${n}쪽" loading="lazy" decoding="async"></div>
        <figcaption><span></span><span>${pad(n)} / ${pad(pages.length)}</span></figcaption></figure>`;
    }).join("");
    return `<section class="doc-pdf">
      <h3>Document <span>— ${esc(title)}</span></h3>
      ${figs}
    </section>`;
  }

  function docHTML(p, i) {
    const c = catOf(p.category);
    const n = state.list.length;
    const strip = p.pdf ? pdfPages(p) : `<div class="doc-strip">${[1, 2, 3]
      .map((v) => `<figure><div class="fr"${p.galleryBg ? ` style="background:${esc(p.galleryBg)}"` : ""}>${visual(p, v)}</div><figcaption>N 0.${v}</figcaption></figure>`).join("")}</div>`;
    return `<article class="doc" tabindex="-1" aria-label="${esc(p.title)}">
      ${rings}
      <header class="doc-head">
        <span>(${p.no}) — ${esc(c.label)}</span>
        <span class="mid">File ${pad(i + 1)} / ${pad(n)}</span>
        <button class="doc-close" data-close>Put back ✕</button>
      </header>
      <div class="doc-hero">${visual(p)}</div>
      <section class="doc-grid">
        <div>
          <div class="doc-num">P. ${p.no}</div>
          <h2>${esc(p.title)}</h2>
          <p class="doc-ko">${esc(p.titleKo)}</p>
        </div>
        <dl class="doc-meta">
          <div><dt>Year</dt><dd>${esc(p.year)}</dd></div>
          <div><dt>Role</dt><dd>${esc(p.role)}</dd></div>
          <div><dt>Tools</dt><dd>${p.tools.map(esc).join(", ")}</dd></div>
          <div><dt>Field</dt><dd>${esc(c.label)}</dd></div>
          ${p.link ? `<div><dt>Link</dt><dd><a class="doc-link" href="${esc(p.link.href)}" target="_blank" rel="noopener noreferrer">${esc(p.link.label)} ↗</a></dd></div>` : ""}
        </dl>
        <div><h3>Keywords</h3><ul class="kw">${p.keywords.map((k) => `<li>${esc(k)}</li>`).join("")}</ul></div>
        <div><h3>Reasoning</h3><ul class="pts">${p.points.map((k) => `<li>${esc(k)}</li>`).join("")}</ul></div>
      </section>
      <section class="doc-body">
        <div><h3>Overview</h3><p class="lead">${esc(p.summary)}</p></div>
        <p>${esc(p.overview)}</p>
      </section>
      ${strip}
      <footer class="doc-foot">
        <button data-step="-1">← Previous file</button>
        <button class="mid" data-close>Put back in folder</button>
        <button data-step="1">Next file →</button>
      </footer>
    </article>`;
  }

  function aboutHTML() {
    const cats = CATEGORIES.slice(1).map((c) => `<li>${esc(c.label)}</li>`).join("");
    return `<article class="doc" tabindex="-1" aria-label="About">
      ${rings}
      <header class="doc-head"><span>(00) — About</span><span class="mid">Profile</span>
        <button class="doc-close" data-close>Close ✕</button></header>
      <section class="doc-grid">
        <div><div class="doc-num">P. 00</div><h2>${esc(PROFILE.name)}</h2><p class="doc-ko">${esc(PROFILE.role)}</p></div>
        <dl class="doc-meta">
          <div><dt>Mail</dt><dd><button type="button" class="copy-mail" data-copy="${esc(PROFILE.email)}" title="클릭하면 복사돼요">${esc(PROFILE.email)}<span class="copied" aria-live="polite"></span></button></dd></div>
          <div><dt>Files</dt><dd>${PROJECTS.length} projects</dd></div>
        </dl>
        <div><h3>Fields</h3><ul class="kw">${cats}</ul></div>
        <div><h3>Note</h3><ul class="pts"><li>${esc(PROFILE.intro)}</li></ul></div>
      </section>
      <section class="doc-body">
        <div><h3>Tools</h3></div>
        <ul class="tool-chips">${(PROFILE.tools || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </section>
      <section class="doc-body">
        <div><h3>Contact</h3></div>
        <div>
          <div class="about-links">${PROFILE.links.filter((l) => l.href && l.href !== "#").map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`).join("")}</div></div>
      </section>
      <footer class="doc-foot"><span></span><button class="mid" data-close>Close</button><span></span></footer>
    </article>`;
  }

  let lastFocus = null;

  function showViewer(html) {
    lastFocus = document.activeElement;
    viewerInner.innerHTML = html;
    viewer.hidden = false;
    viewer.classList.remove("closing");
    viewer.classList.add("open");
    viewer.scrollTop = 0;
    document.documentElement.style.overflow = "hidden";
    $(".doc", viewer).focus({ preventScroll: true });
  }

  function openDoc(i) {
    state.open = i;
    track.querySelectorAll(".sheet").forEach((s) => s.classList.toggle("is-taken", +s.dataset.i === i));
    showViewer(docHTML(state.list[i], i));
  }

  function stepDoc(d) {
    const n = state.list.length;
    if (state.open < 0 || n < 2) return;
    const i = (state.open + d + n) % n;
    state.open = i;
    track.querySelectorAll(".sheet").forEach((s) => s.classList.toggle("is-taken", +s.dataset.i === i));
    viewerInner.innerHTML = docHTML(state.list[i], i);
    const doc = $(".doc", viewer);
    doc.style.setProperty("--dx", `${d * 60}px`);
    doc.classList.add("flip");
    viewer.scrollTop = 0;
    doc.focus({ preventScroll: true });
  }

  function closeDoc() {
    if (viewer.hidden || viewer.classList.contains("closing")) return;
    viewer.classList.remove("open");
    viewer.classList.add("closing");
    setTimeout(() => {
      viewer.hidden = true;
      viewer.classList.remove("closing");
      viewerInner.innerHTML = "";
      document.documentElement.style.overflow = "";
      track.querySelectorAll(".is-taken").forEach((s) => s.classList.remove("is-taken"));
      state.open = -1;
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }, 300);
  }

  viewer.addEventListener("click", (e) => {
    if (e.target === viewer || e.target === viewerInner || e.target.closest("[data-close]")) return closeDoc();
    const step = e.target.closest("[data-step]");
    if (step) stepDoc(+step.dataset.step);
    const copy = e.target.closest("[data-copy]");
    if (copy) copyText(copy);
  });

  // 이메일 주소를 클립보드에 복사하고 "복사됨"을 잠깐 띄운다
  async function copyText(btn) {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // http 환경 등 clipboard API를 못 쓸 때의 예비 방법
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    const tip = $(".copied", btn);
    tip.textContent = "복사됨";
    btn.classList.add("is-copied");
    clearTimeout(btn._t);
    btn._t = setTimeout(() => btn.classList.remove("is-copied"), 1400);
  }
  document.addEventListener("keydown", (e) => {
    if (viewer.hidden) return;
    if (e.key === "Escape") closeDoc();
    if (e.key === "ArrowRight") stepDoc(1);
    if (e.key === "ArrowLeft") stepDoc(-1);
  });

  /* ───────── 시작 ───────── */
  $("#profile-name").textContent = PROFILE.name;
  $("#intro-text").textContent = PROFILE.intro;
  $("#foot-name").textContent = `© 2026 ${PROFILE.name}`;
  document.querySelector("[data-about]").addEventListener("click", () => {
    state.open = -1;
    showViewer(aboutHTML());
  });
  $("#cover-count").textContent = `${pad(PROJECTS.length)} files`;
  // 이름(로고)을 누르면 처음의 닫힌 폴더로 돌아간다
  document.querySelector("[data-home]").addEventListener("click", (e) => {
    e.preventDefault();
    closeFolder();
    setTimeout(() => switchCategory("all"), 500);
  });

  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(layout, 80);
  });

  state.cat = null;
  const startCat = location.hash.slice(1);
  switchCategory(startCat || "all", true);
  // 사이트를 열면 항상 인트로부터. 카테고리 주소(#uxui 등)로 들어왔으면 인트로 뒤에 폴더를 연다
  playIntro(() => {
    if (catOf(startCat)) openFolder();
  });
  PF.playIntro = playIntro; // 콘솔에서 인트로 다시 보기: PF.playIntro()

  /* ───────── 인트로: 폴더 뭉치에서 내 포트폴리오 파일을 꺼낸다 ───────── */
  function playIntro(onDone = () => {}) {
    window.scrollTo(0, 0);
    const back = $(".folder-back", folder);
    const r = back.getBoundingClientRect();
    const W = r.width;
    const H = r.height;
    if (!W || !H) return onDone(); // 화면이 아직 그려지지 않은 경우(숨은 탭 등)는 건너뛴다
    const GAP = innerWidth < 700 ? 44 : 58;
    const STACK = [
      { label: "Archive — 2024", c: "#c2bfb9", x: 56 },
      { label: "Sketchbook", c: "#e4e2dd", x: 18 },
      { label: `${PROFILE.name} — Portfolio`, c: "#d8bd98", x: 3, mine: true },
      { label: "References", c: "#aeaba5", x: 38 },
      { label: "Misc. Papers", c: "#ebe9e5", x: 68 },
    ];
    const MINE = STACK.findIndex((s) => s.mine);
    const top0 = Math.round(innerHeight * 0.2);

    // 맨 앞 폴더에 클립으로 끼워 둔 이름표 종이
    const frontNote = `<span class="in-note">
        <svg class="in-clip" viewBox="0 0 22 70" aria-hidden="true">
          <path class="c1" d="M7 24 V56 a5 5 0 0 0 10 0 V11 a7 7 0 0 0 -14 0 V54"/>
          <path class="c2" d="M7 24 V56 a5 5 0 0 0 10 0 V11 a7 7 0 0 0 -14 0 V54"/>
        </svg>
        <span class="in-name">${esc(PROFILE.name)}</span>
        <span class="in-sub">— Portfolio</span>
      </span>`;

    const ov = document.createElement("div");
    ov.className = "intro-ov";
    ov.innerHTML = STACK.map((s, i) => `
      <div class="stk${s.mine ? " mine" : ""}" style="--c:${s.c};left:${r.left}px;top:${top0 + i * GAP}px;width:${W}px;height:${H}px;z-index:${i + 1}">
        <span class="tb" style="left:${s.x}%">${esc(s.label)}</span>
        <span class="fr">${i === STACK.length - 1 ? frontNote : ""}</span>
      </div>`).join("") + `<span class="intro-skip">Click to skip</span>`;
    document.body.appendChild(ov);
    folder.classList.add("intro-hidden");
    document.documentElement.style.overflow = "hidden";

    const els = [...ov.querySelectorAll(".stk")];
    const mine = els[MINE];
    const ease = "cubic-bezier(0.2, 0.8, 0.2, 1)";
    const wait = (ms) => new Promise((res) => setTimeout(res, ms));
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      folder.classList.remove("intro-hidden");
      document.documentElement.style.overflow = "";
      ov.style.pointerEvents = "none";
      ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "forwards" });
      setTimeout(() => {
        ov.remove();
        onDone();
      }, 260);
    };
    ov.addEventListener("click", finish);

    (async () => {
      // 1. 폴더 뭉치가 아래에서 차례로 쌓인다
      els.forEach((el, i) =>
        el.animate([{ transform: `translateY(${innerHeight}px)` }, { transform: "none" }],
          { duration: 750, delay: i * 90, easing: ease, fill: "both" }));
      await wait(750 + els.length * 90 + 250);
      if (done) return;

      // 2. 내 파일만 위로 쑥 뽑아 올린다 (앞쪽 폴더들은 살짝 눌린다)
      const lift = MINE * GAP + 150;
      const up = `translateY(${-lift}px) rotate(-1.2deg)`;
      mine.animate([{ transform: "none" }, { transform: up }],
        { duration: 700, easing: "cubic-bezier(0.45, 0, 0.25, 1)", fill: "forwards" });
      els.slice(MINE + 1).forEach((el) =>
        el.animate([{ transform: "none" }, { transform: "translateY(18px)" }],
          { duration: 700, easing: "cubic-bezier(0.45, 0, 0.25, 1)", fill: "forwards" }));
      await wait(720);
      if (done) return;

      // 3. 뭉치 맨 앞으로 꺼내 책상 위(실제 폴더 자리)에 내려놓는다
      mine.style.zIndex = 20;
      const dy = r.top - (top0 + MINE * GAP);
      mine.animate([{ transform: up }, { transform: `translateY(${dy}px)` }],
        { duration: 900, easing: ease, fill: "forwards" });
      els.forEach((el, i) => {
        if (i === MINE) return;
        el.animate([{ opacity: 1 }, { opacity: 0, transform: `translateY(${i > MINE ? 120 : 60}px)` }],
          { duration: 550, easing: "ease-in", fill: "forwards" });
      });
      ov.animate([{ backgroundColor: "rgba(248, 247, 244, 1)" }, { backgroundColor: "rgba(248, 247, 244, 0)" }],
        { duration: 800, delay: 150, fill: "forwards" });
      $(".tb", mine).animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, delay: 500, fill: "forwards" });
      $(".intro-skip", ov).animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
      await wait(920);
      finish();
    })();
  }
})();
