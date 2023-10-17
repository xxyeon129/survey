import styles from './surveyContentMedicine.module.scss';

interface SurveyContentMedicineProps {
  questionNo: number;
  question: string;
  answers: string[];
}

export default function SurveyContentMedicine(props: SurveyContentMedicineProps) {
  return (
    <div className={styles['survey-content-container']}>
      <hr />
      <h3 className={styles['question-container']}>
        {props.questionNo}. {props.question}
      </h3>

      <div className={styles['answer-container']}>
        <div>
          <h3 className={styles['medicine-text']}>약 효과가 있을 때</h3>
          <ul>
            {props.answers.map((answer) => (
              <AnswerCheck
                answer={answer}
                medicineType={true}
                inputName={`${props.questionNo}-medicine-true`}
                inputId={`${answer}-medicine-true`}
                key={`${answer}-medicine-true`}
              />
            ))}
          </ul>
        </div>
        <div>
          <h3 className={styles['medicine-text']}>약 효과가 없을 때</h3>
          <ul>
            {props.answers.map((answer) => (
              <AnswerCheck
                answer={answer}
                medicineType={false}
                inputName={`${props.questionNo}-medicine-false`}
                inputId={`${answer}-medicine-false`}
                key={`${answer}-medicine-false`}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface AnswerCheckProps {
  answer: string;
  medicineType: boolean;
  inputName: string;
  inputId: string;
}

function AnswerCheck(props: AnswerCheckProps) {
  return (
    <li className={styles['answer-li']}>
      {props.medicineType ? (
        <>
          <input type="radio" id={props.inputId} name={props.inputName} value={props.answer} />
          <label htmlFor={props.inputId}>{props.answer}</label>
        </>
      ) : (
        <>
          <input type="radio" id={props.inputId} name={props.inputName} value={props.answer} />
          <label htmlFor={props.inputId}>{props.answer}</label>
        </>
      )}
      <div className={styles['radio-button']}>
        <div className={styles['radio-button-checked-circle']} />
      </div>
    </li>
  );
}
