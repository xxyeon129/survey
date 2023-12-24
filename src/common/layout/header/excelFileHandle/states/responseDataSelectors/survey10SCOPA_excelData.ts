import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  SCOPA_QUESTIONS,
  SCOPA_QUESTIONS_WITH_INPUT,
  SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from 'pages/survey/survey-10-SCOPA/survey.const';

export const survey10SCOPA_excelData = selector({
  key: 'survey10SCOPA_excelData',
  get: ({ get }) => {
    const responseList = [];
    const lastInputQuestionIndex = SCOPA_QUESTIONS.length;
    const maleAdditionalQuestionIndex = 24;
    const maleAdditionalQuestionNumber = '23a';

    for (let i = 1; i < maleAdditionalQuestionIndex; i++) {
      const responseValue: string = get(responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${i}`));

      responseList.push({
        문항번호: `${i}`,
        질문내용: SCOPA_QUESTIONS[i - 1].Q,
        응답내용: responseValue,
      });
    }

    for (let i = maleAdditionalQuestionIndex; i < lastInputQuestionIndex; i++) {
      const maleAdditionalResponseValue = get(
        responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${maleAdditionalQuestionNumber}`)
      );
      const responseValue: string = get(responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${i - 1}`));

      if (i === maleAdditionalQuestionIndex) {
        responseList.push({
          문항번호: `${maleAdditionalQuestionNumber}`,
          질문내용: SCOPA_QUESTIONS[i - 1].Q,
          응답내용: maleAdditionalResponseValue,
        });
      } else {
        responseList.push({
          문항번호: `${i - 1}`,
          질문내용: SCOPA_QUESTIONS[i - 1].Q,
          응답내용: responseValue,
        });
      }
    }

    const lastInputQuestionNumber = 26;

    for (let j = 0; j < SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST.length; j++) {
      const inputCheckResponseValue: string = get(
        responseState(
          `${SURVEY_10_SCOPA_STATE_KEYWORD}-${lastInputQuestionNumber}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[j]}`
        )
      );

      responseList.push({
        문항번호: `${lastInputQuestionNumber}`,
        질문내용: `${SCOPA_QUESTIONS_WITH_INPUT.Q}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[j]}`,
        응답내용: inputCheckResponseValue,
      });
    }

    return responseList;
  },
});
