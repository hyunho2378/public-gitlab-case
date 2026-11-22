// 공통 부품: 그림, 화면 틀, 흐르는 띠
import { IMG } from '../imgs.js';

export function Pic({ name, alt = '', className = '', style, eager = false, sizes }) {
  const [w, h] = IMG[name] || [1600, 1000];
  return (
    <img
      src={`${import.meta.env.BASE_URL}img/${name}.webp`}
      width={w}
      height={h}
      alt={alt}
      className={className}
      style={style}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
    />
  );
}

export function Shot({ name, alt, className = '', pan = false, style }) {
  return (
    <div className={`shot${pan ? ' pan' : ''} ${className}`} style={style}>
      <Pic name={name} alt={alt} />
    </div>
  );
}

// Sphere cont3, cont5의 Swiper 자동 재생(speed 7000, linear, loop)을 CSS 무한 이동으로 옮겼다.
// 슬라이드 하나가 7초에 한 칸씩 지나가도록 전체 시간을 슬라이드 수 x 7초로 잡는다.
export function Marquee({ items, render, className = '' }) {
  const list = [...items, ...items];
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="track" style={{ '--dur': `${items.length * 7}s` }}>
        {list.map((it, i) => (
          <div className="item" key={i} style={it.style}>
            {render(it)}
          </div>
        ))}
      </div>
    </div>
  );
}

// 화면 위에 막히는 지점이나 설계 지점을 직접 표시한다. 표시 칸은 테두리 없이 파란 면, 번호는 아래 설명과 짝을 이룬다.
export function Annotated({ name, alt, notes, cap, start = 1, className = '', legend = true }) {
  return (
    <figure className={`anno ${className}`}>
      <div className="shot anno-img">
        <Pic name={name} alt={alt} />
        {notes.map((n, i) => (
          <span key={i} className="mark" style={{ left: `${n.x}%`, top: `${n.y}%`, width: `${n.w}%`, height: `${n.h}%`, '--d': `${0.25 + i * 0.15}s` }} aria-hidden="true">
            <i>{start + i}</i>
          </span>
        ))}
      </div>
      {cap ? <figcaption className="cap t-cap">{cap}</figcaption> : null}
      {legend ? (
        <ol className="notes">
          {notes.map((n, i) => (
            <li key={i}><i aria-hidden="true">{start + i}</i><p className="t-body">{n.t}</p></li>
          ))}
        </ol>
      ) : null}
    </figure>
  );
}
