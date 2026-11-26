// 업무 분야 필터 재현 화면. 분야 12개는 배포 화면의 목록 그대로다.
// 자동 재생: 커서가 회계/예산/출장 칸으로 가서 선택하고, 목록이 그 분야만 남게 줄었다가 다시 전체로 돌아온다.
import { useEffect, useRef, useState } from 'react';
import { useInView, REDUCED } from './auto.js';

const FIELDS = ['문서/보고서', '회계/예산/출장', '민원/복지/상담', '인사/교육', '시설/안전/재난', '데이터/통계/분석', '법령/규제/감사', '엑셀/사무 자동화', '생성형 AI/챗봇/검색', '영상/이미지/음성', '개발/보안/인프라', '기타'];
const PICK = '회계/예산/출장';

const LIST = [
  { t: '행안부 예산 자료저장소', d: '행정안전부 세출예산서를 웹에서 검색하고 한글 원본도 내려받는 예산 대시보드', f: '회계/예산/출장' },
  { t: '여비업무통합도우미', d: '공무원 자가용 출장 여비 계산과 출장비 품의 문안 작성을 돕는 Windows 시제품', f: '회계/예산/출장' },
  { t: '공공맛집지도_ALIOOLIO', d: '공공기관이 공개한 업무추진비 결제 기록을 식당 위치와 맞춰 보여 주는 지도', f: '회계/예산/출장' },
  { t: 'kordoc', d: 'HWP, HWPX, PDF, Office 문서를 Markdown으로 바꾸는 문서 변환 도구', f: '문서/보고서' },
  { t: '한글 AI 도우미', d: '웹한글 기안기 옆에서 보고서 양식 세팅과 본문 작성을 돕는 크롬 확장', f: '문서/보고서' },
  { t: 'AI 기반 온나라 미분류 문서 자동배부 시스템', d: '미분류 문서를 담당 부서로 나눠 보내는 자동 배부 도구', f: '민원/복지/상담' },
];

export default function FieldFilter() {
  const wrap = useRef(null);
  const live = useInView(wrap, 0.3);
  const [on, setOn] = useState(false);
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    if (!live || REDUCED()) { if (REDUCED()) setOn(true); return undefined; }
    let stop = false; const ts = [];
    const wait = (ms) => new Promise((r) => ts.push(setTimeout(r, ms)));
    (async () => {
      while (!stop) {
        setOn(false); setCursor(false);
        await wait(1200);
        setCursor(true);
        await wait(700);
        setOn(true);
        await wait(3200);
        setCursor(false);
        await wait(900);
      }
    })();
    return () => { stop = true; ts.forEach(clearTimeout); };
  }, [live]);

  const rows = on ? LIST.filter((x) => x.f === PICK) : LIST;

  return (
    <div className="browser filter-demo" ref={wrap} role="group" aria-label="업무 분야 필터 재현 화면">
      <div className="addr">
        <div className="url"><span className="host">hyunho2378.github.io/ai-public-gitlab/projects</span><span className="qs">{on ? <>?field=<em>{PICK}</em></> : null}</span></div>
        <span className="addr-tag t-cap">자동 재생</span>
      </div>
      <div className="page two">
        <div className="fields">
          <h5>업무 분야</h5>
          <ul>
            {FIELDS.map((f) => (
              <li key={f} className={f === PICK && on ? 'on' : ''}>
                <span className={`tick${f === PICK && on ? ' on' : ''}`} aria-hidden="true" />
                {f}
                {f === PICK && cursor ? <i className="cursor" aria-hidden="true" /> : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="rows">
          <p className="summary">{on ? `분야 ${PICK}, 결과 3개` : '분야 전체, 자료 기준 2026. 10. 30. 수집'}</p>
          {rows.map((r) => (
            <div className="res in" key={r.t}>
              <b>{r.t}</b>
              <span className="badge code">{r.f}</span>
              <p>{r.d}</p>
            </div>
          ))}
          <p className="hint">{on ? '도구 이름을 몰라도 분야에서 출장 도구를 찾는 장면' : '분야를 고르면 그 분야 도구만 남음'}</p>
        </div>
      </div>
    </div>
  );
}
