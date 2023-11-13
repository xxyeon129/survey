import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  SCOPA_QUESTIONS,
  SCOPA_QUESTIONS_PER_PAGE,
  SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from 'pages/survey/survey-10-SCOPA/survey.const';

export const survey10SCOPA_lastPageResponses = selector({
  key: 'survey10SCOPA_lastPageResponses',
  get: ({ get }) => {
    const lastPageResponseList = [];

    const lastPageStartQeustionNumber =
      SCOPA_QUESTIONS.length - (SCOPA_QUESTIONS.length % SCOPA_QUESTIONS_PER_PAGE) + 1;

    for (
      let questionNumber = lastPageStartQeustionNumber;
      questionNumber <= SCOPA_QUESTIONS.length;
      questionNumber++
    ) {
      if (questionNumber < SCOPA_QUESTIONS.length) {
        const responseValue = get(
          responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${questionNumber}`)
        );
        lastPageResponseList.push(responseValue);
      } else if (questionNumber === SCOPA_QUESTIONS.length) {
        SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST.forEach((questionName) => {
          const lastQuestionResponseValue = get(
            responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${questionNumber}-${questionName}`)
          );
          lastPageResponseList.push(lastQuestionResponseValue);
        });
      }
    }

    return lastPageResponseList;
  },
});
