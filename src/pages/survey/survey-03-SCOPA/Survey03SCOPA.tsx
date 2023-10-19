import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';

export default function Survey03SCOPA() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[3].TITLE} subTitle={SURVEY[3].SUB_TITLE} />
    </article>
  );
}
