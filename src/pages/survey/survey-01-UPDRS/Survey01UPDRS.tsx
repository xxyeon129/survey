import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import SurveyContentMedicine from '../common/survey-content/SurveyContentMedicine';
import BottomPrevNextButton from '../common/bottom-prev-next-button/BottomPrevNextButton';
import useQnAList from '../common/hooks/useQnAList';
import usePagination from '../common/hooks/usePagination';
import styles from '../common/survey.module.scss';

export default function Survey01UPDRS() {
  const questionList = SURVEY[1].QUESTIONS;
  const { questions, answers } = useQnAList(questionList);
  const {
    currentPage,
    totalPages,
    questionStartIndex,
    currentPageQuestions,
    handleNextPage,
    handlePrevPage,
  } = usePagination(questions);

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[1].TITLE} subTitle={SURVEY[1].SUB_TITLE} />

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
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </article>
  );
}
