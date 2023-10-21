import { SURVEY } from 'shared/constants/survey.const';
import { FG_QUESTIONS, FG_QUESTIONS_PER_PAGE } from './survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import styles from '../common/survey.module.scss';
import surveyStyles from './survey05FG.module.scss';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from 'components/layout/header/pagination/headerPageState';
import {
  survey04CurrentPageState,
  survey05CurrentPageState,
} from '../common/surveyPaginationStates';
import { useNavigate } from 'react-router-dom';
import useCurrentSurveyPagePath from 'shared/hooks/useCurrentSurveyPagePath';
import { PATH_URL } from 'shared/constants/path.const';
import { survey04TotalPages } from '../survey-04-UPDRS/survey.const';

export default function Survey05FG() {
  // for header page display
  const [headerCurrentPage, setHeaderCurrentPage] = useRecoilState(headerCurrentPageState);

  // for prev survey type last page / next survey type first page
  const setPrevSurveyPage = useSetRecoilState(survey04CurrentPageState);

  const [currentPage, setCurrentPage] = useRecoilState(survey05CurrentPageState);
  const currentSurveyTotalPages = Math.ceil(FG_QUESTIONS.length / FG_QUESTIONS_PER_PAGE);
  const questionStartIndex = (currentPage - 1) * FG_QUESTIONS_PER_PAGE;
  const currentPageQuestions = FG_QUESTIONS.slice(
    questionStartIndex,
    currentPage * FG_QUESTIONS_PER_PAGE
  );

  // for prev/next survey type page
  const navigate = useNavigate();
  const currentSurveyPath = useCurrentSurveyPagePath();

  const handlePrevPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);

    if (currentPage === 1) {
      navigate(`${PATH_URL.SURVEY_PATH}${currentSurveyPath - 1}`);
      // 이전 설문 전역 상태 마지막 페이지로
      setPrevSurveyPage(survey04TotalPages);
    }

    setHeaderCurrentPage(headerCurrentPage - 1);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    currentPage < currentSurveyTotalPages && setCurrentPage(currentPage + 1);

    // if (currentPage === currentSurveyTotalPages) {
    //   navigate(`${PATH_URL.SURVEY_PATH}${currentSurveyPath + 1}`);
    //   // 이전 설문 전역 상태 첫 페이지로
    //   setNextSurveyPage(1);
    // }

    setHeaderCurrentPage(headerCurrentPage + 1);
    window.scrollTo(0, 0);
  };

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[5].TITLE} subTitle={SURVEY[5].SUB_TITLE} />

      {currentPageQuestions.map((question) => (
        <SurveyContent question={question} key={question.No} />
      ))}

      <button onClick={handlePrevPage}>이전</button>
      <button onClick={handleNextPage} disabled={currentPage === currentSurveyTotalPages}>
        다음
      </button>
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
