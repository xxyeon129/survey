import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
  // UPDRS_PRE_QUESTION,
  UPDRS_QUESTIONS,
  UPDRS_TAKE_MEDICINE_QUESTIONS,
} from 'pages/survey/survey-01-UPDRS/survey.const';

export const survey01UPDRS_excelData = selector({
  key: 'survey01UPDRS_excelData',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    const responseList: { [key: string]: string }[] = [
      {
        // 문항번호: '사전질문',
        // 질문내용: UPDRS_PRE_QUESTION.Q,
        pre: takeMedicineResponse,
      },
    ];

    if (takeMedicineResponse === TAKE_MEDICINE) {
      // take medicine response
      for (let i = 1; i <= UPDRS_TAKE_MEDICINE_QUESTIONS.length; i++) {
        const takeMedicineResponseValue = get(
          responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${i}-${TAKE_MEDICINE}`)
        );
        const response: { [key: string]: string } = {};
        response[i] = takeMedicineResponseValue;
        responseList.push(response);
      }
    } else if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
      // not take medicine response
      for (let i = 1; i <= UPDRS_QUESTIONS.length; i++) {
        const responseValue = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${i}`));
        const response: { [key: string]: string } = {};
        response[i] = responseValue;
        responseList.push(response);
      }
    }

    return responseList;
  },
});

export const survey01UPDRS_notTakeMedicine_excelData = selector({
  key: 'survey01UPDRS_notTakeMedicine_excelData',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    const responseList: { [key: string]: string }[] = [
      {
        pre: takeMedicineResponse,
      },
    ];

    for (let questionNumber = 1; questionNumber <= UPDRS_QUESTIONS.length; questionNumber++) {
      const responseValue = get(
        responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${questionNumber}`)
      );
      const response: { [key: string]: string } = {};
      response[questionNumber] = responseValue; // {1: response number}
      responseList.push(response);
    }

    return responseList;
  },
});

export const survey01UPDRS_medicineEffectON_excelData = selector({
  key: 'survey01UPDRS_medicineEffectON_excelData',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    const responseList: { [key: string]: string }[] = [
      {
        pre: takeMedicineResponse,
      },
    ];

    for (let questionNumber = 1; questionNumber <= UPDRS_QUESTIONS.length; questionNumber++) {
      const takeMedicineResponseValue = get(
        responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${questionNumber}-${TAKE_MEDICINE}`)
      );
      const response: { [key: string]: string } = {};
      response[questionNumber] = takeMedicineResponseValue; // {1: response number}
      responseList.push(response);
    }

    return responseList;
  },
});

export const survey01UPDRS_medicineEffectOFF_excelData = selector({
  key: 'survey01UPDRS_medicineEffectOFF_excelData',
  get: ({ get }) => {
    const takeMedicineResponse = get(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
    const responseList: { [key: string]: string }[] = [
      {
        pre: takeMedicineResponse,
      },
    ];

    const medicineEffectOffQuestionStartNumber = 23;

    for (
      let responseQuestionNumber = medicineEffectOffQuestionStartNumber,
        excelDisplayQuestionNumber = 1;
      responseQuestionNumber <= UPDRS_TAKE_MEDICINE_QUESTIONS.length &&
      excelDisplayQuestionNumber <= UPDRS_QUESTIONS.length;
      responseQuestionNumber++, excelDisplayQuestionNumber++
    ) {
      const takeMedicineResponseValue = get(
        responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${responseQuestionNumber}-${TAKE_MEDICINE}`)
      );
      const response: { [key: string]: string } = {};
      response[excelDisplayQuestionNumber] = takeMedicineResponseValue; // {1: response number}
      responseList.push(response);
    }

    return responseList;
  },
});
