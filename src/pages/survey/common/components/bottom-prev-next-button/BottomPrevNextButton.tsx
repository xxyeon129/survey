import { useRecoilValue } from 'recoil';
import { headerCurrentPageState } from 'components/layout/header/pagination/headerPageState';
import { IoIosArrowBack } from 'react-icons/io';
import { IoMdArrowRoundForward } from 'react-icons/io';
import styles from './bottomPrevNextButton.module.scss';

interface BottomPrevNextButtonProps {
  handlePrevPage?: () => void;
  handleNextPage?: () => void;
}

export default function BottomPrevNextButton(props: BottomPrevNextButtonProps) {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);

  return (
    <div className={styles['prev-next-btn-container']}>
      <button
        className={styles['prev-btn']}
        onClick={props.handlePrevPage}
        disabled={headerCurrentPage === 1}
      >
        <IoIosArrowBack />
        이전 페이지
      </button>
      <button
        className={styles['next-btn']}
        onClick={props.handleNextPage}
        // // TO DO: headerCurrentPage === headerTotalPages일 경우 disabled
        // disabled={props.currentPage === props.currentSurveyTotalPages}
      >
        다음 페이지
        <div className={styles['next-btn-icon-container']}>
          <IoMdArrowRoundForward />
        </div>
      </button>
    </div>
  );
}
