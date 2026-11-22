// 공공 깃랩 AX 개선 케이스 스터디
// 배정 사례: 플러스엑스 SKT Sphere(WFA 업무 플랫폼). 섹션 순서와 연출 값은 측정.md에 적었다.
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Pic, Shot, Marquee, Annotated } from './components/parts.jsx';
import Journey from './components/Journey.jsx';
import EvidenceCard from './components/EvidenceCard.jsx';
import SearchDemo from './components/SearchDemo.jsx';
import Widths from './components/Widths.jsx';
import Wipe from './components/Wipe.jsx';
import LiveFrame, { LIVE_URL } from './components/LiveFrame.jsx';
import FieldFilter from './components/FieldFilter.jsx';
import SimilarTools from './components/SimilarTools.jsx';
import StatusBanner from './components/StatusBanner.jsx';

gsap.registerPlugin(ScrollTrigger);

const PROBLEM_TILES = [
  { name: 'c_asis_side', pad: 73 },
  { name: 'c_asis_table2', pad: 185 },
  { name: 'c_asis_filter', pad: 11 },
  { name: 'c_asis_table', pad: 91 },
];

const DEV = [
  { b: '발견', s: '연결 안내에서 설정 복사' },
  { b: '검색', s: 'AI 코딩 도구에 개발 요청' },
  { b: '판단', s: '프로젝트 번호로 상세 조회' },
  { b: '결정', s: '재사용인지 신규 개발인지 선택' },
  { b: '기록', s: '공개 전 README 정리' },
];

function useMotion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 스크롤: Lenis(lerp 0.1)를 GSAP ticker에 묶는다. 원본 Sphere는 기본 스크롤이라 관성만 얹었다.
    const lenis = reduced ? null : new Lenis({ lerp: 0.1 });
    const raf = (t) => lenis && lenis.raf(t * 1000);
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      // 문법 1. WOW fadeInUp(animate.css 원본 translateY 50px, 1s, data-wow-offset 100)
      gsap.utils.toArray('.fx-up').forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: 'top bottom-=100', once: true, onEnter: () => el.classList.add('in') });
      });
      // 문법 2. img_big(scale 1.05에서 1, transition all ease-in-out 1s, offset 0)
      gsap.utils.toArray('.fx-big').forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: 'top bottom', once: true, onEnter: () => el.classList.add('in') });
      });
      // 문법 3. km 스크럽(scrub 1.2, start 5% 90%, end bottom 80%)을 긴 화면 훑기에 썼다
      gsap.utils.toArray('.shot.pan').forEach((frame) => {
        const img = frame.querySelector('img');
        gsap.to(img, {
          y: () => -Math.max(0, img.offsetHeight - frame.offsetHeight),
          ease: 'none',
          scrollTrigger: { trigger: frame, start: '5% 90%', end: 'bottom 20%', scrub: 1.2, invalidateOnRefresh: true },
        });
      });
      // 표지: 세 화면이 0.15s 간격으로 아래에서 올라오고(fadeInUp 1.2s power3.out), 스크롤에 따라 층마다 다른 속도로 떠오른다(km scrub 1.2)
      if (!reduced) {
        gsap.from('.cover-stage .layer', { y: 160, opacity: 0, duration: 1.2, ease: 'power3.out', stagger: 0.15, delay: 0.25 });
        [['.layer.back', -60], ['.layer.main', -140], ['.layer.front', -240]].forEach(([sel, y]) => {
          gsap.to(`${sel} .shot`, { y, ease: 'none', scrollTrigger: { trigger: '#cover', start: 'top top', end: 'bottom top', scrub: 1.2 } });
        });
      }
      // 머리글: 표지를 지나면 나타나고 진행 막대를 채운다
      ScrollTrigger.create({
        trigger: '#cover', start: 'bottom 80px', end: 'max',
        onToggle: (s) => document.querySelector('.top')?.classList.toggle('on', s.isActive),
      });
      gsap.to('.top .bar', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
    });

    // 문법 4. km fadein-group, badge(IntersectionObserver threshold 0.05, 한 번만)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.05 });
    document.querySelectorAll('.fx-group, .lane, .anno').forEach((el) => io.observe(el));

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const imgs = [...document.images];
    imgs.forEach((im) => im.complete || im.addEventListener('load', () => ScrollTrigger.refresh(), { once: true }));
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('load', onLoad);
      io.disconnect();
      ctx.revert();
      if (lenis) { gsap.ticker.remove(raf); lenis.destroy(); }
    };
  }, []);
}

