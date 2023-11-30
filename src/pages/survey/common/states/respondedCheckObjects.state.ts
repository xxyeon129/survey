import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { RBD_QUESTIONS } from 'pages/survey/survey-05-RBD/survey.const';
import { SCOPA_QUESTIONS } from 'pages/survey/survey-10-SCOPA/survey.const';
import { CONSTIPATION_QUESTIONS } from 'pages/survey/survey-11-CONSTIPATION/survey.const';
import { BAI_QUESTIONS } from 'pages/survey/survey-03-BAI/survey.const';
import { TIRED_QUESTIONS } from 'pages/survey/survey-09-TIRED/survey.const';
import { PDQ_QUESTIONS } from 'pages/survey/survey-07-PDQ/survey.const';
import { FOOD_QUESTIONS } from 'pages/survey/survey-12-FOOD/survey.const';
import {
  TAKE_MEDICINE,
  UPDRS_QUESTIONS,
  UPDRS_TAKE_MEDICINE_QUESTIONS,
} from 'pages/survey/survey-01-UPDRS/survey.const';
import { FG_QUESTIONS, FG_TAKE_MEDICINE_QUESTIONS } from 'pages/survey/survey-02-FG/survey.const';
import { BDI_QUESTIONS } from 'pages/survey/survey-04-BDI/survey.const';
import { NMS_QUESTIONS } from 'pages/survey/survey-06-NMS/survey.const';
import { PDSS_QUESTIONS } from 'pages/survey/survey-08-PDSS/survey.const';

const { persistAtom } = recoilPersist({
  key: 'responded-check-for-not-responded-icon',
  storage: sessionStorage,
});

export const respondedCheckObject01UPDRS = atom({
  key: 'responded-check-survey01UPDRS',
  default: Object.fromEntries(
    Array.from({ length: UPDRS_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const takeMedicineRespondedCheckObject01UPDRS = atom({
  key: 'take-medicine-responded-check-01UPDRS',
  default: Object.fromEntries(
    Array.from({ length: UPDRS_TAKE_MEDICINE_QUESTIONS.length }, (_, index) => [
      `${index + 1}-${TAKE_MEDICINE}`,
      false,
    ])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const respondedCheckObject02FG = atom({
  key: 'responded-check-survey02FG',
  default: Object.fromEntries(
    Array.from({ length: FG_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const takeMedicineRespondedCheckObject02FG = atom({
  key: 'take-medicine-responded-check-02FG',
  default: Object.fromEntries(
    Array.from({ length: FG_TAKE_MEDICINE_QUESTIONS.length }, (_, index) => [
      `${index + 1}-${TAKE_MEDICINE}`,
      false,
    ])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const respondedCheckObject03BAI = atom({
  key: 'responded-check-survey03BAI',
  default: Object.fromEntries(
    Array.from({ length: BAI_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const respondedCheckObject04BDI = atom({
  key: 'responded-check-survey04BDI',
  default: Object.fromEntries(
    Array.from({ length: BDI_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const respondedCheckObject05RBD = atom({
  key: 'responded-check-survey05RBD',
  default: Object.fromEntries(
    Array.from({ length: RBD_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const respondedCheckObject06NMS = atom({
  key: 'responded-check-survey06NMS',
  default: Object.fromEntries(
    Array.from({ length: NMS_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const respondedCheckObject07PDQ = atom({
  key: 'responded-check-survey07PDQ',
  default: Object.fromEntries(
    Array.from({ length: PDQ_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const respondedCheckObject08PDSS = atom({
  key: 'responded-check-survey08PDSS',
  default: Object.fromEntries(
    Array.from({ length: PDSS_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});

export const respondedCheckObject09Tired = atom({
  key: 'responded-check-survey09Tired',
  default: Object.fromEntries(
    Array.from({ length: TIRED_QUESTIONS.length }, (_, index) => [index + 1, false])
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

export const respondedCheckObject12Food = atom({
  key: 'responded-check-survey12Food',
  default: Object.fromEntries(
    Array.from({ length: FOOD_QUESTIONS.length }, (_, index) => [index + 1, false])
  ),
  effects_UNSTABLE: [persistAtom],
});
