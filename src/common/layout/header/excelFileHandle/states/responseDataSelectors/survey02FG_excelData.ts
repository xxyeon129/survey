import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  FG_PRE_QUESTION,
  FG_QUESTIONS,
  HAVE_FG_SYMPTOM,
  SURVEY_02_FG_STATE_KEYWORD,
} from 'pages/survey/survey-02-FG/survey.const';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
} from 'pages/survey/survey-01-UPDRS/survey.const';
import { medicineDivisionList } from 'pages/survey/common/components/survey-contents/survey-contents-with-medicine-effect/surveyContent.const';

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
      for (let i = 1; i <= FG_QUESTIONS.length; i++) {
        if (takeMedicineResponse === TAKE_MEDICINE) {
          // medicine effect true response
          const haveMedicineEffectResponseValue = get(
            responseState(
              `${SURVEY_02_FG_STATE_KEYWORD}-${i}-${medicineDivisionList[0].radioBtnKeyword}`
            )
          );
          const noMedicineEffectResponseValue = get(
            responseState(
              `${SURVEY_02_FG_STATE_KEYWORD}-${i}-${medicineDivisionList[1].radioBtnKeyword}`
            )
          );

          responseList.push({
            문항번호: `${i}-약 효과가 있을 때`,
            질문내용: FG_QUESTIONS[i - 1].Q,
            응답내용: haveMedicineEffectResponseValue,
          });
          responseList.push({
            문항번호: `${i}-약 효과가 없을 때`,
            질문내용: FG_QUESTIONS[i - 1].Q,
            응답내용: noMedicineEffectResponseValue,
          });
        } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
          // medicine effect false response
          const responseValue = get(responseState(`${SURVEY_02_FG_STATE_KEYWORD}-${i}`));
          responseList.push({
            문항번호: `${i}`,
            질문내용: FG_QUESTIONS[i - 1].Q,
            응답내용: responseValue,
          });
        }
      }
    }
    return responseList;
  },
});
