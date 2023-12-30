import { useEffect } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';

interface RedirectionShortAnswersContentProps {
  question: SurveyContentObjectType;
  surveyStateKeyword: string;
  sessionStorageDataList: { [key: string]: string };
  surveyNumber: string;

  // survey-05-RBD pre-question
  setPreQuestionLocalStorage?: SetterOrUpdater<string>;
}

export default function RedirectionShortAnswersContent(props: RedirectionShortAnswersContentProps) {
  // for create responseState when uploaded excel file exist
  const setLocalStorage = useSetRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}`)
  );

  const haveUploadedExcelFileRawData = Object.keys(props.sessionStorageDataList).length > 0;

  // for radio button checked according to uploaded excel file progress
  useEffect(() => {
    if (haveUploadedExcelFileRawData) {
      if (props.setPreQuestionLocalStorage) {
        if (props.question.No === 0) {
          const uploadedExcelDataFromSessionStorage =
            props.sessionStorageDataList[`${props.surveyNumber}_PRE`];

          props.setPreQuestionLocalStorage(uploadedExcelDataFromSessionStorage);
        } else {
          const uploadedExcelDataFromSessionStorage =
            props.sessionStorageDataList[`${props.surveyNumber}_${props.question.No}`];

          setLocalStorage(uploadedExcelDataFromSessionStorage);
        }
      } else {
        const uploadedExcelDataFromSessionStorage =
          props.sessionStorageDataList[`${props.surveyNumber}_${props.question.No}`];

        setLocalStorage(uploadedExcelDataFromSessionStorage);
      }
    }
  }, []);

  return <></>;
}
