import { FG_QUESTIONS } from 'pages/survey/survey-02-FG/survey.const';
import { WS_COLUMN_SURVEY_02_FG } from 'pages/test/excelWorksheetColumn.const';
import * as XLSX from 'xlsx';

export function excelFileCreateCellQuestionNumber_survey02FG(ws: XLSX.WorkSheet) {
  const questionLength = FG_QUESTIONS.length; // 6

  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_02_FG.NOT_TAKE[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_02_FG.NOT_TAKE[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
  // medicine effect off case
  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_02_FG.EFFECT_OFF[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_02_FG.EFFECT_OFF[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
  // medicine effect on case
  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_02_FG.EFFECT_ON[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_02_FG.EFFECT_ON[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
}
