// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithScore from './components/SurveyContentWithScore';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// states
import { useSetRecoilState } from 'recoil';
import {
  survey05CurrentPageState,
  survey06CurrentPageState,
  survey07CurrentPageState,
} from '../common/surveyPaginationStates';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { NMS_QUESTIONS, NMS_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_05_RBD_TOTAL_PAGES } from '../survey-05-RBD/survey.const';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';

export default function Survey06NMS() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey05CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey07CurrentPageState);
  const prevSurveyTotalPages = SURVEY_05_RBD_TOTAL_PAGES;
  const currentPageState = survey06CurrentPageState;
  const questions = NMS_QUESTIONS;
  const questionsPerPage = NMS_QUESTIONS_PER_PAGE;

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
      총 {NMS_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[6].TITLE}에 관한
      설문입니다.
      <br />
      우측 상단의 점수는 입력하신 응답에 따라 계산된 점수입니다. 중증도와 빈도 모두 응답해 주세요.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[6].TITLE} subTitle={SURVEY_TITLE_LIST[6].SUB_TITLE} />
      {surveyExplain}

      {/* TO DO: 우측 점수칸 추가, 하단에 세션별 합계와 총합계 표시 */}
      {/* TO DO: 25번 문항의 경우 감소인지 증가인지 함께 표시 추가질문 */}
      <section className={styles['survey-content-wrapper']}>
        {currentPageQuestions.map((question, index) => (
          <SurveyContentWithScore question={question} key={index} />
        ))}
      </section>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
