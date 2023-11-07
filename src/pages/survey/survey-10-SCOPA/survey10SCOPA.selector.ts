import { selector } from 'recoil';
import { responseState } from '../common/states/surveyResponse.state';
import {
  SCOPA_QUESTIONS,
  SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from './survey.const';

export const survey10SCOPA_responseSelector = selector({
  key: 'survey10SCOPA_responseStateSelector',
  get: ({ get }) => {
    const responseList = [];
    for (let i = 1; i < SCOPA_QUESTIONS.length; i++) {
      responseList.push(get(responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${i}`)));
    }

    // for question number.24 input questions
    for (let j = 0; j < SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST.length; j++) {
      responseList.push(
        get(
          responseState(
            `${SURVEY_10_SCOPA_STATE_KEYWORD}-24-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[j]}`
          )
        )
      );
    }

    return responseList;
  },
});
