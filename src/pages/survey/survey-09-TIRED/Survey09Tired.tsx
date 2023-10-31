// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentTable from '../common/components/survey-contents/survey-contents-table/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { TIRED_ANSWERS, TIRED_QUESTIONS, TIRED_QUESTIONS_PER_PAGE } from './survey.const';
// styles
import styles from '../common/survey.module.scss';
import { useSetRecoilState } from 'recoil';
import {
  survey08CurrentPageState,
  survey09CurrentPageState,
  survey10CurrentPageState,
} from '../common/surveyPaginationStates';
import { SURVEY_08_PDSS_TOTAL_PAGES } from '../survey-08-PDSS/survey.const';
import usePagination from '../common/hooks/usePagination';

export default function Survey09Tired() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey08CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey10CurrentPageState);
  const prevSurveyTotalPages = SURVEY_08_PDSS_TOTAL_PAGES;
  const currentPageState = survey09CurrentPageState;
  const questions = TIRED_QUESTIONS;
  const questionsPerPage = TIRED_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  const surveyExplain = (
    <p className={styles.explain}>
      총 {TIRED_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[9].TITLE}에 관한
      설문입니다. <br />
      <span className={styles['explain-emphasize']}>최근 한 달 동안의</span> 증상을 평가합니다. 각
      질문에 대해 하나의 유형을 선택해 주십시오.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[9].TITLE} subTitle={SURVEY_TITLE_LIST[9].SUB_TITLE} />
      {surveyExplain}

      <section className={styles['survey-content-wrapper']}>
        <SurveyContentTable
          questions={currentPageQuestions}
          answers={TIRED_ANSWERS}
          radioBtnValues={[0, 1, 2, 3, 4]}
        />
      </section>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
