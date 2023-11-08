import { useEffect, useState } from 'react';
// components
import AnswerList from '../answerList/AnswerList';
import AnswerWithInput from '../answerWithInput/AnswerWithInput';
import BottomPrevNextButton from '../../bottom-prev-next-button/BottomPrevNextButton';
// states
import { useRecoilState } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// hooks
import useClickedRadioBtnChecked from 'pages/survey/common/hooks/useClickedRadioBtnChecked';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { UploadedResponseDataType } from 'pages/test/types/uploadedResponseData.type';
// styles
import styles from 'pages/survey/common/survey.module.scss';
import contentStyles from './surveyContent.module.scss';
import { v4 as uuidv4 } from 'uuid';

type ImageSelectAnswerListType = { key: number; imgSrc: string; explain: string; alt: string }[];

interface SurveyContentWithShortAnswersProps {
  question: SurveyContentObjectType;

  // for radio button checked
  surveyStateKeyword: string;

  // for bottom prev/next pagination button
  handlePrevPage: () => void;
  handleNextPage: () => void;
  // for bottom next button disabled
  currentPageFirstQuestionNumber: number;
  currentPageLastQuestionNumber: number;
  responseStateList: string[];

  // for apply uploaded excel file progress
  uploadedExcelFileDataList: UploadedResponseDataType[];

  // for survey-05-RBD bottom next button disabled
  havePreQuestion?: boolean;
  // for survey-10-SCOPA explain text box option, categorized questions, input type question
  explainSectionList?: { questionNumber: number; element: () => JSX.Element }[];
  categorizedQuestionList?: SurveyContentObjectType[];
  questionWithInput?: SurveyContentObjectType;
  answerWithInputTitleList?: string[];
  showInputCondition?: string;
  // for survey-11-Constipation image select option
  imageSelectAnswersNo?: number;
  imageSelectAnswersList?: ImageSelectAnswerListType;
}

