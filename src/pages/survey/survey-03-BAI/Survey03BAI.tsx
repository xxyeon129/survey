// import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
import { SURVEY_TITLE_LIST } from 'shared/constants/survey.const';
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import SurveyContentTable from '../common/components/survey-contents/survey-contents-table/SurveyContent';
import { BAI_ANSWERS, BAI_QUESTIONS } from './survey.const';

export default function Survey03BAI() {
  const surveyExplain = (
    <p className={styles.explain}>
      각 문장을 자세히 읽어보시고 오늘을 포함해서{' '}
      <span className={styles['explain-emphasize']}>지난 한 주 동안</span> 자신의 상태를 가장 잘
      나타낸다고 생각되는 번호에 표시하여 주십시오.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[3].TITLE} subTitle={SURVEY_TITLE_LIST[3].SUB_TITLE} />

      {surveyExplain}

      <SurveyContentTable questions={BAI_QUESTIONS} answers={BAI_ANSWERS} />
      {/* <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} /> */}
    </article>
  );
}
