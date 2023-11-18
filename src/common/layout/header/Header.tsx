import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import usePathCheck from 'common/hooks/usePathCheck';
// components
import ProgressBar from './ProgressBar';
import SendExcelFileBtn from './excelFileHandle/button/sendExcelFileBtn';
import ModalPortal from '../modalPortal';
import HeaderSaveModalForPatient from './excelFileHandle/modal/HeaderSaveModalForPatient';
// states
import { headerCurrentPageState } from './pagination/headerPageState';
// constants
import { SURVEY_NAME } from 'common/constants/survey.const';
import { totalPagesCount } from './pagination/totalPages.const';
// styles
import logo from 'assets/header-logo.svg';
import styles from './header.module.scss';

export default function Header() {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);
  const isSurveyPage = usePathCheck();

  const [modalOpen, setModalOpen] = useState(false);

  const onClickBtnHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const rightContent = isSurveyPage ? (
    <>
      <span
        className={styles['header-right-text']}
      >{`설문 ${headerCurrentPage} / ${totalPagesCount} 페이지`}</span>
      <SendExcelFileBtn onClickBtnHandler={onClickBtnHandler} />
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
      {modalOpen && (
        <ModalPortal>
          <HeaderSaveModalForPatient onClose={closeModalHandler} />
        </ModalPortal>
      )}
    </header>
  );
}
