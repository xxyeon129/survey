import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import styles from './answerWithInput.module.scss';
import { v4 as uuidv4 } from 'uuid';

interface AnswerWithInputProps {
  answerWithInput: SurveyContentObjectType;
  answerWithInputTitleList: string[];
  showInputCondition: string;

  // for radio button checked
  clickedQuestionNumber: string;
  surveyStateKeyword: string;
}

export default function AnswerWithInput(props: AnswerWithInputProps) {
  return (
    <ul className={styles['answer-with-input-ul']}>
      {props.answerWithInputTitleList.map((answerTitle) => (
        <li className={styles['answer-with-input-li']} key={uuidv4()}>
          <header className={styles['answer-with-input-header']}>
            <h3 className={styles['answer-with-input-title']}>{answerTitle}</h3>
          </header>

          {props.answerWithInput.A && (
            <RadioBtnSection
              answerList={props.answerWithInput.A}
              btnName={`${props.answerWithInput.No}${answerTitle}`}
              showInputCondition={props.showInputCondition}
              answerTitle={answerTitle}
              // for radio button checked
              clickedQuestionNumber={props.clickedQuestionNumber}
              surveyStateKeyword={props.surveyStateKeyword}
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

  // for radio button checked
  clickedQuestionNumber: string;
  surveyStateKeyword: string;
}

function RadioBtnSection(props: RadioBtnSectionProps) {
  const [showInput, setShowInput] = useState(false);

  // for radio button checked
  const [responseValue, setResponseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.clickedQuestionNumber}-${props.answerTitle}`)
  );

  // for medicine input state
  const [responseMedicineInputValue, setResponseMedicineInputValue] = useRecoilState(
    responseState(
      `${props.surveyStateKeyword}-${props.clickedQuestionNumber}-${props.answerTitle}-medicineName`
    )
  );

  const handleRadioBtnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectValue = e.target.value;
    setResponseValue(selectValue);

    // for reset input text when click "아니오"
    selectValue !== props.showInputCondition && setResponseMedicineInputValue('');
  };

  // for show input
  useEffect(() => {
    props.showInputCondition === responseValue ? setShowInput(true) : setShowInput(false);
  }, [responseValue]);

  const onChangeMedicineInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setResponseMedicineInputValue(inputValue);
  };

  return (
    <section className={styles['answer-with-input-check-container']}>
      <ul className={styles['answer-with-input-check-ul']}>
        {props.answerList.map((answer) => (
          <li className={styles['answer-with-input-check-li']} key={uuidv4()}>
            <input
              type="radio"
              id={`${props.btnName}${answer}`}
              name={props.btnName}
              value={answer}
              onChange={handleRadioBtnChange}
              checked={responseValue === answer}
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
            value={responseMedicineInputValue}
            onChange={onChangeMedicineInput}
            placeholder={`${props.answerTitle}에 대해 복용하신 약 이름이나 성분명을 입력해주세요.`}
          />
        </div>
      )}
    </section>
  );
}
