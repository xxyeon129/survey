import { useEffect } from 'react';
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// states
import { personalInfoGenderState } from 'pages/survey/personalInfo/personalInfo.state';
// components
import AnswerList from 'pages/survey/common/components/survey-contents/answerList/AnswerList';
import AnswerWithInput from 'pages/survey/survey-10-SCOPA/components/answerWithInput/AnswerWithInput';
import BottomPrevNextButton from 'pages/survey/common/components/bottom-prev-next-button/BottomPrevNextButton';
// constants
import {
  SCOPA_ANSWER_NO_YES,
  SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from 'pages/survey/survey-10-SCOPA/survey.const';
import {
  FEMALE,
  MALE,
} from 'pages/survey/personalInfo/components/rightSection/genderCheck/genderCheckSection.const';
// hooks
import useExplainSectionElements from '../hooks/useExplainSectionElements';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { RespondedCheckObjectStateType } from 'pages/survey/common/types/respondedCheckObjectState.types';
// styles
import { BsExclamationCircleFill } from 'react-icons/bs';
import styles from 'pages/survey/common/survey.module.scss';
import contentStyles from 'pages/survey/common/components/survey-contents/survey-contents-with-short-answers/surveyContent.module.scss';

interface SurveyContentWithShortAnswersProps {
  question: SurveyContentObjectType;

  // for bottom prev/next pagination button
  handlePrevPage: () => void;
  handleNextPage: () => void;
  // for bottom next button disabled
  currentPageFirstQuestionNumber: number;
  currentPageLastQuestionNumber: number;
  responseStateList: string[];

  // for show not-responded question "!" icon, not-responded question number message
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
}

export default function SurveyContent10SCOPA(props: SurveyContentWithShortAnswersProps) {
  // for explain text box before question number 8~13, 22~25, 26
  const explainSectionList = useExplainSectionElements();

  // for gender question
  const selectedGender = useRecoilValue(personalInfoGenderState);
  const genderQuestionStartNumber = 22;
  // for last input type question display
  const lastInputQuestionNumber = 26;

  // for bottom next button disabled
  let currentPageResponseList = props.responseStateList.slice(
    props.currentPageFirstQuestionNumber - 1,
    props.currentPageLastQuestionNumber
  );

  // for bottom next button disabled - separate gender type question, input type question page
  if (props.question.No >= genderQuestionStartNumber) {
    if (selectedGender === MALE) {
      currentPageResponseList = currentPageResponseList.slice(0, 3);
    } else if (selectedGender === FEMALE) {
      currentPageResponseList = currentPageResponseList.slice(3);
    }

    // input type question(question number 26)
    if (props.question.No === lastInputQuestionNumber && SCOPA_ANSWER_NO_YES[1]) {
      const lastInputQuestionResponseStateList = props.responseStateList.slice(-4);
      currentPageResponseList = [...currentPageResponseList, ...lastInputQuestionResponseStateList];
    }
  }

  // for bottom next button disabled
  const nextBtnDisabledCondition = currentPageResponseList.includes('');

  // for show not-responded question "!" icon, not-responded question number message
  const [respondedCheckObject, setRespondedCheckObject] =
    useRecoilState<RespondedCheckObjectStateType>(props.respondedCheckObject);
  const surveyWithShortAnswersQuestionsPerPage = 5;
  // for input type question not-responded UI
  useEffect(() => {
    if (props.currentPageFirstQuestionNumber === 22) {
      const inputTypeQuestion = props.responseStateList.slice(23);
      const inputTypeQuestionAllResponded = !inputTypeQuestion.some((response) => response === '');

      inputTypeQuestionAllResponded &&
        setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
          return { ...prev, [24]: false };
        });
    }
  }, []);

  return (
    <li className={contentStyles['questions-li']}>
      {/* for explain question section text box */}
      {explainSectionList.map(
        (explain) =>
          props.question.No === explain.questionNumber && (
            <section
              className={
                props.question.No === lastInputQuestionNumber
                  ? `${contentStyles['explain-section']} ${contentStyles['last-input-question-explain-section-top-margin']}`
                  : contentStyles['explain-section']
              }
              key={uuidv4()}
            >
              <span className={contentStyles['explain-section-asterisk']}>
                <strong>*</strong>
              </span>
              {explain.element()}
            </section>
          )
      )}

      {props.question.No < genderQuestionStartNumber && (
        <NormalQuestion
          questionNumber={props.question.No}
          questionText={props.question.Q}
          questionExplain={props.question.EXPLAIN}
          questionAnswer={props.question.A}
          respondedCheckObject={respondedCheckObject}
          recoilStateRespondedCheckObject={props.respondedCheckObject}
        />
      )}

      {/* for gender questions (question number 22 - 25) */}
      {props.question.No >= genderQuestionStartNumber &&
        props.question.No < lastInputQuestionNumber && (
          <GenderQuestion
            questionNumber={props.question.No}
            questionText={props.question.Q}
            questionExplain={props.question.EXPLAIN}
            questionAnswer={props.question.A}
            respondedCheckObject={respondedCheckObject}
            recoilStateRespondedCheckObject={props.respondedCheckObject}
          />
        )}

      {/* for input type question (question number 26) */}
      {props.question.No === lastInputQuestionNumber && (
        <InputQuestion
          question={props.question}
          respondedCheckObject={respondedCheckObject}
          recoilStateRespondedCheckObject={props.respondedCheckObject}
        />
      )}

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
          surveyQuestionsPerPage={surveyWithShortAnswersQuestionsPerPage}
          // for scroll unresponded question when click disabled next button
          scrollIdKeyword={SURVEY_10_SCOPA_STATE_KEYWORD}
        />
      )}
    </li>
  );
}

