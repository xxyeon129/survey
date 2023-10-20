import { SURVEY } from 'shared/constants/survey.const';
import { SCOPA_QUESTIONS } from './survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import AnswerList from '../common/components/AnswerList';
import surveyStyles from './survey03SCOPA.module.scss';

export default function Survey03SCOPA() {
  const surveyExplain = (
    <p className={styles.explain}>
      다음은 <span className={styles['explain-emphasize']}>지난 한 달 동안</span>의 자율신경계
      증상에 대한 설문지입니다. 본인의 증상을 가장 잘 설명하는 답안을 선택해주세요. 만약 이런
      증상들에 대해 약을 복용하는 것이 있다면,{' '}
      <span className={styles['explain-emphasize']}>약을 먹은 상태에서</span> 어느 정도인지를
      평가해주시기 바랍니다. 복용하는 약 이름은 마지막 페이지에 적어주세요.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[3].TITLE} subTitle={SURVEY[3].SUB_TITLE} />
      {surveyExplain}
      <ul className={surveyStyles['questions-ul']}>
        {SCOPA_QUESTIONS.map((question) => (
          <Survey02QuestionLi question={question} key={question.No} />
        ))}
      </ul>
    </article>
  );
}

interface QuestionLiProps {
  question: { No: number; Q: string; EXPLAIN?: string; A: string[] };
}

function Survey02QuestionLi(props: QuestionLiProps) {
  return (
    <li className={surveyStyles['questions-li']}>
      {/* TO DO: 도뇨관, 성 관련 설문 안내 텍스트 조건부 */}

      <hr className={styles.hr} />
      <header className={surveyStyles['questions-title']}>
        <h4>
          {props.question.No}. {props.question.Q}
        </h4>
        {props.question.EXPLAIN && (
          <span className={surveyStyles['question-title-explain']}>
            <strong>* </strong>
            {props.question.EXPLAIN}
          </span>
        )}
      </header>
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
