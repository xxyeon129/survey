import { useRef } from 'react';
import * as XLSX from 'xlsx';
import axios, { AxiosError } from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  personalInfoBirthdayState,
  personalInfoGenderState,
  personalInfoNameState,
} from 'pages/survey/personalInfo/personalInfo.state';
import { uploadedResponseStates } from '../layout/header/excelFileHandle/states/uploadedResponseData.state';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from 'common/constants/path.const';
import useExcelFileCreateCellData_survey01UPDRS from './excel-file/create-cell-data/useExcelFileCreateCellData_survey01UPDRS';
import { excelFileCreateCellQuestionNumber_survey01UPDRS } from './excel-file/create-cell-question-number/excelFileCreateCellQuestionNumber_survey01UPDRS';
import { UPDRS_QUESTIONS } from 'pages/survey/survey-01-UPDRS/survey.const';
import useExcelFileCreateCellData_survey02FG from './excel-file/create-cell-data/useExcelFileCreateCellData_survey02FG';
import { excelFileCreateCellQuestionNumber_survey02FG } from './excel-file/create-cell-question-number/excelFileCreateCellQuestionNumber_survey02FG';
import { FG_QUESTIONS } from 'pages/survey/survey-02-FG/survey.const';
import { EXCEL_FILE_HEADER_CELL_SURVEY_TITLE } from './excel-file/constants/excelFileHeaderSurveyTitle.const';
import useExcelFileCreateCellData_survey03BAI from './excel-file/create-cell-data/useExcelFileCreateCellData_survey03BAI';
import { excelFileCreateCellQuestionNumber_survey03BAI } from './excel-file/create-cell-question-number/excelFileCreateCellQuestionNumber_survey03BAI';
import useExcelFileCreateCellData_survey04BDI from './excel-file/create-cell-data/useExcelFileCreateCellData_survey04BDI';
import { excelFileCreateCellQuestionNumber_survey04BDI } from './excel-file/create-cell-question-number/excelFileCreateCellQuestionNumber_survey04BDI';
import useExcelFileCreateCellData_survey05RBD from './excel-file/create-cell-data/useExcelFileCreateCellData_survey05RBD';
import { excelFileCreateCellQuestionNumber_survey05RBD } from './excel-file/create-cell-question-number/excelFileCreateCellQuestionNumber_survey05RBD';
import useExcelFileCreateCellData_survey06NMS from './excel-file/create-cell-data/useExcelFileCreateCellData_survey06NMS';
import { excelFileCreateCellQuestionNumber_survey06NMS } from './excel-file/create-cell-question-number/excelFileCreateCellQuestionNumber_survey06NMS';
import useExcelFileCreateCellData_survey07PDQ from './excel-file/create-cell-data/useExcelFileCreateCellData_survey07PDQ';
import { excelFileCreateCellQuestionNumber_survey07PDQ } from './excel-file/create-cell-question-number/excelFileCreateCellQuestionNumber_survey07PDQ';
import useExcelFileCreateCellData_survey08PDSS from './excel-file/create-cell-data/useExcelFileCreateCellData_survey08PDSS';
import { excelFileCreateCellQuestionNumber_survey08PDSS } from './excel-file/create-cell-question-number/excelFileCreateCellQuestionNumber_survey08PDSS';
import useExcelFileCreateCellData_survey09TIRED from './excel-file/create-cell-data/useExcelFileCreateCellData_survey09TIRED';
import { excelFileCreateCellQuestionNumber_survey09TIRED } from './excel-file/create-cell-question-number/excelFileCreateCellQuestionNumber_survey09TIRED';
import useExcelFileCreateCellData_survey10SCOPA from './excel-file/create-cell-data/useExcelFileCreateCellData_survey10SCOPA';
import { excelFileCreateCellQuestionNumber_survey10SCOPA } from './excel-file/create-cell-question-number/excelFileCreateCellQuestionNumber_survey10SCOPA';

interface UseExcelFileProps {
  onCloseModal?: () => void;
  // for survey-12-Food
  isLastPage?: boolean;
}

