import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import styles from './surveyContent.module.scss';

interface SurveyContentTableProps {
  questions: SurveyContentObjectType[];
  answers: string[];
  radioBtnValues: number[];

  // for survey-07-PDQ
  additionalCheckQuestionNo?: number;
  additionalCheckQuestion?: string;
  // for survey-12-FOOD
  questionExplain?: boolean;
  nonGradationStyle?: boolean;
}

export default function SurveyContentTable(props: SurveyContentTableProps) {
  const answersHeaderCell = props.answers.map((answerText) => (
    <th key={answerText} className={styles['answers-table-header-text']}>
      {answerText}
    </th>
  ));

  return (
    <article className={styles['survey-content-container']}>
      <table>
        <thead>
          <tr className={styles['answers-table-row']}>
            <th></th>
            {answersHeaderCell}
          </tr>
        </thead>

        <tbody>
          {props.questions.map((question) => (
            <tr key={question.No} className={styles['questions-table-row']}>
              {/* question */}
              <th className={styles['questions-table-header-text']}>
                <p className={styles['questions-table-header-text-p']}>
                  {question.No}. {question.Q}
                  {/* for question explain text */}
                  {props.questionExplain && (
                    <p className={styles['question-table-header-text-explain']}>
                      {question.EXPLAIN && `(${question.EXPLAIN})`}
                    </p>
                  )}
                </p>

                {/* for additional question */}
                {props.additionalCheckQuestionNo &&
                  props.additionalCheckQuestionNo === question.No && (
                    <label className={styles['additional-question']} htmlFor="additional-question">
                      * {props.additionalCheckQuestion}{' '}
                      <input
                        className={styles['additional-question-input']}
                        type="radio"
                        name={`${question.No}`}
                        id="additional-question"
                      />
                    </label>
                  )}
              </th>
              {/* radio buttons */}
              {props.radioBtnValues.map((radioBtnValue, index) => (
                <td className={styles['question-td-radio-button-container']} key={index}>
                  <input
                    type="radio"
                    id={`${question.No}${radioBtnValue}`}
                    name={`${question.No}`}
                    value={radioBtnValue}
                  />
                  <label htmlFor={`${question.No}${radioBtnValue}`}>
                    <div
                      className={
                        props.nonGradationStyle
                          ? styles['non-gradtion-radio-button']
                          : styles['radio-button']
                      }
                    >
                      <div
                        className={
                          props.nonGradationStyle
                            ? styles['non-radio-button-checked-circle']
                            : styles['radio-button-checked-circle']
                        }
                      />
                    </div>
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
