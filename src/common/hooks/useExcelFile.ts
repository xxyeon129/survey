import * as XLSX from 'xlsx';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRef } from 'react';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { personalInfo_excelData } from '../../pages/test/responseDataSelectors/personalInfo_excelData';
import { survey01UPDRS_excelData } from '../../pages/test/responseDataSelectors/survey01UPDRS_excelData';
import { survey02FG_excelData } from '../../pages/test/responseDataSelectors/survey02FG_excelData';
import { survey03BAI_excelData } from '../../pages/test/responseDataSelectors/survey03BAI_excelData';
import { survey04BDI_excelData } from '../../pages/test/responseDataSelectors/survey04BDI_excelData';
import { survey05RBD_excelData } from '../../pages/test/responseDataSelectors/survey05RBD_excelData';
import { survey06NMS_excelData } from '../../pages/test/responseDataSelectors/survey06NMS_excelData';
import { survey07PDQ_excelData } from '../../pages/test/responseDataSelectors/survey07PDQ_excelData';
import { survey08PDSS_excelData } from '../../pages/test/responseDataSelectors/survey08PDSS_excelData';
import { survey09Tired_excelData } from '../../pages/test/responseDataSelectors/survey09Tired_excelData';
import { survey10SCOPA_excelData } from '../../pages/test/responseDataSelectors/survey10SCOPA_excelData';
import { survey11Constipation_excelData } from '../../pages/test/responseDataSelectors/survey11Constipation_excelData';
import { survey12Food_excelData } from '../../pages/test/responseDataSelectors/survey12Food_excelData';
import { uploadedResponseStates } from '../../pages/test/uploadedResponseDataStates/uploadedResponseData.state';

export default function useExcelFile() {
  // create recoil state in session storage
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

  const sessinStorageStatesSetterList = [
    setUploadedPersonalInfo,
    setUploadedSurvey01UPDRS,
    setUploadedSurvey02FG,
    setUploadedSurvey03BAI,
    setUploadedSurvey04BDI,
    setUploadedSurvey05RBD,
    setUploadedSurvey06NMS,
    setUploadedSurvey07PDQ,
    setUploadedSurvey08PDSS,
    setUploadedSurvey09Tired,
    setUploadedSurvey10SCOPA,
    setUploadedSurvey11Constipation,
    setUploadedSurvey12Food,
  ];

  // get json data for create excel file ------------------------------------------
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

  const worksheetList = [
    worksheetPersonalInfo,
    worksheetSurvey01UPDRS,
    worksheetSurvey02FG,
    worksheetSurvey03BAI,
    worksheetSurvey04BDI,
    worksheetSurvey05RBD,
    worksheetSurvey06NMS,
    worksheetSurvey07PDQ,
    worksheetSurvey08PDSS,
    worksheetSurvey09Tired,
    worksheetSurvey10SCOPA,
    worksheetSurvey11Constipation,
    worksheetSurvey12Food,
  ];
  const worksheetTotalCount = worksheetList.length;

  const downloadExcelFileHandler = () => {
    const bookAppendSheet = (worksheetTotalCount: number) => {
      for (let i = 0; i < worksheetTotalCount; i++) {
        XLSX.utils.book_append_sheet(workbook, worksheetList[i], SURVEY_TITLE_LIST[i].TITLE);
      }
    };
    bookAppendSheet(worksheetTotalCount);

    // TO DO: 파일명 변경
    XLSX.writeFile(workbook, 'test.xlsx');
  };

  // upload excel file ------------------------------------------
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
              for (let i = 0; i < worksheetTotalCount; i++) {
                const sheetName = workbook.SheetNames[i];
                const uploadedWorksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(uploadedWorksheet);
                sessinStorageStatesSetterList[i](jsonData);
              }

              resolve(undefined);
            }
          };
          reader.readAsArrayBuffer(uploadedFileValue);
        }
      }
    });
  };

  return { uploadExcelFileHandler, downloadExcelFileHandler, fileRef };
}
