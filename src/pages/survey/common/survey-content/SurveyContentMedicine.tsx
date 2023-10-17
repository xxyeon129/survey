import styles from './surveyContentMedicine.module.scss';

interface SurveyContentMedicineProps {
  questionNo: number;
  question: string;
  answers: string[];
}

export default function SurveyContentMedicine(props: SurveyContentMedicineProps) {
  // for radio button id/name distinction, "약 효과 있을/없을 때" text
  const medicineDivisionList = [
    { radioBtnKeyword: '-medicine-true', text: '있을' },
    { radioBtnKeyword: '-medicine-false', text: '없을' },
  ];

  return (
    <article className={styles['survey-content-container']}>
      <hr />
      <h3 className={styles['question']}>
        {props.questionNo}. {props.question}
      </h3>

      <div className={styles['answer-container']}>
        {medicineDivisionList.map((list, index) => (
          <div key={index}>
            <h3 className={styles['medicine-text']}>{`약 효과가 ${list.text} 때`}</h3>
            <ul className={styles['answer-ul']}>
              {props.answers.map((answer) => (
                <AnswerLi
                  answer={answer}
                  inputName={`${props.questionNo}${list.radioBtnKeyword}`}
                  inputId={`${props.questionNo}${answer}${list.radioBtnKeyword}`}
                  key={`${answer}${list.radioBtnKeyword}`}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

interface AnswerLiProps {
  answer: string;
  inputName: string;
  inputId: string;
}

function AnswerLi(props: AnswerLiProps) {
  return (
    <li className={styles['answer-li']}>
      <input type="radio" id={props.inputId} name={props.inputName} value={props.answer} />
      <label htmlFor={props.inputId}>
        <div className={styles['radio-button']}>
          <div className={styles['radio-button-checked-circle']} />
        </div>
        {props.answer}
      </label>
    </li>
  );
}
