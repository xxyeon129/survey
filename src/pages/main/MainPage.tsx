import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
// components
import ModalPortal from 'common/layout/modalPortal';
import CreateNewSurveyModal from './modal/CreateNewSurveyModal';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  personalInfoBirthdayState,
  personalInfoGenderState,
  personalInfoNameState,
} from 'pages/survey/personalInfo/personalInfo.state';
// constants
import { MAIN_PAGE_CONTINUE, MAIN_PAGE_CREATE, MAIN_PAGE_EXCEL, routeItems } from './main.const';
import { HOSPITAL_NAME, SURVEY_NAME } from 'common/constants/survey.const';
import { PATH_URL } from 'common/constants/path.const';
import { SURVEY_01_UPDRS_STATE_KEYWORD } from 'pages/survey/survey-01-UPDRS/survey.const';
// hooks
import useExcelFile from 'common/hooks/useExcelFile';
// styles
import styles from './main.module.scss';
import useCheckRespondedForSidebar from 'common/layout/sidebar/hooks/useCheckRespondedForSidebar';

export default function MainPage() {
  const navigate = useNavigate();

  // for check responded - create new survey condition
  const firstQuestionResponse = useRecoilValue(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)
  );

  // for modal when click create box
  const [createBoxModalOpen, setCreateBoxModalOpen] = useState(false);
  const closeCreateBoxModalHandler = () => {
    setCreateBoxModalOpen(false);
  };

  // for check personal info responses -> to navigate personal page when only responded personal page
  const respondedPersonalInfoName = useRecoilValue(personalInfoNameState);
  const respondedPersonalInfoBirthday = useRecoilValue(personalInfoBirthdayState);
  const respondedPersonalInfoGender = useRecoilValue(personalInfoGenderState);

  const handleRouteBoxClick = (id: string) => {
    switch (id) {
      case MAIN_PAGE_CONTINUE: // 작성 내용 이어서 작성
        onClickContinueBox();
        break;
      case MAIN_PAGE_CREATE: // 새로 작성
        onClickCreateBox();
        break;
      default:
        break;
    }
  };

  // for navigate personal info page
  // 1. when click continue box
  // 2. when click create box -> continue-response modal open -> continue-response button click
  const notRespondedPersonalInfo =
    respondedPersonalInfoName.length === 0 ||
    respondedPersonalInfoBirthday.length === 0 ||
    respondedPersonalInfoGender.length === 0;

  // for navigate continue page
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

  const onClickContinueBox = () => {
    // TO DO: 웹스토리지에 저장된 내용 있는지 확인 -> 있으면 설문 페이지로 이동, 없으면 작성된 내용 없습니다 + 새로 작성하시겠습니까 버튼 팝업창
    if (notRespondedPersonalInfo) {
      navigate(PATH_URL.PERSONAL);
      return;
    } else {
      if (notAllowedClick02FG) {
        navigate(PATH_URL.SURVEY['01_UPDRS']);
      } else if (!notAllowedClick02FG && notAllowedClick03BAI) {
        navigate(PATH_URL.SURVEY['02_FG']);
      } else if (!notAllowedClick03BAI && notAllowedClick04BDI) {
        navigate(PATH_URL.SURVEY['03_BAI']);
      } else if (!notAllowedClick04BDI && notAllowedClick05RBD) {
        navigate(PATH_URL.SURVEY['04_BDI']);
      } else if (!notAllowedClick05RBD && notAllowedClick06NMS) {
        navigate(PATH_URL.SURVEY['05_RBD']);
      } else if (!notAllowedClick06NMS && notAllowedClick07PDQ) {
        navigate(PATH_URL.SURVEY['06_NMS']);
      } else if (!notAllowedClick07PDQ && notAllowedClick08PDSS) {
        navigate(PATH_URL.SURVEY['07_PDQ']);
      } else if (!notAllowedClick08PDSS && notAllowedClick09Tired) {
        navigate(PATH_URL.SURVEY['08_PDSS']);
      } else if (!notAllowedClick09Tired && notAllowedClick10SCOPA) {
        navigate(PATH_URL.SURVEY['09_TIRED']);
      } else if (!notAllowedClick10SCOPA && notAllowedClick11Constipation) {
        navigate(PATH_URL.SURVEY['10_SCOPA']);
      } else if (!notAllowedClick11Constipation && notAllowedClick12Food) {
        navigate(PATH_URL.SURVEY['11_CONSTIPATION']);
      } else {
        navigate(PATH_URL.SURVEY['12_FOOD']);
      }
      return;
    }
  };

  // for navigate personal info page - when click create box - open continue-response modal
  const respondedPersonalInfo =
    respondedPersonalInfoName.length > 0 ||
    respondedPersonalInfoBirthday.length > 0 ||
    respondedPersonalInfoGender.length > 0;

  const onClickCreateBox = () => {
    if (firstQuestionResponse.length > 0 || respondedPersonalInfo) {
      // when have response data open modal
      setCreateBoxModalOpen(true);
    } else {
      navigate(PATH_URL.PERSONAL);
    }
  };

  const routeBoxes = routeItems.map((routeBoxesItem) => (
    <li
      className={styles['route-box']}
      key={uuidv4()}
      onClick={() => handleRouteBoxClick(routeBoxesItem.id)}
    >
      {routeBoxesItem.id === MAIN_PAGE_EXCEL ? (
        <UploadExcelFileBox routeBoxesItem={routeBoxesItem} />
      ) : (
        <div className={styles['route-box-content']}>
          <figure className={styles['route-box-icon-wrapper']}>
            <img src={routeBoxesItem.icon} alt={routeBoxesItem.alt} />
          </figure>
          <div className={styles['route-box-text-wrapper']}>
            <h3>{routeBoxesItem.title}</h3>
            <div className={styles['route-box-description']}>{routeBoxesItem.description}</div>
          </div>
        </div>
      )}
    </li>
  ));

  return (
    <article className={styles['main-container']}>
      <hgroup className={styles['title-container']}>
        <h4>{HOSPITAL_NAME}</h4>
        <h1>{SURVEY_NAME} 전자설문</h1>
      </hgroup>
      <ul className={styles['route-container']}>{routeBoxes}</ul>

      {createBoxModalOpen && (
        <ModalPortal>
          <CreateNewSurveyModal
            onClose={closeCreateBoxModalHandler}
            notRespondedPersonalInfo={notRespondedPersonalInfo}
          />
        </ModalPortal>
      )}
    </article>
  );
}

function UploadExcelFileBox({ routeBoxesItem }: { routeBoxesItem: { [key: string]: string } }) {
  // const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const navigate = useNavigate();
  const { uploadExcelFileHandler, fileRef } = useExcelFile({});

  const onClickExcelBox = async () => {
    await uploadExcelFileHandler();
    // TO DO: 작성한 부분까지 페이지 이동, 헤더 현재 페이지 업데이트
    navigate(PATH_URL.REDIRECT);
  };

  return (
    <>
      <input
        type="file"
        accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ref={fileRef}
        id="excel"
        className={styles['excel-input']}
        onChange={onClickExcelBox}
      />
      <label htmlFor="excel" className={styles['route-box-content']}>
        <figure className={styles['route-box-icon-wrapper']}>
          <img src={routeBoxesItem.icon} alt={routeBoxesItem.alt} />
        </figure>
        <div className={styles['route-box-text-wrapper']}>
          <h3>{routeBoxesItem.title}</h3>
          <div className={styles['route-box-description']}>{routeBoxesItem.description}</div>
        </div>
      </label>
    </>
  );
}
