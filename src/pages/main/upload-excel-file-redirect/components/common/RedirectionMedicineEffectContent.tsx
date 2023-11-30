import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// constants
import { NOT_TAKE_MEDICINE, TAKE_MEDICINE } from 'pages/survey/survey-01-UPDRS/survey.const';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import {
  UploadedResponseDataGroupedListType,
  UploadedResponseDataListType,
  UploadedResponseDataType,
} from 'common/layout/header/excelFileHandle/types/uploadedResponseData.type';

interface RedirectMedicineEffectContentProps {
  question: SurveyContentObjectType;
  surveyStateKeyword: string;

  uploadedExcelFileDataList: UploadedResponseDataListType | UploadedResponseDataGroupedListType;
  uploadedExcelDataPreQuestionAnswer: string;
}

export default function RedirectionMedicineEffectContent(
  props: RedirectMedicineEffectContentProps
) {
  // for create responseState when uploaded excel file exist
  // not take medicine
  const setNotTakeMedicine_responseValue = useSetRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}`)
  );
  // take medicine
  const [takeMedicine_responseValue, setTakeMedicine_responseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}-${TAKE_MEDICINE}`)
  );

  useEffect(() => {
    if (props.uploadedExcelFileDataList.length > 0) {
      if (
        // not take medicine
        props.uploadedExcelDataPreQuestionAnswer === NOT_TAKE_MEDICINE
      ) {
        const uploadedExcelDataResponse = props.uploadedExcelFileDataList[
          props.question.No
        ] as UploadedResponseDataType;
        if (uploadedExcelDataResponse !== undefined && '응답내용' in uploadedExcelDataResponse) {
          setNotTakeMedicine_responseValue(uploadedExcelDataResponse.응답내용);
        }
      } else if (
        // take medicine
        props.uploadedExcelDataPreQuestionAnswer === TAKE_MEDICINE
      ) {
        if (takeMedicine_responseValue.length === 0) {
          const uploadedExcelDataResponse = props.uploadedExcelFileDataList[props.question.No];
          if (
            uploadedExcelDataResponse !== undefined &&
            // for prevent typescript error
            '응답내용' in uploadedExcelDataResponse &&
            typeof uploadedExcelDataResponse.응답내용 === 'string'
          ) {
            setTakeMedicine_responseValue(uploadedExcelDataResponse.응답내용);
          }
        }
      }
    }
  }, []);

  return <></>;
}
