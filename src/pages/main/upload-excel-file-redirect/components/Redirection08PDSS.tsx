import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// states
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  PDSS_QUESTIONS,
  SURVEY_08_PDSS_STATE_KEYWORD,
} from 'pages/survey/survey-08-PDSS/survey.const';
// types
import { UploadedResponseDataType } from 'common/layout/header/excelFileHandle/types/uploadedResponseData.type';
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';

export default function Redirection08PDSS() {
  const questions = PDSS_QUESTIONS;

  // for apply uploaded excel file response
  const uploadedExcelFileDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[8].TITLE)
  );

  return (
    <>
      {questions.map((question) => (
        <RedirectionDegreeGradation
          question={question}
          uploadedExcelFileDataList={uploadedExcelFileDataList}
          key={uuidv4()}
        />
      ))}
    </>
  );
}

interface RedirectionDegreeGradationProps {
  question: SurveyContentObjectType;
  uploadedExcelFileDataList: UploadedResponseDataType[];
}

function RedirectionDegreeGradation(props: RedirectionDegreeGradationProps) {
  // for create responseState when uploaded excel file exist
  const setResponseValue = useSetRecoilState(
    responseState(`${SURVEY_08_PDSS_STATE_KEYWORD}-${props.question.No}`)
  );

  // for radio button checked according to uploaded excel file progress
  useEffect(() => {
    if (
      props.uploadedExcelFileDataList.length > 0 &&
      '응답내용' in props.uploadedExcelFileDataList[props.question.No - 1]
    ) {
      setResponseValue(props.uploadedExcelFileDataList[props.question.No - 1].응답내용);
    }
  }, []);

  return <></>;
}
