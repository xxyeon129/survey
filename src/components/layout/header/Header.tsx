import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { headerCurrentPageState } from './pagination/headerPageState';
import logo from 'assets/header-logo.svg';
import styles from './header.module.scss';
import usePathCheck from 'shared/hooks/usePathCheck';
// components
import PrevNextBtn from './pagination/PrevNextBtn';
import ProgressBar from './ProgressBar';
// constants
import { SURVEY_NAME } from 'shared/constants/survey.const';
import { totalPagesCount } from './pagination/totalPages.const';

export default function Header() {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);
  const isSurveyPage = usePathCheck();

  const rightContent = isSurveyPage ? (
    <>
      <span
        className={styles['header-right-text']}
      >{`설문 ${headerCurrentPage} / ${totalPagesCount} 페이지`}</span>
      <PrevNextBtn />
    </>
  ) : (
    <span className={styles['header-right-text']}>{`${SURVEY_NAME} 전자설문`}</span>
  );

  return (
    <header className={styles['header']}>
      <div className={styles['header-contents']}>
        <Link to="/">
          <img src={logo} alt="header 좌측 병원 로고" />
        </Link>
        <div className={styles['header-right-contents']}>{rightContent}</div>
      </div>
      {isSurveyPage && <ProgressBar />}
    </header>
  );
}
