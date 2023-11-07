import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import { PDSS_QUESTIONS, SURVEY_08_PDSS_STATE_KEYWORD } from './survey.const';

export const survey08PDSS_responseSelector = selector({
  key: 'survey08PDSS_responseStateSelector',
  get: ({ get }) => {
    const responseList = [];
    for (let i = 1; i <= PDSS_QUESTIONS.length; i++) {
      responseList.push(get(responseState(`${SURVEY_08_PDSS_STATE_KEYWORD}-${i}`)));
    }
    return responseList;
  },
});
