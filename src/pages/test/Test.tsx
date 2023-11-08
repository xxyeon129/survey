import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as XLSX from 'xlsx';
import { survey01UPDRS_excelData } from './responseDataSelectors/survey01UPDRS_excelData';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { survey02FG_excelData } from './responseDataSelectors/survey02FG_excelData';
import { useRef } from 'react';
import { uploadedResponseStates } from './uploadedResponseDataStates/uploadedResponseData.state';
import { survey05RBD_excelData } from './responseDataSelectors/survey05RBD_excelData';
import { survey10SCOPA_excelData } from './responseDataSelectors/survey10SCOPA_excelData';
import { survey11Constipation_excelData } from './responseDataSelectors/survey11Constipation_excelData';

export default function Test() {
  const survey01UPDRS_ResponseList = useRecoilValue(survey01UPDRS_excelData);
  const survey02FG_ResponseList = useRecoilValue(survey02FG_excelData);
  const survey05RBD_ResponseList = useRecoilValue(survey05RBD_excelData);
  const survey10SCOPA_ResponseList = useRecoilValue(survey10SCOPA_excelData);
  const survey11Constipation_ResponseList = useRecoilValue(survey11Constipation_excelData);

  // console.log(survey02FG_ResponseList);

  const setUploadedSurvey01UPDRS = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[1].TITLE)
  );
  const setUploadedSurvey02FG = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[2].TITLE)
  );
  const setUploadedSurvey05RBD = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[5].TITLE)
  );
  const setUploadedSurvey10SCOPA = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[10].TITLE)
  );
  const setUploadedSurvey11Constipation = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[11].TITLE)
  );

  // create excel file ------------------------------------------
  const workbook = XLSX.utils.book_new();

  const worksheetSurvey01UPDRS = XLSX.utils.json_to_sheet(survey01UPDRS_ResponseList);
  const worksheetSurvey02FG = XLSX.utils.json_to_sheet(survey02FG_ResponseList);
  const worksheetSurvey05RBD = XLSX.utils.json_to_sheet(survey05RBD_ResponseList);
  const worksheetSurvey10SCOPA = XLSX.utils.json_to_sheet(survey10SCOPA_ResponseList);
  const worksheetSurvey11Constipation = XLSX.utils.json_to_sheet(survey11Constipation_ResponseList);

  const downloadExcelFileHandler = () => {
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey01UPDRS, SURVEY_TITLE_LIST[1].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey02FG, SURVEY_TITLE_LIST[2].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey05RBD, SURVEY_TITLE_LIST[5].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey10SCOPA, SURVEY_TITLE_LIST[10].TITLE);
    XLSX.utils.book_append_sheet(
      workbook,
      worksheetSurvey11Constipation,
      SURVEY_TITLE_LIST[11].TITLE
    );

    XLSX.writeFile(workbook, 'test.xlsx');
  };

  // upload excel file ------------------------------------------
  const fileRef = useRef<HTMLInputElement | null>(null);

  const uploadExcelFileHandler = () => {
    const uploadedFile = fileRef.current;

    if (uploadedFile) {
      const uploadedFileValue = uploadedFile.files?.[0];

      if (uploadedFileValue) {
        const reader = new FileReader();

        reader.onload = (file) => {
          const result = file.target?.result;

          if (result) {
            const workbook = XLSX.read(result, { type: 'array' });

            const survey01UPDRS_sheetName = workbook.SheetNames[0];
            const survey01UPDRS_uploadedWorksheet = workbook.Sheets[survey01UPDRS_sheetName];
            const survey01UPDRS_jsonData = XLSX.utils.sheet_to_json(
              survey01UPDRS_uploadedWorksheet
            );

            setUploadedSurvey01UPDRS(survey01UPDRS_jsonData);

            // for apply excel file -> recoil state

            // [{},{}...]
            // console.log('jsonData => ', survey01UPDRS_jsonData);
            // handleApplyFile(jsonData);

            const survey02FG_sheetName = workbook.SheetNames[1];
            const survey02FG_uploadedWorksheet = workbook.Sheets[survey02FG_sheetName];
            const survey02FG_jsonData = XLSX.utils.sheet_to_json(survey02FG_uploadedWorksheet);
            setUploadedSurvey02FG(survey02FG_jsonData);

            const survey05RBD_sheetName = workbook.SheetNames[2];
            const survey05RBD_uploadedWorksheet = workbook.Sheets[survey05RBD_sheetName];
            const survey05RBD_jsonData = XLSX.utils.sheet_to_json(survey05RBD_uploadedWorksheet);
            setUploadedSurvey05RBD(survey05RBD_jsonData);

            const survey10SCOPA_sheetName = workbook.SheetNames[3];
            const survey10SCOPA_uploadedWorksheet = workbook.Sheets[survey10SCOPA_sheetName];
            const survey10SCOPA_jsonData = XLSX.utils.sheet_to_json(
              survey10SCOPA_uploadedWorksheet
            );
            setUploadedSurvey10SCOPA(survey10SCOPA_jsonData);

            const survey11Constipation_sheetName = workbook.SheetNames[4];
            const survey11Constipation_uploadedWorksheet =
              workbook.Sheets[survey11Constipation_sheetName];
            const survey11Constipation_jsonData = XLSX.utils.sheet_to_json(
              survey11Constipation_uploadedWorksheet
            );
            setUploadedSurvey11Constipation(survey11Constipation_jsonData);
          }
        };
        reader.readAsArrayBuffer(uploadedFileValue);
      }
    }
  };

  // const surveyStateKeyword = SURVEY_01_UPDRS_STATE_KEYWORD;
  // const questionNumber = '1';
  // const responseValue =
  //   '계절이나 시간을 기억하지 못하고 때때로 현재 장소에 대해 인지하지 못함. 어떤 문제를 다룰 때 심한 장애를 받음';

  // const changeUploadedExcelFileToResponseStates = useApplyUploadedExcelFile({
  //   surveyStateKeyword,
  //   questionNumber,
  //   responseValue,
  // });

  return (
    <>
      <button onClick={() => downloadExcelFileHandler()}>Excel 다운로드</button>
      <hr />
      <input
        type="file"
        accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ref={fileRef}
        onChange={uploadExcelFileHandler}
      />
    </>
  );
}
