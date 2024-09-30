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
import styles from './selectHomePage.module.scss';
// types
import { IconType } from 'react-icons';

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

  // Prevent back page
  useBackBlock('/');

  const topTitleElement = (
    <hgroup className={styles['top-title-container']}>
      <h1 className={styles['top-title-h1']}>전자 설문지 작성자를 선택해 주세요.</h1>
      <h3 className={styles['top-sub-title-h3']}>{SURVEY_NAME} 전자 설문</h3>
    </hgroup>
  );

  return (
    <article className={styles['select-page-container']}>
      <img className={styles['top-logo']} src={logo} alt='Hospital Logo' />
      {topTitleElement}
      <section className={styles['select-boxes-container-section']}>
        <SelectBox
          user='patient'
          onClickBox={onClickBox}
          clickedBoxValue={USER_PATIENT}
          Icon={IoPeople}
          title='환자 • 보호자'
          description={
            <>
              환자나 보호자분께서
              <br />
              직접 설문을 작성하시는 경우
            </>
          }
        />
        <SelectBox
          user='hospital'
          onClickBox={onClickBox}
          clickedBoxValue={USER_HOSPITAL}
          Icon={FaHospitalUser}
          title='병원 관계자'
          description={
            <>
              엑셀 파일 다운로드나
              <br />
              엑셀 파일 반영이 필요하신 경우
            </>
          }
        />
      </section>
    </article>
  );
}

interface SelectBoxProps {
  user: string;
  onClickBox: (clickedBoxValue: string) => void;
  clickedBoxValue: string;
  Icon: IconType;
  title: string;
  description: JSX.Element;
}

const SelectBox = ({ user, onClickBox, clickedBoxValue, Icon, title, description }: SelectBoxProps) => {
  return (
    <div
      className={`${styles['select-box']} ${styles[`select-box-${user}`]}`}
      onClick={() => onClickBox(clickedBoxValue)}
    >
      <figure className={`${styles['icon-circle-wrapper']} ${styles[`icon-circle-wrapper-${user}`]}`}>
        <Icon className={styles['icon']} />
      </figure>
      <figcaption className={styles['select-box-text-container']}>
        <h2 className={styles['select-box-title-text']}>{title}</h2>
        <p className={styles['select-box-explain-text']}>{description}</p>
      </figcaption>
      <button className={`${styles['select-box-bottom-btn']} ${styles[`${user}-button`]}`}>
        설문 작성하기
        <IoIosArrowForward className={styles['bottom-button-arrow-icon']} />
      </button>
    </div>
  );
};
