import usePathCheck from 'shared/hooks/usePathCheck';
import logo from 'assets/header-logo.svg';
import PrevNextBtn from './PrevNextBtn';
import ProgressBar from './ProgressBar';
import styles from './header.module.scss';
import { SURVEY_TITLE } from 'shared/constants/survey.const';

export default function Header() {
  const isSurveyPage = usePathCheck();

  const rightContent = isSurveyPage ? (
    <>
      {/* TEST CODE: 임시 목업 텍스트 */}
      <span>설문 5 / 20 페이지</span>
      <PrevNextBtn />
    </>
  ) : (
    <span>{`${SURVEY_TITLE} 전자설문`}</span>
  );

  return (
    <header className={styles['header']}>
      <div className={styles['header-contents']}>
        <img src={logo} alt="header 좌측 병원 로고" />
        <div>{rightContent}</div>
      </div>
      <ProgressBar />
    </header>
  );
}
