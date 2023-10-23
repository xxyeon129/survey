import { SURVEY_NAME, SURVEY_TITLE_LIST } from 'shared/constants/survey.const';
import styles from './sidebar.module.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from '../header/pagination/headerPageState';
import { totalPagesList } from '../header/pagination/totalPages.const';
import { surveyCurrentPageStates } from './surveyCurrentPageStates.const';

export default function Sidebar() {
  const [checkedIndex, setCheckedIndex] = useState(0);
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);

  const surveyPageStateResetterList = surveyCurrentPageStates.map(useResetRecoilState);

  const navigate = useNavigate();

  // for checked css display
  const { pathname } = useLocation();
  const location = +pathname.substring(8);

  const handleClick = (index: number) => {
    navigate(`/survey/${index}`);
    setCheckedIndex(index);

    // for update header current page display
    if (index > 0) {
      const prevPagesList = totalPagesList.slice(0, index);
      const prevPagesCount = prevPagesList.reduce((acc, cur) => acc + cur, 1);
      setHeaderCurrentPage(prevPagesCount);
    }

    // for display survey first page
    surveyPageStateResetterList.forEach(
      (reset, resetterIndex) => resetterIndex + 1 === index && reset()
    );
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
