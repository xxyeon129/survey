import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  RBD_PRE_QUESTION,
  RBD_QUESTIONS,
  SURVEY_05_RBD_STATE_KEYWORD,
} from 'pages/survey/survey-05-RBD/survey.const';
import { selector } from 'recoil';

export const survey05RBD_excelData = selector({
  key: 'survey05RBD_excelData',
  get: ({ get }) => {
    const respondent = get(responseState(`${SURVEY_05_RBD_STATE_KEYWORD}-pre`));
    const responseList = [
      {
        문항번호: '사전질문',
        질문내용: RBD_PRE_QUESTION.Q,
        응답내용: respondent,
      },
    ];

    for (let i = 1; i <= RBD_QUESTIONS.length; i++) {
      const responseValue = get(responseState(`${SURVEY_05_RBD_STATE_KEYWORD}-${i}`));
      responseList.push({
        문항번호: `${i}`,
        질문내용: RBD_QUESTIONS[i - 1].Q,
        응답내용: responseValue,
      });
    }
    return responseList;
  },
});
