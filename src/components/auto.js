// 자동 재생 공통. 화면에 들어오면 타임라인을 돌리고, 벗어나면 멈춘다. 움직임 줄이기 설정이면 정지 그림으로 둔다.
import { useEffect, useRef } from 'react';

export const REDUCED = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 스크롤 연출 정리(2026. 11. 26.): 화면에 들어와도 저절로 재생하지 않는다. 재현 화면은 단추를 눌러 바꾼다.
export function useInView() {
  return false;
}

// 단계 배열을 순서대로 실행하고 처음으로 돌아온다. 화면 밖이면 멈춘다.
export function useSteps(active, steps, run) {
  const timer = useRef(null);
  useEffect(() => {
    if (!active || REDUCED()) return undefined;
    let i = 0;
    let stop = false;
    const tick = () => {
      if (stop) return;
      run(steps[i].s);
      timer.current = setTimeout(() => { i = (i + 1) % steps.length; tick(); }, steps[i].ms);
    };
    tick();
    return () => { stop = true; clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
