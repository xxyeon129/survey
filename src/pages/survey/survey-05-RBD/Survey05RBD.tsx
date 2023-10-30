// states
import { useSetRecoilState } from 'recoil';
import {
  survey04CurrentPageState,
  survey05CurrentPageState,
  survey06CurrentPageState,
} from '../common/surveyPaginationStates';
// hooks
import usePagination from '../common/hooks/usePagination';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { RBD_PRE_QUESTION, RBD_QUESTIONS, RBD_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_04_BDI_TOTAL_PAGES } from '../survey-04-BDI/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithShortAnswers from '../common/components/survey-contents/survey-contents-with-short-answers/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
import AnswerList from '../common/components/survey-contents/answerList/AnswerList';
// styles
import styles from '../common/survey.module.scss';
import contentStyles from '../common/components/survey-contents/survey-contents-with-short-answers/surveyContent.module.scss';

export default function Survey05RBD() {
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

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[5].TITLE} subTitle={SURVEY_TITLE_LIST[5].SUB_TITLE} />
      <ul>
        <PreQuestion />
        {currentPageQuestions.map((question) => (
          <SurveyContentWithShortAnswers question={question} key={question.No} />
        ))}
      </ul>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}

function PreQuestion() {
  return (
    <li className={contentStyles['questions-li']}>
      <hr className={styles.hr} />
      <hgroup className={contentStyles['questions-title']}>
        <h4>{RBD_PRE_QUESTION.Q}</h4>
      </hgroup>

      <ul className={contentStyles['answers-ul']}>
        {RBD_PRE_QUESTION.A.map((answer) => (
          <AnswerList
            answer={answer}
            inputName={'RBD-pre-question'}
            inputId={`RBD-pre-question-${answer}`}
            key={`RBD-pre-question-${answer}`}
          />
        ))}
      </ul>
    </li>
  );
}
