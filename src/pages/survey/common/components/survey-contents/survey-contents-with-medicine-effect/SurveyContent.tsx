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

interface SurveyContentWithMedicineEffectProps {
  question: SurveyContentObjectType;
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
            {medicineDivisionList.map((list, index) => (
              <div key={index}>
                <h3 className={styles['medicine-text']}>
                  파킨슨병 약의 효과가{' '}
                  <span className={styles['medicine-text-emphasize']}>{list.text}</span> 때 아래
                  설문에 답변해 주세요.
                </h3>
                {props.question.A && (
                  <AnswersUnorderedList
                    answersList={props.question.A}
                    inputName={`${props.question.No}${list.radioBtnKeyword}`}
                    inputId={`${props.question.No}${list.radioBtnKeyword}`}
                    key={`${list.radioBtnKeyword}`}
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
                inputId={`${props.question.No}`}
                key={`${props.question.No}nondrug`}
              />
            )}
          </>
        )}
      </div>
    </article>
  );
}

interface AnswersUnorderedListProps {
  answersList: string[];
  inputName: string;
  inputId: string;
  key: string;
}

function AnswersUnorderedList(props: AnswersUnorderedListProps) {
  return (
    <ul className={styles['answer-ul']}>
      {props.answersList.map((answer) => (
        <AnswerList
          answer={answer}
          inputName={props.inputName}
          inputId={`${props.inputId}${answer}`}
          key={`${props.key}${answer}`}
        />
      ))}
    </ul>
  );
}
