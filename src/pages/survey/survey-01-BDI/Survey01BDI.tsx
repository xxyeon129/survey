// states, hook
import { useSetRecoilState } from 'recoil';
import {
  survey01CurrentPageState,
  survey02CurrentPageState,
} from '../common/surveyPaginationStates';
import usePagination from '../common/hooks/usePagination';
// constants
import { SURVEY } from 'shared/constants/survey.const';
import { BDI_QUESTIONS, BDI_QUESTIONS_PER_PAGE } from './survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import AnswerList from '../common/components/survey-contents/AnswerList';
// styles
import styles from '../common/survey.module.scss';
import surveyStyles from './surveyBDI.module.scss';

export default function Survey01BDI() {
  // pagination hook props
  const setNextSurveyPage = useSetRecoilState(survey02CurrentPageState);
  const personalInfoPageCount = 1;
  const prevSurveyTotalPages = personalInfoPageCount;
  const currentPageState = survey01CurrentPageState;
  const questions = BDI_QUESTIONS;
  const questionsPerPage = BDI_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[1].TITLE} subTitle={SURVEY[1].SUB_TITLE} />
      <ul className={surveyStyles['questions-ul']}>
        {currentPageQuestions.map((question) => (
          <Survey01QuestionLi question={question} key={question.No} />
        ))}
      </ul>

      <button onClick={handlePrevPage}>이전</button>
      <button onClick={handleNextPage}>다음</button>
    </article>
  );
}

interface QuestionLiProps {
  question: { No: number; A: string[] };
}

function Survey01QuestionLi(props: QuestionLiProps) {
  return (
    <li className={surveyStyles['questions-li']}>
      <h2 className={surveyStyles['questions-title']}>설문 {props.question.No}</h2>
      <hr className={styles.hr} />
      <ul className={surveyStyles['answers-ul']}>
        {props.question.A.map((answer) => (
          <AnswerList
            answer={answer}
            inputName={`${props.question.No}`}
            inputId={`${props.question.No}${answer}`}
            key={`${props.question.No}${answer}`}
          />
        ))}
      </ul>
    </li>
  );
}
