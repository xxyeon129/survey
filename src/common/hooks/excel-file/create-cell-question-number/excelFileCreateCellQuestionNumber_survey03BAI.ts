import { BAI_QUESTIONS } from 'pages/survey/survey-03-BAI/survey.const';
import { WS_COLUMN_SURVEY_03_BAI } from 'pages/test/excelWorksheetColumn.const';
import * as XLSX from 'xlsx';

export function excelFileCreateCellQuestionNumber_survey03BAI(ws: XLSX.WorkSheet) {
  const questionLength = BAI_QUESTIONS.length;

  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_03_BAI[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_03_BAI[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
}
