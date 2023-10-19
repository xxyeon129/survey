import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import { RBD_QUESTIONS } from './survey.const';
import AnswerList from '../common/components/AnswerList';
import surveyStyles from './survey02RBD.module.scss';

export default function Survey02RBD() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[2].TITLE} />
      <ul className={surveyStyles['questions-ul']}>
        {RBD_QUESTIONS.map((question) => (
          <Survey02QuestionLi question={question} key={question.No} />
        ))}
      </ul>
    </article>
  );
}

interface QuestionLiProps {
  question: { No: number; Q: string; EXPLAIN?: string; A: string[] };
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
