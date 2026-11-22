// 업무 검색 재현 화면. 피그마 G-02 Search / 1440과 결과 보고서 예제 데이터를 옮겼다.
// 자동 재생: 검색어를 한 글자씩 입력하고, 주소의 q 값이 따라 바뀌고, 결과가 차례로 나타난다. 다 돌면 다음 질문으로 넘어간다.
import { useEffect, useRef, useState } from 'react';
import { useInView, REDUCED } from './auto.js';

const BASE = 'hyunho2378.github.io/ai-public-gitlab/search';

const DATA = {
  '출장 여비 정산': {
    head: '검색 결과 3',
    rows: [
      { t: '출장비 정산 도우미', d: '출장 여비 계산서를 만드는 도구', why: '하는 일 문구가 입력 내용과 겹침' },
      { t: '여비업무통합도우미', d: '공무원 자가용 출장 여비 계산과 출장비 품의 문안 작성을 돕는 Windows 시제품', why: '이용 조건이 입력 내용과 겹침' },
      { t: '행안부 예산 자료저장소', d: '행정안전부 세출예산서를 웹에서 검색하고 한글 원본도 내려받는 예산 대시보드', why: '같은 업무 분야' },
    ],
  },
  '회의록을 정리해 보고서로 옮길 때': {
    head: 'AI 추천 3',
    rows: [
      { t: 'public-sector-research-skill', d: '질문 하나를 공식 자료 근거가 달린 보고서로 만들어 주는 리서치 보조 도구', why: '하는 일 문구가 입력 내용과 겹침' },
      { t: '한글 AI 도우미 : 로컬LLM + 웹한글 기반의 보고서 도우미', d: '내 PC의 로컬 AI만 써서 웹한글 기안기 옆에서 보고서 양식 세팅과 본문 작성을 돕는 크롬 확장', why: '하는 일 문구가 입력 내용과 겹침' },
      { t: '온AI Work', d: '왼쪽 채팅으로 보고서를 만들고 오른쪽에서 한글 문서를 바로 확인하고 편집하는 작업공간', why: '실행 형태가 업무 도구와 맞음' },
    ],
  },
};
const QUERIES = Object.keys(DATA);

export default function SearchDemo() {
  const box = useRef(null);
  const live = useInView(box, 0.3);
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState(QUERIES[0]);
  const [shown, setShown] = useState(3);
  const [manual, setManual] = useState(false);
  const [note, setNote] = useState('검색어가 주소의 q 값으로 저장됩니다.');
  const full = QUERIES[qi];
  const res = DATA[full];

  useEffect(() => {
    if (!live || manual || REDUCED()) return undefined;
    let stop = false;
    const timers = [];
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));
    (async () => {
      while (!stop) {
        setShown(0);
        setNote('업무 문장을 입력합니다.');
        setTyped('');
        for (let i = 1; i <= full.length && !stop; i += 1) { setTyped(full.slice(0, i)); await wait(55); }
        if (stop) return;
        setNote('검색어가 주소의 q 값으로 저장되었습니다.');
        await wait(420);
        for (let i = 1; i <= DATA[full].rows.length && !stop; i += 1) { setShown(i); await wait(380); }
        setNote('주소를 그대로 보내면 동료도 같은 결과를 봅니다.');
        await wait(2600);
        if (stop) return;
        setQi((v) => (v + 1) % QUERIES.length);
        await wait(120);
      }
    })();
    return () => { stop = true; timers.forEach(clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, qi, manual]);

  useEffect(() => { if (REDUCED()) { setTyped(full); setShown(DATA[full].rows.length); } }, [full]);

  const pick = (next) => {
    setManual(true);
    setQi(QUERIES.indexOf(next));
    setTyped(next);
    setShown(DATA[next].rows.length);
    setNote('검색어가 주소의 q 값으로 저장되었습니다.');
  };

  return (
    <div className="browser" ref={box} role="group" aria-label="업무 검색 재현 화면">
      <div className="addr">
        <div className="url">
          <span className="host">{BASE}</span><span className="qs">?q=<em>{typed}</em></span>
        </div>
        <span className="addr-tag t-cap">자동 재생</span>
      </div>
      <div className="page">
        <h4>업무 검색</h4>
        <form onSubmit={(e) => e.preventDefault()} role="search">
          <label className="sr" htmlFor="task-q">찾으려는 업무 설명</label>
          <input id="task-q" value={typed} readOnly />
          <button type="button" onClick={() => pick(full)}>검색</button>
        </form>
        <div className="examples" role="group" aria-label="예시 질문">
          {QUERIES.map((x) => (
            <button type="button" key={x} aria-pressed={x === full} onClick={() => pick(x)}>{x}</button>
          ))}
        </div>
        <p className="summary">검색어 {typed || '입력 중'}, 분야 전체, 자료 기준 2026. 10. 30. 수집</p>
        <div className="results">
          <h5>{res.head}</h5>
          {res.rows.slice(0, shown).map((r) => (
            <div className="res in" key={r.t}>
              <b>{r.t}</b>
              <span className="badge readme">README 기반</span>
              <p>{r.d}</p>
              <small>추천 이유 <strong>{r.why}</strong></small>
            </div>
          ))}
        </div>
        <p className="hint" aria-live="polite">{note}</p>
      </div>
    </div>
  );
}
