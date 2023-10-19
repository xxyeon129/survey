import { SURVEY } from 'shared/constants/survey.const';
import useQnAList from '../../pages/survey/common/hooks/useQnAList';

export default function calculatePages(location: number) {
  const surveyLists = [];
  const paginationQuestionLimits = [];

  for (let i = 1; i < location; i++) {
    // TO DO: 설문 내용 받으면 그에 따라 if문 조건 수정
    if (i === (1 || 2)) {
      surveyLists.push(SURVEY[i].QUESTIONS);
      paginationQuestionLimits.push(SURVEY[i].PAGINATION_QUESTIONS_LIMIT);
    }
  }

  // @getTotalPages.ts
  // 이전/전체 질문들 [{},{}...]
  // const surveyLists = [SURVEY[1].QUESTIONS, SURVEY[2].QUESTIONS];

  // 이전/전체 질문들 limit [5,6...]
  // const paginationQuestionLimits = [
  //   SURVEY[1].PAGINATION_QUESTIONS_LIMIT,
  //   SURVEY[2].PAGINATION_QUESTIONS_LIMIT,
  // ];

  // object로 된 질문들에서 Q로만 이루어진 string[]
  const allQuestions = surveyLists.map((surveyList) => {
    const { questions } = useQnAList(surveyList);
    return questions;
  });

  let sumPages = 1;

  for (let i = 0; i < allQuestions.length; i++) {
    const currentSurveyTotalPages = Math.ceil(allQuestions[i].length / paginationQuestionLimits[i]);
    sumPages += currentSurveyTotalPages;
  }

  // 개인정보 페이지 추가
  if (0 < location) sumPages += 1;

  return sumPages;
}
