// states
import { useRecoilState } from 'recoil';
import { personalInfoGenderState } from 'pages/survey/personalInfo/personalInfo.state';
// constants
import { FEMALE, GENDER, MALE } from './genderCheckSection.const';
// hooks
import useResetGenderQuestionResponseState from 'pages/survey/survey-10-SCOPA/hooks/useResetGenderQuestionResponseState';
// styles
import styles from './genderCheckSection.module.scss';

interface GenderCheckSection {
  isSurveyPage?: boolean;
}

export default function GenderCheckSection(props: GenderCheckSection) {
  const [selectedGender, setSeclectedGender] = useRecoilState(personalInfoGenderState);

  // for survey-10-SCOPA reset recoil state when change gender
  const resetGenderQuestionResponseState = useResetGenderQuestionResponseState();

  const updateGenderState = (selectedGender: string) => {
    setSeclectedGender(selectedGender);

    // for survey-10-SCOPA reset recoil state when change gender
    props.isSurveyPage && resetGenderQuestionResponseState();
  };

  return (
    <section>
      {!props.isSurveyPage && <label>성별</label>}
      <ul className={styles['gender-section-checkbox-container']}>
        <li className={styles['gender-section-checkbox']}>
          <input
            type="radio"
            id={MALE}
            name={GENDER}
            value={MALE}
            checked={selectedGender === MALE}
            onClick={() => updateGenderState(MALE)}
          />
          <label htmlFor={MALE}>
            <div className={styles['radio-button']}>
              <div className={styles['radio-button-checked-circle']} />
            </div>
            {MALE}
          </label>
        </li>
        <li className={styles['gender-section-checkbox']}>
          <input
            type="radio"
            id={FEMALE}
            name={GENDER}
            value={FEMALE}
            checked={selectedGender === FEMALE}
            onClick={() => updateGenderState(FEMALE)}
          />
          <label htmlFor={FEMALE}>
            <div className={styles['radio-button']}>
              <div className={styles['radio-button-checked-circle']} />
            </div>
            {FEMALE}
          </label>
        </li>
      </ul>
    </section>
  );
}
