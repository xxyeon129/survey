import { useNavigate } from 'react-router-dom';
import { RecoilState, SetterOrUpdater, useRecoilState } from 'recoil';
import { headerCurrentPageState } from 'components/layout/header/pagination/headerPageState';
import { PATH_URL } from 'shared/constants/path.const';
import useCurrentSurveyPagePath from 'pages/survey/common/hooks/useCurrentSurveyPagePath';

interface usePaginationProps {
  // for prev survey type last page / next survey type first page
  setPrevSurveyPage?: SetterOrUpdater<number>;
  setNextSurveyPage?: SetterOrUpdater<number>;
  prevSurveyTotalPages: number;

  currentPageState: RecoilState<number>;
  questions: { No: number; Q?: string; A: string[]; EXPLAIN?: string }[];
  questionsPerPage: number;
}

export default function usePagination(props: usePaginationProps) {
  // for header page display
  const [headerCurrentPage, setHeaderCurrentPage] = useRecoilState(headerCurrentPageState);

  // current survey pages
  const [currentPage, setCurrentPage] = useRecoilState(props.currentPageState);
  const currentSurveyTotalPages = Math.ceil(props.questions.length / props.questionsPerPage);
  const questionStartIndex = (currentPage - 1) * props.questionsPerPage;
  const currentPageQuestions = props.questions.slice(
    questionStartIndex,
    currentPage * props.questionsPerPage
  );

  // for prev/next survey type page
  const navigate = useNavigate();
  const currentSurveyPath = useCurrentSurveyPagePath();

  /* prev/next button click */

  const handlePrevPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);

    if (currentPage === 1) {
      navigate(`${PATH_URL.SURVEY_PATH}${currentSurveyPath - 1}`);
      // for setting prev survey last page
      props.setPrevSurveyPage && props.setPrevSurveyPage(props.prevSurveyTotalPages);
    }

    setHeaderCurrentPage(headerCurrentPage - 1);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    currentPage < currentSurveyTotalPages && setCurrentPage(currentPage + 1);

    if (currentPage === currentSurveyTotalPages) {
      navigate(`${PATH_URL.SURVEY_PATH}${currentSurveyPath + 1}`);
      // for setting next survey first page
      props.setNextSurveyPage && props.setNextSurveyPage(1);
    }

    setHeaderCurrentPage(headerCurrentPage + 1);
    window.scrollTo(0, 0);
  };

  return {
    currentPageQuestions,
    handleNextPage,
    handlePrevPage,
  };
}
