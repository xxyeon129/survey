import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import {
  SCOPA_QUESTIONS,
  SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST,
  SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from './survey.const';

export const survey10SCOPA_responseSelector = selector({
  key: 'survey10SCOPA_responseStateSelector',
  get: ({ get }) => {
    const responseList = [];

    // for male additional question
    const forMaleAdditionalQuestionNumber = 23;

    const deleteAnotherSymptomQuestionLength = 1;
    const questionLength = SCOPA_QUESTIONS.length - deleteAnotherSymptomQuestionLength;
    for (let i = 1; i < questionLength; i++) {
      responseList.push(get(responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${i}`)));

      if (i === forMaleAdditionalQuestionNumber) {
        responseList.push(
          get(responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${forMaleAdditionalQuestionNumber}a`))
        );
      }
    }

    // for question number 26 input questions
    for (let j = 0; j < SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST.length; j++) {
      const questionNumber26KeyAlphabet = SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST[j];
      responseList.push(
        get(responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-26${questionNumber26KeyAlphabet}`))
      );
    }

    return responseList;
  },
});
