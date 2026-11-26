// 화면 주석 자료. 좌표는 피그마 화면 안 요소의 위치(밝은 화면은 포스터 복제본 기준 1547폭, 어두운 화면은 1440폭).
// 글은 피그마 Rebuild_DS 각 화면 노드의 주석 원문을 짧은 명사형 구절로 줄였다.
export const SHOTS = {
  g02: { src: 'an_g02.jpg', px: [2012, 2414], k: 1.3 },
  a02: { src: 'an_a02.jpg', px: [2012, 3478], k: 1.3 },
  a01: { src: 'an_a01.jpg', px: [2012, 2098], k: 1.3 },
  d01: { src: 'an_d01.jpg', px: [2012, 1889], k: 1.3 },
  pub: { src: 'an_pub.jpg', px: [2160, 1779], k: 1.5 },
  panel: { src: 'an_panel.jpg', px: [2160, 1476], k: 1.5 },
  mcp: { src: 'an_mcp.jpg', px: [2160, 1719], k: 1.5 },
};

// 1 업무 문장 검색 (G-02 업무 검색)
export const F_SEARCH = {
  ...SHOTS.g02,
  crop: { x: 300, y: 240, w: 1200, h: 716 },
  side: 'right',
  alt: '업무 문장으로 찾은 AI 추천 결과 화면',
  cap: '피그마 G-02 업무 검색 1440px',
  notes: [
    { box: [318, 277, 1169, 52], cat: 'Interaction', text: '검색 단추를 누르는 동안 처리 중 표시와 입력칸 아래 한 줄 오류 안내' },
    { box: [589, 368, 898, 22], cat: 'Default value', text: '검색어와 분야와 자료 기준을 적은 한 줄 조건 글자' },
    { box: [589, 407, 898, 28], cat: 'Accessibility', text: '반짝임 표식은 장식이고 제목은 AI 추천 다음 일반 결과로 구분' },
    { box: [589, 435, 898, 175], cat: 'Data state', text: '한 행에 추천 이유와 분야와 유사 프로젝트 단추' },
  ],
};

// 2 AI 소개 카드 (A-02 소개)
export const F_CARD = {
  ...SHOTS.a02,
  crop: { x: 300, y: 128, w: 860, h: 690 },
  side: 'left',
  alt: '다섯 항목과 근거 표식이 붙은 소개 카드',
  cap: '피그마 A-02 프로젝트 소개 1440px',
  notes: [
    { box: [318, 257, 825, 26], cat: 'Default value', text: 'README 기반과 코드 추정과 정보 부족 세 종류의 근거 표식' },
    { box: [318, 292, 825, 370], cat: 'Data state', text: '값 하나와 근거 하나가 붙은 다섯 줄 항목' },
    { box: [318, 663, 825, 84], cat: 'Accessibility', text: '근거가 없는 칸은 비워 두지 않고 정보 부족으로 표시' },
  ],
};
export const F_CARD_README = {
  ...SHOTS.a02,
  crop: { x: 300, y: 1610, w: 860, h: 260 },
  side: 'left',
  alt: 'README 원문에서 근거 줄이 밝게 표시된 화면',
  cap: '근거 표식을 누르면 README 3줄에서 5줄이 밝아짐',
  notes: [
    { box: [318, 1629, 825, 220], cat: 'Accessibility', text: '근거 표식을 누르면 주소에 줄 번호가 남고 해당 줄 강조와 초점 이동' },
  ],
};

// 3 업무 분야 분류 (A-01 둘러보기)
export const F_FIELD = {
  ...SHOTS.a01,
  crop: { x: 300, y: 240, w: 1200, h: 640 },
  side: 'right',
  alt: '분야 표시와 근거 표식이 붙은 프로젝트 둘러보기 목록',
  cap: '피그마 A-01 프로젝트 둘러보기 1440px',
  notes: [
    { box: [318, 246, 1169, 77], cat: 'Responsive', text: '360px에서는 검색칸 한 줄 아래 분야 단추와 날짜 단추 한 줄로 쌓임' },
    { box: [318, 332, 1169, 82], cat: 'Interaction', text: '입력하면 업무 도우미 패널로 이어지고 입력칸 이름은 업무 설명 입력' },
    { box: [318, 423, 1169, 21], cat: 'Accessibility', text: '자료 기준 줄과 오른쪽 근거 범례' },
    { box: [318, 453, 1169, 110], cat: 'Data state', text: '소개 자료가 모자란 행은 소개 자료 부족 글자 표시' },
  ],
};

