// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithShortAnswers from '../common/components/survey-contents/survey-contents-with-short-answers/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// states
import { useSetRecoilState } from 'recoil';
import {
  survey10CurrentPageState,
  survey11CurrentPageState,
  survey12CurrentPageState,
} from '../common/surveyPaginationStates';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  CONSTIPATION_ANSWERS_04,
  CONSTIPATION_QUESTIONS,
  CONSTIPATION_QUESTIONS_PER_PAGE,
} from './survey.const';
import { SURVEY_10_SCOPA_TOTAL_PAGES } from '../survey-10-SCOPA/survey.const';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';

export default function Survey11Constipation() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey10CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey12CurrentPageState);
  const prevSurveyTotalPages = SURVEY_10_SCOPA_TOTAL_PAGES;
  const currentPageState = survey11CurrentPageState;
  const questions = CONSTIPATION_QUESTIONS;
  const questionsPerPage = CONSTIPATION_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  const surveyExplain = (
    <p className={styles.explain}>
      총 {CONSTIPATION_QUESTIONS.length}개의 문항으로 이루어진{' '}
      {SURVEY_TITLE_LIST[11].TITLE.slice(0, 2)}에 관한 설문입니다. <br />
      <span className={styles['explain-emphasize']}>최근 일주일</span>의 평균을 기준으로 작성해
      주십시오.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[11].TITLE} subTitle={SURVEY_TITLE_LIST[11].SUB_TITLE} />
      {surveyExplain}

      <ul>
        {currentPageQuestions.map((question) => (
          <SurveyContentWithShortAnswers
            question={question}
            imageSelectAnswersNo={4}
            imageSelectAnswersList={CONSTIPATION_ANSWERS_04}
            key={question.No}
          />
        ))}
      </ul>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
