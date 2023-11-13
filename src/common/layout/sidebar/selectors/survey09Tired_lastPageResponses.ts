import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  SURVEY_09_TIRED_STATE_KEYWORD,
  TIRED_QUESTIONS,
  TIRED_QUESTIONS_PER_PAGE,
} from 'pages/survey/survey-09-TIRED/survey.const';

export const survey09Tired_lastPageResponses = selector({
  key: 'survey09Tired_lastPageResponses',
  get: ({ get }) => {
    const lastPageResponseList = [];

    const lastPageStartQeustionNumber =
      TIRED_QUESTIONS.length - (TIRED_QUESTIONS.length % TIRED_QUESTIONS_PER_PAGE) + 1;

    for (
      let questionNumber = lastPageStartQeustionNumber;
      questionNumber <= TIRED_QUESTIONS.length;
      questionNumber++
    ) {
      const responseValue = get(
        responseState(`${SURVEY_09_TIRED_STATE_KEYWORD}-${questionNumber}`)
      );
      lastPageResponseList.push(responseValue);
    }

    return lastPageResponseList;
  },
});
