import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// components
import RedirectionShortAnswersContent from './common/RedirectionShortAnswersContent';
// states
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  SCOPA_QUESTIONS,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from 'pages/survey/survey-10-SCOPA/survey.const';
// types
import {
  UploadedResponseDataGroupedListType,
  UploadedResponseDataListType,
} from 'common/layout/header/excelFileHandle/types/uploadedResponseData.type';

export default function Redirection10SCOPA() {
  const questions = SCOPA_QUESTIONS;

  // for apply uploaded excel file response
  const uploadedExcelFileRawDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[10].TITLE)
  );

  const medicineCheckQuestionStartIndex = questions.length - 1;

  const uploadedExcelFileDataList = uploadedExcelFileRawDataList.slice(
    0,
    medicineCheckQuestionStartIndex
  );

  // for apply last medicine check question
  const medicineCheckRawDataList = uploadedExcelFileRawDataList.slice(
    medicineCheckQuestionStartIndex
  );

  const medicineCheckDataList: UploadedResponseDataGroupedListType = [];
  for (let i = 0; i < medicineCheckRawDataList.length; i += 2) {
    const questionGroup: UploadedResponseDataListType = [
      medicineCheckRawDataList[i],
      medicineCheckRawDataList[i + 1],
    ];
    medicineCheckDataList.push(questionGroup);
  }

  return (
    <>
      {questions.map((question) => (
        <RedirectionShortAnswersContent
          question={question}
          uploadedExcelFileDataList={uploadedExcelFileDataList}
          surveyStateKeyword={SURVEY_10_SCOPA_STATE_KEYWORD}
          key={uuidv4()}
        />
      ))}
      {/* for medicine check input questions */}
      {medicineCheckDataList.map((medicineCheckData: UploadedResponseDataListType) => (
        <RedirectionInputAnswersContent medicineCheckData={medicineCheckData} key={uuidv4()} />
      ))}
    </>
  );
}

interface RedirectionInputAnswersContentProps {
  medicineCheckData: UploadedResponseDataListType;
}

function RedirectionInputAnswersContent(props: RedirectionInputAnswersContentProps) {
  const medicineCheckQuestionNumber = 24;
  const yesOrNoQuestion = props.medicineCheckData[0];
  // UNUSED : delete input request (12/14)
  // const medicineNameQuestion = props.medicineCheckData[1];

  // for get symptom name
  const questionArrayForGetSymptomName = yesOrNoQuestion.질문내용.split('-');
  const symptomName = questionArrayForGetSymptomName[1];

  const setYesOrNotResponseValue = useSetRecoilState(
    responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${medicineCheckQuestionNumber}-${symptomName}`)
  );
  // UNUSED : delete input request (12/14)
  // const setMedicineNameResponseValue = useSetRecoilState(
  //   responseState(
  //     `${SURVEY_10_SCOPA_STATE_KEYWORD}-${medicineCheckQuestionNumber}-${symptomName}-medicineName`
  //   )
  // );

  useEffect(() => {
    if (props.medicineCheckData.length > 0) {
      if (typeof yesOrNoQuestion === 'object' && '응답내용' in yesOrNoQuestion)
        setYesOrNotResponseValue(yesOrNoQuestion.응답내용);
      // UNUSED : delete input request (12/14)
      // if (typeof medicineNameQuestion === 'object' && '응답내용' in medicineNameQuestion)
      // setMedicineNameResponseValue(medicineNameQuestion.응답내용);
    }
  }, []);

  return <></>;
}