export default function useExcelFile(props: UseExcelFileProps) {
  // create excel file ---------------------------------------------------------------

  // * personal info cell data ----------
  const respondedName = useRecoilValue(personalInfoNameState);
  const respondedBirthday = useRecoilValue(personalInfoBirthdayState);
  const respondedGender = useRecoilValue(personalInfoGenderState);

  // * create cell data ----------
  const personalInfo_responseData = [
    {
      No: '1',
      Name: respondedName,
      'Patient ID': '',
      'D.O.B': respondedBirthday,
      Gender: respondedGender,
    },
  ];
  const survey01UPDRS_responseData = useExcelFileCreateCellData_survey01UPDRS();
  const survey02FG_responseData = useExcelFileCreateCellData_survey02FG();
  const survey03BAI_responseData = useExcelFileCreateCellData_survey03BAI();
  const survey04BDI_responseData = useExcelFileCreateCellData_survey04BDI();
  const survey05RBD_responseData = useExcelFileCreateCellData_survey05RBD();
  const survey06NMS_responseData = useExcelFileCreateCellData_survey06NMS();
  const survey07PDQ_responseData = useExcelFileCreateCellData_survey07PDQ();
  const survey08PDSS_responseData = useExcelFileCreateCellData_survey08PDSS();
  const survey09TIRED_responseData = useExcelFileCreateCellData_survey09TIRED();
  const survey10SCOPA_responseData = useExcelFileCreateCellData_survey10SCOPA();

  // * combine in one row ----------
  const responseData = personalInfo_responseData.map((obj) => ({
    ...obj,
    ...survey01UPDRS_responseData,
    ...survey02FG_responseData,
    ...survey03BAI_responseData,
    ...survey04BDI_responseData,
    ...survey05RBD_responseData,
    ...survey06NMS_responseData,
    ...survey07PDQ_responseData,
    ...survey08PDSS_responseData,
    ...survey09TIRED_responseData,
    ...survey10SCOPA_responseData,
  }));

  // add empty rows in the beginning
  responseData.unshift(
    { No: '', Name: '', 'Patient ID': '', 'D.O.B': '', Gender: '' },
    { No: '', Name: '', 'Patient ID': '', 'D.O.B': '', Gender: '' }
  );

  // * excel file header cell title setting ----------
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(responseData);
  ws.A1 = { t: 's', v: 'No' };
  ws.B1 = { t: 's', v: 'Name' };
  ws.C1 = { t: 's', v: 'Patient ID' };
  ws.D1 = { t: 's', v: 'D.O.B' };
  ws.E1 = { t: 's', v: 'Gender' };

  ws.F1 = { t: 's', v: EXCEL_FILE_HEADER_CELL_SURVEY_TITLE['01_UPDRS'] };
  ws.F2 = { t: 's', v: '파킨슨병약 복용 전' };
  ws.AC2 = { t: 's', v: '파킨슨병약 효과 X (OFF)' };
  ws.AZ2 = { t: 's', v: '파킨슨병약 효과 O (ON)' };

  ws.BW1 = { t: 's', v: EXCEL_FILE_HEADER_CELL_SURVEY_TITLE['02_FG'] };
  ws.BW2 = { t: 's', v: '파킨슨병약 복용 전' };
  ws.CD2 = { t: 's', v: '파킨슨병약 효과 X (OFF)' };
  ws.CK2 = { t: 's', v: '파킨슨병약 효과 O (ON)' };

  ws.CR1 = { t: 's', v: EXCEL_FILE_HEADER_CELL_SURVEY_TITLE['03_BAI'] };
  ws.DN1 = { t: 's', v: EXCEL_FILE_HEADER_CELL_SURVEY_TITLE['04_BDI'] };
  ws.EK1 = { t: 's', v: EXCEL_FILE_HEADER_CELL_SURVEY_TITLE['05_RBD'] };
  ws.ER1 = { t: 's', v: EXCEL_FILE_HEADER_CELL_SURVEY_TITLE['06_NMS'] };
  ws.GF1 = { t: 's', v: EXCEL_FILE_HEADER_CELL_SURVEY_TITLE['07_PDQ'] };
  ws.HT1 = { t: 's', v: EXCEL_FILE_HEADER_CELL_SURVEY_TITLE['08_PDSS'] };
  ws.IJ1 = { t: 's', v: EXCEL_FILE_HEADER_CELL_SURVEY_TITLE['09_TIRED'] };
  ws.JA1 = { t: 's', v: EXCEL_FILE_HEADER_CELL_SURVEY_TITLE['10_SCOPA'] };

  // * header cell setting question number ----------
  excelFileCreateCellQuestionNumber_survey01UPDRS(ws);
  excelFileCreateCellQuestionNumber_survey02FG(ws);
  excelFileCreateCellQuestionNumber_survey03BAI(ws);
  excelFileCreateCellQuestionNumber_survey04BDI(ws);
  excelFileCreateCellQuestionNumber_survey05RBD(ws);
  excelFileCreateCellQuestionNumber_survey06NMS(ws);
  excelFileCreateCellQuestionNumber_survey07PDQ(ws);
  excelFileCreateCellQuestionNumber_survey08PDSS(ws);
  excelFileCreateCellQuestionNumber_survey09TIRED(ws);
  excelFileCreateCellQuestionNumber_survey10SCOPA(ws);

  // * create excel file ----------
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '비운동증상 설문');

  // * excel file header cell column, row location setting -----
  // s - start, e - end, r - row, c - col (0 based)
  const merge = [
    { s: { r: 0, c: 0 }, e: { r: 2, c: 0 } }, // No
    { s: { r: 0, c: 1 }, e: { r: 2, c: 1 } }, // Name
    { s: { r: 0, c: 2 }, e: { r: 2, c: 2 } }, // Patient ID
    { s: { r: 0, c: 3 }, e: { r: 2, c: 3 } }, // D.O.B
    { s: { r: 0, c: 4 }, e: { r: 2, c: 4 } }, // Gender

    { s: { r: 0, c: 5 }, e: { r: 0, c: 73 } }, // UPDRS
    { s: { r: 1, c: 5 }, e: { r: 1, c: 27 } }, // UPDRS - MedicineX
    { s: { r: 1, c: 28 }, e: { r: 1, c: 50 } }, // UPDRS - EffectOff
    { s: { r: 1, c: 51 }, e: { r: 1, c: 73 } }, // UPDRS - EffectOn

    { s: { r: 0, c: 74 }, e: { r: 0, c: 94 } }, // FG
    { s: { r: 1, c: 74 }, e: { r: 1, c: 80 } }, // FG - MedicineX
    { s: { r: 1, c: 81 }, e: { r: 1, c: 87 } }, // FG - EffectOff
    { s: { r: 1, c: 88 }, e: { r: 1, c: 94 } }, // FG - EffectOn

    { s: { r: 0, c: 95 }, e: { r: 1, c: 116 } }, // BAI
    { s: { r: 0, c: 117 }, e: { r: 1, c: 139 } }, // BDI
    { s: { r: 0, c: 140 }, e: { r: 1, c: 146 } }, // RBD
    { s: { r: 0, c: 147 }, e: { r: 1, c: 186 } }, // NMS
    { s: { r: 0, c: 187 }, e: { r: 1, c: 226 } }, // PDQ
    { s: { r: 0, c: 227 }, e: { r: 1, c: 242 } }, // PDSS
    { s: { r: 0, c: 243 }, e: { r: 1, c: 259 } }, // TIRED
    { s: { r: 0, c: 260 }, e: { r: 1, c: 290 } }, // SCOPA
  ];
  ws['!merges'] = merge;

  // * download excel file ----------
  // for file name, send mail
  const personalInfoName = useRecoilValue(personalInfoNameState);
  const birthday = useRecoilValue(personalInfoBirthdayState);
  const rawDate = new Date();
  const fileRawDate = `${rawDate.getFullYear()}-${rawDate.getMonth()}-${rawDate.getDate()}`;
  const fileRawTime = `T${rawDate.getHours()}-${rawDate.getMinutes()}`;
  const fileDate = `${fileRawDate}${fileRawTime}`;

  const downloadExcelFileHandler = () => {
    XLSX.writeFile(
      wb,
      `이상운동질환 비운동증상 전자설문_${birthday}${personalInfoName}_${fileDate}.xlsx`
    );
  };

  // upload excel file  ---------------------------------------------------------------

  // for apply response - create recoil state in session storage
  const setSessionStoragePersonalInfo = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[0].TITLE)
  );
  const setSessionStorageSurvey01UPDRS = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[1].TITLE)
  );
  const setSessionStorageSurvey02FG = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[2].TITLE)
  );
  // const setUploadedSurvey03BAI = useSetRecoilState(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[3].TITLE)
  // );
  // const setUploadedSurvey04BDI = useSetRecoilState(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[4].TITLE)
  // );
  // const setUploadedSurvey05RBD = useSetRecoilState(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[5].TITLE)
  // );
  // const setUploadedSurvey06NMS = useSetRecoilState(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[6].TITLE)
  // );
  // const setUploadedSurvey07PDQ = useSetRecoilState(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[7].TITLE)
  // );
  // const setUploadedSurvey08PDSS = useSetRecoilState(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[8].TITLE)
  // );
  // const setUploadedSurvey09Tired = useSetRecoilState(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[9].TITLE)
  // );
  // const setUploadedSurvey10SCOPA = useSetRecoilState(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[10].TITLE)
  // );
  // const setUploadedSurvey11Constipation = useSetRecoilState(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[11].TITLE)
  // );
  // const setUploadedSurvey12Food = useSetRecoilState(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[12].TITLE)
  // );

  // upload file
  const fileRef = useRef<HTMLInputElement | null>(null);
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

              // for apply response - create recoil state in session storage ------------------
              const uploadedData = jsonData[2];

              // * personalInfo ----------
              setSessionStoragePersonalInfo({
                name: uploadedData.Name,
                birthday: uploadedData['D.O.B'],
                gender: uploadedData.Gender,
              });

              // * survey-01-UPDRS ----------
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
              setSessionStorageSurvey01UPDRS(uplodedSurvey01UPDRS);

              // * survey-02-FG ----------
              const uploadedSurvey02FG: { [key: string]: string } = {};
              const survey02FG_number = '02';
              for (let i = 1; i <= FG_QUESTIONS.length; i++) {
                if (i === 1) {
                  uploadedSurvey02FG[`${survey02FG_number}_NOT_1`] =
                    uploadedData[EXCEL_FILE_HEADER_CELL_SURVEY_TITLE['02_FG']];
                } else {
                  uploadedSurvey02FG[`${survey02FG_number}_NOT_${i}`] =
                    uploadedData[`${survey02FG_number}_NOT_${i}`];
                }
                uploadedSurvey02FG[`${survey02FG_number}_OFF_${i}`] =
                  uploadedData[`${survey02FG_number}_OFF_${i}`];
                uploadedSurvey02FG[`${survey02FG_number}_ON_${i}`] =
                  uploadedData[`${survey02FG_number}_ON_${i}`];
              }
              setSessionStorageSurvey02FG(uploadedSurvey02FG);

              resolve(undefined);
            }
          };
          reader.readAsArrayBuffer(uploadedFileValue);
        }
      }
    });
  };

  // send email  ---------------------------------------------------------------

  // for survey-12-Food
  const navigate = useNavigate();

  const sendFile = () => {
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([new Uint8Array(wbout)], { type: 'multipart/form-data' });
    const formdata = new FormData();
    formdata.append('file', blob, 'serverSendFile.xlsx');
    formdata.append('name', personalInfoName);
    formdata.append('birthday', birthday);

    try {
      axios
        .post(`${import.meta.env.VITE_APP_SERVER_URL}/upload`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
          props.isLastPage && navigate(PATH_URL.MAIN);
          props.onCloseModal && props.onCloseModal();
          alert('전송이 완료되었습니다.');
        })
        .catch((error: AxiosError) => {
          console.error('파일 업로드 실패: ', error);
          props.onCloseModal && props.onCloseModal();
          alert('서버 문제로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        });
    } catch (error) {
      console.log('파일 업로드 중 오류: ', error);
      props.onCloseModal && props.onCloseModal();
      alert('서버 문제로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return { uploadExcelFileHandler, downloadExcelFileHandler, sendFile, fileRef };
}
