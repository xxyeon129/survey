// components
import AnswerList from 'pages/survey/common/components/survey-contents/answerList/AnswerList';
// constants
import {
  NMS_ANSWER_DEGREE,
  NMS_ANSWER_DEGREE_EXPLAIN_TEXT_LIST,
  NMS_ANSWER_FREQUENCY,
  NMS_ANSWER_FREQUENCY_EXPLAIN_TEXT_LIST,
} from '../survey.const';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { ExplainTextObjectType } from '../survey06NMS.type';
// styles
import styles from './surveyContentWithScore.module.scss';

interface SurveyContentWithScoreProps {
  question: SurveyContentObjectType;
}

export default function SurveyContentWithScore(props: SurveyContentWithScoreProps) {
  const surveySectionFirstQuestionNumber = props.question.section?.questionNumberList[0];
  const surveySectionLastQuestionNumber = props.question.section?.questionNumberList[1];

  return (
    <article className={styles['survey-content-container']}>
      {/* for section title */}
      {props.question.No === surveySectionFirstQuestionNumber && (
        <h2 className={styles['section-title']}>
          영역 {props.question.section?.number}: {props.question.section?.title}
        </h2>
      )}

      <section className={styles['questionnaire-container']}>
        <hr className={styles['questionnaire-top-blue-hr']} />
        <header className={styles['questionnaire-question-and-score-container']}>
          <h3 className={styles['questionnaire-question-text']}>
            {props.question.No}. {props.question.Q}
          </h3>
          <p className={styles['questionnaire-score-text']}>
            {props.question.No}번 문항 점수<h3 className={styles['score-emphasis']}>3</h3>
            {/* TO DO: 점수 상태값 적용 */}
          </p>
        </header>

        <article className={styles['degree-frequency-sections-container']}>
          <DegreeFrequencyAnswer
            degreeOrFrequencyTitle="중증도"
            questionNumber={props.question.No}
            answerList={NMS_ANSWER_DEGREE}
            explainTextList={NMS_ANSWER_DEGREE_EXPLAIN_TEXT_LIST}
          />
          <DegreeFrequencyAnswer
            degreeOrFrequencyTitle="빈도"
            questionNumber={props.question.No}
            answerList={NMS_ANSWER_FREQUENCY}
            explainTextList={NMS_ANSWER_FREQUENCY_EXPLAIN_TEXT_LIST}
          />
        </article>
      </section>

      {/* for survey section last question bottom calculate section score sum  */}
      {props.question.No === surveySectionLastQuestionNumber && (
        <section className={styles['survey-section-bottom-score']}>
          <hr className={styles['survey-section-bottom-grey-hr']} />
          <p className={styles['survey-section-bottom-score-text']}>
            영역 {props.question.section?.number} 합계 점수
            <h3 className={styles['score-emphasis']}>8</h3>
            {/* TO DO: 점수 상태값 적용 */}
          </p>
        </section>
      )}
    </article>
  );
}

interface DegreeFrequencyAnswerProps {
  degreeOrFrequencyTitle: string;
  questionNumber: number;
  answerList: string[];
  explainTextList?: ExplainTextObjectType[];
}

function DegreeFrequencyAnswer(props: DegreeFrequencyAnswerProps) {
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
          key={`${props.questionNumber}${answer}`}
        />
      ))}
    </section>
  );
}