export default function App() {
  useMotion();
  return (
    <>
      <header className="top" aria-label="머리글">
        <div className="wrap">
          <b>공공 깃랩 AX 개선</b>
          <a href={LIVE_URL} target="_blank" rel="noreferrer">배포 화면 새 창으로 열기</a>
        </div>
        <span className="bar" aria-hidden="true" />
      </header>

      <main>
        {/* 1 표지 */}
        <section id="cover" className="cover" aria-label="표지">
          <div className="meta">
            <div className="wrap">
              <p className="fx-up">공공 깃랩 AX 개선<br />UX 재설계<br />2026</p>
              <p className="fx-up">AI 정부 실험실<br />공공 깃랩</p>
            </div>
          </div>
          <div className="wrap cover-title">
            <h1 className="t-cover fx-up">공공 깃랩 업무 검색</h1>
          </div>
          <div className="cover-stage">
            <div className="layer back"><div className="shot"><Pic name="c_g02_top" alt="업무 검색 화면" eager /></div></div>
            <div className="layer main"><div className="shot"><Pic name="c_a01_top" alt="프로젝트 둘러보기 화면" eager /></div></div>
            <div className="layer front"><div className="shot"><Pic name="c_a02_card" alt="근거 표식이 붙은 소개 카드" eager /></div></div>
          </div>
        </section>

        {/* 2 소개 */}
        <section className="intro" aria-labelledby="intro-h">
          <div className="wrap fx-up">
            <h2 id="intro-h" className="t-display">공공 깃랩<span className="num">KRDS</span></h2>
            <div className="t-body muted">
              <p>다른 기관이 만든 업무 도구를 찾는 공무원이 쓰는 웹서비스입니다. 여비 담당자가 출장비 계산을 입력하면 관련 프로젝트가 먼저 나옵니다. 소개 카드에서 용도와 실행 형태를 봅니다. README 원문에는 설치 방법이 적혀 있습니다.</p>
              <p>개발자는 같은 프로젝트의 파일과 변경 이력을 엽니다. 화면은 범정부 디자인 시스템(KRDS)으로 다시 설계했습니다.</p>
            </div>
          </div>
        </section>

        {/* 3 좌우 분할 */}
        <section className="split" aria-label="기존 현황판과 다시 설계한 화면">
          <figure>
            <div className="in-img fx-big"><Pic name="c_asis_side" alt="기존 현황판 왼쪽 필터" /></div>
            <figcaption className="t-cap">기존 현황판 2026. 11. 7.</figcaption>
          </figure>
          <figure>
            <div className="in-img fx-big"><Pic name="c_a01_rows4" alt="다시 설계한 프로젝트 목록" /></div>
            <figcaption className="t-cap">다시 설계한 프로젝트 둘러보기</figcaption>
          </figure>
        </section>

        {/* 4 문제 */}
        <section className="problem" aria-labelledby="problem-h">
          <div className="wrap head fx-up">
            <h2 id="problem-h" className="t-title">이름만으로 용도를 모릅니다</h2>
            <p className="t-body muted">2026. 10. 25. 기준으로 공개 프로젝트 671개를 셌습니다. 분야 표시가 없는 프로젝트는 412개였습니다. 설명이 빈 프로젝트는 273개였습니다. 엑셀 도구는 23개 계정에서 따로 올라왔습니다.</p>
            <p className="src">출처: 공개 프로젝트 671개 직접 집계(2026. 10. 25.)</p>
          </div>
          <div className="scene">
            <Marquee
              items={PROBLEM_TILES}
              render={(it) => (
                <div style={{ paddingTop: `clamp(0px, ${(it.pad / 19.2).toFixed(2)}vw, ${it.pad}px)` }}>
                  <Pic name={it.name} alt="" style={{ height: 'clamp(200px, 24vw, 440px)', width: 'auto' }} />
                </div>
              )}
            />
            <div className="frame">
              <div className="fx-big"><Shot name="c_asis_cards" alt="기존 현황판 최근 활동 프로젝트 카드" /></div>
              <span className="cap t-cap">기존 현황판 최근 활동 프로젝트 2026. 11. 7.</span>
            </div>
          </div>
        </section>

        {/* 5 조사 */}
        <section className="research" aria-labelledby="research-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="research-h" className="t-title">GitHub와 같은 질문으로 비교했습니다</h2>
              <p className="t-body muted">두 화면에서 같은 도구를 찾았습니다. 막히는 지점은 화면 위에 표시했습니다.</p>
            </div>
            <div className="asis-pair fx-up">
              <Annotated name="c_asis_filter" alt="기존 현황판 왼쪽 필터" legend={false}
                notes={[{ x: 6, y: 15, w: 87, h: 16, t: '' }, { x: 6, y: 62, w: 87, h: 16, t: '' }]} />
              <Annotated name="c_asis_table" alt="기존 현황판 프로젝트 표" start={3} legend={false}
                notes={[{ x: 40, y: 10, w: 18, h: 68, t: '' }, { x: 30, y: 82, w: 9, h: 7, t: '' }]} />
            </div>
            <div className="notes-with-shot">
              <ol className="notes fx-group">
                <li><i>1</i><p className="t-body">분야 필터 35개에 시험용 값이 섞여 있었습니다. 미분류는 필터에 없었습니다.</p></li>
                <li><i>2</i><p className="t-body">검색어를 바꿔도 주소가 그대로입니다. 같은 결과는 동료에게 보낼 수 없었습니다.</p></li>
                <li><i>3</i><p className="t-body">설명 칸 글자는 11~13px입니다. KRDS 권고 16px보다 작습니다.</p></li>
                <li><i>4</i><p className="t-body">분야를 적지 않은 프로젝트는 미분류로 표시됩니다.</p></li>
              </ol>
              <figure className="fx-up">
                <div className="shot"><Pic name="c_asis_table2" alt="기존 현황판 프로젝트 표 가운데 설명 칸" /></div>
                <figcaption className="cap t-cap">기존 현황판 설명 칸, 2026. 11. 7.</figcaption>
              </figure>
            </div>
            <p className="src">출처: 현황판 직접 확인(2026. 10. 2.), 화면은 2026. 11. 7.</p>
          </div>
          <div className="wrap gh fx-up">
            <p className="addr t-cap">github.com/search?q=출장비&amp;type=repositories</p>
            <Annotated name="c_gh" alt="GitHub 저장소 검색 결과" start={5}
              notes={[
                { x: 9, y: 2.5, w: 90, h: 6.5, t: 'GitHub는 검색어가 주소의 q 값으로 들어갑니다. 새로고침해도 같은 결과가 열립니다.' },
                { x: 73, y: 15.5, w: 15, h: 5.5, t: '정렬을 바꾸면 주소의 정렬 값도 바뀝니다.' },
              ]}
              cap="GitHub 저장소 검색 2026. 11. 22. 검색어 출장비" />
            <div className="readme">
              <h3 className="t-sub">README 전수 분석</h3>
              <p className="t-body muted">공개 프로젝트 695개의 README를 모두 읽었습니다. 실행 환경을 적은 곳은 21.3%입니다. 라이선스가 없는 곳은 61.3%입니다.</p>
              <p className="src">출처: 공개 프로젝트 README 전수 분석(2026. 10. 25.)</p>
            </div>
          </div>
        </section>

        {/* 6 여정 */}
        <section className="journey" aria-labelledby="journey-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="journey-h" className="t-title">여정을 둘로 나눠 그렸습니다</h2>
              <p className="t-body muted">비전공 공무원은 업무 문장으로 찾습니다. 단계를 누르면 그 단계 화면이 열립니다.</p>
            </div>
            <div className="fx-up"><Journey /></div>
            <div className="lane dev">
              <h3 className="t-sub">개발자</h3>
              <p className="t-body muted lane-lead">AI 코딩 도구 안에서 같은 프로젝트를 조회합니다. 재사용인지 신규 개발인지 고릅니다.</p>
              <div className="track fx-group">
                <span className="rail" aria-hidden="true"><i /></span>
                {DEV.map((s) => (
                  <div className="stage-step" key={s.b}>
                    <b>{s.b}</b>
                    <span className="t-body">{s.s}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="src">출처: 피그마 블루프린트 공무원 여정과 개발자 여정</p>
          </div>
          <figure className="ia fx-up">
            <Pic name="ia01_map" alt="피그마 정보 구조 지도" />
            <figcaption className="wrap cap t-cap">피그마 정보 구조 지도 IA-01</figcaption>
          </figure>
        </section>

        {/* 7 콘셉트 */}
        <section className="concept" aria-labelledby="concept-h">
          <div className="wrap">
            <h2 id="concept-h" className="t-hero fx-up">업무 문장으로 찾습니다</h2>
            <p className="body t-body muted fx-up">기본 구성은 그대로 두고 화면만 KRDS로 새로 만들었습니다. GitLab은 저장과 API 엔진으로 남겼습니다.</p>
            <div className="fx-up">
              <Annotated name="c_g02_top" alt="업무 검색 화면" className="side-notes"
                notes={[
                  { x: 20, y: 26.5, w: 71, h: 6, t: '찾으려는 업무를 문장으로 씁니다. 도구 이름을 몰라도 됩니다.' },
                  { x: 20, y: 35.5, w: 17, h: 46, t: '기관마다 다른 주제는 12개 업무 분야로 묶었습니다.' },
                  { x: 86.5, y: 43, w: 9.5, h: 3.5, t: '결과마다 README 기반 표식이 붙습니다.' },
                  { x: 38.5, y: 48.5, w: 17, h: 3.5, t: '추천 이유가 한 줄로 보입니다.' },
                ]} />
            </div>
          </div>
          <Marquee className="concept-strip"
            items={[{ n: 'c_g02_focus' }, { n: 'c_a02_card' }, { n: 'c_a01_filter' }, { n: 'c_a02_similar' }, { n: 'c_a02_tried' }, { n: 'c_d01_metrics' }]}
            render={(it) => (<div className="shot"><Pic name={it.n} alt="" /></div>)} />
        </section>

        {/* 8 데모 1. 업무 문장 검색 */}
        <section className="d2" aria-labelledby="d2-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="d2-h" className="t-title">업무 문장을 그대로 입력합니다</h2>
              <p className="t-body">출장 여비 정산을 입력하면 출장비 정산 도우미가 첫 결과로 나옵니다. 검색어는 주소에 남아 새로고침해도 같은 결과가 열립니다.</p>
            </div>
            <div className="demo-wide fx-up">
              <SearchDemo />
              <p className="note t-cap">자동 재생. 입력과 결과 등장이 스스로 반복됩니다.</p>
            </div>
            <div className="img1">
              <div className="fx-up">
                <h3 className="t-lead">추천 이유가 붙은 결과</h3>
                <p className="t-body">결과마다 왜 나왔는지 한 줄이 붙습니다. 업무 문장 19개 중 18개에서 상위 다섯 안에 맞는 도구가 나왔습니다.</p>
                <p className="src">출처: 업무 문장 검색 시험(2026. 10. 28.)</p>
              </div>
              <div className="fx-up"><Shot name="c_g02_top2" alt="업무 검색 결과 두 건" /></div>
            </div>
          </div>
        </section>

        {/* 9 데모 2. 업무 분야 분류 */}
        <section className="fields-sec" aria-labelledby="fields-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="fields-h" className="t-title">분야를 고르면 도구만 남습니다</h2>
              <p className="t-body muted">기관마다 다르게 적은 주제를 12개 공통 업무 분야로 묶었습니다. 프로젝트 하나에 분야는 둘까지 붙습니다. 여비 담당자는 회계 분야에서 출장 도구를 찾습니다.</p>
            </div>
            <div className="demo-wide fx-up">
              <FieldFilter />
              <p className="note t-cap">자동 재생. 회계 분야를 고르고 목록이 줄어듭니다.</p>
            </div>
          </div>
        </section>

        {/* 10 데모 3. 소개 카드 근거 */}
        <section className="d1" aria-labelledby="d1-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="d1-h" className="t-title">카드 한 줄마다 출처가 붙습니다</h2>
              <p className="t-body muted">AI가 README를 읽습니다. 쓰임새와 실행 형태, 이용 조건을 같은 형식으로 정리합니다. 근거 줄 번호는 원문 길이와 대조합니다. 근거가 없으면 칸을 비웁니다.</p>
            </div>
            <div className="stage">
              <div className="fx-up"><EvidenceCard /></div>
              <div className="right fx-up">
                <p className="t-lead">자동 재생</p>
                <p className="t-body muted" style={{ marginTop: 12 }}>근거 줄 단추가 차례로 눌리고 README 원문에서 그 줄이 밝아집니다. 한계 칸은 근거가 없어 정보 부족으로 남습니다.</p>
              </div>
            </div>
            <figure className="readme-shot fx-up">
              <div className="shot"><Pic name="c_a02_readme" alt="피그마 소개 카드 README 상자" /></div>
              <figcaption className="cap t-cap">피그마 소개 카드 README 상자, 근거 줄 3~5 표시</figcaption>
            </figure>
          </div>
        </section>

        {/* 11 전체 폭 그림 */}
        <section className="full" aria-label="배포 화면 1920px">
          <div className="fx-big"><Pic name="deploy_1920" alt="1920px 폭으로 연 배포 화면" /></div>
        </section>

        {/* 12 데모 4. 비슷한 도구 */}
        <section className="sim-sec" aria-labelledby="sim-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="sim-h" className="t-title">비슷한 도구를 먼저 보여 줍니다</h2>
              <p className="t-body">프로젝트 이름과 카드의 업무 설명이 겹치면 비슷한 도구로 묶습니다. 보고 있는 프로젝트는 후보에서 빠집니다.</p>
            </div>
            <div className="demo-wide fx-up">
              <SimilarTools />
              <p className="note t-cap">자동 재생. 후보가 하나씩 올라오고 차이 줄이 따라 붙습니다.</p>
            </div>
          </div>
        </section>

        {/* 13 데모 5. 점검 중 안내 */}
        <section className="status-sec" aria-labelledby="status-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="status-h" className="t-title">점검 중에도 목록이 열립니다</h2>
              <p className="t-body muted">공공 깃랩이 점검에 들어가면 저장 자료로 목록을 보여 줍니다. 머리 띠에 점검 안내가 뜹니다. 자료 시점도 함께 적습니다.</p>
            </div>
            <div className="demo-wide fx-up">
              <StatusBanner />
              <p className="note t-cap">자동 재생. 실시간 조회가 멈추면 안내 띠가 내려옵니다.</p>
            </div>
          </div>
        </section>

        {/* 14 데모 6. 화면 폭 */}
        <section className="d3" aria-labelledby="d3-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="d3-h" className="t-title">화면 폭 다섯 단계</h2>
              <p className="t-body muted">360부터 1,920px까지 메뉴와 본문 배치를 정했습니다. 폭이 스스로 바뀌고 단추를 누르면 그 폭에서 멈춥니다.</p>
            </div>
            <div className="fx-up"><Widths /></div>
            <div className="grid2">
              <div className="fx-up">
                <h3 className="t-lead">좁은 화면 메뉴</h3>
                <p className="t-body muted">360px에서는 왼쪽 메뉴가 서랍으로 접힙니다. 검색칸은 두 줄로 나뉩니다.</p>
              </div>
              <div className="phones fx-up">
                <Shot name="deploy_360" alt="360px 폭 배포 화면" />
                <Shot name="deploy_768" alt="768px 폭 배포 화면" />
              </div>
            </div>
          </div>
        </section>

        {/* 15 현황판 */}
        <section className="board" aria-labelledby="board-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="board-h" className="t-title">분야 행을 누르면 목록이 열립니다</h2>
              <p className="t-body muted">현황판은 분야 확정과 카드 생성 상태를 줄로 나눠 보여 줍니다.</p>
            </div>
          </div>
          <div className="board-wide fx-up">
            <Annotated name="c_d01_ab" alt="분야별 현황판 지표 A와 지표 B"
              notes={[{ x: 50.5, y: 36, w: 49.5, h: 50, t: '분야 한 줄을 누르면 그 분야 목록이 열립니다.' }]}
              cap="분야별 현황판 지표 A와 지표 B" />
          </div>
          <div className="wrap">
            <div className="img2 fx-up">
              <Shot name="c_a01_rows4" alt="분야 표시가 붙은 프로젝트 둘러보기 목록" />
              <span className="cap t-cap">분야 행에서 이어지는 프로젝트 둘러보기</span>
            </div>
          </div>
        </section>

        {/* 16 어두운 화면 */}
        <section className="elements dark" aria-labelledby="elements-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="elements-h" className="t-title">어두운 화면을 더했습니다</h2>
              <p className="t-body">KRDS에 없는 어두운 화면은 결정 기록으로 남겼습니다. 바탕은 #131416이고 본문 대비는 16.89:1입니다.</p>
            </div>
            <figure className="decnote fx-up">
              <Shot name="c_dec" alt="피그마 결정 기록 D-01 어두운 화면" pan />
              <figcaption className="cap t-cap">피그마 결정 기록 D-01</figcaption>
            </figure>
            <div className="d-head fx-up wipe-head">
              <h3 className="t-sub">밝은 화면과 어두운 화면</h3>
              <p className="t-body">두 화면은 같은 배치입니다. 좌우로 끌어 비교해 보세요.</p>
            </div>
            <Wipe />
          </div>
        </section>

        {/* 17 디자이너가 한 일 */}
        <section className="role-sec" aria-labelledby="role-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="role-h" className="t-title">디자이너가 한 일</h2>
              <p className="t-body muted">피그마에서 KRDS로 목록과 카드 배치를 설계했습니다. 화면 크기에 따라 메뉴와 본문이 바뀌는 방식을 정리했습니다. 카드 근거 표시와 분야별 현황판을 그렸습니다. 공통 문구와 부품도 맞췄습니다. 코드 검토도 함께 맡았습니다.</p>
            </div>
            <div className="role-grid">
              <figure className="fx-up">
                <Shot name="a01_list" alt="피그마 프로젝트 목록 설계" pan />
                <figcaption className="cap t-cap">피그마 목록 설계 A-01</figcaption>
              </figure>
              <figure className="fx-up">
                <Shot name="a02_evidence" alt="피그마 소개 카드 근거 표시 설계" pan />
                <figcaption className="cap t-cap">피그마 소개 카드 근거 표시 A-02</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 18 얻어낸 것 */}
        <section className="learn-sec" aria-labelledby="learn-h">
          <div className="wrap">
            <div className="d-head fx-up">
              <h2 id="learn-h" className="t-title">카드 한 줄에도 출처가 필요합니다</h2>
              <p className="t-body">실행 형태와 이용 조건을 나눠 적었습니다. 웹에서 바로 여는 도구와 설치가 필요한 도구를 갈라 안내합니다. 점검이 길어질 때는 이용자가 보는 자료의 시점을 먼저 알려야 합니다.</p>
            </div>
            <div className="next fx-up">
              <h3 className="t-sub">다음 단계</h3>
              <p className="t-body">실제 업무 표현 20개로 상위 다섯 후보를 견줍니다. 출장비 계산과 여비 정산처럼 다른 말도 같은 도구로 이어 줍니다. 분야별 표본 50건을 원문과 대조합니다. 원본 문서가 바뀐 카드부터 다시 만듭니다.</p>
            </div>
            <div className="fx-big learn-shot"><Pic name="deploy_dark_1440" alt="어두운 화면으로 연 배포 화면" /></div>
          </div>
        </section>

        {/* 19 직접 써 보기 */}
        <section className="live" aria-labelledby="live-h">
          <div className="wrap">
            <div className="top-row fx-up">
              <div className="d-head">
                <h2 id="live-h" className="t-title">직접 써 보기</h2>
                <p className="t-body muted">2026. 10. 30. 저장 자료로 열리는 배포 화면입니다.</p>
              </div>
              <a className="t-body" href={LIVE_URL} target="_blank" rel="noreferrer">새 창으로 열기</a>
            </div>
            <LiveFrame />
          </div>
        </section>

        {/* 20 결과와 크레딧 */}
        <section className="end" aria-labelledby="end-h">
          <div className="wrap">
            <p className="closing t-closing fx-up">2026. 10. 30. 수집본 728건 가운데 172건은 AI 요약과 근거 줄로 정리했습니다. 기관마다 다른 주제는 12개 업무 분야로 묶었습니다.</p>
            <div className="end-grid fx-up">
              <h2 id="end-h" className="t-sub">공공 깃랩 KRDS 재설계</h2>
              <dl className="credit">
                <dt>활동</dt>
                <dd>2026 청년 공공 AX 서포터즈(행정안전부, 한국지능정보사회진흥원)</dd>
                <dt>자료</dt>
                <dd>AI를 활용한 공공서비스 직접개발 결과 보고서, 피그마 [AX.S] Public GitLab Rebuild_DS</dd>
              </dl>
            </div>
            <p className="copy">© 2026 공공 깃랩 AX 개선</p>
          </div>
        </section>
      </main>
    </>
  );
}
