import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { medicineDivisionList } from 'pages/survey/common/components/survey-contents/survey-contents-with-medicine-effect/surveyContent.const';

import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
  UPDRS_QUESTIONS,
  UPDRS_QUESTIONS_PER_PAGE,
} from 'pages/survey/survey-01-UPDRS/survey.const';

export const survey01UPDRS_lastPageResponses = selector({
  key: 'survey01UPDRS_lastPageResponses',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));

    const lastPageResponseList = [];
    const lastPageStartQeustionNumber =
      UPDRS_QUESTIONS.length - (UPDRS_QUESTIONS.length % UPDRS_QUESTIONS_PER_PAGE) + 1;

    for (
      let questionNumber = lastPageStartQeustionNumber;
      questionNumber <= UPDRS_QUESTIONS.length;
      questionNumber++
    ) {
      if (takeMedicineResponse === TAKE_MEDICINE) {
        // medicine effect true response
        const haveMedicineEffectResponseValue = get(
          responseState(
            `${SURVEY_01_UPDRS_STATE_KEYWORD}-${questionNumber}-${medicineDivisionList[0].radioBtnKeyword}`
          )
        );
        const noMedicineEffectResponseValue = get(
          responseState(
            `${SURVEY_01_UPDRS_STATE_KEYWORD}-${questionNumber}-${medicineDivisionList[1].radioBtnKeyword}`
          )
        );

        lastPageResponseList.push(haveMedicineEffectResponseValue);
        lastPageResponseList.push(noMedicineEffectResponseValue);
      } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
        // medicine effect false response
        const responseValue = get(
          responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${questionNumber}`)
        );
        lastPageResponseList.push(responseValue);
      }
    }

    return lastPageResponseList;
  },
});
