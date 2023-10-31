// components
// import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentDegreeGradation from '../common/components/survey-contents/survey-contents-degree-gradation/SurveyContent';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { PDSS_ANSWERS, PDSS_ANSWERS_01, PDSS_QUESTIONS } from './survey.const';
// styles
import styles from '../common/survey.module.scss';

export default function Survey08PDSS() {
  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[8].TITLE} subTitle={SURVEY_TITLE_LIST[8].SUB_TITLE} />

      {PDSS_QUESTIONS.map((question, index) => (
        <SurveyContentDegreeGradation
          question={question}
          answers={PDSS_ANSWERS}
          exceptionalAnswers={PDSS_ANSWERS_01}
          exceptionalNo={1}
          key={index}
        />
      ))}

      {/* <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} /> */}
    </article>
  );
}
