import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import RedirectionMedicineEffectContent from './common/RedirectionMedicineEffectContent';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { uploadedResponseStates } from 'pages/test/uploadedResponseDataStates/uploadedResponseData.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { FG_QUESTIONS, SURVEY_02_FG_STATE_KEYWORD } from 'pages/survey/survey-02-FG/survey.const';
import { NOT_TAKE_MEDICINE, TAKE_MEDICINE } from 'pages/survey/survey-01-UPDRS/survey.const';
// types
import {
  UploadedResponseDataGroupedListType,
  UploadedResponseDataListType,
} from 'pages/test/types/uploadedResponseData.type';

export default function Redirection02FG() {
  const questions = FG_QUESTIONS;

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

  useEffect(() => {
    // for survey-01-UPDRS pre-question uploaded excel file setting
    if (
      survey01UPDRS_uploadedExcelFilePreQuestionRawData !== undefined &&
      '응답내용' in survey01UPDRS_uploadedExcelFilePreQuestionRawData
    ) {
      setSurvey01UPDRS_uploadedExcelFilePreQuestion(
        survey01UPDRS_uploadedExcelFilePreQuestionRawData.응답내용
      );
    }

    // for pre-question radio button checked according to uploaded excel response data
    if (uploadedExcelFileRawData.length > 0) {
      setPreQuestionResponseValue(uploadedExcelFileRawData[0].응답내용);
    }
  }, [survey01UPDRS_uploadedExcelFilePreQuestionRawData]);

  // for separate uploaded excel file raw data according to pre question answer
  useEffect(() => {
    if (uploadedExcelFileRawData.length > 0) {
      // in case take medicine - uploadedExcelFileDataList setting
      if (survey01UPDRS_uploadedExcelFilePreQuestion === NOT_TAKE_MEDICINE) {
        setUploadedExcelFileDataList(uploadedExcelFileRawData);
      }
      // in case not take medicine - uploadedExcelFileDataList setting
      if (survey01UPDRS_uploadedExcelFilePreQuestion === TAKE_MEDICINE) {
        const questionGroupArray: UploadedResponseDataGroupedListType = [];
        for (let i = 1; i <= uploadedExcelFileRawData.length; i += 2) {
          const questionGroup: UploadedResponseDataListType = [
            uploadedExcelFileRawData[i],
            uploadedExcelFileRawData[i + 1],
          ];
          questionGroupArray.push(questionGroup);
        }
        setUploadedExcelFileDataList(questionGroupArray);
      }
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
