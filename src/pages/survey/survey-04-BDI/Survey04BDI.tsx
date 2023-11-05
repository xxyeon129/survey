// states
import { useSetRecoilState } from 'recoil';
import {
  survey03CurrentPageState,
  survey04CurrentPageState,
  survey05CurrentPageState,
} from '../common/surveyPaginationStates';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { BDI_ADDITIONAL_QUESTIONS_19, BDI_QUESTIONS, BDI_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_03_BAI_TOTAL_PAGES } from '../survey-03-BAI/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import AnswerList from '../common/components/survey-contents/answerList/AnswerList';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// types
import { SurveyContentType } from '../common/types/surveyTypes';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';
import surveyStyles from './surveyBDI.module.scss';
import { v4 as uuidv4 } from 'uuid';

export default function Survey04BDI() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey03CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey05CurrentPageState);
  const prevSurveyTotalPages = SURVEY_03_BAI_TOTAL_PAGES;
  const currentPageState = survey04CurrentPageState;
  const questions = BDI_QUESTIONS;
  const questionsPerPage = BDI_QUESTIONS_PER_PAGE;

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
      총 {BDI_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[4].TITLE}에 관한
      설문입니다.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[4].TITLE} subTitle={SURVEY_TITLE_LIST[4].SUB_TITLE} />
      {surveyExplain}

      <ul className={surveyStyles['questions-ul']}>
        {currentPageQuestions.map((question) => (
          <SurveyContent question={question} key={uuidv4()} />
        ))}
      </ul>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}

function SurveyContent(props: SurveyContentType) {
  return (
    <>
      <li className={surveyStyles['questions-li']}>
        <h2 className={surveyStyles['questions-title']}>설문 {props.question.No}</h2>
        <hr className={styles.hr} />
        <ul className={surveyStyles['answers-ul']}>
          {props.question.A &&
            props.question.A.map((answer) => (
              <AnswerList
                answer={answer}
                inputName={`${props.question.No}`}
                inputId={`${props.question.No}${answer}`}
                key={uuidv4()}
              />
            ))}
        </ul>
      </li>
      {props.question.No === 19 && (
        <li className={surveyStyles['questions-li-additional-question']}>
          <h3 className={surveyStyles['questions-title-additional-question']}>
            * {BDI_ADDITIONAL_QUESTIONS_19.Q}
          </h3>
          <ul className={surveyStyles['answers-ul-additional-question']}>
            {BDI_ADDITIONAL_QUESTIONS_19.A.map((answer) => (
              <AnswerList
                answer={answer}
                inputName={`${props.question.No}-additional`}
                inputId={`${props.question.No}${answer}`}
                key={uuidv4()}
              />
            ))}
          </ul>
        </li>
      )}
    </>
  );
}
