// hooks
import useExcelFile from 'common/hooks/useExcelFile';
// types
import { SendGmailModalProps } from 'common/layout/modal/sendGmailModal.type';
// styles
import { FiDownload } from 'react-icons/fi';
import { FaPaperPlane } from 'react-icons/fa';
import commonStyles from 'common/scss/common.module.scss';
import styles from './headerSaveModalForHospital.module.scss';

export default function HeaderSaveModalForHospital(props: SendGmailModalProps) {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onCloseModal = props.onClose;
  const { downloadExcelFileHandler, sendFile } = useExcelFile({ onCloseModal });

  const onClickdownloadExcelFileBtn = () => {
    downloadExcelFileHandler();
    props.onClose();
  };

  const onClickSendErrorBtnHandler = () => {
    props.onClose();
    props.openSendGmailModalHandler();
  };

  return (
    <div className={commonStyles['modal-background']} onClick={props.onClose}>
      <article className={styles['modal']} onClick={keepModalOpen}>
        <hgroup className={styles['text-container']}>
          <h1 className={styles['title-text']}>다른 기기에서 이어 작성하실 경우</h1>
          <h3 className={styles['explain-text']}>
            현재 기기에서 작성하신 내용은
            <br />
            창을 닫아도 임시저장됩니다.
            <br />
            다른 기기에서 이어서 작성하실 경우 작업을 실행해 주세요.
          </h3>
        </hgroup>
        <section className={styles['bottom-btn-container']}>
          <button className={styles['download-excel-btn']} onClick={onClickdownloadExcelFileBtn}>
            <FiDownload className={`${styles['btn-icon']} ${styles['download-icon']}`} />
            작성 내용 엑셀 파일로 다운로드
          </button>
          <button className={styles['send-mail-btn']} onClick={sendFile}>
            <FaPaperPlane className={styles['btn-icon']} />
            작성 내용 병원 전송에 동의
          </button>
        </section>
        <button className={styles['send-error-btn']} onClick={onClickSendErrorBtnHandler}>
          * 작성 내용 전송 오류가 발생한 경우 여기를 눌러주세요.
        </button>
      </article>
    </div>
  );
}
