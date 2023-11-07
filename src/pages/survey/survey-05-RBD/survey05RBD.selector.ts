import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import { RBD_QUESTIONS, SURVEY_05_RBD_STATE_KEYWORD } from './survey.const';

export const survey05RBD_responseSelector = selector({
  key: 'survey05RBD_responseStateSelector',
  get: ({ get }) => {
    const responseList = [get(responseState(`${SURVEY_05_RBD_STATE_KEYWORD}-pre`))];
    for (let i = 1; i <= RBD_QUESTIONS.length; i++) {
      responseList.push(get(responseState(`${SURVEY_05_RBD_STATE_KEYWORD}-${i}`)));
    }
    return responseList;
  },
});
