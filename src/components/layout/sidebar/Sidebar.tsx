import { SURVEY, SURVEY_TITLE } from 'shared/constants/survey.const';
import styles from './sidebar.module.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import calculatePages from 'shared/utils/calculatePages';
import { useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from '../header/pagination/headerPageState';

export default function Sidebar() {
  const [checkedIndex, setCheckedIndex] = useState(0);
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = +pathname.substring(8);

  const handleClick = (index: number) => {
    navigate(`/survey/${index}`);
    setCheckedIndex(index);
  };

  const surveyList = Object.values(SURVEY).map((surveyItem) => surveyItem.TITLE);

  // for update header current page display

  // useEffect(() => {
  //   setCheckedIndex(location);
  //   setHeaderCurrentPage(calculatePages(location));
  // }, [checkedIndex, pathname]);

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
