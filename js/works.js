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
  - link     : 실제 웹페이지 주소 (선택, 전체 보기 화면에 '사이트 보기' 버튼)
  - page     : 코드로 만든 페이지 경로 (선택, 전체 보기에서 이미지 대신 실제 페이지를 띄움)
*/

window.CATEGORIES = [
  { key: 'landing', label: '랜딩페이지' },
  { key: 'detail', label: '상세페이지' },
  { key: 'brand', label: '브랜드·기획전' },
  { key: 'banner', label: '배너' },
  { key: 'video', label: '영상' },
];

window.WORKS = [
  // ── 랜딩페이지 ──
  {
    title: '알엑스퍼트 스킨솔루션', cat: 'landing',
    page: 'works/rxpert/index.html', // 실제 코드로 만든 페이지 (전체 보기에서 그대로 실행)
    img: 'assets/full/landing-05.jpg', thumb: 'assets/thumb/landing-05-mockup.jpg', w: 1268, h: 19644,
    link: 'https://bizgrida.co.kr/120',
    featured: 1,
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
    featured: 2,
    desc: '아이와 부모가 함께 보는 키즈 카메라의 제품 상세페이지. 8가지 기능을 단계별로 나눠 보여주고, 밝은 파스텔 톤과 캐릭터 일러스트로 친근하게 풀었습니다.',
    tags: ['상세페이지', '키즈', '전자기기'],
  },
  {
    title: '알러지케어 침구', cat: 'detail',
    img: 'assets/full/detail-02.jpg', thumb: 'assets/thumb/detail-02.jpg', w: 966, h: 11615,
    featured: 4,
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
    featured: 5,
    desc: '최대 80% 할인 기획전 페이지. 강한 그라디언트와 스티커형 그래픽으로 세일 분위기를 만들고, 상품 리스트는 카드형으로 정리해 구매 동선을 짧게 잡았습니다.',
    tags: ['기획전', '프로모션'],
  },
  { title: 'Merry Christmas 이벤트', cat: 'brand', img: 'assets/full/event-02.png', thumb: 'assets/thumb/event-02.jpg', w: 540, h: 4143 },
  {
    title: '2024 바로선행 리포트', cat: 'brand',
    img: 'assets/full/brand-01.png', thumb: 'assets/thumb/brand-01.jpg', w: 600, h: 7177, year: 2024,
    featured: 3,
    desc: '한 해 동안의 나눔 활동을 정리한 연간 리포트 페이지. 다크 톤 배경 위에 숫자와 인포그래픽을 배치해 활동 성과가 먼저 눈에 들어오도록 설계했습니다.',
    tags: ['캠페인', '인포그래픽'],
  },
  { title: 'Pure Kind PURKIN', cat: 'brand', img: 'assets/full/brand-02.png', thumb: 'assets/thumb/brand-02.jpg', w: 600, h: 4718 },
  { title: 'PURKIN Supporters', cat: 'brand', img: 'assets/full/brand-03.png', thumb: 'assets/thumb/brand-03.jpg', w: 600, h: 6496 },
  { title: '지구의 날 Earth Day', cat: 'brand', img: 'assets/full/brand-04.png', thumb: 'assets/thumb/brand-04.jpg', w: 600, h: 5745 },
  { title: '펄킨 서포터즈', cat: 'brand', img: 'assets/full/brand-05.png', thumb: 'assets/thumb/brand-05.jpg', w: 600, h: 6036 },

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
