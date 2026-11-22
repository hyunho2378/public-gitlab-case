// 자동 재생 공통. 화면에 들어오면 타임라인을 돌리고, 벗어나면 멈춘다. 움직임 줄이기 설정이면 정지 그림으로 둔다.
import { useEffect, useRef, useState } from 'react';

export const REDUCED = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useInView(ref, threshold = 0.25) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => setSeen(e.isIntersecting)), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return seen;
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
