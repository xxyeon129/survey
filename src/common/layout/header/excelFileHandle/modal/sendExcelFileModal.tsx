import { useRecoilValue } from 'recoil';
// states
import { userState } from 'pages/select-home/selectHomePage.state';
// constants
import { USER_HOSPITAL } from 'pages/select-home/selectHomeUser.const';
// hooks
import useExcelFile from 'common/hooks/useExcelFile';
// styles
import styles from './sendExcelFileModal.module.scss';

export default function SendExcelFileModal({ onClose }: { onClose: () => void }) {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onCloseModal = onClose;
  const { downloadExcelFileHandler, sendFile } = useExcelFile({ onCloseModal });

  const onClickdownloadExcelFileBtn = () => {
    downloadExcelFileHandler();
    onClose();
  };

  // for patient user - hide excel file download button
  const user = useRecoilValue(userState);

  return (
    <div className={styles['modal']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={keepModalOpen}>
        <h3>
          현재 기기에서 작성하신 내용은 창을 닫아도 임시저장됩니다.
          <br />
          다른 기기에서 이어서 작성하실 예정일 경우"작성 내용 메일 전송" 버튼을 눌러주세요.
        </h3>
        <section className={styles['btn-container']}>
          {user === USER_HOSPITAL && (
            <button className={styles['download-mail-btn']} onClick={onClickdownloadExcelFileBtn}>
              작성 내용 엑셀 파일로 다운로드
            </button>
          )}
          <button className={styles['send-mail-btn']} onClick={sendFile}>
            작성 내용 메일 전송
          </button>
          {/* TO DO: 모달창 리디자인, 닫기 버튼 */}
          {/* <button type="button" onClick={onClose}>
            닫기
          </button> */}
        </section>
      </div>
    </div>
  );
}
