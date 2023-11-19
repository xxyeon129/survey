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
  MEDICINE_EFFECT_FALSE,
  MEDICINE_EFFECT_TRUE,
  medicineDivisionList,
} from './surveyContent.const';
import {
  NOT_TAKE_MEDICINE,
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

  if (takeMedicineResponse === NOT_TAKE_MEDICINE) {
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
  } else if (takeMedicineResponse === TAKE_MEDICINE) {
    // for bottom next button disabled - take medicine
    currentPageResponseList = props.responseStateList.slice(
      props.currentPageFirstQuestionNumber * 2 - 1,
      props.currentPageLastQuestionNumber * 2 + 1
    );
    if (props.currentPageFirstQuestionNumber === 1) {
      currentPageResponseList = props.responseStateList.slice(
        props.currentPageFirstQuestionNumber - 1,
        props.currentPageLastQuestionNumber * 2 + 1
      );
    }
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
        {takeMedicineResponse === NOT_TAKE_MEDICINE ? (
          <section className={styles['question-title-section']}>
            <hr
              className={
                respondedCheckObject[props.question.No]
                  ? styles['not-responded-top-red-hr']
                  : styles['questionnaire-top-blue-hr']
              }
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
          </section>
        ) : (
          <section className={styles['question-title-section']}>
            <hr
              className={
                respondedCheckObject[`${props.question.No}-${MEDICINE_EFFECT_TRUE}`] ||
                respondedCheckObject[`${props.question.No}-${MEDICINE_EFFECT_FALSE}`]
                  ? styles['not-responded-top-red-hr']
                  : styles['questionnaire-top-blue-hr']
              }
            />
            <h3
              className={
                respondedCheckObject[`${props.question.No}-${MEDICINE_EFFECT_TRUE}`] ||
                respondedCheckObject[`${props.question.No}-${MEDICINE_EFFECT_FALSE}`]
                  ? `${styles['question-text']} ${styles['not-responded-question-text']}`
                  : styles['question-text']
              }
            >
              {props.question.No}. {props.question.Q}
            </h3>
            {(respondedCheckObject[`${props.question.No}-${MEDICINE_EFFECT_TRUE}`] ||
              respondedCheckObject[`${props.question.No}-${MEDICINE_EFFECT_FALSE}`]) && (
              <BsExclamationCircleFill className={styles['not-responded-icon']} />
            )}
          </section>
        )}

        <div className={styles['answer-container']}>
          {takeMedicineResponse === TAKE_MEDICINE ? (
            <>
              {medicineDivisionList.map((list) => (
                <div key={uuidv4()}>
                  {list.radioBtnKeyword === MEDICINE_EFFECT_TRUE ? (
                    <h3
                      className={
                        respondedCheckObject[`${props.question.No}-${MEDICINE_EFFECT_TRUE}`]
                          ? `${styles['medicine-text']} ${styles['not-responded-medicine-text']}`
                          : styles['medicine-text']
                      }
                    >
                      파킨슨병 약의 효과가{' '}
                      <span className={styles['medicine-text-emphasize']}>{list.text}</span> 때 아래
                      설문에 답변해 주세요.
                    </h3>
                  ) : (
                    <h3
                      className={
                        respondedCheckObject[`${props.question.No}-${MEDICINE_EFFECT_FALSE}`]
                          ? `${styles['medicine-text']} ${styles['not-responded-medicine-text']}`
                          : styles['medicine-text']
                      }
                    >
                      파킨슨병 약의 효과가{' '}
                      <span className={styles['medicine-text-emphasize']}>{list.text}</span> 때 아래
                      설문에 답변해 주세요.
                    </h3>
                  )}
                  {props.question.A && (
                    <AnswersUnorderedList
                      answersList={props.question.A}
                      inputName={`${props.question.No}${list.radioBtnKeyword}`}
                      questionNumber={`${props.question.No}-${list.radioBtnKeyword}`}
                      surveyStateKeyword={props.surveyStateKeyword}
                      // for hide question right not-responded "!" icon when checked
                      respondedCheckObject={props.respondedCheckObject}
                    />
                  )}
                </div>
              ))}
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
