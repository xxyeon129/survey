import { survey05RBD_excelData } from 'common/layout/header/excelFileHandle/states/responseDataSelectors/survey05RBD_excelData';
import { RBD_QUESTIONS } from 'pages/survey/survey-05-RBD/survey.const';
import { useRecoilValue } from 'recoil';

export default function useExcelFileCreateCellData_survey05RBD() {
  const responseData: { [key: string]: string } = {};

  const responseList = useRecoilValue(survey05RBD_excelData);

  const surveyNumber = '05';
  const preQuestionLength = 1;
  const questionLength = RBD_QUESTIONS.length + preQuestionLength;

  let sum: string | number = '';

  // pre question
  const preQuestionResponseRecoilState = responseList[0]['pre'] || '';
  responseData[`${surveyNumber}_PRE`] = preQuestionResponseRecoilState;

  for (let responseListIndex = 1; responseListIndex < questionLength; responseListIndex++) {
    const responseRecoilState = responseList[responseListIndex][`${responseListIndex}`] || '';
    // add response cell data
    responseData[`${surveyNumber}_${responseListIndex}`] = responseRecoilState;

    // get sum
    if (responseRecoilState.length > 0) {
      if (responseListIndex === 1) sum = 0;
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
