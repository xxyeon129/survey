import { survey04BDI_excelData } from 'common/layout/header/excelFileHandle/states/responseDataSelectors/survey04BDI_excelData';
import {
  BDI_QUESTIONS,
  SURVEY_04_BDI_ADDITIONAL_QUESTION_NUMBER,
} from 'pages/survey/survey-04-BDI/survey.const';
import { useRecoilValue } from 'recoil';

export default function useExcelFileCreateCellData_survey04BDI() {
  const responseData: { [key: string]: string } = {};

  const responseList = useRecoilValue(survey04BDI_excelData);

  const surveyNumber = '04';
  const additionalQuestionLength = 1;
  const questionLength = BDI_QUESTIONS.length + additionalQuestionLength;

  let sum: string | number = '';

  // add response data
  for (let responseListIndex = 0; responseListIndex < questionLength; responseListIndex++) {
    const questionNumber = responseListIndex + 1;

    let responseRecoilState = '';

    if (responseListIndex < SURVEY_04_BDI_ADDITIONAL_QUESTION_NUMBER) {
      responseRecoilState = responseList[responseListIndex][`${questionNumber}`] || '';
      responseData[`${surveyNumber}_${questionNumber}`] = responseRecoilState;

      // additional question (question number 19)
    } else if (responseListIndex === SURVEY_04_BDI_ADDITIONAL_QUESTION_NUMBER) {
      responseRecoilState = responseList[SURVEY_04_BDI_ADDITIONAL_QUESTION_NUMBER]['19_1'] || '';
      responseData[`${surveyNumber}_19_1`] = responseRecoilState;

      // after additional question (question number 20, 21)
    } else if (responseListIndex > SURVEY_04_BDI_ADDITIONAL_QUESTION_NUMBER) {
      responseRecoilState = responseList[responseListIndex][`${responseListIndex}`] || '';
      responseData[`${surveyNumber}_${responseListIndex}`] = responseRecoilState;
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
