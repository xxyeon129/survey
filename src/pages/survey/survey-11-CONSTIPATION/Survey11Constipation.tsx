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

      {/* TO DO: survey.const.ts 이미지 추가
          TO DO: 이미지 선택인 4번 문항의 경우 이미지를 해당 문항에 위치해서 클릭하도록 표시
      */}

      {/* <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} /> */}
    </article>
  );
}
