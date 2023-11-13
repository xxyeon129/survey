import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './sidebar.module.scss';
// states
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from '../header/pagination/headerPageState';
// constants
import { SURVEY_NAME, SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { totalPagesList } from '../header/pagination/totalPages.const';
import { surveyCurrentPageStates } from './surveyCurrentPageStates.const';
import { PATH_URL } from 'common/constants/path.const';
import useCheckRespondedForSidebar from './hooks/useCheckRespondedForSidebar';

export default function Sidebar() {
  const [checkedIndex, setCheckedIndex] = useState(0);
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);

  const surveyPageStateResetterList = surveyCurrentPageStates.map(useResetRecoilState);

  const navigate = useNavigate();

  // for checked css display
  const { pathname } = useLocation();
  const location = +pathname.substring(8);

  // for prevent move when not responded survey
  const {
    notAllowedClick02FG,
    notAllowedClick03BAI,
    notAllowedClick04BDI,
    notAllowedClick05RBD,
    notAllowedClick06NMS,
    notAllowedClick07PDQ,
    notAllowedClick08PDSS,
    notAllowedClick09Tired,
    notAllowedClick10SCOPA,
    notAllowedClick11Constipation,
    notAllowedClick12Food,
  } = useCheckRespondedForSidebar();

  const handleClick = (index: number) => {
    if (index === 0) {
      navigate(PATH_URL.PERSONAL);
      return;
    }

    // for prevent move when not responded survey
    switch (index) {
      case 2:
        if (notAllowedClick02FG) {
          alert('이전 설문의 모든 질문에 응답 후 이동이 가능합니다.');
          return;
        }
        break;
      case 3:
        if (notAllowedClick03BAI) {
          alert('이전 설문의 모든 질문에 응답 후 이동이 가능합니다.');
          return;
        }
        break;
      case 4:
        if (notAllowedClick04BDI) {
          alert('이전 설문의 모든 질문에 응답 후 이동이 가능합니다.');
          return;
        }
        break;
      case 5:
        if (notAllowedClick05RBD) {
          alert('이전 설문의 모든 질문에 응답 후 이동이 가능합니다.');
          return;
        }
        break;
      case 6:
        if (notAllowedClick06NMS) {
          alert('이전 설문의 모든 질문에 응답 후 이동이 가능합니다.');
          return;
        }
        break;
      case 7:
        if (notAllowedClick07PDQ) {
          alert('이전 설문의 모든 질문에 응답 후 이동이 가능합니다.');
          return;
        }
        break;
      case 8:
        if (notAllowedClick08PDSS) {
          alert('이전 설문의 모든 질문에 응답 후 이동이 가능합니다.');
          return;
        }
        break;
      case 9:
        if (notAllowedClick09Tired) {
          alert('이전 설문의 모든 질문에 응답 후 이동이 가능합니다.');
          return;
        }
        break;
      case 10:
        if (notAllowedClick10SCOPA) {
          alert('이전 설문의 모든 질문에 응답 후 이동이 가능합니다.');
          return;
        }
        break;
      case 11:
        if (notAllowedClick11Constipation) {
          alert('이전 설문의 모든 질문에 응답 후 이동이 가능합니다.');
          return;
        }
        break;
      case 12:
        if (notAllowedClick12Food) {
          alert('이전 설문의 모든 질문에 응답 후 이동이 가능합니다.');
          return;
        }
        break;
      default:
        break;
    }

    navigate(`/survey/${index}`);
    setCheckedIndex(index);

    // for update header current page display
    if (index === 1) {
      setHeaderCurrentPage(1);
    } else {
      const prevPagesList = totalPagesList.slice(0, index - 1);

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
    <aside className={styles.aside}>
      <ul>
        <li>{`${SURVEY_NAME} 설문`}</li>
        {surveyList.map((surveyTitle, index) => (
          <li
            key={index}
            className={checkedIndex === index ? styles['checked'] : ''}
            onClick={() => handleClick(index)}
          >
            {index !== 0 && `${index}.`} {surveyTitle}
          </li>
        ))}
      </ul>
    </aside>
  );
}
