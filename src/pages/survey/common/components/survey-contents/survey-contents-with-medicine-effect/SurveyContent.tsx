import { useEffect, useState } from 'react';
// components
import AnswerList from '../answerList/AnswerList';
import BottomPrevNextButton from '../../bottom-prev-next-button/BottomPrevNextButton';
// states
import { useRecoilState, useRecoilValue } from 'recoil';
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
// styles
import styles from './surveyContent.module.scss';
import { v4 as uuidv4 } from 'uuid';
import {
  UploadedResponseDataGroupedListType,
  UploadedResponseDataListType,
  UploadedResponseDataType,
} from 'pages/test/types/uploadedResponseData.type';

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

  // for apply uploaded excel file progress
  uploadedExcelFileDataList: UploadedResponseDataListType | UploadedResponseDataGroupedListType;
  preQuestionResponseValue: string;
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

  // for create responseState when uploaded excel file exist
  // not take medicine
  const [notTakeMedicine_responseValue, setNotTakeMedicine_responseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}`)
  );
  // take medicine - when have medicine effect
  const [medicineEffectTrue_responseValue, setMedicineEffectTrue_responseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}-${MEDICINE_EFFECT_TRUE}`)
  );
  // take medicine - when no medicine effect
  const [medicineEffectFalse_responseValue, setMedicineEffectFalse_responseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}-${MEDICINE_EFFECT_FALSE}`)
  );

  console.log(`문항번호: ${props.question.No}`);

  // for radio button checked according to uploaded excel file progress
  const [uploadedExcelDataAnswer, setUploadedExcelDataAnswer] = useState('');
  useEffect(() => {
    if (props.uploadedExcelFileDataList.length > 0) {
      if (
        // not take medicine
        props.preQuestionResponseValue === NOT_TAKE_MEDICINE
      ) {
        const uploadedExcelDataResponse = props.uploadedExcelFileDataList[
          props.question.No
        ] as UploadedResponseDataType;
        if (uploadedExcelDataResponse !== undefined) {
          setNotTakeMedicine_responseValue(uploadedExcelDataResponse.응답내용);
          setUploadedExcelDataAnswer(uploadedExcelDataResponse.응답내용);
        }
      } else if (
        // take medicine
        props.preQuestionResponseValue === TAKE_MEDICINE &&
        Array.isArray(props.uploadedExcelFileDataList[props.question.No - 1])
      ) {
        if (medicineEffectTrue_responseValue.length === 0) {
          // take medicine - when have medicine effect
          const uploadedExcelDataResponse: UploadedResponseDataGroupedListType =
            props.uploadedExcelFileDataList[props.question.No - 1];
          if (uploadedExcelDataResponse !== undefined && uploadedExcelDataResponse.length > 0) {
            setMedicineEffectTrue_responseValue(uploadedExcelDataResponse[0].응답내용);
            setUploadedExcelDataAnswer(uploadedExcelDataResponse[0].응답내용);
          }
        }
        if (medicineEffectFalse_responseValue.length === 0) {
          // take medicine - when no medicine effect
          const uploadedExcelDataResponse: UploadedResponseDataGroupedListType =
            props.uploadedExcelFileDataList[props.question.No - 1];
          if (uploadedExcelDataResponse !== undefined && uploadedExcelDataResponse.length > 0) {
            setMedicineEffectFalse_responseValue(uploadedExcelDataResponse[1].응답내용);
            setUploadedExcelDataAnswer(uploadedExcelDataResponse[1].응답내용);
          }
        }
      }
    }
  }, []);

  return (
    <article className={styles['survey-content-container']}>
      <hr />
      <h3 className={styles['question']}>
        {props.question.No}. {props.question.Q}
      </h3>

      <div className={styles['answer-container']}>
        {takeMedicineResponse === TAKE_MEDICINE ? (
          <>
            {medicineDivisionList.map((list) => (
              <div key={uuidv4()}>
                <h3 className={styles['medicine-text']}>
                  파킨슨병 약의 효과가{' '}
                  <span className={styles['medicine-text-emphasize']}>{list.text}</span> 때 아래
                  설문에 답변해 주세요.
                </h3>
                {props.question.A && (
                  <AnswersUnorderedList
                    answersList={props.question.A}
                    inputName={`${props.question.No}${list.radioBtnKeyword}`}
                    questionNumber={`${props.question.No}-${list.radioBtnKeyword}`}
                    surveyStateKeyword={props.surveyStateKeyword}
                    // for apply uploaded excel file progress
                    setUploadedExcelDataAnswer={setUploadedExcelDataAnswer}
                    uploadedExcelDataAnswer={uploadedExcelDataAnswer}
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
                // for apply uploaded excel file progress
                setUploadedExcelDataAnswer={setUploadedExcelDataAnswer}
                uploadedExcelDataAnswer={uploadedExcelDataAnswer}
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
        />
      )}
    </article>
  );
}

interface AnswersUnorderedListProps {
  questionNumber: string;
  surveyStateKeyword: string;

  answersList: string[];
  inputName: string;

  // for apply uploaded excel file progress
  uploadedExcelDataAnswer: string;
  setUploadedExcelDataAnswer: React.Dispatch<React.SetStateAction<string>>;
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
          // for apply uploaded excel file progress
          uploadedExcelDataAnswer={props.uploadedExcelDataAnswer}
          setUploadedExcelDataAnswer={props.setUploadedExcelDataAnswer}
          key={uuidv4()}
        />
      ))}
    </ul>
  );
}
