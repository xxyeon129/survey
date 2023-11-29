// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
// styles
import styles from './survey01UPDRSAdditionalMedicineExplain.module.scss';

export default function Survey01UPDRSAdditionalMedicineExplain() {
  return (
    <section className={styles['take-medicine-additional-explain-container']}>
      <span className={styles['asterisk']}>
        <strong>*</strong>
      </span>
      <p>
        {SURVEY_TITLE_LIST[1].TITLE}는 약효가 있을 때, 없을 때 두 가지로 체크합니다.
        <br />
        약을 복용할 때와 복용하지 않을 때 상태를 비교합니다.
      </p>
    </section>
  );
}
