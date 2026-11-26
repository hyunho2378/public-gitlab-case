import { NEWS } from '../data.js';
import { Badge } from '../ui.jsx';
import SideNav from './SideNav.jsx';

const TONE = { 자료: 'bg-light-primary', 조사: 'bg-light-gray', 점검: 'bg-light-warning' };

export default function News() {
  return (
    <div className="cs-wrap">
      <nav className="krds-breadcrumb-wrap" aria-label="현재 경로">
        <ol className="breadcrumb">
          <li className="home"><a href="#/" className="txt">홈</a></li>
          <li><a href="#/news" className="txt">알림마당</a></li>
          <li><a href="#/news" className="txt">진행 기록</a></li>
        </ol>
      </nav>
      <div className="cs-sub-layout">
        <SideNav title="알림마당" items={[{ id: 'log', label: '진행 기록', to: '#/news' }]} current="log" />
        <div className="cs-sub-main">
          <h1 className="cs-h1">진행 기록</h1>
          <p className="cs-page-sub">조사와 수집과 자료 정리 날짜를 한 줄씩 기록.</p>
          <div className="krds-table-wrap">
            <table className="tbl col data cs-board cs-news">
              <caption>진행 기록 날짜와 구분과 내용</caption>
              <colgroup><col style={{ width: '18%' }} /><col style={{ width: '12%' }} /><col style={{ width: '34%' }} /><col /></colgroup>
              <thead><tr><th scope="col">날짜</th><th scope="col">구분</th><th scope="col">기록</th><th scope="col">내용</th></tr></thead>
              <tbody>
                {NEWS.map((n) => (
                  <tr key={n.d + n.t}>
                    <td>{n.d}</td>
                    <td><Badge tone={TONE[n.k]}>{n.k}</Badge></td>
                    <td className="ta-l"><strong>{n.t}</strong></td>
                    <td className="ta-l">{n.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
