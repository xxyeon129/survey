import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  FG_PRE_QUESTION,
  FG_QUESTIONS,
  FG_TAKE_MEDICINE_QUESTIONS,
  HAVE_FG_SYMPTOM,
  SURVEY_02_FG_STATE_KEYWORD,
} from 'pages/survey/survey-02-FG/survey.const';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
} from 'pages/survey/survey-01-UPDRS/survey.const';

export const survey02FG_excelData = selector({
  key: 'survey02FG_excelData',
  get: ({ get }) => {
    // for pre question
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    const haveFGSymptomResponse = get(responseState(`${SURVEY_02_FG_STATE_KEYWORD}-pre`));
    const responseList = [
      {
        문항번호: '사전질문',
        질문내용: FG_PRE_QUESTION.Q,
        응답내용: haveFGSymptomResponse,
      },
    ];

    // responded "있다" in pre-question
    if (haveFGSymptomResponse === HAVE_FG_SYMPTOM) {
      if (takeMedicineResponse === TAKE_MEDICINE) {
        // take medicine response
        for (let i = 1; i <= FG_TAKE_MEDICINE_QUESTIONS.length; i++) {
          const takeMedicineResponseValue = get(
            responseState(`${SURVEY_02_FG_STATE_KEYWORD}-${i}-${TAKE_MEDICINE}`)
          );

          responseList.push({
            문항번호: `${i}`,
            질문내용: FG_TAKE_MEDICINE_QUESTIONS[i - 1].Q,
            응답내용: takeMedicineResponseValue,
          });
        }
      } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
        // not take medicine response
        for (let j = 1; j <= FG_QUESTIONS.length; j++) {
          const responseValue = get(responseState(`${SURVEY_02_FG_STATE_KEYWORD}-${j}`));
          responseList.push({
            문항번호: `${j}`,
            질문내용: FG_QUESTIONS[j - 1].Q,
            응답내용: responseValue,
          });
        }
      }
    }
    return responseList;
  },
});
