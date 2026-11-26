// 공공 깃랩 AX 개선 케이스 스터디
// 세 장(시빅해킹, AX, UX)을 탭으로 오가고 장 안의 기능도 탭으로 화면을 바꿔 본다. 스크롤 연출은 쓰지 않는다.
import { useEffect, useRef, useState } from 'react';
import AnnoShot from './components/AnnoShot.jsx';
import { F_SEARCH, F_CARD, F_CARD_README, F_FIELD, F_SIMILAR, F_BOARD, F_DRAFT, F_PUBLISH, F_PANEL, F_MCP, ASIS_TABLE, GITHUB } from './annos.js';
import Journey from './components/Journey.jsx';
import LiveFrame, { LIVE_URL } from './components/LiveFrame.jsx';

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

function Block({ title, lead, children }) {
  return (
    <div className="blk">
      <h3 className="t-sub">{title}</h3>
      {lead ? <p className="t-body muted">{lead}</p> : null}
      {children}
    </div>
  );
}

// 장과 장 안의 탭. 내용은 고른 탭만 그린다.
const CHAPTERS = [
  {
    id: 'civic',
    label: '시빅해킹',
    title: '시빅해킹',
    lead: '공무원과 공공 저장소 문제를 시민 개발자 관점에서 직접 조사하고 고침',
    subs: [
      {
        id: 'research',
        label: '문제 조사',
        view: () => (
          <Block
            title="이름만 보이는 프로젝트 목록"
            lead={null}
          >
            <p className="t-body muted facts">
              공개 프로젝트 671개 가운데 분야 표시가 없는 프로젝트 412개와 설명이 빈 프로젝트 273개<br />
              분야 필터 35개에 시험용 값이 섞이고 검색어를 바꿔도 주소가 그대로<br />
              README 695개 가운데 실행 환경을 적은 곳은 21.3%이고 라이선스가 없는 곳은 61.3%
            </p>
            <p className="src">출처: 공개 프로젝트 직접 집계와 README 전수 분석(2026. 10. 25.)과 현황판 직접 확인(2026. 10. 2.)</p>
            <div className="asis-stack">
              <AnnoShot {...ASIS_TABLE} cardW={300} shotMax={760} cap="기존 현황판 프로젝트 표 2026. 11. 7." />
              <AnnoShot {...GITHUB} cardW={300} />
            </div>
          </Block>
        ),
      },
      {
        id: 'journey',
        label: '여정',
        view: () => (
          <Block title="여정을 공무원과 개발자 둘로 나눠 그림" lead="비전공 공무원은 업무 문장으로 찾고 개발자는 AI 코딩 도구 안에서 같은 프로젝트를 조회">
            <Journey />
            <div className="lane dev">
              <h3 className="t-sub">개발자</h3>
              <div className="track">
                <span className="rail" aria-hidden="true"><i /></span>
                {DEV.map((s) => (
                  <div className="stage-step" key={s.b}>
                    <b>{s.b}</b>
                    <span className="t-body">{s.s}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="src">출처: 피그마 블루프린트 공무원 여정과 개발자 여정</p>
          </Block>
        ),
      },
    ],
  },
  {
    id: 'ax',
    label: 'AX',
    title: 'AX',
    lead: 'AI로 업무 문장 검색과 소개 카드와 공개 준비 점검',
    subs: [
      { id: 'search', label: '업무 문장 검색', view: () => (<Block title="업무 문장 검색" lead="찾으려는 업무를 문장으로 쓰면 맞는 도구가 위에 올라옴"><AnnoShot {...F_SEARCH} /></Block>) },
      { id: 'card', label: 'AI 소개 카드', view: () => (<Block title="AI 소개 카드" lead="README를 읽고 쓰임새와 실행 형태와 이용 조건을 같은 형식으로 정리"><AnnoShot {...F_CARD} /><div className="an-next"><AnnoShot {...F_CARD_README} /></div></Block>) },
      { id: 'similar', label: '유사 프로젝트', view: () => (<Block title="유사 프로젝트" lead="새로 만들기 전에 비슷한 도구를 먼저 보여 주는 안내"><AnnoShot {...F_SIMILAR} /></Block>) },
      { id: 'panel', label: '업무 도우미', view: () => (<Block title="업무 도우미 패널" lead="어느 화면에서든 업무를 설명하면 오른쪽 패널에서 추천 도구가 답으로 올라옴"><AnnoShot {...F_PANEL} /></Block>) },
      { id: 'publish', label: '공개 준비 점검', view: () => (<Block title="공개 준비 점검" lead="README와 이용 조건 같은 아홉 항목을 충족과 보완 필요와 확인 불가로 점검"><AnnoShot {...F_PUBLISH} /></Block>) },
      { id: 'mcp', label: '연결 안내', view: () => (<Block title="AI 코딩 도구 연결 안내" lead="개발 도구 안에서 공개 프로젝트를 검색하고 상세와 유사 프로젝트를 조회하는 설정 안내"><AnnoShot {...F_MCP} /></Block>) },
    ],
  },
  {
    id: 'ux',
    label: 'UX',
    title: 'UX',
    lead: '목록과 현황판을 다시 설계하고 KRDS 적용',
    subs: [
      { id: 'field', label: '업무 분야 목록', view: () => (<Block title="업무 분야 분류" lead="기관마다 다른 주제를 12개 공통 업무 분야로 묶고 프로젝트 하나에 분야는 둘까지"><AnnoShot {...F_FIELD} /></Block>) },
      { id: 'board', label: '현황판', view: () => (<Block title="현황판" lead="분야 확정과 카드 생성 상태를 줄로 나눠 보여 주고 분야 행을 누르면 그 분야 목록이 열림"><AnnoShot {...F_BOARD} /></Block>) },
      { id: 'draft', label: '초안과 써 봤어요', view: () => (<Block title="README 초안과 써 봤어요" lead="공개 전 README 초안 예시와 써 본 기록을 한 화면에서 확인"><AnnoShot {...F_DRAFT} /></Block>) },
    ],
  },
];

function readHash() {
  const h = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
  return CHAPTERS.some((c) => c.id === h) ? h : 'civic';
}

export default function App() {
  const [ch, setCh] = useState(readHash);
  const [subs, setSubs] = useState({ civic: 'research', ax: 'search', ux: 'field' });
  const areaRef = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const onHash = () => setCh(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const pickChapter = (id) => {
    setCh(id);
    window.history.replaceState(null, '', `#${id}`);
    const el = areaRef.current;
    if (el) {
      const head = document.querySelector('.top')?.offsetHeight || 56;
      window.scrollTo(0, Math.max(0, el.getBoundingClientRect().top + window.scrollY - head - 8));
    }
  };

  const cur = CHAPTERS.find((c) => c.id === ch);
  const subId = subs[ch];
  const sub = cur.subs.find((s) => s.id === subId) || cur.subs[0];

  return (
    <>
      <header className="top" aria-label="머리글">
        <div className="wrap">
          <b className="brand">공공 깃랩 AX 개선</b>
          <nav className="chtabs" role="tablist" aria-label="장">
            {CHAPTERS.map((c) => (
              <button key={c.id} type="button" role="tab" id={`tab-${c.id}`} aria-selected={c.id === ch} aria-controls="chapter-panel" className="tab-btn" onClick={() => pickChapter(c.id)}>
                {c.label}
              </button>
            ))}
          </nav>
          <a className="top-link" href={LIVE_URL} target="_blank" rel="noreferrer">웹 서비스</a>
        </div>
      </header>

      <main>
        {/* 표지 */}
        <section id="cover" className="cover" aria-labelledby="cover-h">
          <div className="wrap">
            <div className="cover-panel">
              <div className="cover-text">
                <h1 id="cover-h" className="t-cover">공공 깃랩 업무 검색</h1>
                <p className="cover-sub">업무 문장 하나로 다른 기관이 만든 도구를 찾는 공무원용 웹서비스</p>
                <dl className="cover-meta">
                  <div><dt>활동</dt><dd>2026 청년 공공 AX 서포터즈</dd></div>
                  <div><dt>서비스</dt><dd>AI 정부 실험실 공공 깃랩</dd></div>
                  <div><dt>역할</dt><dd>백엔드 외 전 과정</dd></div>
                  <div><dt>자료 기준</dt><dd>2026. 10. 30. 수집본</dd></div>
                </dl>
                <a className="btn" href={LIVE_URL} target="_blank" rel="noreferrer">웹 서비스</a>
              </div>
              <div className="cover-shot">
                <img src={`${import.meta.env.BASE_URL}img/an_g02.jpg`} width="2012" height="2414" alt="업무 문장으로 도구를 찾는 업무 검색 화면" />
              </div>
            </div>
          </div>
        </section>

        {/* 세 장 */}
        <section className="chapters" aria-labelledby="chapter-h" ref={areaRef}>
          <div className="wrap">
            <div className="chapter-tabs" role="tablist" aria-label="장 선택">
              {CHAPTERS.map((c) => (
                <button key={c.id} type="button" role="tab" aria-selected={c.id === ch} aria-controls="chapter-panel" className="chapter-card" onClick={() => pickChapter(c.id)}>
                  <b>{c.label}</b>
                  <span>{c.lead}</span>
                </button>
              ))}
            </div>
            <div id="chapter-panel" role="tabpanel" aria-labelledby={`tab-${ch}`} className="chapter-panel">
              <h2 id="chapter-h" className="sr">{cur.title}</h2>
              <div className="subtabs" role="tablist" aria-label={`${cur.label} 안의 화면`}>
                {cur.subs.map((s) => (
                  <button key={s.id} type="button" role="tab" aria-selected={s.id === sub.id} className="sub-btn" onClick={() => setSubs((v) => ({ ...v, [ch]: s.id }))}>
                    {s.label}
                  </button>
                ))}
              </div>
              <div key={`${ch}-${sub.id}`}>{sub.view()}</div>
            </div>
          </div>
        </section>

        {/* 직접 써 보기 */}
        <section className="live" aria-labelledby="live-h">
          <div className="wrap">
            <div className="top-row">
              <div className="d-head">
                <h2 id="live-h" className="t-title">직접 눌러 보는 배포 화면</h2>
                <p className="t-body muted">2026. 10. 30. 저장 자료로 열리는 실제 서비스</p>
              </div>
              <a className="btn" href={LIVE_URL} target="_blank" rel="noreferrer">웹 서비스</a>
            </div>
            <LiveFrame />
          </div>
        </section>

        {/* 역할과 크레딧 */}
        <section className="end" aria-labelledby="end-h">
          <div className="wrap">
            <h2 id="end-h" className="t-title">백엔드 외 전 과정</h2>
            <p className="closing t-body">백엔드만 다른 개발자가 맡고 나머지 전 과정은 한 사람이 직접 진행</p>
            <div className="lane dev role-lane">
              <div className="track">
                <span className="rail" aria-hidden="true"><i /></span>
                {ROLE.map((s) => (
                  <div className="stage-step" key={s.b}>
                    <b>{s.b}</b>
                    <span className="t-body">{s.s}</span>
                  </div>
                ))}
              </div>
            </div>
            <dl className="credit">
              <dt>활동</dt>
              <dd>2026 청년 공공 AX 서포터즈(행정안전부와 한국지능정보사회진흥원)</dd>
              <dt>자료</dt>
              <dd>AI를 활용한 공공서비스 직접개발 결과 보고서와 피그마 [AX.S] Public GitLab Rebuild_DS</dd>
            </dl>
            <p className="copy">© 2026 공공 깃랩 AX 개선</p>
          </div>
        </section>
      </main>
    </>
  );
}
