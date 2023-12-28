import {
  SCOPA_QUESTIONS,
  SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST,
} from 'pages/survey/survey-10-SCOPA/survey.const';
import * as XLSX from 'xlsx';
import { WS_COLUMN_SURVEY_10_SCOPA } from '../constants/excelWorksheetColumn.const';

function getCellList() {
  const cellList = [];
  const inputQuestionsLength = 3;
  const questionsLength = SCOPA_QUESTIONS.length + inputQuestionsLength;

  const maleAdditionalQuestionTitle = '23a';
  const maleAdditionalQuestionNumber = 23;
  const inputQuestionStartNumber = 26;

  for (let questionNumber = 1; questionNumber < questionsLength; questionNumber++) {
    if (questionNumber < inputQuestionStartNumber) {
      cellList.push(`${questionNumber}`);
      questionNumber === maleAdditionalQuestionNumber && cellList.push(maleAdditionalQuestionTitle);
    } else if (questionNumber >= inputQuestionStartNumber) {
      const lastInputQuestionKeyAlphabet =
        SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST[
          questionNumber - inputQuestionStartNumber
        ];
      cellList.push(`${inputQuestionStartNumber}${lastInputQuestionKeyAlphabet}`);
    }
  }

  return cellList;
}

export function excelFileCreateCellQuestionNumber_survey10SCOPA(ws: XLSX.WorkSheet) {
  const cellList = getCellList();

  for (let i = 0; i <= cellList.length; i++) {
    const sumColumnIndex = cellList.length;

    if (i < sumColumnIndex) {
      ws[`${WS_COLUMN_SURVEY_10_SCOPA[i]}3`] = {
        t: 's',
        v: cellList[i],
      };
    } else if (i === sumColumnIndex) {
      // add sum title
      ws[`${WS_COLUMN_SURVEY_10_SCOPA[i]}3`] = {
        t: 's',
        v: 'SUM',
      };
    }
  }
}
