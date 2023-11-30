import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { SURVEY_02_FG_TOTAL_PAGES } from './survey.const';

const { persistAtom } = recoilPersist({
  key: 'survey-02-FG',
});

export const haveFGSymptomState = atom({
  key: 'have-FG-symptom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const survey02FG_totalPagesState = atom({
  key: 'survey-02-FG-totalPages',
  default: SURVEY_02_FG_TOTAL_PAGES,
  effects_UNSTABLE: [persistAtom],
});
