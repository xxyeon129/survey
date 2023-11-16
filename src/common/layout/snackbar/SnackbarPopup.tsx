import { BsExclamationCircleFill } from 'react-icons/bs';
import { MdCheckCircle } from 'react-icons/md';
import styles from './snackbarPopup.module.scss';

interface SnackbarPopupProps {
  text: string;
  textRow2?: string;
  iconType?: string;
  isSnackbarVisible: boolean;
}

export default function SnackbarPopup({
  text,
  textRow2,
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
      <hgroup className={styles['text-container']}>
        <h4 className={styles['text-row-1']}>{text}</h4>
        {textRow2 && <p className={styles['text-row-2']}>{textRow2}</p>}
      </hgroup>
    </div>
  );
}
