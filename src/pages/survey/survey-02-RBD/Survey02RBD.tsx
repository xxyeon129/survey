// states, hook
import { useSetRecoilState } from 'recoil';
import {
  survey01CurrentPageState,
  survey03CurrentPageState,
} from '../common/surveyPaginationStates';
import usePagination from '../common/hooks/usePagination';
// constants
import { SURVEY } from 'shared/constants/survey.const';
import { RBD_QUESTIONS, RBD_QUESTIONS_PER_PAGE } from './survey.const';
import { survey01TotalPages } from '../survey-01-BDI/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import AnswerList from '../common/components/survey-contents/AnswerList';
// styles
import styles from '../common/survey.module.scss';
import surveyStyles from './survey02RBD.module.scss';

export default function Survey02RBD() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey01CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey03CurrentPageState);
  const prevSurveyTotalPages = survey01TotalPages;
  const currentPageState = survey03CurrentPageState;
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

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[2].TITLE} />
      <ul className={surveyStyles['questions-ul']}>
        {currentPageQuestions.map((question) => (
          <Survey02QuestionLi question={question} key={question.No} />
        ))}
      </ul>

      <button onClick={handlePrevPage}>이전</button>
      <button onClick={handleNextPage}>다음</button>
    </article>
  );
}

interface QuestionLiProps {
  question: { No: number; Q?: string; EXPLAIN?: string; A: string[] };
}

function Survey02QuestionLi(props: QuestionLiProps) {
  return (
    <li className={surveyStyles['questions-li']}>
      <hr className={styles.hr} />
      <header className={surveyStyles['questions-title']}>
        <h4>
          {props.question.No}. {props.question.Q}
        </h4>
        {props.question.EXPLAIN && (
          <span className={surveyStyles['question-title-explain']}>
            <strong>* </strong>
            {props.question.EXPLAIN}
          </span>
        )}
      </header>
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
