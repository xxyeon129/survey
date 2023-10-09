import { SURVEY, SURVEY_TITLE } from 'shared/constants/survey.const';
import './sidebar.scss';
import { useState } from 'react';

export default function Sidebar() {
  const [checkedIndex, setCheckedIndex] = useState(-1);

  const handleClick = (index: number) => {
    setCheckedIndex(index);

    // TODO: 페이지 이동
  };

  const surveyList = Object.values(SURVEY).map((el) => el.TYPE);

  return (
    <aside>
      <ul>
        <li>{SURVEY_TITLE}</li>
        {surveyList.map((surveyType, index) => (
          <li
            key={index}
            className={checkedIndex === index ? 'checked' : ''}
            onClick={() => handleClick(index)}
          >
            {index}. {surveyType}
          </li>
        ))}
      </ul>
    </aside>
  );
}
