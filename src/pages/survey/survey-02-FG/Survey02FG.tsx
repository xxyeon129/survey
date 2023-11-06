// states
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  survey01CurrentPageState,
  survey02CurrentPageState,
  survey03CurrentPageState,
} from '../common/surveyPaginationStates';
import { haveFGSymptomState } from './Survey02FG.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  FG_PRE_QUESTION,
  FG_QUESTIONS,
  FG_QUESTIONS_PER_PAGE,
  HAVE_FG_SYMPTOM,
  HAVE_NO_FG_SYMPTOM,
  SURVEY_02_FG_STATE_KEYWORD,
} from './survey.const';
import { SURVEY_01_UPDRS_TOTAL_PAGES } from '../survey-01-UPDRS/survey.const';
import { PATH_URL } from 'common/constants/path.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import PreQuestion from '../common/components/survey-contents/preQuestion/PreQuestion';
import SurveyContentWithMedicineEffect from '../common/components/survey-contents/survey-contents-with-medicine-effect/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// hooks
import usePagination from '../common/hooks/usePagination';
import useRouteToNextSurvey from './hooks/useRouteToNextSurvey';
// styles
import styles from '../common/survey.module.scss';
import { v4 as uuidv4 } from 'uuid';

export default function Survey02FG() {
  // for pre-question check
  const [haveFGSymptom, setHaveFGSymptom] = useRecoilState(haveFGSymptomState);

  // for route to next survey when click bottom next button in condition answered "없음" to pre-question
  const currentSurveyIndex = 2;
  const nextSurveyPath = PATH_URL.SURVEY['03_BAI'];
  const routeToNextSurvey = useRouteToNextSurvey({
    currentSurveyIndex,
    nextSurveyPath,
  });

  // for answer pre-question
  const onClickPreQuestionRadioBtn = (clickedRadioBtnLabel: string) => {
    if (clickedRadioBtnLabel === HAVE_NO_FG_SYMPTOM) {
      setHaveFGSymptom(HAVE_NO_FG_SYMPTOM);
      routeToNextSurvey();
    } else if (clickedRadioBtnLabel === HAVE_FG_SYMPTOM) {
      setHaveFGSymptom(HAVE_FG_SYMPTOM);
    }
  };

  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey01CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey03CurrentPageState);
  const prevSurveyTotalPages = SURVEY_01_UPDRS_TOTAL_PAGES;
  const currentPageState = survey02CurrentPageState;
  const questions = FG_QUESTIONS;
  const questionsPerPage = FG_QUESTIONS_PER_PAGE;
  // for route to next survey when click bottom next button in condition answered "없음" to pre-question
  const conditionToRouteNextSurvey = haveFGSymptom === HAVE_NO_FG_SYMPTOM;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
    conditionToRouteNextSurvey,
    routeToNextSurvey,
  });

  const surveyExplain = (
    <p className={styles.explain}>
      총 {FG_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[2].TITLE.slice(0, 4)}에 관한
      설문입니다.
      <br />
      이전 &lt;{SURVEY_TITLE_LIST[1].TITLE}&gt; 설문에서 응답하신 파킨슨병 약 복용 여부에 따라
      설문의 구성이 달라집니다.
      <br />
      하단의 보행 문제 질문에서 '없다'로 응답하실 경우 다음 설문지로 이동되고, '있다'로 응답하실
      경우 설문 내용이 표시됩니다.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[2].TITLE} subTitle={SURVEY_TITLE_LIST[2].SUB_TITLE} />
      {surveyExplain}

      {/* for pre-question */}
      <PreQuestion
        question={FG_PRE_QUESTION}
        onClickPreQuestionRadioBtn={onClickPreQuestionRadioBtn}
        defaultCheckedLabel={haveFGSymptom}
      />

      {/* for display questions only when answered "있다" in pre-question */}
      {haveFGSymptom === HAVE_FG_SYMPTOM && (
        <>
          {currentPageQuestions.map((question) => (
            <SurveyContentWithMedicineEffect
              question={question}
              surveyStateKeyword={SURVEY_02_FG_STATE_KEYWORD}
              key={uuidv4()}
            />
          ))}
        </>
      )}

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
