import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import PreQuestion from '../common/components/survey-contents/preQuestion/PreQuestion';
import SurveyContentWithMedicineEffect from '../common/components/survey-contents/survey-contents-with-medicine-effect/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// states
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  survey01CurrentPageState,
  survey02CurrentPageState,
  survey03CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey02FG_responseSelector } from './survey02FG.selector';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import {
  respondedCheckObject02FG,
  takeMedicineRespondedCheckObject02FG,
} from '../common/states/respondedCheckObjects.state';
import { responseState } from '../common/states/surveyResponse.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  FG_PRE_QUESTION,
  FG_QUESTIONS,
  FG_QUESTIONS_PER_PAGE,
  HAVE_FG_SYMPTOM,
  HAVE_NO_FG_SYMPTOM,
  SURVEY_02_FG_STATE_KEYWORD,
} from './survey.const';
import {
  SURVEY_01_UPDRS_STATE_KEYWORD,
  SURVEY_01_UPDRS_TOTAL_PAGES,
  TAKE_MEDICINE,
} from '../survey-01-UPDRS/survey.const';
import { PATH_URL } from 'common/constants/path.const';
import { totalPagesList } from 'common/layout/header/pagination/totalPages.const';
// hooks
import usePagination from '../common/hooks/usePagination';
import useRouteToNextSurvey from './hooks/useRouteToNextSurvey';
// styles
import styles from '../common/survey.module.scss';

export default function Survey02FG() {
  // for route to next survey when click bottom next button in condition answered "없음" to pre-question
  const currentSurveyIndex = 2;
  const nextSurveyPath = PATH_URL.SURVEY['03_BAI'];
  const routeToNextSurvey = useRouteToNextSurvey({
    currentSurveyIndex,
    nextSurveyPath,
  });

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey02FG_responseSelector);
  // for display questions only when answered pre-question
  const preQuestionResponse = responseStateList[0];
  // for bottom next button activate when answered "없다"
  const nextBtnDisabledCondition = preQuestionResponse === '';

  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey01CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey03CurrentPageState);
  const prevSurveyTotalPages = SURVEY_01_UPDRS_TOTAL_PAGES;
  const currentPageState = survey02CurrentPageState;
  const questions = FG_QUESTIONS;
  const questionsPerPage = FG_QUESTIONS_PER_PAGE;
  // for route to next survey when click bottom next button in condition answered "없음" to pre-question
  const conditionToRouteNextSurvey = preQuestionResponse === HAVE_NO_FG_SYMPTOM;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
    conditionToRouteNextSurvey,
    routeToNextSurvey,
  });

  // for updata header current page
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const survey02FG_totalPagesListIndex = 1;
  const prevPagesList = totalPagesList.slice(0, survey02FG_totalPagesListIndex);
  const prevPagesCount = prevPagesList.reduce((acc, cur) => acc + cur, 1);
  useEffect(() => {
    if (currentPageQuestions.length > 0 && currentPageQuestions[0].No === 1) {
      setHeaderCurrentPage(prevPagesCount);
    }
  }, []);

  // for show not-responded question "!" icon, not-responded question number message
  const [respondedCheckObject, setRespondedCheckObject] = useState(respondedCheckObject02FG);
  const takeMedicineResponse = useRecoilValue(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)
  );

  useEffect(() => {
    if (takeMedicineResponse === TAKE_MEDICINE)
      setRespondedCheckObject(takeMedicineRespondedCheckObject02FG);
  }, [takeMedicineResponse]);

  const surveyExplain = (
    <p className={styles.explain}>
      총 {FG_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[2].TITLE.slice(0, 4)}에 관한
      설문입니다.
      <br />
      이전 &lt;{SURVEY_TITLE_LIST[1].TITLE}&gt; 설문에서 응답하신 파킨슨병 약 복용 여부에 따라
      설문의 구성이 달라집니다.
      <br />
      하단의 보행 문제 질문에서 '없다'로 응답하실 경우 다음 설문지로 이동되고, '있다'로 응답하실
      경우 설문 내용이 표시됩니다.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[2].TITLE} subTitle={SURVEY_TITLE_LIST[2].SUB_TITLE} />
      {surveyExplain}

      {/* for pre-question */}
      <PreQuestion
        question={FG_PRE_QUESTION}
        clickedQuestionNumber="pre"
        surveyStateKeyword={SURVEY_02_FG_STATE_KEYWORD}
        routeToNextSurvey={routeToNextSurvey}
        // for show not-responded question "!" icon, not-responded question number message
        respondedCheckObject={respondedCheckObject}
      />

      {/* for display questions only when answered "있다" in pre-question */}
      {preQuestionResponse === HAVE_FG_SYMPTOM && (
        <>
          {currentPageQuestions.map((question) => (
            <SurveyContentWithMedicineEffect
              question={question}
              surveyStateKeyword={SURVEY_02_FG_STATE_KEYWORD}
              // for bottom prev/next button
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              // for bottom next button disabled
              currentPageFirstQuestionNumber={currentPageQuestions[0].No}
              currentPageLastQuestionNumber={
                currentPageQuestions[currentPageQuestions.length - 1].No
              }
              responseStateList={responseStateList}
              // for show not-responded question "!" icon, not-responded question number message
              respondedCheckObject={respondedCheckObject}
              surveyQuestionsPerPage={FG_QUESTIONS_PER_PAGE}
              key={uuidv4()}
            />
          ))}
        </>
      )}

      {/* bottom prev/next pagination buttons when answered "없다" in pre-question  */}
      {preQuestionResponse !== HAVE_FG_SYMPTOM && (
        <BottomPrevNextButton
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          nextBtnDisabledCondition={nextBtnDisabledCondition}
          // for show not-responded question "!" icon, not-responded question number message
          // TO DO: 조건부 bottom button 구현 - 아래 props 삭제
          respondedCheckObject={respondedCheckObject}
          responseStateList={responseStateList}
          currentPageFirstQuestionNumber={currentPageQuestions[0].No}
          currentPageLastQuestionNumber={currentPageQuestions[currentPageQuestions.length - 1].No}
          surveyQuestionsPerPage={FG_QUESTIONS_PER_PAGE}
          // essential props
          scrollIdKeyword={SURVEY_02_FG_STATE_KEYWORD}
        />
      )}
    </article>
  );
}
