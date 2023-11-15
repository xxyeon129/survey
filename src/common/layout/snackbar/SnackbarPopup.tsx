import { BsExclamationCircleFill } from 'react-icons/bs';
import { MdCheckCircle } from 'react-icons/md';
import styles from './snackbarPopup.module.scss';

interface SnackbarPopupProps {
  text: string;
  iconType?: string;
  isSnackbarVisible: boolean;
}

export default function SnackbarPopup({
  text,
  iconType = 'exclamation',
  isSnackbarVisible,
}: SnackbarPopupProps) {
  return (
    <div
      className={
        isSnackbarVisible
          ? `${styles['snackbar']} ${styles[`type-${iconType}`]} ${styles['snackbar-show']}`
          : `${styles['snackbar']} ${styles[`type-${iconType}`]}`
      }
    >
      <div className={styles['icon-wrapper']}>
        {iconType === 'exclamation' ? (
          <BsExclamationCircleFill className={styles['exclamation-icon']} />
        ) : (
          <MdCheckCircle className={styles['check-icon']} />
        )}
      </div>
      <h4 className={styles['text']}>{text}</h4>
    </div>
  );
}
