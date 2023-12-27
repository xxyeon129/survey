import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import RedirectionMedicineEffectContent from './common/RedirectionMedicineEffectContent';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
import { survey02FG_totalPagesState } from 'pages/survey/survey-02-FG/Survey02FG.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  FG_QUESTIONS,
  FG_QUESTIONS_PER_PAGE,
  FG_TAKE_MEDICINE_QUESTIONS,
  HAVE_FG_SYMPTOM,
  SURVEY_02_FG_STATE_KEYWORD,
  SURVEY_02_FG_TAKE_MEDICINE_TOTAL_PAGES,
} from 'pages/survey/survey-02-FG/survey.const';
import {
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
} from 'pages/survey/survey-01-UPDRS/survey.const';

export default function Redirection02FG() {
  // for setting questions according to pre question answer
  const [questions, setQuestions] = useState(FG_QUESTIONS);

  // for get uploaded excel file response data
  const uploadedExcelFileRawData = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[2].TITLE)
  );
  // TO DO: for pre-question radio button "HAVE_NO_FG_SYMPTOM" checked condition

  // for check data processed successfully
  const haveUploadedExcelFileRawData = Object.keys(uploadedExcelFileRawData).length > 0;

  // for make uploaded excel file pre-question response data to recoil state (localStorage)
  const setPreQuestionResponseValue = useSetRecoilState(
    responseState(`${SURVEY_02_FG_STATE_KEYWORD}-pre`)
  );

  // for pre-question radio button checked according to uploaded excel file response data
  const takeMedicinePreQuestion = useRecoilValue(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)
  );

  // for setting total pages
  const setTotalPages = useSetRecoilState(survey02FG_totalPagesState);

  const surveyNumber = '02';

  useEffect(() => {
    if (haveUploadedExcelFileRawData) {
      // for pre-question radio button checked according to uploaded excel file response data
      for (let i = 1; i <= FG_QUESTIONS_PER_PAGE; i++) {
        if (uploadedExcelFileRawData[`${surveyNumber}_NOT_${i}`].length > 0) {
          setPreQuestionResponseValue(HAVE_FG_SYMPTOM);
          break;
        } else if (uploadedExcelFileRawData[`${surveyNumber}_ON_${i}`].length > 0) {
          setPreQuestionResponseValue(HAVE_FG_SYMPTOM);
          break;
        }
        // TO DO: 다음 설문은 답변이 존재할 경우
        // setPreQuestionResponseValue(HAVE_NO_FG_SYMPTOM)
      }
    }
  }, []);

  useEffect(() => {
    // for setting question UI, total pages
    if (takeMedicinePreQuestion === TAKE_MEDICINE) {
      setQuestions(FG_TAKE_MEDICINE_QUESTIONS);
      setTotalPages(SURVEY_02_FG_TAKE_MEDICINE_TOTAL_PAGES);
    }
  }, [takeMedicinePreQuestion]);

  return (
    <>
      {questions.map((question) => (
        <RedirectionMedicineEffectContent
          question={question}
          surveyStateKeyword={SURVEY_02_FG_STATE_KEYWORD}
          uploadedExcelFileRawData={uploadedExcelFileRawData}
          uploadedExcelDataPreQuestionAnswer={takeMedicinePreQuestion}
          surveyNumber={surveyNumber}
          medicineEffectOnQuestionEndNumber={6}
          key={uuidv4()}
        />
      ))}
    </>
  );
}
