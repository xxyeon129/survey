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
  FG_TAKE_MEDICINE_QUESTIONS,
  SURVEY_02_FG_STATE_KEYWORD,
  SURVEY_02_FG_TAKE_MEDICINE_TOTAL_PAGES,
} from 'pages/survey/survey-02-FG/survey.const';
import { TAKE_MEDICINE } from 'pages/survey/survey-01-UPDRS/survey.const';
// types
import {
  UploadedResponseDataGroupedListType,
  UploadedResponseDataListType,
} from 'common/layout/header/excelFileHandle/types/uploadedResponseData.type';

export default function Redirection02FG() {
  const [questions, setQuestions] = useState(FG_QUESTIONS);

  // for get uploaded excel file response data
  const uploadedExcelFileRawData = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[2].TITLE)
  );

  // for make uploaded excel file pre-question response data to recoil state (localStorage)
  const setPreQuestionResponseValue = useSetRecoilState(
    responseState(`${SURVEY_02_FG_STATE_KEYWORD}-pre`)
  );

  // for separate uploaded excel file raw data according to pre question answer
  const [uploadedExcelFileDataList, setUploadedExcelFileDataList] = useState<
    UploadedResponseDataListType | UploadedResponseDataGroupedListType
  >([]);

  const survey01UPDRS_uploadedExcelFilePreQuestionRawData = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[1].TITLE)
  )[0];

  const [
    survey01UPDRS_uploadedExcelFilePreQuestion,
    setSurvey01UPDRS_uploadedExcelFilePreQuestion,
  ] = useState('');

  // for setting total pages
  const setTotalPages = useSetRecoilState(survey02FG_totalPagesState);

  useEffect(() => {
    // for survey-01-UPDRS pre-question uploaded excel file setting
    if (
      survey01UPDRS_uploadedExcelFilePreQuestionRawData !== undefined &&
      '응답내용' in survey01UPDRS_uploadedExcelFilePreQuestionRawData
    ) {
      setSurvey01UPDRS_uploadedExcelFilePreQuestion(
        survey01UPDRS_uploadedExcelFilePreQuestionRawData.응답내용
      );

      // for setting questions according to take medicine
      survey01UPDRS_uploadedExcelFilePreQuestionRawData.응답내용 === TAKE_MEDICINE &&
        setQuestions(FG_TAKE_MEDICINE_QUESTIONS);
      setTotalPages(SURVEY_02_FG_TAKE_MEDICINE_TOTAL_PAGES);
    }

    // for pre-question radio button checked according to uploaded excel response data
    if (uploadedExcelFileRawData.length > 0) {
      setPreQuestionResponseValue(uploadedExcelFileRawData[0].응답내용);
    }
  }, [survey01UPDRS_uploadedExcelFilePreQuestionRawData]);

  // for uploaded excel file raw data
  useEffect(() => {
    if (uploadedExcelFileRawData.length > 0) {
      setUploadedExcelFileDataList(uploadedExcelFileRawData);
    }
  }, [survey01UPDRS_uploadedExcelFilePreQuestion]);

  return (
    <>
      {questions.map((question) => (
        <RedirectionMedicineEffectContent
          question={question}
          surveyStateKeyword={SURVEY_02_FG_STATE_KEYWORD}
          uploadedExcelFileDataList={uploadedExcelFileDataList}
          uploadedExcelDataPreQuestionAnswer={survey01UPDRS_uploadedExcelFilePreQuestion}
          key={uuidv4()}
        />
      ))}
    </>
  );
}
