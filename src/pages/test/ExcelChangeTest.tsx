import * as XLSX from 'xlsx';
import {
  survey01UPDRS_medicineEffectOFF_excelData,
  survey01UPDRS_medicineEffectON_excelData,
  survey01UPDRS_notTakeMedicine_excelData,
} from 'common/layout/header/excelFileHandle/states/responseDataSelectors/survey01UPDRS_excelData';
import {
  personalInfoBirthdayState,
  personalInfoGenderState,
  personalInfoNameState,
} from 'pages/survey/personalInfo/personalInfo.state';
import { useRecoilValue } from 'recoil';
import { WS_COLUMN_SURVEY_01_UPDRS } from './excelWorksheetColumn.const';
import { UPDRS_QUESTIONS } from 'pages/survey/survey-01-UPDRS/survey.const';
import UploadExcelTest from './UploadExcelTest';

export default function ExcelChangeTest() {
  // personal info
  const name = useRecoilValue(personalInfoNameState);
  const birthday = useRecoilValue(personalInfoBirthdayState);
  const gender = useRecoilValue(personalInfoGenderState);

  const personalInfo_responseData = [
    { No: '1', Name: name, 'Patient ID': '', 'D.O.B': birthday, Gender: gender },
  ];

  // survey-01-UPDRS
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

  // combine in one row
  const responseData = personalInfo_responseData.map((obj) => ({
    ...obj,
    ...survey01UPDRS_notTakeMedicine_responseData,
    ...survey01UPDRS_medicineEffectOFF_responseData,
    ...survey01UPDRS_medicineEffectON_responseData,
  }));

  // add empty rows in the beginning
  responseData.unshift(
    { No: '', Name: '', 'Patient ID': '', 'D.O.B': '', Gender: '' },
    { No: '', Name: '', 'Patient ID': '', 'D.O.B': '', Gender: '' }
  );

  console.log(responseData);

  // hide headers by adding skipHeader: true , { skipHeader: true }
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(responseData);
  ws.A1 = { t: 's', v: 'No' };
  ws.B1 = { t: 's', v: 'Name' };
  ws.C1 = { t: 's', v: 'Patient ID' };
  ws.D1 = { t: 's', v: 'D.O.B' };
  ws.E1 = { t: 's', v: 'Gender' };

  ws.F1 = { t: 's', v: 'UPDRS I, II' };
  ws.F2 = { t: 's', v: '파킨슨병약 복용 전' };
  ws.AC2 = { t: 's', v: '파킨슨병약 효과 X (OFF)' };
  ws.AZ2 = { t: 's', v: '파킨슨병약 효과 O (ON)' };

  // setting question number - survey-01-UPDRS not take medicine case
  for (let i = 0; i <= survey01UPDRS_questionLength; i++) {
    const sumColumnIndex = survey01UPDRS_questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_01_UPDRS.NOT_TAKE[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_01_UPDRS.NOT_TAKE[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
  // setting question number - survey-01-UPDRS medicine effect off case
  for (let i = 0; i <= survey01UPDRS_questionLength; i++) {
    const sumColumnIndex = survey01UPDRS_questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_01_UPDRS.EFFECT_OFF[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_01_UPDRS.EFFECT_OFF[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
  // setting question number - survey-01-UPDRS medicine effect on case
  for (let i = 0; i <= survey01UPDRS_questionLength; i++) {
    const sumColumnIndex = survey01UPDRS_questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_01_UPDRS.EFFECT_ON[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_01_UPDRS.EFFECT_ON[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '비운동증상 설문');

  // s - start, e - end, r - row, c - col (0 based)
  const merge = [
    { s: { r: 0, c: 0 }, e: { r: 2, c: 0 } }, // No
    { s: { r: 0, c: 1 }, e: { r: 2, c: 1 } }, // Name
    { s: { r: 0, c: 2 }, e: { r: 2, c: 2 } }, // Patient ID
    { s: { r: 0, c: 3 }, e: { r: 2, c: 3 } }, // D.O.B
    { s: { r: 0, c: 4 }, e: { r: 2, c: 4 } }, // Gender

    { s: { r: 0, c: 5 }, e: { r: 0, c: 73 } }, // UPDRS
    { s: { r: 1, c: 5 }, e: { r: 1, c: 27 } }, // MedicineX
    { s: { r: 1, c: 28 }, e: { r: 1, c: 50 } }, // EffectOff
    { s: { r: 1, c: 51 }, e: { r: 1, c: 73 } }, // EffectOn
  ];
  ws['!merges'] = merge;

  // TEST CODE: for file name
  const date = new Date();
  const fileName = `${date.getDate()}T${date.getHours()}_${date.getMinutes()}`;

  const downloadFile = () => {
    XLSX.writeFile(wb, `${fileName}.xlsx`, {});
  };

  return (
    <>
      <button onClick={downloadFile}>@@EXCEL CHANGE TEST@@</button>
      <hr />
      <UploadExcelTest />
    </>
  );
}
