import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// states
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// constants
import {
  BDI_QUESTIONS,
  SURVEY_04_BDI_ADDITIONAL_QUESTION_NUMBER,
  SURVEY_04_BDI_STATE_KEYWORD,
} from 'pages/survey/survey-04-BDI/survey.const';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';

export default function Redirection04BDI() {
  const questions = BDI_QUESTIONS;

  // for apply uploaded excel file response data
  const sessionStorageDataList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[4].TITLE));

  return (
    <>
      {questions.map((question) => (
        <Redirection04BDIContent
          question={question}
          sessionStorageDataList={sessionStorageDataList}
          key={uuidv4()}
        />
      ))}
    </>
  );
}

interface Redirection04BDIContentProps {
  question: SurveyContentObjectType;
  sessionStorageDataList: { [key: string]: string };
}

function Redirection04BDIContent(props: Redirection04BDIContentProps) {
  // for create responseState when uploaded excel file exist
  const setLocalStorage = useSetRecoilState(
    responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-${props.question.No}`)
  );
  // for additional question radio button checked according to uploaded excel file progress
  const setAdditionalQuestionLocalStorage = useSetRecoilState(
    responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-19-additional`)
  );

  const haveSessionStorageData = Object.keys(props.sessionStorageDataList).length > 0;

  // for radio button checked according to uploaded excel file progress
  const isAdditionalQuestionNumber = props.question.No === SURVEY_04_BDI_ADDITIONAL_QUESTION_NUMBER;

  useEffect(() => {
    if (haveSessionStorageData) {
      // for before additional question(19-1) index setting
      const uploadedExcelDataFromSessionStorage =
        props.sessionStorageDataList[`04_${props.question.No}`];
      setLocalStorage(uploadedExcelDataFromSessionStorage);

      if (isAdditionalQuestionNumber) {
        const uploadedExcelDataFromSessionStorage = props.sessionStorageDataList[`04_19_1`];
        setAdditionalQuestionLocalStorage(uploadedExcelDataFromSessionStorage);
      }
    }
  }, []);

  return <></>;
}
