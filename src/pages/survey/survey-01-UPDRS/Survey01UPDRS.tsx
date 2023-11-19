import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithMedicineEffect from '../common/components/survey-contents/survey-contents-with-medicine-effect/SurveyContent';
import PreQuestion from '../common/components/survey-contents/preQuestion/PreQuestion';
// states
import {
  survey01CurrentPageState,
  survey02CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey01UPDRS_responseSelector } from './survey01UPDRS.selector';
import { responseState } from '../common/states/surveyResponse.state';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import {
  respondedCheckObject01UPDRS,
  takeMedicineRespondedCheckObject01UPDRS,
} from '../common/states/respondedCheckObjects.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
  UPDRS_PRE_QUESTION,
  UPDRS_QUESTIONS,
  UPDRS_QUESTIONS_PER_PAGE,
} from './survey.const';
import { surveyCurrentPageStates } from 'common/layout/sidebar/surveyCurrentPageStates.const';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';

export default function Survey01UPDRS() {
  // pagination hook props
  const setNextSurveyPage = useSetRecoilState(survey02CurrentPageState);
  const prevSurveyTotalPages = 0;
  const currentPageState = survey01CurrentPageState;
  const questions = UPDRS_QUESTIONS;
  const questionsPerPage = UPDRS_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey01UPDRS_responseSelector);

  // for display questions only when answered pre-question
  const respondedPreQuestionResponse = responseStateList[0] !== '';

  const preQuestionResponseValue = useRecoilValue(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)
  );

  // for display first page when change pre-question response
  const surveyPageStateResetterList = surveyCurrentPageStates.map(useResetRecoilState);
  const indexSurvey01UPDRS = 1;
  useEffect(() => {
    surveyPageStateResetterList.forEach(
      (reset, resetterIndex) => resetterIndex + 1 === indexSurvey01UPDRS && reset()
    );
    window.scrollTo(0, 0);
  }, [preQuestionResponseValue]);

  // for updata header current page
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);

  useEffect(() => {
    if (currentPageQuestions.length > 0 && currentPageQuestions[0].No === 1) {
      setHeaderCurrentPage(1);
    }
  }, []);

  // for show not-responded question "!" icon, not-responded question number message
  const [respondedCheckObject, setRespondedCheckObject] = useState(respondedCheckObject01UPDRS);
  const takeMedicineResponse = useRecoilValue(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)
  );

  useEffect(() => {
    if (takeMedicineResponse === TAKE_MEDICINE)
      setRespondedCheckObject(takeMedicineRespondedCheckObject01UPDRS);
  }, [takeMedicineResponse]);

  // for survey-01-UPDRS show pre-question only first page
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);
  console.log('현재 몇페잊지여', headerCurrentPage);

  const surveyExplain = (
    <p className={styles.explain}>
      총 {UPDRS_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[1].TITLE}에 관한
      설문입니다. <br />
      파킨슨병 약 복용 여부에 따라 설문이 다르게 구성되므로 하단 질문에 응답해 주세요.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[1].TITLE} subTitle={SURVEY_TITLE_LIST[1].SUB_TITLE} />
      {surveyExplain}

      {/* show pre-question only first page */}
      {headerCurrentPage === 1 && (
        <>
          <PreQuestion
            question={UPDRS_PRE_QUESTION}
            clickedQuestionNumber="pre"
            surveyStateKeyword={SURVEY_01_UPDRS_STATE_KEYWORD}
            // for show not-responded question "!" icon, not-responded question number message
            respondedCheckObject={respondedCheckObject}
            // for survey-01-UPDRS setting header current page 1
            isUPDRSPreQuestion={true}
          />
        </>
      )}

      {/* for display questions only when answered pre-question */}
      {respondedPreQuestionResponse && (
        <>
          {currentPageQuestions.map((question) => (
            <SurveyContentWithMedicineEffect
              question={question}
              surveyStateKeyword={SURVEY_01_UPDRS_STATE_KEYWORD}
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
              key={uuidv4()}
            />
          ))}
        </>
      )}
    </article>
  );
}
