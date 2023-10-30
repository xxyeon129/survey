// states
import { useSetRecoilState } from 'recoil';
import {
  survey09CurrentPageState,
  survey10CurrentPageState,
  survey11CurrentPageState,
} from '../common/surveyPaginationStates';
// hooks
import usePagination from '../common/hooks/usePagination';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { SCOPA_QUESTIONS, SCOPA_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_09_TIRED_TOTAL_PAGES } from '../survey-09-TIRED/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithShortAnswers from '../common/components/survey-contents/survey-contents-with-short-answers/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// styles
import styles from '../common/survey.module.scss';

export default function Survey10SCOPA() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey09CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey11CurrentPageState);
  const prevSurveyTotalPages = SURVEY_09_TIRED_TOTAL_PAGES;
  const currentPageState = survey10CurrentPageState;
  const questions = SCOPA_QUESTIONS;
  const questionsPerPage = SCOPA_QUESTIONS_PER_PAGE;

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
      다음은 <span className={styles['explain-emphasize']}>지난 한 달 동안</span>의 자율신경계
      증상에 대한 설문지입니다. 본인의 증상을 가장 잘 설명하는 답안을 선택해주세요. 만약 이런
      증상들에 대해 약을 복용하는 것이 있다면,{' '}
      <span className={styles['explain-emphasize']}>약을 먹은 상태에서</span> 어느 정도인지를
      평가해주시기 바랍니다. 복용하는 약 이름은 마지막 페이지에 적어주세요.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[10].TITLE} subTitle={SURVEY_TITLE_LIST[10].SUB_TITLE} />
      {surveyExplain}
      <ul>
        {/* TO DO: 8~13 안내 텍스트 추가
        TO DO: 22-23 안내 텍스트 추가, 개인정보 입력 페이지 성별 체크 따라 다른 설문 내용 보여주기,
        TO DO: 마지막 질문 안내 텍스트 추가 */}

        {currentPageQuestions.map((question) => (
          <SurveyContentWithShortAnswers question={question} key={question.No} />
        ))}
      </ul>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
