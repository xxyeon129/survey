import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import styles from './answerWithInput.module.scss';
import { useState } from 'react';

interface AnswerWithInputProps {
  answerWithInput: SurveyContentObjectType;
  answerWithInputTitleList: string[];
  showInputCondition: string;
}

export default function AnswerWithInput(props: AnswerWithInputProps) {
  return (
    <ul className={styles['answer-with-input-ul']}>
      {props.answerWithInputTitleList.map((answerTitle) => (
        <li className={styles['answer-with-input-li']}>
          <header className={styles['answer-with-input-header']}>
            <h3 className={styles['answer-with-input-title']}>{answerTitle}</h3>
          </header>

          {props.answerWithInput.A && (
            <RadioBtnSection
              answerList={props.answerWithInput.A}
              btnName={`${props.answerWithInput.No}${answerTitle}`}
              showInputCondition={props.showInputCondition}
              answerTitle={answerTitle}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

interface RadioBtnSectionProps {
  answerList: string[];
  btnName: string;
  showInputCondition: string;
  answerTitle: string;
}

function RadioBtnSection(props: RadioBtnSectionProps) {
  const [showInput, setShowInput] = useState(false);

  const showInputHandler = (clickedValue: string) => {
    props.showInputCondition === clickedValue ? setShowInput(true) : setShowInput(false);
  };

  return (
    <section className={styles['answer-with-input-check-container']}>
      <ul className={styles['answer-with-input-check-ul']}>
        {props.answerList.map((answer) => (
          <li className={styles['answer-with-input-check-li']}>
            <input
              type="radio"
              id={`${props.btnName}${answer}`}
              name={props.btnName}
              value={answer}
              onClick={() => showInputHandler(answer)}
            />
            <label htmlFor={`${props.btnName}${answer}`}>
              <div className={styles['radio-button']}>
                <div className={styles['radio-button-checked-circle']} />
              </div>
              {answer}
            </label>
          </li>
        ))}
      </ul>
      {showInput && (
        <div className={styles['conditional-input-container']}>
          <label>약 이름</label>
          <input
            type="text"
            placeholder={`${props.answerTitle}에 대해 복용하신 약 이름이나 성분명을 입력해주세요.`}
          />
        </div>
      )}
    </section>
  );
}
