import { useRecoilValue } from 'recoil';
import styles from './header.module.scss';
import { headerCurrentPageState, headerTotalPageState } from './pagination/headerPageState';

export default function ProgressBar() {
  const headerTotalPages = useRecoilValue(headerTotalPageState);
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);

  const getProgressWidth = Math.floor((headerCurrentPage / headerTotalPages) * 100);

  return (
    <div className={styles['progress-bar-background']}>
      <div className={styles['progress-bar-filled']} style={{ width: `${getProgressWidth}%` }} />
    </div>
  );
}
