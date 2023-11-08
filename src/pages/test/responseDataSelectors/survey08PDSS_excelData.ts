import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  PDSS_QUESTIONS,
  SURVEY_08_PDSS_STATE_KEYWORD,
} from 'pages/survey/survey-08-PDSS/survey.const';

export const survey08PDSS_excelData = selector({
  key: 'survey08PDSS_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let i = 1; i <= PDSS_QUESTIONS.length; i++) {
      const responseValue = get(responseState(`${SURVEY_08_PDSS_STATE_KEYWORD}-${i}`));

      responseList.push({
        문항번호: `${i}`,
        질문내용: PDSS_QUESTIONS[i - 1].Q,
        응답내용: responseValue,
      });
    }
    return responseList;
  },
});
