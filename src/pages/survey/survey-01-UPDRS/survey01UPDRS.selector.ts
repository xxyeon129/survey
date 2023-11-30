import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
  UPDRS_QUESTIONS,
  UPDRS_TAKE_MEDICINE_QUESTIONS,
} from './survey.const';

export const survey01UPDRS_responseSelector = selector({
  key: 'survey01UPDRS_responseStateSelector',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    const responseList = [takeMedicineResponse];
    if (takeMedicineResponse === TAKE_MEDICINE) {
      // take medicine response
      for (let i = 1; i <= UPDRS_TAKE_MEDICINE_QUESTIONS.length; i++) {
        responseList.push(
          get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${i}-${TAKE_MEDICINE}`))
        );
      }
    } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
      for (let j = 1; j <= UPDRS_QUESTIONS.length; j++)
        responseList.push(get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${j}`)));
    }
    return responseList;
  },
});
