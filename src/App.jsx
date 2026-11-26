// 공공 깃랩 AX 개선 케이스 스터디
// 한 줄 세로 흐름: 표지 > 개요 > 문제 전환 > 리서치 > 목표 > 여정 > 전략 > IA > 비주얼 시스템 > 기능별 화면 > 역할 > 마무리.
// 시빅해킹과 AX와 UX는 구간 위 작은 라벨로 표시한다. 스크롤 연출과 자동 재생은 쓰지 않는다.
import AnnoShot from './components/AnnoShot.jsx';
import { F_SEARCH, F_CARD, F_CARD_README, F_FIELD, F_SIMILAR, F_BOARD, F_DRAFT, F_PUBLISH, F_PANEL, F_MCP, ASIS_TABLE, GITHUB } from './annos.js';
import Journey from './components/Journey.jsx';
import { LIVE_URL } from './components/LiveFrame.jsx';

const IMG = (f) => `${import.meta.env.BASE_URL}img/${f}`;

const DEV = [
  { b: '발견', s: '연결 안내에서 설정 복사' },
  { b: '검색', s: 'AI 코딩 도구에 개발 요청' },
  { b: '판단', s: '프로젝트 번호로 상세 조회' },
  { b: '결정', s: '재사용인지 신규 개발인지 선택' },
  { b: '기록', s: '공개 전 README 정리' },
];

const ROLE = [
  { b: '문제 조사', s: '공개 프로젝트와 README 직접 집계' },
  { b: '기획', s: '업무 문장 검색과 소개 카드 구성' },
  { b: 'UX 설계', s: '목록과 현황판 흐름' },
  { b: 'UI 디자인', s: '화면 전체' },
  { b: '디자인 시스템', s: 'KRDS 부품과 변수 정리' },
  { b: '프론트엔드', s: '화면 구현' },
];

const STRATEGY = [
  { b: '업무 문장으로 찾기', s: '도구 이름을 몰라도 하는 일을 문장으로 입력' },
  { b: '값마다 근거 표식', s: 'README 기반과 코드 추정과 정보 부족 세 종류를 값 옆에 표시' },
  { b: '분야 12개 공통 분류', s: '기관마다 다른 주제를 묶고 프로젝트 하나에 분야는 둘까지' },
  { b: '접근성과 반응형', s: '색에 기대지 않는 글자 표기와 360px 쌓임과 단축키 a와 Esc' },
];

const SWATCH = [
  { n: 'Primary 50', h: '#256EF4' },
  { n: 'Primary 5', h: '#ECF2FE' },
  { n: '짙은 파랑', h: '#023863' },
  { n: 'Gray 90', h: '#1E2124' },
  { n: 'Gray 70', h: '#464C53' },
  { n: 'Gray 50', h: '#6D7882' },
  { n: 'Gray 5', h: '#F4F5F6' },
];

// 화면 지도. 줄은 곧은 선만 쓴다. 칸 번호는 피그마 IA-01 화면 지도.
const IA_NODES = [
  { c: 'D-01', n: '현황판', r: '/dashboard/', t: '별도 앱', gc: 1, gr: 1 },
  { c: 'A-01', n: '공개 프로젝트 둘러보기', r: '/', t: '쪽', gc: 3, gr: 1 },
  { c: 'G-02', n: '업무 검색', r: '/search', t: '탭 2개는 화면 안 상태', gc: 5, gr: 1 },
  { c: 'A-12', n: '업무 도우미', r: '', t: '1440 패널 360 시트', gc: 1, gr: 3 },
  { c: 'A-02', n: '소개 카드', r: '/projects/:id/about', t: '쪽', gc: 3, gr: 3 },
  { c: 'A-05', n: '도구 요청', r: '/requests', t: '기존 화면', gc: 5, gr: 3 },
  { c: 'A-07', n: '개발 도구 연결 안내', r: '/mcp', t: '쪽', gc: 1, gr: 5 },
  { c: 'A-03', n: '공개 준비 점검 예시', r: '', t: '쪽', gc: 3, gr: 5 },
];
const IA_EDGES = [
  { dir: 'h', gc: 2, gr: 1, label: '분야 행 분류 상태 행', arrow: 'right' },
  { dir: 'h', gc: 4, gr: 1, label: '상단 검색 또는 사이드바', arrow: 'right' },
  { dir: 'h', gc: 2, gr: 3, label: '도우미로 이어 찾기', arrow: 'both' },
  { dir: 'v', gc: 5, gr: 2, label: '결과 없음의 도구 요청', arrow: 'down' },
  { dir: 'v', gc: 1, gr: 4, label: '웹에서 같은 질문', arrow: 'up' },
  { dir: 'v', gc: 3, gr: 2, label: '', arrow: 'both' },
  { dir: 'v', gc: 3, gr: 4, label: '공개 준비 점검', arrow: 'both' },
];

