import { LIVE_URL, NEWS, ARCHIVE } from '../data.js';
import { Shot, Badge } from '../ui.jsx';

const SCENES = [
  { t: '업무를 문장으로 쓰면 맞는 도구가 위에 올라옴', s: '결과 한 행에 추천 이유와 분야가 함께 보임', to: '#/intro/features', more: '주요 기능 보기', shot: { src: 'an_g02.jpg', nat: [2012, 2414], crop: { x: 560, y: 380, w: 940, h: 560 } } },
  { t: '값마다 근거가 붙은 소개 카드', s: 'README 기반과 코드 추정과 정보 부족을 값 옆에 표시', to: '#/intro/features', more: '소개 카드 보기', shot: { src: 'an_a02.jpg', nat: [2012, 3478], crop: { x: 318, y: 128, w: 825, h: 630 } } },
  { t: '12개 업무 분야로 다시 설계한 목록', s: '분야와 근거 표식이 한눈에 보이는 프로젝트 둘러보기', to: '#/intro/results', more: '추진 성과 보기', shot: { src: 'an_a01.jpg', nat: [2012, 2098], crop: { x: 300, y: 120, w: 1200, h: 600 } } },
];

const QUICK = [
  { to: '#/intro/background', t: '추진 배경', s: '공개 프로젝트 직접 집계와 이용자 여정' },
  { to: '#/intro/features', t: '주요 기능', s: '업무 문장 검색에서 연결 안내까지 화면 여섯 개' },
  { to: '#/intro/howto', t: '이용 방법', s: '검색부터 공개 준비 점검까지 다섯 단계' },
  { to: '#/intro/results', t: '추진 성과', s: '목록과 현황판 재설계와 KRDS 적용' },
];

export default function Home() {
  const onSearch = (e) => { e.preventDefault(); window.open(LIVE_URL, '_blank', 'noopener'); };
  return (
    <>
      <section className="cs-hero" aria-labelledby="hero-h">
        <div className="cs-wrap cs-hero-in">
          <div className="cs-hero-text">
            <h1 id="hero-h" className="cs-hero-h">다른 기관이 만든 도구를 업무 문장으로 찾는 공공 깃랩</h1>
            <p className="cs-hero-sub">비전공 공무원이 하는 일을 문장으로 쓰면 맞는 도구와 근거를 보여 주는 웹서비스</p>
            <form className="cs-search" onSubmit={onSearch} role="search">
              <div className="form-group">
                <div className="form-tit"><label htmlFor="hero-q">찾으려는 업무 설명</label></div>
                <div className="cs-search-row">
                  <input id="hero-q" type="text" className="krds-input" defaultValue="회의록을 정리해 보고서로 옮길 때" />
                  <button type="submit" className="krds-btn large">업무 검색 <i className="svg-icon ico-sch" /></button>
                </div>
              </div>
              <p className="cs-search-hint">검색 단추를 누르면 배포한 서비스가 새 창으로 열림</p>
            </form>
          </div>
          <div className="cs-hero-shot">
            <Shot src="an_g02.jpg" nat={[2012, 2414]} crop={{ x: 300, y: 170, w: 1200, h: 760 }} />
          </div>
        </div>
      </section>


      <section className="cs-sec" aria-labelledby="scenes-h">
        <div className="cs-wrap">
          <h2 id="scenes-h" className="cs-h2">달라진 화면</h2>
          <div className="cs-scenes">
            {SCENES.map((c, i) => (
              <article className={`cs-scene${i % 2 ? ' rev' : ''}`} key={c.t}>
                <div className="cs-scene-text">
                  <h3>{c.t}</h3>
                  <p>{c.s}</p>
                  <a className="krds-btn medium text" href={c.to}>{c.more} <i className="svg-icon ico-angle right" /></a>
                </div>
                <Shot {...c.shot} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-sec soft" aria-labelledby="quick-h">
        <div className="cs-wrap">
          <h2 id="quick-h" className="cs-h2">사업 안내</h2>
          <ul className="cs-quick">
            {QUICK.map((q) => (
              <li key={q.to}>
                <a href={q.to}>
                  <strong>{q.t}</strong>
                  <span>{q.s}</span>
                  <i className="svg-icon ico-angle right" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cs-sec" aria-labelledby="concept-h">
        <div className="cs-wrap cs-concept">
          <div>
            <h2 id="concept-h" className="cs-h2">공공 깃랩은 공무원을 위한 서비스</h2>
            <p className="cs-lead">그래서 이 사례도 공공기관 누리집에서 사업을 소개하는 형식으로 구성</p>
          </div>
          <ul className="krds-info-list dash">
            <li>사업 소개는 추진 배경과 주요 기능과 이용 방법과 추진 성과 순서로 읽음</li>
            <li>추진 배경은 시빅해킹 조사 주요 기능은 AX 화면 추진 성과는 UX 재설계와 KRDS 적용</li>
            <li>자료실에서 화면 설계 자료를 미리 보고 알림마당에서 진행 기록 확인</li>
          </ul>
        </div>
      </section>

      <section className="cs-sec soft" aria-label="최근 알림과 자료">
        <div className="cs-wrap cs-two">
          <div>
            <div className="cs-list-head"><h2 className="cs-h2">알림마당</h2><a className="krds-btn small text" href="#/news">더보기 <i className="svg-icon ico-angle right" /></a></div>
            <ul className="cs-recent">
              {NEWS.slice(0, 4).map((n) => (
                <li key={n.d + n.t}><a href="#/news"><Badge tone="bg-light-gray">{n.k}</Badge><span className="t">{n.t}</span><time>{n.d}</time></a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="cs-list-head"><h2 className="cs-h2">자료실</h2><a className="krds-btn small text" href="#/archive">더보기 <i className="svg-icon ico-angle right" /></a></div>
            <ul className="cs-recent">
              {ARCHIVE.slice(0, 4).map((n) => (
                <li key={n.id}><a href="#/archive"><Badge tone="bg-light-primary">{n.kind}</Badge><span className="t">{n.title}</span><time>{n.date}</time></a></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
