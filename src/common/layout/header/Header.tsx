import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// components
import ProgressBar from './ProgressBar';
import SendExcelFileBtn from './excelFileHandle/button/sendExcelFileBtn';
import ModalPortal from '../modalPortal';
import HeaderSaveModalForPatient from './excelFileHandle/modal/HeaderSaveModalForPatient';
import HeaderSaveModalForHospital from './excelFileHandle/modal/HeaderSaveModalForHospital';
// states
import { headerCurrentPageState } from './pagination/headerPageState';
import { userState } from 'pages/select-home/selectHomePage.state';
// constants
import { SURVEY_NAME } from 'common/constants/survey.const';
import { USER_HOSPITAL } from 'pages/select-home/selectHomeUser.const';
// hooks
import usePathCheck from 'common/hooks/usePathCheck';
import useTotalPages from './pagination/useTotalPages';
import useModal from 'common/hooks/useModal';
// styles
import logo from 'assets/header-logo.svg';
import styles from './header.module.scss';
import SendGmailModal from '../modal/SendGmailModal';

export default function Header() {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);
  const isSurveyPage = usePathCheck();

  // for display total pages count
  const { totalPagesCount } = useTotalPages();

  // for different modal content
  const user = useRecoilValue(userState);

  const { modalOpen, openModalHandler, closeModalHandler } = useModal();

  // for send gmail modal
  const {
    modalOpen: sendGmailModalOpen,
    openModalHandler: openSendGmailModalHandler,
    closeModalHandler: closeSendGmailModalHandler,
  } = useModal();

  const rightContent = isSurveyPage ? (
    <>
      <span
        className={styles['header-right-text']}
      >{`설문 ${headerCurrentPage} / ${totalPagesCount} 페이지`}</span>
      <SendExcelFileBtn onClickBtnHandler={openModalHandler} />
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
          {user === USER_HOSPITAL ? (
            <HeaderSaveModalForHospital
              onClose={closeModalHandler}
              openSendGmailModalHandler={openSendGmailModalHandler}
            />
          ) : (
            <HeaderSaveModalForPatient
              onClose={closeModalHandler}
              openSendGmailModalHandler={openSendGmailModalHandler}
            />
          )}
        </ModalPortal>
      )}
      {sendGmailModalOpen && (
        <ModalPortal>
          <SendGmailModal onClose={closeSendGmailModalHandler} />
        </ModalPortal>
      )}
    </header>
  );
}
