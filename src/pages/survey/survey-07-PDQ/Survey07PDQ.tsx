import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentDegreeGradation from '../common/components/survey-contents/survey-contents-degree-gradation/SurveyContentDegreeGradation';
// states
import {
  survey06CurrentPageState,
  survey07CurrentPageState,
  survey08CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey07PDQ_responseSelector } from './survey07PDQ.selector';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import { respondedCheckObject07PDQ } from '../common/states/respondedCheckObjects.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  PDQ_ANSWERS,
  PDQ_QUESTIONS,
  PDQ_QUESTIONS_PER_PAGE,
  SURVEY_07_PDQ_INPUT_VALUE_LIST,
  SURVEY_07_PDQ_STATE_KEYWORD,
} from './survey.const';
import { SURVEY_06_NMS_TOTAL_PAGES } from '../survey-06-NMS/survey.const';
// hooks
import usePagination from '../common/hooks/usePagination';
import useTotalPages from 'common/layout/header/pagination/useTotalPages';
// styles
import styles from '../common/survey.module.scss';

export default function Survey07PDQ() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey06CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey08CurrentPageState);
  const prevSurveyTotalPages = SURVEY_06_NMS_TOTAL_PAGES;
  const currentPageState = survey07CurrentPageState;
  const questions = PDQ_QUESTIONS;
  const questionsPerPage = PDQ_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey07PDQ_responseSelector);

  // for updata header current page
  const { totalPagesList } = useTotalPages();
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const survey07PDQ_totalPagesListIndex = 6;
  const prevPagesList = totalPagesList.slice(0, survey07PDQ_totalPagesListIndex);
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
      총 {PDQ_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[7].TITLE}에 관한
      설문입니다. <br />
      <span className={styles['explain-emphasize']}>최근 한 달 동안의</span> 증상을 평가합니다. 각
      질문에 대해 하나의 유형을 선택해 주세요.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[7].TITLE} subTitle={SURVEY_TITLE_LIST[7].SUB_TITLE} />
      {surveyExplain}

      <section className={styles['survey-content-wrapper']}>
        {currentPageQuestions.map((question) => (
          <SurveyContentDegreeGradation
            question={question}
            degreesListForDisplay={PDQ_ANSWERS}
            degreesList={SURVEY_07_PDQ_INPUT_VALUE_LIST}
            surveyStateKeyword={SURVEY_07_PDQ_STATE_KEYWORD}
            surveyQuestionsPerPage={PDQ_QUESTIONS_PER_PAGE}
            // for bottom prev/next button
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            // for bottom next button disabled
            currentPageFirstQuestionNumber={currentPageQuestions[0].No}
            currentPageLastQuestionNumber={currentPageQuestions[currentPageQuestions.length - 1].No}
            responseStateList={responseStateList}
            // for show not-responded question "!" icon, not-responded question number message
            respondedCheckObject={respondedCheckObject}
            key={uuidv4()}
          />
        ))}
      </section>
    </article>
  );
}
