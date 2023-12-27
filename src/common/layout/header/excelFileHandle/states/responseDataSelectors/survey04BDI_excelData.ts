import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { selector } from 'recoil';
import {
  BDI_QUESTIONS,
  SURVEY_04_BDI_STATE_KEYWORD,
} from 'pages/survey/survey-04-BDI/survey.const';

export const survey04BDI_excelData = selector({
  key: 'survey04BDI_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let questionNumber = 1; questionNumber <= BDI_QUESTIONS.length; questionNumber++) {
      const responseValue = get(responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-${questionNumber}`));

      const response: { [key: string]: string } = {};
      response[questionNumber] = responseValue; // {1: response number}

      responseList.push(response);

      // for additional question -----------------------------
      const additionalQuestionNumber = 19;
      const additionalResponseValue = get(
        responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-${additionalQuestionNumber}-additional`)
      );

      if (questionNumber === additionalQuestionNumber) {
        const additionalQuestionResponse: { [key: string]: string } = {
          '19_1': additionalResponseValue,
        };
        responseList.push(additionalQuestionResponse);
      }
    }
    return responseList;
  },
});
