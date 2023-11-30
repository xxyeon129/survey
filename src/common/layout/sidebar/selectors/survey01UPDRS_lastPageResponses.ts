import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
  UPDRS_QUESTIONS,
  UPDRS_QUESTIONS_PER_PAGE,
  UPDRS_TAKE_MEDICINE_QUESTIONS,
} from 'pages/survey/survey-01-UPDRS/survey.const';
import { survey01UPDRS_totalPagesState } from 'pages/survey/survey-01-UPDRS/survey01UPDRS.state';

export const survey01UPDRS_lastPageResponses = selector({
  key: 'survey01UPDRS_lastPageResponses',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    let questions = UPDRS_QUESTIONS;
    if (takeMedicineResponse === TAKE_MEDICINE) questions = UPDRS_TAKE_MEDICINE_QUESTIONS;

    const lastPageResponseList = [];
    const totalPages = get(survey01UPDRS_totalPagesState);
    const lastPageStartQuestionNumber = (totalPages - 1) * UPDRS_QUESTIONS_PER_PAGE + 1;

    for (
      let questionNumber = lastPageStartQuestionNumber;
      questionNumber <= questions.length;
      questionNumber++
    ) {
      if (takeMedicineResponse === TAKE_MEDICINE) {
        // take medicine response
        const takeMedicineResponseValue = get(
          responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${questionNumber}-${TAKE_MEDICINE}`)
        );

        lastPageResponseList.push(takeMedicineResponseValue);
      } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
        // not take medicine response
        const responseValue = get(
          responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${questionNumber}`)
        );
        lastPageResponseList.push(responseValue);
      }
    }

    return lastPageResponseList;
  },
});
