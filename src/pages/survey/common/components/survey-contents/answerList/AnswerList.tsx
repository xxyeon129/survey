import { RecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// hooks
import useClickedRadioBtnChecked from 'pages/survey/common/hooks/useClickedRadioBtnChecked';
// types
import { ExplainTextObjectType } from 'pages/survey/survey-06-NMS/survey06NMS.type';
import { RespondedCheckObjectStateType } from 'pages/survey/common/types/respondedCheckObjectState.types';
// styles
import styles from './answerList.module.scss';

interface AnswerLiProps {
  answer: string;
  inputName: string;
  inputId: string;

  // for radio button checked
  clickedQuestionNumber: string;
  surveyStateKeyword: string;

  // for show not-responded question "!" icon, not-responded question number message
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;

  // for survey-06-NMS additional explain text
  explainTextList?: ExplainTextObjectType[];
}

// survey-04-BDI, survey-06-NMS
// SurveyContentWithShortAnswers: survey-05-RBD, survey-10-SCOPA, survey-11-Constipation
export default function AnswerList(props: AnswerLiProps) {
  // for survey-06-NMS additional explain text
  const withoutNumberTargetAnswerText = props.answer.slice(3);

  // for radio button checked
  const surveyStateKeyword = props.surveyStateKeyword;
  const clickedQuestionNumber = props.clickedQuestionNumber;
  // for show not-responded question "!" icon, not-responded question number message
  const respondedCheckObject = props.respondedCheckObject;
  const { responseValue, handleRadioBtnChange } = useClickedRadioBtnChecked({
    surveyStateKeyword,
    clickedQuestionNumber,
    respondedCheckObject,
  });

  return (
    <li className={styles['answer-li']}>
      <input
        type="radio"
        id={props.inputId}
        name={props.inputName}
        value={props.answer}
        onChange={handleRadioBtnChange}
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
                <span className={styles['answer-explain-text']} key={uuidv4()}>
                  {explainTextObject.explainText}
                </span>
              )
          )}
        </p>
      </label>
    </li>
  );
}
