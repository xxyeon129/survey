import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  BAI_QUESTIONS,
  SURVEY_03_BAI_STATE_KEYWORD,
} from 'pages/survey/survey-03-BAI/survey.const';

export const survey03BAI_excelData = selector({
  key: 'survey03BAI_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let i = 1; i <= BAI_QUESTIONS.length; i++) {
      const responseValue = get(responseState(`${SURVEY_03_BAI_STATE_KEYWORD}-${i}`));

      responseList.push({
        문항번호: `${i}`,
        질문내용: BAI_QUESTIONS[i - 1].Q,
        응답내용: responseValue,
      });
    }
    return responseList;
  },
});
