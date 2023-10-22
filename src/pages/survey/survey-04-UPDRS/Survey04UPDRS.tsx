import { SURVEY } from 'shared/constants/survey.const';
import { UPDRS_QUESTIONS, UPDRS_QUESTIONS_PER_PAGE } from './survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import surveyStyles from './survey04UPDRS.module.scss';
import { useSetRecoilState } from 'recoil';
import {
  survey03CurrentPageState,
  survey04CurrentPageState,
  survey05CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey03TotalPages } from '../survey-03-SCOPA/survey.const';
import usePagination from '../common/hooks/usePagination';

export default function Survey04UPDRS() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey03CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey05CurrentPageState);
  const prevSurveyTotalPages = survey03TotalPages;
  const currentPageState = survey04CurrentPageState;
  const questions = UPDRS_QUESTIONS;
  const questionsPerPage = UPDRS_QUESTIONS_PER_PAGE;

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
      <SurveyTitle title={SURVEY[4].TITLE} subTitle={SURVEY[4].SUB_TITLE} />

      {currentPageQuestions.map((question) => (
        <SurveyContent question={question} key={question.No} />
      ))}

      <button onClick={handlePrevPage}>이전</button>
      <button onClick={handleNextPage}>다음</button>
    </article>
  );
}

interface SurveyContentProps {
  question: { No: number; Q?: string; EXPLAIN?: string; A: string[] };
}

function SurveyContent(props: SurveyContentProps) {
  const medicineDivisionList = [
    { radioBtnKeyword: '-medicine-true', text: '있을' },
    { radioBtnKeyword: '-medicine-false', text: '없을' },
  ];

  return (
    <article className={surveyStyles['survey-content-container']}>
      <hr />
      <h3 className={surveyStyles['question']}>
        {props.question.No}. {props.question.Q}
      </h3>

      <div className={surveyStyles['answer-container']}>
        {medicineDivisionList.map((list, index) => (
          <div key={index}>
            <h3 className={surveyStyles['medicine-text']}>{`약 효과가 ${list.text} 때`}</h3>
            <ul className={surveyStyles['answer-ul']}>
              {props.question.A.map((answer) => (
                <AnswerLi
                  answer={answer}
                  inputName={`${props.question.No}${list.radioBtnKeyword}`}
                  inputId={`${props.question.No}${answer}${list.radioBtnKeyword}`}
                  key={`${answer}${list.radioBtnKeyword}`}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

interface AnswerLiProps {
  answer: string;
  inputName: string;
  inputId: string;
}

function AnswerLi(props: AnswerLiProps) {
  return (
    <li className={surveyStyles['answer-li']}>
      <input type="radio" id={props.inputId} name={props.inputName} value={props.answer} />
      <label htmlFor={props.inputId}>
        <div className={surveyStyles['radio-button']}>
          <div className={surveyStyles['radio-button-checked-circle']} />
        </div>
        {props.answer}
      </label>
    </li>
  );
}
