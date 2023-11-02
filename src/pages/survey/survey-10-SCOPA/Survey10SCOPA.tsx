// states
import { useSetRecoilState } from 'recoil';
import {
  survey09CurrentPageState,
  survey10CurrentPageState,
  survey11CurrentPageState,
} from '../common/surveyPaginationStates';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  SCOPA_QUESTIONS,
  SCOPA_QUESTIONS_MEDICINE,
  SCOPA_QUESTIONS_PER_PAGE,
} from './survey.const';
import { SURVEY_09_TIRED_TOTAL_PAGES } from '../survey-09-TIRED/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithShortAnswers from '../common/components/survey-contents/survey-contents-with-short-answers/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// hooks
import usePagination from '../common/hooks/usePagination';
import useSeparateGender from './hooks/useSeparateGender';
import useExplainSectionElements from './hooks/useExplainSectionElements';
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

  // for separate question 22-23 by gender
  const categorizedQuestionList = useSeparateGender();

  // for explain text box before question number 8~13, 22~23, 24
  const explainSectionList = useExplainSectionElements();

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
        {currentPageQuestions.map((question) => (
          <SurveyContentWithShortAnswers
            question={question}
            explainSectionList={explainSectionList}
            categorizedQuestionList={categorizedQuestionList}
            exceptionalTypeQuestion={SCOPA_QUESTIONS_MEDICINE}
            key={question.No}
          />
        ))}
      </ul>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
