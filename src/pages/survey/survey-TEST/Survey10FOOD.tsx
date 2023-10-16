import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/SurveyTitle';
import styles from 'pages/survey/common/survey.module.scss';

export default function Survey10FOOD() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[10].TITLE} />
    </article>
  );
}