// 4 유사 프로젝트 (A-02 유사 프로젝트 5)
export const F_SIMILAR = {
  ...SHOTS.a02,
  crop: { x: 300, y: 770, w: 860, h: 640 },
  side: 'right',
  alt: '유사 프로젝트 다섯 건과 차이 한 줄이 붙은 목록',
  cap: '피그마 A-02 유사 프로젝트 5와 현재 프로젝트 제외 안내',
  notes: [
    { box: [996, 781, 147, 34], cat: 'Interaction', text: '도우미로 이어 찾기 단추가 업무 도우미 패널을 열고 현재 프로젝트는 제외' },
    { box: [318, 815, 825, 24], cat: 'Default value', text: '제목 아래 현재 프로젝트 제외 안내 글자' },
    { box: [318, 863, 825, 173], cat: 'Data state', text: '후보마다 차이 한 줄과 세 단계 유사도 표시' },
  ],
};

// 5 현황판 (D-01)
export const F_BOARD = {
  ...SHOTS.d01,
  crop: { x: 80, y: 70, w: 1400, h: 840 },
  side: 'left',
  alt: '분야별 지표가 묶인 현황판',
  cap: '피그마 D-01 현황판 1440px',
  notes: [
    { box: [129, 103, 1289, 39], cat: 'Accessibility', text: '페이지 제목과 기준 시각 함께 표시' },
    { box: [129, 193, 1289, 52], cat: 'Data state', text: '상단 요약 수치 한 줄' },
    { box: [129, 297, 270, 22], cat: 'Data state', text: '자료 기준 줄과 버전이 다르면 붙는 안내 줄' },
    { box: [129, 370, 623, 230], cat: 'Default value', text: '지표 묶음 A부터 E까지와 묶음마다 붙는 행과 막대' },
  ],
};

// 6 README 초안과 써 봤어요 (A-02 아래쪽)
export const F_DRAFT = {
  ...SHOTS.a02,
  crop: { x: 300, y: 1860, w: 860, h: 560 },
  side: 'left',
  alt: 'README 초안 예시와 써 봤어요 예시 화면',
  cap: '피그마 A-02 README 초안 예시와 써 봤어요 예시',
  notes: [
    { box: [318, 1883, 825, 112], cat: 'Data state', text: '시연용 예시 표시와 두 가지 상태(닫힘과 열림)' },
    { box: [318, 1961, 119, 34], cat: 'Interaction', text: '열기 단추로 초안을 펼치고 내려받기 상태로 이어짐' },
    { box: [318, 2030, 825, 34], cat: 'Interaction', text: '기록 추가와 삭제 뒤 새로고침하면 사전 예시 세 건만 남음' },
    { box: [318, 2030, 825, 377], cat: 'Responsive', text: '360px에서는 목록과 입력 영역이 한 열' },
  ],
};

// 7 공개 준비 점검 (A-03, 어두운 화면)
export const F_PUBLISH = {
  ...SHOTS.pub,
  crop: { x: 248, y: 80, w: 1190, h: 830 },
  side: 'left',
  dark: true,
  alt: '공개 준비 점검 예시 화면',
  cap: '피그마 A-03 공개 준비 점검 어두운 화면 1440px',
  notes: [
    { box: [296, 203, 1088, 46], cat: 'Interaction', text: '예시 대상과 현재 프로젝트를 한 줄로 구분' },
    { box: [296, 257, 1088, 44], cat: 'Data state', text: '공개 승인이 아니고 보안 점검도 아니라는 안내' },
    { box: [296, 339, 1088, 442], cat: 'Default value', text: '두 묶음 아홉 항목에 충족과 보완 필요와 확인 불가 판정 표시' },
    { box: [296, 789, 1088, 94], cat: 'Accessibility', text: '판정 뜻 안내는 색에만 기대지 않고 글자로 표기' },
  ],
};

