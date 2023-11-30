import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
  UPDRS_PRE_QUESTION,
  UPDRS_QUESTIONS,
  UPDRS_TAKE_MEDICINE_QUESTIONS,
} from 'pages/survey/survey-01-UPDRS/survey.const';

export const survey01UPDRS_excelData = selector({
  key: 'survey01UPDRS_excelData',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    const responseList = [
      {
        문항번호: '사전질문',
        질문내용: UPDRS_PRE_QUESTION.Q,
        응답내용: takeMedicineResponse,
      },
    ];

    if (takeMedicineResponse === TAKE_MEDICINE) {
      // take medicine response
      for (let i = 1; i <= UPDRS_TAKE_MEDICINE_QUESTIONS.length; i++) {
        const takeMedicineResponseValue = get(
          responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${i}-${TAKE_MEDICINE}`)
        );
        responseList.push({
          문항번호: `${i}`,
          질문내용: UPDRS_TAKE_MEDICINE_QUESTIONS[i - 1].Q,
          응답내용: takeMedicineResponseValue,
        });
      }
    } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
      // not take medicine response
      for (let i = 1; i <= UPDRS_QUESTIONS.length; i++) {
        const responseValue = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${i}`));
        responseList.push({
          문항번호: `${i}`,
          질문내용: UPDRS_QUESTIONS[i - 1].Q,
          응답내용: responseValue,
        });
      }
    }

    return responseList;
  },
});
