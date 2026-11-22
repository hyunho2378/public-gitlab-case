// 화면 폭 다섯 단계. 배포 화면을 각 폭으로 직접 연 캡처(2026. 11. 22.)다.
// 자동 재생: 360부터 1,920px까지 순서대로 폭이 바뀐다. 단추를 누르면 그 폭에서 멈춘다.
import { useEffect, useRef, useState } from 'react';
import { Pic } from './parts.jsx';
import { useInView, REDUCED } from './auto.js';

const W = [
  { w: 360, name: 'deploy_360', pct: 26, m: 100 },
  { w: 768, name: 'deploy_768', pct: 46, m: 100 },
  { w: 1024, name: 'deploy_1024', pct: 62, m: 100 },
  { w: 1440, name: 'deploy_1440', pct: 84, m: 100 },
  { w: 1920, name: 'deploy_1920', pct: 100, m: 100 },
];

export default function Widths() {
  const wrap = useRef(null);
  const live = useInView(wrap, 0.3);
  const [manual, setManual] = useState(false);
  const [i, setI] = useState(() => (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches ? 0 : 3));
  const cur = W[i];

  useEffect(() => {
    if (!live || manual || REDUCED()) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % W.length), 2100);
    return () => clearInterval(id);
  }, [live, manual]);

  return (
    <div className="widths" ref={wrap}>
      <div className="tabs" role="tablist" aria-label="화면 폭">
        {W.map((x, k) => (
          <button key={x.w} type="button" role="tab" aria-selected={k === i} aria-controls="width-view" onClick={() => { setManual(true); setI(k); }}>
            {x.w}px
          </button>
        ))}
      </div>
      <div className="viewport" id="width-view" role="tabpanel" aria-label={`${cur.w}px 화면`} style={{ '--pct': `${cur.pct}%`, '--pctm': `${cur.m}%` }}>
        <div className="shot" key={cur.name}>
          <Pic name={cur.name} alt={`배포 화면 프로젝트 둘러보기, ${cur.w}px 폭`} />
        </div>
      </div>
    </div>
  );
}
