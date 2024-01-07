import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// states
import { userState } from 'pages/select-home/selectHomePage.state';
// import {
//   personalInfoBirthdayState,
//   personalInfoGenderState,
//   personalInfoNameState,
// } from 'pages/survey/personalInfo/personalInfo.state';
// constants
import { PATH_URL } from 'common/constants/path.const';
import { USER_HOSPITAL } from 'pages/select-home/selectHomeUser.const';
// hooks
// import useNaviateNotRespondedSurveyPage from 'pages/main/hooks/useNavigateNotRespondedSurveyPage';
// styles
import continueIcon from 'assets/mainpage-continue-icon.svg';
import styles from 'pages/main/main.module.scss';

export default function ContinueBox() {
  const navigate = useNavigate();
  // const naviageNotRespondedSurveyPage = useNaviateNotRespondedSurveyPage();

  // for check personal info responses -> to navigate personal page when only responded personal page
  // const respondedPersonalInfoName = useRecoilValue(personalInfoNameState);
  // const respondedPersonalInfoBirthday = useRecoilValue(personalInfoBirthdayState);
  // const respondedPersonalInfoGender = useRecoilValue(personalInfoGenderState);

  // for click continue box -> navigate personal info page
  // const notRespondedPersonalInfo =
  //   respondedPersonalInfoName.length === 0 ||
  //   respondedPersonalInfoBirthday.length === 0 ||
  //   respondedPersonalInfoGender.length === 0;

  const onClickContinueBox = () => {
    // TO DO: 웹스토리지에 저장된 내용 있는지 확인 -> 있으면 설문 페이지로 이동, 없으면 작성된 내용 없습니다 + 새로 작성하시겠습니까 버튼 팝업창
    // if (notRespondedPersonalInfo) {
    navigate(PATH_URL.PERSONAL);
    //   return;
    // } else {
    //   naviageNotRespondedSurveyPage();
    // }
  };

  // for responsive UI
  const isHospitalUser = useRecoilValue(userState) === USER_HOSPITAL;
  const isTabletMaxWidthAndHospitalUser = window.innerWidth <= 1280 && isHospitalUser;

  return (
    <li className={styles['route-box']} onClick={onClickContinueBox}>
      <div className={styles['route-box-content']}>
        {/* for responsive UI */}
        {isTabletMaxWidthAndHospitalUser && <div className={styles['responsive-adjust-height']} />}
        {/* */}
        <figure className={styles['route-box-icon-wrapper']}>
          <img src={continueIcon} alt="pencil icon" />
        </figure>
        <div className={styles['route-box-text-wrapper']}>
          <h3>작성한 내용 이어서 작성</h3>
          <div className={styles['route-box-description']}>
            해당 페이지에서{' '}
            <br className={isTabletMaxWidthAndHospitalUser ? '' : styles['hide-br']} /> 작성하신
            내용이 있다면
            <br />
            이어서 작성해주세요.
          </div>
        </div>
      </div>
    </li>
  );
}
