// components
// import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
// styles
import styles from '../common/survey.module.scss';

export default function Survey11Constipation() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[11].TITLE} subTitle={SURVEY_TITLE_LIST[11].SUB_TITLE} />

      {/* <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} /> */}
    </article>
  );
}
