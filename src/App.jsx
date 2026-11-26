// 공공 깃랩 AX 개선 케이스 스터디
// 배정 사례: 플러스엑스 SKT Sphere(WFA 업무 플랫폼). 섹션 순서와 연출 값은 측정.md에 적었다.
import { useEffect } from 'react';
import { Pic, Shot } from './components/parts.jsx';
import AnnoShot from './components/AnnoShot.jsx';
import { F_SEARCH, F_CARD, F_CARD_README, F_FIELD, F_SIMILAR, F_BOARD, F_DRAFT, F_PUBLISH, F_PANEL, F_MCP, ASIS_FILTER, ASIS_TABLE, GITHUB } from './annos.js';
import Journey from './components/Journey.jsx';
import EvidenceCard from './components/EvidenceCard.jsx';
import SearchDemo from './components/SearchDemo.jsx';
import Widths from './components/Widths.jsx';
import Wipe from './components/Wipe.jsx';
import LiveFrame, { LIVE_URL } from './components/LiveFrame.jsx';
import FieldFilter from './components/FieldFilter.jsx';
import SimilarTools from './components/SimilarTools.jsx';
import StatusBanner from './components/StatusBanner.jsx';


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
          <h2 id={`${id}-h`} className="t-title">{title}<span className="num">{no}</span></h2>
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
          <a href={LIVE_URL} target="_blank" rel="noreferrer">배포 화면 새 창으로 열기</a>
        </div>
      </header>

      <main>
        {/* 1 표지: 제목과 한 줄 설명, 프로젝트 정보 */}
        <section id="cover" className="cover" aria-labelledby="cover-h">
          <div className="wrap cover-in">
            <h1 id="cover-h" className="t-cover">공공 깃랩 업무 검색</h1>
            <p className="cover-sub t-lead">업무 문장 하나로 다른 기관이 만든 도구를 찾는 공무원용 웹서비스</p>
            <dl className="cover-meta">
              <div><dt>활동</dt><dd>2026 청년 공공 AX 서포터즈(행정안전부와 한국지능정보사회진흥원)</dd></div>
              <div><dt>서비스</dt><dd>AI 정부 실험실 공공 깃랩</dd></div>
              <div><dt>범위</dt><dd>UX 재설계와 범정부 디자인 시스템(KRDS) 적용</dd></div>
              <div><dt>자료 기준</dt><dd>2026. 10. 30. 수집본</dd></div>
            </dl>
          </div>
        </section>

        {/* 2 소개 */}
        <section className="intro" aria-labelledby="intro-h">
          <div className="wrap fx-up">
            <h2 id="intro-h" className="t-display">공공 깃랩<span className="num">KRDS</span></h2>
            <div className="t-body muted">
              <p>여비 담당자가 출장비 계산을 입력하면 관련 프로젝트가 먼저 나오는 화면</p>
              <p>소개 카드에서 용도와 실행 형태를 보고 README 원문에서 설치 방법 확인</p>
              <p>범정부 디자인 시스템(KRDS)으로 다시 설계한 목록과 현황판</p>
            </div>
          </div>
        </section>

        {/* 4 문제 */}
        <section className="problem" aria-labelledby="problem-h">
          <div className="wrap head fx-up">
            <h2 id="problem-h" className="t-title">이름만 보이는 프로젝트 목록</h2>
            <p className="t-body muted">2026. 10. 25. 기준 공개 프로젝트 671개 가운데 분야 표시 없음 412개와 설명이 빈 프로젝트 273개. 엑셀 도구는 23개 계정에서 따로 개발</p>
            <p className="src">출처: 공개 프로젝트 671개 직접 집계(2026. 10. 25.)</p>
          </div>
          <div className="scene">
            <div className="frame">
              <div className="fx-big"><Shot name="c_asis_cards" alt="기존 현황판 최근 활동 프로젝트 카드" /></div>
              <span className="cap t-cap">기존 현황판 최근 활동 프로젝트 2026. 11. 7.</span>
            </div>
          </div>
        </section>

        {/* 5 조사: As-Is 주석 */}
        <section className="research" aria-labelledby="research-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="research-h" className="t-title">GitHub와 같은 질문으로 나란히 비교</h2>
              <p className="t-body muted">같은 도구를 두 화면에서 찾으며 막히는 지점을 화면 위에 표시</p>
            </div>
            <div className="asis-stack">
              <div className="fx-up"><AnnoShot {...ASIS_FILTER} cardW={300} shotMax={360} /></div>
              <div className="fx-up"><AnnoShot {...ASIS_TABLE} cardW={300} shotMax={760} cap="기존 현황판 프로젝트 표 2026. 11. 7." /></div>
            </div>
            <div className="gh fx-up">
              <p className="addr t-cap">github.com/search?q=출장비&amp;type=repositories</p>
              <AnnoShot {...GITHUB} cardW={300} />
            </div>
            <div className="readme fx-up">
              <h3 className="t-sub">README 전수 분석</h3>
              <p className="t-body muted">공개 프로젝트 695개의 README 전부 확인. 실행 환경을 적은 곳은 21.3%이고 라이선스가 없는 곳은 61.3%</p>
              <p className="src">출처: 공개 프로젝트 README 전수 분석(2026. 10. 25.)과 현황판 직접 확인(2026. 10. 2.)</p>
            </div>
          </div>
        </section>

        {/* 6 여정 */}
        <section className="journey" aria-labelledby="journey-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="journey-h" className="t-title">여정을 공무원과 개발자 둘로 나눠 그림</h2>
              <p className="t-body muted">비전공 공무원은 업무 문장으로 찾고 개발자는 AI 코딩 도구 안에서 같은 프로젝트를 조회</p>
            </div>
            <div className="fx-up"><Journey /></div>
            <div className="lane dev">
              <h3 className="t-sub">개발자</h3>
              <p className="t-body muted lane-lead">AI 코딩 도구 안에서 같은 프로젝트를 조회하고 재사용과 신규 개발 중 선택</p>
              <div className="track fx-group">
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

        {/* 기존 화면과 다시 설계한 화면 비교 */}
        <section className="split" aria-labelledby="split-h">
          <div className="wrap">
            <div className="d-head">
              <h2 id="split-h" className="t-title">기존 현황판과 다시 설계한 목록</h2>
              <p className="t-body muted">왼쪽 기존 공공 깃랩 현황판과 오른쪽 다시 설계한 프로젝트 둘러보기</p>
            </div>
            <div className="split-grid">
              <figure>
                <div className="shot"><Pic name="c_asis_side" alt="기존 현황판 왼쪽 필터" /></div>
                <figcaption className="cap t-cap">As-Is 기존 현황판 2026. 11. 7.</figcaption>
              </figure>
              <figure>
                <div className="shot"><Pic name="c_a01_rows4" alt="다시 설계한 프로젝트 목록" /></div>
                <figcaption className="cap t-cap">To-Be 다시 설계한 프로젝트 둘러보기</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 기능 1 업무 문장 검색 */}
        <Feature id="f1" no="1" title="업무 문장 검색" lead="찾으려는 업무를 문장으로 쓰면 맞는 도구가 위에 올라옴">
          <div className="fx-up"><AnnoShot {...F_SEARCH} /></div>
          <div className="demo-wide fx-up">
            <SearchDemo />
            <p className="note t-cap">예시 질문 단추로 결과 바꿈</p>
          </div>
        </Feature>

        {/* 기능 2 AI 소개 카드 */}
        <Feature id="f2" no="2" title="AI 소개 카드" lead="README를 읽고 쓰임새와 실행 형태와 이용 조건을 같은 형식으로 정리" tone="gray">
          <div className="fx-up"><AnnoShot {...F_CARD} /></div>
          <div className="fx-up an-next"><AnnoShot {...F_CARD_README} /></div>
          <div className="demo-wide demo-narrow fx-up">
            <EvidenceCard />
            <p className="note t-cap">근거 줄 단추를 누르면 README 원문의 그 줄이 밝아짐</p>
          </div>
        </Feature>

        {/* 기능 3 업무 분야 분류 */}
        <Feature id="f3" no="3" title="업무 분야 분류" lead="기관마다 다른 주제를 12개 공통 업무 분야로 묶고 프로젝트 하나에 분야는 둘까지">
          <div className="fx-up"><AnnoShot {...F_FIELD} /></div>
          <div className="demo-wide fx-up">
            <FieldFilter />
            <p className="note t-cap">분야를 누르면 그 분야 도구만 남음</p>
          </div>
        </Feature>

        {/* 기능 4 유사 프로젝트 */}
        <Feature id="f4" no="4" title="유사 프로젝트" lead="새로 만들기 전에 비슷한 도구를 먼저 보여 주는 안내" tone="gray">
          <div className="fx-up"><AnnoShot {...F_SIMILAR} /></div>
          <div className="demo-wide fx-up">
            <SimilarTools />
            <p className="note t-cap">후보마다 겹치는 점과 차이 한 줄</p>
          </div>
        </Feature>

        {/* 기능 5 현황판 */}
        <Feature id="f5" no="5" title="현황판" lead="분야 확정과 카드 생성 상태를 줄로 나눠 보여 주고 분야 행을 누르면 그 분야 목록이 열림">
          <div className="fx-up"><AnnoShot {...F_BOARD} /></div>
        </Feature>

        {/* 기능 6 README 초안, 써 봤어요 */}
        <Feature id="f6" no="6" title="README 초안과 써 봤어요" lead="공개 전 README 초안 예시와 써 본 기록을 한 화면에서 확인" tone="gray">
          <div className="fx-up"><AnnoShot {...F_DRAFT} /></div>
        </Feature>

        {/* 점검 중 안내 */}
        <section className="status-sec" aria-labelledby="status-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="status-h" className="t-title">점검 중에도 열리는 목록<span className="num">7</span></h2>
              <p className="t-body muted">공공 깃랩이 점검에 들어가면 저장 자료로 목록을 보여 주고 머리 띠에 자료 시점을 적음</p>
            </div>
            <div className="demo-wide fx-up">
              <StatusBanner />
              <p className="note t-cap">점검 중 안내 띠와 저장 자료 목록</p>
            </div>
          </div>
        </section>

        {/* 화면 폭 */}
        <section className="d3" aria-labelledby="d3-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="d3-h" className="t-title">화면 폭 다섯 단계<span className="num">8</span></h2>
              <p className="t-body muted">360부터 1,920px까지 메뉴와 본문 배치를 정했고 단추로 폭을 바꿔 확인</p>
            </div>
            <div className="fx-up"><Widths /></div>
            <div className="grid2">
              <div className="fx-up">
                <h3 className="t-lead">좁은 화면 메뉴</h3>
                <p className="t-body muted">360px에서 왼쪽 메뉴는 서랍으로 접히고 검색칸은 두 줄로 나뉨</p>
              </div>
              <div className="phones fx-up">
                <Shot name="deploy_360" alt="360px 폭 배포 화면" />
                <Shot name="deploy_768" alt="768px 폭 배포 화면" />
              </div>
            </div>
          </div>
        </section>

        {/* 어두운 화면과 부가 화면 */}
        <section className="elements dark" aria-labelledby="elements-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="elements-h" className="t-title">어두운 화면에서 본 부가 기능</h2>
              <p className="t-body">KRDS에 없는 어두운 화면은 결정 기록으로 남김. 바탕은 #131416이고 본문 대비는 16.89:1</p>
            </div>
            <div className="dark-feat fx-up">
              <h3 className="t-sub">공개 준비 점검<span className="num">9</span></h3>
              <p className="t-body muted">README와 이용 조건 같은 아홉 항목을 충족과 보완 필요와 확인 불가로 점검</p>
              <AnnoShot {...F_PUBLISH} />
            </div>
            <div className="dark-feat fx-up">
              <h3 className="t-sub">업무 도우미 패널<span className="num">10</span></h3>
              <p className="t-body muted">어느 화면에서든 업무를 설명하면 오른쪽 패널에서 추천 도구가 답으로 올라옴</p>
              <AnnoShot {...F_PANEL} />
            </div>
            <div className="dark-feat fx-up">
              <h3 className="t-sub">AI 코딩 도구 연결 안내<span className="num">11</span></h3>
              <p className="t-body muted">개발 도구 안에서 공개 프로젝트를 검색하고 상세와 유사 프로젝트를 조회하는 설정 안내</p>
              <AnnoShot {...F_MCP} />
            </div>
            <figure className="decnote fx-up">
              <Shot name="c_dec" alt="피그마 결정 기록 D-01 어두운 화면" pan />
              <figcaption className="cap t-cap">피그마 결정 기록 D-01</figcaption>
            </figure>
            <div className="d-head fx-up wipe-head">
              <h3 className="t-sub">밝은 화면과 어두운 화면</h3>
              <p className="t-body">같은 배치의 두 화면을 좌우로 끌어 비교</p>
            </div>
            <Wipe />
          </div>
        </section>

        {/* 디자이너가 한 일 */}
        <section className="role-sec" aria-labelledby="role-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="role-h" className="t-title">디자이너가 한 일</h2>
              <p className="t-body muted">피그마에서 KRDS 부품으로 화면을 짓고 코드 검토까지 맡음</p>
            </div>
            <div className="lane dev role-lane">
              <div className="track fx-group">
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
            <div className="next fx-up">
              <h3 className="t-sub">다음 단계</h3>
              <p className="t-body muted">실제 업무 표현 20개로 상위 다섯 후보 비교<br />출장비 계산과 여비 정산처럼 다른 말을 같은 도구로 연결<br />분야별 표본 50건 원문 대조<br />원본 문서가 바뀐 카드부터 재작성</p>
            </div>
          </div>
        </section>

        {/* 직접 써 보기 */}
        <section className="live" aria-labelledby="live-h">
          <div className="wrap">
            <div className="top-row fx-up">
              <div className="d-head">
                <h2 id="live-h" className="t-title">직접 눌러 보는 배포 화면</h2>
                <p className="t-body muted">2026. 10. 30. 저장 자료로 열리는 실제 서비스</p>
              </div>
              <a className="t-body" href={LIVE_URL} target="_blank" rel="noreferrer">새 창으로 열기</a>
            </div>
            <LiveFrame />
          </div>
        </section>

        {/* 결과와 크레딧 */}
        <section className="end" aria-labelledby="end-h">
          <div className="wrap">
            <p className="closing t-closing fx-up">2026. 10. 30. 수집본 728건 가운데 172건을 AI 요약과 근거 줄로 정리<br />기관마다 다른 주제는 12개 업무 분야로 분류</p>
            <div className="end-grid fx-up">
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
