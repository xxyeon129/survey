import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue } from 'recoil';
// components
import RedirectionShortAnswersContent from './common/RedirectionShortAnswersContent';
// states
import { uploadedResponseStates } from 'pages/test/uploadedResponseDataStates/uploadedResponseData.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  CONSTIPATION_QUESTIONS,
  SURVEY_11_CONSTIPATION_STATE_KEYWORD,
} from 'pages/survey/survey-11-CONSTIPATION/survey.const';

export default function Redirection11Constipation() {
  const questions = CONSTIPATION_QUESTIONS;

  // for apply uploaded excel file progress
  const uploadedExcelFileDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[11].TITLE)
  );

  return (
    <>
      {questions.map((question) => (
        <RedirectionShortAnswersContent
          question={question}
          uploadedExcelFileDataList={uploadedExcelFileDataList}
          surveyStateKeyword={SURVEY_11_CONSTIPATION_STATE_KEYWORD}
          key={uuidv4()}
        />
      ))}
    </>
  );
}
