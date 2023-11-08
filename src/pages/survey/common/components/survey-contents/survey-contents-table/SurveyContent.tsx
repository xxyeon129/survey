import { useEffect, useState } from 'react';
// components
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
import styles from './surveyContent.module.scss';
import { v4 as uuidv4 } from 'uuid';

interface SurveyContentTableProps {
  questions: SurveyContentObjectType[];
  answers: string[];
  radioBtnValues: string[];

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

  // for survey-07-PDQ
  additionalCheckQuestionNo?: number;
  additionalCheckQuestion?: string;
  // for survey-12-FOOD
  questionExplain?: boolean;
  nonGradationStyle?: boolean;
}

// survey-03-BAI, survey-07-PDQ, survey-09-Tired, survey-12-Food
export default function SurveyContentTable(props: SurveyContentTableProps) {
  // for bottom next button disabled
  const currentPageResponseList = props.responseStateList.slice(
    props.currentPageFirstQuestionNumber - 1,
    props.currentPageLastQuestionNumber
  );
  const nextBtnDisabledCondition = currentPageResponseList.includes('');

  const answersHeaderCell = props.answers.map((answerText) => (
    <th className={styles['answers-table-header-text']} key={uuidv4()}>
      {answerText}
    </th>
  ));

  return (
    <article className={styles['survey-content-container']}>
      <table>
        <thead>
          <tr className={styles['answers-table-row']}>
            <th></th>
            {answersHeaderCell}
          </tr>
        </thead>

        <tbody>
          {props.questions.map((question) => (
            <QuestionsTableRow
              question={question}
              radioBtnValues={props.radioBtnValues}
              surveyStateKeyword={props.surveyStateKeyword}
              uploadedExcelFileDataList={props.uploadedExcelFileDataList}
              // for survey-07-PDQ
              additionalCheckQuestionNo={props.additionalCheckQuestionNo}
              additionalCheckQuestion={props.additionalCheckQuestion}
              // for survey-12-FOOD
              questionExplain={props.questionExplain}
              nonGradationStyle={props.nonGradationStyle}
              key={uuidv4()}
            />
          ))}
        </tbody>
      </table>

      {/* bottom prev/next pagination buttons */}
      {props.questions.map(
        (question) =>
          question.No === props.currentPageLastQuestionNumber && (
            <BottomPrevNextButton
              handleNextPage={props.handleNextPage}
              handlePrevPage={props.handlePrevPage}
              nextBtnDisabledCondition={nextBtnDisabledCondition}
            />
          )
      )}
    </article>
  );
}

interface QuestionsTableRowProps {
  question: SurveyContentObjectType;
  radioBtnValues: string[];

  // for radio button checked
  surveyStateKeyword: string;

  // for apply uploaded excel file progress
  uploadedExcelFileDataList: UploadedResponseDataType[];

  // for survey-07-PDQ
  additionalCheckQuestionNo?: number;
  additionalCheckQuestion?: string;
  // for survey-12-FOOD
  questionExplain?: boolean;
  nonGradationStyle?: boolean;
}

