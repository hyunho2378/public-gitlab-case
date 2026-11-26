// 비슷한 도구 비교 재현 화면. 피그마 A-02 유사 프로젝트 영역의 글자를 옮겼다.
// 자동 재생: 보고 있는 프로젝트를 뺀 후보가 하나씩 올라오고, 공통점과 차이 줄이 뒤따라 나타난다.
import { useEffect, useRef, useState } from 'react';
import { useInView, REDUCED } from './auto.js';

const CUR = '문서 한방 출력';
const CAND = [
  { t: '마크다운 변환기', d: 'HWP, PDF, DOCX, XLSX 파일을 인터넷 없이 내 PC에서 마크다운 문서로 바꿔 주는 도구', same: '유사 높음', diff: '차이 정보 부족' },
  { t: 'kordoc', d: 'HWP, HWPX, PDF, Office 문서를 Markdown으로 바꾸는 문서 변환 도구', same: '유사 보통', diff: '차이 정보 부족' },
  { t: '공문서 파서 모음', d: '공문서 파일에서 표와 본문을 읽어 JSON으로 내려 주는 라이브러리', same: '유사 보통', diff: '차이 검수 도구는 없음' },
];

export default function SimilarTools() {
  const wrap = useRef(null);
  const live = useInView(wrap, 0.3);
  const [n, setN] = useState(CAND.length);

  useEffect(() => {
    if (!live || REDUCED()) return undefined;
    let stop = false; const ts = [];
    const wait = (ms) => new Promise((r) => ts.push(setTimeout(r, ms)));
    (async () => {
      await wait(2600);
      while (!stop) {
        setN(1); await wait(650);
        for (let i = 1; i <= CAND.length && !stop; i += 1) { setN(i); await wait(650); }
        await wait(3000);
      }
    })();
    return () => { stop = true; ts.forEach(clearTimeout); };
  }, [live]);

  return (
    <div className="browser sim-demo" ref={wrap} role="group" aria-label="비슷한 도구 비교 재현 화면">
      <div className="addr">
        <div className="url"><span className="host">hyunho2378.github.io/ai-public-gitlab/projects/41/about</span></div>
        <span className="addr-tag t-cap">자동 재생</span>
      </div>
      <div className="page">
        <h4>유사 프로젝트 {CAND.length}</h4>
        <p className="summary">보고 있는 {CUR}은 후보에서 제외</p>
        {CAND.slice(0, n).map((c) => (
          <div className="res in" key={c.t}>
            <b>{c.t}</b>
            <span className="badge readme">{c.same}</span>
            <p>{c.d}</p>
            <small>{c.diff}</small>
          </div>
        ))}
        <p className="hint">새 프로젝트를 만들기 전 재사용할 도구 확인</p>
      </div>
    </div>
  );
}
