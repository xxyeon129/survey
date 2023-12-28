import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';

interface RedirectionTableContentProps {
  question: SurveyContentObjectType;
  surveyStateKeyword: string;
  sessionStorageDataList: { [key: string]: string };
  surveyNumber: string;
}

export default function RedirectionTableContent(props: RedirectionTableContentProps) {
  // for create responseState when uploaded excel file exist
  const setLocalStorage = useSetRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}`)
  );

  const haveUploadedExcelFileRawData = Object.keys(props.sessionStorageDataList).length > 0;

  // for radio button checked according to uploaded excel file progress
  useEffect(() => {
    if (haveUploadedExcelFileRawData) {
      const uploadedExcelDataFromSessionStorage =
        props.sessionStorageDataList[`${props.surveyNumber}_${props.question.No}`];
      setLocalStorage(uploadedExcelDataFromSessionStorage);
    }
  }, []);

  return <></>;
}
