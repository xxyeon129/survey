// states
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  survey01CurrentPageState,
  survey02CurrentPageState,
} from '../common/surveyPaginationStates';
import { takeMedicineState } from './survey01UPDRS.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  NOT_TAKE_MEDICINE,
  TAKE_MEDICINE,
  UPDRS_PRE_QUESTION,
  UPDRS_QUESTIONS,
  UPDRS_QUESTIONS_PER_PAGE,
} from './survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import PreQuestion from '../common/components/survey-contents/preQuestion/PreQuestion';
import SurveyContentWithMedicineEffect from '../common/components/survey-contents/survey-contents-with-medicine-effect/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';

export default function Survey01UPDRS() {
  // pagination hook props
  const setNextSurveyPage = useSetRecoilState(survey02CurrentPageState);
  const prevSurveyTotalPages = 0;
  const currentPageState = survey01CurrentPageState;
  const questions = UPDRS_QUESTIONS;
  const questionsPerPage = UPDRS_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  const surveyExplain = (
    <p className={styles.explain}>
      총 {UPDRS_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[1].TITLE}에 관한
      설문입니다. <br />
      하단 질문에 따라 설문이 다르게 구성되므로 하단 질문에 응답해주세요.
    </p>
  );

  // for pre-question check
  const [takeMedicine, setTakeMedicine] = useRecoilState(takeMedicineState);

  const onClickPreQuestionRadioBtn = (clickedRadioBtnLabel: string) => {
    if (clickedRadioBtnLabel === NOT_TAKE_MEDICINE) {
      setTakeMedicine(NOT_TAKE_MEDICINE);
    } else if (clickedRadioBtnLabel === TAKE_MEDICINE) {
      setTakeMedicine(TAKE_MEDICINE);
    }
  };

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[1].TITLE} subTitle={SURVEY_TITLE_LIST[1].SUB_TITLE} />
      {surveyExplain}

      {/* for pre-question */}
      <PreQuestion
        question={UPDRS_PRE_QUESTION}
        onClickPreQuestionRadioBtn={onClickPreQuestionRadioBtn}
        defaultCheckedLabel={takeMedicine}
      />

      {/* for display questions only when answered pre-question */}
      {takeMedicine !== null && (
        <>
          {currentPageQuestions.map((question) => (
            <SurveyContentWithMedicineEffect question={question} key={question.No} />
          ))}
        </>
      )}

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
