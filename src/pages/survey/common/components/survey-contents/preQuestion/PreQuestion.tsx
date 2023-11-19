import { v4 as uuidv4 } from 'uuid';
import { RecoilState, useRecoilValue } from 'recoil';
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import useClickedRadioBtnChecked from 'pages/survey/common/hooks/useClickedRadioBtnChecked';
import { RespondedCheckObjectStateType } from 'pages/survey/common/types/respondedCheckObjectState.types';
import styles from './preQuestion.module.scss';
import { BsExclamationCircleFill } from 'react-icons/bs';

interface PreQuestionProps {
  question: SurveyContentObjectType;

  // for radio button checked
  clickedQuestionNumber: string;
  surveyStateKeyword: string;

  // for show not-responded question "!" icon, not-responded question number message
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;

  // for survey-01-UPDRS setting header current page 1
  isUPDRSPreQuestion?: boolean;

  // for survey-02-FG route to next survey
  routeToNextSurvey?: () => void;
}

export default function PreQuestion(props: PreQuestionProps) {
  const surveyStateKeyword = props.surveyStateKeyword;
  const clickedQuestionNumber = props.clickedQuestionNumber;

  // for survey-02-FG route to next survey
  const routeToNextSurvey = props.routeToNextSurvey;
  // for survey-01-UPDRS setting header current page 1
  const isUPDRSPreQuestion = props.isUPDRSPreQuestion;
  // for hide question right not-responded "!" icon when checked
  const respondedCheckObject = props.respondedCheckObject;

  const { responseValue, handleRadioBtnChange } = useClickedRadioBtnChecked({
    surveyStateKeyword,
    clickedQuestionNumber,
    routeToNextSurvey,
    isUPDRSPreQuestion,
    respondedCheckObject,
  });

  const respondedCheckObjectValue = useRecoilValue(props.respondedCheckObject);

  return (
    <section
      className={styles['pre-question-container']}
      id={`scroll-${props.surveyStateKeyword}-0`}
    >
      <section className={styles['pre-question-title-section']}>
        <h3
          className={
            respondedCheckObjectValue[0]
              ? styles['not-responded-pre-question-h3']
              : styles['pre-question-h3']
          }
        >
          {props.question.Q}
        </h3>
        {respondedCheckObjectValue[0] && <BsExclamationCircleFill />}
      </section>

      <ul className={styles['pre-question-radio-btn-container-ul']}>
        {props.question.A?.map((answer) => (
          <li className={styles['pre-question-radio-btn-li']} key={uuidv4()}>
            <input
              type="radio"
              id={`${props.question.No}${answer}`}
              name={`${props.question.No}`}
              value={answer}
              onChange={handleRadioBtnChange}
              checked={responseValue === answer}
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
