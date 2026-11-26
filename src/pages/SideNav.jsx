// KRDS 사이드 메뉴(공식 마크업). 한 단계 목록만 쓴다.
export default function SideNav({ title, items, current, onPick }) {
  return (
    <nav className="krds-side-navigation" aria-label={`${title} 메뉴`}>
      <h2 className="lnb-tit">{title}</h2>
      <ul className="lnb-list" role="menubar">
        {items.map((it) => (
          <li key={it.id} className={`lnb-item${it.id === current ? ' active' : ''}`} role="none">
            {it.to ? (
              <a href={it.to} className="lnb-btn lnb-link" role="menuitem" aria-current={it.id === current ? 'page' : undefined}>{it.label}</a>
            ) : (
              <button type="button" className="lnb-btn lnb-link" role="menuitem" aria-current={it.id === current ? 'page' : undefined} onClick={() => onPick(it.id)}>{it.label}</button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
