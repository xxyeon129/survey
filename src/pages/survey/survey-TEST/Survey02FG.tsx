import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/SurveyTitle';
import styles from 'pages/survey/common/survey.module.scss';

export default function Survey02FG() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[2].TITLE} subTitle={SURVEY[2].SUB_TITLE} />
    </article>
  );
}
