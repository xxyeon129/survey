import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import { SURVEY_09_TIRED_STATE_KEYWORD, TIRED_QUESTIONS } from './survey.const';

export const survey09Tired_responseSelector = selector({
  key: 'survey09Tired_responseStateSelector',
  get: ({ get }) => {
    const responseList = [];
    for (let i = 1; i <= TIRED_QUESTIONS.length; i++) {
      responseList.push(get(responseState(`${SURVEY_09_TIRED_STATE_KEYWORD}-${i}`)));
    }
    return responseList;
  },
});
