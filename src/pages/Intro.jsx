import { useState } from 'react';
import AnnoShot from '../components/AnnoShot.jsx';
import Journey from '../components/Journey.jsx';
import { F_SEARCH, F_CARD, F_CARD_README, F_FIELD, F_SIMILAR, F_BOARD, F_DRAFT, F_PUBLISH, F_PANEL, F_MCP, ASIS_TABLE, GITHUB } from '../annos.js';
import { TABS, DEV, ROLE, STRATEGY, SWATCH, STEPS, FAQ, IA_NODES, IA_EDGES } from '../data.js';
import { Shot, Badge, Tabs, Steps, Accordion, Donut, Bars, IaMap } from '../ui.jsx';

const goto = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 16);
};

function Section({ id, title, lead, children }) {
  return (
    <section id={id} className="cs-block" aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`} className="cs-h3">{title}</h3>
      {lead ? <p className="cs-lead">{lead}</p> : null}
      {children}
    </section>
  );
}

/* ---------- 추진 배경 ---------- */
function Background() {
  return (
    <>
      <Section id="b-research" title="공개 프로젝트 직접 집계" lead="공공 GitLab에는 공개 프로젝트가 있지만 이름만으로는 어떤 업무에 쓰는지 알기 어려움. 그래서 프로젝트와 README를 직접 집계했음.">
        <div className="cs-charts">
          <Donut value={412} total={671} title="공개 프로젝트 671개 중" a="분야 표시 없음 412개" b="분야 표시 있음 259개" insight="프로젝트 10개 가운데 6개에 분야 표시가 없음" />
          <Donut value={273} total={671} title="공개 프로젝트 671개 중" a="설명이 빈 프로젝트 273개" b="설명 있음 398개" insight="프로젝트 10개 가운데 4개는 설명 칸이 빔" />
          <Bars title="README 695개 중" rows={[{ l: '라이선스가 없는 곳', v: 61.3, c: '#256ef4' }, { l: '실행 환경을 적은 곳', v: 21.3, c: '#0f2a5c' }]} insight="실행 환경을 적은 README는 5개 가운데 1개" />
        </div>
        <p className="cs-src">출처: 공개 프로젝트 직접 집계와 README 전수 분석(2026. 10. 25.)</p>
      </Section>

      <Section id="b-table" title="현황 진단 표">
        <div className="krds-table-wrap">
          <table className="tbl col data cs-diag">
            <caption>공공 깃랩 기존 화면의 현황 진단 항목과 내용</caption>
            <colgroup><col style={{ width: '22%' }} /><col /><col style={{ width: '26%' }} /></colgroup>
            <thead><tr><th scope="col">구분</th><th scope="col">현황</th><th scope="col">기준</th></tr></thead>
            <tbody>
              <tr><th scope="row">분야 표시</th><td>공개 프로젝트 671개 가운데 412개에 없음(61.4%)</td><td>직접 집계 2026. 10. 25.</td></tr>
              <tr><th scope="row">설명 칸</th><td>공개 프로젝트 671개 가운데 273개가 빔(40.7%)</td><td>직접 집계 2026. 10. 25.</td></tr>
              <tr><th scope="row">라이선스</th><td>README 695개 가운데 61.3%에 없음</td><td>전수 분석 2026. 10. 25.</td></tr>
              <tr><th scope="row">실행 환경</th><td>README 695개 가운데 21.3%만 적음</td><td>전수 분석 2026. 10. 25.</td></tr>
              <tr><th scope="row">분야 필터</th><td>35개에 시험용 값이 섞이고 검색어를 바꿔도 주소가 그대로</td><td>현황판 직접 확인 2026. 10. 2.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="b-asis" title="기존 화면 점검" lead="기존 현황판 표와 GitHub 저장소 검색 화면을 열어 막힌 지점을 표시했음.">
        <div className="cs-stack">
          <AnnoShot {...ASIS_TABLE} cardW={280} shotMax={880} cap="기존 현황판 프로젝트 표 2026. 11. 7." />
          <AnnoShot {...GITHUB} cardW={280} shotMax={880} />
        </div>
      </Section>

      <Section id="b-journey" title="이용자 여정" lead="비전공 공무원은 업무 문장으로 찾고 개발자는 AI 코딩 도구 안에서 같은 프로젝트를 조회.">
        <Journey />
        <div className="lane dev">
          <h4>개발자</h4>
          <div className="track">
            <span className="rail" aria-hidden="true"><i /></span>
            {DEV.map((s) => (<div className="stage-step" key={s.b}><b>{s.b}</b><span>{s.s}</span></div>))}
          </div>
        </div>
        <p className="cs-src">출처: 피그마 블루프린트 공무원 여정과 개발자 여정</p>
      </Section>

      <Section id="b-goal" title="사업 목표">
        <div className="cs-goal">공무원이 업무 문장 하나로 쓸 만한 도구를 찾고 근거를 확인해 고르는 공공 깃랩</div>
        <ul className="krds-info-list dash">
          <li>업무 문장 검색: 도구 이름을 몰라도 하는 일을 문장으로 입력</li>
          <li>근거가 붙은 소개 카드: 값마다 README 기반과 코드 추정과 정보 부족 표식</li>
          <li>분야 기준 목록과 현황판: 12개 공통 업무 분야로 묶고 분류 상태를 줄로 표시</li>
        </ul>
      </Section>
    </>
  );
}

/* ---------- 주요 기능 (AX) ---------- */
const FEATS = [
  { id: 'f-search', name: '업무 문장 검색', desc: '찾으려는 업무를 문장으로 쓰면 맞는 도구가 위에 올라옴', show: <AnnoShot {...F_SEARCH} cardW={280} shotMax={880} /> },
  { id: 'f-card', name: 'AI 소개 카드', desc: 'README를 읽고 쓰임새와 실행 형태와 이용 조건을 같은 형식으로 정리', show: (<><AnnoShot {...F_CARD} cardW={280} shotMax={720} /><div className="cs-gap" /><AnnoShot {...F_CARD_README} cardW={280} shotMax={720} /></>) },
  { id: 'f-similar', name: '유사 프로젝트', desc: '새로 만들기 전에 비슷한 도구를 먼저 보여 줌', show: <AnnoShot {...F_SIMILAR} cardW={280} shotMax={880} /> },
  { id: 'f-panel', name: '업무 도우미', desc: '어느 화면에서든 업무를 설명하면 오른쪽 패널에서 추천 도구가 답으로 올라옴', show: <AnnoShot {...F_PANEL} cardW={280} shotMax={880} /> },
  { id: 'f-publish', name: '공개 준비 점검', desc: 'README와 이용 조건 같은 아홉 항목을 충족과 보완 필요와 확인 불가로 점검', show: <AnnoShot {...F_PUBLISH} cardW={280} shotMax={880} /> },
  { id: 'f-mcp', name: '연결 안내', desc: '개발 도구 안에서 공개 프로젝트를 검색하고 상세와 유사 프로젝트를 조회하는 설정 안내', show: <AnnoShot {...F_MCP} cardW={280} shotMax={880} /> },
];

function Features() {
  return (
    <>
      <Section id="f-list" title="기능 목록" lead="AX로 만든 기능 여섯 개. 이름을 누르면 해당 화면으로 이동.">
        <div className="krds-table-wrap">
          <table className="tbl col data">
            <caption>주요 기능 번호와 이름과 설명</caption>
            <colgroup><col style={{ width: '10%' }} /><col style={{ width: '24%' }} /><col /></colgroup>
            <thead><tr><th scope="col">번호</th><th scope="col">기능</th><th scope="col">설명</th></tr></thead>
            <tbody>
              {FEATS.map((f, i) => (
                <tr key={f.id}>
                  <th scope="row">{i + 1}</th>
                  <td><button type="button" className="krds-btn small text cs-lnk" onClick={() => goto(f.id)}>{f.name}</button></td>
                  <td>{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      {FEATS.map((f) => (
        <section id={f.id} key={f.id} className="cs-block cs-feat" aria-labelledby={`${f.id}-h`}>
          <h3 id={`${f.id}-h`} className="cs-h3"><Badge tone="bg-light-primary">AX</Badge>{f.name}</h3>
          <p className="cs-lead">{f.desc}</p>
          <div className="cs-feat-body">{f.show}</div>
        </section>
      ))}
    </>
  );
}

/* ---------- 이용 방법 ---------- */
function HowTo() {
  const [step, setStep] = useState('search');
  const cur = STEPS.find((s) => s.id === step);
  return (
    <>
      <Section id="h-steps" title="이용 단계" lead="업무 문장 검색에서 공개 준비 점검까지 다섯 단계. 단계를 누르면 해당 화면을 볼 수 있음.">
        <Steps steps={STEPS} active={step} onPick={setStep} />
        <div className="cs-step-view" aria-live="polite">
          <div className="cs-step-text">
            <h4>{cur.label}</h4>
            <p>{cur.text}</p>
            <button type="button" className="krds-btn medium secondary" onClick={() => { window.location.hash = '#/intro/features'; setTimeout(() => goto(cur.feat), 60); }}>주요 기능에서 보기</button>
          </div>
          <Shot {...cur.shot} />
        </div>
      </Section>

      <Section id="h-faq" title="자주 묻는 질문">
        <Accordion items={FAQ} />
      </Section>

      <Section id="h-ia" title="화면 구성" lead="화면 여덟 개의 주소와 이동 길.">
        <IaMap nodes={IA_NODES} edges={IA_EDGES} />
        <p className="cs-src">출처: 피그마 IA-01 화면 지도</p>
      </Section>
    </>
  );
}

/* ---------- 추진 성과 (UX) ---------- */
function Results() {
  return (
    <>
      <Section id="r-ba" title="개선 전과 후" lead="최근 활동 프로젝트 카드 위주였던 현황판을 분야와 근거 표식이 보이는 목록으로 다시 설계.">
        <div className="cs-pair">
          <Shot src="c_asis_cards.webp" nat={[1580, 640]} k={1} crop={{ x: 0, y: 0, w: 1580, h: 640 }} cap="개선 전 현황판 최근 활동 프로젝트" />
          <Shot src="an_a01.jpg" nat={[2012, 2098]} crop={{ x: 300, y: 416, w: 1200, h: 486 }} cap="개선 후 프로젝트 둘러보기" />
        </div>
        <div className="krds-table-wrap">
          <table className="tbl col data">
            <caption>개선 전과 후 비교</caption>
            <colgroup><col style={{ width: '22%' }} /><col /><col /></colgroup>
            <thead><tr><th scope="col">구분</th><th scope="col">개선 전</th><th scope="col">개선 후</th></tr></thead>
            <tbody>
              <tr><th scope="row">분야 구분</th><td>필터 35개에 시험용 값 혼재</td><td>12개 공통 업무 분야</td></tr>
              <tr><th scope="row">검색 상태</th><td>검색어를 바꿔도 주소가 그대로</td><td>검색 상태를 주소에 저장</td></tr>
              <tr><th scope="row">근거 확인</th><td>이름과 설명만 보임</td><td>값마다 근거 표식과 README 줄 이동</td></tr>
              <tr><th scope="row">설명 칸 글자</th><td>11px에서 13px</td><td>KRDS 글자 크기 기준 적용</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="r-ux" title="UX 재설계 화면" lead="분야 목록과 현황판과 초안 시연 화면 세 개.">
        <div className="cs-stack">
          <div><h4 className="cs-h4"><Badge tone="bg-light-secondary">UX</Badge>업무 분야 목록</h4><p className="cs-note">기관마다 다른 주제를 12개 공통 업무 분야로 묶고 프로젝트 하나에 분야는 둘까지</p><AnnoShot {...F_FIELD} cardW={280} shotMax={880} /></div>
          <div><h4 className="cs-h4"><Badge tone="bg-light-secondary">UX</Badge>현황판</h4><p className="cs-note">분야 확정과 카드 생성 상태를 줄로 나눠 보여 주고 분야 행을 누르면 그 분야 목록이 열림</p><AnnoShot {...F_BOARD} cardW={280} shotMax={880} /></div>
          <div><h4 className="cs-h4"><Badge tone="bg-light-secondary">UX</Badge>README 초안과 써 봤어요</h4><p className="cs-note">공개 전 README 초안 예시와 써 본 기록을 한 화면에서 확인</p><AnnoShot {...F_DRAFT} cardW={280} shotMax={720} /></div>
        </div>
      </Section>

      <Section id="r-strategy" title="설계 원칙">
        <div className="krds-table-wrap">
          <table className="tbl col data">
            <caption>UX 설계 원칙과 내용</caption>
            <colgroup><col style={{ width: '28%' }} /><col /></colgroup>
            <thead><tr><th scope="col">원칙</th><th scope="col">내용</th></tr></thead>
            <tbody>{STRATEGY.map((s) => (<tr key={s.b}><th scope="row">{s.b}</th><td>{s.s}</td></tr>))}</tbody>
          </table>
        </div>
      </Section>

      <Section id="r-krds" title="KRDS 적용" lead="색과 서체와 부품은 범정부 디자인 시스템 값을 따름.">
        <div className="cs-vs-top">
          <div>
            <h4 className="cs-h4">색</h4>
            <div className="cs-swatches">
              {SWATCH.map((s) => (<div className="cs-swatch" key={s.h}><i style={{ background: s.h }} /><b>{s.n}</b><span>{s.h}</span></div>))}
            </div>
          </div>
          <div>
            <h4 className="cs-h4">서체</h4>
            <div className="cs-type">
              <p className="t1">업무 문장으로 찾는 공공 깃랩</p>
              <p className="t2">근거가 붙은 소개 카드</p>
              <p className="t3">README를 읽고 쓰임새와 실행 형태와 이용 조건을 같은 형식으로 정리</p>
              <p className="t4">Pretendard GOV Bold 700 Regular 400 줄 간격 150% 이상</p>
            </div>
          </div>
        </div>
        <h4 className="cs-h4">부품</h4>
        <div className="cs-comps">
          <Shot className="wide" src="an_a01.jpg" nat={[2012, 2098]} crop={{ x: 318, y: 246, w: 1169, h: 170 }} cap="검색 입력과 분야 단추" />
          <Shot src="an_a02.jpg" nat={[2012, 3478]} crop={{ x: 318, y: 250, w: 825, h: 150 }} cap="근거 표식 세 종류" />
          <Shot src="an_d01.jpg" nat={[2012, 1889]} crop={{ x: 129, y: 360, w: 623, h: 250 }} cap="분야 확정 비율 막대" />
        </div>
      </Section>

      <Section id="r-role" title="담당" lead="백엔드만 다른 개발자가 맡고 나머지 전 과정은 한 사람이 직접 진행.">
        <div className="krds-table-wrap">
          <table className="tbl col data">
            <caption>담당 과정과 수행 내용</caption>
            <colgroup><col style={{ width: '24%' }} /><col /></colgroup>
            <thead><tr><th scope="col">과정</th><th scope="col">수행 내용</th></tr></thead>
            <tbody>{ROLE.map((s) => (<tr key={s.b}><th scope="row">{s.b}</th><td>{s.s}</td></tr>))}</tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

const TITLE = {
  background: '추진 배경',
  features: '주요 기능',
  howto: '이용 방법',
  results: '추진 성과',
};

export default function Intro({ tab }) {
  const onPick = (id) => { window.location.hash = `#/intro/${id}`; };
  return (
    <>
      <div className="cs-wrap">
        <nav className="krds-breadcrumb-wrap" aria-label="현재 경로">
          <ol className="breadcrumb">
            <li className="home"><a href="#/" className="txt">홈</a></li>
            <li><a href="#/intro/background" className="txt">사업 소개</a></li>
            <li><a href="#/intro/background" className="txt">공공 깃랩</a></li>
          </ol>
        </nav>
        <div className="cs-page-head">
          <h1 className="cs-h1">공공 깃랩</h1>
          <p className="cs-page-sub">다른 기관이 만든 업무 도구를 공무원이 업무 문장으로 찾는 웹서비스</p>
        </div>
        <Tabs tabs={TABS} active={tab} onPick={onPick} />
        <div className="cs-panel" id={`panel_${tab}`} role="tabpanel" aria-label={TITLE[tab]}>
          {tab === 'background' ? <Background /> : null}
          {tab === 'features' ? <Features /> : null}
          {tab === 'howto' ? <HowTo /> : null}
          {tab === 'results' ? <Results /> : null}
        </div>
      </div>
    </>
  );
}
