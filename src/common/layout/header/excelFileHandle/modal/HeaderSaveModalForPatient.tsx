// hooks
import useExcelFile from 'common/hooks/useExcelFile';
// styles
import { FaPaperPlane } from 'react-icons/fa';
import styles from './HeaderSaveModalForPatient.module.scss';

export default function HeaderSaveModalForPatient({ onClose }: { onClose: () => void }) {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onCloseModal = onClose;
  const { sendFile } = useExcelFile({ onCloseModal });

  return (
    <div className={styles['modal-background']} onClick={onClose}>
      <article className={styles['modal-content']} onClick={keepModalOpen}>
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
      </article>
    </div>
  );
}
