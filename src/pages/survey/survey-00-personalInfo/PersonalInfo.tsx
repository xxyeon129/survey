import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from 'components/layout/header/pagination/headerPageState';
import styles from 'pages/survey/common/survey.module.scss';
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import { useNavigate } from 'react-router-dom';
import { survey01CurrentPageState } from '../common/surveyPaginationStates';
import { PATH_URL } from 'shared/constants/path.const';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
import { SURVEY_TITLE_LIST } from 'shared/constants/survey.const';

export default function PersonalInfo() {
  const navigate = useNavigate();

  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey01CurrentPageState);

  const handleNextPage = () => {
    navigate(`${PATH_URL.SURVEY_PATH}1`);

    setNextSurveyPage(1);
    setHeaderCurrentPage(2);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setHeaderCurrentPage(1);
  }, []);

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[0].TITLE} subTitle={SURVEY_TITLE_LIST[0].SUB_TITLE} />

      <BottomPrevNextButton handleNextPage={handleNextPage} />
    </article>
  );
}
