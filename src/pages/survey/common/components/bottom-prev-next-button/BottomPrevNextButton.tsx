import { useRecoilValue } from 'recoil';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import { IoIosArrowBack } from 'react-icons/io';
import { IoMdArrowRoundForward } from 'react-icons/io';
import styles from './bottomPrevNextButton.module.scss';

interface BottomPrevNextButtonProps {
  handlePrevPage?: () => void;
  handleNextPage?: () => void;

  // TO DO: 전체 설문 적용 후 조건 삭제
  nextBtnDisabledCondition?: boolean;
}

export default function BottomPrevNextButton(props: BottomPrevNextButtonProps) {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);

  const onClickDisabledBtn = () => {
    if (props.nextBtnDisabledCondition) {
      alert('모든 질문에 답변해주세요.');
    } else {
      props.handleNextPage && props.handleNextPage();
    }
  };

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
      <div onClick={onClickDisabledBtn}>
        {props.nextBtnDisabledCondition ? (
          <button
            className={styles['next-btn-disabled']}
            // onClick={props.handleNextPage}
            // disabled={props.nextBtnDisabledCondition}
          >
            다음 페이지
            <div className={styles['next-btn-icon-container']}>
              <IoMdArrowRoundForward />
            </div>
          </button>
        ) : (
          <button className={styles['next-btn']}>
            다음 페이지
            <div className={styles['next-btn-icon-container']}>
              <IoMdArrowRoundForward />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
