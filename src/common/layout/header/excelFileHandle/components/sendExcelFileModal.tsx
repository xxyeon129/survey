import styles from './sendExcelFileModal.module.scss';

export default function SendExcelFileModal({ onClose }: { onClose: () => void }) {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles['modal']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={keepModalOpen}>
        <h3>
          현재 PC에서 작성하신 내용은 창을 닫아도 임시저장됩니다.
          <br />
          다른 PC에서 이어서 작성하실 예정일 경우"작성 내용 메일 전송" 버튼을 눌러주세요.
        </h3>
        <section className={styles['btn-container']}>
          <button className={styles['send-mail-btn']}>작성 내용 메일 전송</button>
          <button type="button" onClick={onClose}>
            닫기
          </button>
        </section>
      </div>
    </div>
  );
}
