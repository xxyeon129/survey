import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { UploadedResponseDataListType } from 'pages/test/types/uploadedResponseData.type';

interface RedirectionShortAnswersContentProps {
  question: SurveyContentObjectType;
  uploadedExcelFileDataList: UploadedResponseDataListType;
  surveyStateKeyword: string;
  // for survey-05-RBD
  havePreQuestion?: boolean;
}

export default function RedirectionShortAnswersContent(props: RedirectionShortAnswersContentProps) {
  // for create responseState when uploaded excel file exist
  const setResponseValue = useSetRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}`)
  );

  // for radio button checked according to uploaded excel file progress
  useEffect(() => {
    if (props.uploadedExcelFileDataList.length > 0) {
      if (
        props.havePreQuestion &&
        props.uploadedExcelFileDataList[props.question.No] !== undefined &&
        props.uploadedExcelFileDataList[props.question.No].응답내용.length > 0
      ) {
        // for survey-05-RBD pre question index setting
        setResponseValue(props.uploadedExcelFileDataList[props.question.No].응답내용);
      } else if (
        props.uploadedExcelFileDataList[props.question.No - 1] !== undefined &&
        props.uploadedExcelFileDataList[props.question.No - 1].응답내용.length > 0
      ) {
        // for not have pre question page index setting
        setResponseValue(props.uploadedExcelFileDataList[props.question.No - 1].응답내용);
      }
    }
  }, []);

  return <></>;
}
