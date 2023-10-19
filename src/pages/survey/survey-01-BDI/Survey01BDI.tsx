import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';

export default function Survey01BDI() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[1].TITLE} subTitle={SURVEY[1].SUB_TITLE} />
    </article>
  );
}
