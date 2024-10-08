// state
import { useRecoilValue } from 'recoil';
import { headerCurrentPageState } from '../pagination/headerPageState';
// hooks
import useTotalPages from '../pagination/useTotalPages';
// styles
import styles from './progressBar.module.scss';

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
