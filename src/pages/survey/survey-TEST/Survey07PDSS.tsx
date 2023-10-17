import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from 'pages/survey/common/survey.module.scss';

export default function Survey07PDSS() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[7].TITLE} subTitle={SURVEY[7].SUB_TITLE} />
    </article>
  );
}
