import { userState } from 'pages/select-home/selectHomePage.state';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// constants
import { USER_HOSPITAL } from 'pages/select-home/selectHomeUser.const';
// hooks
import useExcelFile from 'common/hooks/useExcelFile';
// styles
import { FiCheckCircle } from 'react-icons/fi';
import { IoMdDownload } from 'react-icons/io';
import { FaPaperPlane } from 'react-icons/fa';
import commonStyles from 'common/scss/common.module.scss';
import styles from './lastPageModal.module.scss';

export default function LastPageModal({ onClose }: { onClose: () => void }) {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const navigate = useNavigate();

  const onCloseModal = onClose;
  const { downloadExcelFileHandler, sendFile } = useExcelFile({ onCloseModal });

  // for hospital user
  const onClickdownloadExcelFileBtn = () => {
    downloadExcelFileHandler();
  };

  // for hospital user
  const onClickNaviagteToHomePage = () => {
    navigate('/');
    onClose();
  };

  // for patient user - hide excel file download button
  const user = useRecoilValue(userState);

  return (
    <div className={commonStyles['modal-background']} onClick={onClose}>
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
          <button className={styles['hospital-user-home-btn']} onClick={onClickNaviagteToHomePage}>
            첫 화면으로 이동
          </button>
        ) : (
          <button className={styles['patient-send-mail-btn']} onClick={sendFile}>
            작성 내용 병원 전송에 동의
          </button>
        )}
      </article>
    </div>
  );
}
