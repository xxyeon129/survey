import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  RBD_QUESTIONS,
  SURVEY_05_RBD_STATE_KEYWORD,
} from 'pages/survey/survey-05-RBD/survey.const';

export const survey05RBD_lastPageResponses = selector({
  key: 'survey05RBD_lastPageResponses',
  get: ({ get }) => {
    const preQuestion = get(responseState(`${SURVEY_05_RBD_STATE_KEYWORD}-pre`));
    const lastPageResponseList = [preQuestion];

    for (let i = 1; i <= RBD_QUESTIONS.length; i++) {
      const responseValue = get(responseState(`${SURVEY_05_RBD_STATE_KEYWORD}-${i}`));
      lastPageResponseList.push(responseValue);
    }

    return lastPageResponseList;
  },
});
