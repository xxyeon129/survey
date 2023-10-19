import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import surveyStyles from './surveyBDI.module.scss';
import { BDI_QUESTIONS } from './survey.const';
import AnswerList from '../common/components/AnswerList';

export default function Survey01BDI() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[1].TITLE} subTitle={SURVEY[1].SUB_TITLE} />
      <ul className={surveyStyles['questions-ul']}>
        {BDI_QUESTIONS.map((question) => (
          <Survey01QuestionLi question={question} key={question.No} />
        ))}
      </ul>
    </article>
  );
}

interface QuestionLiProps {
  question: { No: number; A: string[] };
}

function Survey01QuestionLi(props: QuestionLiProps) {
  return (
    <li className={surveyStyles['questions-li']}>
      <h2 className={surveyStyles['questions-title']}>설문 {props.question.No}</h2>
      <hr className={styles.hr} />
      <ul className={surveyStyles['answers-ul']}>
        {props.question.A.map((answer) => (
          <AnswerList
            answer={answer}
            inputName={`${props.question.No}`}
            inputId={`${props.question.No}${answer}`}
            key={`${props.question.No}${answer}`}
          />
        ))}
      </ul>
    </li>
  );
}
