import { useRecoilValue } from 'recoil';
import styles from './header.module.scss';
import { headerCurrentPageState } from './pagination/headerPageState';
import { totalPagesCount } from './pagination/totalPages.const';

export default function ProgressBar() {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);

  const getProgressWidth = Math.floor((headerCurrentPage / totalPagesCount) * 100);

  return (
    <div className={styles['progress-bar-background']}>
      <div className={styles['progress-bar-filled']} style={{ width: `${getProgressWidth}%` }} />
    </div>
  );
}
