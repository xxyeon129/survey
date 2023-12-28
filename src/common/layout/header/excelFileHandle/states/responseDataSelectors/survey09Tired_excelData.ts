import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  SURVEY_09_TIRED_STATE_KEYWORD,
  TIRED_QUESTIONS,
} from 'pages/survey/survey-09-TIRED/survey.const';

export const survey09Tired_excelData = selector({
  key: 'survey09Tired_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let questionNumber = 1; questionNumber <= TIRED_QUESTIONS.length; questionNumber++) {
      const responseValue = get(
        responseState(`${SURVEY_09_TIRED_STATE_KEYWORD}-${questionNumber}`)
      );

      const response: { [key: string]: string } = {};
      response[questionNumber] = responseValue; // {1: response number}

      responseList.push(response);
    }
    return responseList;
  },
});
