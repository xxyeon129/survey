import { selector } from 'recoil';
import { BDI_QUESTIONS, SURVEY_04_BDI_STATE_KEYWORD } from './survey.const';
import { responseState } from '../common/states/surveyResponse.state';

export const survey04BDI_responseSelector = selector({
  key: 'survey04BDI_responseStateSelector',
  get: ({ get }) => {
    const responseList = [];
    for (let i = 1; i <= BDI_QUESTIONS.length; i++) {
      responseList.push(get(responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-${i}`)));

      const additionalQuestionNumber = 19;
      if (i === additionalQuestionNumber) {
        responseList.push(get(responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-${i}-additional`)));
      }
    }
    return responseList;
  },
});
