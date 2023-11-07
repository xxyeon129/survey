import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
  UPDRS_QUESTIONS,
} from 'pages/survey/survey-01-UPDRS/survey.const';
import { medicineDivisionList } from 'pages/survey/common/components/survey-contents/survey-contents-with-medicine-effect/surveyContent.const';

export const forExcelFileSelectorSurvey01UPDRS = selector({
  key: 'surveyDataSelector',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    const responseList = [
      {
        문항번호: '사전질문',
        질문내용: '파킨슨병 약을 복용 중이신가요?',
        응답내용: takeMedicineResponse,
      },
    ];
    for (let i = 1; i <= UPDRS_QUESTIONS.length; i++) {
      if (takeMedicineResponse === TAKE_MEDICINE) {
        // medicine effect true response
        const haveMedicineEffectResponseValue = get(
          responseState(
            `${SURVEY_01_UPDRS_STATE_KEYWORD}-${i}-${medicineDivisionList[0].radioBtnKeyword}`
          )
        );
        const noMedicineEffectResponseValue = get(
          responseState(
            `${SURVEY_01_UPDRS_STATE_KEYWORD}-${i}-${medicineDivisionList[1].radioBtnKeyword}`
          )
        );

        responseList.push({
          문항번호: `${i}-약 효과가 있을 때`,
          질문내용: UPDRS_QUESTIONS[i - 1].Q,
          응답내용: haveMedicineEffectResponseValue,
        });
        responseList.push({
          문항번호: `${i}-약 효과가 없을 때`,
          질문내용: UPDRS_QUESTIONS[i - 1].Q,
          응답내용: noMedicineEffectResponseValue,
        });
      } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
        // medicine effect false response
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
