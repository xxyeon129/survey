import { SURVEY, SURVEY_TITLE } from 'shared/constants/survey.const';
import styles from './sidebar.module.scss';
import { useState } from 'react';

export default function Sidebar() {
  const [checkedIndex, setCheckedIndex] = useState(-1);

  const handleClick = (index: number) => {
    setCheckedIndex(index);

    // TODO: 페이지 이동
  };

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
