import { v4 as uuidv4 } from 'uuid';
import {
  SCOPA_QUESTIONS,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from 'pages/survey/survey-10-SCOPA/survey.const';
import RedirectionShortAnswersContent from './common/RedirectionShortAnswersContent';
import { useRecoilValue } from 'recoil';
import { uploadedResponseStates } from 'pages/test/uploadedResponseDataStates/uploadedResponseData.state';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';

export default function Redirection10SCOPA() {
  const questions = SCOPA_QUESTIONS;

  // for apply uploaded excel file response
  const uploadedExcelFileDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[10].TITLE)
  );

  return (
    <>
      {questions.map((question) => (
        <RedirectionShortAnswersContent
          question={question}
          uploadedExcelFileDataList={uploadedExcelFileDataList}
          surveyStateKeyword={SURVEY_10_SCOPA_STATE_KEYWORD}
          key={uuidv4()}
        />
      ))}
    </>
  );
}
