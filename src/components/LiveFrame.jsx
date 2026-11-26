// 배포 화면 칸. 먼저 실제 화면 그림을 보이고, 눌렀을 때 iframe을 불러온다(회색 뼈대 상태를 보이지 않기 위함).
import { useState } from 'react';

export const LIVE_URL = 'https://hyunho2378.github.io/ai-public-gitlab/?mode=light';

export default function LiveFrame() {
  const [on, setOn] = useState(false);
  return (
    <div className="frame">
      {on ? (
        <iframe src={LIVE_URL} title="공공 깃랩 재설계 배포 화면" />
      ) : (
        <button type="button" className="live-open" onClick={() => setOn(true)}>
          <img src={`${import.meta.env.BASE_URL}img/live_poster.jpg`} width="2000" height="1250" alt="배포한 프로젝트 둘러보기 화면" loading="lazy" />
          <span className="t-lead">배포 화면 열기</span>
        </button>
      )}
    </div>
  );
}
