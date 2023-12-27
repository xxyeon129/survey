import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// constants
import { NOT_TAKE_MEDICINE, TAKE_MEDICINE } from 'pages/survey/survey-01-UPDRS/survey.const';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';

interface RedirectMedicineEffectContentProps {
  question: SurveyContentObjectType;
  surveyStateKeyword: string;
  uploadedExcelFileRawData: { [key: string]: string };
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
  // for separate medicine effect on, off
  const [uploadedExcelTakeMedicineDataResponse, setUploadedExcelTakeMedicineDataResponse] =
    useState('');
  const medicineEffectOnQuestionEndNumber = 22;

  const haveUploadedExcelFileRawData = Object.keys(props.uploadedExcelFileRawData).length > 0;

  useEffect(() => {
    if (haveUploadedExcelFileRawData) {
      if (
        // not take medicine
        props.uploadedExcelDataPreQuestionAnswer === NOT_TAKE_MEDICINE
      ) {
        const uploadedExcelDataResponse =
          props.uploadedExcelFileRawData[`01_NOT_${props.question.No}`];

        if (uploadedExcelDataResponse !== undefined) {
          setNotTakeMedicine_responseValue(uploadedExcelDataResponse);
        }
      } else if (
        // take medicine
        props.uploadedExcelDataPreQuestionAnswer === TAKE_MEDICINE
      ) {
        if (takeMedicine_responseValue.length === 0) {
          if (props.question.No <= medicineEffectOnQuestionEndNumber) {
            setUploadedExcelTakeMedicineDataResponse(
              props.uploadedExcelFileRawData[`01_ON_${props.question.No}`]
            );
          } else if (props.question.No > medicineEffectOnQuestionEndNumber) {
            setUploadedExcelTakeMedicineDataResponse(
              props.uploadedExcelFileRawData[
                `01_OFF_${props.question.No - medicineEffectOnQuestionEndNumber}`
              ]
            );
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (uploadedExcelTakeMedicineDataResponse.length > 0) {
      setTakeMedicine_responseValue(uploadedExcelTakeMedicineDataResponse);
    }
  }, [uploadedExcelTakeMedicineDataResponse]);

  return <></>;
}
