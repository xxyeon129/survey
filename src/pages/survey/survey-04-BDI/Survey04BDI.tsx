// states, hook
import { useSetRecoilState } from 'recoil';
import {
  survey03CurrentPageState,
  survey04CurrentPageState,
  survey05CurrentPageState,
} from '../common/surveyPaginationStates';
import usePagination from '../common/hooks/usePagination';
// constants
import { SURVEY_TITLE_LIST } from 'shared/constants/survey.const';
import { BDI_QUESTIONS, BDI_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_03_BAI_TOTAL_PAGES } from '../survey-03-BAI/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import AnswerList from '../common/components/survey-contents/AnswerList';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// styles
import styles from '../common/survey.module.scss';
import surveyStyles from './surveyBDI.module.scss';

export default function Survey04BDI() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey03CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey05CurrentPageState);
  const prevSurveyTotalPages = SURVEY_03_BAI_TOTAL_PAGES;
  const currentPageState = survey04CurrentPageState;
  const questions = BDI_QUESTIONS;
  const questionsPerPage = BDI_QUESTIONS_PER_PAGE;

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
      <SurveyTitle title={SURVEY_TITLE_LIST[4].TITLE} subTitle={SURVEY_TITLE_LIST[4].SUB_TITLE} />
      <ul className={surveyStyles['questions-ul']}>
        {currentPageQuestions.map((question) => (
          <Survey01QuestionLi question={question} key={question.No} />
        ))}
      </ul>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}

interface QuestionLiProps {
  question: { No: number; A: string[] };
}

function Survey01QuestionLi(props: QuestionLiProps) {
  return (
    <li className={surveyStyles['questions-li']}>
      <h2 className={surveyStyles['questions-title']}>설문 {props.question.No}</h2>
      <hr className={styles.hr} />
      <ul className={surveyStyles['answers-ul']}>
        {props.question.A.map((answer) => (
          <AnswerList
            answer={answer}
            inputName={`${props.question.No}`}
            inputId={`${props.question.No}${answer}`}
            key={`${props.question.No}${answer}`}
          />
        ))}
      </ul>
    </li>
  );
}
