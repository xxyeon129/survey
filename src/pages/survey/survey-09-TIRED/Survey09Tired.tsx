import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentTable from '../common/components/survey-contents/survey-contents-table/SurveyContent';
// states
import {
  survey08CurrentPageState,
  survey09CurrentPageState,
  survey10CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey09Tired_responseSelector } from './survey09Tired.selector';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import { respondedCheckObject07PDQ } from '../common/states/respondedCheckObjects.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  SURVEY_09_TIRED_STATE_ANSWERS,
  SURVEY_09_TIRED_STATE_KEYWORD,
  TIRED_ANSWERS,
  TIRED_QUESTIONS,
  TIRED_QUESTIONS_PER_PAGE,
} from './survey.const';
import { SURVEY_08_PDSS_TOTAL_PAGES } from '../survey-08-PDSS/survey.const';
import { totalPagesList } from 'common/layout/header/pagination/totalPages.const';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';

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

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey09Tired_responseSelector);

  // for updata header current page
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const survey09Tired_totalPagesListIndex = 8;
  const prevPagesList = totalPagesList.slice(0, survey09Tired_totalPagesListIndex);
  const prevPagesCount = prevPagesList.reduce((acc, cur) => acc + cur, 1);
  useEffect(() => {
    if (currentPageQuestions.length > 0 && currentPageQuestions[0].No === 1) {
      setHeaderCurrentPage(prevPagesCount);
    }
  }, []);

  // for show not-responded question "!" icon, not-responded question number message
  const respondedCheckObject = respondedCheckObject07PDQ;

  const surveyExplain = (
    <p className={styles.explain}>
      총 {TIRED_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[9].TITLE}에 관한
      설문입니다. <br />
      <span className={styles['explain-emphasize']}>최근 한 달 동안의</span> 증상을 평가합니다. 각
      질문에 대해 하나의 유형을 선택해 주세요.
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
          radioBtnValues={SURVEY_09_TIRED_STATE_ANSWERS}
          surveyStateKeyword={SURVEY_09_TIRED_STATE_KEYWORD}
          // for bottom prev/next button
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          // for bottom next button disabled
          currentPageFirstQuestionNumber={currentPageQuestions[0].No}
          currentPageLastQuestionNumber={currentPageQuestions[currentPageQuestions.length - 1].No}
          responseStateList={responseStateList}
          // for show not-responded question "!" icon, not-responded question number message
          respondedCheckObject={respondedCheckObject}
          surveyQuestionsPerPage={TIRED_QUESTIONS_PER_PAGE}
        />
      </section>
    </article>
  );
}
