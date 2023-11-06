import useClickedRadioBtnChecked from 'pages/survey/common/hooks/useClickedRadioBtnChecked';
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import styles from './surveyContent.module.scss';
import { v4 as uuidv4 } from 'uuid';

interface SurveyContentTableProps {
  questions: SurveyContentObjectType[];
  answers: string[];
  radioBtnValues: string[];

  // for radio button checked
  surveyStateKeyword: string;

  // for survey-07-PDQ
  additionalCheckQuestionNo?: number;
  additionalCheckQuestion?: string;
  // for survey-12-FOOD
  questionExplain?: boolean;
  nonGradationStyle?: boolean;
}

// survey-03-BAI, survey-07-PDQ, survey-09-Tired, survey-12-Food
export default function SurveyContentTable(props: SurveyContentTableProps) {
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
            <tr className={styles['questions-table-row']} key={uuidv4()}>
              {/* question */}
              <th className={styles['questions-table-header-text']}>
                <p className={styles['questions-table-header-text-p']}>
                  {question.No}. {question.Q}
                  {/* for question explain text */}
                  {props.questionExplain && (
                    <p className={styles['question-table-header-text-explain']}>
                      {question.EXPLAIN && `(${question.EXPLAIN})`}
                    </p>
                  )}
                </p>

                {/* for additional question */}
                {props.additionalCheckQuestionNo &&
                  props.additionalCheckQuestionNo === question.No && (
                    <label className={styles['additional-question']} htmlFor="additional-question">
                      * {props.additionalCheckQuestion}{' '}
                      <input
                        className={styles['additional-question-input']}
                        type="radio"
                        name={`${question.No}`}
                        id="additional-question"
                      />
                    </label>
                  )}
              </th>
              {/* radio buttons */}
              {props.radioBtnValues.map((radioBtnValue) =>
                props.nonGradationStyle ? (
                  <TableRadioBtn
                    surveyStateKeyword={props.surveyStateKeyword}
                    clickedQuestionNumber={question.No}
                    radioBtnValue={radioBtnValue}
                    nonGradationStyle={props.nonGradationStyle}
                  />
                ) : (
                  <TableRadioBtn
                    surveyStateKeyword={props.surveyStateKeyword}
                    clickedQuestionNumber={question.No}
                    radioBtnValue={radioBtnValue}
                  />
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

interface TableRadioBtnProps {
  surveyStateKeyword: string;
  clickedQuestionNumber: number;
  radioBtnValue: string;

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
