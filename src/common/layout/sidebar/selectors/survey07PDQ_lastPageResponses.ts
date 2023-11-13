import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  PDQ_QUESTIONS,
  PDQ_QUESTIONS_PER_PAGE,
  SURVEY_07_PDQ_STATE_KEYWORD,
} from 'pages/survey/survey-07-PDQ/survey.const';

export const survey07PDQ_lastPageResponses = selector({
  key: 'survey07PDQ_lastPageResponses',
  get: ({ get }) => {
    const lastPageResponseList = [];

    const lastPageStartQeustionNumber =
      PDQ_QUESTIONS.length - (PDQ_QUESTIONS.length % PDQ_QUESTIONS_PER_PAGE) + 1;

    for (
      let questionNumber = lastPageStartQeustionNumber;
      questionNumber <= PDQ_QUESTIONS.length;
      questionNumber++
    ) {
      const responseValue = get(responseState(`${SURVEY_07_PDQ_STATE_KEYWORD}-${questionNumber}`));
      lastPageResponseList.push(responseValue);
    }

    return lastPageResponseList;
  },
});
