import { GoAlertFill } from 'react-icons/go';
import commonStyles from 'common/scss/common.module.scss';
import styles from './sidebarMovePreventModal.module.scss';

export default function SidebarMovePreventModal({ onClose }: { onClose: () => void }) {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={commonStyles['modal-background']} onClick={onClose}>
      <article className={styles['modal']} onClick={keepModalOpen}>
        <section className={styles['modal-top-blue-icon-box']}>
          <GoAlertFill className={styles['top-alert-icon']} />
        </section>
        <h3 className={styles['modal-text']}>
          이전 설문의 모든 질문에 응답 후 이동이 가능합니다.
          <br />
          현재 설문의 질문에 모두 응답해주세요.
        </h3>
        <button className={styles['close-btn']} onClick={onClose}>
          닫기
        </button>
      </article>
    </div>
  );
}
