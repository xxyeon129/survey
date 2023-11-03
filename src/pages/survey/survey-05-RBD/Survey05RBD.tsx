// states
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  survey04CurrentPageState,
  survey05CurrentPageState,
  survey06CurrentPageState,
} from '../common/surveyPaginationStates';
import { surveyRespondentState } from './survey05RBD.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { RBD_PRE_QUESTION, RBD_QUESTIONS, RBD_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_04_BDI_TOTAL_PAGES } from '../survey-04-BDI/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import PreQuestion from '../common/components/survey-contents/preQuestion/PreQuestion';
import SurveyContentWithShortAnswers from '../common/components/survey-contents/survey-contents-with-short-answers/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';

export default function Survey05RBD() {
  // for pre-question check
  const [surveyRespondent, setSurveyRespondent] = useRecoilState(surveyRespondentState);

  // for pre-question answer defaultChecked
  const onClickPreQuestionRadioBtn = (clickedRadioBtnLabel: string) => {
    setSurveyRespondent(clickedRadioBtnLabel);
  };

  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey04CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey06CurrentPageState);
  const prevSurveyTotalPages = SURVEY_04_BDI_TOTAL_PAGES;
  const currentPageState = survey05CurrentPageState;
  const questions = RBD_QUESTIONS;
  const questionsPerPage = RBD_QUESTIONS_PER_PAGE;

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
      총 {RBD_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[5].TITLE}에 관한
      설문입니다.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[5].TITLE} subTitle={SURVEY_TITLE_LIST[5].SUB_TITLE} />
      {surveyExplain}

      {/* for pre-question */}
      <PreQuestion
        question={RBD_PRE_QUESTION}
        onClickPreQuestionRadioBtn={onClickPreQuestionRadioBtn}
        defaultCheckedLabel={surveyRespondent}
      />

      <ul>
        {/* <PreQuestion /> */}
        {currentPageQuestions.map((question) => (
          <SurveyContentWithShortAnswers question={question} key={question.No} />
        ))}
      </ul>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
