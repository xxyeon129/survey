import {
  survey01UPDRS_medicineEffectOFF_excelData,
  survey01UPDRS_medicineEffectON_excelData,
  survey01UPDRS_notTakeMedicine_excelData,
} from 'common/layout/header/excelFileHandle/states/responseDataSelectors/survey01UPDRS_excelData';
import { UPDRS_QUESTIONS } from 'pages/survey/survey-01-UPDRS/survey.const';
import { useRecoilValue } from 'recoil';

export default function useExcelFileCreateCellData_survey01UPDRS() {
  const survey01UPDRS_notTakeMedicine_responseData: { [key: string]: string } = {};
  const survey01UPDRS_medicineEffectOFF_responseData: { [key: string]: string } = {};
  const survey01UPDRS_medicineEffectON_responseData: { [key: string]: string } = {};

  const survey01UPDRS_notTakeMedicine_responseList = useRecoilValue(
    survey01UPDRS_notTakeMedicine_excelData
  );
  const survey01UPDRS_medicineEffectOFF_responseList = useRecoilValue(
    survey01UPDRS_medicineEffectOFF_excelData
  );
  const survey01UPDRS_medicineEffectON_responseList = useRecoilValue(
    survey01UPDRS_medicineEffectON_excelData
  );

  const survey01UPDRS_questionLength = UPDRS_QUESTIONS.length; // 22

  let survey01UPDRS_notTakeMedicine_sum: string | number = '';
  let survey01UPDRS_medicineEffectOFF_sum: string | number = '';
  let survey01UPDRS_medicineEffectON_sum: string | number = '';

  // add response data - survey-01-UPDRS not take medicine case
  for (let i = 1; i <= survey01UPDRS_questionLength; i++) {
    const responseRecoilState = survey01UPDRS_notTakeMedicine_responseList[i][`${i}`] || '';
    // add response cell data
    survey01UPDRS_notTakeMedicine_responseData[`01_NOT_${i}`] = responseRecoilState;

    // get sum
    if (responseRecoilState.length > 0) {
      if (i === 1) survey01UPDRS_notTakeMedicine_sum = 0;
      if (typeof survey01UPDRS_notTakeMedicine_sum === 'number') {
        survey01UPDRS_notTakeMedicine_sum += parseInt(responseRecoilState);
      }
    }
    // apply sum cell data
    if (i === survey01UPDRS_questionLength) {
      survey01UPDRS_notTakeMedicine_responseData[
        '01_NOT_SUM'
      ] = `${survey01UPDRS_notTakeMedicine_sum}`;
    }
  }
  // add response data - survey-01-UPDRS medicine effect off case
  for (let i = 1; i <= survey01UPDRS_questionLength; i++) {
    const responseRecoilState = survey01UPDRS_medicineEffectOFF_responseList[i][`${i}`] || '';
    // add response cell data
    survey01UPDRS_medicineEffectOFF_responseData[`01_OFF_${i}`] = responseRecoilState;

    // get sum
    if (responseRecoilState.length > 0) {
      if (i === 1) survey01UPDRS_medicineEffectOFF_sum = 0;
      if (typeof survey01UPDRS_medicineEffectOFF_sum === 'number') {
        survey01UPDRS_medicineEffectOFF_sum += parseInt(responseRecoilState);
      }
    }
    // add sum cell data
    if (i === survey01UPDRS_questionLength) {
      survey01UPDRS_medicineEffectOFF_responseData[
        '01_OFF_SUM'
      ] = `${survey01UPDRS_medicineEffectOFF_sum}`;
    }
  }
  // add response data - survey-01-UPDRS medicine effect on case
  for (let i = 1; i <= survey01UPDRS_questionLength; i++) {
    const responseRecoilState = survey01UPDRS_medicineEffectON_responseList[i][`${i}`] || '';
    // add response cell data
    survey01UPDRS_medicineEffectON_responseData[`01_ON_${i}`] = responseRecoilState;

    // get sum
    if (responseRecoilState.length > 0) {
      if (i === 1) survey01UPDRS_medicineEffectON_sum = 0;
      if (typeof survey01UPDRS_medicineEffectON_sum === 'number')
        survey01UPDRS_medicineEffectON_sum += parseInt(responseRecoilState);
    }
    // add sum cell data
    if (i === survey01UPDRS_questionLength) {
      survey01UPDRS_medicineEffectON_responseData[
        '01_ON_SUM'
      ] = `${survey01UPDRS_medicineEffectON_sum}`;
    }
  }

  const survey01UPDRS_responseData = {
    ...survey01UPDRS_notTakeMedicine_responseData,
    ...survey01UPDRS_medicineEffectOFF_responseData,
    ...survey01UPDRS_medicineEffectON_responseData,
  };

  return survey01UPDRS_responseData;
}
