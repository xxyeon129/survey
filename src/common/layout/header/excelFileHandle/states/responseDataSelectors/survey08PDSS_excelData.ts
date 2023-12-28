import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  PDSS_QUESTIONS,
  SURVEY_08_PDSS_STATE_KEYWORD,
} from 'pages/survey/survey-08-PDSS/survey.const';

export const survey08PDSS_excelData = selector({
  key: 'survey08PDSS_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let questionNumber = 1; questionNumber <= PDSS_QUESTIONS.length; questionNumber++) {
      const responseValue = get(responseState(`${SURVEY_08_PDSS_STATE_KEYWORD}-${questionNumber}`));

      const response: { [key: string]: string } = {};
      response[questionNumber] = responseValue; // {1: response number}

      responseList.push(response);
    }
    return responseList;
  },
});
