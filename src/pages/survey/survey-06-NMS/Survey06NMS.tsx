// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithScore from './components/SurveyContentWithScore';
// states
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  survey05CurrentPageState,
  survey06CurrentPageState,
  survey07CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey06NMS_responseSelector } from './survey06NMS.selector';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { NMS_QUESTIONS, NMS_QUESTIONS_PER_PAGE, SURVEY_06_NMS_STATE_KEYWORD } from './survey.const';
import { SURVEY_05_RBD_TOTAL_PAGES } from '../survey-05-RBD/survey.const';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';
import { v4 as uuidv4 } from 'uuid';

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

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey06NMS_responseSelector);

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

      {/* TO DO: 25번 문항의 경우 감소인지 증가인지 함께 표시 추가질문 */}
      <section className={styles['survey-content-wrapper']}>
        {currentPageQuestions.map((question) => (
          <SurveyContentWithScore
            question={question}
            surveyStateKeyword={SURVEY_06_NMS_STATE_KEYWORD}
            lastQuestionNumber={NMS_QUESTIONS.length}
            // for bottom prev/next button
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            // for bottom next button disabled
            currentPageFirstQuestionNumber={currentPageQuestions[0].No}
            currentPageLastQuestionNumber={currentPageQuestions[currentPageQuestions.length - 1].No}
            responseStateList={responseStateList}
            key={uuidv4()}
          />
        ))}
      </section>
    </article>
  );
}
