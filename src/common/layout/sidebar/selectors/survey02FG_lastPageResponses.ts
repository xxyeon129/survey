import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  FG_QUESTIONS,
  FG_QUESTIONS_PER_PAGE,
  FG_TAKE_MEDICINE_QUESTIONS,
  HAVE_FG_SYMPTOM,
  HAVE_NO_FG_SYMPTOM,
  SURVEY_02_FG_STATE_KEYWORD,
} from 'pages/survey/survey-02-FG/survey.const';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
} from 'pages/survey/survey-01-UPDRS/survey.const';
import { survey02FG_totalPagesState } from 'pages/survey/survey-02-FG/Survey02FG.state';

export const survey02FG_lastPageResponses = selector({
  key: 'survey02FG_lastPageResponses',
  get: ({ get }) => {
    const preQuestion = get(responseState(`${SURVEY_02_FG_STATE_KEYWORD}-pre`));
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    let questions = FG_QUESTIONS;
    if (takeMedicineResponse === TAKE_MEDICINE) questions = FG_TAKE_MEDICINE_QUESTIONS;

    const lastPageResponseList = [];
    const totalPages = get(survey02FG_totalPagesState);
    const lastPageStartQuestionNumber = (totalPages - 1) * FG_QUESTIONS_PER_PAGE + 1;

    if (preQuestion === HAVE_FG_SYMPTOM) {
      for (
        let questionNumber = lastPageStartQuestionNumber;
        questionNumber <= questions.length;
        questionNumber++
      ) {
        if (takeMedicineResponse === TAKE_MEDICINE) {
          // take medicine response
          const takeMedicineResponseValue = get(
            responseState(`${SURVEY_02_FG_STATE_KEYWORD}-${questionNumber}-${TAKE_MEDICINE}`)
          );

          lastPageResponseList.push(takeMedicineResponseValue);
        } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
          // not take medicine response
          const responseValue = get(
            responseState(`${SURVEY_02_FG_STATE_KEYWORD}-${questionNumber}`)
          );
          lastPageResponseList.push(responseValue);
        }
      }
    } else if (preQuestion === HAVE_NO_FG_SYMPTOM) {
      lastPageResponseList.push(HAVE_NO_FG_SYMPTOM);
    }

    return lastPageResponseList;
  },
});
