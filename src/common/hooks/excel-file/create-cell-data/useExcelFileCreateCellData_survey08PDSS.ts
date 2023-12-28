import { survey08PDSS_excelData } from 'common/layout/header/excelFileHandle/states/responseDataSelectors/survey08PDSS_excelData';
import { PDSS_QUESTIONS } from 'pages/survey/survey-08-PDSS/survey.const';
import { useRecoilValue } from 'recoil';

export default function useExcelFileCreateCellData_survey08PDSS() {
  const responseData: { [key: string]: string } = {};

  const responseList = useRecoilValue(survey08PDSS_excelData);

  const surveyNumber = '08';
  const questionLength = PDSS_QUESTIONS.length;

  let sum: string | number = '';

  // add response data
  for (let responseListIndex = 0; responseListIndex < questionLength; responseListIndex++) {
    const questionNumber = responseListIndex + 1;
    const responseRecoilState = responseList[responseListIndex][`${questionNumber}`] || '';
    // add response cell data
    responseData[`${surveyNumber}_${questionNumber}`] = responseRecoilState;

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
