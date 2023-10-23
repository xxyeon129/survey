// states, hook
import { useSetRecoilState } from 'recoil';
import {
  survey04CurrentPageState,
  survey05CurrentPageState,
} from '../common/surveyPaginationStates';
import usePagination from '../common/hooks/usePagination';
// constants
import { SURVEY } from 'shared/constants/survey.const';
import { FG_QUESTIONS, FG_QUESTIONS_PER_PAGE } from './survey.const';
import { survey04TotalPages } from '../survey-04-UPDRS/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithMedicineEffect from '../common/components/survey-contents/survey-contents-with-medicine-effect/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';

import styles from '../common/survey.module.scss';

export default function Survey05FG() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey04CurrentPageState);
  const prevSurveyTotalPages = survey04TotalPages;
  const currentPageState = survey05CurrentPageState;
  const questions = FG_QUESTIONS;
  const questionsPerPage = FG_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[5].TITLE} subTitle={SURVEY[5].SUB_TITLE} />

      {currentPageQuestions.map((question) => (
        <SurveyContentWithMedicineEffect question={question} key={question.No} />
      ))}

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
