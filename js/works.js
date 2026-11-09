/*
  작업물 데이터
  ─────────────────────────────────────────
  새 작업 추가: 아래 WORKS 배열에 한 줄 추가하면 메인/갤러리에 자동 반영됩니다.

  - title    : 작업 제목
  - cat      : 카테고리 키 (CATEGORIES 참고)
  - img      : 원본 이미지 경로 (예: 'assets/full/detail-09.jpg'). 영상은 대표 이미지
  - thumb    : 갤러리 썸네일 경로 (선택, 없으면 img 사용. 가로 600px 정도 권장)
  - video    : (영상만) mp4 경로 (예: 'assets/video/video-06.mp4')
  - w, h     : 원본 가로/세로 픽셀 (비율 계산용)
  - year     : 작업 연도 (선택)
  - featured : 메인 Selected Works에 노출할 순서 (1, 2, 3… / 없으면 갤러리에만)
  - desc     : 메인에 들어갈 설명 (featured인 작업만 쓰면 됨)
  - tags     : 메인에 보이는 작은 태그 (선택)
  - page     : 코드로 만든 페이지 경로 (선택, 전체 보기에서 이미지 대신 실제 페이지를 띄움)
  - images   : 한 프로젝트로 묶을 이미지 목록 (선택, 전체 보기에서 위아래로 이어서 보여줌)
  - caseStudy: 케이스 스터디 항목 [제목, 내용] 목록 (선택, desc 대신 표시)
  - site     : 실제 사이트 주소 (선택, 케이스 스터디 아래 링크)
*/

window.CATEGORIES = [
  { key: 'landing', label: '랜딩페이지' },
  { key: 'detail', label: '상세페이지' },
  { key: 'brand', label: '브랜드·기획전' },
  { key: 'banner', label: '배너' },
  { key: 'video', label: '영상' },
];

