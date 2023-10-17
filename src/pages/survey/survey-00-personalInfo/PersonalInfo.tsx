import styles from 'pages/survey/common/survey.module.scss';
import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';

export default function PersonalInfo() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[0].TITLE} subTitle={SURVEY[0].SUB_TITLE} />
    </article>
  );
}
