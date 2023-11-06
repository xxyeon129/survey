import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import { FOOD_QUESTIONS, SURVEY_12_FOOD_STATE_KEYWORD } from './survey.const';

export const survey12Food_responseSelector = selector({
  key: 'survey12Food_responseStateSelector',
  get: ({ get }) => {
    const responseList = [];
    for (let i = 1; i <= FOOD_QUESTIONS.length; i++) {
      responseList.push(get(responseState(`${SURVEY_12_FOOD_STATE_KEYWORD}-${i}`)));
    }
    return responseList;
  },
});
