import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/SurveyTitle';
import styles from 'pages/survey/common/survey.module.scss';

export default function Survey09NPI() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[9].TITLE} subTitle={SURVEY[9].SUB_TITLE} />
    </article>
  );
}
