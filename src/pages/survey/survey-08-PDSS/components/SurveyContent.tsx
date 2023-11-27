import { RecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import BottomPrevNextButton from '../../common/components/bottom-prev-next-button/BottomPrevNextButton';
// states
import { respondedCheckObject08PDSS } from 'pages/survey/common/states/respondedCheckObjects.state';
// hooks
import useClickedRadioBtnChecked from 'pages/survey/common/hooks/useClickedRadioBtnChecked';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { RespondedCheckObjectStateType } from 'pages/survey/common/types/respondedCheckObjectState.types';
// styles
import { BsExclamationCircleFill } from 'react-icons/bs';
import styles from './surveyContent.module.scss';

interface SurveyContentDegreeGradationProps {
  question: SurveyContentObjectType;
  answers: string[];
  surveyQuestionsPerPage: number;
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
  exceptionalAnswers?: string[];
  exceptionalNo?: number;

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
  const degreesList = Array.from({ length: 11 }, (_, index) => index);

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
        {degreesList.map((degree) => (
          <li className={styles['degree-container-li']} key={uuidv4()}>
            <DegreeBtn
              questionNumber={props.question.No}
              surveyStateKeyword={props.surveyStateKeyword}
              degree={degree}
              // for hide question right not-responded "!" icon when checked
              respondedCheckObject={respondedCheckObject08PDSS}
            />

            {/* for bottom degree explain text */}
            {props.exceptionalNo &&
            props.question.No === props.exceptionalNo &&
            props.exceptionalAnswers ? (
              <>
                {/* for exceptional text -> exceptionalAnswers list */}
                {degree === 0 && (
                  <p className={styles['zero-degree-bottom-text']}>{props.exceptionalAnswers[0]}</p>
                )}
                {degree === 5 && (
                  <p className={styles['middle-degree-bottom-text']}>
                    {props.exceptionalAnswers[1]}
                  </p>
                )}
                {degree === 10 && (
                  <p className={styles['last-degree-bottom-text']}>{props.exceptionalAnswers[2]}</p>
                )}
              </>
            ) : (
              <>
                {/* for non-exceptional text -> answers list */}
                {degree === 0 && (
                  <p className={styles['zero-degree-bottom-text']}>{props.answers[0]}</p>
                )}
                {degree === 5 && (
                  <p className={styles['middle-degree-bottom-text']}>{props.answers[1]}</p>
                )}
                {degree === 10 && (
                  <p className={styles['last-degree-bottom-text']}>{props.answers[2]}</p>
                )}
              </>
            )}
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
          respondedCheckObject={respondedCheckObject08PDSS}
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
  degree: number;

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
      <span className={styles['degree-number']}>{props.degree}</span>
      <input
        type="radio"
        name={`${props.questionNumber}`}
        id={`${props.questionNumber}${props.degree}`}
        value={`${props.degree}점`}
        onChange={handleRadioBtnChange}
        checked={responseValue === `${props.degree}점`}
      />
    </label>
  );
}
