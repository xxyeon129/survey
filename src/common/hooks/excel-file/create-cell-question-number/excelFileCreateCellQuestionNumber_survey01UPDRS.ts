import * as XLSX from 'xlsx';
import { UPDRS_QUESTIONS } from 'pages/survey/survey-01-UPDRS/survey.const';
import { WS_COLUMN_SURVEY_01_UPDRS } from 'common/hooks/excel-file/constants/excelWorksheetColumn.const';

export function excelFileCreateCellQuestionNumber_survey01UPDRS(ws: XLSX.WorkSheet) {
  const survey01UPDRS_questionLength = UPDRS_QUESTIONS.length; // 22

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
  // medicine effect off case
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
  // medicine effect on case
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
}
