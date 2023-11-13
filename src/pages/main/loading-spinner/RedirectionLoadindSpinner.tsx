import styles from './redirectionSpinner.module.scss';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function RedirectionLoadingSpinner() {
  return (
    <article className={styles['spinner-container']}>
      <AiOutlineLoading3Quarters className={styles['spinner']} />
      <h3>잠시만 기다려 주세요...</h3>
    </article>
  );
}
