import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import RedirectionTableContent from './common/RedirectionTableContent';
// states
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  PDQ_QUESTIONS,
  SURVEY_07_PDQ_STATE_KEYWORD,
} from 'pages/survey/survey-07-PDQ/survey.const';

export default function Redirection07PDQ() {
  const questions = PDQ_QUESTIONS;

  // for apply uploaded excel file response
  const sessionStorageDataList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[7].TITLE));

  return (
    <>
      {questions.map((question) => (
        <RedirectionTableContent
          question={question}
          surveyStateKeyword={SURVEY_07_PDQ_STATE_KEYWORD}
          sessionStorageDataList={sessionStorageDataList}
          surveyNumber="07"
          key={uuidv4()}
        />
      ))}
    </>
  );
}
