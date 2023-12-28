import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  FOOD_QUESTIONS,
  SURVEY_12_FOOD_STATE_KEYWORD,
} from 'pages/survey/survey-12-FOOD/survey.const';

export const survey12Food_excelData = selector({
  key: 'survey12Food_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let questionNumber = 1; questionNumber <= FOOD_QUESTIONS.length; questionNumber++) {
      const responseValue = get(responseState(`${SURVEY_12_FOOD_STATE_KEYWORD}-${questionNumber}`));

      const response: { [key: string]: string } = {};
      response[questionNumber] = responseValue; // {1: response number}

      responseList.push(response);
    }
    return responseList;
  },
});
