// 공무원 여정. 단계를 누르면 그 단계 화면이 크게 열린다. 글자는 피그마 BP-01 사용자 행동 줄.
import { useState } from 'react';
import { Pic } from './parts.jsx';

const OFFICER = [
  { b: '발견', s: '첫 화면에서 자료 범위 확인', img: 'c_a01_filter', cap: '프로젝트 둘러보기 위쪽. 공개 프로젝트 728개 2026. 10. 30. 수집' },
  { b: '검색', s: '업무 문장 입력', img: 'c_g02_focus', cap: '업무 검색. 업무 문장 칸과 12개 업무 분야' },
  { b: '판단', s: '근거 표식 확인', img: 'c_a02_card', cap: '소개 카드. 칸마다 README 기반이나 코드 추정 표식' },
  { b: '결정', s: '유사 프로젝트 비교', img: 'c_a02_similar', cap: '유사 프로젝트 5. 현재 프로젝트는 빼고 보여 줌' },
  { b: '기록', s: '써 봤어요 기록', img: 'c_a02_tried', cap: '써 봤어요 예시. 시험 사용과 업무 적용 기록' },
];

export default function Journey() {
  const [i, setI] = useState(2);
  const cur = OFFICER[i];
  return (
    <div className="lane officer">
      <h3 className="t-sub">비전공 공무원</h3>
      <div className="track" role="tablist" aria-label="공무원 여정 단계">
        <span className="rail" aria-hidden="true"><i /></span>
        {OFFICER.map((s, k) => (
          <button type="button" role="tab" aria-selected={k === i} aria-controls="journey-view" className="stage-step" key={s.b} onClick={() => setI(k)}>
            <b>{s.b}</b>
            <span className="t-body">{s.s}</span>
          </button>
        ))}
      </div>
      <figure className="journey-view" id="journey-view" role="tabpanel">
        <div className="shot" key={cur.img}><Pic name={cur.img} alt={`${cur.b} 단계 화면`} /></div>
        <figcaption className="cap t-cap">{cur.cap}</figcaption>
      </figure>
    </div>
  );
}
