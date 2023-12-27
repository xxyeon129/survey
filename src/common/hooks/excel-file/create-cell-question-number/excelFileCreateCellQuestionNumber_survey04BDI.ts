import { BDI_QUESTIONS } from 'pages/survey/survey-04-BDI/survey.const';
import { WS_COLUMN_SURVEY_04_BDI } from 'pages/test/excelWorksheetColumn.const';
import * as XLSX from 'xlsx';

export function excelFileCreateCellQuestionNumber_survey04BDI(ws: XLSX.WorkSheet) {
  const additionalQuestionLength = 1;
  const questionLength = BDI_QUESTIONS.length + additionalQuestionLength;

  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      const additionalQuestionCellNumber = 20;

      if (questionNumber < additionalQuestionCellNumber) {
        ws[`${WS_COLUMN_SURVEY_04_BDI[i]}3`] = {
          t: 's',
          v: questionNumber,
        };
      }

      if (questionNumber === additionalQuestionCellNumber) {
        ws[`${WS_COLUMN_SURVEY_04_BDI[i]}3`] = {
          t: 's',
          v: '19_1',
        };
      }

      if (questionNumber > additionalQuestionCellNumber) {
        ws[`${WS_COLUMN_SURVEY_04_BDI[i]}3`] = {
          t: 's',
          v: questionNumber - additionalQuestionLength,
        };
      }
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_04_BDI[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
}
