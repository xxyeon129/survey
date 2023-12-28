import * as XLSX from 'xlsx';
import { PDSS_QUESTIONS } from 'pages/survey/survey-08-PDSS/survey.const';
import { WS_COLUMN_SURVEY_08_PDSS } from '../constants/excelWorksheetColumn.const';

export function excelFileCreateCellQuestionNumber_survey08PDSS(ws: XLSX.WorkSheet) {
  const questionLength = PDSS_QUESTIONS.length;

  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_08_PDSS[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_08_PDSS[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
}
