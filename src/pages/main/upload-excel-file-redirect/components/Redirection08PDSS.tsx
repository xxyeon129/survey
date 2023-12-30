import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import RedirectionTableContent from './common/RedirectionTableContent';
// states
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  PDSS_QUESTIONS,
  SURVEY_08_PDSS_STATE_KEYWORD,
} from 'pages/survey/survey-08-PDSS/survey.const';

export default function Redirection08PDSS() {
  const questions = PDSS_QUESTIONS;

  // for apply uploaded excel file response
  const sessionStorageDataList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[8].TITLE));

  return (
    <>
      {questions.map((question) => (
        <RedirectionTableContent
          question={question}
          surveyStateKeyword={SURVEY_08_PDSS_STATE_KEYWORD}
          sessionStorageDataList={sessionStorageDataList}
          surveyNumber="08"
          key={uuidv4()}
        />
      ))}
    </>
  );
}
