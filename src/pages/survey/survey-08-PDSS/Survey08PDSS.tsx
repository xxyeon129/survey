import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentDegreeGradation from './components/SurveyContent';
// states
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  survey07CurrentPageState,
  survey08CurrentPageState,
  survey09CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey08PDSS_responseSelector } from './survey08PDSS.selector';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  PDSS_ANSWERS,
  PDSS_ANSWERS_01,
  PDSS_QUESTIONS,
  PDSS_QUESTIONS_PER_PAGE,
  SURVEY_08_PDSS_STATE_KEYWORD,
} from './survey.const';
import { SURVEY_07_PDQ_TOTAL_PAGES } from '../survey-07-PDQ/survey.const';
import { totalPagesList } from 'common/layout/header/pagination/totalPages.const';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';

export default function Survey08PDSS() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey07CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey09CurrentPageState);
  const prevSurveyTotalPages = SURVEY_07_PDQ_TOTAL_PAGES;
  const currentPageState = survey08CurrentPageState;
  const questions = PDSS_QUESTIONS;
  const questionsPerPage = PDSS_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey08PDSS_responseSelector);

  // for updata header current page
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const survey08PDSS_totalPagesListIndex = 7;
  const prevPagesList = totalPagesList.slice(0, survey08PDSS_totalPagesListIndex);
  const prevPagesCount = prevPagesList.reduce((acc, cur) => acc + cur, 1);
  useEffect(() => {
    if (currentPageQuestions.length > 0 && currentPageQuestions[0].No === 1) {
      setHeaderCurrentPage(prevPagesCount);
    }
  }, []);

  const surveyExplain = (
    <p className={styles.explain}>
      총 {PDSS_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[8].TITLE}에 관한
      설문입니다. <br /> <span className={styles['explain-emphasize']}>지난 일주일 동안</span>{' '}
      경험하였던 수면형태에 대해 해당하는 부분을 선택해 주세요.
      <br />
      <span className={styles['explain-emphasize']}>좌측이 제일 안 좋은 경우</span>이고{' '}
      <span className={styles['explain-emphasize']}>우측이 가장 좋았던 경우</span>입니다. 그 사이에
      환자의 상태에 따라 표시해 주세요.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[8].TITLE} subTitle={SURVEY_TITLE_LIST[8].SUB_TITLE} />
      {surveyExplain}

      <section className={styles['survey-content-wrapper']}>
        {currentPageQuestions.map((question) => (
          <SurveyContentDegreeGradation
            question={question}
            answers={PDSS_ANSWERS}
            exceptionalAnswers={PDSS_ANSWERS_01}
            exceptionalNo={1}
            surveyStateKeyword={SURVEY_08_PDSS_STATE_KEYWORD}
            // for bottom prev/next button
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            // for bottom next button disabled
            currentPageFirstQuestionNumber={currentPageQuestions[0].No}
            currentPageLastQuestionNumber={currentPageQuestions[currentPageQuestions.length - 1].No}
            responseStateList={responseStateList}
            key={uuidv4()}
          />
        ))}
      </section>
    </article>
  );
}
