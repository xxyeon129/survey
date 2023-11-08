import { useRef } from 'react';
import * as XLSX from 'xlsx';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { uploadedResponseStates } from './uploadedResponseDataStates/uploadedResponseData.state';
import { personalInfo_excelData } from './responseDataSelectors/personalInfo_excelData';
import { survey01UPDRS_excelData } from './responseDataSelectors/survey01UPDRS_excelData';
import { survey02FG_excelData } from './responseDataSelectors/survey02FG_excelData';
import { survey03BAI_excelData } from './responseDataSelectors/survey03BAI_excelData';
import { survey04BDI_excelData } from './responseDataSelectors/survey04BDI_excelData';
import { survey05RBD_excelData } from './responseDataSelectors/survey05RBD_excelData';
import { survey07PDQ_excelData } from './responseDataSelectors/survey07PDQ_excelData';
import { survey09Tired_excelData } from './responseDataSelectors/survey09Tired_excelData';
import { survey10SCOPA_excelData } from './responseDataSelectors/survey10SCOPA_excelData';
import { survey11Constipation_excelData } from './responseDataSelectors/survey11Constipation_excelData';
import { survey12Food_excelData } from './responseDataSelectors/survey12Food_excelData';
import { survey08PDSS_excelData } from './responseDataSelectors/survey08PDSS_excelData';
import { survey06NMS_excelData } from './responseDataSelectors/survey06NMS_excelData';

