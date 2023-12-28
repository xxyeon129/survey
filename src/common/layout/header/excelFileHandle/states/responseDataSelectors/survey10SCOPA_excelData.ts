import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  SCOPA_QUESTIONS,
  SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from 'pages/survey/survey-10-SCOPA/survey.const';

export const survey10SCOPA_excelData = selector({
  key: 'survey10SCOPA_excelData',
  get: ({ get }) => {
    const responseList = [];

    const lastInputQuestionIndex = SCOPA_QUESTIONS.length;
    const maleAdditionalQuestionIndex = 24;
    const maleAdditionalQuestionNumber = '23a';

    for (let questionNumber = 1; questionNumber < maleAdditionalQuestionIndex; questionNumber++) {
      const responseValue = get(
        responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${questionNumber}`)
      );

      const response: { [key: string]: string } = {};
      response[questionNumber] = responseValue; // {1: response number}

      responseList.push(response);
    }

    for (
      let questionNumber = maleAdditionalQuestionIndex;
      questionNumber < lastInputQuestionIndex;
      questionNumber++
    ) {
      const responseValue: string = get(
        responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${questionNumber - 1}`)
      );

      // male additional question (question number 23a) case
      if (questionNumber === maleAdditionalQuestionIndex) {
        const maleAdditionalResponseValue = get(
          responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${maleAdditionalQuestionNumber}`)
        );
        const response: { [key: string]: string } = {};
        response[`${maleAdditionalQuestionNumber}`] = maleAdditionalResponseValue; // {23a: response number}
        responseList.push(response);
      } else {
        const response: { [key: string]: string } = {};
        response[questionNumber] = responseValue; // {1: response number}

        responseList.push(response);
      }
    }

    const lastInputQuestionNumber = 26;

    for (let j = 0; j < SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST.length; j++) {
      const inputCheckResponseValue: string = get(
        responseState(
          `${SURVEY_10_SCOPA_STATE_KEYWORD}-${lastInputQuestionNumber}${SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST[j]}`
        )
      );

      const response: { [key: string]: string } = {};
      response[
        `${lastInputQuestionNumber}${SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST[j]}`
      ] = inputCheckResponseValue; // {26a: response number}

      responseList.push(response);
    }

    return responseList;
  },
});
