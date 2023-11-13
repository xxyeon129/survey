import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  PDSS_QUESTIONS,
  PDSS_QUESTIONS_PER_PAGE,
  SURVEY_08_PDSS_STATE_KEYWORD,
} from 'pages/survey/survey-08-PDSS/survey.const';

export const survey08PDSS_lastPageResponses = selector({
  key: 'survey08PDSS_lastPageResponses',
  get: ({ get }) => {
    const lastPageResponseList = [];

    const lastPageStartQeustionNumber =
      PDSS_QUESTIONS.length - (PDSS_QUESTIONS.length % PDSS_QUESTIONS_PER_PAGE) + 1;

    for (
      let questionNumber = lastPageStartQeustionNumber;
      questionNumber <= PDSS_QUESTIONS.length;
      questionNumber++
    ) {
      const responseValue = get(responseState(`${SURVEY_08_PDSS_STATE_KEYWORD}-${questionNumber}`));
      lastPageResponseList.push(responseValue);
    }

    return lastPageResponseList;
  },
});
