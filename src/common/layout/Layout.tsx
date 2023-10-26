// components
import Sidebar from 'common/layout/sidebar/Sidebar';
import Header from './header/Header';
// hooks
import usePathCheck from 'common/hooks/usePathCheck';
// state - for login page display
import { useRecoilValue } from 'recoil';
import { loginState } from 'pages/login/loginState';
// styles
import styles from './layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  // for login page - no header
  const isLogin = useRecoilValue(loginState);

  // for non-survey page css styling
  const isSurveyPage = usePathCheck();

  return (
    <>
      {isLogin && <Header />}
      <main>
        {isSurveyPage && <Sidebar />}
        <section className={isSurveyPage ? styles['survey-page'] : ''}>{props.children}</section>
      </main>
    </>
  );
}