export default function Test() {
  const personalInfo_ResponseList = useRecoilValue(personalInfo_excelData);
  const survey01UPDRS_ResponseList = useRecoilValue(survey01UPDRS_excelData);
  const survey02FG_ResponseList = useRecoilValue(survey02FG_excelData);
  const survey03BAI_ResponseList = useRecoilValue(survey03BAI_excelData);
  const survey04BDI_ResponseList = useRecoilValue(survey04BDI_excelData);
  const survey05RBD_ResponseList = useRecoilValue(survey05RBD_excelData);
  const survey06NMS_ResponseList = useRecoilValue(survey06NMS_excelData);
  const survey07PDQ_ResponseList = useRecoilValue(survey07PDQ_excelData);
  const survey08PDSS_ResponseList = useRecoilValue(survey08PDSS_excelData);
  const survey09Tired_ResponseList = useRecoilValue(survey09Tired_excelData);
  const survey10SCOPA_ResponseList = useRecoilValue(survey10SCOPA_excelData);
  const survey11Constipation_ResponseList = useRecoilValue(survey11Constipation_excelData);
  const survey12Food_ResponseList = useRecoilValue(survey12Food_excelData);

  const setUploadedPersonalInfo = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[0].TITLE)
  );
  const setUploadedSurvey01UPDRS = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[1].TITLE)
  );
  const setUploadedSurvey02FG = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[2].TITLE)
  );
  const setUploadedSurvey03BAI = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[3].TITLE)
  );
  const setUploadedSurvey04BDI = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[4].TITLE)
  );
  const setUploadedSurvey05RBD = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[5].TITLE)
  );
  const setUploadedSurvey06NMS = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[6].TITLE)
  );
  const setUploadedSurvey07PDQ = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[7].TITLE)
  );
  const setUploadedSurvey08PDSS = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[8].TITLE)
  );
  const setUploadedSurvey09Tired = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[9].TITLE)
  );
  const setUploadedSurvey10SCOPA = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[10].TITLE)
  );
  const setUploadedSurvey11Constipation = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[11].TITLE)
  );
  const setUploadedSurvey12Food = useSetRecoilState(
    uploadedResponseStates(SURVEY_TITLE_LIST[12].TITLE)
  );

  // create excel file ------------------------------------------
  const workbook = XLSX.utils.book_new();

  const worksheetPersonalInfo = XLSX.utils.json_to_sheet(personalInfo_ResponseList);
  const worksheetSurvey01UPDRS = XLSX.utils.json_to_sheet(survey01UPDRS_ResponseList);
  const worksheetSurvey02FG = XLSX.utils.json_to_sheet(survey02FG_ResponseList);
  const worksheetSurvey03BAI = XLSX.utils.json_to_sheet(survey03BAI_ResponseList);
  const worksheetSurvey04BDI = XLSX.utils.json_to_sheet(survey04BDI_ResponseList);
  const worksheetSurvey05RBD = XLSX.utils.json_to_sheet(survey05RBD_ResponseList);
  const worksheetSurvey06NMS = XLSX.utils.json_to_sheet(survey06NMS_ResponseList);
  const worksheetSurvey07PDQ = XLSX.utils.json_to_sheet(survey07PDQ_ResponseList);
  const worksheetSurvey08PDSS = XLSX.utils.json_to_sheet(survey08PDSS_ResponseList);
  const worksheetSurvey09Tired = XLSX.utils.json_to_sheet(survey09Tired_ResponseList);
  const worksheetSurvey10SCOPA = XLSX.utils.json_to_sheet(survey10SCOPA_ResponseList);
  const worksheetSurvey11Constipation = XLSX.utils.json_to_sheet(survey11Constipation_ResponseList);
  const worksheetSurvey12Food = XLSX.utils.json_to_sheet(survey12Food_ResponseList);

  const downloadExcelFileHandler = () => {
    XLSX.utils.book_append_sheet(workbook, worksheetPersonalInfo, SURVEY_TITLE_LIST[0].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey01UPDRS, SURVEY_TITLE_LIST[1].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey02FG, SURVEY_TITLE_LIST[2].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey03BAI, SURVEY_TITLE_LIST[3].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey04BDI, SURVEY_TITLE_LIST[4].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey05RBD, SURVEY_TITLE_LIST[5].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey06NMS, SURVEY_TITLE_LIST[6].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey07PDQ, SURVEY_TITLE_LIST[7].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey08PDSS, SURVEY_TITLE_LIST[8].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey09Tired, SURVEY_TITLE_LIST[9].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey10SCOPA, SURVEY_TITLE_LIST[10].TITLE);
    XLSX.utils.book_append_sheet(
      workbook,
      worksheetSurvey11Constipation,
      SURVEY_TITLE_LIST[11].TITLE
    );
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey12Food, SURVEY_TITLE_LIST[12].TITLE);

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

            const personalInfo_sheetName = workbook.SheetNames[0];
            const personalInfo_uploadedWorksheet = workbook.Sheets[personalInfo_sheetName];
            const personalInfo_jsonData = XLSX.utils.sheet_to_json(personalInfo_uploadedWorksheet);
            setUploadedPersonalInfo(personalInfo_jsonData);

            const survey01UPDRS_sheetName = workbook.SheetNames[1];
            const survey01UPDRS_uploadedWorksheet = workbook.Sheets[survey01UPDRS_sheetName];
            const survey01UPDRS_jsonData = XLSX.utils.sheet_to_json(
              survey01UPDRS_uploadedWorksheet
            );
            setUploadedSurvey01UPDRS(survey01UPDRS_jsonData);

            const survey02FG_sheetName = workbook.SheetNames[2];
            const survey02FG_uploadedWorksheet = workbook.Sheets[survey02FG_sheetName];
            const survey02FG_jsonData = XLSX.utils.sheet_to_json(survey02FG_uploadedWorksheet);
            setUploadedSurvey02FG(survey02FG_jsonData);

            const survey03BAI_sheetName = workbook.SheetNames[3];
            const survey03BAI_uploadedWorksheet = workbook.Sheets[survey03BAI_sheetName];
            const survey03BAI_jsonData = XLSX.utils.sheet_to_json(survey03BAI_uploadedWorksheet);
            setUploadedSurvey03BAI(survey03BAI_jsonData);

            const survey04BDI_sheetName = workbook.SheetNames[4];
            const survey04BDI_uploadedWorksheet = workbook.Sheets[survey04BDI_sheetName];
            const survey04BDI_jsonData = XLSX.utils.sheet_to_json(survey04BDI_uploadedWorksheet);
            setUploadedSurvey04BDI(survey04BDI_jsonData);

            const survey05RBD_sheetName = workbook.SheetNames[5];
            const survey05RBD_uploadedWorksheet = workbook.Sheets[survey05RBD_sheetName];
            const survey05RBD_jsonData = XLSX.utils.sheet_to_json(survey05RBD_uploadedWorksheet);
            setUploadedSurvey05RBD(survey05RBD_jsonData);

            const survey06NMS_sheetName = workbook.SheetNames[6];
            const survey06NMS_uploadedWorksheet = workbook.Sheets[survey06NMS_sheetName];
            const survey06NMS_jsonData = XLSX.utils.sheet_to_json(survey06NMS_uploadedWorksheet);
            setUploadedSurvey06NMS(survey06NMS_jsonData);

            const survey07PDQ_sheetName = workbook.SheetNames[7];
            const survey07PDQ_uploadedWorksheet = workbook.Sheets[survey07PDQ_sheetName];
            const survey07PDQ_jsonData = XLSX.utils.sheet_to_json(survey07PDQ_uploadedWorksheet);
            setUploadedSurvey07PDQ(survey07PDQ_jsonData);

            const survey08PDSS_sheetName = workbook.SheetNames[8];
            const survey08PDSS_uploadedWorksheet = workbook.Sheets[survey08PDSS_sheetName];
            const survey08PDSS_jsonData = XLSX.utils.sheet_to_json(survey08PDSS_uploadedWorksheet);
            setUploadedSurvey08PDSS(survey08PDSS_jsonData);

            const survey09Tired_sheetName = workbook.SheetNames[9];
            const survey09Tired_uploadedWorksheet = workbook.Sheets[survey09Tired_sheetName];
            const survey09Tired_jsonData = XLSX.utils.sheet_to_json(
              survey09Tired_uploadedWorksheet
            );
            setUploadedSurvey09Tired(survey09Tired_jsonData);

            const survey10SCOPA_sheetName = workbook.SheetNames[10];
            const survey10SCOPA_uploadedWorksheet = workbook.Sheets[survey10SCOPA_sheetName];
            const survey10SCOPA_jsonData = XLSX.utils.sheet_to_json(
              survey10SCOPA_uploadedWorksheet
            );
            setUploadedSurvey10SCOPA(survey10SCOPA_jsonData);

            const survey11Constipation_sheetName = workbook.SheetNames[11];
            const survey11Constipation_uploadedWorksheet =
              workbook.Sheets[survey11Constipation_sheetName];
            const survey11Constipation_jsonData = XLSX.utils.sheet_to_json(
              survey11Constipation_uploadedWorksheet
            );
            setUploadedSurvey11Constipation(survey11Constipation_jsonData);

            const survey12Food_sheetName = workbook.SheetNames[12];
            const survey12Food_uploadedWorksheet = workbook.Sheets[survey12Food_sheetName];
            const survey12Food_jsonData = XLSX.utils.sheet_to_json(survey12Food_uploadedWorksheet);
            setUploadedSurvey12Food(survey12Food_jsonData);
          }
        };
        reader.readAsArrayBuffer(uploadedFileValue);
      }
    }
  };

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
