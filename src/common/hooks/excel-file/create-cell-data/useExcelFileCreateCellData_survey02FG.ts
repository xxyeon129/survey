import {
  survey02FG_medicineEffectOFF_excelData,
  survey02FG_medicineEffectON_excelData,
  survey02FG_notTakeMedicine_excelData,
} from 'common/layout/header/excelFileHandle/states/responseDataSelectors/survey02FG_excelData';
import { FG_QUESTIONS } from 'pages/survey/survey-02-FG/survey.const';
import { useRecoilValue } from 'recoil';

export default function useExcelFileCreateCellData_survey02FG() {
  const notTakeMedicine_responseData: { [key: string]: string } = {};
  const medicineEffectOFF_responseData: { [key: string]: string } = {};
  const medicineEffectON_responseData: { [key: string]: string } = {};

  const notTakeMedicine_responseList = useRecoilValue(survey02FG_notTakeMedicine_excelData);
  const medicineEffectOFF_responseList = useRecoilValue(survey02FG_medicineEffectOFF_excelData);
  const medicineEffectON_responseList = useRecoilValue(survey02FG_medicineEffectON_excelData);

  const surveyNumber = '02';
  const questionLength = FG_QUESTIONS.length; // 6

  let notTakeMedicine_sum: string | number = '';
  let medicineEffectOFF_sum: string | number = '';
  let medicineEffectON_sum: string | number = '';

  // add response data - not take medicine case
  for (let i = 1; i <= questionLength; i++) {
    const responseRecoilState = notTakeMedicine_responseList[i][`${i}`] || '';
    // add response cell data
    notTakeMedicine_responseData[`${surveyNumber}_NOT_${i}`] = responseRecoilState;

    // get sum
    if (responseRecoilState.length > 0) {
      if (i === 1) notTakeMedicine_sum = 0;
      if (typeof notTakeMedicine_sum === 'number') {
        notTakeMedicine_sum += parseInt(responseRecoilState);
      }
    }
    // apply sum cell data
    if (i === questionLength) {
      notTakeMedicine_responseData[`${surveyNumber}_NOT_SUM`] = `${notTakeMedicine_sum}`;
    }
  }
  // add response data - medicine effect off case
  for (let i = 1; i <= questionLength; i++) {
    const responseRecoilState = medicineEffectOFF_responseList[i][`${i}`] || '';
    // add response cell data
    medicineEffectOFF_responseData[`${surveyNumber}_OFF_${i}`] = responseRecoilState;

    // get sum
    if (responseRecoilState.length > 0) {
      if (i === 1) medicineEffectOFF_sum = 0;
      if (typeof medicineEffectOFF_sum === 'number') {
        medicineEffectOFF_sum += parseInt(responseRecoilState);
      }
    }
    // add sum cell data
    if (i === questionLength) {
      medicineEffectOFF_responseData[`${surveyNumber}_OFF_SUM`] = `${medicineEffectOFF_sum}`;
    }
  }
  // add response data - medicine effect on case
  for (let i = 1; i <= questionLength; i++) {
    const responseRecoilState = medicineEffectON_responseList[i][`${i}`] || '';
    // add response cell data
    medicineEffectON_responseData[`${surveyNumber}_ON_${i}`] = responseRecoilState;

    // get sum
    if (responseRecoilState.length > 0) {
      if (i === 1) medicineEffectON_sum = 0;
      if (typeof medicineEffectON_sum === 'number')
        medicineEffectON_sum += parseInt(responseRecoilState);
    }
    // add sum cell data
    if (i === questionLength) {
      medicineEffectON_responseData[`${surveyNumber}_ON_SUM`] = `${medicineEffectON_sum}`;
    }
  }

  const survey02FG_responseData = {
    ...notTakeMedicine_responseData,
    ...medicineEffectOFF_responseData,
    ...medicineEffectON_responseData,
  };

  return survey02FG_responseData;
}
