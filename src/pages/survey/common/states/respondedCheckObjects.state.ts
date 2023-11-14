import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { RBD_QUESTIONS } from 'pages/survey/survey-05-RBD/survey.const';
import { SCOPA_QUESTIONS } from 'pages/survey/survey-10-SCOPA/survey.const';
import { CONSTIPATION_QUESTIONS } from 'pages/survey/survey-11-CONSTIPATION/survey.const';

const { persistAtom } = recoilPersist({
  key: 'responded-check-for-not-responded-icon',
  storage: sessionStorage,
});

export const respondedCheckObject05RBD = atom({
  key: 'responded-check-survey05RBD',
  default: Object.fromEntries(
    Array.from({ length: RBD_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const respondedCheckObject10SCOPA = atom({
  key: 'responded-check-survey10SCOPA',
  default: Object.fromEntries(
    Array.from({ length: SCOPA_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const respondedCheckObject11Constipation = atom({
  key: 'responded-check-survey11Constipation',
  default: Object.fromEntries(
    Array.from({ length: CONSTIPATION_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});
