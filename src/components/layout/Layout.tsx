import Sidebar from 'components/layout/sidebar/Sidebar';
import Header from './header/Header';
import usePathCheck from 'shared/hooks/usePathCheck';
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
