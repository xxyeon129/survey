import { RBD_QUESTIONS } from 'pages/survey/survey-05-RBD/survey.const';
import * as XLSX from 'xlsx';
import { WS_COLUMN_SURVEY_05_RBD } from '../constants/excelWorksheetColumn.const';

export function excelFileCreateCellQuestionNumber_survey05RBD(ws: XLSX.WorkSheet) {
  const preQuestionLength = 1;
  const questionLength = RBD_QUESTIONS.length + preQuestionLength;

  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i;

      if (i === 0) {
        ws[`${WS_COLUMN_SURVEY_05_RBD[0]}3`] = {
          t: 's',
          v: '작성자',
        };
      } else {
        ws[`${WS_COLUMN_SURVEY_05_RBD[i]}3`] = {
          t: 's',
          v: questionNumber,
        };
      }
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_05_RBD[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
}
