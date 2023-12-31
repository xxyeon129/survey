import { RecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import AnswerList from '../answerList/AnswerList_forExcel';
import BottomPrevNextButton from '../../bottom-prev-next-button/BottomPrevNextButton';
// hooks
import useClickedRadioBtnChecked from 'pages/survey/common/hooks/useClickedRadioBtnChecked';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { RespondedCheckObjectStateType } from 'pages/survey/common/types/respondedCheckObjectState.types';
// styles
import { BsExclamationCircleFill } from 'react-icons/bs';
import styles from 'pages/survey/common/survey.module.scss';
import contentStyles from './surveyContent.module.scss';

type ImageSelectAnswerListType = { key: number; imgSrc: string; explain: string; alt: string }[];

interface SurveyContentWithShortAnswersProps {
  question: SurveyContentObjectType;

  // for radio button checked, scroll unresponded question
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

  // for survey-05-RBD bottom next button disabled
  havePreQuestion?: boolean;
  // for survey-11-Constipation image select option
  imageSelectAnswersNo?: number;
  imageSelectAnswersList?: ImageSelectAnswerListType;
}

// survey-05-RBD, survey-11-Constipation
export default function SurveyContentWithShortAnswers(props: SurveyContentWithShortAnswersProps) {
  // for bottom next button disabled
  let currentPageResponseList = props.responseStateList.slice(
    props.currentPageFirstQuestionNumber - 1,
    props.currentPageLastQuestionNumber
  );
  if (props.havePreQuestion) {
    currentPageResponseList = props.responseStateList;
  }

  const nextBtnDisabledCondition = currentPageResponseList.includes('');

  // for show not-responded question "!" icon, not-responded question number message
  const respondedCheckObject = useRecoilValue<RespondedCheckObjectStateType>(
    props.respondedCheckObject
  );
  const surveyWithShortAnswersQuestionsPerPage = 5;

  return (
    <li className={contentStyles['questions-li']}>
      <hr
        className={respondedCheckObject[props.question.No] ? styles['hr-not-responded'] : styles.hr}
        id={`scroll-${props.surveyStateKeyword}-${props.question.No}`}
      />

      <header className={contentStyles['questions-title']}>
        <section className={contentStyles['question-title-text-section']}>
          <h4
            className={
              respondedCheckObject[props.question.No]
                ? contentStyles['not-responded-question-text']
                : ''
            }
          >
            {props.question.No}. {props.question.Q}
          </h4>

          {/* not responded icon */}
          {respondedCheckObject[props.question.No] && <BsExclamationCircleFill />}
        </section>
        {/* for question explain text */}
        {props.question.EXPLAIN && (
          <span className={contentStyles['question-title-explain']}>
            <strong>* </strong>
            {props.question.EXPLAIN}
          </span>
        )}
      </header>

      <ul className={contentStyles['answers-ul']}>
        {props.question.A?.map(
          (answer) =>
            props.question.A && (
              <AnswerList
                answer={answer}
                inputName={`${props.question.No}`}
                inputId={`${props.question.No}${answer}`}
                clickedQuestionNumber={`${props.question.No}`}
                surveyStateKeyword={props.surveyStateKeyword}
                // for show not-responded question "!" icon, not-responded question number message
                respondedCheckObject={props.respondedCheckObject}
                // for excel file number value
                answersList={props.question.A}
                key={uuidv4()}
              />
            )
        )}
      </ul>

      {/* for image select type */}
      {props.imageSelectAnswersNo &&
        props.question.No === props.imageSelectAnswersNo &&
        props.imageSelectAnswersList && (
          <ImageSelectAnswers
            imageSelectAnswersList={props.imageSelectAnswersList}
            surveyStateKeyword={props.surveyStateKeyword}
            clickedQuestionNumber={`${props.question.No}`}
            // for hide question right not-responded "!" icon when checked
            respondedCheckObject={props.respondedCheckObject}
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
          scrollIdKeyword={props.surveyStateKeyword}
          // for survey-05-RBD
          havePreQuestion={props.havePreQuestion}
        />
      )}
    </li>
  );
}

interface ImageSelectAnswersProps {
  imageSelectAnswersList: ImageSelectAnswerListType;
  surveyStateKeyword: string;
  clickedQuestionNumber: string;

  // for hide question right not-responded "!" icon when checked
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
}

function ImageSelectAnswers(props: ImageSelectAnswersProps) {
  const surveyStateKeyword = props.surveyStateKeyword;
  const clickedQuestionNumber = props.clickedQuestionNumber;
  // for hide question right not-responded "!" icon when checked
  const respondedCheckObject = props.respondedCheckObject;
  const { responseValue, handleRadioBtnChange } = useClickedRadioBtnChecked({
    surveyStateKeyword,
    clickedQuestionNumber,
    // for hide question right not-responded "!" icon when checked
    respondedCheckObject,
  });

  return (
    <ul className={contentStyles['img-answers-ul']}>
      {props.imageSelectAnswersList.map((imageList) => (
        <li className={contentStyles['img-answer-li']} key={uuidv4()}>
          <input
            type="radio"
            id={`img-answer-${imageList.key}`}
            name="img-answer"
            onChange={handleRadioBtnChange}
            value={`${imageList.key}`}
            checked={responseValue === `${imageList.key}`}
          />
          <label htmlFor={`img-answer-${imageList.key}`}>
            <figure>
              <img
                className={contentStyles['img-answer-img']}
                src={imageList.imgSrc}
                alt={imageList.alt}
              />
              <figcaption>{imageList.explain}</figcaption>
            </figure>
            <div className={contentStyles['radio-button']}>
              <div className={contentStyles['radio-button-checked-circle']} />
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
}
