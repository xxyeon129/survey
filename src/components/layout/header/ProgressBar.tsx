import styles from './header.module.scss';

export default function ProgressBar() {
  return (
    <div className={styles['progress-bar-background']}>
      <div className={styles['progress-bar-filled']} />
    </div>
  );
}
