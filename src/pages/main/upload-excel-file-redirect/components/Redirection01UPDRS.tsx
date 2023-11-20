import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import RedirectionMedicineEffectContent from './common/RedirectionMedicineEffectContent';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { uploadedResponseStates } from 'pages/test/uploadedResponseDataStates/uploadedResponseData.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
  UPDRS_QUESTIONS,
} from 'pages/survey/survey-01-UPDRS/survey.const';
// types
import {
  UploadedResponseDataGroupedListType,
  UploadedResponseDataListType,
} from 'pages/test/types/uploadedResponseData.type';

export default function Redirection01UPDRS() {
  const questions = UPDRS_QUESTIONS;

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
  const uploadedExcelFilePreQuestion = uploadedExcelFileRawData[0];

  // for pre-question radio button checked according to uploaded excel file response data
  useEffect(() => {
    if (uploadedExcelFileRawData.length > 0) {
      setUploadedExcelDataPreQuestionAnswer(uploadedExcelFileRawData[0].응답내용);
      setPreQuestionResponseValue(uploadedExcelFileRawData[0].응답내용);
    }
  }, []);

  // for separate uploaded excel file raw data according to pre question answer
  useEffect(() => {
    if (uploadedExcelFileRawData.length > 0) {
      // in case take medicine - uploadedExcelFileDataList setting
      if (uploadedExcelFilePreQuestion.응답내용 === NOT_TAKE_MEDICINE) {
        setUploadedExcelFileDataList(uploadedExcelFileRawData);
      }
      // in case not take medicine - uploadedExcelFileDataList setting
      if (uploadedExcelFilePreQuestion.응답내용 === TAKE_MEDICINE) {
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
