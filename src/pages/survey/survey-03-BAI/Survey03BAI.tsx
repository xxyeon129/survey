// states
import { useSetRecoilState } from 'recoil';
import {
  survey02CurrentPageState,
  survey03CurrentPageState,
  survey04CurrentPageState,
} from '../common/surveyPaginationStates';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentTable from '../common/components/survey-contents/survey-contents-table/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { BAI_ANSWERS, BAI_QUESTIONS, BAI_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_02_FG_TOTAL_PAGES } from '../survey-02-FG/survey.const';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';

export default function Survey03BAI() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey02CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey04CurrentPageState);
  const prevSurveyTotalPages = SURVEY_02_FG_TOTAL_PAGES;
  const currentPageState = survey03CurrentPageState;
  const questions = BAI_QUESTIONS;
  const questionsPerPage = BAI_QUESTIONS_PER_PAGE;

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
      총 {BAI_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[3].TITLE}에 관한
      설문입니다.
      <br />각 문장을 자세히 읽어보시고 오늘을 포함해서{' '}
      <span className={styles['explain-emphasize']}>지난 한 주 동안</span> 자신의 상태를 가장 잘
      나타낸다고 생각되는 유형을 선택하여 주십시오.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[3].TITLE} subTitle={SURVEY_TITLE_LIST[3].SUB_TITLE} />
      {surveyExplain}

      <section className={styles['survey-content-wrapper']}>
        <SurveyContentTable
          questions={currentPageQuestions}
          answers={BAI_ANSWERS}
          radioBtnValues={[0, 1, 2, 3]}
        />
      </section>
      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
