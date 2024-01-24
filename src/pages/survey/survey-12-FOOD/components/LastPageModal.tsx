import { userState } from 'pages/select-home/selectHomePage.state';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// constants
import { USER_HOSPITAL } from 'pages/select-home/selectHomeUser.const';
// hooks
import useExcelFile from 'common/hooks/useExcelFile';
// types
import { SendGmailModalProps } from 'common/layout/modal/sendGmailModal.type';
// styles
import { FiCheckCircle } from 'react-icons/fi';
import { IoMdDownload } from 'react-icons/io';
import { FaPaperPlane } from 'react-icons/fa';
import commonStyles from 'common/scss/common.module.scss';
import styles from './lastPageModal.module.scss';

export default function LastPageModal(props: SendGmailModalProps) {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const navigate = useNavigate();

  const onCloseModal = props.onClose;
  const { downloadExcelFileHandler, sendFile } = useExcelFile({ onCloseModal });

  // for patient user
  const onClickPatientSendFileAndeNavigateToHomePage = () => {
    sendFile();
    navigate('/');
    props.onClose();
  };

  // for hospital user
  const onClickdownloadExcelFileBtn = () => {
    downloadExcelFileHandler();
  };

  // for hospital user
  const onClickNavigateToHomePage = () => {
    navigate('/');
    props.onClose();
  };

  // for patient user - hide excel file download button
  const user = useRecoilValue(userState);

  const onClickSendErrorBtnHandler = () => {
    props.onClose();
    props.openSendGmailModalHandler();
  };

  return (
    <div className={commonStyles['modal-background']} onClick={props.onClose}>
      <article className={styles['modal']} onClick={keepModalOpen}>
        <section className={styles['modal-top-blue-icon-box']}>
          <FiCheckCircle className={styles['check-icon']} />
        </section>
        <h3 className={styles['modal-thanks-title']}>설문 참여에 감사드립니다.</h3>
        {user === USER_HOSPITAL ? (
          <section className={styles['hospital-user-download-send-container']}>
            <button
              className={styles['hospital-user-download-send-btn']}
              onClick={onClickdownloadExcelFileBtn}
            >
              <figure className={styles['hospital-user-download-send-icon-container']}>
                <IoMdDownload className={styles['hospital-user-download-send-icon']} />
              </figure>
              <h3 className={styles['hospital-user-download-send-h3']}>엑셀 파일로 다운로드</h3>
              <p className={styles['hospital-user-download-send-p']}>
                작성하신 설문 내용이
                <br />
                엑셀 파일로 다운로드됩니다.
              </p>
            </button>
            <hr />
            <button className={styles['hospital-user-download-send-btn']} onClick={sendFile}>
              <figure className={styles['hospital-user-download-send-icon-container']}>
                <FaPaperPlane className={styles['hospital-user-download-send-icon']} />
              </figure>
              <h3 className={styles['hospital-user-download-send-h3']}>작성 내용 병원 전송 동의</h3>
              <p className={styles['hospital-user-download-send-p']}>
                작성하신 설문 내용이
                <br />
                담당자에게 메일로 전송됩니다.
              </p>
            </button>
          </section>
        ) : (
          <p className={styles['patient-modal-text-explain-p']}>
            하단 버튼 클릭 시 담당자에게 메일 전송 후<br />첫 화면으로 이동됩니다.
          </p>
        )}
        {user === USER_HOSPITAL ? (
          <button className={styles['hospital-user-home-btn']} onClick={onClickNavigateToHomePage}>
            첫 화면으로 이동
          </button>
        ) : (
          <button
            className={styles['patient-send-mail-btn']}
            onClick={onClickPatientSendFileAndeNavigateToHomePage}
          >
            작성 내용 병원 전송에 동의
          </button>
        )}
        <button className={styles['send-error-btn']} onClick={onClickSendErrorBtnHandler}>
          * 작성 내용 전송 오류가 발생한 경우 여기를 눌러주세요.
        </button>
      </article>
    </div>
  );
}
