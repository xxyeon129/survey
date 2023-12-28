import { CONSTIPATION_QUESTIONS } from 'pages/survey/survey-11-CONSTIPATION/survey.const';
import * as XLSX from 'xlsx';
import { WS_COLUMN_SURVEY_11_CONSTIPATION } from '../constants/excelWorksheetColumn.const';

export function excelFileCreateCellQuestionNumber_survey11CONSTIPATION(ws: XLSX.WorkSheet) {
  const questionLength = CONSTIPATION_QUESTIONS.length;

  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_11_CONSTIPATION[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_11_CONSTIPATION[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
}
