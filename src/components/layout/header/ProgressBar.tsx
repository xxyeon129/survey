import { useRecoilValue } from 'recoil';
import styles from './header.module.scss';
import { headerCurrentPageState } from './pagination/headerPageState';
import { headerTotalPage } from './Header';

export default function ProgressBar() {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);

  const getProgressWidth = Math.floor((headerCurrentPage / headerTotalPage) * 100);

  return (
    <div className={styles['progress-bar-background']}>
      <div className={styles['progress-bar-filled']} style={{ width: `${getProgressWidth}%` }} />
    </div>
  );
}