// 이름 그림 자르기. crop은 화면 좌표(그림 가로를 k로 나눈 값 기준)다.
function Shot({ src, nat, k = 1.3, crop, cap, className = '' }) {
  const dw = nat[0] / k;
  return (
    <figure className={`shot ${className}`}>
      <div className="shot-box" style={{ aspectRatio: `${crop.w} / ${crop.h}` }}>
        <img
          src={IMG(src)}
          alt=""
          style={{ width: `${(dw / crop.w) * 100}%`, left: `${(-crop.x / crop.w) * 100}%`, top: `${(-crop.y / crop.h) * 100}%` }}
        />
      </div>
      {cap ? <figcaption className="cap">{cap}</figcaption> : null}
    </figure>
  );
}

// 구간 머리: 작은 영문 라벨, 두 줄 제목(둘째 줄 파랑), 한두 줄 설명
function Head({ group, label, l1, l2, desc }) {
  return (
    <header className="head">
      <p className="eye">{group ? <b>{group}</b> : null}<span>{label}</span></p>
      <h2 className="h2"><span>{l1}</span><em>{l2}</em></h2>
      {desc ? <p className="desc">{desc}</p> : null}
    </header>
  );
}

function Sec({ id, tone = 'white', children }) {
  return (
    <section id={id} className={`sec ${tone}`} aria-labelledby={`${id}-h`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

function Band({ label, text, tone = 'blue' }) {
  return (
    <section className={`band ${tone}`}>
      <div className="wrap">
        <p className="band-label">{label}</p>
        <p className="band-text">{text}</p>
      </div>
    </section>
  );
}

function Donut({ value, total, title, a, b, insight }) {
  const r = 64;
  const c = 2 * Math.PI * r;
  const pct = (value / total) * 100;
  return (
    <div className="chart">
      <p className="chart-title">{title}</p>
      <svg viewBox="0 0 160 160" className="donut" role="img" aria-label={`${a} ${pct.toFixed(1)}%`}>
        <circle cx="80" cy="80" r={r} fill="none" stroke="#dbe6fd" strokeWidth="22" />
        <circle cx="80" cy="80" r={r} fill="none" stroke="#256ef4" strokeWidth="22" strokeDasharray={`${(c * value) / total} ${c}`} transform="rotate(-90 80 80)" />
        <text x="80" y="88" textAnchor="middle" className="donut-n">{pct.toFixed(1)}%</text>
      </svg>
      <p className="legend"><i className="sw on" />{a}<br /><i className="sw" />{b}</p>
      <p className="insight">{insight}</p>
    </div>
  );
}

function Bars({ title, rows, insight }) {
  return (
    <div className="chart">
      <p className="chart-title">{title}</p>
      <div className="bars">
        {rows.map((r) => (
          <div key={r.l} className="bar-row">
            <p className="bar-l"><span>{r.l}</span><b>{r.v}%</b></p>
            <div className="bar-t"><i style={{ width: `${r.v}%`, background: r.c }} /></div>
          </div>
        ))}
      </div>
      <p className="insight">{insight}</p>
    </div>
  );
}

function Arrow({ dir, arrow }) {
  // 곧은 선 하나. 머리는 양 끝 또는 한쪽 끝에 붙인다.
  if (dir === 'h') {
    return (
      <svg className="ia-line" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
        <line x1={arrow === 'both' ? 8 : 0} y1="6" x2={arrow === 'right' || arrow === 'both' ? 92 : 100} y2="6" />
        {arrow === 'right' || arrow === 'both' ? <path d="M92 1 L100 6 L92 11 Z" /> : null}
        {arrow === 'both' ? <path d="M8 1 L0 6 L8 11 Z" /> : null}
      </svg>
    );
  }
  return (
    <svg className="ia-line v" viewBox="0 0 12 100" preserveAspectRatio="none" aria-hidden="true">
      <line x1="6" y1={arrow === 'up' || arrow === 'both' ? 8 : 0} x2="6" y2={arrow === 'down' || arrow === 'both' ? 92 : 100} />
      {arrow === 'down' || arrow === 'both' ? <path d="M1 92 L6 100 L11 92 Z" /> : null}
      {arrow === 'up' || arrow === 'both' ? <path d="M1 8 L6 0 L11 8 Z" /> : null}
    </svg>
  );
}

// 기능별 구간: 가운데 라벨과 두 줄 제목과 설명 다음에 실제 화면과 수평 콜아웃
function Gui({ id, tone, group, label, l1, l2, desc, children }) {
  return (
    <Sec id={id} tone={tone}>
      <Head group={group} label={label} l1={l1} l2={l2} desc={desc} />
      <div className="gui-body">{children}</div>
    </Sec>
  );
}

export default function App() {
  return (
    <>
      <header className="top" aria-label="머리글">
        <div className="wrap">
          <b className="brand">공공 깃랩 AX 개선</b>
          <a className="top-link" href={LIVE_URL} target="_blank" rel="noreferrer">웹 서비스</a>
        </div>
      </header>

      <main>
        {/* 표지 */}
        <section id="cover" className="cover" aria-labelledby="cover-h">
          <div className="wrap">
            <dl className="cover-meta">
              <div><dt>활동</dt><dd>2026 청년 공공 AX 서포터즈</dd></div>
              <div><dt>서비스</dt><dd>AI 정부 실험실 공공 깃랩</dd></div>
              <div><dt>역할</dt><dd>백엔드 외 전 과정</dd></div>
              <div><dt>자료 기준</dt><dd>2026. 10. 30. 수집본</dd></div>
            </dl>
            <h1 id="cover-h" className="cover-h">공공 깃랩 업무 검색</h1>
            <p className="cover-sub">업무 문장 하나로 다른 기관이 만든 도구를 찾는 공무원용 웹서비스</p>
            <div className="cover-screens">
              <div className="s"><img src={IMG('an_g02.jpg')} width="2012" height="2414" alt="업무 문장으로 도구를 찾는 업무 검색 화면" /></div>
              <div className="s"><img src={IMG('an_a02.jpg')} width="2012" height="3478" alt="근거 표식이 붙은 프로젝트 소개 카드 화면" /></div>
            </div>
          </div>
        </section>

        {/* 개요 */}
        <Sec id="overview" tone="white">
          <div className="overview">
            <Shot src="an_a02.jpg" nat={[2012, 3478]} crop={{ x: 318, y: 128, w: 812, h: 430 }} />
            <div className="ov-text">
              <p className="eye"><span>Overview</span></p>
              <h2 id="overview-h" className="h2 left"><span>다른 기관이 만든 도구를</span><em>업무 문장으로 찾는 공공 깃랩</em></h2>
              <p className="desc left">공공 깃랩에는 정부 기관이 만든 공개 프로젝트가 모여 있음. 도구 이름을 몰라도 하는 일을 문장으로 쓰면 맞는 도구가 올라오고 소개 카드에서 근거를 확인해 고를 수 있도록 목록과 검색과 현황판을 KRDS로 다시 설계.</p>
            </div>
          </div>
        </Sec>

        <Band label="BUT" text="공개 프로젝트 671개 가운데 412개에는 분야 표시가 없어 이름 말고는 고를 단서가 없음" />

        {/* 디자인 과정 */}
        <Sec id="process" tone="soft">
          <Head label="Design Process" l1="시빅해킹으로 찾고" l2="AX와 UX로 고침" />
          <div className="process">
            <div>
              <h3>시빅해킹</h3>
              <ul>
                <li>문제 조사</li>
                <li>공무원과 개발자 여정</li>
              </ul>
            </div>
            <div>
              <h3>AX</h3>
              <ul>
                <li>업무 문장 검색</li>
                <li>AI 소개 카드</li>
                <li>유사 프로젝트</li>
                <li>업무 도우미</li>
                <li>공개 준비 점검</li>
                <li>AI 코딩 도구 연결 안내</li>
              </ul>
            </div>
            <div>
              <h3>UX</h3>
              <ul>
                <li>업무 분야 목록</li>
                <li>현황판</li>
                <li>README 초안과 써 봤어요</li>
              </ul>
            </div>
          </div>
        </Sec>

        {/* 리서치 */}
        <Sec id="research" tone="white">
          <Head group="시빅해킹" label="Research" l1="공개 프로젝트를 직접 집계하고" l2="기존 화면을 열어 봄" />
          <div className="charts">
            <Donut value={412} total={671} title="공개 프로젝트 671개 중" a="분야 표시 없음 412개" b="분야 표시 있음 259개" insight="프로젝트 10개 가운데 6개에 분야 표시가 없음" />
            <Donut value={273} total={671} title="공개 프로젝트 671개 중" a="설명이 빈 프로젝트 273개" b="설명 있음 398개" insight="프로젝트 10개 가운데 4개는 설명 칸이 빔" />
            <Bars
              title="README 695개 중"
              rows={[
                { l: '라이선스가 없는 곳', v: 61.3, c: '#256ef4' },
                { l: '실행 환경을 적은 곳', v: 21.3, c: '#0f2a5c' },
              ]}
              insight="실행 환경을 적은 README는 5개 가운데 1개"
            />
          </div>
          <p className="src center">출처: 공개 프로젝트 직접 집계와 README 전수 분석(2026. 10. 25.)</p>
          <div className="stack">
            <AnnoShot {...ASIS_TABLE} cardW={300} shotMax={760} cap="기존 현황판 프로젝트 표 2026. 11. 7." />
            <AnnoShot {...GITHUB} cardW={300} shotMax={760} />
          </div>
        </Sec>

        {/* 목표 */}
        <Sec id="goal" tone="soft">
          <Head label="Project Goal" l1="업무 문장으로 찾고" l2="근거를 보고 고르는 화면" />
          <div className="cols3">
            <div className="col"><h3>업무 문장 검색</h3><p>도구 이름을 몰라도 하는 일을 문장으로 입력</p></div>
            <div className="col"><h3>근거가 붙은 소개 카드</h3><p>값마다 README 기반과 코드 추정과 정보 부족 표식</p></div>
            <div className="col"><h3>분야 기준 목록과 현황판</h3><p>12개 공통 업무 분야로 묶고 분류 상태를 줄로 표시</p></div>
          </div>
        </Sec>
        <Band tone="navy" label="Goal" text="공무원이 업무 문장 하나로 쓸 만한 도구를 찾고 근거를 확인해 고르는 공공 깃랩" />

        {/* 사용자와 여정 */}
        <Sec id="journey" tone="white">
          <Head group="시빅해킹" label="Users and Journey" l1="공무원과 개발자" l2="두 갈래 여정" desc="비전공 공무원은 업무 문장으로 찾고 개발자는 AI 코딩 도구 안에서 같은 프로젝트를 조회" />
          <Journey />
          <div className="lane dev">
            <h3>개발자</h3>
            <div className="track">
              <span className="rail" aria-hidden="true"><i /></span>
              {DEV.map((s) => (
                <div className="stage-step" key={s.b}>
                  <b>{s.b}</b>
                  <span>{s.s}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="src center">출처: 피그마 블루프린트 공무원 여정과 개발자 여정</p>
        </Sec>

        {/* 전략 */}
        <Sec id="strategy" tone="soft">
          <Head group="UX" label="UX Strategy" l1="찾기 쉽고" l2="믿을 수 있게" />
          <div className="cols4">
            {STRATEGY.map((s) => (
              <div className="col" key={s.b}><h3>{s.b}</h3><p>{s.s}</p></div>
            ))}
          </div>
        </Sec>

        {/* IA */}
        <Sec id="ia" tone="white">
          <Head group="UX" label="IA" l1="화면 여덟 개를" l2="한 지도로 정리" desc="화면마다 주소와 이동 길을 정리" />
          <div className="ia">
            {IA_NODES.map((n) => (
              <div className="ia-node" key={n.c} style={{ gridColumn: n.gc, gridRow: n.gr }}>
                <b>{n.c}</b>
                <strong>{n.n}</strong>
                <span>{[n.r, n.t].filter(Boolean).join(' ')}</span>
              </div>
            ))}
            {IA_EDGES.map((e, i) => (
              <div className={`ia-edge ${e.dir}`} key={i} style={{ gridColumn: e.gc, gridRow: e.gr }}>
                {e.label ? <span>{e.label}</span> : null}
                <Arrow dir={e.dir} arrow={e.arrow} />
              </div>
            ))}
          </div>
          <ul className="ia-list">
            {IA_NODES.map((n) => (
              <li key={n.c}><b>{n.c}</b><strong>{n.n}</strong><span>{[n.r, n.t].filter(Boolean).join(' ')}</span></li>
            ))}
          </ul>
          <p className="src center">출처: 피그마 IA-01 화면 지도</p>
        </Sec>

        {/* 비주얼 시스템 */}
        <Sec id="visual" tone="soft">
          <Head group="UX" label="Visual System" l1="KRDS 색과 서체와" l2="부품으로 구성" />
          <div className="vs-top">
            <div>
              <h3 className="vs-h">Color</h3>
              <div className="swatches">
                {SWATCH.map((s) => (
                  <div className="swatch" key={s.h}>
                    <i style={{ background: s.h }} />
                    <b>{s.n}</b>
                    <span>{s.h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="vs-h">Typography</h3>
              <div className="type">
                <p className="t1">업무 문장으로 찾는 공공 깃랩</p>
                <p className="t2">근거가 붙은 소개 카드</p>
                <p className="t3">README를 읽고 쓰임새와 실행 형태와 이용 조건을 같은 형식으로 정리</p>
                <p className="t4">Pretendard GOV Bold 700 Medium 500 Regular 400 줄 간격 150% 이상</p>
              </div>
            </div>
          </div>
          <h3 className="vs-h">Components</h3>
          <div className="comps">
            <Shot className="wide" src="an_a01.jpg" nat={[2012, 2098]} crop={{ x: 318, y: 246, w: 1169, h: 170 }} cap="검색 입력과 분야 단추" />
            <Shot src="an_a02.jpg" nat={[2012, 3478]} crop={{ x: 318, y: 250, w: 825, h: 150 }} cap="근거 표식 세 종류" />
            <Shot src="an_d01.jpg" nat={[2012, 1889]} crop={{ x: 129, y: 360, w: 623, h: 250 }} cap="분야 확정 비율 막대" />
          </div>
        </Sec>

        {/* GUI 표지 */}
        <section id="gui" className="gui-cover" aria-labelledby="gui-h">
          <div className="wrap gui-cover-in">
            <div>
              <p className="eye on-blue"><span>GUI Design</span></p>
              <h2 id="gui-h" className="gui-title"><span>기능별 화면</span><span>아홉 개</span></h2>
              <p className="gui-sub">화면 요소에서 뻗은 선으로 동작과 값 상태를 설명</p>
            </div>
            <div className="gui-shot"><img src={IMG('an_a01.jpg')} width="2012" height="2098" alt="분야 표시가 붙은 프로젝트 둘러보기 화면" /></div>
          </div>
        </section>

        <Gui id="g-search" tone="white" group="AX" label="Work Search" l1="업무를 문장으로 쓰면" l2="맞는 도구가 위에 올라옴">
          <AnnoShot {...F_SEARCH} cardW={300} shotMax={900} />
        </Gui>
        <Gui id="g-card" tone="soft" group="AX" label="Intro Card" l1="README를 읽어 정리한" l2="근거 붙은 소개 카드" desc="README를 읽고 쓰임새와 실행 형태와 이용 조건을 같은 형식으로 정리">
          <AnnoShot {...F_CARD} cardW={300} shotMax={720} />
          <div className="gap" />
          <AnnoShot {...F_CARD_README} cardW={300} shotMax={720} />
        </Gui>
        <Gui id="g-similar" tone="white" group="AX" label="Similar Projects" l1="새로 만들기 전에" l2="비슷한 도구부터 확인">
          <AnnoShot {...F_SIMILAR} cardW={300} shotMax={900} />
        </Gui>
        <Gui id="g-panel" tone="navy" group="AX" label="Work Helper" l1="어느 화면에서든" l2="업무 도우미 패널" desc="어느 화면에서든 업무를 설명하면 오른쪽 패널에서 추천 도구가 답으로 올라옴">
          <AnnoShot {...F_PANEL} cardW={300} shotMax={900} />
        </Gui>
        <Gui id="g-publish" tone="navy" group="AX" label="Publish Check" l1="공개 전에" l2="아홉 항목 점검" desc="README와 이용 조건 같은 아홉 항목을 충족과 보완 필요와 확인 불가로 점검">
          <AnnoShot {...F_PUBLISH} cardW={300} shotMax={900} />
        </Gui>
        <Gui id="g-mcp" tone="navy" group="AX" label="Connect Guide" l1="개발 도구 안에서" l2="같은 프로젝트 조회" desc="개발 도구 안에서 공개 프로젝트를 검색하고 상세와 유사 프로젝트를 조회하는 설정 안내">
          <AnnoShot {...F_MCP} cardW={300} shotMax={900} />
        </Gui>
        <Gui id="g-field" tone="white" group="UX" label="Field List" l1="기관마다 다른 주제를" l2="12개 업무 분야로 정리" desc="기관마다 다른 주제를 12개 공통 업무 분야로 묶고 프로젝트 하나에 분야는 둘까지">
          <AnnoShot {...F_FIELD} cardW={300} shotMax={900} />
        </Gui>
        <Gui id="g-board" tone="soft" group="UX" label="Dashboard" l1="분야 확정 상태를" l2="한눈에 보는 현황판" desc="분야 확정과 카드 생성 상태를 줄로 나눠 보여 주고 분야 행을 누르면 그 분야 목록이 열림">
          <AnnoShot {...F_BOARD} cardW={300} shotMax={900} />
        </Gui>
        <Gui id="g-draft" tone="white" group="UX" label="Draft and Tried" l1="README 초안과" l2="써 봤어요 기록" desc="공개 전 README 초안 예시와 써 본 기록을 한 화면에서 확인">
          <AnnoShot {...F_DRAFT} cardW={300} shotMax={720} />
        </Gui>

        {/* 역할 */}
        <section id="role" className="role" aria-labelledby="role-h">
          <div className="wrap">
            <header className="head on-dark">
              <p className="eye"><span>My Role</span></p>
              <h2 id="role-h" className="h2"><span>백엔드 외</span><em>전 과정</em></h2>
              <p className="desc">백엔드만 다른 개발자가 맡고 나머지 전 과정은 한 사람이 직접 진행</p>
            </header>
            <div className="lane dev role-lane">
              <div className="track">
                <span className="rail" aria-hidden="true"><i /></span>
                {ROLE.map((s) => (
                  <div className="stage-step" key={s.b}>
                    <b>{s.b}</b>
                    <span>{s.s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 마무리 */}
        <section id="closing" className="closing" aria-labelledby="closing-h">
          <div className="wrap">
            <h2 id="closing-h" className="closing-h">공공 깃랩 업무 검색</h2>
            <p className="closing-sub">2026 청년 공공 AX 서포터즈(행정안전부와 한국지능정보사회진흥원)</p>
            <a className="btn" href={LIVE_URL} target="_blank" rel="noreferrer">웹 서비스</a>
            <p className="closing-src">자료: AI를 활용한 공공서비스 직접개발 결과 보고서와 피그마 [AX.S] Public GitLab Rebuild_DS</p>
            <p className="copy">© 2026 공공 깃랩 AX 개선</p>
          </div>
        </section>
      </main>
    </>
  );
}
