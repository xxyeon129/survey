import { IoIosArrowBack } from 'react-icons/io';
import { IoMdArrowRoundForward } from 'react-icons/io';
import styles from './bottomPrevNextButton.module.scss';

interface BottomPrevNextButtonProps {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export default function BottomPrevNextButton(props: BottomPrevNextButtonProps) {
  return (
    <div className={styles['prev-next-btn-container']}>
      <button
        className={styles['prev-btn']}
        onClick={props.handlePrevPage}
        disabled={props.currentPage === 1}
      >
        <IoIosArrowBack />
        이전 페이지
      </button>
      <button
        className={styles['next-btn']}
        onClick={props.handleNextPage}
        disabled={props.currentPage === props.totalPages}
      >
        다음 페이지
        <div className={styles['next-btn-icon-container']}>
          <IoMdArrowRoundForward />
        </div>
      </button>
    </div>
  );
}
