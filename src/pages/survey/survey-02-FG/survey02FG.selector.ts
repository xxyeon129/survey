import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import {
  FG_QUESTIONS,
  FG_TAKE_MEDICINE_QUESTIONS,
  SURVEY_02_FG_STATE_KEYWORD,
} from './survey.const';
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
    if (takeMedicineResponse === TAKE_MEDICINE) {
      // take medicine response
      for (let i = 1; i <= FG_TAKE_MEDICINE_QUESTIONS.length; i++) {
        responseList.push(
          get(responseState(`${SURVEY_02_FG_STATE_KEYWORD}-${i}-${TAKE_MEDICINE}`))
        );
      }
    } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
      for (let j = 1; j <= FG_QUESTIONS.length; j++) {
        responseList.push(get(responseState(`${SURVEY_02_FG_STATE_KEYWORD}-${j}`)));
      }
    }
    return responseList;
  },
});
