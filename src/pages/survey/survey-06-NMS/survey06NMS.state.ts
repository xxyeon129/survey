import { atom, atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'survey-06-NMS',
});

// 'section{sectionNumber}'<string>
export const sectionScoreState = atomFamily({
  key: 'sectionScore',
  default: '-',
  effects_UNSTABLE: [persistAtom],
});

// questionNumber<number>
export const questionScoreState = atomFamily({
  key: 'questionScore',
  default: '-',
  effects_UNSTABLE: [persistAtom],
});

export const totalScoreState = atom({
  key: 'totalScore',
  default: '-',
  effects_UNSTABLE: [persistAtom],
});
