import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'survey-05-RBD',
});

export const surveyRespondentState = atom({
  key: 'survey-respondent',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
