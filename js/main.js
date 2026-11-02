(() => {
  const WORKS = window.WORKS || [];
  const CATEGORIES = window.CATEGORIES || [];
  const catLabel = (key) => (CATEGORIES.find((c) => c.key === key) || {}).label || key;

  // ── 이미지/영상 경로 (썸네일이 없으면 원본 사용) ──
  const thumbSrc = (work) => work.thumb || work.img;
  const fullSrc = (work) => work.img;
  const previewSrc = (work) => work.img;
  const videoSrc = (work) => work.video;

  const esc = (s = '') => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const PLAY = '<svg viewBox="0 0 16 18" fill="currentColor"><path d="M0 0l16 9-16 9z"/></svg>';

  // ── 카드 (갤러리 공통) ──
  const card = (work, i) => {
    const long = !work.video && work.h / work.w > 4;
    return `
      <button class="card${work.video ? ' is-video' : ''}" data-i="${i}" style="animation-delay:${Math.min(i, 12) * 30}ms">
        <div class="card-img">
          <img src="${thumbSrc(work)}" alt="${esc(work.title)}" loading="lazy" width="600" height="800">
          ${work.video ? `<span class="card-play">${PLAY}</span>` : ''}
          ${long ? '<span class="long">LONG PAGE</span>' : ''}
        </div>
        <div class="card-meta"><b>${esc(work.title)}</b><span>${catLabel(work.cat)}</span></div>
      </button>`;
  };

  // ── 뷰어 ──
  let list = [];
  let cur = 0;
  const viewer = document.createElement('div');
  viewer.className = 'viewer';
  viewer.setAttribute('role', 'dialog');
  viewer.setAttribute('aria-modal', 'true');
  viewer.innerHTML = `
    <div class="viewer-bar">
      <div class="viewer-title"></div>
      <div class="viewer-ctrl">
        <a class="viewer-link" target="_blank" rel="noopener" hidden>사이트 보기 ↗</a>
        <button data-act="prev" aria-label="이전 작업"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 3L5 8l5 5"/></svg></button>
        <button data-act="next" aria-label="다음 작업"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3l5 5-5 5"/></svg></button>
        <button data-act="close" aria-label="닫기"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 3l10 10M13 3L3 13"/></svg></button>
      </div>
    </div>
    <div class="viewer-body"></div>`;
  document.body.appendChild(viewer);
  const vTitle = viewer.querySelector('.viewer-title');
  const vBody = viewer.querySelector('.viewer-body');
  const vLink = viewer.querySelector('.viewer-link');

  const show = (idx) => {
    cur = (idx + list.length) % list.length;
    const w = list[cur];
    vTitle.innerHTML = `${esc(w.title)}<span>${catLabel(w.cat)} · ${cur + 1} / ${list.length}</span>`;
    vBody.classList.toggle('is-video', !!w.video);
    vBody.classList.toggle('is-page', !!w.page);
    vLink.hidden = !w.link;
    if (w.link) vLink.href = w.link;
    vBody.innerHTML = w.page
      ? `<iframe src="${w.page}" title="${esc(w.title)}"></iframe>`
      : w.video
      ?`<video src="${videoSrc(w)}" poster="${fullSrc(w)}" controls autoplay playsinline></video>`
      : `<img src="${fullSrc(w)}" alt="${esc(w.title)}" width="${w.w}" height="${w.h}" style="--nat:${w.w * 2}px"${w.h / w.w > 4 ? ' class="is-long" title="클릭하면 크게 보기"' : ''}>`;
    vBody.scrollTop = 0;
  };
  const open = (works, idx) => {
    list = works;
    show(idx);
    viewer.classList.add('open');
    document.body.classList.add('lock');
    viewer.querySelector('[data-act="close"]').focus();
  };
  const close = () => {
    viewer.classList.remove('open');
    document.body.classList.remove('lock');
    vBody.innerHTML = '';
  };
  viewer.addEventListener('click', (e) => {
    // 롱페이지: 기본은 줌아웃, 클릭하면 크게 (클릭한 위치 유지)
    const long = e.target.closest('img.is-long');
    if (long) {
      const ratio = (e.clientY - vBody.getBoundingClientRect().top + vBody.scrollTop) / vBody.scrollHeight;
      long.classList.toggle('zoomed');
      vBody.scrollTop = ratio * vBody.scrollHeight - (e.clientY - vBody.getBoundingClientRect().top);
      return;
    }
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'close') close();
    if (act === 'prev') show(cur - 1);
    if (act === 'next') show(cur + 1);
  });
  document.addEventListener('keydown', (e) => {
    if (!viewer.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });

  const bindCards = (root, works) => {
    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-i]');
      if (el) open(works, +el.dataset.i);
    });
  };

  // ── 메인: Selected Works ──
  const featRoot = document.getElementById('featured');
  if (featRoot) {
    const feats = WORKS.filter((w) => w.featured).sort((a, b) => a.featured - b.featured);
    featRoot.innerHTML = feats.map((w, i) => `
      <article class="feat">
        <div class="feat-text">
          <div class="feat-no">${String(i + 1).padStart(2, '0')}</div>
          <p class="feat-cat">${catLabel(w.cat)}${w.year ? ' · ' + w.year : ''}</p>
          <h3>${esc(w.title)}</h3>
          <p class="feat-desc">${esc(w.desc || '')}</p>
          ${w.tags ? `<ul class="tags">${w.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
          <button class="btn-view" data-i="${i}">전체 보기 <span aria-hidden="true">→</span></button>
        </div>
        <button class="feat-media" data-i="${i}" aria-label="${esc(w.title)} 전체 보기">
          <img src="${previewSrc(w)}" alt="" loading="lazy" width="${w.w}" height="${w.h}">
        </button>
      </article>`).join('');
    bindCards(featRoot, feats);

    // 미리보기 박스 높이에 맞춰 스크롤 거리/시간 계산
    const setPan = () => {
      featRoot.querySelectorAll('.feat-media').forEach((box) => {
        const img = box.querySelector('img');
        const boxH = box.clientHeight;
        const imgH = box.clientWidth * (img.getAttribute('height') / img.getAttribute('width'));
        const dist = Math.max(0, imgH - boxH);
        box.style.setProperty('--pan', `-${dist}px`);
        box.style.setProperty('--pan-dur', `${Math.min(14, Math.max(2, dist / 900))}s`);
      });
    };
    setPan();
    addEventListener('resize', setPan);
  }

  // ── 메인: 갤러리 미리보기 ──
  const moreRoot = document.getElementById('more-grid');
  if (moreRoot) {
    const pick = WORKS.filter((w) => !w.featured).slice(0, 8);
    moreRoot.innerHTML = pick.map(card).join('');
    bindCards(moreRoot, pick);
  }

  // ── 카운트 표시 ──
  document.querySelectorAll('[data-count]').forEach((el) => {
    const k = el.dataset.count;
    el.textContent = String(k === 'all' ? WORKS.length : k === 'featured' ? WORKS.filter((w) => w.featured).length : WORKS.filter((w) => w.cat === k).length).padStart(2, '0');
  });

  // ── 갤러리 페이지 ──
  const galRoot = document.getElementById('gallery-grid');
  const filterRoot = document.getElementById('filters');
  if (galRoot && filterRoot) {
    const cats = [{ key: 'all', label: '전체' }, ...CATEGORIES.filter((c) => WORKS.some((w) => w.cat === c.key))];
    filterRoot.innerHTML = `<div class="tabs"><div class="tabs-inner">${cats.map((c) => `
      <button class="chip" data-cat="${c.key}" aria-pressed="false">${c.label}</button>`).join('')}</div></div>`;

    let shown = WORKS;
    const render = (key) => {
      shown = key === 'all' ? WORKS : WORKS.filter((w) => w.cat === key);
      galRoot.innerHTML = shown.map(card).join('');
      filterRoot.querySelectorAll('.chip').forEach((b) => b.setAttribute('aria-pressed', b.dataset.cat === key));
    };
    filterRoot.addEventListener('click', (e) => {
      const b = e.target.closest('.chip');
      if (!b) return;
      history.replaceState(null, '', b.dataset.cat === 'all' ? location.pathname : `#${b.dataset.cat}`);
      render(b.dataset.cat);
    });
    galRoot.addEventListener('click', (e) => {
      const el = e.target.closest('[data-i]');
      if (el) open(shown, +el.dataset.i);
    });
    const initial = location.hash.slice(1);
    render(cats.some((c) => c.key === initial) ? initial : 'all');
  }

  // ── 복사 버튼 (컨택) ──
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = '복사됨';
        btn.classList.add('done');
        setTimeout(() => { btn.textContent = '복사'; btn.classList.remove('done'); }, 1600);
      } catch { /* 클립보드 권한 없음 */ }
    });
  });

  // ── 사이드 라벨 연도 ──
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
