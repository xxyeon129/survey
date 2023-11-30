import { RecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import BottomPrevNextButton from '../../bottom-prev-next-button/BottomPrevNextButton';
// hooks
import useClickedRadioBtnChecked from 'pages/survey/common/hooks/useClickedRadioBtnChecked';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { RespondedCheckObjectStateType } from 'pages/survey/common/types/respondedCheckObjectState.types';
// styles
import { BsExclamationCircleFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import styles from './surveyContentDegreeGradation.module.scss';

interface SurveyContentDegreeGradationProps {
  question: SurveyContentObjectType;
  surveyQuestionsPerPage: number;
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
  degreesListForDisplay: string[];
  degreesList: string[];

  // for bottom prev/next pagination button
  handlePrevPage: () => void;
  handleNextPage: () => void;
  // for bottom next button disabled
  currentPageFirstQuestionNumber: number;
  currentPageLastQuestionNumber: number;
  responseStateList: string[];

  // for button checked
  surveyStateKeyword: string;
}

// survey-08-PDSS
export default function SurveyContentDegreeGradation(props: SurveyContentDegreeGradationProps) {
  // for bottom next button disabled
  const currentPageResponseList = props.responseStateList.slice(
    props.currentPageFirstQuestionNumber - 1,
    props.currentPageLastQuestionNumber
  );
  const nextBtnDisabledCondition = currentPageResponseList.includes('');

  // for show not-responded question "!" icon, not-responded question number message
  const respondedCheckObject: RespondedCheckObjectStateType = useRecoilValue(
    props.respondedCheckObject
  );

  return (
    <article className={styles['survey-content-container']}>
      <section className={styles['question-text-section']}>
        <h3
          className={
            respondedCheckObject[props.question.No]
              ? `${styles['question-h3']} ${styles['not-responded-question-h3']}`
              : styles['question-h3']
          }
          id={`scroll-${props.surveyStateKeyword}-${props.question.No}`}
        >
          {props.question.No}. {props.question.Q}
        </h3>
        {respondedCheckObject[props.question.No] && (
          <BsExclamationCircleFill className={styles['not-responded-icon']} />
        )}
      </section>
      <ul className={styles['degrees-container-ul']}>
        {props.degreesList.map((degree, index) => (
          <li
            className={
              props.degreesList.length < 5
                ? styles['degree-container-li-under-5']
                : styles['degree-container-li']
            }
            key={uuidv4()}
          >
            <DegreeBtn
              questionNumber={props.question.No}
              surveyStateKeyword={props.surveyStateKeyword}
              degree={degree}
              degreeForDisplay={props.degreesListForDisplay[index]}
              // for hide question right not-responded "!" icon when checked
              respondedCheckObject={props.respondedCheckObject}
            />
          </li>
        ))}
      </ul>
      <hr className={styles['bottom-hr']} />

      {/* bottom prev/next pagination buttons */}
      {props.question.No === props.currentPageLastQuestionNumber && (
        <BottomPrevNextButton
          handleNextPage={props.handleNextPage}
          handlePrevPage={props.handlePrevPage}
          nextBtnDisabledCondition={nextBtnDisabledCondition}
          // for show not-responded question "!" icon, not-responded question number message
          respondedCheckObject={props.respondedCheckObject}
          responseStateList={props.responseStateList}
          currentPageLastQuestionNumber={props.currentPageLastQuestionNumber}
          currentPageFirstQuestionNumber={props.currentPageFirstQuestionNumber}
          surveyQuestionsPerPage={props.surveyQuestionsPerPage}
          // for scroll unresponded question when click disabled next button
          scrollIdKeyword={props.surveyStateKeyword}
        />
      )}
    </article>
  );
}

interface DegreeBtnProps {
  questionNumber: number;
  surveyStateKeyword: string;
  degree: string;
  degreeForDisplay: string;
  // for hide question right not-responded "!" icon when checked
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
}

function DegreeBtn(props: DegreeBtnProps) {
  const surveyStateKeyword = props.surveyStateKeyword;
  const clickedQuestionNumber = `${props.questionNumber}`;
  // for hide question right not-responded "!" icon when checked
  const respondedCheckObject = props.respondedCheckObject;

  const { responseValue, handleRadioBtnChange } = useClickedRadioBtnChecked({
    surveyStateKeyword,
    clickedQuestionNumber,
    // for hide question right not-responded "!" icon when checked
    respondedCheckObject,
  });

  return (
    <label className={styles['degree-li-label']}>
      <input
        type="radio"
        name={`${props.questionNumber}`}
        id={`${props.questionNumber}${props.degree}`}
        value={props.degree}
        onChange={handleRadioBtnChange}
        checked={responseValue === props.degree}
      />
      {responseValue === props.degree && <FaCheck className={styles['check-icon']} />}
      <span className={styles['degree-bottom-text']}>{props.degreeForDisplay}</span>
    </label>
  );
}
