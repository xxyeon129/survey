// states
import { useSetRecoilState } from 'recoil';
import {
  survey04CurrentPageState,
  survey05CurrentPageState,
  survey06CurrentPageState,
} from '../common/surveyPaginationStates';
// hooks
import usePagination from '../common/hooks/usePagination';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { RBD_QUESTIONS, RBD_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_04_BDI_TOTAL_PAGES } from '../survey-04-BDI/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithShortAnswers from '../common/components/survey-contents/survey-contents-with-short-answers/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// styles
import styles from '../common/survey.module.scss';

export default function Survey05RBD() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey04CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey06CurrentPageState);
  const prevSurveyTotalPages = SURVEY_04_BDI_TOTAL_PAGES;
  const currentPageState = survey05CurrentPageState;
  const questions = RBD_QUESTIONS;
  const questionsPerPage = RBD_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[5].TITLE} subTitle={SURVEY_TITLE_LIST[5].SUB_TITLE} />
      <ul>
        {currentPageQuestions.map((question) => (
          <SurveyContentWithShortAnswers question={question} key={question.No} />
        ))}
      </ul>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
