// states
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  survey04CurrentPageState,
  survey05CurrentPageState,
  survey06CurrentPageState,
} from '../common/surveyPaginationStates';
import { survey05RBD_responseSelector } from './survey05RBD.selector';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  RBD_PRE_QUESTION,
  RBD_QUESTIONS,
  RBD_QUESTIONS_PER_PAGE,
  SURVEY_05_RBD_STATE_KEYWORD,
} from './survey.const';
import { SURVEY_04_BDI_TOTAL_PAGES } from '../survey-04-BDI/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import PreQuestion from '../common/components/survey-contents/preQuestion/PreQuestion';
import SurveyContentWithShortAnswers from '../common/components/survey-contents/survey-contents-with-short-answers/SurveyContent';
// hooks
import usePagination from '../common/hooks/usePagination';
// styles
import styles from '../common/survey.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { uploadedResponseStates } from 'pages/test/uploadedResponseDataStates/uploadedResponseData.state';
import { useEffect, useState } from 'react';
import { responseState } from '../common/states/surveyResponse.state';

export default function Survey05RBD() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey04CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey06CurrentPageState);
  const prevSurveyTotalPages = SURVEY_04_BDI_TOTAL_PAGES;
  const currentPageState = survey05CurrentPageState;
  const questions = RBD_QUESTIONS;
  const questionsPerPage = RBD_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  // for bottom next button disabled
  const responseStateList = useRecoilValue(survey05RBD_responseSelector);

  // for apply uploaded excel file progress
  const uploadedExcelFileDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[5].TITLE)
  );

  // for pre-question radio button checked according to uploaded excel file progress
  const [responseValue, setResponseValue] = useRecoilState(
    responseState(`${SURVEY_05_RBD_STATE_KEYWORD}-pre`)
  );
  const [uploadedExcelDataPreQuestionAnswer, setUploadedExcelDataPreQuestionAnswer] = useState('');
  useEffect(() => {
    if (uploadedExcelFileDataList.length > 0 && responseValue.length === 0) {
      setUploadedExcelDataPreQuestionAnswer(uploadedExcelFileDataList[0].응답내용);
      setResponseValue(uploadedExcelFileDataList[0].응답내용);
    }
  }, []);

  const surveyExplain = (
    <p className={styles.explain}>
      총 {RBD_QUESTIONS.length}개의 문항으로 이루어진 {SURVEY_TITLE_LIST[5].TITLE}에 관한
      설문입니다.
    </p>
  );

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[5].TITLE} subTitle={SURVEY_TITLE_LIST[5].SUB_TITLE} />
      {surveyExplain}

      {/* for pre-question */}
      <PreQuestion
        question={RBD_PRE_QUESTION}
        // for radio button checked
        clickedQuestionNumber="pre"
        surveyStateKeyword={SURVEY_05_RBD_STATE_KEYWORD}
        // for apply uploaded excel file progress
        uploadedExcelDataPreQuestionAnswer={uploadedExcelDataPreQuestionAnswer}
        setUploadedExcelDataPreQuestionAnswer={setUploadedExcelDataPreQuestionAnswer}
      />

      <ul>
        {currentPageQuestions.map((question) => (
          <SurveyContentWithShortAnswers
            question={question}
            surveyStateKeyword={SURVEY_05_RBD_STATE_KEYWORD}
            // for bottom prev/next button
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            // for bottom next button disabled
            currentPageFirstQuestionNumber={currentPageQuestions[0].No}
            currentPageLastQuestionNumber={currentPageQuestions[currentPageQuestions.length - 1].No}
            responseStateList={responseStateList}
            havePreQuestion={true}
            // for apply uploaded excel file progress
            uploadedExcelFileDataList={uploadedExcelFileDataList}
            key={uuidv4()}
          />
        ))}
      </ul>
    </article>
  );
}
