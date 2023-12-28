import { survey06NMS_excelData } from 'common/layout/header/excelFileHandle/states/responseDataSelectors/survey06NMS_excelData';
import { NMS_QUESTIONS } from 'pages/survey/survey-06-NMS/survey.const';
import { sectionScoreState, totalScoreState } from 'pages/survey/survey-06-NMS/survey06NMS.state';
import { useRecoilValue } from 'recoil';
import { survey06NMS_sectionList } from '../constants/excelFileSectionSurvey06NMS.const';

export default function useExcelFileCreateCellData_survey06NMS() {
  const responseData: { [key: string]: string } = {};

  const responseList = useRecoilValue(survey06NMS_excelData);

  const surveyNumber = '06';

  // const sectionSumLength = 9;
  const questionLength = NMS_QUESTIONS.length;

  // for section sum
  const section1Score = useRecoilValue(sectionScoreState(survey06NMS_sectionList[1].stateKey));
  const section2Score = useRecoilValue(sectionScoreState(survey06NMS_sectionList[2].stateKey));
  const section3Score = useRecoilValue(sectionScoreState(survey06NMS_sectionList[3].stateKey));
  const section4Score = useRecoilValue(sectionScoreState(survey06NMS_sectionList[4].stateKey));
  const section5Score = useRecoilValue(sectionScoreState(survey06NMS_sectionList[5].stateKey));
  const section6Score = useRecoilValue(sectionScoreState(survey06NMS_sectionList[6].stateKey));
  const section7Score = useRecoilValue(sectionScoreState(survey06NMS_sectionList[7].stateKey));
  const section8Score = useRecoilValue(sectionScoreState(survey06NMS_sectionList[8].stateKey));
  const section9Score = useRecoilValue(sectionScoreState(survey06NMS_sectionList[9].stateKey));

  // for total sum
  const totalScore = useRecoilValue(totalScoreState);
  // const sum: string | number = '';

  // add response data
  for (let responseListIndex = 0; responseListIndex < questionLength; responseListIndex++) {
    const questionNumber = responseListIndex + 1;
    const responseRecoilState = responseList[responseListIndex][`${questionNumber}`] || '';
    // add response cell data
    responseData[`${surveyNumber}_${questionNumber}`] = responseRecoilState;

    // section sum ------------------------------------------------------------
    // section 1
    if (questionNumber === survey06NMS_sectionList[1].lastQuestionNumber) {
      responseData[`${surveyNumber}_${survey06NMS_sectionList[1].stateKey}`] =
        section1Score === '-' ? '' : section1Score;
    }
    // section 2
    if (questionNumber === survey06NMS_sectionList[2].lastQuestionNumber) {
      responseData[`${surveyNumber}_${survey06NMS_sectionList[2].stateKey}`] =
        section2Score === '-' ? '' : section2Score;
    }
    // section 3
    if (questionNumber === survey06NMS_sectionList[3].lastQuestionNumber) {
      responseData[`${surveyNumber}_${survey06NMS_sectionList[3].stateKey}`] =
        section3Score === '-' ? '' : section3Score;
    }
    // section 4
    if (questionNumber === survey06NMS_sectionList[4].lastQuestionNumber) {
      responseData[`${surveyNumber}_${survey06NMS_sectionList[4].stateKey}`] =
        section4Score === '-' ? '' : section4Score;
    }
    // section 5
    if (questionNumber === survey06NMS_sectionList[5].lastQuestionNumber) {
      responseData[`${surveyNumber}_${survey06NMS_sectionList[5].stateKey}`] =
        section5Score === '-' ? '' : section5Score;
    }
    // section 6
    if (questionNumber === survey06NMS_sectionList[6].lastQuestionNumber) {
      responseData[`${surveyNumber}_${survey06NMS_sectionList[6].stateKey}`] =
        section6Score === '-' ? '' : section6Score;
    }
    // section 7
    if (questionNumber === survey06NMS_sectionList[7].lastQuestionNumber) {
      responseData[`${surveyNumber}_${survey06NMS_sectionList[7].stateKey}`] =
        section7Score === '-' ? '' : section7Score;
    }
    // section 8
    if (questionNumber === survey06NMS_sectionList[8].lastQuestionNumber) {
      responseData[`${surveyNumber}_${survey06NMS_sectionList[8].stateKey}`] =
        section8Score === '-' ? '' : section8Score;
    }
    // section 9
    if (questionNumber === survey06NMS_sectionList[9].lastQuestionNumber) {
      responseData[`${surveyNumber}_${survey06NMS_sectionList[9].stateKey}`] =
        section9Score === '-' ? '' : section9Score;
    }

    // total sum ------------------------------------------------------------
    if (responseListIndex === questionLength - 1) {
      responseData[`${surveyNumber}_SUM`] = `${totalScore}` === '-' ? '' : `${totalScore}`;
    }
  }

  return responseData;
}
