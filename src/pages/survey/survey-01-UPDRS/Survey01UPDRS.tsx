import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from 'pages/survey/common/survey.module.scss';
import useQnAList from '../common/hooks/useQnAList';
import SurveyContentMedicine from '../common/survey-content/SurveyContentMedicine';

export default function Survey01UPDRS() {
  const questionList = SURVEY[1].QUESTIONS;
  const { questionTitle, questionAnswers } = useQnAList(questionList);

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[1].TITLE} subTitle={SURVEY[1].SUB_TITLE} />
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
