import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/SurveyTitle';
import styles from 'pages/survey/common/survey.module.scss';

export default function SurveyUPDRS() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[1].TITLE} subTitle={SURVEY[1].SUB_TITLE} />
    </article>
  );
}
