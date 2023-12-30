import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// states
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  SCOPA_QUESTIONS,
  SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST,
  SURVEY_10_SCOPA_LAST_INPUT_QUESTION_NUMBER,
  SURVEY_10_SCOPA_MALE_ADDITIONAL_QUESTION_NUMBER,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from 'pages/survey/survey-10-SCOPA/survey.const';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';

export default function Redirection10SCOPA() {
  const questions = SCOPA_QUESTIONS;

  // for apply uploaded excel file response
  const sessionStorageDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[10].TITLE)
  );

  return (
    <>
      {questions.map((question) => (
        <RedirectionContentSurvey10SCOPA
          question={question}
          sessionStorageDataList={sessionStorageDataList}
          surveyNumber="10"
          key={uuidv4()}
        />
      ))}
    </>
  );
}

interface RedirectionContentProps {
  question: SurveyContentObjectType;
  sessionStorageDataList: { [key: string]: string };
  surveyNumber: string;
}

function RedirectionContentSurvey10SCOPA(props: RedirectionContentProps) {
  // for create responseState when uploaded excel file exist
  const setLocalStorage = useSetRecoilState(
    responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${props.question.No}`)
  );
  const setMaleAdditionalQuestionLocalStorage = useSetRecoilState(
    responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${props.question.No}`)
  );
  const setAnotherSymptomQuestionALocalStorage = useSetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${SURVEY_10_SCOPA_LAST_INPUT_QUESTION_NUMBER}${SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST[0]}`
    )
  );
  const setAnotherSymptomQuestionBLocalStorage = useSetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${SURVEY_10_SCOPA_LAST_INPUT_QUESTION_NUMBER}${SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST[1]}`
    )
  );
  const setAnotherSymptomQuestionCLocalStorage = useSetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${SURVEY_10_SCOPA_LAST_INPUT_QUESTION_NUMBER}${SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST[2]}`
    )
  );
  const setAnotherSymptomQuestionDLocalStorage = useSetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${SURVEY_10_SCOPA_LAST_INPUT_QUESTION_NUMBER}${SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST[3]}`
    )
  );
  const setAnotherSympromQuestionsLocalStorageList = [
    setAnotherSymptomQuestionALocalStorage,
    setAnotherSymptomQuestionBLocalStorage,
    setAnotherSymptomQuestionCLocalStorage,
    setAnotherSymptomQuestionDLocalStorage,
  ];

  const haveUploadedExcelFileRawData = Object.keys(props.sessionStorageDataList).length > 0;

  // for radio button checked according to uploaded excel file progress
  useEffect(() => {
    if (haveUploadedExcelFileRawData) {
      const maleAdditionalQuestionNo = 23.5;
      if (props.question.No === maleAdditionalQuestionNo) {
        const uploadedExcelDataFromSessionStorage =
          props.sessionStorageDataList[
            `${props.surveyNumber}_${SURVEY_10_SCOPA_MALE_ADDITIONAL_QUESTION_NUMBER}`
          ];
        setMaleAdditionalQuestionLocalStorage(uploadedExcelDataFromSessionStorage);
      } else if (props.question.No < SURVEY_10_SCOPA_LAST_INPUT_QUESTION_NUMBER) {
        const uploadedExcelDataFromSessionStorage =
          props.sessionStorageDataList[`${props.surveyNumber}_${props.question.No}`];
        setLocalStorage(uploadedExcelDataFromSessionStorage);
      } else if (props.question.No === SURVEY_10_SCOPA_LAST_INPUT_QUESTION_NUMBER) {
        SURVEY_10_SCOPA_LAST_INPUT_QUESTION_ALPHABET_KEY_LIST.forEach((alphabetKey, index) => {
          const uploadedExcelDataFromSessionStorage =
            props.sessionStorageDataList[
              `${props.surveyNumber}_${SURVEY_10_SCOPA_LAST_INPUT_QUESTION_NUMBER}${alphabetKey}`
            ];
          setAnotherSympromQuestionsLocalStorageList[index](uploadedExcelDataFromSessionStorage);
        });
      }
    }
  }, []);

  return <></>;
}
