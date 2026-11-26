// 공무원 여정. 글자는 피그마 BP-01 사용자 행동 줄. 단계별 화면은 아래 기능 구간의 주석 화면으로 보여 준다.
const OFFICER = [
  { b: '발견', s: '첫 화면에서 자료 범위 확인' },
  { b: '검색', s: '업무 문장 입력' },
  { b: '판단', s: '근거 표식 확인' },
  { b: '결정', s: '유사 프로젝트 비교' },
  { b: '기록', s: '써 봤어요 기록' },
];

export default function Journey() {
  return (
    <div className="lane officer">
      <h3>비전공 공무원</h3>
      <div className="track">
        <span className="rail" aria-hidden="true"><i /></span>
        {OFFICER.map((s) => (
          <div className="stage-step" key={s.b}>
            <b>{s.b}</b>
            <span>{s.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
