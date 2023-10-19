import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { headerCurrentPageState } from 'components/layout/header/pagination/headerPageState';
import { PATH_URL } from 'shared/constants/path.const';
import useCurrentSurveyPagePath from 'shared/hooks/useCurrentSurveyPagePath';

export default function usePagination(questions: string[], questionLimit: number) {
  // for header page display
  const [headerCurrentPage, setHeaderCurrentPage] = useRecoilState(headerCurrentPageState);

  // current survey pages
  const [currentPage, setCurrentPage] = useState(1);
  const currentSurveyTotalPages = Math.ceil(questions.length / questionLimit);
  const questionStartIndex = (currentPage - 1) * questionLimit;
  const currentPageQuestions = questions.slice(questionStartIndex, currentPage * questionLimit);

  // for prev/next survey type page
  const navigate = useNavigate();
  const currentSurveyPath = useCurrentSurveyPagePath();

  /* prev/next button click */

  const handlePrevPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);

    if (currentPage === 1) {
      navigate(`${PATH_URL.SURVEY_PATH}${currentSurveyPath - 1}`);
      // TO DO: 사이드바 체크 업데이트
    }

    setHeaderCurrentPage(headerCurrentPage - 1);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    currentPage < currentSurveyTotalPages && setCurrentPage(currentPage + 1);

    if (currentPage === currentSurveyTotalPages) {
      navigate(`${PATH_URL.SURVEY_PATH}${currentSurveyPath + 1}`);
      // TO DO: 사이드바 체크 업데이트
    }

    setHeaderCurrentPage(headerCurrentPage + 1);
    window.scrollTo(0, 0);
  };

  return {
    currentPage,
    currentSurveyTotalPages,
    questionStartIndex,
    currentPageQuestions,
    handleNextPage,
    handlePrevPage,
  };
}
