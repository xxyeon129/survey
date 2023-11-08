import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  NMS_QUESTIONS,
  SURVEY_06_NMS_STATE_KEYWORD,
} from 'pages/survey/survey-06-NMS/survey.const';
import { questionScoreState, totalScoreState } from 'pages/survey/survey-06-NMS/survey06NMS.state';

export const survey06NMS_excelData = selector({
  key: 'survey06NMS_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let i = 1; i <= NMS_QUESTIONS.length; i++) {
      const degreeResponseValue = get(responseState(`${SURVEY_06_NMS_STATE_KEYWORD}-${i}중증도`));
      const frequencyResponseValue = get(responseState(`${SURVEY_06_NMS_STATE_KEYWORD}-${i}빈도`));
      const totalScore = get(totalScoreState);

      const questionScoreStateValue = get(questionScoreState(i));
      responseList.push({
        문항번호: `${i}-중증도`,
        문항점수: questionScoreStateValue,
        질문내용: NMS_QUESTIONS[i - 1].Q,
        응답내용: degreeResponseValue,
      });
      responseList.push({
        문항번호: `${i}-빈도`,
        문항점수: questionScoreStateValue,
        질문내용: NMS_QUESTIONS[i - 1].Q,
        응답내용: frequencyResponseValue,
      });

      if (i === NMS_QUESTIONS.length) {
        responseList.push({
          '총 합계 점수': `${totalScore}`,
        });
      }
    }
    return responseList;
  },
});
