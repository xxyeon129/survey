import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// components
import AnswerList from 'pages/survey/common/components/survey-contents/answerList/AnswerList';
import BottomPrevNextButton from 'pages/survey/common/components/bottom-prev-next-button/BottomPrevNextButton';
// states
import { RecoilState, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { questionScoreState } from '../survey06NMS.state';
import { respondedCheckObject06NMS } from 'pages/survey/common/states/respondedCheckObjects.state';
// constants
import {
  NMS_ANSWER_DEGREE,
  NMS_ANSWER_DEGREE_EXPLAIN_TEXT_LIST,
  NMS_ANSWER_FREQUENCY,
  NMS_ANSWER_FREQUENCY_EXPLAIN_TEXT_LIST,
  NMS_QUESTIONS_PER_PAGE,
  SURVEY_06_NMS_STATE_KEYWORD,
} from '../survey.const';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
// hooks
import useGetSectionScore from '../hooks/useGetSectionScore';
import useGetTotalScore from '../hooks/useGetTotalScroe';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { ExplainTextObjectType } from '../survey06NMS.type';
import { RespondedCheckObjectStateType } from 'pages/survey/common/types/respondedCheckObjectState.types';
// styles
import { BsExclamationCircleFill } from 'react-icons/bs';
import styles from './surveyContentWithScore.module.scss';

interface SurveyContentWithScoreProps {
  question: SurveyContentObjectType;
  surveyStateKeyword: string;

  // for total sum score
  lastQuestionNumber: number;

  // for bottom prev/next pagination button
  handlePrevPage: () => void;
  handleNextPage: () => void;
  // for bottom next button disabled
  currentPageFirstQuestionNumber: number;
  currentPageLastQuestionNumber: number;
  responseStateList: string[];
}

export default function SurveyContentWithScore(props: SurveyContentWithScoreProps) {
  const sectionNumber = props.question.section?.number;
  // for score
  const questionScore = useRecoilValue(questionScoreState(props.question.No));
  const sectionScore = useGetSectionScore(sectionNumber);
  const totalScore = useGetTotalScore();

  // for bottom next button disabled
  const currentPageResponseList = props.responseStateList.slice(
    props.currentPageFirstQuestionNumber - 1,
    props.currentPageLastQuestionNumber
  );

  const nextBtnDisabledCondition = currentPageResponseList.includes('-');

  // for display section title, section total score
  const surveySectionFirstQuestionNumber = props.question.section?.questionNumberList[0];
  const surveySectionLastQuestionNumber =
    props.question.section?.questionNumberList[
      props.question.section?.questionNumberList.length - 1
    ];

  // for show not-responded question "!" icon, not-responded question number message
  const respondedCheckObject = respondedCheckObject06NMS;
  const respondedCheckObjectValue = useRecoilValue(respondedCheckObject06NMS);

  const currentPageQuestionNumberList: number[] = [];
  for (
    let questionNumber = props.currentPageFirstQuestionNumber;
    questionNumber <= props.currentPageLastQuestionNumber;
    questionNumber++
  ) {
    currentPageQuestionNumberList.push(questionNumber);
  }

  return (
    <article className={styles['survey-content-container']}>
      {/* for section title */}
      {props.question.No === surveySectionFirstQuestionNumber && (
        <h2 className={styles['section-title']}>
          영역 {sectionNumber}: {props.question.section?.title}
        </h2>
      )}

      <section className={styles['questionnaire-container']}>
        <hr
          className={
            respondedCheckObjectValue[props.question.No]
              ? styles['not-responded-top-red-hr']
              : styles['questionnaire-top-blue-hr']
          }
        />
        <header className={styles['questionnaire-question-and-score-container']}>
          {respondedCheckObjectValue[props.question.No] && (
            <BsExclamationCircleFill className={styles['not-responded-icon']} />
          )}
          <h3
            className={
              respondedCheckObjectValue[props.question.No]
                ? `${styles['questionnaire-question-text']} ${styles['not-responded-questionnaire-question-text']}`
                : styles['questionnaire-question-text']
            }
          >
            {props.question.No}. {props.question.Q}
          </h3>
          <p className={styles['questionnaire-score-text']}>
            {props.question.No}번 문항 점수
            <span className={styles['score-emphasis']}>{questionScore}</span>
          </p>
        </header>

        <article className={styles['degree-frequency-sections-container']}>
          <DegreeFrequencyAnswer
            degreeOrFrequencyTitle="중증도"
            questionNumber={props.question.No}
            answerList={NMS_ANSWER_DEGREE}
            explainTextList={NMS_ANSWER_DEGREE_EXPLAIN_TEXT_LIST}
            surveyStateKeyword={props.surveyStateKeyword}
            // for show not-responded question "!" icon, not-responded question number message
            currentPageFirstQuestionNumber={props.currentPageFirstQuestionNumber}
            currentPageLastQuestionNumber={props.currentPageLastQuestionNumber}
            respondedCheckObject={respondedCheckObject}
            responseStateList={props.responseStateList}
            currentPageQuestionNumberList={currentPageQuestionNumberList}
          />
          <DegreeFrequencyAnswer
            degreeOrFrequencyTitle="빈도"
            questionNumber={props.question.No}
            answerList={NMS_ANSWER_FREQUENCY}
            explainTextList={NMS_ANSWER_FREQUENCY_EXPLAIN_TEXT_LIST}
            surveyStateKeyword={props.surveyStateKeyword}
            // for show not-responded question "!" icon, not-responded question number message
            currentPageFirstQuestionNumber={props.currentPageFirstQuestionNumber}
            currentPageLastQuestionNumber={props.currentPageLastQuestionNumber}
            respondedCheckObject={respondedCheckObject}
            responseStateList={props.responseStateList}
            currentPageQuestionNumberList={currentPageQuestionNumberList}
          />
        </article>
      </section>

      {/* for survey section last question bottom calculate section total score  */}
      {props.question.No === surveySectionLastQuestionNumber && (
        <section className={styles['survey-section-bottom-score']}>
          <hr className={styles['survey-section-bottom-grey-hr']} />
          <p className={styles['survey-section-bottom-score-text']}>
            영역 {props.question.section?.number} 합계 점수
            <span className={styles['score-emphasis']}>{sectionScore}</span>
          </p>
        </section>
      )}

      {/* for last page bottom total sum score */}
      {props.question.No === props.lastQuestionNumber && (
        <section className={styles['last-page-total-score']}>
          <p className={styles['last-page-total-score-text']}>
            {SURVEY_TITLE_LIST[6].TITLE} 설문{' '}
            <span className={styles['last-page-total-score-text-bold']}>
              총 합계 점수<span className={styles['score-emphasis']}>{totalScore}</span>
            </span>
          </p>
        </section>
      )}

      {/* bottom prev/next pagination buttons */}
      {props.question.No === props.currentPageLastQuestionNumber && (
        <BottomPrevNextButton
          handleNextPage={props.handleNextPage}
          handlePrevPage={props.handlePrevPage}
          nextBtnDisabledCondition={nextBtnDisabledCondition}
          // for show not-responded question "!" icon, not-responded question number message
          respondedCheckObject={respondedCheckObject}
          responseStateList={props.responseStateList}
          currentPageLastQuestionNumber={props.currentPageLastQuestionNumber}
          currentPageFirstQuestionNumber={props.currentPageFirstQuestionNumber}
          surveyQuestionsPerPage={NMS_QUESTIONS_PER_PAGE}
        />
      )}
    </article>
  );
}

interface DegreeFrequencyAnswerProps {
  degreeOrFrequencyTitle: string;
  questionNumber: number;
  answerList: string[];
  explainTextList?: ExplainTextObjectType[];
  surveyStateKeyword: string;
  // for show not-responded question "!" icon, not-responded question number message
  currentPageFirstQuestionNumber: number;
  currentPageLastQuestionNumber: number;
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
  responseStateList: string[];
  currentPageQuestionNumberList: number[];
}

function DegreeFrequencyAnswer(props: DegreeFrequencyAnswerProps) {
  const setQuestionScore = useSetRecoilState(questionScoreState(props.questionNumber));

  const [responseDegreeAnswer, setResponseDegreeAnswer] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.questionNumber}중증도`)
  );
  const [responseFrequencyAnswer, setResponseFrequencyAnswer] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.questionNumber}빈도`)
  );

  const responseDegreeScore = parseInt(responseDegreeAnswer.slice(0, 1));
  const responseFrequencyScore = parseInt(responseFrequencyAnswer.slice(0, 1));
  // for calculate score
  const haveResponseDegreeScore = !isNaN(responseDegreeScore);
  const haveResponseFrequencyScore = !isNaN(responseFrequencyScore);

  useEffect(() => {
    // for set 0 score
    if (responseDegreeScore === 0 && responseFrequencyAnswer === '') {
      setResponseFrequencyAnswer(responseDegreeAnswer);
    }
    if (responseFrequencyScore === 0 && responseDegreeAnswer === '') {
      setResponseDegreeAnswer(responseFrequencyAnswer);
    }

    if (haveResponseDegreeScore && haveResponseFrequencyScore) {
      const calculateScore = responseDegreeScore * responseFrequencyScore;
      setQuestionScore(calculateScore);
    }
  }, [responseDegreeAnswer, responseFrequencyAnswer]);

  // for hide question right not-responded "!" icon when get score
  const setRespondedCheckObject = useSetRecoilState(respondedCheckObject06NMS);
  const questionScore = useRecoilValue(questionScoreState(props.questionNumber));
  useEffect(() => {
    const objectKey = props.questionNumber;
    if (questionScore !== '-') {
      setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
        return { ...prev, [objectKey]: false };
      });
    }
  }, [questionScore]);

  return (
    <section className={styles['degree-frequency-section']}>
      <h3 className={styles['degree-frequency-section-title']}>{props.degreeOrFrequencyTitle}</h3>
      <hr className={styles['degree-frequency-hr']} />
      {props.answerList.map((answer, index) => (
        <AnswerList
          answer={`${index}. ${answer}`}
          inputName={`${props.questionNumber}${props.degreeOrFrequencyTitle}`}
          inputId={`${props.questionNumber}${props.degreeOrFrequencyTitle}${answer}`}
          explainTextList={props.explainTextList}
          // for radio button checked
          clickedQuestionNumber={`${props.questionNumber}${props.degreeOrFrequencyTitle}`}
          surveyStateKeyword={SURVEY_06_NMS_STATE_KEYWORD}
          // for show not-responded question "!" icon, not-responded question number message
          respondedCheckObject={props.respondedCheckObject}
          key={uuidv4()}
        />
      ))}
    </section>
  );
}
