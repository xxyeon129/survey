import { SURVEY_NAME, SURVEY_TITLE_LIST } from 'shared/constants/survey.const';
import styles from './sidebar.module.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from '../header/pagination/headerPageState';
import {
  survey01CurrentPageState,
  survey02CurrentPageState,
  survey03CurrentPageState,
  survey04CurrentPageState,
  survey05CurrentPageState,
} from 'pages/survey/common/surveyPaginationStates';
import { SURVEY_01_UPDRS_TOTAL_PAGES } from 'pages/survey/survey-01-UPDRS/survey.const';
import { SURVEY_02_FG_TOTAL_PAGES } from 'pages/survey/survey-02-FG/survey.const';
import { SURVEY_03_BAI_TOTAL_PAGES } from 'pages/survey/survey-03-BAI/survey.const';
import { SURVEY_04_BDI_TOTAL_PAGES } from 'pages/survey/survey-04-BDI/survey.const';

export default function Sidebar() {
  const [checkedIndex, setCheckedIndex] = useState(0);
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);

  const resetSurveyPage = [
    survey01CurrentPageState,
    survey02CurrentPageState,
    survey03CurrentPageState,
    survey04CurrentPageState,
    survey05CurrentPageState,
  ].map(useResetRecoilState);

  const navigate = useNavigate();

  // for checked css display
  const { pathname } = useLocation();
  const location = +pathname.substring(8);

  const handleClick = (index: number) => {
    navigate(`/survey/${index}`);
    setCheckedIndex(index);

    // for update header current page display
    if (index > 0) {
      let prevPages = 2;

      switch (index) {
        case 1:
          setHeaderCurrentPage(prevPages);
          break;
        case 2:
          prevPages += SURVEY_01_UPDRS_TOTAL_PAGES;
          setHeaderCurrentPage(prevPages);
          break;
        case 3:
          prevPages += SURVEY_01_UPDRS_TOTAL_PAGES + SURVEY_02_FG_TOTAL_PAGES;
          setHeaderCurrentPage(prevPages);
          break;
        case 4:
          prevPages +=
            SURVEY_01_UPDRS_TOTAL_PAGES + SURVEY_02_FG_TOTAL_PAGES + SURVEY_03_BAI_TOTAL_PAGES;
          setHeaderCurrentPage(prevPages);
          break;
        case 5:
          prevPages +=
            SURVEY_01_UPDRS_TOTAL_PAGES +
            SURVEY_02_FG_TOTAL_PAGES +
            SURVEY_03_BAI_TOTAL_PAGES +
            SURVEY_04_BDI_TOTAL_PAGES;
          setHeaderCurrentPage(prevPages);
          break;
        default:
          break;
      }
    }

    // for display survey first page
    resetSurveyPage.forEach((reset) => reset());
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setCheckedIndex(location);
  }, [pathname]);

  const surveyList = Object.values(SURVEY_TITLE_LIST).map((surveyTitle) => surveyTitle.TITLE);

  return (
    <aside>
      <ul>
        <li>{`${SURVEY_NAME} 설문`}</li>
        {surveyList.map((surveyTitle, index) => (
          <li
            key={index}
            className={checkedIndex === index ? styles['checked'] : ''}
            onClick={() => handleClick(index)}
          >
            {index}. {surveyTitle}
          </li>
        ))}
      </ul>
    </aside>
  );
}
