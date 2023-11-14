import { RecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import { IoIosArrowBack } from 'react-icons/io';
import { IoMdArrowRoundForward } from 'react-icons/io';
import styles from './bottomPrevNextButton.module.scss';
import { RespondedCheckObjectStateType } from '../../types/respondedCheckObjectState.types';

interface BottomPrevNextButtonProps {
  handlePrevPage?: () => void;
  handleNextPage?: () => void;

  nextBtnDisabledCondition: boolean;

  // for show not-responded question "!" icon, not-responded question number message
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
  responseStateList: string[];
  currentPageFirstQuestionNumber: number;
  currentPageLastQuestionNumber: number;
  surveyQuestionsPerPage: number;
  // for suevey-05-RBD
  havePreQuestion?: boolean;
}

export default function BottomPrevNextButton(props: BottomPrevNextButtonProps) {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);

  // for show not-responded question "!" icon, not-responded question number message
  const currentPageQuestionNumberList: number[] = [];
  if (props.havePreQuestion) {
    currentPageQuestionNumberList.push(0);
  }
  for (
    let questionNumber = props.currentPageFirstQuestionNumber;
    questionNumber <= props.currentPageLastQuestionNumber;
    questionNumber++
  ) {
    currentPageQuestionNumberList.push(questionNumber);
  }

  const setRespondedCheckObject = useSetRecoilState(props.respondedCheckObject);

  const onClickDisabledBtn = () => {
    if (props.nextBtnDisabledCondition) {
      // for show not-responded question "!" icon, not-responded question number message
      currentPageQuestionNumberList.forEach((_, index) => {
        // console.log(
        //   `forEach 내부 currentPageQuestionNumberList: ${currentPageQuestionNumberList} / index: ${index}
        //   / 현재 문제 번호 currentPageQuestionNumberList[index]: ${
        //     currentPageQuestionNumberList[index]
        //   }
        //   / 현재 답변 내용 : ${props.responseStateList[currentPageQuestionNumberList[index] - 1]}
        //   / if문 조건부 결과: ${
        //     props.responseStateList[currentPageQuestionNumberList[index] - 1] === ''
        //   }
        //   / recoil 오브젝트에서 바꿔야 하는 번호: ${currentPageQuestionNumberList[index]}
        //   }`
        // );
        if (props.havePreQuestion) {
          // survey-05-RBD
          if (props.responseStateList[currentPageQuestionNumberList[index]] === '') {
            setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
              return { ...prev, [currentPageQuestionNumberList[index]]: true };
            });
          }
        } else {
          if (props.responseStateList[currentPageQuestionNumberList[index] - 1] === '') {
            setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
              return { ...prev, [currentPageQuestionNumberList[index]]: true };
            });
          }
        }
      });

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
          <button className={styles['next-btn-disabled']}>
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
