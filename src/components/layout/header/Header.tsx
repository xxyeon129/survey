import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { headerCurrentPageState, headerTotalPageState } from './pagination/headerPageState';
import logo from 'assets/header-logo.svg';
import styles from './header.module.scss';
// components
import PrevNextBtn from './pagination/PrevNextBtn';
import ProgressBar from './ProgressBar';
// utils
import { SURVEY_TITLE } from 'shared/constants/survey.const';
import { getTotalPages } from './pagination/getTotalPages';
import usePathCheck from 'shared/hooks/usePathCheck';

export default function Header() {
  const [headerTotalPage, setHeaderTotalPage] = useRecoilState(headerTotalPageState);
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);
  const isSurveyPage = usePathCheck();

  const rightContent = isSurveyPage ? (
    <>
      <span>{`설문 ${headerCurrentPage} / ${headerTotalPage} 페이지`}</span>
      <PrevNextBtn />
    </>
  ) : (
    <span>{`${SURVEY_TITLE} 전자설문`}</span>
  );

  useEffect(() => {
    const totalPages = getTotalPages();
    setHeaderTotalPage(totalPages);
  }, []);

  return (
    <header className={styles['header']}>
      <div className={styles['header-contents']}>
        <Link to="/">
          <img src={logo} alt="header 좌측 병원 로고" />
        </Link>
        <div>{rightContent}</div>
      </div>
      {isSurveyPage && <ProgressBar />}
    </header>
  );
}
