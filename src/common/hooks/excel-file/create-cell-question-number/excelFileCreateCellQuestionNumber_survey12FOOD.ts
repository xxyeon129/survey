import { FOOD_QUESTIONS } from 'pages/survey/survey-12-FOOD/survey.const';
import * as XLSX from 'xlsx';
import { WS_COLUMN_SURVEY_12_FOOD } from '../constants/excelWorksheetColumn.const';

export function excelFileCreateCellQuestionNumber_survey12FOOD(ws: XLSX.WorkSheet) {
  const questionLength = FOOD_QUESTIONS.length;

  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      const questionNumber = i + 1;
      ws[`${WS_COLUMN_SURVEY_12_FOOD[i]}3`] = {
        t: 's',
        v: questionNumber,
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_12_FOOD[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
}
