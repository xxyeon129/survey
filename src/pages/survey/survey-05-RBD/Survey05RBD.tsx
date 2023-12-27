import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import PreQuestion from '../common/components/survey-contents/preQuestion/PreQuestion_forExcel';
import SurveyContentWithShortAnswers from '../common/components/survey-contents/survey-contents-with-short-answers/SurveyContent';
// states
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  survey04CurrentPageState,
  survey05CurrentPageState,
  survey06CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey05RBD_responseSelector } from './survey05RBD.selector';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import { respondedCheckObject05RBD } from '../common/states/respondedCheckObjects.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  RBD_PRE_QUESTION,
  RBD_QUESTIONS,
  RBD_QUESTIONS_PER_PAGE,
  SURVEY_05_RBD_STATE_KEYWORD,
} from './survey.const';
import { SURVEY_04_BDI_TOTAL_PAGES } from '../survey-04-BDI/survey.const';
// hooks
import usePagination from '../common/hooks/usePagination';
import useTotalPages from 'common/layout/header/pagination/useTotalPages';
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

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey05RBD_responseSelector);

  // for updata header current page
  const { totalPagesList } = useTotalPages();
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const survey05RBD_totalPagesListIndex = 4;
  const prevPagesList = totalPagesList.slice(0, survey05RBD_totalPagesListIndex);
  const prevPagesCount = prevPagesList.reduce((acc, cur) => acc + cur, 1);
  useEffect(() => {
    if (currentPageQuestions.length > 0 && currentPageQuestions[0].No === 1) {
      setHeaderCurrentPage(prevPagesCount);
    }
  }, []);

  // for show not-responded question "!" icon, not-responded question number message
  const respondedCheckObject = respondedCheckObject05RBD;

  const surveyExplain = (
    <p className={styles.explain}>
      총 {RBD_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[5].TITLE}에 관한
      설문입니다.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[5].TITLE} subTitle={SURVEY_TITLE_LIST[5].SUB_TITLE} />
      {surveyExplain}

      {/* for pre-question */}
      <PreQuestion
        question={RBD_PRE_QUESTION}
        // for radio button checked
        clickedQuestionNumber="pre"
        surveyStateKeyword={SURVEY_05_RBD_STATE_KEYWORD}
        respondedCheckObject={respondedCheckObject}
      />

      <ul>
        {currentPageQuestions.map((question) => (
          <SurveyContentWithShortAnswers
            question={question}
            surveyStateKeyword={SURVEY_05_RBD_STATE_KEYWORD}
            // for bottom prev/next button
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            // for bottom next button disabled
            currentPageFirstQuestionNumber={currentPageQuestions[0].No}
            currentPageLastQuestionNumber={currentPageQuestions[currentPageQuestions.length - 1].No}
            responseStateList={responseStateList}
            havePreQuestion={true}
            respondedCheckObject={respondedCheckObject}
            key={uuidv4()}
          />
        ))}
      </ul>
    </article>
  );
}
