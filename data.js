/**
 * 포트폴리오 데이터
 * - 이 파일만 수정하면 사이트 내용이 바뀝니다.
 * - category: "uxui" | "3d" | "dev"
 * - visual: 이미지가 없을 때 쓰이는 자리표시 그래픽 (type: phone, web, dash, orb, pebble, lamp, mark, code, iso, wave, folio)
 * - image: 실제 이미지 경로를 넣으면 자리표시 그래픽 대신 사용됩니다. 예) "assets/mori-cover.jpg"
 * - gallery: 상세 화면 하단 이미지 3장 (없으면 자리표시 그래픽 변형으로 채워짐)
 * - pdf: { title, pages: [이미지 경로, …] } 를 넣으면 하단 이미지 3장 대신 문서 이미지를 순서대로 모두 보여줌
 */
window.PF = window.PF || {};

PF.PROFILE = {
  name: "Son Jihyeon",
  role: "Designer",
  email: "24.jihyeon@gmail.com",
  intro:
    "기존의 방식에 머무르지 않고 다양한 요소를 연결해 더 나은 해결 방법을 탐색합니다. 아이디어부터 세부적인 표현까지 고민하며 나만의 디자인을 만들어 갑니다.",
  // About 화면의 Tools 목록
  tools: ["Rhino", "NX", "Blender", "KeyShot", "Photoshop", "Illustrator", "Figma"],
  links: [
    { label: "GitHub", href: "https://github.com/Sonn058" },
    { label: "Behance", href: "https://www.behance.net/8db59310" },
  ],
};

PF.CATEGORIES = [
  { id: "all", label: "All", en: "every file, in one folder", ko: "모든 작업물" },
  { id: "uxui", label: "UX/UI Design", en: "service planning & interface", ko: "앱/웹 서비스 기획 및 화면 설계" },
  { id: "3d", label: "3D & Brand", en: "object, material & identity", ko: "3D 그래픽, CMF, 브랜드 아이덴티티 및 제품 디자인" },
  { id: "dev", label: "Development", en: "front-end & interactive web", ko: "프론트엔드 및 인터랙티브 웹 개발 프로젝트" },
];

