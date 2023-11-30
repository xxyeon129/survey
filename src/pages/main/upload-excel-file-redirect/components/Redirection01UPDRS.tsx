import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import RedirectionMedicineEffectContent from './common/RedirectionMedicineEffectContent';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
import { survey01UPDRS_totalPagesState } from 'pages/survey/survey-01-UPDRS/survey01UPDRS.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  SURVEY_01_UPDRS_STATE_KEYWORD,
  SURVEY_01_UPDRS_TAKE_MEDICINE_TOTAL_PAGES,
  TAKE_MEDICINE,
  UPDRS_QUESTIONS,
  UPDRS_TAKE_MEDICINE_QUESTIONS,
} from 'pages/survey/survey-01-UPDRS/survey.const';
// types
import {
  UploadedResponseDataGroupedListType,
  UploadedResponseDataListType,
} from 'common/layout/header/excelFileHandle/types/uploadedResponseData.type';

export default function Redirection01UPDRS() {
  const [questions, setQuestions] = useState(UPDRS_QUESTIONS);

  // for get uploaded excel file response data
  const uploadedExcelFileRawData = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[1].TITLE)
  );

  // for make uploaded excel file pre-question response data to recoil state (localStorage)
  const [preQuestionResponseValue, setPreQuestionResponseValue] = useRecoilState(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)
  );
  // for pre-question radio button checked according to uploaded excel file response data
  const [uploadedExcelDataPreQuestionAnswer, setUploadedExcelDataPreQuestionAnswer] = useState('');

  // for separate uploaded excel file raw data according to pre question answer
  const [uploadedExcelFileDataList, setUploadedExcelFileDataList] = useState<
    UploadedResponseDataListType | UploadedResponseDataGroupedListType
  >([]);

  // for setting total pages
  const setTotalPages = useSetRecoilState(survey01UPDRS_totalPagesState);

  useEffect(() => {
    if (uploadedExcelFileRawData.length > 0) {
      // for pre-question radio button checked according to uploaded excel file response data
      setUploadedExcelDataPreQuestionAnswer(uploadedExcelFileRawData[0].응답내용);
      setPreQuestionResponseValue(uploadedExcelFileRawData[0].응답내용);

      // for setting question UI, total pages
      if (uploadedExcelFileRawData[0].응답내용 === TAKE_MEDICINE) {
        setQuestions(UPDRS_TAKE_MEDICINE_QUESTIONS);
        setTotalPages(SURVEY_01_UPDRS_TAKE_MEDICINE_TOTAL_PAGES);
      }
    }
  }, []);

  // for separate uploaded excel file raw data according to pre question answer
  useEffect(() => {
    if (uploadedExcelFileRawData.length > 0) {
      setUploadedExcelFileDataList(uploadedExcelFileRawData);
    }
  }, [preQuestionResponseValue]);

  return (
    <>
      {questions.map((question) => (
        <RedirectionMedicineEffectContent
          question={question}
          surveyStateKeyword={SURVEY_01_UPDRS_STATE_KEYWORD}
          uploadedExcelFileDataList={uploadedExcelFileDataList}
          uploadedExcelDataPreQuestionAnswer={uploadedExcelDataPreQuestionAnswer}
          key={uuidv4()}
        />
      ))}
    </>
  );
}
