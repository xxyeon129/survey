import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithMedicineEffect from '../common/components/survey-contents/survey-contents-with-medicine-effect/SurveyContentWithMedicineEffect';
import PreQuestion from '../common/components/survey-contents/preQuestion/PreQuestion';
import Survey01UPDRS_ResetLocalStorageResponse from './reset-response-for-change-pre-question/Survey01UPDRS_ResetLocalStorageResponse';
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
import { survey01UPDRS_totalPagesState } from './survey01UPDRS.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  SURVEY_01_UPDRS_TAKE_MEDICINE_TOTAL_PAGES,
  SURVEY_01_UPDRS_TOTAL_PAGES,
  TAKE_MEDICINE,
  UPDRS_PRE_QUESTION,
  UPDRS_QUESTIONS,
  UPDRS_QUESTIONS_PER_PAGE,
  UPDRS_TAKE_MEDICINE_QUESTIONS,
} from './survey.const';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';

export default function Survey01UPDRS() {
  const setTotalPagesCount = useSetRecoilState(survey01UPDRS_totalPagesState);
  const [questionsAccordingToTakeMedicine, setQuestionsAccordingToTakeMedicine] =
    useState(UPDRS_QUESTIONS);

  // pagination hook props
  const setNextSurveyPage = useSetRecoilState(survey02CurrentPageState);
  const prevSurveyTotalPages = 0;
  const currentPageState = survey01CurrentPageState;
  const questions = questionsAccordingToTakeMedicine;
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

  // for update header current page
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

  // for reset localStorage response according to change pre-question
  const [isTakeMedicineResetCondition, setIsTakeMedicineResetCondition] = useState(false);
  const [isNotTakeMedicineResetCondition, setIsNotTakeMedicineResetCondition] = useState(false);

  useEffect(() => {
    if (takeMedicineResponse === TAKE_MEDICINE) {
      setRespondedCheckObject(takeMedicineRespondedCheckObject01UPDRS);
      setQuestionsAccordingToTakeMedicine(UPDRS_TAKE_MEDICINE_QUESTIONS);
      setTotalPagesCount(SURVEY_01_UPDRS_TAKE_MEDICINE_TOTAL_PAGES);
      // for reset localStorage response according to change pre-question
      setIsNotTakeMedicineResetCondition(true);
      setIsTakeMedicineResetCondition(false);
    }
    if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
      setRespondedCheckObject(respondedCheckObject01UPDRS);
      setQuestionsAccordingToTakeMedicine(UPDRS_QUESTIONS);
      setTotalPagesCount(SURVEY_01_UPDRS_TOTAL_PAGES);
      // for reset localStorage response according to change pre-question
      setIsTakeMedicineResetCondition(true);
      setIsNotTakeMedicineResetCondition(false);
    }
  }, [takeMedicineResponse]);

  // for survey-01-UPDRS show pre-question only first page
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);

  const surveyExplain = (
    <p className={styles.explain}>
      {takeMedicineResponse === TAKE_MEDICINE
        ? `총 ${UPDRS_TAKE_MEDICINE_QUESTIONS.length}개의 문항으로 이루어진 `
        : `총 ${UPDRS_QUESTIONS.length}개의 문항으로 이루어진 `}
      {SURVEY_TITLE_LIST[1].TITLE}에 관한 설문입니다. <br />
      파킨슨병 약 복용 여부에 따라 설문이 다르게 구성되므로 첫 페이지 상단의 질문에 응답해 주세요.
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
              surveyQuestionsPerPage={UPDRS_QUESTIONS_PER_PAGE}
              key={uuidv4()}
            />
          ))}
        </>
      )}

      {/* for reset localStorage response according to change pre-question */}
      {isNotTakeMedicineResetCondition && (
        <Survey01UPDRS_ResetLocalStorageResponse
          questionList={UPDRS_QUESTIONS}
          resetTarget={NOT_TAKE_MEDICINE}
        />
      )}
      {isTakeMedicineResetCondition && (
        <Survey01UPDRS_ResetLocalStorageResponse
          questionList={UPDRS_TAKE_MEDICINE_QUESTIONS}
          resetTarget={TAKE_MEDICINE}
        />
      )}
    </article>
  );
}
