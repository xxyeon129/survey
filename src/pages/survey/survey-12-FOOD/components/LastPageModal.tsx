import useExcelFile from 'common/hooks/useExcelFile';
import styles from './lastPageModal.module.scss';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from 'common/constants/path.const';

export default function LastPageModal({ onClose }: { onClose: () => void }) {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const navigate = useNavigate();

  const onCloseModal = onClose;
  const { downloadExcelFileHandler, sendFile } = useExcelFile({ onCloseModal });

  const onClickdownloadExcelFileBtn = () => {
    downloadExcelFileHandler();
    navigate(PATH_URL.MAIN);
    onClose();
  };

  // TO DO: 환자로 접속 시, 병원에서 접속 시에 따라 구분
  // 환자로 접속 -> 이메일 전송만 표시
  // 병원에서 접속 -> 이메일 전송, 엑셀 파일 다운로드 모두 표시
  return (
    <div className={styles['modal']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={keepModalOpen}>
        <h3>
          설문이 종료되었습니다.
          <br />
          환자 개인용 기기에서 작성하신 경우 "작성 내용 메일 전송"을 클릭해 주시기 바랍니다.
          <br />
          작성하신 내용을 기기에 저장하시려면 "작성 내용 엑셀 파일로 다운로드"를 클릭해 주세요.
        </h3>
        <section className={styles['btn-container']}>
          <button className={styles['download-mail-btn']} onClick={onClickdownloadExcelFileBtn}>
            작성 내용 엑셀 파일로 다운로드
          </button>
          <button className={styles['send-mail-btn']} onClick={sendFile}>
            작성 내용 메일 전송
          </button>
          {/* <button type="button" onClick={onClose}>
            닫기
          </button> */}
        </section>
      </div>
    </div>
  );
}
