import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
// components
import Sidebar from 'common/layout/sidebar/Sidebar';
import Header from './header/Header';
// state - for login page display
import { userState } from 'pages/select-home/selectHomePage.state';
// import { loginState } from 'pages/login/loginState';
// constants
import { PATH_URL } from 'common/constants/path.const';
// hooks
import usePathCheck from 'common/hooks/usePathCheck';
// styles
import styles from './layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  // for login page - no header
  // const isLogin = useRecoilValue(loginState);

  // for home page - no header
  const haveSelectUser = useRecoilValue(userState);

  // for personal info page - no header
  const location = useLocation();
  const isNotPersonalInfoPage = location.pathname !== PATH_URL.PERSONAL;

  // for non-survey page css styling
  const isSurveyPage = usePathCheck();

  return (
    <>
      {haveSelectUser.length > 0 && isNotPersonalInfoPage && <Header />}
      <main>
        {isSurveyPage && <Sidebar />}
        <section
          className={isSurveyPage ? `${styles['survey-page']} ${styles.section}` : styles.section}
        >
          {props.children}
        </section>
      </main>
    </>
  );
}
