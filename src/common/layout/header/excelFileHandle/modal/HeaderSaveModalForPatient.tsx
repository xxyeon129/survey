// hooks
import useExcelFile from 'common/hooks/useExcelFile';
// types
import { SendGmailModalProps } from 'common/layout/modal/sendGmailModal.type';
// styles
import { FaPaperPlane } from 'react-icons/fa';
import commonStyles from 'common/scss/common.module.scss';
import styles from './HeaderSaveModalForPatient.module.scss';

export default function HeaderSaveModalForPatient(props: SendGmailModalProps) {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onCloseModal = props.onClose;
  const { sendFile } = useExcelFile({ onCloseModal });

  const onClickSendErrorBtnHandler = () => {
    props.onClose();
    props.openSendGmailModalHandler();
  };

  return (
    <div className={commonStyles['modal-background']} onClick={props.onClose}>
      <article className={styles['modal']} onClick={keepModalOpen}>
        <figure className={styles['top-icon-wrapper']}>
          <FaPaperPlane className={styles['top-icon']} />
        </figure>
        <hgroup className={styles['text-container']}>
          <h1 className={styles['title-text']}>담당자에게 작성 내용 전송</h1>
          <h3 className={styles['explain-text']}>
            현재 기기에서 작성하신 내용은
            <br />
            창을 닫아도 임시저장됩니다.
            <br />
            다른 기기에서 이어서 작성하실 경우 아래 버튼을 눌러주세요.
          </h3>
        </hgroup>
        <button className={styles['send-mail-btn']} onClick={sendFile}>
          작성 내용 병원 전송에 동의
        </button>
        <button className={styles['send-error-btn']} onClick={onClickSendErrorBtnHandler}>
          * 작성 내용 전송 오류가 발생한 경우 여기를 눌러주세요.
        </button>
      </article>
    </div>
  );
}
