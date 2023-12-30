import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import RedirectionTableContent from './common/RedirectionTableContent';
// states
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
// constants
import {
  FOOD_QUESTIONS,
  SURVEY_12_FOOD_STATE_KEYWORD,
} from 'pages/survey/survey-12-FOOD/survey.const';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';

export default function Redirection12Food() {
  const questions = FOOD_QUESTIONS;

  // for apply uploaded excel file response
  const sessionStorageDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[12].TITLE)
  );

  return (
    <>
      {questions.map((question) => (
        <RedirectionTableContent
          question={question}
          surveyStateKeyword={SURVEY_12_FOOD_STATE_KEYWORD}
          sessionStorageDataList={sessionStorageDataList}
          surveyNumber="12"
          key={uuidv4()}
        />
      ))}
    </>
  );
}
