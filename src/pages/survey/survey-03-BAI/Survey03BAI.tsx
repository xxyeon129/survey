import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentDegreeGradation from '../common/components/survey-contents/survey-contents-degree-gradation/SurveyContentDegreeGradation';
// states
import {
  survey02CurrentPageState,
  survey03CurrentPageState,
  survey04CurrentPageState,
} from '../common/surveyPaginationStates';
import { haveFGSymptomState, survey02FG_totalPagesState } from '../survey-02-FG/Survey02FG.state';
import { survey03BAI_responseSelector } from './survey03BAI.selector';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import { respondedCheckObject03BAI } from '../common/states/respondedCheckObjects.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  BAI_QUESTIONS,
  BAI_QUESTIONS_PER_PAGE,
  SURVEY_03_BAI_INPUT_VALUE_LIST,
  SURVEY_03_BAI_STATE_ANSWERS,
  SURVEY_03_BAI_STATE_KEYWORD,
} from './survey.const';
import { HAVE_NO_FG_SYMPTOM } from '../survey-02-FG/survey.const';
import { PATH_URL } from 'common/constants/path.const';
// hooks
import usePagination from '../common/hooks/usePagination';
import useSetPrevSurveyFirstPage from './hooks/useSetPrevSurveyFirstPage';
import useTotalPages from 'common/layout/header/pagination/useTotalPages';
// styles
import styles from '../common/survey.module.scss';

export default function Survey03BAI() {
  // for set survey-02-FG first page when click bottom prev button in condition answered "없음" to FG symptom pre-question
  const beforPrevSurveyIndex = 1;
  const prevSurveyPath = PATH_URL.SURVEY['02_FG'];
  const prevSurveyCurrentPageState = survey02CurrentPageState;
  const setPrevSurveyFirstPage = useSetPrevSurveyFirstPage({
    beforPrevSurveyIndex,
    prevSurveyPath,
    prevSurveyCurrentPageState,
  });

  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey02CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey04CurrentPageState);
  const prevSurveyTotalPages = useRecoilValue(survey02FG_totalPagesState);
  const currentPageState = survey03CurrentPageState;
  const questions = BAI_QUESTIONS;
  const questionsPerPage = BAI_QUESTIONS_PER_PAGE;
  // for set survey-02-FG first page when click bottom prev button in condition answered "없음" to FG symptom pre-question
  const haveFGSymptom = useRecoilValue(haveFGSymptomState);
  const currentPageNumber = useRecoilValue(currentPageState);
  const conditionToSetPrevSurveyFirstPage =
    haveFGSymptom === HAVE_NO_FG_SYMPTOM && currentPageNumber === 1;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
    conditionToSetPrevSurveyFirstPage,
    setPrevSurveyFirstPage,
  });

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey03BAI_responseSelector);

  // for updata header current page
  const { totalPagesList } = useTotalPages();
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const survey03BAI_totalPagesListIndex = 2;
  const prevPagesList = totalPagesList.slice(0, survey03BAI_totalPagesListIndex);
  const prevPagesCount = prevPagesList.reduce((acc, cur) => acc + cur, 1);
  useEffect(() => {
    if (currentPageQuestions.length > 0 && currentPageQuestions[0].No === 1) {
      setHeaderCurrentPage(prevPagesCount);
    }
  }, []);

  // for show not-responded question "!" icon, not-responded question number message
  const respondedCheckObject = respondedCheckObject03BAI;

  const surveyExplain = (
    <p className={styles.explain}>
      총 {BAI_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[3].TITLE}에 관한
      설문입니다.
      <br />각 문장을 자세히 읽어보시고 오늘을 포함해서{' '}
      <span className={styles['explain-emphasize']}>지난 한 주 동안</span> 자신의 상태를 가장 잘
      나타낸다고 생각되는 유형을 선택해 주세요.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[3].TITLE} subTitle={SURVEY_TITLE_LIST[3].SUB_TITLE} />
      {surveyExplain}

      <section className={styles['survey-content-wrapper']}>
        {currentPageQuestions.map((question) => (
          <SurveyContentDegreeGradation
            question={question}
            degreesListForDisplay={SURVEY_03_BAI_STATE_ANSWERS}
            degreesList={SURVEY_03_BAI_INPUT_VALUE_LIST}
            surveyStateKeyword={SURVEY_03_BAI_STATE_KEYWORD}
            surveyQuestionsPerPage={BAI_QUESTIONS_PER_PAGE}
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
