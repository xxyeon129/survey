import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// components
import RedirectionShortAnswersContent from './common/RedirectionShortAnswersContent';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { uploadedResponseStates } from 'pages/test/uploadedResponseDataStates/uploadedResponseData.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  RBD_QUESTIONS,
  SURVEY_05_RBD_STATE_KEYWORD,
} from 'pages/survey/survey-05-RBD/survey.const';

export default function Redirection05RBD() {
  const questions = RBD_QUESTIONS;

  // for apply uploaded excel file progress
  const uploadedExcelFileDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[5].TITLE)
  );

  // for pre-question radio button checked according to uploaded excel file progress
  const setPreQuestionResponseValue = useSetRecoilState(
    responseState(`${SURVEY_05_RBD_STATE_KEYWORD}-pre`)
  );

  useEffect(() => {
    if (
      uploadedExcelFileDataList.length > 0 &&
      uploadedExcelFileDataList[0] !== undefined &&
      uploadedExcelFileDataList[0].응답내용.length > 0
    ) {
      setPreQuestionResponseValue(uploadedExcelFileDataList[0].응답내용);
    }
  }, []);

  return (
    <>
      {questions.map((question) => (
        <RedirectionShortAnswersContent
          question={question}
          uploadedExcelFileDataList={uploadedExcelFileDataList}
          surveyStateKeyword={SURVEY_05_RBD_STATE_KEYWORD}
          havePreQuestion={true}
          key={uuidv4()}
        />
      ))}
    </>
  );
}
