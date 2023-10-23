// import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
import { SURVEY_TITLE_LIST } from 'shared/constants/survey.const';
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';

export default function Survey07PDQ() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[7].TITLE} subTitle={SURVEY_TITLE_LIST[7].SUB_TITLE} />

      {/* <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} /> */}
    </article>
  );
}
