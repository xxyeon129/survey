import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  FOOD_QUESTIONS,
  SURVEY_12_FOOD_STATE_KEYWORD,
} from 'pages/survey/survey-12-FOOD/survey.const';

export const survey12Food_excelData = selector({
  key: 'survey12Food_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let i = 1; i <= FOOD_QUESTIONS.length; i++) {
      const responseValue = get(responseState(`${SURVEY_12_FOOD_STATE_KEYWORD}-${i}`));

      responseList.push({
        문항번호: `${i}`,
        질문내용: FOOD_QUESTIONS[i - 1].Q,
        응답내용: responseValue,
      });
    }
    return responseList;
  },
});
