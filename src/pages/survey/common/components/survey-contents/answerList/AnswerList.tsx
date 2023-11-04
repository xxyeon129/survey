import { ExplainTextObjectType } from 'pages/survey/survey-06-NMS/survey06NMS.type';
import styles from './answerList.module.scss';

interface AnswerLiProps {
  answer: string;
  inputName: string;
  inputId: string;

  // for survey-06-NMS additional explain text
  explainTextList?: ExplainTextObjectType[];
}

export default function AnswerList(props: AnswerLiProps) {
  // for survey-06-NMS additional explain text
  const withoutNumberTargetAnswerText = props.answer.slice(3);

  return (
    <li className={styles['answer-li']}>
      <input type="radio" id={props.inputId} name={props.inputName} value={props.answer} />
      <label htmlFor={props.inputId}>
        <div className={styles['radio-button']}>
          <div className={styles['radio-button-checked-circle']} />
        </div>
        <p className={styles['answer-text']}>
          {props.answer}{' '}
          {props.explainTextList?.map(
            (explainTextObject) =>
              withoutNumberTargetAnswerText === explainTextObject.targetAnswer && (
                <p className={styles['answer-explain-text']}>{explainTextObject.explainText}</p>
              )
          )}
        </p>
      </label>
    </li>
  );
}
