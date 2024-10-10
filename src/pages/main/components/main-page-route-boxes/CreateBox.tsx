import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// components
import ModalPortal from 'common/layout/modalPortal';
import CreateNewSurveyModal from 'pages/main/components/modal/CreateNewSurveyModal';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { userState } from 'pages/select-home/selectHomePage.state';
import {
  personalInfoBirthdayState,
  personalInfoGenderState,
  personalInfoNameState,
} from 'pages/survey/personalInfo/personalInfo.state';
// constants
import { PATH_URL } from 'common/constants/path.const';
import { SURVEY_01_UPDRS_STATE_KEYWORD } from 'pages/survey/survey-01-UPDRS/survey.const';
import { USER_HOSPITAL } from 'pages/select-home/selectHomeUser.const';
// styles
import createIcon from 'assets/mainpage-create-icon.svg';
import styles from 'pages/main/main.module.scss';
import useLengthCheck from 'common/hooks/useLengthCheck';

export default function CreateBox() {
  const navigate = useNavigate();

  // click create box -> modal open
  const [createBoxModalOpen, setCreateBoxModalOpen] = useState(false);
  // for check responded - create new survey condition - if have responded -> show modal
  const firstQuestionResponse = useRecoilValue(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)
  );

  // for check personal info responses -> to navigate personal page when only responded personal page
  const personalInfoState = {
    name: useRecoilValue(personalInfoNameState),
    birthday: useRecoilValue(personalInfoBirthdayState),
    gender: useRecoilValue(personalInfoGenderState)
  }

  // for navigate personal info page
  // click create box -> continue-response modal open -> continue-response button click
  const notRespondedPersonalInfo = useLengthCheck({
    array: [personalInfoState.name, personalInfoState.birthday, personalInfoState.gender], 
    condition: (el) => el.length === 0
  });

  // for navigate personal info page
  // click create box -> continue-response modal open
  const respondedPersonalInfo = useLengthCheck({
    array: [personalInfoState.name, personalInfoState.birthday, personalInfoState.gender], 
    condition: (el) => el.length > 0
  });

  const onClickCreateBox = () => {
    if (firstQuestionResponse.length || respondedPersonalInfo) {
      // when have response data open modal
      setCreateBoxModalOpen(true);
    } else {
      navigate(PATH_URL.PERSONAL);
    }
  };

  // Responsive UI
  const isHospitalUser = useRecoilValue(userState) === USER_HOSPITAL;
  const isTabletMaxWidthAndHospitalUser = window.innerWidth <= 1280 && isHospitalUser;

  return (
    <>
      <li className={styles['route-box']} onClick={onClickCreateBox}>
        <div className={styles['route-box-content']}>
          {/* for responsive UI */}
          {isTabletMaxWidthAndHospitalUser && <div className={styles['responsive-adjust-height']} />}

          <figure className={styles['route-box-icon-wrapper']}>
            <img src={createIcon} alt="create file icon" />
          </figure>

          <div className={styles['route-box-text-wrapper']}>
            <h3>새로 작성</h3>
            <div className={styles['route-box-description']}>
              설문이 처음이시라면{' '}
              <br className={isTabletMaxWidthAndHospitalUser ? '' : styles['hide-br']} /> 새로
              작성해주세요.
            </div>
          </div>
        </div>
      </li>

      {createBoxModalOpen && (
        <ModalPortal>
          <CreateNewSurveyModal
            onClose={() => setCreateBoxModalOpen(false)}
            notRespondedPersonalInfo={notRespondedPersonalInfo}
          />
        </ModalPortal>
      )}
    </>
  );
}
