// 공공 깃랩 사례 소개 누리집 자료. 모든 사실은 결과 보고서, 피그마 파일, 직접 집계 자료에서 옮김.
export const LIVE_URL = 'https://hyunho2378.github.io/ai-public-gitlab/?mode=light';
export const REPO_URL = 'https://github.com/hyunho2378/ai-public-gitlab';

export const GNB = [
  { id: 'background', label: '사업 소개', to: '#/intro/background' },
  { id: 'features', label: '주요 기능', to: '#/intro/features' },
  { id: 'howto', label: '이용 안내', to: '#/intro/howto' },
  { id: 'archive', label: '자료실', to: '#/archive' },
  { id: 'news', label: '알림마당', to: '#/news' },
];

export const TABS = [
  { id: 'background', label: '추진 배경' },
  { id: 'features', label: '주요 기능' },
  { id: 'howto', label: '이용 방법' },
  { id: 'results', label: '추진 성과' },
];

export const DEV = [
  { b: '발견', s: '연결 안내에서 설정 복사' },
  { b: '검색', s: 'AI 코딩 도구에 개발 요청' },
  { b: '판단', s: '프로젝트 번호로 상세 조회' },
  { b: '결정', s: '재사용인지 신규 개발인지 선택' },
  { b: '기록', s: '공개 전 README 정리' },
];

export const ROLE = [
  { b: '문제 조사', s: '공개 프로젝트와 README 직접 집계' },
  { b: '기획', s: '업무 문장 검색과 소개 카드 구성' },
  { b: 'UX 설계', s: '목록과 현황판 흐름' },
  { b: 'UI 디자인', s: '화면 전체' },
  { b: '디자인 시스템', s: 'KRDS 부품과 변수 정리' },
  { b: '프론트엔드', s: '화면 구현' },
];

export const STRATEGY = [
  { b: '업무 문장으로 찾기', s: '도구 이름을 몰라도 하는 일을 문장으로 입력' },
  { b: '값마다 근거 표식', s: 'README 기반과 코드 추정과 정보 부족 세 종류를 값 옆에 표시' },
  { b: '분야 12개 공통 분류', s: '기관마다 다른 주제를 묶고 프로젝트 하나에 분야는 둘까지' },
  { b: '접근성과 반응형', s: '색에 기대지 않는 글자 표기와 360px 쌓임과 단축키 a와 Esc' },
];

export const SWATCH = [
  { n: 'Primary 50', h: '#256EF4' },
  { n: 'Primary 5', h: '#ECF2FE' },
  { n: '짙은 파랑', h: '#023863' },
  { n: 'Gray 90', h: '#1E2124' },
  { n: 'Gray 70', h: '#464C53' },
  { n: 'Gray 50', h: '#6D7882' },
  { n: 'Gray 5', h: '#F4F5F6' },
];

// 이용 방법 단계. 각 단계의 화면 잘라 보기는 위치 값(그림 화면 좌표)으로 지정.
export const STEPS = [
  {
    id: 'search', label: '업무 문장 검색', feat: 'f-search',
    text: '찾으려는 업무를 문장으로 입력하면 맞는 도구가 위에 올라옴. 결과 한 행에 추천 이유와 분야와 유사 프로젝트 단추가 함께 보임.',
    shot: { src: 'an_g02.jpg', nat: [2012, 2414], crop: { x: 300, y: 190, w: 1200, h: 520 }, cap: '업무 문장 검색 결과' },
  },
  {
    id: 'card', label: '소개 카드 확인', feat: 'f-card',
    text: 'README를 읽고 정리한 쓰임새와 실행 형태와 이용 조건을 값마다 근거 표식과 함께 확인. 근거를 누르면 README 해당 줄이 밝아짐.',
    shot: { src: 'an_a02.jpg', nat: [2012, 3478], crop: { x: 318, y: 128, w: 825, h: 540 }, cap: '근거 표식이 붙은 소개 카드' },
  },
  {
    id: 'similar', label: '유사 프로젝트 비교', feat: 'f-similar',
    text: '새로 만들기 전에 비슷한 도구를 먼저 확인. 후보마다 차이 한 줄과 세 단계 유사도가 붙고 현재 프로젝트는 제외.',
    shot: { src: 'an_a02.jpg', nat: [2012, 3478], crop: { x: 318, y: 750, w: 825, h: 500 }, cap: '유사 프로젝트 5' },
  },
  {
    id: 'helper', label: '업무 도우미 질문', feat: 'f-panel',
    text: '어느 화면에서든 단축키 a로 도우미 패널을 열고 업무를 설명하면 추천 도구가 답으로 올라옴. Esc로 닫음.',
    shot: { src: 'an_panel.jpg', nat: [2160, 1476], k: 1.5, crop: { x: 248, y: 20, w: 1190, h: 640 }, cap: '업무 도우미 패널' },
  },
  {
    id: 'publish', label: '공개 준비 점검', feat: 'f-publish',
    text: 'README와 이용 조건 같은 아홉 항목을 충족과 보완 필요와 확인 불가로 점검. 공개 승인이나 보안 점검은 아님.',
    shot: { src: 'an_pub.jpg', nat: [2160, 1779], k: 1.5, crop: { x: 248, y: 80, w: 1190, h: 640 }, cap: '공개 준비 점검 예시' },
  },
];

