import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import RedirectionTableContent from './common/RedirectionTableContent';
// states
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  BAI_QUESTIONS,
  SURVEY_03_BAI_STATE_KEYWORD,
} from 'pages/survey/survey-03-BAI/survey.const';

export default function Redirection03BAI() {
  const questions = BAI_QUESTIONS;

  // for apply uploaded excel file response
  const sessionStorageDataList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[3].TITLE));

  return (
    <>
      {questions.map((question) => (
        <RedirectionTableContent
          question={question}
          surveyStateKeyword={SURVEY_03_BAI_STATE_KEYWORD}
          sessionStorageDataList={sessionStorageDataList}
          surveyNumber="03"
          key={uuidv4()}
        />
      ))}
    </>
  );
}
