import { SURVEY, SURVEY_TITLE } from 'shared/constants/survey.const';
import styles from './sidebar.module.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from '../header/pagination/headerPageState';
import { survey01TotalPages } from 'pages/survey/survey-01-BDI/survey.const';
import { survey02TotalPages } from 'pages/survey/survey-02-RBD/survey.const';
import { survey03TotalPages } from 'pages/survey/survey-03-SCOPA/survey.const';
import { survey04TotalPages } from 'pages/survey/survey-04-UPDRS/survey.const';
import {
  survey01CurrentPageState,
  survey02CurrentPageState,
  survey03CurrentPageState,
  survey04CurrentPageState,
  survey05CurrentPageState,
} from 'pages/survey/common/surveyPaginationStates';

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
          prevPages += survey01TotalPages;
          setHeaderCurrentPage(prevPages);
          break;
        case 3:
          prevPages += survey01TotalPages + survey02TotalPages;
          setHeaderCurrentPage(prevPages);
          break;
        case 4:
          prevPages += survey01TotalPages + survey02TotalPages + survey03TotalPages;
          setHeaderCurrentPage(prevPages);
          break;
        case 5:
          prevPages +=
            survey01TotalPages + survey02TotalPages + survey03TotalPages + survey04TotalPages;
          setHeaderCurrentPage(prevPages);
          break;
        default:
          break;
      }
    }

    // for display survey first page
    resetSurveyPage.forEach((reset) => reset());
  };

  useEffect(() => {
    setCheckedIndex(location);
  }, [pathname]);

  const surveyList = Object.values(SURVEY).map((surveyItem) => surveyItem.TITLE);

  return (
    <aside>
      <ul>
        <li>{`${SURVEY_TITLE} 설문`}</li>
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
