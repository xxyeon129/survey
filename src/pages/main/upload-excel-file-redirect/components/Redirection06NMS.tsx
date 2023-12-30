// import { useEffect } from 'react';
// import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { v4 as uuidv4 } from 'uuid';
// // states
// import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
// import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// // constants
// import {
//   NMS_QUESTIONS,
//   SURVEY_06_NMS_STATE_KEYWORD,
// } from 'pages/survey/survey-06-NMS/survey.const';
// import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
// // types
// import { UploadedResponseDataType } from 'common/layout/header/excelFileHandle/types/uploadedResponseData.type';
// import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';

// export default function Redirection06NMS() {
//   const questions = NMS_QUESTIONS;

//   // for apply uploaded excel file response
//   const uploadedExcelFileRawData = useRecoilValue(
//     uploadedResponseStates(SURVEY_TITLE_LIST[6].TITLE)
//   );
//   const totalScoreElementIndex = uploadedExcelFileRawData.length - 1;
//   const uploadedExcelFileData = uploadedExcelFileRawData.slice(0, totalScoreElementIndex);

//   // for question pair degree, frequency
//   const uploadedExcelFileDataList: [UploadedResponseDataType, UploadedResponseDataType][] = [];
//   for (let i = 0; i < uploadedExcelFileData.length; i += 2) {
//     uploadedExcelFileDataList.push([uploadedExcelFileData[i], uploadedExcelFileData[i + 1]]);
//   }

//   return (
//     <>
//       {questions.map((question) => (
//         <RedirectionScoreContent
//           question={question}
//           uploadedExcelFileDataList={uploadedExcelFileDataList}
//           key={uuidv4()}
//         />
//       ))}
//     </>
//   );
// }

// interface RedirectionScoreContentProps {
//   question: SurveyContentObjectType;
//   uploadedExcelFileDataList: [UploadedResponseDataType, UploadedResponseDataType][];
// }

// function RedirectionScoreContent(props: RedirectionScoreContentProps) {
//   return (
//     <>
//       <RedirectionDegreeFrequencyAnswer
//         questionNumber={props.question.No}
//         uploadedExcelFileDataList={props.uploadedExcelFileDataList}
//       />
//       <RedirectionDegreeFrequencyAnswer
//         questionNumber={props.question.No}
//         uploadedExcelFileDataList={props.uploadedExcelFileDataList}
//       />
//     </>
//   );
// }

// interface RedirectionDegreeFrequencyAnswerProps {
//   questionNumber: number;
//   uploadedExcelFileDataList: [UploadedResponseDataType, UploadedResponseDataType][];
// }

// function RedirectionDegreeFrequencyAnswer(props: RedirectionDegreeFrequencyAnswerProps) {
//   const setResponseDegreeAnswer = useSetRecoilState(
//     responseState(`${SURVEY_06_NMS_STATE_KEYWORD}-${props.questionNumber}중증도`)
//   );
//   const setResponseFrequencyAnswer = useSetRecoilState(
//     responseState(`${SURVEY_06_NMS_STATE_KEYWORD}-${props.questionNumber}빈도`)
//   );

//   // for radio button checked according to uploaded excel file progress
//   useEffect(() => {
//     if (
//       props.uploadedExcelFileDataList.length > 0 &&
//       '응답내용' in props.uploadedExcelFileDataList[props.questionNumber - 1][0]
//     ) {
//       setResponseDegreeAnswer(
//         props.uploadedExcelFileDataList[props.questionNumber - 1][0].응답내용
//       );
//     }
//     if (
//       props.uploadedExcelFileDataList.length > 0 &&
//       '응답내용' in props.uploadedExcelFileDataList[props.questionNumber - 1][1]
//     ) {
//       setResponseFrequencyAnswer(
//         props.uploadedExcelFileDataList[props.questionNumber - 1][1].응답내용
//       );
//     }
//   }, []);

//   return <></>;
// }
