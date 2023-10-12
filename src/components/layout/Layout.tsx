import Sidebar from 'components/layout/sidebar/Sidebar';
import Header from './header/Header';
import usePathCheck from 'shared/hooks/usePathCheck';
import './layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const isSurveyPage = usePathCheck();

  return (
    <>
      <Header />
      <main>
        {isSurveyPage && <Sidebar />}
        <section>{props.children}</section>
      </main>
    </>
  );
}
