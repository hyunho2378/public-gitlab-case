// 소개 카드 재현 화면. 피그마 A-02 Project about / 1440의 글자를 옮겼다.
// 자동 재생: 근거 줄 단추를 차례로 눌러 README 원문에서 해당 줄이 밝아지고 그 줄로 이동한다.
import { useEffect, useRef, useState } from 'react';
import { useInView, REDUCED } from './auto.js';

const README = [
  '# 문서 한방 출력',
  '',
  'PDF, 한글, 엑셀, 워드, 이미지 파일을 끌어다 놓고 한 번에 인쇄하는 도구입니다.',
  '순서대로 일괄 인쇄하는 원클릭 Windows 데스크톱 프로그램입니다.',
  '설치 없이 실행할 수 있습니다.',
  '',
  '## 이용 조건',
  'MIT',
];

const ROWS = [
  { k: '하는 일', v: 'PDF, 한글, 엑셀, 워드, 이미지 등 여러 파일을 끌어다 놓고 한 번에 인쇄하는 웹, 데스크톱 도구', badge: 'readme', lines: [3, 4] },
  { k: '실행 형태', v: '설치 필요(파이썬 등)', badge: 'code', files: 'src/main.py, README.md 외 2' },
  { k: '이용 조건', v: 'MIT', badge: 'readme', lines: [7, 8] },
  { k: '실행 방법', v: '저장소를 내려받아 개발 환경에서 실행하거나 데스크톱 앱(exe)으로 만들어 쓴다', badge: 'readme', lines: [5, 5] },
  { k: '한계', v: '정보 부족', badge: 'none', files: '확인 근거 없음' },
];

const BADGE = { readme: 'README 기반', code: '코드 추정', none: '정보 부족' };
const label = (l) => (l[0] === l[1] ? `README ${l[0]}줄` : `README ${l[0]}~${l[1]}줄`);
const JUMPABLE = ROWS.filter((r) => r.lines);

export default function EvidenceCard() {
  const [hit, setHit] = useState('하는 일');
  const box = useRef(null);
  const wrap = useRef(null);
  const lineRefs = useRef([]);
  const live = useInView(wrap, 0.3);
  const [manual, setManual] = useState(false);

  const jump = (row) => {
    setHit(row.k);
    const el = lineRefs.current[row.lines[0] - 1];
    if (el && box.current) {
      const top = el.offsetTop - box.current.offsetTop - 40;
      box.current.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!live || manual || REDUCED()) return undefined;
    let i = 0;
    const id = setInterval(() => { jump(JUMPABLE[i % JUMPABLE.length]); i += 1; }, 2200);
    jump(JUMPABLE[0]);
    i = 1;
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, manual]);

  const active = ROWS.find((r) => r.k === hit);
  const on = (n) => active && active.lines && n >= active.lines[0] && n <= active.lines[1];

  return (
    <div className="card" ref={wrap} role="group" aria-label="소개 카드 재현 화면">
      <div className="title"><i aria-hidden="true">문</i><b>문서 한방 출력</b></div>
      <p className="basis t-cap">AI 정리, 수집 README 기준 2026. 10. 30. 수집</p>
      <dl>
        {ROWS.map((r) => (
          <div className={`row${hit === r.k ? ' on' : ''}`} key={r.k}>
            <dt>{r.k}</dt>
            <dd>
              {r.v}
              <div className="ev">
                <span className={`badge ${r.badge}`}>{BADGE[r.badge]}</span>
                {r.lines ? (
                  <button type="button" className="jump" aria-pressed={hit === r.k} onClick={() => { setManual(true); jump(r); }}>
                    {label(r.lines)}
                  </button>
                ) : (
                  <span className="files">{r.files}</span>
                )}
              </div>
            </dd>
          </div>
        ))}
      </dl>
      <div className="readme-box" ref={box} data-lenis-prevent>
        <h4>README</h4>
        <ol>
          {README.map((t, i) => (
            <li key={i} ref={(el) => (lineRefs.current[i] = el)} className={on(i + 1) ? 'hit' : ''}>
              <span>{i + 1}</span>
              <code>{t || '\u00a0'}</code>
            </li>
          ))}
        </ol>
      </div>
      <p className="hint" aria-live="polite">
        {active ? `${active.k} 칸의 근거 ${label(active.lines)}` : '근거 줄 단추를 누르면 README 원문의 그 줄이 밝아짐'}
      </p>
    </div>
  );
}