function QuestionsTableRow(props: QuestionsTableRowProps) {
  // for create responseState when uploaded excel file exist
  const [responseValue, setResponseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}`)
  );

  // for radio button checked according to uploaded excel file progress
  const [uploadedExcelDataAnswer, setUploadedExcelDataAnswer] = useState('');
  useEffect(() => {
    if (props.uploadedExcelFileDataList.length > 0 && responseValue.length === 0) {
      setUploadedExcelDataAnswer(props.uploadedExcelFileDataList[props.question.No - 1].응답내용);
      setResponseValue(props.uploadedExcelFileDataList[props.question.No - 1].응답내용);
    }
  }, []);

  return (
    <tr className={styles['questions-table-row']} key={uuidv4()}>
      {/* question */}
      <th className={styles['questions-table-header-text']}>
        <p className={styles['questions-table-header-text-p']}>
          {props.question.No}. {props.question.Q}
          {/* for survey-12-FOOD question explain text */}
          {props.questionExplain && (
            <p className={styles['question-table-header-text-explain']}>
              {props.question.EXPLAIN && `(${props.question.EXPLAIN})`}
            </p>
          )}
        </p>

        {/* for survey-07-PDQ additional question */}
        {props.additionalCheckQuestionNo &&
          props.additionalCheckQuestion &&
          props.additionalCheckQuestionNo === props.question.No && (
            <AdditionalCheckQuestion
              additionalCheckQuestionNo={props.additionalCheckQuestionNo}
              additionalCheckQuestion={props.additionalCheckQuestion}
              surveyStateKeyword={props.surveyStateKeyword}
            />
          )}
      </th>
      {/* radio buttons */}
      {props.radioBtnValues.map((radioBtnValue) =>
        props.nonGradationStyle ? (
          <TableRadioBtn
            surveyStateKeyword={props.surveyStateKeyword}
            clickedQuestionNumber={props.question.No}
            radioBtnValue={radioBtnValue}
            nonGradationStyle={props.nonGradationStyle}
            // for apply uploaded excel file progress
            setUploadedExcelDataAnswer={setUploadedExcelDataAnswer}
            uploadedExcelDataAnswer={uploadedExcelDataAnswer}
          />
        ) : (
          <TableRadioBtn
            surveyStateKeyword={props.surveyStateKeyword}
            clickedQuestionNumber={props.question.No}
            radioBtnValue={radioBtnValue}
            // for apply uploaded excel file progress
            setUploadedExcelDataAnswer={setUploadedExcelDataAnswer}
            uploadedExcelDataAnswer={uploadedExcelDataAnswer}
          />
        )
      )}
    </tr>
  );
}

interface TableRadioBtnProps {
  surveyStateKeyword: string;
  clickedQuestionNumber: number;
  radioBtnValue: string;

  // for apply uploaded excel file progress
  uploadedExcelDataAnswer: string;
  setUploadedExcelDataAnswer: React.Dispatch<React.SetStateAction<string>>;

  // for survey-12-FOOD
  nonGradationStyle?: boolean;
}

function TableRadioBtn(props: TableRadioBtnProps) {
  // for radio button checked
  const surveyStateKeyword = props.surveyStateKeyword;
  const clickedQuestionNumber = `${props.clickedQuestionNumber}`;
  const { responseValue, handleRadioBtnChange } = useClickedRadioBtnChecked({
    surveyStateKeyword,
    clickedQuestionNumber,
  });

  // for unchecked uploaded excel file progress checked state when edit response
  useEffect(() => {
    responseValue.length > 0 && props.setUploadedExcelDataAnswer('');
  }, [responseValue]);

  return (
    <td className={styles['question-td-radio-button-container']} key={uuidv4()}>
      <input
        type="radio"
        id={`${props.clickedQuestionNumber}${props.radioBtnValue}`}
        name={`${props.clickedQuestionNumber}`}
        value={props.radioBtnValue}
        onChange={handleRadioBtnChange}
        checked={responseValue === props.radioBtnValue}
      />
      <label htmlFor={`${props.clickedQuestionNumber}${props.radioBtnValue}`}>
        <div
          className={
            props.nonGradationStyle ? styles['non-gradtion-radio-button'] : styles['radio-button']
          }
        >
          <div
            className={
              props.nonGradationStyle
                ? styles['non-radio-button-checked-circle']
                : styles['radio-button-checked-circle']
            }
          />
        </div>
      </label>
    </td>
  );
}

interface AdditionalCheckQuestionProps {
  additionalCheckQuestionNo: number;
  additionalCheckQuestion: string;
  // for bottom next button disabled
  surveyStateKeyword: string;
}

function AdditionalCheckQuestion(props: AdditionalCheckQuestionProps) {
  // for radio button checked
  const surveyStateKeyword = props.surveyStateKeyword;
  const clickedQuestionNumber = `${props.additionalCheckQuestionNo}`;
  const { responseValue, handleRadioBtnChange } = useClickedRadioBtnChecked({
    surveyStateKeyword,
    clickedQuestionNumber,
  });

  return (
    <label className={styles['additional-question']} htmlFor="additional-question">
      * {props.additionalCheckQuestion}{' '}
      <input
        className={styles['additional-question-input']}
        type="radio"
        name={`${props.additionalCheckQuestionNo}`}
        value="배우자나 같이 사는 사람이 없음"
        onChange={handleRadioBtnChange}
        checked={responseValue === '배우자나 같이 사는 사람이 없음'}
        id="survey-07-PDQ-additional-question"
      />
    </label>
  );
}
