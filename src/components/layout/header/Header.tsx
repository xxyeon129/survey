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
import { SURVEY_01_UPDRS_TOTAL_PAGES } from 'pages/survey/survey-01-UPDRS/survey.const';
import { SURVEY_02_FG_TOTAL_PAGES } from 'pages/survey/survey-02-FG/survey.const';
import { SURVEY_03_BAI_TOTAL_PAGES } from 'pages/survey/survey-03-BAI/survey.const';
import { SURVEY_04_BDI_TOTAL_PAGES } from 'pages/survey/survey-04-BDI/survey.const';
import { SURVEY_05_RBD_TOTAL_PAGES } from 'pages/survey/survey-05-RBD/survey.const';

const personalInfoPageCount = 1;

export const headerTotalPage =
  personalInfoPageCount +
  SURVEY_01_UPDRS_TOTAL_PAGES +
  SURVEY_02_FG_TOTAL_PAGES +
  SURVEY_03_BAI_TOTAL_PAGES +
  SURVEY_04_BDI_TOTAL_PAGES +
  SURVEY_05_RBD_TOTAL_PAGES;

export default function Header() {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);
  const isSurveyPage = usePathCheck();

  const rightContent = isSurveyPage ? (
    <>
      <span>{`설문 ${headerCurrentPage} / ${headerTotalPage} 페이지`}</span>
      <PrevNextBtn />
    </>
  ) : (
    <span>{`${SURVEY_NAME} 전자설문`}</span>
  );

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