// 8 업무 도우미 패널 (A-12, 어두운 화면)
export const F_PANEL = {
  ...SHOTS.panel,
  crop: { x: 248, y: 80, w: 1190, h: 900 },
  side: 'right',
  dark: true,
  alt: '업무 도우미 패널이 열린 화면',
  cap: '피그마 A-12 업무 도우미 패널 어두운 화면 1440px',
  notes: [
    { box: [1032, 80, 400, 100], cat: 'Interaction', text: '단축키 a로 열고 Esc로 닫음' },
    { box: [1048, 282, 368, 492], cat: 'Data state', text: '답변 상태 준비됨과 답변 종류 추천' },
    { box: [1048, 316, 368, 32], cat: 'Accessibility', text: '해석 줄은 해석이 있을 때만 표시하고 화면 읽기 도구에는 차분히 알림' },
    { box: [1096, 164, 320, 94], cat: 'Interaction', text: '질문 0.12초와 답변 0.2초 두 박자로 아래에서 올라옴' },
  ],
};

// 9 AI 코딩 도구 연결 안내 (A-07, 어두운 화면)
export const F_MCP = {
  ...SHOTS.mcp,
  crop: { x: 248, y: 90, w: 1190, h: 830 },
  side: 'left',
  dark: true,
  alt: 'AI 코딩 도구 연결 안내 화면',
  cap: '피그마 A-07 연결 안내 어두운 화면 1440px',
  notes: [
    { box: [296, 203, 328, 20], cat: 'Accessibility', text: '수집일과 건수와 버전을 적은 자료 기준 줄' },
    { box: [296, 375, 1088, 190], cat: 'Default value', text: '설정 복사 단계에서 저장소 경로 부분만 고쳐 씀' },
    { box: [296, 463, 1088, 86], cat: 'Interaction', text: '복사 단추는 세 상태이고 실패하면 글자 전체 선택' },
    { box: [296, 851, 1088, 32], cat: 'Data state', text: '응답 상태 아홉 종과 웹 화면 글자를 짝지어 안내' },
  ],
};

// 기존 현황판(As-Is) 막힌 지점. 좌표는 그림 가로 세로 비율(0~100)을 그림 크기에 곱해 둠.
const pct = (w, h, [x, y, bw, bh]) => [(x / 100) * w, (y / 100) * h, (bw / 100) * w, (bh / 100) * h];
export const ASIS_FILTER = {
  src: 'c_asis_filter.webp', px: [520, 600], k: 1,
  crop: { x: 0, y: 0, w: 520, h: 600 },
  side: 'right',
  alt: '기존 현황판 왼쪽 필터',
  notes: [
    { box: pct(520, 600, [6, 15, 87, 16]), cat: 'As-Is', text: '분야 필터 35개에 시험용 값이 섞이고 미분류 항목은 필터에 없음' },
    { box: pct(520, 600, [6, 62, 87, 16]), cat: 'As-Is', text: '검색어를 바꿔도 주소가 그대로여서 같은 결과를 동료에게 보낼 수 없음' },
  ],
};
export const ASIS_TABLE = {
  src: 'c_asis_table.webp', px: [1620, 860], k: 1,
  crop: { x: 0, y: 0, w: 1620, h: 860 },
  side: 'right',
  alt: '기존 현황판 프로젝트 표',
  notes: [
    { box: pct(1620, 860, [40, 10, 18, 68]), cat: 'As-Is', text: '설명 칸 글자 11px에서 13px로 KRDS 권고 16px보다 작음' },
    { box: pct(1620, 860, [1, 80, 98, 17]), cat: 'As-Is', text: '분야를 적지 않은 프로젝트는 미분류로 표시' },
  ],
};
export const GITHUB = {
  src: 'c_gh.webp', px: [2000, 952], k: 1,
  crop: { x: 0, y: 0, w: 2000, h: 952 },
  side: 'right',
  alt: 'GitHub 저장소 검색 결과',
  cap: 'GitHub 저장소 검색 2026. 11. 22. 검색어 출장비',
  notes: [
    { box: [180, 24, 1800, 62], cat: 'As-Is', text: 'GitHub는 검색어가 주소의 q 값으로 들어가 새로고침해도 같은 결과' },
    { box: [1470, 150, 300, 52], cat: 'As-Is', text: '정렬을 바꾸면 주소의 정렬 값도 함께 바뀜' },
  ],
};