// survey-05-RBD, survey-10-SCOPA, survey-11-Constipation
export default function SurveyContentWithShortAnswers(props: SurveyContentWithShortAnswersProps) {
  // for bottom next button disabled
  let currentPageResponseList = props.responseStateList.slice(
    props.currentPageFirstQuestionNumber - 1,
    props.currentPageLastQuestionNumber
  );
  if (props.havePreQuestion) {
    currentPageResponseList = props.responseStateList;
  }
  // for survey-10-SCOPA input type question(question number 24)
  if (props.question.No === 24 && props.showInputCondition) {
    currentPageResponseList = props.responseStateList.slice(
      props.currentPageFirstQuestionNumber - 1
    );
  }

  const nextBtnDisabledCondition = currentPageResponseList.includes('');

  // for create responseState when uploaded excel file exist
  const [responseValue, setResponseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}`)
  );

  // for radio button checked according to uploaded excel file progress
  const [uploadedExcelDataAnswer, setUploadedExcelDataAnswer] = useState('');
  useEffect(() => {
    if (props.uploadedExcelFileDataList.length > 0 && responseValue.length === 0) {
      if (props.havePreQuestion) {
        // for survey-05-RBD pre question index setting
        setUploadedExcelDataAnswer(props.uploadedExcelFileDataList[props.question.No].응답내용);
        setResponseValue(props.uploadedExcelFileDataList[props.question.No].응답내용);
      } else {
        // for not have pre question page index setting
        setUploadedExcelDataAnswer(props.uploadedExcelFileDataList[props.question.No - 1].응답내용);
        setResponseValue(props.uploadedExcelFileDataList[props.question.No - 1].응답내용);
      }
    }
  }, []);

  return (
    <li className={contentStyles['questions-li']}>
      {/* for explain question section text box */}
      {props.explainSectionList &&
        props.explainSectionList.map(
          (explain) =>
            props.question.No === explain.questionNumber && (
              <section className={contentStyles['explain-section']} key={uuidv4()}>
                <span className={contentStyles['explain-section-asterisk']}>
                  <strong>*</strong>
                </span>
                {explain.element()}
              </section>
            )
        )}

      <hr className={styles.hr} />

      <header className={contentStyles['questions-title']}>
        <h4>
          {props.question.No}. {props.question.Q}
          {/* for additional categorized question (according to specific conditions) */}
          {props.categorizedQuestionList?.map(
            (categorizedQuestion) =>
              props.question.No === categorizedQuestion.No && categorizedQuestion.Q
          )}
          {/* for with input type question */}
          {props.question.No === props.questionWithInput?.No && props.questionWithInput.Q}
        </h4>
        {/* for question explain text */}
        {props.question.EXPLAIN && (
          <span className={contentStyles['question-title-explain']}>
            <strong>* </strong>
            {props.question.EXPLAIN}
          </span>
        )}
      </header>

      <ul className={contentStyles['answers-ul']}>
        {props.question.A?.map((answer) => (
          <AnswerList
            answer={answer}
            inputName={`${props.question.No}`}
            inputId={`${props.question.No}${answer}`}
            clickedQuestionNumber={`${props.question.No}`}
            surveyStateKeyword={props.surveyStateKeyword}
            // for apply uploaded excel file progress
            setUploadedExcelDataAnswer={setUploadedExcelDataAnswer}
            uploadedExcelDataAnswer={uploadedExcelDataAnswer}
            key={uuidv4()}
          />
        ))}

        {/* for additional categorized question (according to specific conditions) */}
        {props.categorizedQuestionList?.map(
          (categorizedList) =>
            props.question.No === categorizedList.No &&
            categorizedList.A?.map((categorizedAnswer) => (
              <AnswerList
                answer={categorizedAnswer}
                inputName={`${props.question.No}`}
                inputId={`${props.question.No}${categorizedAnswer}`}
                // for radio button checked
                clickedQuestionNumber={`${props.question.No}`}
                surveyStateKeyword={props.surveyStateKeyword}
                // for apply uploaded excel file progress
                setUploadedExcelDataAnswer={setUploadedExcelDataAnswer}
                uploadedExcelDataAnswer={uploadedExcelDataAnswer}
                key={uuidv4()}
              />
            ))
        )}
      </ul>
      {/* for with input type answer */}
      {props.question.No === props.questionWithInput?.No &&
        props.answerWithInputTitleList &&
        props.showInputCondition && (
          // TO DO: survey-10-SCOPA input type 마지막 질문 엑셀 반영
          <AnswerWithInput
            answerWithInput={props.questionWithInput}
            answerWithInputTitleList={props.answerWithInputTitleList}
            showInputCondition={props.showInputCondition}
            // for radio button checked
            clickedQuestionNumber={`${props.question.No}`}
            surveyStateKeyword={props.surveyStateKeyword}
          />
        )}

      {/* for image select type */}
      {props.imageSelectAnswersNo &&
        props.question.No === props.imageSelectAnswersNo &&
        props.imageSelectAnswersList && (
          <ImageSelectAnswers
            imageSelectAnswersList={props.imageSelectAnswersList}
            surveyStateKeyword={props.surveyStateKeyword}
            clickedQuestionNumber={`${props.question.No}`}
          />
        )}

      {/* bottom prev/next pagination buttons */}
      {props.question.No === props.currentPageLastQuestionNumber && (
        <BottomPrevNextButton
          handleNextPage={props.handleNextPage}
          handlePrevPage={props.handlePrevPage}
          nextBtnDisabledCondition={nextBtnDisabledCondition}
        />
      )}
    </li>
  );
}

interface ImageSelectAnswersProps {
  imageSelectAnswersList: ImageSelectAnswerListType;
  surveyStateKeyword: string;
  clickedQuestionNumber: string;
}

function ImageSelectAnswers(props: ImageSelectAnswersProps) {
  const surveyStateKeyword = props.surveyStateKeyword;
  const clickedQuestionNumber = props.clickedQuestionNumber;
  const { responseValue, handleRadioBtnChange } = useClickedRadioBtnChecked({
    surveyStateKeyword,
    clickedQuestionNumber,
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
            value={imageList.alt}
            checked={responseValue === imageList.alt}
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
