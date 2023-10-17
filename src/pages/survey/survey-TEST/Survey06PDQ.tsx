import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from 'pages/survey/common/survey.module.scss';

export default function Survey06PDQ() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[6].TITLE} />
    </article>
  );
}
