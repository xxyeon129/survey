import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  CONSTIPATION_QUESTIONS,
  SURVEY_11_CONSTIPATION_STATE_KEYWORD,
} from 'pages/survey/survey-11-CONSTIPATION/survey.const';

export const survey11Constipation_excelData = selector({
  key: 'survey11Constipation_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (
      let questionNumber = 1;
      questionNumber <= CONSTIPATION_QUESTIONS.length;
      questionNumber++
    ) {
      const responseValue = get(
        responseState(`${SURVEY_11_CONSTIPATION_STATE_KEYWORD}-${questionNumber}`)
      );

      const response: { [key: string]: string } = {};
      response[questionNumber] = responseValue; // {1: response number}

      responseList.push(response);
    }
    return responseList;
  },
});
