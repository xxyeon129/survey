import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
  UPDRS_QUESTIONS,
} from './survey.const';
import { medicineDivisionList } from '../common/components/survey-contents/survey-contents-with-medicine-effect/surveyContent.const';

export const survey01UPDRS_responseSelector = selector({
  key: 'survey01UPDRS_responseStateSelector',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    const responseList = [takeMedicineResponse];
    for (let i = 1; i <= UPDRS_QUESTIONS.length; i++) {
      if (get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)) === TAKE_MEDICINE) {
        // medicine effect true response
        responseList.push(
          get(
            responseState(
              `${SURVEY_01_UPDRS_STATE_KEYWORD}-${i}-${medicineDivisionList[0].radioBtnKeyword}`
            )
          )
        );
        // medicine effect false response
        responseList.push(
          get(
            responseState(
              `${SURVEY_01_UPDRS_STATE_KEYWORD}-${i}-${medicineDivisionList[1].radioBtnKeyword}`
            )
          )
        );
      } else if (get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)) === NOT_TAKE_MEDICINE) {
        responseList.push(get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${i}`)));
      }
    }
    return responseList;
  },
});
