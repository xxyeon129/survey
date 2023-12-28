import { TIRED_QUESTIONS } from 'pages/survey/survey-09-TIRED/survey.const';
import * as XLSX from 'xlsx';
import { WS_COLUMN_SURVEY_09_TIRED } from '../constants/excelWorksheetColumn.const';

export function excelFileCreateCellQuestionNumber_survey09TIRED(ws: XLSX.WorkSheet) {
  const questionLength = TIRED_QUESTIONS.length;

  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_09_TIRED[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_09_TIRED[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
}
