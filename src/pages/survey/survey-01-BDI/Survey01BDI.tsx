import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import surveyStyles from './surveyBDI.module.scss';
import { BDI_QUESTIONS, BDI_QUESTIONS_PER_PAGE, survey01TotalPages } from './survey.const';
import AnswerList from '../common/components/AnswerList';
import { useRecoilState } from 'recoil';
import { survey01CurrentPageState } from '../common/surveyPaginationStates';
import { useNavigate } from 'react-router-dom';
import useCurrentSurveyPagePath from 'shared/hooks/useCurrentSurveyPagePath';
import { PATH_URL } from 'shared/constants/path.const';
import { headerCurrentPageState } from 'components/layout/header/pagination/headerPageState';

export default function Survey01BDI() {
  // for header page display
  const [headerCurrentPage, setHeaderCurrentPage] = useRecoilState(headerCurrentPageState);

  const [currentPage, setCurrentPage] = useRecoilState(survey01CurrentPageState);
  // survey02TotalPages
  // const currentSurveyTotalPages = Math.ceil(BDI_QUESTIONS.length / BDI_QUESTIONS_PER_PAGE);
  const questionStartIndex = (currentPage - 1) * BDI_QUESTIONS_PER_PAGE;
  const currentPageQuestions = BDI_QUESTIONS.slice(
    questionStartIndex,
    currentPage * BDI_QUESTIONS_PER_PAGE
  );

  // for prev/next survey type page
  const navigate = useNavigate();
  const currentSurveyPath = useCurrentSurveyPagePath();

  const handlePrevPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);

    if (currentPage === 1) {
      navigate(`${PATH_URL.SURVEY_PATH}${currentSurveyPath - 1}`);
    }

    setHeaderCurrentPage(headerCurrentPage - 1);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    currentPage < survey01TotalPages && setCurrentPage(currentPage + 1);

    if (currentPage === survey01TotalPages) {
      navigate(`${PATH_URL.SURVEY_PATH}${currentSurveyPath + 1}`);
    }

    setHeaderCurrentPage(headerCurrentPage + 1);
    window.scrollTo(0, 0);
  };

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[1].TITLE} subTitle={SURVEY[1].SUB_TITLE} />
      <ul className={surveyStyles['questions-ul']}>
        {currentPageQuestions.map((question) => (
          <Survey01QuestionLi question={question} key={question.No} />
        ))}
      </ul>

      <button onClick={handlePrevPage}>이전</button>
      <button onClick={handleNextPage}>다음</button>
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
