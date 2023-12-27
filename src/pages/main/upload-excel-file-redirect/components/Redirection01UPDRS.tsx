import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  SURVEY_01_UPDRS_TAKE_MEDICINE_TOTAL_PAGES,
  TAKE_MEDICINE,
  UPDRS_QUESTIONS,
  UPDRS_QUESTIONS_PER_PAGE,
  UPDRS_TAKE_MEDICINE_QUESTIONS,
} from 'pages/survey/survey-01-UPDRS/survey.const';

export default function Redirection01UPDRS() {
  // for setting questions according to pre question answer
  const [questions, setQuestions] = useState(UPDRS_QUESTIONS);

  // for get uploaded excel file response data
  const uploadedExcelFileRawData = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[1].TITLE)
  );
  // for check data processed successfully
  const haveUploadedExcelFileRawData = Object.keys(uploadedExcelFileRawData).length > 0;

  // for make uploaded excel file pre-question response data to recoil state (localStorage)
  const setPreQuestionResponseValue = useSetRecoilState(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)
  );

  // for pre-question radio button checked according to uploaded excel file response data
  const [uploadedExcelDataPreQuestionAnswer, setUploadedExcelDataPreQuestionAnswer] = useState('');

  // for setting total pages
  const setTotalPages = useSetRecoilState(survey01UPDRS_totalPagesState);

  useEffect(() => {
    if (haveUploadedExcelFileRawData) {
      // for pre-question radio button checked according to uploaded excel file response data
      for (let i = 1; i <= UPDRS_QUESTIONS_PER_PAGE; i++) {
        if (uploadedExcelFileRawData[`01_NOT_${i}`].length > 0) {
          setUploadedExcelDataPreQuestionAnswer(NOT_TAKE_MEDICINE);
          break;
        }
        if (uploadedExcelFileRawData[`01_ON_${i}`].length > 0) {
          setUploadedExcelDataPreQuestionAnswer(TAKE_MEDICINE);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (haveUploadedExcelFileRawData) {
      setPreQuestionResponseValue(uploadedExcelDataPreQuestionAnswer);

      // for setting question UI, total pages
      if (uploadedExcelDataPreQuestionAnswer === TAKE_MEDICINE) {
        setQuestions(UPDRS_TAKE_MEDICINE_QUESTIONS);
        setTotalPages(SURVEY_01_UPDRS_TAKE_MEDICINE_TOTAL_PAGES);
      }
    }
  }, [uploadedExcelDataPreQuestionAnswer]);

  return (
    <>
      {questions.map((question) => (
        <RedirectionMedicineEffectContent
          question={question}
          surveyStateKeyword={SURVEY_01_UPDRS_STATE_KEYWORD}
          uploadedExcelFileRawData={uploadedExcelFileRawData}
          uploadedExcelDataPreQuestionAnswer={uploadedExcelDataPreQuestionAnswer}
          surveyNumber="01"
          medicineEffectOnQuestionEndNumber={22}
          key={uuidv4()}
        />
      ))}
    </>
  );
}
