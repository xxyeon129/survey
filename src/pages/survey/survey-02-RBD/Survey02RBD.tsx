import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import { RBD_QUESTIONS, RBD_QUESTIONS_PER_PAGE } from './survey.const';
import AnswerList from '../common/components/AnswerList';
import surveyStyles from './survey02RBD.module.scss';
import { PATH_URL } from 'shared/constants/path.const';
import useCurrentSurveyPagePath from 'shared/hooks/useCurrentSurveyPagePath';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from 'components/layout/header/pagination/headerPageState';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  survey01CurrentPageState,
  survey03CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey01TotalPages } from '../survey-01-BDI/survey.const';

export default function Survey02RBD() {
  // for header page display
  const [headerCurrentPage, setHeaderCurrentPage] = useRecoilState(headerCurrentPageState);

  // for prev survey type last page / next survey type first page
  const setPrevSurveyPage = useSetRecoilState(survey01CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey03CurrentPageState);

  const [currentPage, setCurrentPage] = useState(1);
  const currentSurveyTotalPages = Math.ceil(RBD_QUESTIONS.length / RBD_QUESTIONS_PER_PAGE);
  const questionStartIndex = (currentPage - 1) * RBD_QUESTIONS_PER_PAGE;
  const currentPageQuestions = RBD_QUESTIONS.slice(
    questionStartIndex,
    currentPage * RBD_QUESTIONS_PER_PAGE
  );

  // for prev/next survey type page
  const navigate = useNavigate();
  const currentSurveyPath = useCurrentSurveyPagePath();

  const handlePrevPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);

    if (currentPage === 1) {
      navigate(`${PATH_URL.SURVEY_PATH}${currentSurveyPath - 1}`);
      // 이전 설문 전역 상태 마지막 페이지로
      setPrevSurveyPage(survey01TotalPages);
    }

    setHeaderCurrentPage(headerCurrentPage - 1);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    currentPage < currentSurveyTotalPages && setCurrentPage(currentPage + 1);

    if (currentPage === currentSurveyTotalPages) {
      navigate(`${PATH_URL.SURVEY_PATH}${currentSurveyPath + 1}`);
      // 이전 설문 전역 상태 첫 페이지로
      setNextSurveyPage(1);
    }

    setHeaderCurrentPage(headerCurrentPage + 1);
    window.scrollTo(0, 0);
  };

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[2].TITLE} />
      <ul className={surveyStyles['questions-ul']}>
        {currentPageQuestions.map((question) => (
          <Survey02QuestionLi question={question} key={question.No} />
        ))}
      </ul>

      <button onClick={handlePrevPage}>이전</button>
      <button onClick={handleNextPage}>다음</button>
    </article>
  );
}

interface QuestionLiProps {
  question: { No: number; Q: string; EXPLAIN?: string; A: string[] };
}

function Survey02QuestionLi(props: QuestionLiProps) {
  return (
    <li className={surveyStyles['questions-li']}>
      <hr className={styles.hr} />
      <header className={surveyStyles['questions-title']}>
        <h4>
          {props.question.No}. {props.question.Q}
        </h4>
        {props.question.EXPLAIN && (
          <span className={surveyStyles['question-title-explain']}>
            <strong>* </strong>
            {props.question.EXPLAIN}
          </span>
        )}
      </header>
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
