import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import styles from './surveyContent.module.scss';
import { v4 as uuidv4 } from 'uuid';

interface SurveyContentDegreeGradationProps {
  question: SurveyContentObjectType;
  answers: string[];
  exceptionalAnswers?: string[];
  exceptionalNo?: number;
}

// survey-08-PDSS
export default function SurveyContentDegreeGradation(props: SurveyContentDegreeGradationProps) {
  const degreesList = Array.from({ length: 11 }, (_, index) => index);

  return (
    <article className={styles['survey-content-container']}>
      <h3 className={styles['question-h3']}>
        {props.question.No}. {props.question.Q}
      </h3>
      <ul className={styles['degrees-container-ul']}>
        {degreesList.map((degree) => (
          <li className={styles['degree-container-li']} key={uuidv4()}>
            <label className={styles['degree-li-label']}>
              <span className={styles['degree-number']}>{degree}</span>
              <input
                type="radio"
                name={`${props.question.No}`}
                id={`${props.question.No}${degree}`}
                value={`${props.question.No}${degree}`}
              />
            </label>

            {/* for bottom degree explain text */}
            {props.exceptionalNo &&
            props.question.No === props.exceptionalNo &&
            props.exceptionalAnswers ? (
              <>
                {/* for exceptional text -> exceptionalAnswers list */}
                {degree === 0 && (
                  <p className={styles['zero-degree-bottom-text']}>{props.exceptionalAnswers[0]}</p>
                )}
                {degree === 5 && (
                  <p className={styles['middle-degree-bottom-text']}>
                    {props.exceptionalAnswers[1]}
                  </p>
                )}
                {degree === 10 && (
                  <p className={styles['last-degree-bottom-text']}>{props.exceptionalAnswers[2]}</p>
                )}
              </>
            ) : (
              <>
                {/* for non-exceptional text -> answers list */}
                {degree === 0 && (
                  <p className={styles['zero-degree-bottom-text']}>{props.answers[0]}</p>
                )}
                {degree === 5 && (
                  <p className={styles['middle-degree-bottom-text']}>{props.answers[1]}</p>
                )}
                {degree === 10 && (
                  <p className={styles['last-degree-bottom-text']}>{props.answers[2]}</p>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <hr className={styles['bottom-hr']} />
    </article>
  );
}
