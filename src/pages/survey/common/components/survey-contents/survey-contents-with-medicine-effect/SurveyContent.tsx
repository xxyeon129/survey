import AnswerList from '../answerList/AnswerList';
import { SurveyContentType } from 'pages/survey/common/types/surveyTypes';
import { medicineDivisionList } from './surveyContent.const';
import styles from './surveyContent.module.scss';

export default function SurveyContentWithMedicineEffect(props: SurveyContentType) {
  return (
    <article className={styles['survey-content-container']}>
      <hr />
      <h3 className={styles['question']}>
        {props.question.No}. {props.question.Q}
      </h3>

      <div className={styles['answer-container']}>
        {medicineDivisionList.map((list, index) => (
          <div key={index}>
            <h3 className={styles['medicine-text']}>
              파킨슨병 약의 효과가{' '}
              <span className={styles['medicine-text-emphasize']}>{list.text}</span> 때 아래 설문에
              답변해 주세요.
            </h3>
            <ul className={styles['answer-ul']}>
              {props.question.A?.map((answer) => (
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
