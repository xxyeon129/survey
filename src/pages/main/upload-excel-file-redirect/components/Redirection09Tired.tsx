// import { useRecoilValue } from 'recoil';
// import { v4 as uuidv4 } from 'uuid';
// // components
// import RedirectionTableContent from './common/RedirectionTableContent';
// // states
// import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
// // constants
// import {
//   SURVEY_09_TIRED_STATE_KEYWORD,
//   TIRED_QUESTIONS,
// } from 'pages/survey/survey-09-TIRED/survey.const';
// import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';

// export default function Redirection09Tired() {
//   const questions = TIRED_QUESTIONS;

//   // for apply uploaded excel file response
//   const uploadedExcelFileDataList = useRecoilValue(
//     uploadedResponseStates(SURVEY_TITLE_LIST[9].TITLE)
//   );

//   return (
//     <>
//       {questions.map((question) => (
//         <RedirectionTableContent
//           question={question}
//           surveyStateKeyword={SURVEY_09_TIRED_STATE_KEYWORD}
//           uploadedExcelFileDataList={uploadedExcelFileDataList}
//           key={uuidv4()}
//         />
//       ))}
//     </>
//   );
// }
