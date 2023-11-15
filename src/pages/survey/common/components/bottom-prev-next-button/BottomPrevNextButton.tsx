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
  // for survey-04-BDI
  additionalQuestionNumberListIndex?: number;
  additionalQuestionResponseListIndex?: number;
  additionalQuestionRespondedCheckKey?: string;
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
    // for survey-04-BDI additional question
    if (questionNumber === props.additionalQuestionResponseListIndex)
      currentPageQuestionNumberList.push(19.5);
  }

  const setRespondedCheckObject = useSetRecoilState(props.respondedCheckObject);

  const onClickDisabledBtn = () => {
    if (props.nextBtnDisabledCondition) {
      // for show not-responded question "!" icon, not-responded question number message
      currentPageQuestionNumberList.forEach((_, index) => {
        if (props.havePreQuestion) {
          // for survey-05-RBD
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

        // for survey-04-BDI
        if (
          props.currentPageFirstQuestionNumber === 16 &&
          props.additionalQuestionResponseListIndex &&
          props.additionalQuestionRespondedCheckKey &&
          props.additionalQuestionNumberListIndex === index &&
          props.responseStateList[props.additionalQuestionResponseListIndex] === ''
        ) {
          setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
            return { ...prev, [`${props.additionalQuestionRespondedCheckKey}`]: true };
          });
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
