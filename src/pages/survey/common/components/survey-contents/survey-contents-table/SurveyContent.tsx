import styles from './surveyContent.module.scss';

interface SurveyContentTableProps {
  questions: { No: number; Q: string }[];
  answers: string[];
}

export default function SurveyContentTable(props: SurveyContentTableProps) {
  const radioBtnValues = [0, 1, 2, 3];

  const answersHeaderCell = props.answers.map((answerText) => (
    <th key={answerText}>{answerText}</th>
  ));

  return (
    <article className={styles['survey-content-container']}>
      <table>
        <tr className={styles['answers-tr']}>
          <th></th>
          {answersHeaderCell}
        </tr>
        <tbody>
          {props.questions.map((question) => (
            <tr key={question.No} className={styles['question-container']}>
              <th className={styles['question-th']}>
                {question.No}. {question.Q}
              </th>
              {radioBtnValues.map((radioBtnValue) => (
                <td className={styles['question-td-radio-button-container']}>
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
