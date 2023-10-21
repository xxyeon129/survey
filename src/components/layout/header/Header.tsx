import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { headerCurrentPageState } from './pagination/headerPageState';
import logo from 'assets/header-logo.svg';
import styles from './header.module.scss';
// components
import PrevNextBtn from './pagination/PrevNextBtn';
import ProgressBar from './ProgressBar';
// utils
import { SURVEY_TITLE } from 'shared/constants/survey.const';
import usePathCheck from 'shared/hooks/usePathCheck';
import { survey01TotalPages } from 'pages/survey/survey-01-BDI/survey.const';
import { survey02TotalPages } from 'pages/survey/survey-02-RBD/survey.const';
import { survey03TotalPages } from 'pages/survey/survey-03-SCOPA/survey.const';
import { survey04TotalPages } from 'pages/survey/survey-04-UPDRS/survey.const';
import { survey05TotalPages } from 'pages/survey/survey-05-FG/survey.const';

const personalInfoPageCount = 1;

export const headerTotalPage =
  personalInfoPageCount +
  survey01TotalPages +
  survey02TotalPages +
  survey03TotalPages +
  survey04TotalPages +
  survey05TotalPages;

export default function Header() {
  // const [headerTotalPage, setHeaderTotalPage] = useRecoilState(headerTotalPageState);

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
