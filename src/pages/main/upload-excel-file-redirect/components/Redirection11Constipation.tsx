import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue } from 'recoil';
// components
import RedirectionTableContent from './common/RedirectionTableContent';
// states
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  CONSTIPATION_QUESTIONS,
  SURVEY_11_CONSTIPATION_STATE_KEYWORD,
} from 'pages/survey/survey-11-CONSTIPATION/survey.const';

export default function Redirection11Constipation() {
  const questions = CONSTIPATION_QUESTIONS;

  // for apply uploaded excel file progress
  const sessionStorageDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[11].TITLE)
  );

  return (
    <>
      {questions.map((question) => (
        <RedirectionTableContent
          question={question}
          surveyStateKeyword={SURVEY_11_CONSTIPATION_STATE_KEYWORD}
          sessionStorageDataList={sessionStorageDataList}
          surveyNumber="11"
          key={uuidv4()}
        />
      ))}
    </>
  );
}
