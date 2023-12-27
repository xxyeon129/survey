import { useRecoilValue } from 'recoil';
import { survey03BAI_excelData } from 'common/layout/header/excelFileHandle/states/responseDataSelectors/survey03BAI_excelData';
import { BAI_QUESTIONS } from 'pages/survey/survey-03-BAI/survey.const';

export default function useExcelFileCreateCellData_survey03BAI() {
  const responseData: { [key: string]: string } = {};

  const responseList = useRecoilValue(survey03BAI_excelData);

  const surveyNumber = '03';
  const questionLength = BAI_QUESTIONS.length;

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
