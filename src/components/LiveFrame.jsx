// 배포 화면 칸. 먼저 실제 화면 그림을 보이고, 눌렀을 때 iframe을 불러온다(회색 뼈대 상태를 보이지 않기 위함).
import { useState } from 'react';
import { Pic } from './parts.jsx';

export const LIVE_URL = 'https://hyunho2378.github.io/ai-public-gitlab/?mode=light';

export default function LiveFrame() {
  const [on, setOn] = useState(false);
  return (
    <div className="frame">
      {on ? (
        <iframe src={LIVE_URL} title="공공 깃랩 재설계 배포 화면" />
      ) : (
        <button type="button" className="live-open" onClick={() => setOn(true)}>
          <Pic name="deploy_light_1440" alt="배포한 프로젝트 둘러보기 화면" />
          <span className="t-lead">여기를 눌러 직접 써 보세요</span>
        </button>
      )}
    </div>
  );
}
