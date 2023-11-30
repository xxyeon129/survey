import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// components
import ModalPortal from '../modalPortal';
import SidebarMovePreventModal from './move-prevent-modal/SidebarMovePreventModal';
// states
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from '../header/pagination/headerPageState';
// constants
import { SURVEY_NAME, SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { surveyCurrentPageStates } from './surveyCurrentPageStates.const';
import { PATH_URL } from 'common/constants/path.const';
// hooks
import useCheckRespondedForSidebar from './hooks/useCheckRespondedForSidebar';
import useTotalPages from '../header/pagination/useTotalPages';
import useModal from 'common/hooks/useModal';
// styles
import styles from './sidebar.module.scss';

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

  // for for modal prevent move when not responded survey
  const { modalOpen, openModalHandler, closeModalHandler } = useModal();

  // for update header current page display
  const { totalPagesList } = useTotalPages();

  const handleClick = (index: number) => {
    if (index === 0) {
      navigate(PATH_URL.PERSONAL);
      return;
    }

    // for prevent move when not responded survey
    switch (index) {
      case 2:
        if (notAllowedClick02FG) {
          openModalHandler();
          return;
        }
        break;
      case 3:
        if (notAllowedClick03BAI) {
          openModalHandler();
          return;
        }
        break;
      case 4:
        if (notAllowedClick04BDI) {
          openModalHandler();
          return;
        }
        break;
      case 5:
        if (notAllowedClick05RBD) {
          openModalHandler();
          return;
        }
        break;
      case 6:
        if (notAllowedClick06NMS) {
          openModalHandler();
          return;
        }
        break;
      case 7:
        if (notAllowedClick07PDQ) {
          openModalHandler();
          return;
        }
        break;
      case 8:
        if (notAllowedClick08PDSS) {
          openModalHandler();
          return;
        }
        break;
      case 9:
        if (notAllowedClick09Tired) {
          openModalHandler();
          return;
        }
        break;
      case 10:
        if (notAllowedClick10SCOPA) {
          openModalHandler();
          return;
        }
        break;
      case 11:
        if (notAllowedClick11Constipation) {
          openModalHandler();
          return;
        }
        break;
      case 12:
        if (notAllowedClick12Food) {
          openModalHandler();
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
      {modalOpen && (
        <ModalPortal>
          <SidebarMovePreventModal onClose={closeModalHandler} />
        </ModalPortal>
      )}
    </aside>
  );
}
