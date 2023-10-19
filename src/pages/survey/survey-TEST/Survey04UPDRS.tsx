import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import SurveyContentMedicine from '../common/survey-content/SurveyContentMedicine';
import BottomPrevNextButton from '../common/bottom-prev-next-button/BottomPrevNextButton';
import useQnAList from '../common/hooks/useQnAList';
import usePagination from '../common/hooks/usePagination';
import styles from '../common/survey.module.scss';

export default function Survey04UPDRS() {
  const questionList = SURVEY[4].QUESTIONS;
  const { questions, answers } = useQnAList(questionList);
  const {
    currentPage,
    currentSurveyTotalPages,
    questionStartIndex,
    currentPageQuestions,
    handleNextPage,
    handlePrevPage,
  } = usePagination(questions, SURVEY[4].PAGINATION_QUESTIONS_LIMIT);

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[4].TITLE} subTitle={SURVEY[4].SUB_TITLE} />

      {currentPageQuestions.map((question, currentPageIndex) => (
        <SurveyContentMedicine
          questionNo={questionStartIndex + currentPageIndex + 1}
          question={question}
          answers={answers[questionStartIndex + currentPageIndex]}
          key={questionStartIndex + currentPageIndex}
        />
      ))}

      <BottomPrevNextButton
        currentPage={currentPage}
        currentSurveyTotalPages={currentSurveyTotalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </article>
  );
}
