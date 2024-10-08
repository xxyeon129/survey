import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// components
import ProgressBar from './components/ProgressBar';
import ModalPortal from '../modalPortal';
import HeaderSaveModalForPatient from './excelFileHandle/modal/HeaderSaveModalForPatient';
import HeaderSaveModalForHospital from './excelFileHandle/modal/HeaderSaveModalForHospital';
import SendGmailModal from '../modal/SendGmailModal';
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

export default function Header() {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);
  const isSurveyPage = usePathCheck();

  // Total pages count
  const { totalPagesCount } = useTotalPages();

  // Current user (patient or hospital) - for different modal content
  const user = useRecoilValue(userState);

  const { modalOpen, openModalHandler, closeModalHandler } = useModal();

  // for send gmail modal
  const {
    modalOpen: sendGmailModalOpen,
    openModalHandler: openSendGmailModalHandler,
    closeModalHandler: closeSendGmailModalHandler,
  } = useModal();

  const rightContentElement = isSurveyPage ? (
    <>
      <span className={styles['header-right-text']}>{`설문 ${headerCurrentPage} / ${totalPagesCount} 페이지`}</span>
      <button className={styles['send-excel-file-btn']} onClick={openModalHandler}>
        진행 내용 저장
      </button>
    </>
  ) : (
    <span className={styles['header-right-text']}>{`${SURVEY_NAME} 전자설문`}</span>
  );

  return (
    <header className={styles['header']}>
      <div className={styles['header-contents']}>
        <Link to='/'>
          <img src={logo} className={styles['header-logo']} alt='header 좌측 병원 로고' />
        </Link>
        <div className={styles['header-right-contents']}>{rightContentElement}</div>
      </div>

      {isSurveyPage && <ProgressBar />}

      {/* modal */}
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
