// constants
import { SURVEY_NAME } from 'common/constants/survey.const';
// components
import LeftBlueBoxSection from './components/leftSection/LeftBlueBoxSection';
import NameInputSection from './components/rightSection/nameInput/NameInputSection';
import SelectBirthdaySection from './components/rightSection/selectBirthday/SelectBirthdaySection';
import GenderCheckSection from './components/rightSection/genderCheck/GenderCheckSection';
import BottomStartBtn from './components/rightSection/bottomStartBtn/BottomStartBtn';
// styles
import styles from './personalInfo.module.scss';

export default function PersonalInfo() {
  return (
    <article className={styles['personal-info-page-container']}>
      <LeftBlueBoxSection />
      <section className={styles['right-section']}>
        <hgroup>
          <h1 className={styles['right-section-h1']}>개인정보 입력</h1>
          <h3 className={styles['right-section-h3']}>
            {SURVEY_NAME} 설문을 실시하는 환자의 개인정보를 입력해주세요.
          </h3>
        </hgroup>
        <form>
          <NameInputSection />
          <SelectBirthdaySection />
          <GenderCheckSection />
          <BottomStartBtn />
        </form>
      </section>
    </article>
  );
}
