import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'survey-02-FG',
});

export const haveFGSymptomState = atom({
  key: 'have-FG-symptom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
