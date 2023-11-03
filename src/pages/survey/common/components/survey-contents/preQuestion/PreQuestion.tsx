import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import styles from './preQuestion.module.scss';

interface PreQuestionProps {
  question: SurveyContentObjectType;
  onClickPreQuestionRadioBtn: (arg0: string) => void;
  defaultCheckedLabel: string;
}

export default function PreQuestion(props: PreQuestionProps) {
  return (
    <section className={styles['pre-question-container']}>
      <h3 className={styles['pre-question-h3']}>{props.question.Q}</h3>

      <ul className={styles['pre-question-radio-btn-container-ul']}>
        {props.question.A?.map((answer, index) => (
          <li className={styles['pre-question-radio-btn-li']} key={index}>
            <input
              type="radio"
              id={`${props.question.No}${answer}`}
              name={`${props.question.No}`}
              value={answer}
              defaultChecked={props.defaultCheckedLabel === answer}
              onClick={() => props.onClickPreQuestionRadioBtn(answer)}
            />
            <label htmlFor={`${props.question.No}${answer}`}>
              <div className={styles['radio-button']}>
                <div className={styles['radio-button-checked-circle']} />
              </div>
              {answer}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}