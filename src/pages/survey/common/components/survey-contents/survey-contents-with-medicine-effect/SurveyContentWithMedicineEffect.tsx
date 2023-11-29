import { RecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import AnswerList from '../answerList/AnswerList';
import BottomPrevNextButton from '../../bottom-prev-next-button/BottomPrevNextButton';
import Survey01UPDRSAdditionalMedicineExplain from './components/Survey01UPDRSAdditionalMedicineExplain';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// constants
import {
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
} from 'pages/survey/survey-01-UPDRS/survey.const';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { RespondedCheckObjectStateType } from 'pages/survey/common/types/respondedCheckObjectState.types';
// styles
import { BsExclamationCircleFill } from 'react-icons/bs';
import styles from './surveyContent.module.scss';

interface SurveyContentWithMedicineEffectProps {
  question: SurveyContentObjectType;
  surveyStateKeyword: string;

  // for bottom prev/next pagination button
  handlePrevPage: () => void;
  handleNextPage: () => void;
  // for bottom next button disabled
  currentPageFirstQuestionNumber: number;
  currentPageLastQuestionNumber: number;
  responseStateList: string[];

  // for show not-responded question "!" icon, not-responded question number message
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
  surveyQuestionsPerPage: number;
}

// survey-01-UPDRS, survey-02-FG
export default function SurveyContentWithMedicineEffect(
  props: SurveyContentWithMedicineEffectProps
) {
  const takeMedicineResponse = useRecoilValue(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)
  );

  // for bottom next button disabled
  let currentPageResponseList: string[] = [];

  // if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
  // for bottom next button disabled - not take medicine
  currentPageResponseList = props.responseStateList.slice(
    props.currentPageFirstQuestionNumber,
    props.currentPageLastQuestionNumber + 1
  );
  if (props.currentPageFirstQuestionNumber === 1) {
    currentPageResponseList = props.responseStateList.slice(
      props.currentPageFirstQuestionNumber - 1,
      props.currentPageLastQuestionNumber + 1
    );
  }

  const nextBtnDisabledCondition = currentPageResponseList.includes('');

  // for show not-responded question "!" icon, not-responded question number message
  const respondedCheckObject = useRecoilValue(props.respondedCheckObject);

  return (
    <>
      {/* show additional explain when responded take medicine in pre-question */}
      {props.surveyStateKeyword === SURVEY_01_UPDRS_STATE_KEYWORD &&
        takeMedicineResponse === TAKE_MEDICINE &&
        props.question.No === props.currentPageFirstQuestionNumber && (
          <Survey01UPDRSAdditionalMedicineExplain />
        )}

      <article className={styles['survey-content-container']}>
        <section className={styles['question-title-section']}>
          {takeMedicineResponse === TAKE_MEDICINE ? (
            <>
              <hr
                className={
                  respondedCheckObject[`${props.question.No}-${TAKE_MEDICINE}`]
                    ? styles['not-responded-top-red-hr']
                    : styles['questionnaire-top-blue-hr']
                }
                id={`scroll-${props.surveyStateKeyword}-${props.question.No}-${TAKE_MEDICINE}`}
              />

              <h3
                className={
                  respondedCheckObject[`${props.question.No}-${TAKE_MEDICINE}`]
                    ? `${styles['question-text']} ${styles['not-responded-question-text']}`
                    : styles['question-text']
                }
              >
                {props.question.No}. {props.question.Q}
              </h3>
              {respondedCheckObject[`${props.question.No}-${TAKE_MEDICINE}`] && (
                <span className={styles['not-responded-icon']}>
                  <BsExclamationCircleFill />
                </span>
              )}
            </>
          ) : (
            <>
              <hr
                className={
                  respondedCheckObject[props.question.No]
                    ? styles['not-responded-top-red-hr']
                    : styles['questionnaire-top-blue-hr']
                }
                id={`scroll-${props.surveyStateKeyword}-${props.question.No}`}
              />

              <h3
                className={
                  respondedCheckObject[props.question.No]
                    ? `${styles['question-text']} ${styles['not-responded-question-text']}`
                    : styles['question-text']
                }
              >
                {props.question.No}. {props.question.Q}
              </h3>
              {respondedCheckObject[props.question.No] && (
                <span className={styles['not-responded-icon']}>
                  <BsExclamationCircleFill />
                </span>
              )}
            </>
          )}
        </section>

        <div className={styles['answer-container']}>
          <div key={uuidv4()}>
            {takeMedicineResponse === TAKE_MEDICINE ? (
              <>
                {props.question.A && (
                  <AnswersUnorderedList
                    answersList={props.question.A}
                    inputName={`${props.question.No}-${TAKE_MEDICINE}`}
                    questionNumber={`${props.question.No}-${TAKE_MEDICINE}`}
                    surveyStateKeyword={props.surveyStateKeyword}
                    // for hide question right not-responded "!" icon when checked
                    respondedCheckObject={props.respondedCheckObject}
                  />
                )}
              </>
            ) : (
              <>
                {props.question.A && (
                  <AnswersUnorderedList
                    answersList={props.question.A}
                    inputName={`${props.question.No}`}
                    questionNumber={`${props.question.No}`}
                    surveyStateKeyword={props.surveyStateKeyword}
                    // for hide question right not-responded "!" icon when checked
                    respondedCheckObject={props.respondedCheckObject}
                  />
                )}
              </>
            )}
          </div>
        </div>

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
            takeMedicineResponse={takeMedicineResponse}
            // for scroll unresponded question when click disabled next button
            scrollIdKeyword={props.surveyStateKeyword}
            havePreQuestion={true}
          />
        )}
      </article>
    </>
  );
}

interface AnswersUnorderedListProps {
  questionNumber: string;
  surveyStateKeyword: string;

  answersList: string[];
  inputName: string;

  // for hide question right not-responded "!" icon when checked
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
}

function AnswersUnorderedList(props: AnswersUnorderedListProps) {
  return (
    <ul className={styles['answer-ul']}>
      {props.answersList.map((answer) => (
        <AnswerList
          answer={answer}
          inputName={props.inputName}
          inputId={`${props.questionNumber}${answer}`}
          clickedQuestionNumber={props.questionNumber}
          surveyStateKeyword={props.surveyStateKeyword}
          // for hide question right not-responded "!" icon when checked
          respondedCheckObject={props.respondedCheckObject}
          key={uuidv4()}
        />
      ))}
    </ul>
  );
}
