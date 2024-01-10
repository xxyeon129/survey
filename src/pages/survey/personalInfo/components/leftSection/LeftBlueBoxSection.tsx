import { useNavigate } from 'react-router-dom';
// constants
import { SURVEY_NAME } from 'common/constants/survey.const';
import { SURVEY_NAME_FIRST, SURVEY_NAME_SECOND } from '../../personalInfo.const';
import { PATH_URL } from 'common/constants/path.const';
// styles
import logo from 'assets/login-personalinfo-page-logo.svg';
import styles from './leftBlueBoxSection.module.scss';

export default function LeftBlueBoxSection() {
  const navigate = useNavigate();

  const navigateToMain = () => {
    navigate(PATH_URL.MAIN);
  };

  return (
    <section className={styles['left-blue-section']}>
      <img src={logo} alt="hospital logo" className={styles.logo} onClick={navigateToMain} />
      <h1 className={styles['left-blue-section-h1']}>
        {SURVEY_NAME_FIRST}
        <br />
        {SURVEY_NAME_SECOND} 전자설문
      </h1>
      <p className={styles['left-blue-section-p']}>
        총 12 단계의 설문으로 이루어진
        <br />
        {SURVEY_NAME} 전자설문입니다.
        <br />
        입력하신 개인정보는 설문 목적 이외로 사용되지 않습니다.
        <br />
        성명과 생년월일, 성별을 입력해 주세요.
      </p>
    </section>
  );
}
