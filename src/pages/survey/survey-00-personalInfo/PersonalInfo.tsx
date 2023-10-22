import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from 'components/layout/header/pagination/headerPageState';
import styles from 'pages/survey/common/survey.module.scss';
import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import { useNavigate } from 'react-router-dom';
import { survey01CurrentPageState } from '../common/surveyPaginationStates';
import { PATH_URL } from 'shared/constants/path.const';

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
      <SurveyTitle title={SURVEY[0].TITLE} subTitle={SURVEY[0].SUB_TITLE} />

      {/* <BottomPrevNextButton
        currentPage={currentPage}
        currentSurveyTotalPages={currentSurveyTotalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      /> */}
      <button onClick={handleNextPage}>다음</button>
    </article>
  );
}
