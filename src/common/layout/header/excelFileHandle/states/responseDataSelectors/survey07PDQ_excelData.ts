import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  PDQ_QUESTIONS,
  SURVEY_07_PDQ_STATE_KEYWORD,
} from 'pages/survey/survey-07-PDQ/survey.const';

export const survey07PDQ_excelData = selector({
  key: 'survey07PDQ_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let i = 1; i <= PDQ_QUESTIONS.length; i++) {
      const responseValue = get(responseState(`${SURVEY_07_PDQ_STATE_KEYWORD}-${i}`));

      responseList.push({
        문항번호: `${i}`,
        질문내용: PDQ_QUESTIONS[i - 1].Q,
        응답내용: responseValue,
      });
    }
    return responseList;
  },
});
