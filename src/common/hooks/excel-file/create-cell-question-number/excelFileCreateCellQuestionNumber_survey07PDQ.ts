import { PDQ_QUESTIONS } from 'pages/survey/survey-07-PDQ/survey.const';
import * as XLSX from 'xlsx';
import { WS_COLUMN_SURVEY_07_PDQ } from '../constants/excelWorksheetColumn.const';

export function excelFileCreateCellQuestionNumber_survey07PDQ(ws: XLSX.WorkSheet) {
  const questionLength = PDQ_QUESTIONS.length;

  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_07_PDQ[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_07_PDQ[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
}
