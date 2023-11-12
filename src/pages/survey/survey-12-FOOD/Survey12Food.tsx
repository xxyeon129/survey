// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentTable from '../common/components/survey-contents/survey-contents-table/SurveyContent';
// states
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  survey11CurrentPageState,
  survey12CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey12Food_responseSelector } from './survey12Food.selector';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  FOOD_ANSWERS,
  FOOD_QUESTIONS,
  FOOD_QUESTIONS_PER_PAGE,
  SURVEY_12_FOOD_STATE_ANSWERS,
  SURVEY_12_FOOD_STATE_KEYWORD,
} from './survey.const';
import { SURVEY_11_CONSTIPATION_TOTAL_PAGES } from '../survey-11-CONSTIPATION/survey.const';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';

export default function Survey12Food() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey11CurrentPageState);
  const prevSurveyTotalPages = SURVEY_11_CONSTIPATION_TOTAL_PAGES;
  const currentPageState = survey12CurrentPageState;
  const questions = FOOD_QUESTIONS;
  const questionsPerPage = FOOD_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey12Food_responseSelector);

  const surveyExplain = (
    <p className={styles.explain}>
      총 {FOOD_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[12].TITLE}에 관한
      설문입니다. <br />
      <span className={styles['explain-emphasize']}>평소 식사 습관에서 섭취하는 음식</span>을 체크해
      주십시오.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[12].TITLE} subTitle={SURVEY_TITLE_LIST[12].SUB_TITLE} />
      {surveyExplain}

      <section className={styles['survey-content-wrapper']}>
        <SurveyContentTable
          questions={currentPageQuestions}
          answers={FOOD_ANSWERS}
          radioBtnValues={SURVEY_12_FOOD_STATE_ANSWERS}
          surveyStateKeyword={SURVEY_12_FOOD_STATE_KEYWORD}
          questionExplain={true}
          nonGradationStyle={true}
          // for bottom prev/next button
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          // for bottom next button disabled
          currentPageFirstQuestionNumber={currentPageQuestions[0].No}
          currentPageLastQuestionNumber={currentPageQuestions[currentPageQuestions.length - 1].No}
          responseStateList={responseStateList}
        />
      </section>
    </article>
  );
}
