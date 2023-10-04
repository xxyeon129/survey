import { useLocation } from 'react-router-dom';
import { PATH_URL } from 'shared/constants/path.const';
import Sidebar from 'components/layout/sidebar/Sidebar';
import Header from './header/Header';
import './layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const location = useLocation();
  const normalPaths = [...Object.values(PATH_URL), ...Object.values(PATH_URL.SURVEY)];
  const isSidebarVisible = normalPaths.includes(location.pathname);

  return (
    <>
      <Header />
      <main>
        {isSidebarVisible && <Sidebar />}
        <section>{props.children}</section>
      </main>
    </>
  );
}
