import { useRecoilValue } from 'recoil';
import * as XLSX from 'xlsx';
import { survey01UPDRS_excelData } from './responseDataSelectors/survey01UPDRS_excelData';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { survey02FG_excelData } from './responseDataSelectors/survey02FG_excelData';

export default function Test() {
  const survey01UPDRS_ResponseList = useRecoilValue(survey01UPDRS_excelData);
  const survey02FG_ResponseList = useRecoilValue(survey02FG_excelData);

  // console.log(survey02FG_ResponseList);

  const workbook = XLSX.utils.book_new();
  const worksheetSurvey01UPDRS = XLSX.utils.json_to_sheet(survey01UPDRS_ResponseList);
  const worksheetSurvey02FG = XLSX.utils.json_to_sheet(survey02FG_ResponseList);

  const createExcel = () => {
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey01UPDRS, SURVEY_TITLE_LIST[1].TITLE);
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey02FG, SURVEY_TITLE_LIST[2].TITLE);
    XLSX.writeFile(workbook, 'test.xlsx');
  };

  return <button onClick={() => createExcel()}>Excel 다운로드</button>;
}
