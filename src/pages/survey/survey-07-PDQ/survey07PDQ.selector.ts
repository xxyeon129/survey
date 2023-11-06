import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import { PDQ_QUESTIONS, SURVEY_07_PDQ_STATE_KEYWORD } from './survey.const';

export const survey07PDQ_responseSelector = selector({
  key: 'survey07PDQ_responseStateSelector',
  get: ({ get }) => {
    const responseList = [];
    for (let i = 1; i <= PDQ_QUESTIONS.length; i++) {
      responseList.push(get(responseState(`${SURVEY_07_PDQ_STATE_KEYWORD}-${i}`)));
    }
    return responseList;
  },
});
