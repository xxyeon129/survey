import useExcelFile from 'common/hooks/useExcelFile';
import styles from './sendExcelFileModal.module.scss';

export default function SendExcelFileModal({ onClose }: { onClose: () => void }) {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const { downloadExcelFileHandler, sendFile } = useExcelFile();

  const onClickdownloadExcelFileBtn = () => {
    downloadExcelFileHandler();
    onClose();
  };

  // TO DO: 환자로 접속 시, 병원에서 접속 시에 따라 구분
  // 환자로 접속 -> 이메일 전송만 표시
  // 병원에서 접속 -> 이메일 전송, 엑셀 파일 다운로드 모두 표시
  return (
    <div className={styles['modal']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={keepModalOpen}>
        <h3>
          현재 PC에서 작성하신 내용은 창을 닫아도 임시저장됩니다.
          <br />
          다른 PC에서 이어서 작성하실 예정일 경우"작성 내용 메일 전송" 버튼을 눌러주세요.
        </h3>
        <section className={styles['btn-container']}>
          <button className={styles['download-mail-btn']} onClick={onClickdownloadExcelFileBtn}>
            작성 내용 엑셀 파일로 다운로드
          </button>
          <button className={styles['send-mail-btn']} onClick={sendFile}>
            작성 내용 메일 전송
          </button>
          <button type="button" onClick={onClose}>
            닫기
          </button>
        </section>
      </div>
    </div>
  );
}
