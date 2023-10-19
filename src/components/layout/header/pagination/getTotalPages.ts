import useQnAList from 'pages/survey/common/hooks/useQnAList';
import { SURVEY } from 'shared/constants/survey.const';

export const getTotalPages = () => {
  const surveyLists = [SURVEY[1].QUESTIONS, SURVEY[2].QUESTIONS];
  const paginationQuestionLimits = [
    SURVEY[1].PAGINATION_QUESTIONS_LIMIT,
    SURVEY[2].PAGINATION_QUESTIONS_LIMIT,
  ];

  const allQuestions = surveyLists.map((surveyList) => {
    const { questions } = useQnAList(surveyList);
    return questions;
  });

  let totalPages = 0;

  for (let i = 0; i < allQuestions.length; i++) {
    const currentSurveyTotalPages = Math.ceil(allQuestions[i].length / paginationQuestionLimits[i]);
    totalPages += currentSurveyTotalPages;
  }

  // TO DO: 개인정보 입력 페이지 추가 후 삭제
  totalPages += 1;

  // TEST CODE: 3~10번 임시 페이지 추가
  totalPages += 8;

  return totalPages;
};
