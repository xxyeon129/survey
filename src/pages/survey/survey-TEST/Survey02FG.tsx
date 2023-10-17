import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from 'pages/survey/common/survey.module.scss';
import SurveyContentMedicine from 'pages/survey/common/survey-content/SurveyContentMedicine';

export default function Survey02FG() {
  const questionList = SURVEY[2].QUESTIONS;
  const questionTitle = Object.values(questionList).map((question) => question.Q);
  const questionAnswers = Object.values(questionList).map((question) => Object.values(question.A));

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle
        title={SURVEY[2].TITLE}
        subTitle={SURVEY[2].SUB_TITLE}
        explain={SURVEY[2].EXPLAIN}
      />
      {questionTitle.map((question, index) => (
        <SurveyContentMedicine
          questionNo={index + 1}
          question={question}
          answers={questionAnswers[index]}
          key={index}
        />
      ))}
    </article>
  );
}
