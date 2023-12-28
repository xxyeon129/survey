import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  PDQ_QUESTIONS,
  SURVEY_07_PDQ_STATE_KEYWORD,
} from 'pages/survey/survey-07-PDQ/survey.const';

export const survey07PDQ_excelData = selector({
  key: 'survey07PDQ_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let questionNumber = 1; questionNumber <= PDQ_QUESTIONS.length; questionNumber++) {
      const responseValue = get(responseState(`${SURVEY_07_PDQ_STATE_KEYWORD}-${questionNumber}`));

      const response: { [key: string]: string } = {};
      response[questionNumber] = responseValue; // {1: response number}

      responseList.push(response);
    }
    return responseList;
  },
});
