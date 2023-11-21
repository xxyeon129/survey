import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// states
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// constants
import {
  BDI_QUESTIONS,
  SURVEY_04_BDI_STATE_KEYWORD,
} from 'pages/survey/survey-04-BDI/survey.const';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { UploadedResponseDataListType } from 'common/layout/header/excelFileHandle/types/uploadedResponseData.type';

export default function Redirection04BDI() {
  const questions = BDI_QUESTIONS;

  // for apply uploaded excel file response data
  const uploadedExcelFileDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[4].TITLE)
  );

  return (
    <>
      {questions.map((question) => (
        <Redirection04BDIContent
          question={question}
          uploadedExcelFileDataList={uploadedExcelFileDataList}
          key={uuidv4()}
        />
      ))}
    </>
  );
}

interface Redirection04BDIContentProps {
  question: SurveyContentObjectType;
  uploadedExcelFileDataList: UploadedResponseDataListType;
}

function Redirection04BDIContent(props: Redirection04BDIContentProps) {
  // for create responseState when uploaded excel file exist
  const setResponseValue = useSetRecoilState(
    responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-${props.question.No}`)
  );

  // for radio button checked according to uploaded excel file progress
  // const [uploadedExcelDataAnswer, setUploadedExcelDataAnswer] = useState('');

  const isQuestionsBeforeAdditionalQuestion = props.question.No <= 19;

  useEffect(() => {
    if (props.uploadedExcelFileDataList.length > 0) {
      if (isQuestionsBeforeAdditionalQuestion) {
        // for before additional question(19-1) index setting
        // setUploadedExcelDataAnswer(props.uploadedExcelFileDataList[props.question.No - 1].응답내용);
        setResponseValue(props.uploadedExcelFileDataList[props.question.No - 1].응답내용);
      } else {
        // for after additional question(19-1) index setting
        // setUploadedExcelDataAnswer(props.uploadedExcelFileDataList[props.question.No].응답내용);
        setResponseValue(props.uploadedExcelFileDataList[props.question.No].응답내용);
      }
    }
  }, []);

  // for additional question radio button checked according to uploaded excel file progress
  const setAdditionalQuestionResponseValue = useSetRecoilState(
    responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-19-additional`)
  );
  // const [uploadedExcelDataAdditionalQuestionAnswer, setUploadedExcelDataAdditionalQuestionAnswer] =
  //   useState('');
  const additionalQuestionIndex = 19;
  useEffect(() => {
    if (props.uploadedExcelFileDataList.length > 0) {
      setAdditionalQuestionResponseValue(
        props.uploadedExcelFileDataList[additionalQuestionIndex].응답내용
      );
    }
  }, []);

  return <></>;
}