export const FAQ = [
  { q: '도구 이름을 모를 때', a: '하는 일을 문장으로 입력하면 프로젝트 이름과 소개 카드 요약과 대상 업무를 대조해 관련도가 높은 결과를 먼저 보여 줌. 예제 데이터에서 출장 여비 정산을 입력하면 출장비 정산 도우미가 첫 번째에 표시됨.' },
  { q: '근거 표식의 뜻', a: '값마다 README 기반과 코드 추정과 정보 부족 가운데 하나가 붙음. README 기반은 원문 해당 줄로 이동하고 정보 부족은 확인 근거가 없다는 표시.' },
  { q: '분야가 비어 있는 프로젝트', a: '분야를 적지 않은 프로젝트는 미분류로 표시. 분류가 된 프로젝트는 AI가 설명과 README를 읽고 12개 공통 업무 분야 가운데 최대 두 분야를 부여.' },
  { q: 'AI 요청이 실패할 때', a: '기존 카드 검색으로 전환해 결과를 계속 보여 줌.' },
  { q: '점검 중일 때', a: '공개 API가 응답하지 않으면 저장한 자료로 목록을 보여 주고 화면 위에 점검 안내와 자료 기준일을 띄움.' },
  { q: '개발 도구에서 쓰는 방법', a: '연결 안내에서 개발 도구를 고르고 설정을 복사하면 AI 코딩 도구 안에서 공개 프로젝트를 검색하고 상세와 유사 프로젝트를 조회할 수 있음.' },
];

// 알림마당: 날짜와 한 줄. 날짜는 자료에 적힌 날짜만 씀.
export const NEWS = [
  { d: '2026. 11. 20.', k: '자료', t: '결과 보고서 작성과 화면 설계 파일 정리', n: '개발 결과 보고서 3쪽 작성. 피그마 파일에 기능별 화면 F1부터 F9까지 정리' },
  { d: '2026. 11. 22.', k: '조사', t: 'GitHub 저장소 검색 화면 비교', n: '검색어 출장비로 13건 결과와 주소 저장 방식 확인' },
  { d: '2026. 11. 7.', k: '조사', t: '기존 현황판 프로젝트 표 확인', n: '설명 칸 글자 크기와 미분류 표시 확인' },
  { d: '2026. 10. 30.', k: '점검', t: '공개 프로젝트 728건 수집', n: '이 날 수집본을 기준으로 AI 소개 카드 172건 요약과 근거 줄 저장' },
  { d: '2026. 10. 25.', k: '조사', t: '공개 프로젝트와 README 직접 집계', n: '프로젝트 671개와 README 695개 전수 분석' },
  { d: '2026. 10. 2.', k: '조사', t: '현황판 직접 확인', n: '분야 필터 35개와 검색 주소 변화 확인' },
];

