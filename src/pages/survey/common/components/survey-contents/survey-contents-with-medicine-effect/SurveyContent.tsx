import { SurveyContentType } from 'pages/survey/common/types/surveyTypes';
import AnswerList from '../AnswerList';
import styles from './surveyContent.module.scss';

export default function SurveyContentWithMedicineEffect(props: SurveyContentType) {
  const medicineDivisionList = [
    { radioBtnKeyword: '-medicine-true', text: '있을' },
    { radioBtnKeyword: '-medicine-false', text: '없을' },
  ];

  return (
    <article className={styles['survey-content-container']}>
      <hr />
      <h3 className={styles['question']}>
        {props.question.No}. {props.question.Q}
      </h3>

      <div className={styles['answer-container']}>
        {medicineDivisionList.map((list, index) => (
          <div key={index}>
            <h3 className={styles['medicine-text']}>{`약 효과가 ${list.text} 때`}</h3>
            <ul className={styles['answer-ul']}>
              {props.question.A.map((answer) => (
                <AnswerList
                  answer={answer}
                  inputName={`${props.question.No}${list.radioBtnKeyword}`}
                  inputId={`${props.question.No}${answer}${list.radioBtnKeyword}`}
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
