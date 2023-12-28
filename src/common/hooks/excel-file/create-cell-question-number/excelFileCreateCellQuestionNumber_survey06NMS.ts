import { NMS_QUESTIONS } from 'pages/survey/survey-06-NMS/survey.const';
import * as XLSX from 'xlsx';
import { WS_COLUMN_SURVEY_06_NMS } from '../constants/excelWorksheetColumn.const';
import { survey06NMS_cellQuestionNumberList } from '../constants/excelFileSectionSurvey06NMS.const';

export function excelFileCreateCellQuestionNumber_survey06NMS(ws: XLSX.WorkSheet) {
  const sectionSumLength = 9;
  const questionLength = NMS_QUESTIONS.length + sectionSumLength;

  for (let i = 0; i <= questionLength; i++) {
    const sumColumnIndex = questionLength;

    if (i < sumColumnIndex) {
      ws[`${WS_COLUMN_SURVEY_06_NMS[i]}3`] = {
        t: 's',
        v: survey06NMS_cellQuestionNumberList[i],
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_06_NMS[i]}3`] = {
        t: 's',
        v: 'Total',
      };
    }
  }
}
