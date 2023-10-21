import { SURVEY } from 'shared/constants/survey.const';
import { UPDRS_QUESTIONS, UPDRS_QUESTIONS_PER_PAGE } from './survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import surveyStyles from './survey04UPDRS.module.scss';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from 'components/layout/header/pagination/headerPageState';
import {
  survey03CurrentPageState,
  survey04CurrentPageState,
  survey05CurrentPageState,
} from '../common/surveyPaginationStates';
import { useNavigate } from 'react-router-dom';
import useCurrentSurveyPagePath from 'shared/hooks/useCurrentSurveyPagePath';
import { PATH_URL } from 'shared/constants/path.const';
import { survey03TotalPages } from '../survey-03-SCOPA/survey.const';

export default function Survey04UPDRS() {
  // for header page display
  const [headerCurrentPage, setHeaderCurrentPage] = useRecoilState(headerCurrentPageState);

  // for prev survey type last page / next survey type first page
  const setPrevSurveyPage = useSetRecoilState(survey03CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey05CurrentPageState);

  const [currentPage, setCurrentPage] = useRecoilState(survey04CurrentPageState);
  const currentSurveyTotalPages = Math.ceil(UPDRS_QUESTIONS.length / UPDRS_QUESTIONS_PER_PAGE);
  const questionStartIndex = (currentPage - 1) * UPDRS_QUESTIONS_PER_PAGE;
  const currentPageQuestions = UPDRS_QUESTIONS.slice(
    questionStartIndex,
    currentPage * UPDRS_QUESTIONS_PER_PAGE
  );

  // for prev/next survey type page
  const navigate = useNavigate();
  const currentSurveyPath = useCurrentSurveyPagePath();

  const handlePrevPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);

    if (currentPage === 1) {
      navigate(`${PATH_URL.SURVEY_PATH}${currentSurveyPath - 1}`);
      // 이전 설문 전역 상태 마지막 페이지로
      setPrevSurveyPage(survey03TotalPages);
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
      <SurveyTitle title={SURVEY[4].TITLE} subTitle={SURVEY[4].SUB_TITLE} />

      {currentPageQuestions.map((question) => (
        <SurveyContent question={question} key={question.No} />
      ))}

      <button onClick={handlePrevPage}>이전</button>
      <button onClick={handleNextPage}>다음</button>
    </article>
  );
}

interface SurveyContentProps {
  question: { No: number; Q: string; EXPLAIN?: string; A: { [key: number]: string } };
}

function SurveyContent(props: SurveyContentProps) {
  const answers = Object.values(props.question.A);

  const medicineDivisionList = [
    { radioBtnKeyword: '-medicine-true', text: '있을' },
    { radioBtnKeyword: '-medicine-false', text: '없을' },
  ];

  return (
    <article className={surveyStyles['survey-content-container']}>
      <hr />
      <h3 className={surveyStyles['question']}>
        {props.question.No}. {props.question.Q}
      </h3>

      <div className={surveyStyles['answer-container']}>
        {medicineDivisionList.map((list, index) => (
          <div key={index}>
            <h3 className={surveyStyles['medicine-text']}>{`약 효과가 ${list.text} 때`}</h3>
            <ul className={surveyStyles['answer-ul']}>
              {answers.map((answer) => (
                <AnswerLi
                  answer={answer}
                  inputName={`${props.question.No}${list.radioBtnKeyword}`}
                  inputId={`${props.question.No}${answer}${list.radioBtnKeyword}`}
                  key={`${answer}${list.radioBtnKeyword}`}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

interface AnswerLiProps {
  answer: string;
  inputName: string;
  inputId: string;
}

function AnswerLi(props: AnswerLiProps) {
  return (
    <li className={surveyStyles['answer-li']}>
      <input type="radio" id={props.inputId} name={props.inputName} value={props.answer} />
      <label htmlFor={props.inputId}>
        <div className={surveyStyles['radio-button']}>
          <div className={surveyStyles['radio-button-checked-circle']} />
        </div>
        {props.answer}
      </label>
    </li>
  );
}
