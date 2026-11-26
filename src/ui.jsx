// 화면 공통 부품. KRDS 공식 마크업(탭, 단계 표시기, 아코디언, 배지, 표)을 그대로 쓰고 동작만 붙인다.
import { useState } from 'react';

export const IMG = (f) => `${import.meta.env.BASE_URL}img/${f}`;

export function Shot({ src, nat, k = 1.3, crop, cap, className = '' }) {
  const dw = nat[0] / k;
  return (
    <figure className={`cs-shot ${className}`}>
      <div className="cs-shot-box" style={{ aspectRatio: `${crop.w} / ${crop.h}` }}>
        <img
          src={IMG(src)}
          alt=""
          style={{ width: `${(dw / crop.w) * 100}%`, left: `${(-crop.x / crop.w) * 100}%`, top: `${(-crop.y / crop.h) * 100}%` }}
        />
      </div>
      {cap ? <figcaption className="cs-cap">{cap}</figcaption> : null}
    </figure>
  );
}

export function Badge({ tone = 'bg-light-primary', children }) {
  return <span className={`krds-badge ${tone}`}>{children}</span>;
}

export function Tabs({ tabs, active, onPick, idp = 'tab' }) {
  return (
    <div className="krds-tab-area layer">
      <div className="tab line full">
        <ul role="tablist">
          {tabs.map((t) => (
            <li key={t.id} id={`${idp}_${t.id}`} role="tab" aria-selected={t.id === active} aria-controls={`panel_${t.id}`} className={t.id === active ? 'active' : ''}>
              <button type="button" className="btn-tab" onClick={() => onPick(t.id)}>
                {t.label}
                {t.id === active ? <i className="sr-only created"> 선택됨</i> : null}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Steps({ steps, active, onPick }) {
  const idx = steps.findIndex((s) => s.id === active);
  return (
    <ol className="krds-step-wrap cs-steps">
      {steps.map((s, i) => (
        <li key={s.id} className={i < idx ? 'done' : i === idx ? 'active' : ''}>
          <span role="button" tabIndex={0} onClick={() => onPick(s.id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(s.id); } }} aria-current={i === idx ? 'step' : undefined}>
            {i === idx ? <em className="sr-only">현재단계</em> : null}
            <i className="step">{i + 1}단계</i>
            <span className="step-tit">{s.label}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="krds-accordion">
      {items.map((it, i) => (
        <div key={it.q} className={`accordion-item${open === i ? ' active' : ''}`}>
          <h5 className="accordion-header">
            <button type="button" id={`acc_h_${i}`} className="btn-accordion" aria-expanded={open === i} aria-controls={`acc_c_${i}`} onClick={() => setOpen(open === i ? -1 : i)}>{it.q}</button>
          </h5>
          <div id={`acc_c_${i}`} className="accordion-collapse collapse" aria-labelledby={`acc_h_${i}`}>
            <div className="accordion-body">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Donut({ value, total, title, a, b, insight }) {
  const r = 64;
  const c = 2 * Math.PI * r;
  const pct = (value / total) * 100;
  return (
    <div className="cs-chart">
      <p className="cs-chart-title">{title}</p>
      <svg viewBox="0 0 160 160" className="cs-donut" role="img" aria-label={`${a} ${pct.toFixed(1)}%`}>
        <circle cx="80" cy="80" r={r} fill="none" stroke="#dbe6fd" strokeWidth="22" />
        <circle cx="80" cy="80" r={r} fill="none" stroke="#256ef4" strokeWidth="22" strokeDasharray={`${(c * value) / total} ${c}`} transform="rotate(-90 80 80)" />
        <text x="80" y="88" textAnchor="middle" className="cs-donut-n">{pct.toFixed(1)}%</text>
      </svg>
      <p className="cs-legend"><i className="sw on" />{a}<br /><i className="sw" />{b}</p>
      <p className="cs-insight">{insight}</p>
    </div>
  );
}

export function Bars({ title, rows, insight }) {
  return (
    <div className="cs-chart">
      <p className="cs-chart-title">{title}</p>
      <div className="cs-bars">
        {rows.map((r) => (
          <div key={r.l} className="cs-bar-row">
            <p className="cs-bar-l"><span>{r.l}</span><b>{r.v}%</b></p>
            <div className="cs-bar-t"><i style={{ width: `${r.v}%`, background: r.c }} /></div>
          </div>
        ))}
      </div>
      <p className="cs-insight">{insight}</p>
    </div>
  );
}

function Arrow({ dir, arrow }) {
  if (dir === 'h') {
    return (
      <svg className="ia-line" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
        <line x1={arrow === 'both' ? 8 : 0} y1="6" x2={arrow === 'right' || arrow === 'both' ? 92 : 100} y2="6" />
        {arrow === 'right' || arrow === 'both' ? <path d="M92 1 L100 6 L92 11 Z" /> : null}
        {arrow === 'both' ? <path d="M8 1 L0 6 L8 11 Z" /> : null}
      </svg>
    );
  }
  return (
    <svg className="ia-line v" viewBox="0 0 12 100" preserveAspectRatio="none" aria-hidden="true">
      <line x1="6" y1={arrow === 'up' || arrow === 'both' ? 8 : 0} x2="6" y2={arrow === 'down' || arrow === 'both' ? 92 : 100} />
      {arrow === 'down' || arrow === 'both' ? <path d="M1 92 L6 100 L11 92 Z" /> : null}
      {arrow === 'up' || arrow === 'both' ? <path d="M1 8 L6 0 L11 8 Z" /> : null}
    </svg>
  );
}

export function IaMap({ nodes, edges }) {
  return (
    <>
      <div className="ia">
        {nodes.map((n) => (
          <div className="ia-node" key={n.c} style={{ gridColumn: n.gc, gridRow: n.gr }}>
            <b>{n.c}</b>
            <strong>{n.n}</strong>
            <span>{[n.r, n.t].filter(Boolean).join(' ')}</span>
          </div>
        ))}
        {edges.map((e, i) => (
          <div className={`ia-edge ${e.dir}`} key={i} style={{ gridColumn: e.gc, gridRow: e.gr }}>
            {e.label ? <span>{e.label}</span> : null}
            <Arrow dir={e.dir} arrow={e.arrow} />
          </div>
        ))}
      </div>
      <ul className="ia-list">
        {nodes.map((n) => (
          <li key={n.c}><b>{n.c}</b><strong>{n.n}</strong><span>{[n.r, n.t].filter(Boolean).join(' ')}</span></li>
        ))}
      </ul>
    </>
  );
}
