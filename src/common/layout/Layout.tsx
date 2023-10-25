import Sidebar from 'common/layout/sidebar/Sidebar';
import Header from './header/Header';
import usePathCheck from 'common/hooks/usePathCheck';
import styles from './layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  // for non-survey page css styling
  const isSurveyPage = usePathCheck();

  return (
    <>
      <Header />
      <main>
        {isSurveyPage && <Sidebar />}
        <section className={isSurveyPage ? styles['survey-page'] : ''}>{props.children}</section>
      </main>
    </>
  );
}
