import { SURVEY } from 'shared/constants/survey.const';
import { FG_QUESTIONS, FG_QUESTIONS_PER_PAGE, survey05TotalPages } from './survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import surveyStyles from './survey05FG.module.scss';
import { useSetRecoilState } from 'recoil';
import {
  survey04CurrentPageState,
  survey05CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey04TotalPages } from '../survey-04-UPDRS/survey.const';
import usePagination from '../common/hooks/usePagination';

export default function Survey05FG() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey04CurrentPageState);
  const prevSurveyTotalPages = survey04TotalPages;
  const currentPageState = survey05CurrentPageState;
  const questions = FG_QUESTIONS;
  const questionsPerPage = FG_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[5].TITLE} subTitle={SURVEY[5].SUB_TITLE} />

      {currentPageQuestions.map((question) => (
        <SurveyContent question={question} key={question.No} />
      ))}

      <button onClick={handlePrevPage}>이전</button>
      <button onClick={handleNextPage} disabled={+currentPageState === survey05TotalPages}>
        다음
      </button>
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
