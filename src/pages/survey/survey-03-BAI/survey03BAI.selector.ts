import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import { BAI_QUESTIONS, SURVEY_03_BAI_STATE_KEYWORD } from './survey.const';

export const survey03BAI_responseSelector = selector({
  key: 'survey03BAI_responseStateSelector',
  get: ({ get }) => {
    const responseList = [];
    for (let i = 1; i <= BAI_QUESTIONS.length; i++) {
      responseList.push(get(responseState(`${SURVEY_03_BAI_STATE_KEYWORD}-${i}`)));
    }
    return responseList;
  },
});
