import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';

export default function Survey02RBD() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[2].TITLE} />
    </article>
  );
}
