import { selector } from 'recoil';
import {
  NMS_QUESTIONS,
  NMS_QUESTIONS_PER_PAGE,
  SURVEY_06_NMS_STATE_KEYWORD,
  SURVEY_06_NMS_TOTAL_PAGES,
} from 'pages/survey/survey-06-NMS/survey.const';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';

export const survey06NMS_lastPageResponses = selector({
  key: 'survey06NMS_lastPageResponses',
  get: ({ get }) => {
    const lastPageResponseList = [];

    const lastPageStartQuestionNumber =
      (SURVEY_06_NMS_TOTAL_PAGES - 1) * NMS_QUESTIONS_PER_PAGE + 1;

    for (
      let questionNumber = lastPageStartQuestionNumber;
      questionNumber <= NMS_QUESTIONS.length;
      questionNumber++
    ) {
      const frequencyResponseValue = get(
        responseState(`${SURVEY_06_NMS_STATE_KEYWORD}-${questionNumber}빈도`)
      );
      const degreeResponseValue = get(
        responseState(`${SURVEY_06_NMS_STATE_KEYWORD}-${questionNumber}중증도`)
      );

      lastPageResponseList.push(frequencyResponseValue);
      lastPageResponseList.push(degreeResponseValue);
    }

    return lastPageResponseList;
  },
});
