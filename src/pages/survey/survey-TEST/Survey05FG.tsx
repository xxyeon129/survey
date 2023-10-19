import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import SurveyContentMedicine from '../common/survey-content/SurveyContentMedicine';
import useQnAList from '../common/hooks/useQnAList';
import BottomPrevNextButton from '../common/bottom-prev-next-button/BottomPrevNextButton';
import usePagination from '../common/hooks/usePagination';

export default function Survey05FG() {
  const questionList = SURVEY[5].QUESTIONS;
  const { questions, answers } = useQnAList(questionList);
  const {
    currentPage,
    currentSurveyTotalPages,
    // questionStartIndex,
    // currentPageQuestions,
    handleNextPage,
    handlePrevPage,
  } = usePagination(questions, SURVEY[5].PAGINATION_QUESTIONS_LIMIT);

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle
        title={SURVEY[5].TITLE}
        subTitle={SURVEY[5].SUB_TITLE}
        explain={SURVEY[5].EXPLAIN}
      />
      {questions.map((question, index) => (
        <SurveyContentMedicine
          questionNo={index + 1}
          question={question}
          answers={answers[index]}
          key={index}
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
