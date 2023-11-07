import { useRecoilValue } from 'recoil';
import * as XLSX from 'xlsx';
import { forExcelFileSelectorSurvey01UPDRS } from './responseDataSelectors/survey01UPDRS_excelData';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';

export default function Test() {
  const survey01UPDRS_ResponseList = useRecoilValue(forExcelFileSelectorSurvey01UPDRS);

  // console.log(survey01UPDRS_ResponseList);

  const workbook = XLSX.utils.book_new();
  const worksheetSurvey01UPDRS = XLSX.utils.json_to_sheet(survey01UPDRS_ResponseList);

  const createExcel = () => {
    XLSX.utils.book_append_sheet(workbook, worksheetSurvey01UPDRS, SURVEY_TITLE_LIST[1].TITLE);
    XLSX.writeFile(workbook, 'test.xlsx');
  };

  return <button onClick={() => createExcel()}>Excel 다운로드</button>;
}
