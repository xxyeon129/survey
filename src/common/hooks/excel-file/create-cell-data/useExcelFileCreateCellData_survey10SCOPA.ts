import { survey10SCOPA_excelData } from 'common/layout/header/excelFileHandle/states/responseDataSelectors/survey10SCOPA_excelData';
import {
  SCOPA_QUESTIONS,
  SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST,
} from 'pages/survey/survey-10-SCOPA/survey.const';
import { useRecoilValue } from 'recoil';

export default function useExcelFileCreateCellData_survey10SCOPA() {
  const responseData: { [key: string]: string } = {};

  const responseList = useRecoilValue(survey10SCOPA_excelData);

  const surveyNumber = '10';
  const inputQuestionsLength = 3;
  const questionLength = SCOPA_QUESTIONS.length + inputQuestionsLength;

  let sum: string | number = '';

  // add response data
  for (let responseListIndex = 0; responseListIndex < questionLength; responseListIndex++) {
    const questionNumber = responseListIndex + 1;

    let responseRecoilState = '';
    const maleAdditionalQuestionIndex = 23;
    const maleAdditionalQuestionKey = '23a';
    const lastInputQuestionStartIndex = 26;

    if (responseListIndex < maleAdditionalQuestionIndex) {
      responseRecoilState = responseList[responseListIndex][`${questionNumber}`] || '';
      responseData[`${surveyNumber}_${questionNumber}`] = responseRecoilState;
    } else if (responseListIndex === maleAdditionalQuestionIndex) {
      responseRecoilState =
        responseList[maleAdditionalQuestionIndex][`${maleAdditionalQuestionKey}`] || '';
      responseData[`${surveyNumber}_${maleAdditionalQuestionKey}`] = responseRecoilState;
    } else if (responseListIndex > maleAdditionalQuestionIndex) {
      if (responseListIndex < lastInputQuestionStartIndex) {
        const femaleQuestionNumber = questionNumber - 1;
        responseRecoilState = responseList[responseListIndex][`${questionNumber}`] || '';
        responseData[`${surveyNumber}_${femaleQuestionNumber}`] = responseRecoilState;
      } else if (responseListIndex >= lastInputQuestionStartIndex) {
        const lastInputQuestionKeyAlphabet =
          SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST[
            responseListIndex - lastInputQuestionStartIndex
          ];
        const lastInputQuestionNumber = `${lastInputQuestionStartIndex}${lastInputQuestionKeyAlphabet}`;
        responseRecoilState = responseList[responseListIndex][lastInputQuestionNumber] || '';
        responseData[`${surveyNumber}_${lastInputQuestionNumber}`] = responseRecoilState;
      }
    }

    // get sum
    if (responseRecoilState.length > 0) {
      if (responseListIndex === 0) sum = 0;
      if (typeof sum === 'number') {
        sum += parseInt(responseRecoilState);
      }
    }
    // apply sum cell data
    if (responseListIndex === questionLength - 1) {
      responseData[`${surveyNumber}_SUM`] = `${sum}`;
    }
  }

  return responseData;
}
