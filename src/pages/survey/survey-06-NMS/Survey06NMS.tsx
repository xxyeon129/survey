// components
// import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
// styles
import styles from '../common/survey.module.scss';

export default function Survey06NMS() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[6].TITLE} subTitle={SURVEY_TITLE_LIST[6].SUB_TITLE} />

      {/* TO DO: 우측 점수칸 추가, 하단에 세션별 합계와 총합계 표시 */}
      {/* TO DO: 25번 문항의 경우 감소인지 증가인지 함께 표시 추가질문 */}

      {/* <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} /> */}
    </article>
  );
}
