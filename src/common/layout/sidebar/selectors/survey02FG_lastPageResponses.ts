import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  MEDICINE_EFFECT_FALSE,
  MEDICINE_EFFECT_TRUE,
} from 'pages/survey/common/components/survey-contents/survey-contents-with-medicine-effect/surveyContent.const';
import {
  FG_QUESTIONS,
  HAVE_FG_SYMPTOM,
  HAVE_NO_FG_SYMPTOM,
  SURVEY_02_FG_STATE_KEYWORD,
} from 'pages/survey/survey-02-FG/survey.const';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
} from 'pages/survey/survey-01-UPDRS/survey.const';

export const survey02FG_lastPageResponses = selector({
  key: 'survey02FG_lastPageResponses',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    const preQuestion = get(responseState(`${SURVEY_02_FG_STATE_KEYWORD}-pre`));

    const lastPageResponseList = [];

    if (preQuestion === HAVE_FG_SYMPTOM) {
      for (let questionNumber = 1; questionNumber <= FG_QUESTIONS.length; questionNumber++) {
        if (takeMedicineResponse === TAKE_MEDICINE) {
          // medicine effect true response
          const haveMedicineEffectResponseValue = get(
            responseState(`${SURVEY_02_FG_STATE_KEYWORD}-${questionNumber}-${MEDICINE_EFFECT_TRUE}`)
          );
          const noMedicineEffectResponseValue = get(
            responseState(
              `${SURVEY_02_FG_STATE_KEYWORD}-${questionNumber}-${MEDICINE_EFFECT_FALSE}`
            )
          );

          lastPageResponseList.push(haveMedicineEffectResponseValue);
          lastPageResponseList.push(noMedicineEffectResponseValue);
        } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
          // medicine effect false response
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
