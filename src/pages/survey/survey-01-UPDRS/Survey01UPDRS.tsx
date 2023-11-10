import { useEffect, useState } from 'react';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import PreQuestion from '../common/components/survey-contents/preQuestion/PreQuestion';
import SurveyContentWithMedicineEffect from '../common/components/survey-contents/survey-contents-with-medicine-effect/SurveyContent';
// states
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'; // useRecoilState,
import {
  survey01CurrentPageState,
  survey02CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey01UPDRS_responseSelector } from './survey01UPDRS.selector';
import { uploadedResponseStates } from 'pages/test/uploadedResponseDataStates/uploadedResponseData.state';
import { responseState } from '../common/states/surveyResponse.state';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  NOT_TAKE_MEDICINE,
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
  UPDRS_PRE_QUESTION,
  UPDRS_QUESTIONS,
  UPDRS_QUESTIONS_PER_PAGE,
} from './survey.const';
// hooks
import usePagination from '../common/hooks/usePagination';
// types
import {
  UploadedResponseDataGroupedListType,
  UploadedResponseDataListType,
} from 'pages/test/types/uploadedResponseData.type';
// styles
import styles from '../common/survey.module.scss';
import { v4 as uuidv4 } from 'uuid';

export default function Survey01UPDRS() {
  // pagination hook props
  const setNextSurveyPage = useSetRecoilState(survey02CurrentPageState);
  const prevSurveyTotalPages = 0;
  const currentPageState = survey01CurrentPageState;
  const questions = UPDRS_QUESTIONS;
  const questionsPerPage = UPDRS_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey01UPDRS_responseSelector);

  // for display questions only when answered pre-question
  const respondedPreQuestionResponse = responseStateList[0] !== '';

  // for get uploaded excel file response data
  const uploadedExcelFileRawData = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[1].TITLE)
  );

  // for make uploaded excel file pre-question response data to recoil state (localStorage)
  const [preQuestionResponseValue, setPreQuestionResponseValue] = useRecoilState(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)
  );
  // for pre-question radio button checked according to uploaded excel file response data
  const [uploadedExcelDataPreQuestionAnswer, setUploadedExcelDataPreQuestionAnswer] = useState('');

  // for separate uploaded excel file raw data according to pre question answer
  const [uploadedExcelFileDataList, setUploadedExcelFileDataList] = useState<
    UploadedResponseDataListType | UploadedResponseDataGroupedListType
  >([]);
  const uploadedExcelFilePreQuestion = uploadedExcelFileRawData[0];

  useEffect(() => {
    // for pre-question radio button checked according to uploaded excel file response data
    if (uploadedExcelFileRawData.length > 0 && preQuestionResponseValue.length === 0) {
      setUploadedExcelDataPreQuestionAnswer(uploadedExcelFileRawData[0].응답내용);
      setPreQuestionResponseValue(uploadedExcelFileRawData[0].응답내용);

      // for separate uploaded excel file raw data according to pre question answer
      // in case take medicine - uploadedExcelFileDataList setting
      if (uploadedExcelFilePreQuestion.응답내용 === NOT_TAKE_MEDICINE) {
        const excelFileDataWithoutPreQuestion = uploadedExcelFileRawData.slice(1);
        setUploadedExcelFileDataList(excelFileDataWithoutPreQuestion);
      }
      // in case not take medicine - uploadedExcelFileDataList setting
      if (uploadedExcelFilePreQuestion.응답내용 === TAKE_MEDICINE) {
        const questionGroupArray: UploadedResponseDataGroupedListType = [];
        for (let i = 1; i <= uploadedExcelFileRawData.length; i += 2) {
          const questionGroup: UploadedResponseDataListType = [
            uploadedExcelFileRawData[i],
            uploadedExcelFileRawData[i + 1],
          ];
          questionGroupArray.push(questionGroup);
        }
        setUploadedExcelFileDataList(questionGroupArray);
      }
    }
  }, []);

  const surveyExplain = (
    <p className={styles.explain}>
      총 {UPDRS_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[1].TITLE}에 관한
      설문입니다. <br />
      파킨슨병 약 복용 여부에 따라 설문이 다르게 구성되므로 하단 질문에 응답해 주세요.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[1].TITLE} subTitle={SURVEY_TITLE_LIST[1].SUB_TITLE} />
      {surveyExplain}

      {/* for pre-question */}
      <PreQuestion
        question={UPDRS_PRE_QUESTION}
        clickedQuestionNumber="pre"
        surveyStateKeyword={SURVEY_01_UPDRS_STATE_KEYWORD}
        // for edit checked uploaded excel file response button
        uploadedExcelDataPreQuestionAnswer={uploadedExcelDataPreQuestionAnswer}
        setUploadedExcelDataPreQuestionAnswer={setUploadedExcelDataPreQuestionAnswer}
      />

      {/* for display questions only when answered pre-question */}
      {respondedPreQuestionResponse && (
        <>
          {currentPageQuestions.map((question) => (
            <SurveyContentWithMedicineEffect
              question={question}
              surveyStateKeyword={SURVEY_01_UPDRS_STATE_KEYWORD}
              // for bottom prev/next button
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              // for bottom next button disabled
              currentPageFirstQuestionNumber={currentPageQuestions[0].No}
              currentPageLastQuestionNumber={
                currentPageQuestions[currentPageQuestions.length - 1].No
              }
              responseStateList={responseStateList}
              // for apply uploaded excel file progress
              uploadedExcelFileDataList={uploadedExcelFileDataList}
              uploadedExcelDataPreQuestionAnswer={uploadedExcelDataPreQuestionAnswer}
              key={uuidv4()}
            />
          ))}
        </>
      )}
    </article>
  );
}
