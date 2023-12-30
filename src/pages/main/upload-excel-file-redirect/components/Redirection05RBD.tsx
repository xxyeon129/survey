import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// components
import RedirectionForHavePreQuestionContent from './common/RedirectionForHavePreQuestionContent';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  RBD_PRE_QUESTION,
  RBD_QUESTIONS,
  SURVEY_05_RBD_STATE_KEYWORD,
} from 'pages/survey/survey-05-RBD/survey.const';

export default function Redirection05RBD() {
  const questions = [RBD_PRE_QUESTION, ...RBD_QUESTIONS];

  // for apply uploaded excel file progress
  const sessionStorageDataList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[5].TITLE));

  // for pre-question radio button checked according to uploaded excel file progress
  const setPreQuestionLocalStorage = useSetRecoilState(
    responseState(`${SURVEY_05_RBD_STATE_KEYWORD}-pre`)
  );

  const surveyNumber = '05';

  return (
    <>
      {questions.map((question) => (
        <RedirectionForHavePreQuestionContent
          question={question}
          surveyStateKeyword={SURVEY_05_RBD_STATE_KEYWORD}
          sessionStorageDataList={sessionStorageDataList}
          surveyNumber={surveyNumber}
          setPreQuestionLocalStorage={setPreQuestionLocalStorage}
          key={uuidv4()}
        />
      ))}
    </>
  );
}
