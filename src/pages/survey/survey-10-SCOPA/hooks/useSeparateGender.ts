/* UNUSED FILE: before survey-10-SCOPA separate component */
// // states
// import { useEffect, useState } from 'react';
// import { useRecoilValue } from 'recoil';
// import { personalInfoGenderState } from 'pages/survey/personalInfo/personalInfo.state';
// // constants
// import {
//   FEMALE,
//   MALE,
// } from 'pages/survey/personalInfo/components/rightSection/genderCheck/genderCheckSection.const';
// import { SCOPA_QUESTIONS_FEMALE, SCOPA_QUESTIONS_MALE } from '../survey.const';
// // types
// import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';

// // for distinguish question 22-23 by gender
// export default function useSeparateGender() {
//   const selectedGender = useRecoilValue(personalInfoGenderState);
//   const [categorizedQuestionList, setCategorizedQuestionList] = useState<SurveyContentObjectType[]>(
//     []
//   );

//   useEffect(() => {
//     selectedGender === FEMALE && setCategorizedQuestionList(SCOPA_QUESTIONS_FEMALE);
//     selectedGender === MALE && setCategorizedQuestionList(SCOPA_QUESTIONS_MALE);
//   }, [selectedGender]);

//   return categorizedQuestionList;
// }