window.WORKS = [
  // ── 케이스 스터디 ──
  {
    title: '비즈그리다 홈페이지 리뉴얼 & 디자인 시스템', cat: 'brand',
    img: 'assets/full/biz-main.jpg', thumb: 'assets/thumb/biz-main.jpg', w: 1440, h: 8587,
    // 홈, 디자인 시스템, 서비스 페이지 순서
    images: [
      { img: 'assets/full/biz-main.jpg', w: 1440, h: 8587 },
      { img: 'assets/full/biz-system.png', w: 1400, h: 11565 },
      { img: 'assets/full/biz-targeting.jpg', w: 1440, h: 10018 },
      { img: 'assets/full/biz-app.jpg', w: 1440, h: 5507 },
      { img: 'assets/full/biz-elevator.jpg', w: 1440, h: 6995 },
      { img: 'assets/full/biz-iptv.jpg', w: 1440, h: 6940 },
      { img: 'assets/full/biz-live.jpg', w: 1440, h: 6360 },
      { img: 'assets/full/biz-research.jpg', w: 1440, h: 6082 },
      { img: 'assets/full/biz-designservice.jpg', w: 1440, h: 9684 },
    ],
    featured: 1,
    tags: ['홈페이지 리뉴얼', '디자인 시스템', '아임웹'],
    site: 'https://bizgrida.co.kr',
    caseStudy: [
      ['문제', '서비스 페이지마다 톤이 제각각이고, 새 페이지를 매번 처음부터 만들어야 했습니다. 내세울 실적 데이터가 적은 B2B 회사였습니다.'],
      ['제약', '디자이너 1인, 아임웹 빌더 환경.'],
      ['한 일', '홈·서비스 등 10여 개 페이지를 직접 기획해 리뉴얼했습니다. 색상·타이포·간격·버튼 위계·상태·모션 규칙을 담은 디자인 시스템을 처음부터 만들고 아임웹 커스텀 CSS로 구현했습니다.'],
      ['결과', '페이지 제작 시간 약 30% 단축.'],
      ['역할', '기획·디자인·구현 1인'],
    ],
  },

  // ── 랜딩페이지 ──
  {
    title: '알엑스퍼트 스킨솔루션', cat: 'landing',
    page: 'works/rxpert/index.html', // 실제 코드로 만든 페이지 (전체 보기에서 그대로 실행)
    img: 'assets/full/landing-05.jpg', thumb: 'assets/thumb/landing-05-mockup.jpg', w: 1268, h: 19644,
    featured: 2,
    desc: '알엑스퍼트의 브랜드를 소개하는 랜딩페이지. 기획부터 바이브 코딩을 통한 웹 구현까지 직접 진행했으며 LMS 광고 페이지의 특성을 고려하여 모바일을 기준으로 작업했습니다.',
    tags: ['랜딩페이지', '웹퍼블리싱', '바이브코딩', '뷰티'],
  },
  { title: '관악365치과의원 임플란트', cat: 'landing', img: 'assets/full/landing-01.png', thumb: 'assets/thumb/landing-01.jpg', w: 1000, h: 7060 },
  { title: 'LA VIE:UM 한강', cat: 'landing', img: 'assets/full/landing-02.png', thumb: 'assets/thumb/landing-02.jpg', w: 1000, h: 7726 },
  { title: '수지 X1 에디시온', cat: 'landing', img: 'assets/full/landing-03.png', thumb: 'assets/thumb/landing-03.jpg', w: 1000, h: 7986 },
  { title: '스마트스코어 프리미엄 멤버십', cat: 'landing', img: 'assets/full/landing-04.png', thumb: 'assets/thumb/landing-04.jpg', w: 757, h: 7999 },

  // ── 상세페이지 ──
  {
    title: '이지드로잉 키즈 카메라', cat: 'detail',
    img: 'assets/full/detail-01.jpg', thumb: 'assets/thumb/detail-01.jpg', w: 1200, h: 38290,
    featured: 4,
    desc: '아이와 부모가 함께 보는 키즈 카메라의 제품 상세페이지. 8가지 기능을 단계별로 나눠 보여주고, 밝은 파스텔 톤과 캐릭터 일러스트로 친근하게 풀었습니다.',
    tags: ['상세페이지', '키즈', '전자기기'],
  },
  {
    title: '나노케어 알러브릭 침구', cat: 'detail',
    img: 'assets/full/detail-02.jpg', thumb: 'assets/thumb/detail-02.jpg', w: 966, h: 11615,
    featured: 5,
    desc: '알러지 케어 기능을 강조한 침구 상세페이지. 차분한 화이트·네이비 톤에 기능 아이콘을 정리해 기능성 정보를 한눈에 읽히도록 구성했습니다.',
    tags: ['상세페이지', '리빙', '침구'],
  },
  { title: '블랭킷 상세페이지', cat: 'detail', img: 'assets/full/detail-03.jpg', thumb: 'assets/thumb/detail-03.jpg', w: 966, h: 16126 },
  { title: '침구 세트 상세페이지', cat: 'detail', img: 'assets/full/detail-04.jpg', thumb: 'assets/thumb/detail-04.jpg', w: 966, h: 21925 },
  { title: 'The Zart 블랭킷', cat: 'detail', img: 'assets/full/detail-05.jpg', thumb: 'assets/thumb/detail-05.jpg', w: 966, h: 4767 },
  { title: 'Daily Spread', cat: 'detail', img: 'assets/full/detail-06.jpg', thumb: 'assets/thumb/detail-06.jpg', w: 966, h: 4670 },
  { title: '진드기 차단 침구', cat: 'detail', img: 'assets/full/detail-07.jpg', thumb: 'assets/thumb/detail-07.jpg', w: 966, h: 13230 },
  { title: '방수 매트리스 커버', cat: 'detail', img: 'assets/full/detail-08.jpg', thumb: 'assets/thumb/detail-08.jpg', w: 966, h: 13727 },

  // ── 브랜드·기획전 ──
  {
    title: 'BIG SALE 주문폭주 기획전', cat: 'brand',
    img: 'assets/full/event-01.png', thumb: 'assets/thumb/event-01.jpg', w: 540, h: 3359,
  },
  { title: 'Merry Christmas 이벤트', cat: 'brand', img: 'assets/full/event-02.png', thumb: 'assets/thumb/event-02.jpg', w: 540, h: 4143 },
  {
    title: 'PURKIN 리브랜딩 프로젝트', cat: 'brand',
    img: 'assets/full/brand-02.png', thumb: 'assets/thumb/brand-02.jpg', w: 600, h: 4718,
    // Pure Kind PURKIN, PURKIN Supporters, 펄킨 서포터즈, 지구의 날 Earth Day, 2024 바로선행 리포트
    images: [
      { img: 'assets/full/brand-02.png', w: 600, h: 4718 },
      { img: 'assets/full/brand-03.png', w: 600, h: 6496 },
      { img: 'assets/full/brand-05.png', w: 600, h: 6036 },
      { img: 'assets/full/brand-04.png', w: 600, h: 5745 },
      { img: 'assets/full/brand-01.png', w: 600, h: 7177 },
    ],
    featured: 3,
    desc: '플랫폼 \'에코후레쉬\'를 \'PURKIN\'으로 리브랜딩. 브랜드 정체성이 불명확하다는 문제를 제기하고 마케팅팀과 톤앤매너를 재정립. "소비로 나의 가치를 만든다" 슬로건 아래 선행 주제 콘텐츠를 기획·디자인.',
    tags: ['리브랜딩', '브랜드 콘텐츠'],
  },

  // ── 배너 ──
  { title: 'Cozy Studio 피드', cat: 'banner', img: 'assets/full/sns-01.jpg', thumb: 'assets/thumb/sns-01.jpg', w: 1920, h: 1920 },
  { title: 'MEORU 머루포도 앰플', cat: 'banner', img: 'assets/full/sns-02.png', thumb: 'assets/thumb/sns-02.jpg', w: 1000, h: 1000 },
  { title: '예약 이벤트 배너', cat: 'banner', img: 'assets/full/sns-03.png', thumb: 'assets/thumb/sns-03.jpg', w: 1000, h: 1500 },
  { title: '소방관 장비 지원 캠페인', cat: 'banner', img: 'assets/full/sns-04.png', thumb: 'assets/thumb/sns-04.jpg', w: 1000, h: 1000 },
  { title: 'BIG FESTA', cat: 'banner', img: 'assets/full/event-03.jpg', thumb: 'assets/thumb/event-03.jpg', w: 860, h: 2040 },
  { title: 'BIG FESTA 리빙', cat: 'banner', img: 'assets/full/event-04.jpg', thumb: 'assets/thumb/event-04.jpg', w: 860, h: 1417 },
  { title: 'First Camera 기획전', cat: 'banner', img: 'assets/full/event-05.png', thumb: 'assets/thumb/event-05.jpg', w: 1200, h: 2575 },
  { title: 'APP 전용 이벤트', cat: 'banner', img: 'assets/full/event-06.jpg', thumb: 'assets/thumb/event-06.jpg', w: 1200, h: 1624 },
  { title: 'Kitchen Best', cat: 'banner', img: 'assets/full/event-07.jpg', thumb: 'assets/thumb/event-07.jpg', w: 1200, h: 1614 },

  // ── 영상 ──
  { title: '영상 01', cat: 'video', video: 'assets/video/video-01.mp4', img: 'assets/full/video-01.jpg', thumb: 'assets/thumb/video-01.jpg', w: 1920, h: 1080 },
  { title: '영상 02', cat: 'video', video: 'assets/video/video-02.mp4', img: 'assets/full/video-02.jpg', thumb: 'assets/thumb/video-02.jpg', w: 1920, h: 1080 },
  { title: '영상 03', cat: 'video', video: 'assets/video/video-03.mp4', img: 'assets/full/video-03.jpg', thumb: 'assets/thumb/video-03.jpg', w: 1920, h: 1080 },
  { title: '영상 04', cat: 'video', video: 'assets/video/video-04.mp4', img: 'assets/full/video-04.jpg', thumb: 'assets/thumb/video-04.jpg', w: 1920, h: 1080 },
  { title: '영상 05', cat: 'video', video: 'assets/video/video-05.mp4', img: 'assets/full/video-05.jpg', thumb: 'assets/thumb/video-05.jpg', w: 1920, h: 1080 },
];
