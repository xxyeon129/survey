import { PATH_URL } from 'common/constants/path.const';
import styles from './createNewSurveyModal.module.scss';
import { useNavigate } from 'react-router-dom';

export default function CreateNewSurveyModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const createNewSurveyBtnClick = () => {
    navigate(PATH_URL.RESET);
  };

  const continueBtnClick = () => {
    navigate(PATH_URL.SURVEY['01_UPDRS']);
  };

  return (
    <div className={styles['modal']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={keepModalOpen}>
        <h3>
          자동 저장된 작성 내용이 있습니다.
          <br />
          이전 내용을 지우고 새로 작성하시겠습니까?
        </h3>
        <p className={styles['explain']}>새로 작성하기를 누르면 자동저장된 내용은 삭제됩니다.</p>
        <section className={styles['btn-container']}>
          <button className={styles['create-new-survey-btn']} onClick={createNewSurveyBtnClick}>
            새로 작성하기
          </button>
          <button className={styles['continue-survey-btn']} onClick={continueBtnClick}>
            이어서 작성하기
          </button>
        </section>
      </div>
    </div>
  );
}
