import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  SURVEY_09_TIRED_STATE_KEYWORD,
  TIRED_QUESTIONS,
} from 'pages/survey/survey-09-TIRED/survey.const';

export const survey09Tired_excelData = selector({
  key: 'survey09Tired_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let i = 1; i <= TIRED_QUESTIONS.length; i++) {
      const responseValue = get(responseState(`${SURVEY_09_TIRED_STATE_KEYWORD}-${i}`));

      responseList.push({
        문항번호: `${i}`,
        질문내용: TIRED_QUESTIONS[i - 1].Q,
        응답내용: responseValue,
      });
    }
    return responseList;
  },
});
