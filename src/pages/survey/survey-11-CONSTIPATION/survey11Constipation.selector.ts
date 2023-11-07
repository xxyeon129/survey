import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import { CONSTIPATION_QUESTIONS, SURVEY_11_CONSTIPATION_STATE_KEYWORD } from './survey.const';

export const survey11Constipation_responseSelector = selector({
  key: 'survey11Constipation_responseStateSelector',
  get: ({ get }) => {
    const responseList = [];
    for (let i = 1; i <= CONSTIPATION_QUESTIONS.length; i++) {
      responseList.push(get(responseState(`${SURVEY_11_CONSTIPATION_STATE_KEYWORD}-${i}`)));
    }
    return responseList;
  },
});
