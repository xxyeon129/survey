import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import { medicineDivisionList } from '../common/components/survey-contents/survey-contents-with-medicine-effect/surveyContent.const';
import { FG_QUESTIONS, SURVEY_02_FG_STATE_KEYWORD } from './survey.const';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
} from '../survey-01-UPDRS/survey.const';

export const survey02FG_responseSelector = selector({
  key: 'survey02FG_responseStateSelector',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    const responseList = [get(responseState(`${SURVEY_02_FG_STATE_KEYWORD}-pre`))];
    for (let i = 1; i <= FG_QUESTIONS.length; i++) {
      if (takeMedicineResponse === TAKE_MEDICINE) {
        // medicine effect true response
        responseList.push(
          get(
            responseState(
              `${SURVEY_02_FG_STATE_KEYWORD}-${i}-${medicineDivisionList[0].radioBtnKeyword}`
            )
          )
        );
        // medicine effect false response
        responseList.push(
          get(
            responseState(
              `${SURVEY_02_FG_STATE_KEYWORD}-${i}-${medicineDivisionList[1].radioBtnKeyword}`
            )
          )
        );
      } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
        responseList.push(get(responseState(`${SURVEY_02_FG_STATE_KEYWORD}-${i}`)));
      }
    }
    return responseList;
  },
});
