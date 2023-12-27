import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  RBD_QUESTIONS,
  SURVEY_05_RBD_STATE_KEYWORD,
} from 'pages/survey/survey-05-RBD/survey.const';
import { selector } from 'recoil';

export const survey05RBD_excelData = selector({
  key: 'survey05RBD_excelData',
  get: ({ get }) => {
    const preQuestionResponse = get(responseState(`${SURVEY_05_RBD_STATE_KEYWORD}-pre`));
    const responseList: { [key: string]: string }[] = [
      {
        pre: preQuestionResponse,
      },
    ];

    for (let questionNumber = 1; questionNumber <= RBD_QUESTIONS.length; questionNumber++) {
      const responseValue = get(responseState(`${SURVEY_05_RBD_STATE_KEYWORD}-${questionNumber}`));
      const response: { [key: string]: string } = {};
      response[questionNumber] = responseValue; // {1: response number}
      responseList.push(response);
    }
    return responseList;
  },
});
