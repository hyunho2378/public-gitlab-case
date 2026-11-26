// 화면 주석. 피그마 Annotations처럼 화면 위 요소를 점과 실선으로 가리키고 옆에 카드를 둔다.
// 태그 색: Accessibility 분홍 #E8459A, 나머지(Interaction, Responsive, Default value, Data state) 파랑 #0D99FF.
// 점과 선은 화면 안 요소 가장자리에서 시작하고 카드는 세로로 겹치지 않게 놓는다. 좁은 화면에서는 카드를 화면 아래로 내린다.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const CAT = {
  Accessibility: '#E8459A',
  Interaction: '#0D99FF',
  Responsive: '#0D99FF',
  'Default value': '#0D99FF',
  'Data state': '#0D99FF',
  'As-Is': '#0F2A5C',
};

const GAP = 14;

export default function AnnoShot({ src, px, k = 1.3, crop, notes, side = 'right', dark = false, cardW, shotMax, cap, alt = '', className = '' }) {
  const dw = px[0] / k;
  const dh = px[1] / k;
  const ref = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const [geo, setGeo] = useState(null);

  const layout = () => {
    const fig = ref.current;
    const stage = stageRef.current;
    if (!fig || !stage) return;
    const fr = fig.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    const narrow = fr.width < 900;
    const sc = sr.width / crop.w;
    const dots = notes.map((n) => {
      const x = (side === 'right' ? n.box[0] + n.box[2] : n.box[0]) - crop.x;
      const y = n.box[1] + n.box[3] / 2 - crop.y;
      return { x: sr.left - fr.left + x * sc + (side === 'right' ? 9 : -9), y: sr.top - fr.top + y * sc };
    });
    if (narrow) {
      // 좁은 화면: 점이 겹치지 않게 위에서부터 26px 간격을 지킨다
      const ord = dots.map((_, i) => i).sort((p, q) => dots[p].y - dots[q].y);
      const spaced = dots.map((d) => ({ ...d, x: d.x + (side === 'right' ? -20 : 20) }));
      let last = -999;
      ord.forEach((i) => { const y = Math.max(spaced[i].y, last + 28); spaced[i].y = y; last = y; });
      setGeo({ narrow: true, dots: spaced });
      return;
    }
    // 카드 높이를 재서 점 높이에 맞추되 서로 겹치지 않게 아래로 민다
    const hs = notes.map((_, i) => (cardRefs.current[i] ? cardRefs.current[i].offsetHeight : 120));
    const order = notes.map((_, i) => i).sort((a, b) => dots[a].y - dots[b].y);
    const tops = [];
    let cursor = sr.top - fr.top;
    order.forEach((i) => {
      const want = dots[i].y - 22;
      const t = Math.max(want, cursor);
      tops[i] = t;
      cursor = t + hs[i] + GAP;
    });
    // 아래로 넘치면 위로 당긴다
    const stageBottom = sr.top - fr.top + sr.height;
    let over = cursor - GAP - stageBottom;
    if (over > 0) {
      for (let j = order.length - 1; j >= 0; j--) {
        const i = order[j];
        const minTop = j === 0 ? sr.top - fr.top : tops[order[j - 1]] + hs[order[j - 1]] + GAP;
        const move = Math.min(over, tops[i] - minTop);
        if (move > 0) { tops[i] -= move; over -= move; }
      }
    }
    const bottom = Math.max(stageBottom, ...tops.map((t, i) => t + hs[i]));
    setGeo({ narrow: false, dots, tops, hs, bottom: bottom - (sr.top - fr.top), figW: fr.width, figH: fr.height });
  };

  useLayoutEffect(() => {
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(ref.current);
    ro.observe(stageRef.current);
    cardRefs.current.forEach((c) => c && ro.observe(c));
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(layout, 400);
    const onLoad = () => layout();
    window.addEventListener('load', onLoad);
    return () => { clearTimeout(t); window.removeEventListener('load', onLoad); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = { '--cw': cardW ? `${cardW}px` : undefined, '--sm': shotMax ? `${shotMax}px` : undefined };
  const imgStyle = {
    width: `${(dw / crop.w) * 100}%`,
    left: `${(-crop.x / crop.w) * 100}%`,
    top: `${(-crop.y / crop.h) * 100}%`,
  };

  return (
    <figure ref={ref} className={`anno an an-${side}${shotMax ? ' an-fit' : ''}${dark ? ' an-dark' : ''}${geo && geo.narrow ? ' an-narrow' : ''} ${className}`} style={style}>
      <div className="an-stage-col">
        <div ref={stageRef} className="an-stage" style={{ aspectRatio: `${crop.w} / ${crop.h}` }}>
          <div className="an-clip">
            <img src={`${import.meta.env.BASE_URL}img/${src}`} alt={alt} style={imgStyle} loading="lazy" decoding="async" />
          </div>
          {notes.map((n, i) => (
            <span
              key={`t${i}`}
              className="an-tint"
              style={{
                left: `${((n.box[0] - crop.x) / crop.w) * 100}%`,
                top: `${((n.box[1] - crop.y) / crop.h) * 100}%`,
                width: `${(n.box[2] / crop.w) * 100}%`,
                height: `${(n.box[3] / crop.h) * 100}%`,
                '--c': CAT[n.cat],
                '--d': `${0.2 + i * 0.12}s`,
              }}
              aria-hidden="true"
            />
          ))}
        </div>
        {cap ? <figcaption className="cap t-cap">{cap}</figcaption> : null}
      </div>

      <div className="an-cards" style={geo && !geo.narrow ? { height: geo.bottom } : undefined}>
        {notes.map((n, i) => {
          const pos = geo && !geo.narrow ? { top: geo.tops[i] - (stageRef.current.getBoundingClientRect().top - ref.current.getBoundingClientRect().top) } : null;
          return (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="an-card"
              style={{ ...(pos || {}), '--c': CAT[n.cat], '--d': `${0.3 + i * 0.12}s` }}
            >
              <span className="an-tag" style={n.cat === 'As-Is' ? { color: '#fff' } : undefined}>{n.cat}</span>
              <p className="an-text">{n.text}</p>
            </div>
          );
        })}
      </div>

      {geo && !geo.narrow ? (
        <svg className="an-lines" width={geo.figW} height={geo.figH} viewBox={`0 0 ${geo.figW} ${geo.figH}`} aria-hidden="true">
          {notes.map((n, i) => {
            const d = geo.dots[i];
            const cardEl = cardRefs.current[i];
            const fr = ref.current.getBoundingClientRect();
            const cr = cardEl.getBoundingClientRect();
            const cx = side === 'right' ? cr.left - fr.left : cr.right - fr.left;
            const cy = geo.tops[i] + 20;
            const ex = side === 'right' ? cx - 26 : cx + 26;
            return (
              <g key={i} style={{ '--c': CAT[n.cat], '--d': `${0.25 + i * 0.12}s` }} className="an-line">
                <path d={`M ${d.x} ${d.y} L ${ex} ${cy} L ${cx} ${cy}`} pathLength="1" />
                <circle className="halo" cx={d.x} cy={d.y} r="12" />
                <circle className="core" cx={d.x} cy={d.y} r="6" />
              </g>
            );
          })}
        </svg>
      ) : null}

      {geo && geo.narrow
        ? notes.map((n, i) => (
            <span key={`d${i}`} className="an-dot" style={{ left: geo.dots[i].x, top: geo.dots[i].y, '--c': CAT[n.cat] }} aria-hidden="true">{i + 1}</span>
          ))
        : null}
    </figure>
  );
}
