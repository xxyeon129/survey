import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  BAI_QUESTIONS,
  BAI_QUESTIONS_PER_PAGE,
  SURVEY_03_BAI_STATE_KEYWORD,
} from 'pages/survey/survey-03-BAI/survey.const';

export const survey03BAI_lastPageResponses = selector({
  key: 'survey03BAI_lastPageResponses',
  get: ({ get }) => {
    const lastPageResponseList = [];

    const lastPageStartQuestionNumber =
      BAI_QUESTIONS.length - (BAI_QUESTIONS.length % BAI_QUESTIONS_PER_PAGE) + 1;

    for (
      let questionNumber = lastPageStartQuestionNumber;
      questionNumber <= BAI_QUESTIONS.length;
      questionNumber++
    ) {
      const responseValue = get(responseState(`${SURVEY_03_BAI_STATE_KEYWORD}-${questionNumber}`));
      lastPageResponseList.push(responseValue);
    }

    return lastPageResponseList;
  },
});
