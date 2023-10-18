import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import SurveyContentMedicine from '../common/survey-content/SurveyContentMedicine';
import useQnAList from '../common/hooks/useQnAList';

export default function Survey02FG() {
  const questionList = SURVEY[2].QUESTIONS;
  const { questions, answers } = useQnAList(questionList);

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle
        title={SURVEY[2].TITLE}
        subTitle={SURVEY[2].SUB_TITLE}
        explain={SURVEY[2].EXPLAIN}
      />
      {questions.map((question, index) => (
        <SurveyContentMedicine
          questionNo={index + 1}
          question={question}
          answers={answers[index]}
          key={index}
        />
      ))}
    </article>
  );
}
