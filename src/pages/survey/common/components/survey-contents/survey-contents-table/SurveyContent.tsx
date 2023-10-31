import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import styles from './surveyContent.module.scss';

interface SurveyContentTableProps {
  questions: SurveyContentObjectType[];
  answers: string[];
  radioBtnValues: number[];

  additionalCheckQuestionNo?: number;
  additionalCheckQuestion?: string;
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
                {question.No}. {question.Q}
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
                    <div className={styles['radio-button']}>
                      <div className={styles['radio-button-checked-circle']} />
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
