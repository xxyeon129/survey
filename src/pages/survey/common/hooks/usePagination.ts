import { useNavigate } from 'react-router-dom';
import { RecoilState, SetterOrUpdater, useRecoilState } from 'recoil';
// states
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
// constants
import { PATH_URL } from 'common/constants/path.const';
// hooks
import useCurrentSurveyPagePath from 'pages/survey/common/hooks/useCurrentSurveyPagePath';
import useTotalPages from 'common/layout/header/pagination/useTotalPages';
// types
import { SurveyContentObjectType } from '../types/surveyTypes';

interface usePaginationProps {
  // for prev survey type last page / next survey type first page
  setPrevSurveyPage?: SetterOrUpdater<number>;
  setNextSurveyPage?: SetterOrUpdater<number>;
  prevSurveyTotalPages: number;

  currentPageState: RecoilState<number>;
  questions: SurveyContentObjectType[];
  questionsPerPage: number;

  // for survey-02-FG answered "없다" in pre-answer
  conditionToRouteNextSurvey?: boolean;
  routeToNextSurvey?: () => void;
  conditionToSetPrevSurveyFirstPage?: boolean;
  setPrevSurveyFirstPage?: () => void;

  // for survey-12-Food last page modal
  onClickLastPageNextBtnHandler?: () => void;
}

export default function usePagination(props: usePaginationProps) {
  // for header page display
  const [headerCurrentPage, setHeaderCurrentPage] = useRecoilState(headerCurrentPageState);
  const { totalPagesCount } = useTotalPages();

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
    // for set survey-02-FG first page when answered "없다" in survey-02-FG pre-question
    if (props.conditionToSetPrevSurveyFirstPage) {
      props.setPrevSurveyFirstPage && props.setPrevSurveyFirstPage();
      return;
    }

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
    // for route to next survey when answered "없다" in survey-02-FG pre-question
    if (props.conditionToRouteNextSurvey) {
      props.routeToNextSurvey && props.routeToNextSurvey();
      return;
    }

    // for last page
    if (headerCurrentPage === totalPagesCount) {
      props.onClickLastPageNextBtnHandler && props.onClickLastPageNextBtnHandler();
      return;
    }

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
