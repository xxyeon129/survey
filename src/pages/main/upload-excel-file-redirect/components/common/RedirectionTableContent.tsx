import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { UploadedResponseDataType } from 'pages/test/types/uploadedResponseData.type';

interface RedirectionTableContentProps {
  question: SurveyContentObjectType;
  surveyStateKeyword: string;
  uploadedExcelFileDataList: UploadedResponseDataType[];
}

export default function RedirectionTableContent(props: RedirectionTableContentProps) {
  // for create responseState when uploaded excel file exist
  const setResponseValue = useSetRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}`)
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
