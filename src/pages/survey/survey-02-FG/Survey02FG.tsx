// states, hook
import { useSetRecoilState } from 'recoil';
import {
  survey01CurrentPageState,
  survey02CurrentPageState,
  survey03CurrentPageState,
} from '../common/surveyPaginationStates';
import usePagination from '../common/hooks/usePagination';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { FG_QUESTIONS, FG_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_01_UPDRS_TOTAL_PAGES } from '../survey-01-UPDRS/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithMedicineEffect from '../common/components/survey-contents/survey-contents-with-medicine-effect/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// styles
import styles from '../common/survey.module.scss';

export default function Survey02FG() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey01CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey03CurrentPageState);
  const prevSurveyTotalPages = SURVEY_01_UPDRS_TOTAL_PAGES;
  const currentPageState = survey02CurrentPageState;
  const questions = FG_QUESTIONS;
  const questionsPerPage = FG_QUESTIONS_PER_PAGE;

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
      <SurveyTitle title={SURVEY_TITLE_LIST[2].TITLE} subTitle={SURVEY_TITLE_LIST[2].SUB_TITLE} />

      {currentPageQuestions.map((question) => (
        <SurveyContentWithMedicineEffect question={question} key={question.No} />
      ))}

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
