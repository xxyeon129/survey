import { v4 as uuidv4 } from 'uuid';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  SURVEY_01_UPDRS_TAKE_MEDICINE_TOTAL_PAGES,
  TAKE_MEDICINE,
  UPDRS_QUESTIONS,
  UPDRS_QUESTIONS_PER_PAGE,
  UPDRS_TAKE_MEDICINE_QUESTIONS,
} from 'pages/survey/survey-01-UPDRS/survey.const';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as XLSX from 'xlsx';
import { survey01UPDRS_totalPagesState } from 'pages/survey/survey-01-UPDRS/survey01UPDRS.state';
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';

export default function UploadExcelTest() {
  // create recoil state in session storage
  const setUploadedPersonalInfo = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[0].TITLE)
  );
  const setUploadedSurvey01UPDRS = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[1].TITLE)
  );

  // upload excel file ------------------------------------------
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onClickExcelBox = async () => {
    await uploadExcelFileHandler();
  };

  const uploadExcelFileHandler = () => {
    return new Promise((resolve) => {
      const uploadedFile = fileRef.current;

      if (uploadedFile) {
        const uploadedFileValue = uploadedFile.files?.[0];

        if (uploadedFileValue) {
          const reader = new FileReader();

          reader.onload = (file) => {
            const result = file.target?.result;

            if (result) {
              const workbook = XLSX.read(result, { type: 'array' });

              // for get json data from uploaded excel sheet
              const sheetName = '비운동증상 설문';
              const uploadedWorksheet = workbook.Sheets[sheetName];
              const jsonData: { [key: string]: string }[] =
                XLSX.utils.sheet_to_json(uploadedWorksheet);
              // console.log(jsonData);
              const uploadedData = jsonData[2];

              // personalInfo
              setUploadedPersonalInfo({
                name: uploadedData.Name,
                birthday: uploadedData['D.O.B'],
                gender: uploadedData.Gender,
              });

              // survey-01-UPDRS
              const uplodedSurvey01UPDRS: { [key: string]: string } = {};
              for (let i = 1; i <= UPDRS_QUESTIONS.length; i++) {
                if (i === 1) {
                  uplodedSurvey01UPDRS['01_NOT_1'] = uploadedData['UPDRS I, II'];
                } else {
                  uplodedSurvey01UPDRS[`01_NOT_${i}`] = uploadedData[`01_NOT_${i}`];
                }
                uplodedSurvey01UPDRS[`01_OFF_${i}`] = uploadedData[`01_OFF_${i}`];
                uplodedSurvey01UPDRS[`01_ON_${i}`] = uploadedData[`01_ON_${i}`];
              }
              setUploadedSurvey01UPDRS(uplodedSurvey01UPDRS);

              resolve(undefined);
            }
          };
          reader.readAsArrayBuffer(uploadedFileValue);
        }
      }
    });
  };

  return (
    <>
      <input
        type="file"
        accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ref={fileRef}
        id="excel"
        onChange={onClickExcelBox}
      />
      <Redirection01UPDRS />
    </>
  );
}

function Redirection01UPDRS() {
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
          key={uuidv4()}
        />
      ))}
    </>
  );
}

interface RedirectMedicineEffectContentProps {
  question: SurveyContentObjectType;
  surveyStateKeyword: string;
  uploadedExcelFileRawData: { [key: string]: string };
  uploadedExcelDataPreQuestionAnswer: string;
}

function RedirectionMedicineEffectContent(props: RedirectMedicineEffectContentProps) {
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
