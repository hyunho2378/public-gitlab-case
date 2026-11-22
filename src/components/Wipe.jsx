// 밝은 화면과 어두운 화면을 한 장에서 밀어 비교한다. 끌기와 방향키 모두 된다.
import { useRef, useState } from 'react';
import { Pic } from './parts.jsx';

export default function Wipe() {
  const [x, setX] = useState(50);
  const box = useRef(null);
  const drag = useRef(false);
  const move = (clientX) => {
    const r = box.current.getBoundingClientRect();
    setX(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <>
      <div
        className="wipe fx-up"
        ref={box}
        style={{ '--x': `${x}%` }}
        onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => drag.current && move(e.clientX)}
        onPointerUp={() => (drag.current = false)}
        onPointerCancel={() => (drag.current = false)}
      >
        <Pic name="deploy_1440" alt="밝은 화면의 프로젝트 둘러보기" />
        <div className="over"><Pic name="deploy_dark_1440" alt="어두운 화면의 프로젝트 둘러보기" /></div>
        <div className="handle">
          <button
            type="button"
            role="slider"
            aria-label="밝은 화면과 어두운 화면 경계"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(x)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setX((v) => Math.max(0, v - 5));
              if (e.key === 'ArrowRight') setX((v) => Math.min(100, v + 5));
            }}
          >
            끌어서 비교
          </button>
        </div>
      </div>
      <div className="wipe-labels t-cap"><span>밝은 화면</span><span>어두운 화면</span></div>
    </>
  );
}
