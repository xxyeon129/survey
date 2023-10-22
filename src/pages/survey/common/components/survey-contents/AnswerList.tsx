import styles from './answerList.module.scss';

interface AnswerLiProps {
  answer: string;
  inputName: string;
  inputId: string;
}

export default function AnswerList(props: AnswerLiProps) {
  return (
    <li className={styles['answer-li']}>
      <input type="radio" id={props.inputId} name={props.inputName} value={props.answer} />
      <label htmlFor={props.inputId}>
        <div className={styles['radio-button']}>
          <div className={styles['radio-button-checked-circle']} />
        </div>
        {props.answer}
      </label>
    </li>
  );
}
