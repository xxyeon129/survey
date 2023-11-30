import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { SURVEY_01_UPDRS_TOTAL_PAGES } from './survey.const';

const { persistAtom } = recoilPersist({
  key: 'survey-01-UPDRS',
});

export const survey01UPDRS_totalPagesState = atom({
  key: 'survey-01-UPDRS-totalPages',
  default: SURVEY_01_UPDRS_TOTAL_PAGES,
  effects_UNSTABLE: [persistAtom],
});
