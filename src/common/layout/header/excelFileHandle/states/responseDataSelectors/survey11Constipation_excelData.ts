import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  CONSTIPATION_QUESTIONS,
  SURVEY_11_CONSTIPATION_STATE_KEYWORD,
} from 'pages/survey/survey-11-CONSTIPATION/survey.const';

export const survey11Constipation_excelData = selector({
  key: 'survey11Constipation_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let i = 1; i <= CONSTIPATION_QUESTIONS.length; i++) {
      const responseValue = get(responseState(`${SURVEY_11_CONSTIPATION_STATE_KEYWORD}-${i}`));

      responseList.push({
        문항번호: `${i}`,
        질문내용: CONSTIPATION_QUESTIONS[i - 1].Q,
        응답내용: responseValue,
      });
    }
    return responseList;
  },
});
