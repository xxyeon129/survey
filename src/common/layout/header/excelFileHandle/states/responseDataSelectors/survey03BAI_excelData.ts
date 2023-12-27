import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  BAI_QUESTIONS,
  SURVEY_03_BAI_STATE_KEYWORD,
} from 'pages/survey/survey-03-BAI/survey.const';

export const survey03BAI_excelData = selector({
  key: 'survey03BAI_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let questionNumber = 1; questionNumber <= BAI_QUESTIONS.length; questionNumber++) {
      const responseValue = get(responseState(`${SURVEY_03_BAI_STATE_KEYWORD}-${questionNumber}`));

      const response: { [key: string]: string } = {};
      response[questionNumber] = responseValue; // {1: response number}

      responseList.push(response);
    }
    return responseList;
  },
});
