// 공공 깃랩 사례 소개 누리집. 공공기관 누리집에서 사업을 소개하는 형식(KRDS)으로 사례를 구성한다.
// 공식 누리집 문구와 정부 인증 표시는 쓰지 않는다.
import { useEffect, useState } from 'react';
import { GNB, LIVE_URL } from './data.js';
import Home from './pages/Home.jsx';
import Intro from './pages/Intro.jsx';
import Archive from './pages/Archive.jsx';
import News from './pages/News.jsx';

function parse() {
  const h = window.location.hash.replace(/^#\/?/, '');
  const [p, t] = h.split('/');
  if (p === 'intro') return { page: 'intro', tab: ['background', 'features', 'howto', 'results'].includes(t) ? t : 'background' };
  if (p === 'archive') return { page: 'archive', tab: t || '' };
  if (p === 'news') return { page: 'news', tab: '' };
  return { page: 'home', tab: '' };
}

function Header({ route }) {
  const [open, setOpen] = useState(false);
  const activeId = route.page === 'intro' ? route.tab : route.page;
  const gnbActive = (g) => (route.page === 'intro' ? (g.id === route.tab || (g.id === 'background' && route.tab === 'results')) : g.id === route.page);
  return (
    <>
      <header id="krds-header">
        <div className="header-in">
          <div className="header-container">
            <div className="inner">
              <div className="header-branding">
                <h2 className="logo">
                  <a href="#/" className="cs-logo" aria-label="AI 정부 실험실 홈">
                    <i className="cs-logo-mark" aria-hidden="true" />
                    <span>AI 정부 실험실</span>
                  </a>
                </h2>
                <div className="header-actions">
                  <a className="krds-btn medium secondary cs-live" href={LIVE_URL} target="_blank" rel="noreferrer" title="새 창 열기">
                    웹 서비스 <i className="svg-icon ico-go" />
                  </a>
                  <button type="button" className="btn-navi all" aria-controls="cs-mobile-nav" aria-expanded={open} onClick={() => setOpen(!open)}>전체메뉴</button>
                </div>
              </div>
            </div>
          </div>
          <nav className="krds-main-menu" aria-label="주 메뉴">
            <div className="inner">
              <ul className="gnb-menu">
                {GNB.map((g) => (
                  <li key={g.id}>
                    <a href={g.to} className={`gnb-main-trigger${gnbActive(g) ? ' active' : ''}`} aria-current={gnbActive(g) ? 'page' : undefined}>{g.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {open ? (
        <nav id="cs-mobile-nav" className="cs-mobile-nav" aria-label="전체 메뉴">
          <ul>
            {GNB.map((g) => (
              <li key={g.id}><a href={g.to} className={activeId === g.id ? 'on' : ''} onClick={() => setOpen(false)}>{g.label}</a></li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}

function Footer() {
  return (
    <footer id="krds-footer">
      <div className="inner">
        <div className="cs-foot-top">
          <strong className="cs-foot-name"><i className="cs-logo-mark" aria-hidden="true" />AI 정부 실험실</strong>
          <ul className="cs-foot-links">
            <li><a href="#/intro/background">사업 소개</a></li>
            <li><a href="#/intro/features">주요 기능</a></li>
            <li><a href="#/intro/howto">이용 안내</a></li>
            <li><a href="#/archive">자료실</a></li>
            <li><a href="#/news">알림마당</a></li>
          </ul>
        </div>
        <div className="f-cnt">
          <div className="f-info">
            <ul className="info-cs">
              <li><strong className="strong">활동</strong><span className="span">2026 청년 공공 AX 서포터즈(행정안전부와 한국지능정보사회진흥원)</span></li>
              <li><strong className="strong">자료</strong><span className="span">AI를 활용한 공공서비스 직접개발 결과 보고서와 피그마 [AX.S] Public GitLab Rebuild_DS</span></li>
            </ul>
          </div>
        </div>
        <div className="f-btm">
          <div className="f-btm-text">
            <p className="cs-kogl">본 누리집은 행정안전부에서 작성하여 공공누리 제1유형으로 개방한 범정부 UI/UX 디자인시스템(KRDS)을 이용하였다.</p>
            <p className="f-copy">© 2026 공공 깃랩 AX 개선</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const onHash = () => { setRoute(parse()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <>
      <a href="#cs-main" className="cs-skip" onClick={(e) => { e.preventDefault(); document.getElementById('cs-main')?.focus(); }}>본문 바로가기</a>
      <Header route={route} />
      <main id="cs-main" tabIndex={-1}>
        {route.page === 'home' ? <Home /> : null}
        {route.page === 'intro' ? <Intro tab={route.tab} /> : null}
        {route.page === 'archive' ? <Archive /> : null}
        {route.page === 'news' ? <News /> : null}
      </main>
      <Footer />
    </>
  );
}
