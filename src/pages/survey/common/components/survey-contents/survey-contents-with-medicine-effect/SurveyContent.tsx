// components
import AnswerList from '../answerList/AnswerList';
// states
import { useRecoilValue } from 'recoil';
import { takeMedicineState } from 'pages/survey/survey-01-UPDRS/survey01UPDRS.state';
// constants
import { medicineDivisionList } from './surveyContent.const';
import { TAKE_MEDICINE } from 'pages/survey/survey-01-UPDRS/survey.const';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
// styles
import styles from './surveyContent.module.scss';
import { v4 as uuidv4 } from 'uuid';

interface SurveyContentWithMedicineEffectProps {
  question: SurveyContentObjectType;
  surveyStateKeyword: string;
}

// survey-01-UPDRS, survey-02-FG
export default function SurveyContentWithMedicineEffect(
  props: SurveyContentWithMedicineEffectProps
) {
  const takeMedicine = useRecoilValue(takeMedicineState);

  return (
    <article className={styles['survey-content-container']}>
      <hr />
      <h3 className={styles['question']}>
        {props.question.No}. {props.question.Q}
      </h3>

      <div className={styles['answer-container']}>
        {takeMedicine === TAKE_MEDICINE ? (
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
              />
            )}
          </>
        )}
      </div>
    </article>
  );
}

interface AnswersUnorderedListProps {
  questionNumber: string;
  surveyStateKeyword: string;

  answersList: string[];
  inputName: string;
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
          key={uuidv4()}
        />
      ))}
    </ul>
  );
}
