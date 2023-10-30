import { useNavigate } from 'react-router-dom';
// states
import { useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import { survey01CurrentPageState } from 'pages/survey/common/surveyPaginationStates';
// constants
import { PATH_URL } from 'common/constants/path.const';
// styles
import { IoMdArrowRoundForward } from 'react-icons/io';
import styles from './bottomStartBtn.module.scss';

export default function BottomStartBtn() {
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey01CurrentPageState);

  const navigate = useNavigate();

  const onClickStartSurveyBtn = () => {
    navigate(`${PATH_URL.SURVEY_PATH}1`);

    setNextSurveyPage(1);
    setHeaderCurrentPage(1);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles['bottom-start-btn-container']}>
      <button className={styles['start-btn']} onClick={onClickStartSurveyBtn}>
        설문 시작하기
        <div className={styles['start-btn-icon-container']}>
          <IoMdArrowRoundForward />
        </div>
      </button>
    </div>
  );
}
