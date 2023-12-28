import { selector } from 'recoil';
import { NMS_QUESTIONS } from 'pages/survey/survey-06-NMS/survey.const';
import { questionScoreState } from 'pages/survey/survey-06-NMS/survey06NMS.state';

export const survey06NMS_excelData = selector({
  key: 'survey06NMS_excelData',
  get: ({ get }) => {
    const responseList: { [key: string]: string }[] = [];

    for (let questionNumber = 1; questionNumber <= NMS_QUESTIONS.length; questionNumber++) {
      // const degreeResponseValue = get(responseState(`${SURVEY_06_NMS_STATE_KEYWORD}-${questionNumber}중증도`));
      // const frequencyResponseValue = get(responseState(`${SURVEY_06_NMS_STATE_KEYWORD}-${questionNumber}빈도`));

      const questionScore = get(questionScoreState(questionNumber));
      // const totalScore = get(totalScoreState);

      const response: { [key: string]: string } = {};
      response[questionNumber] = questionScore === '-' ? '' : `${questionScore}`; // {1: response score}

      responseList.push(response);
    }
    return responseList;
  },
});
