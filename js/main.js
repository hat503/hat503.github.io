(() => {
  const WORKS = window.WORKS || [];
  const CATEGORIES = window.CATEGORIES || [];
  const catLabel = (key) => (CATEGORIES.find((c) => c.key === key) || {}).label || key;

  // ── 이미지/영상 경로 (썸네일이 없으면 원본 사용) ──
  const thumbSrc = (work) => work.thumb || work.img;
  const fullSrc = (work) => work.img;
  const previewSrc = (work) => work.img;
  const videoSrc = (work) => work.video;

  // 이미지가 아직 없는 작업은 대표작에만 나옴 (갤러리·전체 보기 제외)
  const VIEWABLE = WORKS.filter((w) => w.img);

  const esc = (s = '') => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const PLAY = '<svg viewBox="0 0 16 18" fill="currentColor"><path d="M0 0l16 9-16 9z"/></svg>';

  // ── 카드 (갤러리 공통) ──
  const card = (work, i) => `
      <button class="card${work.video ? ' is-video' : ''}" data-i="${i}" style="animation-delay:${Math.min(i, 12) * 30}ms">
        <div class="card-img">
          <img src="${thumbSrc(work)}" alt="${esc(work.title)}" loading="lazy" width="600" height="800">
          ${work.video ? `<span class="card-play">${PLAY}</span>` : ''}
        </div>
        <div class="card-meta"><b>${esc(work.title)}</b><span>${catLabel(work.cat)}</span></div>
      </button>`;

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
        <button data-act="prev" aria-label="이전 작업"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 3L5 8l5 5"/></svg></button>
        <button data-act="next" aria-label="다음 작업"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3l5 5-5 5"/></svg></button>
        <button data-act="close" aria-label="닫기"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 3l10 10M13 3L3 13"/></svg></button>
      </div>
    </div>
    <div class="viewer-body"></div>`;
  document.body.appendChild(viewer);
  const vTitle = viewer.querySelector('.viewer-title');
  const vBody = viewer.querySelector('.viewer-body');

  const imageTag = (src, w, title, zoom = true) =>
    `<img src="${src}" alt="${esc(title)}" loading="lazy" width="${w.w}" height="${w.h}" style="--nat:${w.w * 2}px"${zoom && w.h / w.w > 4 ? ' class="is-long" title="클릭하면 크게 보기"' : ''}>`;

  // ── 리뉴얼 전/후 비교 ──
  // PC: 짝지은 페이지(홈·리서치)를 좌우로 놓고, 한 번의 스크롤로 두 창이 같은 페이지의 시작과 끝을 맞춰 내려감
  //     → 끝나면 두 창이 하나로 합쳐지고, 리뉴얼한 페이지를 탭으로 하나씩 봄
  // 모바일: 탭만 (리뉴얼 전 + 리뉴얼한 페이지들)
  const MERGE_LEN = 500; // 합쳐지는 데 쓰는 스크롤 거리(px)
  const isMobile = () => matchMedia('(max-width: 700px)').matches;
  let cmpUpdate = null; // 창 크기가 바뀌면 다시 계산

  const comparePages = (w, mobile) => [
    ...(mobile ? [{ name: '리뉴얼 전', imgs: w.before }] : []),
    ...w.images.map((im) => ({ name: im.name, imgs: [im] })),
  ];

  const compareTag = (w) => {
    const n = w.before.length;
    const strip = (arr, side) => arr.slice(0, n)
      .map((im) => `<img src="${im.img}" alt="${esc(`${w.title} ${side} ${im.name || ''}`)}" width="${im.w}" height="${im.h}">`).join('');
    const pages = comparePages(w, isMobile());
    return `
      <div class="cmp-scroll">
        ${isMobile() ? '' : `
        <div class="cmp-track">
          <div class="cmp-sticky">
            <div class="cmp-col" data-col="before"><p class="cmp-label">리뉴얼 전</p><div class="cmp-strip">${strip(w.before, '리뉴얼 전')}</div></div>
            <div class="cmp-col" data-col="after"><p class="cmp-label">리뉴얼 후</p><div class="cmp-strip">${strip(w.images, '리뉴얼 후')}</div></div>
          </div>
        </div>`}
        <section class="cmp-pages">
          <div class="cmp-pages-tabs" role="tablist">
            ${pages.map((p, i) => `<button role="tab" data-page="${i}" aria-selected="${i === 0}">${esc(p.name)}</button>`).join('')}
          </div>
          <div class="cmp-page"></div>
        </section>
      </div>`;
  };

  const initCompare = (w) => {
    const sc = vBody.querySelector('.cmp-scroll');
    const pages = comparePages(w, isMobile());
    const pageBox = sc.querySelector('.cmp-page');
    const section = sc.querySelector('.cmp-pages');
    const showPage = (i, jump) => {
      pageBox.innerHTML = pages[i].imgs.map((im) => imageTag(im.img, im, `${w.title} ${pages[i].name}`, false)).join('');
      sc.querySelectorAll('[data-page]').forEach((b) => b.setAttribute('aria-selected', +b.dataset.page === i));
      if (jump) sc.scrollTop = section.offsetTop;
    };
    section.addEventListener('click', (e) => {
      const b = e.target.closest('[data-page]');
      if (b) showPage(+b.dataset.page, true);
    });
    showPage(0, false);

    const track = sc.querySelector('.cmp-track');
    if (!track) { cmpUpdate = null; return; }
    const sticky = track.querySelector('.cmp-sticky');
    const cols = [...sticky.querySelectorAll('.cmp-col')];
    const strips = cols.map((c) => c.querySelector('.cmp-strip'));
    const n = w.before.length;
    const heights = (col, arr) => arr.slice(0, n).map((im) => col.clientWidth * im.h / im.w);
    const sum = (a, k = a.length) => a.slice(0, k).reduce((x, y) => x + y, 0);
    let segLen = [];
    let total = 0;

    const layout = () => {
      const bH = heights(cols[0], w.before);
      const aH = heights(cols[1], w.images);
      segLen = bH.map((b, i) => Math.max(b, aH[i])); // 긴 쪽은 원래 속도로, 짧은 쪽은 맞춰서 천천히
      total = sum(segLen);
      track.style.height = `${total + MERGE_LEN + sc.clientHeight}px`;
    };
    const update = () => {
      const s = sc.scrollTop;
      const vh = sticky.clientHeight;
      const m = Math.min(1, Math.max(0, (s - total) / MERGE_LEN));
      sticky.style.setProperty('--m', m);
      const hs = [heights(cols[0], w.before), heights(cols[1], w.images)];
      hs.forEach((h, c) => {
        const max = Math.max(0, sum(h) - vh);
        let pos = max;
        if (s < total) {
          let i = 0;
          while (i < n - 1 && s >= sum(segLen, i + 1)) i++;
          const p = (s - sum(segLen, i)) / segLen[i];
          pos = sum(h, i) + p * h[i];
        }
        strips[c].style.transform = `translateY(${-Math.min(max, Math.max(0, pos))}px)`;
      });
    };
    layout();
    update();
    sc.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    cmpUpdate = () => { layout(); update(); };
  };
  addEventListener('resize', () => cmpUpdate && cmpUpdate());

  const show = (idx) => {
    cur = (idx + list.length) % list.length;
    const w = list[cur];
    vTitle.innerHTML = `${esc(w.title)}<span>${catLabel(w.cat)} · ${cur + 1} / ${list.length}</span>`;
    vBody.classList.toggle('is-video', !!w.video);
    vBody.classList.toggle('is-page', !!w.page);
    vBody.classList.toggle('is-compare', !!w.before);
    vBody.innerHTML = w.before
      ? compareTag(w)
      : w.page
      ? `<iframe src="${w.page}" title="${esc(w.title)}"></iframe>`
      : w.video
      ?`<video src="${videoSrc(w)}" poster="${fullSrc(w)}" controls autoplay playsinline></video>`
      : w.images
      ? w.images.map((im) => imageTag(im.img, im, w.title)).join('')
      : imageTag(fullSrc(w), w, w.title);
    vBody.scrollTop = 0;
    cmpUpdate = null;
    if (w.before) initCompare(w);
  };
  const open = (works, idx) => {
    list = works;
    viewer.classList.add('open'); // 먼저 보이게 해야 비교 화면이 폭을 잴 수 있음
    show(idx);
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
    const viewable = feats.filter((w) => w.img); // 전체 보기에서 이전/다음으로 넘길 작업
    featRoot.innerHTML = feats.map((w, i) => `
      <article class="feat">
        <div class="feat-text">
          <div class="feat-no">${String(i + 1).padStart(2, '0')}</div>
          <h3>${esc(w.title)}</h3>
          ${w.tags ? `<ul class="tags">${w.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
          ${w.caseStudy
            ? `<dl class="case">${w.caseStudy.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`
            : `<p class="feat-desc">${esc(w.desc || '')}</p>`}
          ${w.site ? `<a class="link-arrow case-link" href="${w.site}" target="_blank" rel="noopener">${esc(w.site.replace(/^https?:\/\//, ''))}</a>` : ''}
        </div>
        ${w.img
          ? `<button class="feat-media" data-i="${viewable.indexOf(w)}" aria-label="${esc(w.title)} 전체 보기">
          <img src="${previewSrc(w)}" alt="" loading="lazy" width="${w.w}" height="${w.h}">
        </button>`
          : '<div class="feat-media is-empty" aria-hidden="true"></div>'}
      </article>`).join('');
    bindCards(featRoot, viewable);

    // 미리보기 스크롤: 마우스가 위쪽이면 위로, 아래쪽이면 아래로. 손 떼면 바로 맨 위
    const MAX_SPEED = 1600; // px/s (가장자리에 있을 때)
    featRoot.querySelectorAll('button.feat-media').forEach((box) => {
      const img = box.querySelector('img');
      let pos = 0, dir = 0, raf = 0, last = 0;
      const maxPos = () => Math.max(0, box.clientWidth * (img.getAttribute('height') / img.getAttribute('width')) - box.clientHeight);
      const tick = (t) => {
        const dt = last ? (t - last) / 1000 : 0;
        last = t;
        pos = Math.min(maxPos(), Math.max(0, pos + dir * MAX_SPEED * dt));
        img.style.transform = `translateY(${-pos}px)`;
        raf = requestAnimationFrame(tick);
      };
      box.addEventListener('mousemove', (e) => {
        const r = box.getBoundingClientRect();
        const rel = (e.clientY - r.top) / r.height - 0.5; // -0.5(위) ~ 0.5(아래)
        const DEAD = 0.12; // 가운데는 멈춤
        dir = Math.abs(rel) < DEAD ? 0 : Math.sign(rel) * ((Math.abs(rel) - DEAD) / (0.5 - DEAD)) ** 1.5;
        if (!raf) { last = 0; raf = requestAnimationFrame(tick); }
      });
      box.addEventListener('mouseleave', () => {
        cancelAnimationFrame(raf);
        raf = 0; dir = 0; pos = 0;
        img.style.transform = '';
      });
    });
  }

  // ── 메인: 갤러리 미리보기 ──
  const moreRoot = document.getElementById('more-grid');
  if (moreRoot) {
    const pick = VIEWABLE.filter((w) => !w.featured).slice(0, 8);
    moreRoot.innerHTML = pick.map(card).join('');
    bindCards(moreRoot, pick);
  }

  // ── 카운트 표시 ──
  document.querySelectorAll('[data-count]').forEach((el) => {
    const k = el.dataset.count;
    el.textContent = String(k === 'all' ? VIEWABLE.length : k === 'featured' ? WORKS.filter((w) => w.featured).length : VIEWABLE.filter((w) => w.cat === k).length).padStart(2, '0');
  });

  // ── 갤러리 페이지 ──
  const galRoot = document.getElementById('gallery-grid');
  const filterRoot = document.getElementById('filters');
  if (galRoot && filterRoot) {
    const cats = [{ key: 'all', label: '전체' }, ...CATEGORIES.filter((c) => VIEWABLE.some((w) => w.cat === c.key))];
    filterRoot.innerHTML = `<div class="tabs"><div class="tabs-inner">${cats.map((c) => `
      <button class="chip" data-cat="${c.key}" aria-pressed="false">${c.label}</button>`).join('')}</div></div>`;

    let shown = VIEWABLE;
    const render = (key) => {
      shown = key === 'all' ? VIEWABLE : VIEWABLE.filter((w) => w.cat === key);
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

  // ── 역량 점 (data-level 개수만큼 채움, 5점 만점) ──
  document.querySelectorAll('.sk-dots').forEach((el) => {
    const lv = +el.dataset.level || 0;
    el.innerHTML = Array.from({ length: 5 }, (_, i) => `<i style="--i:${i}"${i < lv ? ' class="on"' : ''}></i>`).join('');
  });

  // ══════════ 인터랙션 ══════════
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 큰 영문 글자를 글자 단위로 쪼갬
  // - 위쪽 타이틀: 처음 뜰 때 한 글자씩 올라옴
  // - 푸터 LET'S TALK.: 글자별 호버
  document.querySelectorAll('.hero-word, .page-word, .ft-word a').forEach((el) => {
    let n = 0;
    [...el.childNodes].forEach((node) => {
      if (node.nodeType !== 3) { node.classList.add('ch'); node.style.setProperty('--i', n++); return; }
      const frag = document.createDocumentFragment();
      [...node.textContent].forEach((c) => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.style.setProperty('--i', n++);
        s.textContent = c === ' ' ? ' ' : c;
        frag.appendChild(s);
      });
      node.replaceWith(frag);
    });
    el.setAttribute('aria-label', el.textContent.replace(/ /g, ' '));
  });

  // 스크롤하면 나타나기
  const revealSel = [
    '.intro', '.contents', '.skills', '.works-head', '.feat', '.more-head', '#more-grid .card',
    '.page-sub', '.contact-body > *', '.ft .label', '.ft-word', '.ft-row',
  ].join(',');
  const targets = [...document.querySelectorAll(revealSel)];
  // 같은 줄에 있는 카드는 조금씩 늦게
  document.querySelectorAll('#more-grid .card').forEach((c, i) => c.style.setProperty('--d', `${(i % 4) * 80}ms`));
  document.querySelectorAll('.contact-body > *').forEach((c, i) => c.style.setProperty('--d', `${i * 120}ms`));

  // 목차 숫자 카운트업
  const countUp = (root) => root.querySelectorAll('[data-count]').forEach((el) => {
    const to = +el.textContent;
    if (reduce || !to) return;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 900);
      el.textContent = String(Math.round(to * (1 - (1 - p) ** 3))).padStart(2, '0');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion');
    targets.forEach((el) => el.setAttribute('data-reveal', ''));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        if (e.target.matches('.contents')) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
    // 첫 화면에 이미 보이는 것들은 바로 표시 (옵저버를 기다리지 않음)
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight * 0.92) {
        el.classList.add('in');
        if (el.matches('.contents')) countUp(el);
        io.unobserve(el);
      }
    });
  }

  // 스크롤 내리면 헤더에 그림자
  const hd = document.querySelector('.hd');
  if (hd) {
    const onScroll = () => hd.classList.toggle('scrolled', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── 사이드 라벨 연도 ──
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
