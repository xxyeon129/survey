import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  SCOPA_QUESTIONS,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from 'pages/survey/survey-10-SCOPA/survey.const';

export const survey10SCOPA_excelData = selector({
  key: 'survey10SCOPA_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let i = 1; i <= SCOPA_QUESTIONS.length; i++) {
      const notLastQuestion = i !== 24;
      const responseValue = get(responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${i}`));

      if (notLastQuestion) {
        responseList.push({
          문항번호: `${i}`,
          질문내용: SCOPA_QUESTIONS[i - 1].Q,
          응답내용: responseValue,
        });
      } else {
        // TO DO: 마지막 질문 추가
      }
    }
    return responseList;
  },
});
