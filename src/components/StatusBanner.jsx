// 점검 중 안내 재현 화면. 배포 화면의 파란 머리 띠와 노란 안내 띠 문구를 그대로 썼다.
// 자동 재생: 실시간 조회가 멈추면 안내 띠가 내려오고 자료 시점 줄이 밝아진다. 목록은 저장 자료로 그대로 보인다.
import { useEffect, useRef, useState } from 'react';
import { useInView, REDUCED } from './auto.js';

const ROWS = [
  '국가기술표준원 / 해외규제변경체크AI',
  '창업진흥원 / 공공맛집지도_ALIOOLIO',
  '마포구청 / HWP_AutoDocFit',
  '서울특별시 광진구 / kordoc',
];

export default function StatusBanner() {
  const wrap = useRef(null);
  const live = useInView(wrap, 0.3);
  const [step, setStep] = useState(REDUCED() ? 2 : 0);

  useEffect(() => {
    if (!live || REDUCED()) return undefined;
    let stop = false; const ts = [];
    const wait = (ms) => new Promise((r) => ts.push(setTimeout(r, ms)));
    (async () => {
      while (!stop) {
        setStep(0); await wait(1500);
        setStep(1); await wait(1400);
        setStep(2); await wait(3400);
      }
    })();
    return () => { stop = true; ts.forEach(clearTimeout); };
  }, [live]);

  return (
    <div className="browser status-demo" ref={wrap} role="group" aria-label="점검 중 안내 재현 화면">
      <div className="gov-bar">AI 정부 실험실 공공 GitLab 저장소 ( 프로젝트 현황판 )</div>
      <div className={`notice${step >= 1 ? ' on' : ''}`}>공공 깃랩 점검 중. 2026. 10. 30. 기준 저장 자료.</div>
      <div className="page">
        <h4>프로젝트 둘러보기</h4>
        <p className={`summary${step >= 2 ? ' mark' : ''}`}>공개 프로젝트 728개, 2026. 10. 30. 수집</p>
        {ROWS.map((r) => (
          <div className="res in" key={r}><b>{r}</b><span /></div>
        ))}
        <p className="hint">{step === 0 ? '실시간 자료를 부르는 중입니다.' : '점검 중에도 저장 자료로 목록을 봅니다.'}</p>
      </div>
    </div>
  );
}
