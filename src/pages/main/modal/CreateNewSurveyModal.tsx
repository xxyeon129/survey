import { PATH_URL } from 'common/constants/path.const';
import styles from './createNewSurveyModal.module.scss';
import { useNavigate } from 'react-router-dom';
import useNaviateNotRespondedSurveyPage from '../hooks/useNavigateNotRespondedSurveyPage';

interface CreateNewSurveyModalProps {
  onClose: () => void;
  notRespondedPersonalInfo: boolean;
}

export default function CreateNewSurveyModal(props: CreateNewSurveyModalProps) {
  const navigate = useNavigate();

  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const createNewSurveyBtnClick = () => {
    navigate(PATH_URL.RESET);
  };

  // for navigate continue page
  const naviageNotRespondedSurveyPage = useNaviateNotRespondedSurveyPage();

  const continueBtnClick = () => {
    // when have blank in personal info page
    if (props.notRespondedPersonalInfo) {
      navigate(PATH_URL.PERSONAL);
    } else {
      naviageNotRespondedSurveyPage();
    }
  };

  return (
    <div className={styles['modal']} onClick={props.onClose}>
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
