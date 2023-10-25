import { SurveyContentType } from 'pages/survey/common/types/surveyTypes';
import AnswerList from '../answerList/AnswerList';
import styles from 'pages/survey/common/survey.module.scss';
import contentStyles from './surveyContent.module.scss';

export default function SurveyContentWithShortAnswers(props: SurveyContentType) {
  return (
    <li className={contentStyles['questions-li']}>
      <hr className={styles.hr} />

      <header className={contentStyles['questions-title']}>
        <h4>
          {props.question.No}. {props.question.Q}
        </h4>
        {props.question.EXPLAIN && (
          <span className={contentStyles['question-title-explain']}>
            <strong>* </strong>
            {props.question.EXPLAIN}
          </span>
        )}
      </header>

      <ul className={contentStyles['answers-ul']}>
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
