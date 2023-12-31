import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
// states
import { userState } from './selectHomePage.state';
// constants
import { SURVEY_NAME } from 'common/constants/survey.const';
import { USER_HOSPITAL, USER_PATIENT } from './selectHomeUser.const';
import { PATH_URL } from 'common/constants/path.const';
// hooks
import useBackBlock from 'common/hooks/useBackBlock';
// styles
import { IoPeople } from 'react-icons/io5';
import { FaHospitalUser } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import logo from 'assets/header-logo.svg';
import backgroundImg from 'assets/hompage-background.png';
import styles from './selectHomePage.module.scss';

export default function SelectHomePage() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const onClickBox = (clickedBoxValue: string) => {
    setUser(clickedBoxValue);
    navigate(PATH_URL.MAIN);
  };

  useEffect(() => {
    setUser('');
  }, []);

  // for prevent back page
  useBackBlock('/');

  const topTitleElement = (
    <hgroup className={styles['top-title-container']}>
      <h1 className={styles['top-title-h1']}>전자 설문지 작성자를 선택해 주세요.</h1>
      <h3 className={styles['top-sub-title-h3']}>{SURVEY_NAME} 전자 설문</h3>
    </hgroup>
  );

  return (
    <article className={styles['select-page-container']}>
      <img className={styles['top-logo']} src={logo} />
      {topTitleElement}
      <section className={styles['select-boxes-container-section']}>
        <div
          className={`${styles['select-box']} ${styles['select-box-patient']}`}
          onClick={() => onClickBox(USER_PATIENT)}
        >
          <figure
            className={`${styles['icon-circle-wrapper']} ${styles['icon-circle-wrapper-patient']}`}
          >
            <IoPeople className={styles['icon']} />
          </figure>
          <figcaption className={styles['select-box-text-container']}>
            <h2 className={styles['select-box-title-text']}>환자 • 보호자</h2>
            <p className={styles['select-box-explain-text']}>
              환자나 보호자분께서
              <br />
              직접 설문을 작성하시는 경우
            </p>
          </figcaption>
          <button className={`${styles['select-box-bottom-btn']} ${styles['patient-button']}`}>
            설문 작성하기
            <IoIosArrowForward className={styles['bottom-button-arrow-icon']} />
          </button>
        </div>

        <div
          className={`${styles['select-box']} ${styles['select-box-hospital']}`}
          onClick={() => onClickBox(USER_HOSPITAL)}
        >
          <figure
            className={`${styles['icon-circle-wrapper']} ${styles['icon-circle-wrapper-hospital']}`}
          >
            <FaHospitalUser className={styles['icon']} />
          </figure>
          <figcaption className={styles['select-box-text-container']}>
            <h2 className={styles['select-box-title-text']}>병원 관계자</h2>
            <p className={styles['select-box-explain-text']}>
              엑셀 파일 다운로드나
              <br />
              엑셀 파일 반영이 필요하신 경우
            </p>
          </figcaption>
          <button className={`${styles['select-box-bottom-btn']} ${styles['hospital-button']}`}>
            설문 작성하기
            <IoIosArrowForward className={styles['bottom-button-arrow-icon']} />
          </button>
        </div>
      </section>
      <img className={styles['background-img']} src={backgroundImg} alt="abstract background" />
    </article>
  );
}
