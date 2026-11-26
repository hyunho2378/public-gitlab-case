import { useMemo, useState } from 'react';
import { ARCHIVE } from '../data.js';
import { Shot, Badge, IMG } from '../ui.jsx';
import SideNav from './SideNav.jsx';

const CATS = [
  { id: 'all', label: '전체 자료', kinds: null },
  { id: 'doc', label: '보고서', kinds: ['보고서'] },
  { id: 'design', label: '화면 설계와 화면 자료', kinds: ['화면 설계', '화면 자료'] },
  { id: 'service', label: '서비스와 소스', kinds: ['서비스', '소스'] },
];
const TONE = { 보고서: 'bg-light-primary', '화면 설계': 'bg-light-secondary', '화면 자료': 'bg-light-secondary', 서비스: 'bg-light-success', 소스: 'bg-light-gray' };

export default function Archive() {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [sel, setSel] = useState('report');
  const list = useMemo(() => {
    const c = CATS.find((x) => x.id === cat);
    return ARCHIVE.filter((a) => (!c.kinds || c.kinds.includes(a.kind)) && (!q.trim() || (a.title + a.desc + a.kind).includes(q.trim())));
  }, [cat, q]);
  const cur = ARCHIVE.find((a) => a.id === sel) || ARCHIVE[0];

  return (
    <div className="cs-wrap">
      <nav className="krds-breadcrumb-wrap" aria-label="현재 경로">
        <ol className="breadcrumb">
          <li className="home"><a href="#/" className="txt">홈</a></li>
          <li><a href="#/archive" className="txt">자료실</a></li>
        </ol>
      </nav>
      <div className="cs-sub-layout">
        <SideNav title="자료실" items={CATS.map((c) => ({ id: c.id, label: c.label }))} current={cat} onPick={setCat} />
        <div className="cs-sub-main">
          <h1 className="cs-h1">자료실</h1>
          <p className="cs-page-sub">사업에서 만든 보고서와 화면 설계와 서비스 자료. 자료를 고르면 미리보기가 열림.</p>

          <div className="form-group cs-filter">
            <div className="form-tit"><label htmlFor="arc-q">자료 검색</label></div>
            <div className="form-conts"><input id="arc-q" type="text" className="krds-input" placeholder="자료 이름이나 구분 입력" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          </div>
          <p className="cs-count">전체 자료 <strong>{ARCHIVE.length}</strong>건 가운데 <strong>{list.length}</strong>건</p>

          <div className="krds-table-wrap">
            <table className="tbl col data cs-board cs-archive">
              <caption>자료 목록. 자료 이름을 누르면 미리보기가 열림</caption>
              <colgroup><col style={{ width: '9%' }} /><col style={{ width: '16%' }} /><col /><col style={{ width: '16%' }} /><col style={{ width: '16%' }} /></colgroup>
              <thead><tr><th scope="col">번호</th><th scope="col">구분</th><th scope="col">자료 이름</th><th scope="col">형식</th><th scope="col">등록일</th></tr></thead>
              <tbody>
                {list.length === 0 ? (<tr><td colSpan={5} className="cs-empty">맞는 자료가 없음</td></tr>) : list.map((a) => (
                  <tr key={a.id} className={a.id === sel ? 'is-sel' : ''}>
                    <td>{a.no}</td>
                    <td><Badge tone={TONE[a.kind]}>{a.kind}</Badge></td>
                    <td className="ta-l"><button type="button" className="cs-row-btn" aria-pressed={a.id === sel} onClick={() => setSel(a.id)}>{a.title}</button></td>
                    <td>{a.fmt}</td>
                    <td>{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="cs-detail" aria-labelledby="arc-detail-h">
            <div className="cs-detail-head"><Badge tone={TONE[cur.kind]}>{cur.kind}</Badge><h2 id="arc-detail-h" className="cs-h3">{cur.title}</h2></div>
            <p className="cs-lead">{cur.desc}</p>
            <h3 className="cs-h4">첨부파일</h3>
            <ul className="cs-files">
              {cur.files.map((f) => (
                <li key={f.name}>
                  <i className="svg-icon ico-file" aria-hidden="true" />
                  <span className="n">{f.name}</span>
                  <span className="m">{f.meta}</span>
                  {f.type === 'link' ? <a className="krds-btn small secondary" href={f.href} target="_blank" rel="noreferrer">열기 <i className="svg-icon ico-go" /></a> : null}
                  {f.type === 'route' ? <a className="krds-btn small secondary" href={f.to}>이동</a> : null}
                </li>
              ))}
            </ul>
            <h3 className="cs-h4">미리보기</h3>
            <div className={`cs-previews${cur.preview.length > 1 ? ' two' : ''}${cur.id === 'report' ? ' doc' : ''}`}>
              {cur.preview.map((p) => (
                p.crop ? <Shot key={p.cap} {...p.crop} cap={p.cap} /> : (
                  <figure key={p.cap} className="cs-shot">
                    <div className="cs-img-box"><img src={IMG(p.src)} alt={p.cap} /></div>
                    <figcaption className="cs-cap">{p.cap}</figcaption>
                  </figure>
                )
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