PF.PROJECTS = [
  {
    id: "jjikdang",
    category: "uxui",
    title: "찍당",
    titleKo: "사진 한 장으로 시작하는 실천형 혈당 케어 앱",
    year: "2026",
    role: "Service Planning, UX Research, UI Design (3인 팀 프로젝트)",
    tools: ["Figma"],
    summary: "복잡한 기록이 아닌 간편한 이미지로, 귀찮음이 일상으로 바뀌는 실천형 혈당 케어.",
    keywords: ["Blood sugar", "Photo log", "Habit", "Character"],
    points: [
      "식단 사진 촬영만으로 기록 — 별도 기기나 복잡한 입력 없이 시작",
      "먹는 순서와 다음 식사 추천으로 행동을 유도하는 피드백",
      "수치 대신 색상과 한 줄 요약(안정 / 주의 / 위험)으로 직관적 전달",
    ],
    overview:
      "최근 10년 사이 2030세대의 당뇨병 유병률은 79.8% 증가했지만, 많은 사람이 위험을 느끼면서도 실천으로 이어가지 못합니다. 기존 혈당 관리 서비스는 CGM 기기 착용이나 번거로운 수동 입력에 의존해 일상에서 꾸준히 쓰기 어렵습니다. 찍당은 식단을 사진으로 찍기만 하면 먹는 순서, 다음 식사 추천, 혈당 변화 그래프를 제공해 당뇨인과 비당뇨인 모두 부담 없이 혈당을 관리하도록 돕습니다. 데스크 리서치와 사용자 인터뷰, 페르소나·사용자 여정 지도를 거쳐 서비스 컨셉을 도출하고, 혈액에서 태어난 메인 캐릭터와 디자인 시스템을 만들었습니다.",
    image: "assets/jjikdang/cover.webp",
    // 상세 화면 하단 Document 에 아래 이미지를 순서대로 보여준다
    pdf: {
      title: "찍당 프로젝트 문서",
      pages: [
        "assets/jjikdang/doc01.webp", "assets/jjikdang/doc02.png", "assets/jjikdang/doc03.png",
        "assets/jjikdang/doc04.png", "assets/jjikdang/doc05.png", "assets/jjikdang/doc06.webp",
        "assets/jjikdang/doc07.webp", "assets/jjikdang/doc08.webp", "assets/jjikdang/doc09.webp",
        "assets/jjikdang/doc10.png", "assets/jjikdang/doc11.webp", "assets/jjikdang/doc12.webp",
        "assets/jjikdang/doc13.png", "assets/jjikdang/doc14.webp", "assets/jjikdang/doc15.webp",
      ],
    },
    visual: { type: "phone", bg: "#fbe9ec", ac: "#dd1343" },
  },
  {
    id: "wisely",
    category: "uxui",
    title: "와이즐리",
    titleKo: "WISELY — UT 분석 및 UX 개선 프로젝트",
    year: "2026",
    role: "UX Research, UT 분석, UI Design (4인 팀 프로젝트)",
    tools: ["Figma", "Google Sheets"],
    summary: "고품질 최저가 생필품 커머스 와이즐리의 멤버십 가입 설득력을 높인 UT 기반 UX 개선.",
    keywords: ["Usability Test", "Membership", "Persuasion", "Commerce"],
    points: [
      "온라인 쇼핑 경험자 7명 대상 4개 태스크 사용성 테스트로 문제 검증",
      "서비스 가치 → 가격 신뢰 → 품질 신뢰 → 절약 혜택 → 가입 유도 순의 온보딩 재설계",
      "쇼핑몰별 가격 비교와 상황별 UX 라이팅으로 가격 혜택을 자연스럽게 전달",
    ],
    overview:
      "와이즐리는 유통 수수료와 마케팅비를 덜어낸 자체 제작 상품으로 원가에 가까운 가격을 실현하는 생필품 커머스입니다. 하지만 사용성 테스트 결과, 신규 사용자에게 '왜 와이즐리여야 하는가'를 뒷받침할 경험이 부족했습니다. 경쟁사 분석과 4개 태스크(멤버십 유도, 목적 없는 탐색, 목적 있는 탐색, 출시 예정 제품 탐색)의 UT를 바탕으로 핵심 키워드를 '설득력'으로 정의하고, 가치 중심 온보딩, 혜택을 이해하는 정보 흐름, 가격 혜택 중심의 상품 상세 화면을 설계했습니다. (2026.05.17 – 2026.06.22)",
    image: "assets/wisely/cover.webp",
    // 상세 화면 하단 Document 에 아래 이미지를 순서대로 보여준다
    pdf: {
      title: "와이즐리 UT 분석 및 개선안",
      pages: [
        "assets/wisely/doc01.webp", "assets/wisely/doc02.webp", "assets/wisely/doc03.png",
        "assets/wisely/doc04.png", "assets/wisely/doc05.png", "assets/wisely/doc06.png",
        "assets/wisely/doc07.png", "assets/wisely/doc08.webp", "assets/wisely/doc09.webp",
        "assets/wisely/doc10.webp",
      ],
    },
    visual: { type: "phone", bg: "#e8f0fb", ac: "#1e8bff" },
  },
  {
    id: "gripon",
    category: "3d",
    title: "GRIP:ON",
    titleKo: "안내와 대피를 함께하는 스마트 손잡이",
    year: "2026",
    role: "Product Design, 3D Modeling, Display UI",
    tools: ["Rhino"],
    summary: "Grip the Rail, Turn Safety ON — 평상시엔 안내를, 비상시엔 대피를 돕는 스마트 핸드레일.",
    keywords: ["Handrail", "Wayfinding", "Safety", "Display"],
    points: [
      "누구나 매일 손이 닿는 손잡이를 정보 전달 매체로 활용",
      "기본 모드: 층 안내·공간·날씨/환경·행사 정보를 자동 전환 디스플레이로 제공",
      "비상 모드: 대피 방향·비상구·재난 정보 표시와 함께 비상 물품 보관함이 자동으로 열림",
    ],
    overview:
      "손잡이는 복도, 계단, 대피 동선처럼 사람들이 가장 자주 접하는 곳에 설치되어 있지만, 기존 안내 표지판은 시야 확보가 어렵거나 위치가 제한적이어서 필요한 정보를 제때 전달하지 못합니다. GRIP:ON은 손잡이의 물리적 기능에 디지털 정보를 결합해, 손이 닿는 가장 가까운 곳에서 정보를 전달하고 위급한 순간에는 신속하고 직관적인 대피를 지원합니다. 손의 스케일을 반영한 단면 설계로 그립감을 확보하고, 손잡이의 역할을 지지에서 안내로, 안내에서 안전으로 확장했습니다.",
    image: "assets/gripon/cover.webp",
    // 상세 화면 하단 Document 에 아래 이미지를 순서대로 보여준다
    pdf: {
      title: "GRIP:ON 프로젝트 문서",
      pages: [
        "assets/gripon/doc01.webp", "assets/gripon/doc02.png", "assets/gripon/doc03.webp",
        "assets/gripon/doc04.webp", "assets/gripon/doc05.webp", "assets/gripon/doc06.webp",
        "assets/gripon/doc07.png", "assets/gripon/doc08.png",
      ],
    },
    visual: { type: "pebble", bg: "#efefef", ac: "#2a2a2a" },
  },
  {
    id: "ieum",
    category: "3d",
    title: "이음",
    titleKo: "끝없는 순환, 그리고 맞닿음 — 뫼비우스 고리 형태의 소파",
    year: "2026",
    role: "Furniture Design, 3D Modeling, Rendering",
    tools: ["Blender"],
    summary: "하나의 선이 끊임없이 이어지는 고리의 형상으로, 사람과 사람 사이의 연결을 담은 소파.",
    keywords: ["Circulation", "Coexistence", "Flexibility", "Furniture"],
    points: [
      "순환 — 시작과 끝이 따로 없는 고리의 형태를 상징",
      "공존 — 서로 다른 두 가지 상태가 한 곳에 머무름",
      "유연 — 부드럽게 휘어지는 형태로 상황에 따라 달라지는 기능",
    ],
    overview:
      "하나의 선이 유려하게 이어져 끊임없이 순환하는 고리의 형상을 완성했습니다. 이 소파는 시작과 끝이 없는 구조를 통해 사람과 사람 사이의 연결과 무한함이라는 상징적 가치를 공간에 투영합니다. 뫼비우스 띠 레퍼런스와 스케치, AI 렌더링으로 형태를 탐색하고 3D로 구체화했으며, 각자 기대어 쉬거나 두 사람이 서로 마주보 방향으로 앉는 등 다양한 사용 방식을 제안합니다.",
    image: "assets/ieum/cover.png",
    // 상세 화면 하단 Document 에 아래 이미지를 순서대로 보여준다
    pdf: {
      title: "이음 프로젝트 문서",
      pages: [
        "assets/ieum/doc01.png", "assets/ieum/doc02.png", "assets/ieum/doc03.png",
        "assets/ieum/doc04.png", "assets/ieum/doc05.png",
      ],
    },
    visual: { type: "orb", bg: "#ecebe9", ac: "#cfcfcd" },
  },
  {
    id: "eoheungping",
    category: "3d",
    title: "어흥핑",
    titleKo: "캐치! 티니핑 캐릭터 디자인 — 자유를 찾아온 힐링 티니핑",
    year: "2026",
    role: "Character Design, 3D Modeling, Rendering",
    tools: ["Blender"],
    summary: "꼭 참지 말고 어흥! 인내 대신 즐거움을 선택해 동굴을 뛰쳐나온 호랑이 티니핑.",
    keywords: ["Character", "Tiger", "Healing", "3D Figure"],
    points: [
      "단군신화의 호랑이를 모티프로, 인내 대신 즐거움을 선택한 캐릭터 설정",
      "'참지마' 마법으로 사람들의 인내심을 풀어 주는 휴식과 힐링 콘셉트",
      "레퍼런스·스케치·AI 렌더에서 3D 모델링과 렌더링까지 이어진 제작 과정",
    ],
    overview:
      "어흥핑은 단군신화에서 인내 대신 즐거움을 선택해 동굴을 뛰쳐나와 자유로운 티니핑이 된 호랑이 캐릭터입니다. '참지마' 마법으로 너무 열심히만 사는 사람들의 인내심을 해제해, 자신의 욕구에 솔직해지는 즐거운 휴식과 힐링을 선물합니다. 호기심 많고 장난꾸러기에 먹는 것을 좋아하는 성격을 스케치로 정리하고, AI 렌더와 Spark 3D, 모델링과 렌더링을 거쳐 피규어 형태의 3D 캐릭터로 완성했습니다.",
    image: "assets/eoheungping/cover.webp",
    // 상세 화면 하단 Document 에 아래 이미지를 순서대로 보여준다
    pdf: {
      title: "어흥핑 프로젝트 문서",
      pages: [
        "assets/eoheungping/doc01.webp", "assets/eoheungping/doc02.png",
        "assets/eoheungping/doc03.png", "assets/eoheungping/doc04.png",
      ],
    },
    visual: { type: "orb", bg: "#f3ece2", ac: "#e39a4f" },
  },
  {
    id: "tetris-defense",
    category: "dev",
    title: "TETRIS: LAST DEFENSE",
    titleKo: "테트리스 디펜스 게임",
    year: "2026",
    role: "Game Design, Development",
    tools: ["Google AI Studio"],
    summary: "라인을 지우면 공격이 발사되는, 테트리스와 디펜스를 결합한 픽셀 아케이드 게임.",
    keywords: ["Game", "Pixel Art", "Defense", "Arcade"],
    points: [
      "라인 클리어가 곧 공격이 되는 Line-Clear Weapon System",
      "다가오는 침략자를 막아내는 Invader Annihilation 규칙",
      "로그인·랭킹·BGM을 갖춘 16-bit 픽셀 아케이드 UI",
    ],
    overview: "Grid Matrix Defense Protocol — 테트리스의 블록 쌓기와 라인 클리어를 몬스터 방어전으로 확장한 웹 게임입니다. 줄을 지울 때마다 공격력이 들어가 침략자를 물리치고 랜덤으로 아이템을 얻습니다. 또한 점수는 랭킹에 기록됩니다. Google AI Studio로 제작했으며 카드의 Play 링크로 바로 플레이할 수 있습니다.",
    // 썸네일: 첨부한 게임 화면을 이 경로에 저장하면 표시됨 (없으면 자리표시 그래픽)
    image: "assets/tetris-defense/cover.png",
    // 상세 화면 Overview 아래 이미지 3장
    gallery: [
      "assets/tetris-defense/shot01.png",
      "assets/tetris-defense/shot02.png",
      "assets/tetris-defense/shot03.png",
    ],
    // 카드와 상세 화면의 링크 → 새 탭에서 열림
    link: { href: "https://ai.studio/apps/a753bb64-572d-4a41-9f89-1579037e193c", label: "Play the game" },
    visual: { type: "tetris", bg: "#ecebe8", ac: "#2f2f2d" },
  },
  {
    id: "roomtidy",
    category: "dev",
    title: "방 정리 대작전",
    titleKo: "Room Tidy — 3D 멀티플레이 웹 게임",
    year: "2026",
    role: "Interactive Web Development",
    tools: ["Claude", "Github", "Render"],
    summary: "흩어진 물건을 제자리에. 친구와 함께 즐기는 3D 웹 게임.",
    keywords: ["3D Web", "Multiplayer", "Playful", "Real-time"],
    points: [
      "Three.js 기반 방 구성과 물건 집기·놓기 인터랙션",
      "WebSocket 실시간 멀티플레이 동기화",
      "오프닝 영상과 사운드로 만든 몰입감 있는 시작 화면",
    ],
    overview:
      "어질러진 방 곳곳에 흩어진 물건을 제자리에, 쓰레기는 휴지통으로 옮기는 3D 웹 게임입니다. 아기자기한 방과 물건을 구성하고 물건을 집고 놓는 인터랙션을 만들었으며, 친구와 함께 실시간으로 방을 치우고 방해하는 경쟁 멀티플레이를 구현했습니다. 오프닝 영상과 사운드로 게임의 첫인상을 연출했습니다.",
    image: "assets/roomtidy/cover.webp",
    // 상세 화면 Overview 아래 이미지 3장 (밝은 게임 화면이라 배경도 밝게)
    gallery: [
      "assets/roomtidy/shot01.webp",
      "assets/roomtidy/shot02.webp",
      "assets/roomtidy/shot03.png",
    ],
    galleryBg: "#f3eee6",
    // 카드와 상세 화면의 링크 → 새 탭에서 게임 플레이
    link: { href: "https://room-tidy.onrender.com/", label: "Play the game" },
    visual: { type: "iso", bg: "#eef0ee", ac: "#b9c4bb" },
  },
];