// 자료실. 실제 있는 자료만 올림.
export const ARCHIVE = [
  {
    id: 'report', no: 5, kind: '보고서', title: 'AI를 활용한 공공서비스 직접개발 결과 보고서', date: '2026. 11. 20.', fmt: 'PDF 3쪽',
    desc: '과제 개요와 주요 개발 결과와 개발 과정을 정해진 양식에 정리한 보고서. 오른쪽 미리보기는 3쪽 중 2쪽.',
    files: [{ name: '결과보고서_3차.pdf', meta: 'PDF 3쪽 중 2쪽 미리보기', type: 'preview' }],
    preview: [{ src: 'report_p2.png', cap: '보고서 2쪽 주요 개발 결과와 개발 과정' }],
  },
  {
    id: 'figma', no: 4, kind: '화면 설계', title: '[AX.S] Public GitLab Rebuild_DS 화면 설계 파일', date: '2026. 11. 20.', fmt: '피그마',
    desc: '청사진과 흐름 S01부터 S10과 기능별 화면 F1부터 F9로 나눠 KRDS 부품으로 그린 설계 파일.',
    files: [{ name: 'Rebuild_DS 설계 파일', meta: '피그마 파일', type: 'info' }],
    preview: [{ crop: { src: 'an_g02.jpg', nat: [2012, 2414], k: 1.3, crop: { x: 300, y: 190, w: 1200, h: 600 } }, cap: 'F1 업무 문장 검색 화면' }, { crop: { src: 'an_a01.jpg', nat: [2012, 2098], k: 1.3, crop: { x: 300, y: 120, w: 1200, h: 640 } }, cap: 'F3 업무 분야 분류 화면' }],
  },
  {
    id: 'live', no: 3, kind: '서비스', title: '공공 깃랩 재설계 배포 화면', date: '2026. 10. 30.', fmt: '웹 서비스',
    desc: '2026. 10. 30. 수집본 728건으로 열리는 실제 서비스. 업무 검색과 소개 카드와 현황판을 직접 눌러 볼 수 있음.',
    files: [{ name: '웹 서비스 열기', meta: '새 창으로 열림', type: 'link', href: LIVE_URL }],
    preview: [{ src: 'live_poster.jpg', cap: '배포한 프로젝트 둘러보기 화면' }],
  },
  {
    id: 'repo', no: 2, kind: '소스', title: '공공 깃랩 서비스 소스 저장소', date: '-', fmt: 'GitHub',
    desc: '정적 버전과 서버 버전을 각각 실행하는 방법과 시연 영상 링크를 정리한 저장소.',
    files: [{ name: '저장소 열기', meta: '새 창으로 열림', type: 'link', href: REPO_URL }],
    preview: [{ crop: { src: 'an_mcp.jpg', nat: [2160, 1719], k: 1.5, crop: { x: 248, y: 90, w: 1190, h: 500 } }, cap: 'AI 코딩 도구 연결 안내 화면' }],
  },
  {
    id: 'anno', no: 1, kind: '화면 자료', title: '기능별 화면 주석 자료', date: '2026. 11. 26.', fmt: '이 누리집',
    desc: '기능 화면 아홉 개에 동작과 값 상태를 선으로 설명한 자료. 주요 기능과 추진 성과 쪽에서 볼 수 있음.',
    files: [{ name: '주요 기능 쪽으로 이동', meta: '이 누리집 안', type: 'route', to: '#/intro/features' }],
    preview: [{ crop: { src: 'an_a02.jpg', nat: [2012, 3478], k: 1.3, crop: { x: 300, y: 128, w: 860, h: 640 } }, cap: '소개 카드 화면 주석' }],
  },
];

export const IA_NODES = [
  { c: 'D-01', n: '현황판', r: '/dashboard/', t: '별도 앱', gc: 1, gr: 1 },
  { c: 'A-01', n: '공개 프로젝트 둘러보기', r: '/', t: '쪽', gc: 3, gr: 1 },
  { c: 'G-02', n: '업무 검색', r: '/search', t: '탭 2개는 화면 안 상태', gc: 5, gr: 1 },
  { c: 'A-12', n: '업무 도우미', r: '', t: '1440 패널 360 시트', gc: 1, gr: 3 },
  { c: 'A-02', n: '소개 카드', r: '/projects/:id/about', t: '쪽', gc: 3, gr: 3 },
  { c: 'A-05', n: '도구 요청', r: '/requests', t: '기존 화면', gc: 5, gr: 3 },
  { c: 'A-07', n: '개발 도구 연결 안내', r: '/mcp', t: '쪽', gc: 1, gr: 5 },
  { c: 'A-03', n: '공개 준비 점검 예시', r: '', t: '쪽', gc: 3, gr: 5 },
];
export const IA_EDGES = [
  { dir: 'h', gc: 2, gr: 1, label: '분야 행 분류 상태 행', arrow: 'right' },
  { dir: 'h', gc: 4, gr: 1, label: '상단 검색 또는 사이드바', arrow: 'right' },
  { dir: 'h', gc: 2, gr: 3, label: '도우미로 이어 찾기', arrow: 'both' },
  { dir: 'v', gc: 5, gr: 2, label: '결과 없음의 도구 요청', arrow: 'down' },
  { dir: 'v', gc: 1, gr: 4, label: '웹에서 같은 질문', arrow: 'up' },
  { dir: 'v', gc: 3, gr: 2, label: '', arrow: 'both' },
  { dir: 'v', gc: 3, gr: 4, label: '공개 준비 점검', arrow: 'both' },
];
