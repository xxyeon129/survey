import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
// components
import Sidebar from 'common/layout/sidebar/Sidebar';
import Header from './header/Header';
// state
import { userState } from 'pages/select-home/selectHomePage.state';
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
  // for home page - no header
  const haveSelectUser = useRecoilValue(userState);

  // for personal info page - no header
  const location = useLocation();
  const isNotPersonalInfoPage = location.pathname !== PATH_URL.PERSONAL;

  const showHeader = haveSelectUser.length > 0 && isNotPersonalInfoPage;

  // for non-survey page hide sidebar
  const isSurveyPage = usePathCheck();

  return (
    <>
      {showHeader && <Header />}
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
