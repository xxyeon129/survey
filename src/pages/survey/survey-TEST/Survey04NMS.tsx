import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/SurveyTitle';
import styles from 'pages/survey/common/survey.module.scss';

export default function Survey04NMS() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[4].TITLE} subTitle={SURVEY[4].SUB_TITLE} />
    </article>
  );
}
