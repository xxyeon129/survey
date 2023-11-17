import { useRecoilValue } from 'recoil';
// components
import CreateBox from './components/main-page-route-boxes/CreateBox';
import ContinueBox from './components/main-page-route-boxes/ContinueBox';
import UploadExcelFileBox from './components/main-page-route-boxes/UploadExcelFileBox';
// states
import { userState } from 'pages/select-home/selectHomePage.state';
// constants
import { HOSPITAL_NAME, SURVEY_NAME } from 'common/constants/survey.const';
import { USER_HOSPITAL } from 'pages/select-home/selectHomeUser.const';
// styles
import styles from './main.module.scss';

export default function MainPage() {
  // for show upload-excel-file box only hospital user
  const user = useRecoilValue(userState);

  return (
    <article className={styles['main-container']}>
      <hgroup className={styles['title-container']}>
        <h4>{HOSPITAL_NAME}</h4>
        <h1>{SURVEY_NAME} 전자설문</h1>
      </hgroup>
      <ul
        className={
          user === USER_HOSPITAL
            ? `${styles['route-container']} ${styles['route-container-hospital']}`
            : `${styles['route-container']} ${styles['route-container-patient']}`
        }
      >
        <ContinueBox />
        <CreateBox />
        {user === USER_HOSPITAL && <UploadExcelFileBox />}
      </ul>
    </article>
  );
}
