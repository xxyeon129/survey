import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// constants
import {
  MEDICINE_EFFECT_FALSE,
  MEDICINE_EFFECT_TRUE,
} from 'pages/survey/common/components/survey-contents/survey-contents-with-medicine-effect/surveyContent.const';
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
  // take medicine - when have medicine effect
  const [medicineEffectTrue_responseValue, setMedicineEffectTrue_responseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}-${MEDICINE_EFFECT_TRUE}`)
  );
  // take medicine - when no medicine effect
  const [medicineEffectFalse_responseValue, setMedicineEffectFalse_responseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}-${MEDICINE_EFFECT_FALSE}`)
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
        props.uploadedExcelDataPreQuestionAnswer === TAKE_MEDICINE &&
        Array.isArray(props.uploadedExcelFileDataList[props.question.No - 1])
      ) {
        if (medicineEffectTrue_responseValue.length === 0) {
          // take medicine - when have medicine effect
          const uploadedExcelDataResponse = props.uploadedExcelFileDataList[props.question.No - 1];
          if (
            uploadedExcelDataResponse !== undefined &&
            Array.isArray(uploadedExcelDataResponse) &&
            uploadedExcelDataResponse.length > 0 &&
            // for prevent typescript error
            '응답내용' in uploadedExcelDataResponse[0] &&
            typeof uploadedExcelDataResponse[0].응답내용 === 'string'
          ) {
            setMedicineEffectTrue_responseValue(uploadedExcelDataResponse[0].응답내용);
          }
        }
        if (medicineEffectFalse_responseValue.length === 0) {
          // take medicine - when no medicine effect
          const uploadedExcelDataResponse = props.uploadedExcelFileDataList[props.question.No - 1];
          if (
            uploadedExcelDataResponse !== undefined &&
            Array.isArray(uploadedExcelDataResponse) &&
            uploadedExcelDataResponse.length > 0 &&
            // for prevent typescript error
            '응답내용' in uploadedExcelDataResponse[1] &&
            typeof uploadedExcelDataResponse[1].응답내용 === 'string'
          ) {
            setMedicineEffectFalse_responseValue(uploadedExcelDataResponse[1].응답내용);
          }
        }
      }
    }
  }, []);

  return <></>;
}
