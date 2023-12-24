import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContent10SCOPA from './components/SurveyContent10SCOPA';
// states
import {
  survey09CurrentPageState,
  survey10CurrentPageState,
  survey11CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey10SCOPA_responseSelector } from './survey10SCOPA.selector';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import { respondedCheckObject10SCOPA } from '../common/states/respondedCheckObjects.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { SCOPA_QUESTIONS, SCOPA_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_09_TIRED_TOTAL_PAGES } from '../survey-09-TIRED/survey.const';
// hooks
import usePagination from '../common/hooks/usePagination';
import useTotalPages from 'common/layout/header/pagination/useTotalPages';
// styles
import styles from '../common/survey.module.scss';

export default function Survey10SCOPA() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey09CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey11CurrentPageState);
  const prevSurveyTotalPages = SURVEY_09_TIRED_TOTAL_PAGES;
  const currentPageState = survey10CurrentPageState;
  const questions = SCOPA_QUESTIONS;
  const questionsPerPage = SCOPA_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey10SCOPA_responseSelector);

  // for updata header current page
  const { totalPagesList } = useTotalPages();
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const survey10SCOPA_totalPagesListIndex = 9;
  const prevPagesList = totalPagesList.slice(0, survey10SCOPA_totalPagesListIndex);
  const prevPagesCount = prevPagesList.reduce((acc, cur) => acc + cur, 1);
  useEffect(() => {
    if (currentPageQuestions.length > 0 && currentPageQuestions[0].No === 1) {
      setHeaderCurrentPage(prevPagesCount);
    }
  }, []);

  // for show not-responded question "!" icon, not-responded question number message
  const respondedCheckObject = respondedCheckObject10SCOPA;

  const surveyExplain = (
    <p className={styles.explain}>
      총 {SCOPA_QUESTIONS.length}개의 문항으로 이루어진{' '}
      <span className={styles['explain-emphasize']}>지난 한 달 동안</span>의 자율신경계 증상에 대한
      설문지입니다. 본인의 증상을 가장 잘 설명하는 답안을 선택해 주세요. 만약 이런 증상들에 대해
      약을 복용하는 것이 있다면,{' '}
      <span className={styles['explain-emphasize']}>약을 먹은 상태에서</span> 어느 정도인지를
      평가해주시기 바랍니다. 복용하는 약 이름은 마지막 페이지에 적어 주십시오.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[10].TITLE} subTitle={SURVEY_TITLE_LIST[10].SUB_TITLE} />
      {surveyExplain}
      <ul>
        {currentPageQuestions.map((question) => (
          <SurveyContent10SCOPA
            question={question}
            // for bottom prev/next button
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            // for bottom next button disabled
            currentPageFirstQuestionNumber={currentPageQuestions[0].No}
            currentPageLastQuestionNumber={currentPageQuestions[currentPageQuestions.length - 1].No}
            responseStateList={responseStateList}
            respondedCheckObject={respondedCheckObject}
            key={uuidv4()}
          />
        ))}
      </ul>
    </article>
  );
}
