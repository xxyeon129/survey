import { useRecoilState } from 'recoil';
import { FEMALE, GENDER, MALE } from './genderCheckSection.const';
import styles from './genderCheckSection.module.scss';
import { personalInfoGenderState } from 'pages/survey/personalInfo/personalInfo.state';

export default function GenderCheckSection() {
  const [selectedGender, setSeclectedGender] = useRecoilState(personalInfoGenderState);

  const updateGenderState = (selectedGender: string) => {
    setSeclectedGender(selectedGender);
  };

  return (
    <section>
      <label>성별</label>
      <ul className={styles['gender-section-checkbox-container']}>
        <li className={styles['gender-section-checkbox']}>
          <input
            type="radio"
            id={MALE}
            name={GENDER}
            value={MALE}
            defaultChecked={selectedGender === MALE}
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
            defaultChecked={selectedGender === FEMALE}
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
