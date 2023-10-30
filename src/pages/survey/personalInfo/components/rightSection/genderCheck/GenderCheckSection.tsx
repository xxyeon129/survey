import { FEMALE, GENDER, MALE } from './genderCheckSection.const';
import styles from './genderCheckSection.module.scss';

export default function GenderCheckSection() {
  return (
    <section>
      <label>성별</label>
      <ul className={styles['gender-section-checkbox-container']}>
        <li className={styles['gender-section-checkbox']}>
          <input type="radio" id={MALE} name={GENDER} value="남성" />
          <label htmlFor={MALE}>
            <div className={styles['radio-button']}>
              <div className={styles['radio-button-checked-circle']} />
            </div>
            남성
          </label>
        </li>
        <li className={styles['gender-section-checkbox']}>
          <input type="radio" id={FEMALE} name={GENDER} value="여성" />
          <label htmlFor={FEMALE}>
            <div className={styles['radio-button']}>
              <div className={styles['radio-button-checked-circle']} />
            </div>
            여성
          </label>
        </li>
      </ul>
    </section>
  );
}
