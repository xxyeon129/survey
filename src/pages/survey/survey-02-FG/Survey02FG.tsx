// states, hook
import { useSetRecoilState } from 'recoil';
import {
  survey01CurrentPageState,
  survey02CurrentPageState,
  survey03CurrentPageState,
} from '../common/surveyPaginationStates';
import usePagination from '../common/hooks/usePagination';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { FG_QUESTIONS, FG_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_01_UPDRS_TOTAL_PAGES } from '../survey-01-UPDRS/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithMedicineEffect from '../common/components/survey-contents/survey-contents-with-medicine-effect/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// styles
import styles from '../common/survey.module.scss';

export default function Survey02FG() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey01CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey03CurrentPageState);
  const prevSurveyTotalPages = SURVEY_01_UPDRS_TOTAL_PAGES;
  const currentPageState = survey02CurrentPageState;
  const questions = FG_QUESTIONS;
  const questionsPerPage = FG_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[2].TITLE} subTitle={SURVEY_TITLE_LIST[2].SUB_TITLE} />

      {/* TO DO: 시작 시 질문 추가
        없다 응답 -> 다음 설문지(BAI, 벡 불안척도)로 이동
        있다 응답 -> 질문으로 이동 */}

      {/* TO DO: 01-UPDRS 파킨슨병 약을 복용 중이신가요? 질문 상태에 따라 구분
          복용하지 않는다 -> 질문만 표시
          복용 중이다 -> 약 효과 있을 경우, 없을 경우 구분
      */}
      {currentPageQuestions.map((question) => (
        <SurveyContentWithMedicineEffect question={question} key={question.No} />
      ))}

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
