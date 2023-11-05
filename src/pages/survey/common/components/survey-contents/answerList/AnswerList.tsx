import { ExplainTextObjectType } from 'pages/survey/survey-06-NMS/survey06NMS.type';
import styles from './answerList.module.scss';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { useRecoilState } from 'recoil';

interface AnswerLiProps {
  answer: string;
  inputName: string;
  inputId: string;

  // for radio button checked
  clickedQuestionNumber?: string;
  surveyStateKeyword?: string;

  // for survey-06-NMS additional explain text
  explainTextList?: ExplainTextObjectType[];
}

// survey-04-BDI, survey-06-NMS
// SurveyContentWithShortAnswers: survey-05-RBD, survey-10-SCOPA, survey-11-Constipation
export default function AnswerList(props: AnswerLiProps) {
  // for survey-06-NMS additional explain text
  const withoutNumberTargetAnswerText = props.answer.slice(3);
  const [responseValue, setResponseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.clickedQuestionNumber}`)
  );

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectValue = e.target.value;
    setResponseValue(selectValue);
  };

  return (
    <li className={styles['answer-li']}>
      <input
        type="radio"
        id={props.inputId}
        name={props.inputName}
        value={props.answer}
        onChange={handleRadioChange}
        checked={responseValue === props.answer}
      />
      <label htmlFor={props.inputId}>
        <div className={styles['radio-button']}>
          <div className={styles['radio-button-checked-circle']} />
        </div>
        <p className={styles['answer-text']}>
          {props.answer}{' '}
          {props.explainTextList?.map(
            (explainTextObject) =>
              withoutNumberTargetAnswerText === explainTextObject.targetAnswer && (
                <span className={styles['answer-explain-text']}>
                  {explainTextObject.explainText}
                </span>
              )
          )}
        </p>
      </label>
    </li>
  );
}
