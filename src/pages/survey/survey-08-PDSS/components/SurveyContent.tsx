import { useEffect, useState } from 'react';
// components
import BottomPrevNextButton from '../../common/components/bottom-prev-next-button/BottomPrevNextButton';
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

interface SurveyContentDegreeGradationProps {
  question: SurveyContentObjectType;
  answers: string[];
  exceptionalAnswers?: string[];
  exceptionalNo?: number;

  // for bottom prev/next pagination button
  handlePrevPage: () => void;
  handleNextPage: () => void;
  // for bottom next button disabled
  currentPageFirstQuestionNumber: number;
  currentPageLastQuestionNumber: number;
  responseStateList: string[];

  // for apply uploaded excel file progress
  uploadedExcelFileDataList: UploadedResponseDataType[];

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
    <article className={styles['survey-content-container']}>
      <h3 className={styles['question-h3']}>
        {props.question.No}. {props.question.Q}
      </h3>
      <ul className={styles['degrees-container-ul']}>
        {degreesList.map((degree) => (
          <li className={styles['degree-container-li']} key={uuidv4()}>
            <DegreeBtn
              questionNumber={props.question.No}
              surveyStateKeyword={props.surveyStateKeyword}
              degree={degree}
              // for apply uploaded excel file progress
              setUploadedExcelDataAnswer={setUploadedExcelDataAnswer}
              uploadedExcelDataAnswer={uploadedExcelDataAnswer}
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
        />
      )}
    </article>
  );
}

interface DegreeBtnProps {
  questionNumber: number;
  surveyStateKeyword: string;
  degree: number;

  // for apply uploaded excel file progress
  uploadedExcelDataAnswer: string;
  setUploadedExcelDataAnswer: React.Dispatch<React.SetStateAction<string>>;
}

function DegreeBtn(props: DegreeBtnProps) {
  const surveyStateKeyword = props.surveyStateKeyword;
  const clickedQuestionNumber = `${props.questionNumber}`;
  const { responseValue, handleRadioBtnChange } = useClickedRadioBtnChecked({
    surveyStateKeyword,
    clickedQuestionNumber,
  });

  // for unchecked uploaded excel file progress checked state when edit response
  useEffect(() => {
    responseValue.length > 0 && props.setUploadedExcelDataAnswer('');
  }, [responseValue]);

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
