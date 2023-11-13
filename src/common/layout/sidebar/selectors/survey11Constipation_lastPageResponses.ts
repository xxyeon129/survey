import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  CONSTIPATION_QUESTIONS,
  SURVEY_11_CONSTIPATION_STATE_KEYWORD,
} from 'pages/survey/survey-11-CONSTIPATION/survey.const';

export const survey11Constipation_lastPageResponses = selector({
  key: 'survey11Constipation_lastPageResponses',
  get: ({ get }) => {
    const lastPageResponseList = [];

    for (
      let questionNumber = 1;
      questionNumber <= CONSTIPATION_QUESTIONS.length;
      questionNumber++
    ) {
      const responseValue = get(
        responseState(`${SURVEY_11_CONSTIPATION_STATE_KEYWORD}-${questionNumber}`)
      );
      lastPageResponseList.push(responseValue);
    }

    return lastPageResponseList;
  },
});
