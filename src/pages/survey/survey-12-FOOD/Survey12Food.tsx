// components
// import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
// styles
import styles from '../common/survey.module.scss';

export default function Survey12Food() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[12].TITLE} subTitle={SURVEY_TITLE_LIST[12].SUB_TITLE} />

      {/* TO DO: 요구사항 반영 - 질문 변경 */}

      {/* <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} /> */}
    </article>
  );
}
