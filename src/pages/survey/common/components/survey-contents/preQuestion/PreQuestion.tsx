import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import useClickedRadioBtnChecked from 'pages/survey/common/hooks/useClickedRadioBtnChecked';
import styles from './preQuestion.module.scss';
import { v4 as uuidv4 } from 'uuid';

interface PreQuestionProps {
  question: SurveyContentObjectType;

  // for radio button checked
  clickedQuestionNumber: string;
  surveyStateKeyword: string;

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

  const { responseValue, handleRadioBtnChange } = useClickedRadioBtnChecked({
    surveyStateKeyword,
    clickedQuestionNumber,
    routeToNextSurvey,
    isUPDRSPreQuestion,
  });

  return (
    <section className={styles['pre-question-container']}>
      <h3 className={styles['pre-question-h3']}>{props.question.Q}</h3>

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
