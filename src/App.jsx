// 공공 깃랩 AX 개선 케이스 스터디
// 배정 사례: 플러스엑스 SKT Sphere(WFA 업무 플랫폼). 섹션 순서와 연출 값은 측정.md에 적었다.
import { useEffect } from 'react';
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
  { b: '목록과 카드', s: 'KRDS로 배치 설계' },
  { b: '반응형', s: '화면 크기별 메뉴와 본문 규칙' },
  { b: '근거 표시', s: '카드 한 줄마다 출처 표식' },
  { b: '현황판', s: '분야별 지표 화면' },
  { b: '코드 검토', s: '공통 문구와 부품 정리' },
];

// 스크롤 연출은 쓰지 않는다. 새로고침과 이동 때 맨 위에서 시작한다.
function useTop() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);
}

function Feature({ id, no, title, lead, tone = '', children }) {
  return (
    <section className={`feat ${tone}`} aria-labelledby={`${id}-h`}>
      <div className="wrap">
        <div className="d-head fx-up">
          <h2 id={`${id}-h`} className="t-title">{title}</h2>
          <p className="t-body muted">{lead}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function App() {
  useTop();
  return (
    <>
      <header className="top" aria-label="머리글">
        <div className="wrap">
          <b>공공 깃랩 AX 개선</b>
          <a href={LIVE_URL} target="_blank" rel="noreferrer">웹 서비스</a>
        </div>
      </header>

      <main>
        {/* 1 표지: 제목과 한 줄 설명, 프로젝트 정보, 실제 서비스 화면 */}
        <section id="cover" className="cover" aria-labelledby="cover-h">
          <div className="wrap">
            <div className="cover-panel">
              <div className="cover-text">
                <h1 id="cover-h" className="t-cover">공공 깃랩 업무 검색</h1>
                <p className="cover-sub">업무 문장 하나로 다른 기관이 만든 도구를 찾는 공무원용 웹서비스</p>
                <dl className="cover-meta">
                  <div><dt>활동</dt><dd>2026 청년 공공 AX 서포터즈</dd></div>
                  <div><dt>서비스</dt><dd>AI 정부 실험실 공공 깃랩</dd></div>
                  <div><dt>범위</dt><dd>UX 재설계와 범정부 디자인 시스템 적용</dd></div>
                  <div><dt>자료 기준</dt><dd>2026. 10. 30. 수집본</dd></div>
                </dl>
                <a className="btn" href={LIVE_URL} target="_blank" rel="noreferrer">웹 서비스</a>
              </div>
              <div className="cover-shot" aria-hidden="false">
                <img src={`${import.meta.env.BASE_URL}img/an_g02.jpg`} width="2012" height="2414" alt="업무 문장으로 도구를 찾는 업무 검색 화면" />
              </div>
            </div>
          </div>
        </section>

        {/* 2 문제와 조사 */}
        <section className="research" aria-labelledby="research-h">
          <div className="wrap">
            <div className="d-head">
              <h2 id="research-h" className="t-title">이름만 보이는 프로젝트 목록</h2>
              <p className="t-body muted">공개 프로젝트 671개 가운데 분야 표시가 없는 프로젝트 412개와 설명이 빈 프로젝트 273개<br />분야 필터 35개에 시험용 값이 섞이고 검색어를 바꿔도 주소가 그대로<br />README 695개 가운데 실행 환경을 적은 곳은 21.3%이고 라이선스가 없는 곳은 61.3%</p>
              <p className="src">출처: 공개 프로젝트 직접 집계와 README 전수 분석(2026. 10. 25.)과 현황판 직접 확인(2026. 10. 2.)</p>
            </div>
            <div className="asis-stack">
              <AnnoShot {...ASIS_TABLE} cardW={300} shotMax={760} cap="기존 현황판 프로젝트 표 2026. 11. 7." />
              <AnnoShot {...GITHUB} cardW={300} />
            </div>
          </div>
        </section>

        {/* 3 여정 */}
        <section className="journey" aria-labelledby="journey-h">
          <div className="wrap">
            <div className="d-head">
              <h2 id="journey-h" className="t-title">여정을 공무원과 개발자 둘로 나눠 그림</h2>
              <p className="t-body muted">비전공 공무원은 업무 문장으로 찾고 개발자는 AI 코딩 도구 안에서 같은 프로젝트를 조회</p>
            </div>
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
          </div>
        </section>

        <Feature id="f1" no="1" title="업무 문장 검색" lead="찾으려는 업무를 문장으로 쓰면 맞는 도구가 위에 올라옴">
          <AnnoShot {...F_SEARCH} />
        </Feature>

        <Feature id="f2" no="2" title="AI 소개 카드" lead="README를 읽고 쓰임새와 실행 형태와 이용 조건을 같은 형식으로 정리" tone="tint">
          <AnnoShot {...F_CARD} />
          <div className="an-next"><AnnoShot {...F_CARD_README} /></div>
        </Feature>

        <Feature id="f3" no="3" title="업무 분야 분류" lead="기관마다 다른 주제를 12개 공통 업무 분야로 묶고 프로젝트 하나에 분야는 둘까지">
          <AnnoShot {...F_FIELD} />
        </Feature>

        <Feature id="f4" no="4" title="유사 프로젝트" lead="새로 만들기 전에 비슷한 도구를 먼저 보여 주는 안내" tone="tint">
          <AnnoShot {...F_SIMILAR} />
        </Feature>

        <Feature id="f5" no="5" title="현황판" lead="분야 확정과 카드 생성 상태를 줄로 나눠 보여 주고 분야 행을 누르면 그 분야 목록이 열림">
          <AnnoShot {...F_BOARD} />
        </Feature>

        <Feature id="f6" no="6" title="README 초안과 써 봤어요" lead="공개 전 README 초안 예시와 써 본 기록을 한 화면에서 확인" tone="tint">
          <AnnoShot {...F_DRAFT} />
        </Feature>

        {/* 어두운 화면의 부가 기능 */}
        <section className="elements dark" aria-labelledby="elements-h">
          <div className="wrap">
            <div className="d-head">
              <h2 id="elements-h" className="t-title">어두운 화면에서 본 부가 기능</h2>
              <p className="t-body">KRDS에 없는 어두운 화면은 결정 기록으로 남김. 바탕은 #131416이고 본문 대비는 16.89:1</p>
            </div>
            <div className="dark-feat">
              <h3 className="t-sub">공개 준비 점검</h3>
              <p className="t-body muted">README와 이용 조건 같은 아홉 항목을 충족과 보완 필요와 확인 불가로 점검</p>
              <AnnoShot {...F_PUBLISH} />
            </div>
            <div className="dark-feat">
              <h3 className="t-sub">업무 도우미 패널</h3>
              <p className="t-body muted">어느 화면에서든 업무를 설명하면 오른쪽 패널에서 추천 도구가 답으로 올라옴</p>
              <AnnoShot {...F_PANEL} />
            </div>
            <div className="dark-feat">
              <h3 className="t-sub">AI 코딩 도구 연결 안내</h3>
              <p className="t-body muted">개발 도구 안에서 공개 프로젝트를 검색하고 상세와 유사 프로젝트를 조회하는 설정 안내</p>
              <AnnoShot {...F_MCP} />
            </div>
          </div>
        </section>

        {/* 디자이너가 한 일 */}
        <section className="role-sec" aria-labelledby="role-h">
          <div className="wrap">
            <div className="d-head">
              <h2 id="role-h" className="t-title">디자이너가 한 일</h2>
              <p className="t-body muted">피그마에서 KRDS 부품으로 화면을 짓고 코드 검토까지 맡음</p>
            </div>
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
            <p className="src">출처: AI를 활용한 공공서비스 직접개발 결과 보고서 역할 분담</p>
            <div className="next">
              <h3 className="t-sub">다음 단계</h3>
              <p className="t-body muted">실제 업무 표현 20개로 상위 다섯 후보 비교<br />출장비 계산과 여비 정산처럼 다른 말을 같은 도구로 연결<br />분야별 표본 50건 원문 대조<br />원본 문서가 바뀐 카드부터 재작성</p>
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

        {/* 결과와 크레딧 */}
        <section className="end" aria-labelledby="end-h">
          <div className="wrap">
            <p className="closing t-closing">2026. 10. 30. 수집본 728건 가운데 172건을 AI 요약과 근거 줄로 정리<br />기관마다 다른 주제는 12개 업무 분야로 분류</p>
            <div className="end-grid">
              <h2 id="end-h" className="t-sub">공공 깃랩 KRDS 재설계</h2>
              <dl className="credit">
                <dt>활동</dt>
                <dd>2026 청년 공공 AX 서포터즈(행정안전부와 한국지능정보사회진흥원)</dd>
                <dt>자료</dt>
                <dd>AI를 활용한 공공서비스 직접개발 결과 보고서와 피그마 [AX.S] Public GitLab Rebuild_DS</dd>
              </dl>
            </div>
            <p className="copy">© 2026 공공 깃랩 AX 개선</p>
          </div>
        </section>
      </main>
    </>
  );
}
