import { useRecoilValue } from 'recoil';
import styles from './header.module.scss';
import { headerCurrentPageState } from './pagination/headerPageState';
import useTotalPages from './pagination/useTotalPages';

export default function ProgressBar() {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);

  const { totalPagesCount } = useTotalPages();

  const getProgressWidth = Math.floor((headerCurrentPage / totalPagesCount) * 100);

  return (
    <div className={styles['progress-bar-background']}>
      <div className={styles['progress-bar-filled']} style={{ width: `${getProgressWidth}%` }} />
    </div>
  );
}