interface NormalQuestionProps {
  questionNumber: number | string;
  questionText?: string;
  questionExplain?: string;
  respondedCheckObject: RespondedCheckObjectStateType;
  recoilStateRespondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
  questionAnswer?: string[];
}

function NormalQuestion(props: NormalQuestionProps) {
  return (
    <>
      <hr
        className={
          props.respondedCheckObject[props.questionNumber] ? styles['hr-not-responded'] : styles.hr
        }
        id={`scroll-${SURVEY_10_SCOPA_STATE_KEYWORD}-${props.questionNumber}`}
      />

      <header className={contentStyles['questions-title']}>
        <section className={contentStyles['question-title-text-section']}>
          <h4
            className={
              props.respondedCheckObject[props.questionNumber]
                ? contentStyles['not-responded-question-text']
                : ''
            }
          >
            {props.questionNumber}. {props.questionText}
          </h4>
          {props.respondedCheckObject[props.questionNumber] && <BsExclamationCircleFill />}
        </section>
        {/* for question explain text */}
        {props.questionExplain && (
          <span className={contentStyles['question-title-explain']}>
            <strong>* </strong>
            {props.questionExplain}
          </span>
        )}
      </header>

      <ul className={contentStyles['answers-ul']}>
        {props.questionAnswer?.map((answer) => (
          <AnswerList
            answer={answer}
            inputName={`${props.questionNumber}`}
            inputId={`${props.questionNumber}${answer}`}
            clickedQuestionNumber={`${props.questionNumber}`}
            surveyStateKeyword={SURVEY_10_SCOPA_STATE_KEYWORD}
            respondedCheckObject={props.recoilStateRespondedCheckObject}
            key={uuidv4()}
          />
        ))}
      </ul>
    </>
  );
}

interface GenderQuestionProps {
  questionNumber: number;
  questionText?: string;
  questionExplain?: string;
  respondedCheckObject: RespondedCheckObjectStateType;
  recoilStateRespondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
  questionAnswer?: string[];
}

function GenderQuestion(props: GenderQuestionProps) {
  const selectedGender = useRecoilValue(personalInfoGenderState);
  const maleAdditionalQuestionNumber = 23.5;
  const femaleQuestionStartNumber = 24;

  return (
    <>
      {/* for male question (question number 22, 23 ) */}
      {selectedGender === MALE && props.questionNumber < maleAdditionalQuestionNumber && (
        <NormalQuestion
          questionNumber={props.questionNumber}
          questionText={props.questionText}
          questionExplain={props.questionExplain}
          respondedCheckObject={props.respondedCheckObject}
          questionAnswer={props.questionAnswer}
          recoilStateRespondedCheckObject={props.recoilStateRespondedCheckObject}
        />
      )}
      {/* for male additional question (question number 23a ) */}
      {selectedGender === MALE && props.questionNumber === maleAdditionalQuestionNumber && (
        <NormalQuestion
          questionNumber={'23a'}
          questionText={props.questionText}
          questionExplain={props.questionExplain}
          respondedCheckObject={props.respondedCheckObject}
          questionAnswer={props.questionAnswer}
          recoilStateRespondedCheckObject={props.recoilStateRespondedCheckObject}
        />
      )}

      {/* for female question (question number 24, 25 ) */}
      {selectedGender === FEMALE && femaleQuestionStartNumber <= props.questionNumber && (
        <>
          {props.questionNumber === femaleQuestionStartNumber && (
            <div className={contentStyles['female-question-delete-margin-top']} />
          )}
          <NormalQuestion
            questionNumber={props.questionNumber}
            questionText={props.questionText}
            questionExplain={props.questionExplain}
            respondedCheckObject={props.respondedCheckObject}
            questionAnswer={props.questionAnswer}
            recoilStateRespondedCheckObject={props.recoilStateRespondedCheckObject}
          />
        </>
      )}
    </>
  );
}

interface InputQuestionProps {
  question: SurveyContentObjectType;
  respondedCheckObject: RespondedCheckObjectStateType;
  recoilStateRespondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
}

function InputQuestion(props: InputQuestionProps) {
  return (
    <>
      <hr
        className={
          props.respondedCheckObject[props.question.No] ? styles['hr-not-responded'] : styles.hr
        }
        id={`scroll-${SURVEY_10_SCOPA_STATE_KEYWORD}-${props.question.No}`}
      />

      <header className={contentStyles['questions-title']}>
        <section className={contentStyles['question-title-text-section']}>
          <h4
            className={
              props.respondedCheckObject[props.question.No]
                ? contentStyles['not-responded-question-text']
                : ''
            }
          >
            {props.question.No}.{props.question.Q}
          </h4>
          {props.respondedCheckObject[props.question.No] && <BsExclamationCircleFill />}
        </section>
      </header>

      <AnswerWithInput
        answerWithInput={props.question}
        answerWithInputTitleList={SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST}
        showInputCondition={SCOPA_ANSWER_NO_YES[1]}
        // for radio button checked
        clickedQuestionNumber={`${props.question.No}`}
        surveyStateKeyword={SURVEY_10_SCOPA_STATE_KEYWORD}
      />
    </>
  );
}
