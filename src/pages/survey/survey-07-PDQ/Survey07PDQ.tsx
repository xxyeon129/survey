// components
// import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
// styles
import styles from '../common/survey.module.scss';

export default function Survey07PDQ() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[7].TITLE} subTitle={SURVEY_TITLE_LIST[7].SUB_TITLE} />

      {/* TO DO: 28번 문항의 경우 추가 체크 문항 존재 */}

      {/* <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} /> */}
    </article>
  );
}
