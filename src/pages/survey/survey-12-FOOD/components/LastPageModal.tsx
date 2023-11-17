import useExcelFile from 'common/hooks/useExcelFile';
import styles from './lastPageModal.module.scss';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from 'common/constants/path.const';
import { useRecoilValue } from 'recoil';
import { userState } from 'pages/select-home/selectHomePage.state';
import { USER_HOSPITAL } from 'pages/select-home/selectHomeUser.const';

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

  // for patient user - hide excel file download button
  const user = useRecoilValue(userState);

  return (
    <div className={styles['modal']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={keepModalOpen}>
        <h3>
          설문이 종료되었습니다.
          <br />
          환자 개인용 기기에서 작성하신 경우 "작성 내용 병원 전송에 동의"을 클릭해 주시기 바랍니다.
          {user === USER_HOSPITAL && (
            <>
              <br />
              {`작성하신 내용을 기기에 저장하시려면 "작성 내용 엑셀 파일로 다운로드"를 클릭해 주세요.`}
            </>
          )}
        </h3>
        <section className={styles['btn-container']}>
          {user === USER_HOSPITAL && (
            <button className={styles['download-mail-btn']} onClick={onClickdownloadExcelFileBtn}>
              작성 내용 엑셀 파일로 다운로드
            </button>
          )}
          <button className={styles['send-mail-btn']} onClick={sendFile}>
            작성 내용 병원 전송에 동의
          </button>
          {/* <button type="button" onClick={onClose}>
            닫기
          </button> */}
        </section>
      </div>
    </div>
  );
}
