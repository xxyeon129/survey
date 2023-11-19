import { useState } from 'react';
import { RecoilState, useRecoilValue } from 'recoil';
// components
import SnackbarPopup from 'common/layout/snackbar/SnackbarPopup';
// states
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
// hooks
import useSnackbarPopup from 'common/layout/snackbar/useSnackbarPopup';
import useChangeRespondedCheckObjectState from '../../hooks/useChangeRespondedCheckObjectState';
// types
import { RespondedCheckObjectStateType } from '../../types/respondedCheckObjectState.types';
// styles
import { IoIosArrowBack } from 'react-icons/io';
import { IoMdArrowRoundForward } from 'react-icons/io';
import styles from './bottomPrevNextButton.module.scss';

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
  // for survey-01-UPDRS, survey-02-FG
  takeMedicineResponse?: string;
  takeMaedicineResponseStateList?: string[];
  // for survey-04-BDI
  additionalQuestionNumberListIndex?: number;
  additionalQuestionResponseListIndex?: number;
  additionalQuestionRespondedCheckKey?: string;
  // for survey-01-UPDRS, survey-02-FG, suevey-05-RBD
  havePreQuestion?: boolean;
  // for last page
  isLastPage?: boolean;

  // for scroll when click disabled next button
  scrollToUnrespondedQuestion?: () => void;
}

export default function BottomPrevNextButton(props: BottomPrevNextButtonProps) {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);

  // for show not-responded question "!" icon, not-responded question number message
  const { isSnackbarVisible, showSnackbarPopup } = useSnackbarPopup();
  const [snackbarTextRow2, setSnackbarTextRow2] = useState('');

  // for show not-responded question "!" icon, not-responded question number message
  const { changeRespondedCheckObjectState, notRespondedQuestionNumberList } =
    useChangeRespondedCheckObjectState({
      responseStateList: props.responseStateList,
      respondedCheckObject: props.respondedCheckObject,
      currentPageFirstQuestionNumber: props.currentPageFirstQuestionNumber,
      currentPageLastQuestionNumber: props.currentPageLastQuestionNumber,
      takeMedicineResponse: props.takeMedicineResponse,
      havePreQuestion: props.havePreQuestion,
      additionalQuestionNumberListIndex: props.additionalQuestionNumberListIndex,
      additionalQuestionResponseListIndex: props.additionalQuestionResponseListIndex,
      additionalQuestionRespondedCheckKey: props.additionalQuestionRespondedCheckKey,
    });

  const onClickDisabledBtn = () => {
    if (props.nextBtnDisabledCondition) {
      // for show not-responded question "!" icon, not-responded question number message
      changeRespondedCheckObjectState();

      // for snackbar popup
      const notRespondedQuestionNumbersString = notRespondedQuestionNumberList.join(', ');
      notRespondedQuestionNumbersString.length > 0 &&
        setSnackbarTextRow2(`${notRespondedQuestionNumbersString} 설문에 응답하지 않으셨습니다.`);
      showSnackbarPopup();
    } else {
      props.handleNextPage && props.handleNextPage();
    }

    // for scroll first unresponded question
    props.scrollToUnrespondedQuestion && props.scrollToUnrespondedQuestion();
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
            {props.isLastPage ? '설문 종료하기' : '다음 페이지'}
            <div className={styles['next-btn-icon-container']}>
              <IoMdArrowRoundForward />
            </div>
          </button>
        ) : (
          <button className={styles['next-btn']}>
            {props.isLastPage ? '설문 종료하기' : '다음 페이지'}
            <div className={styles['next-btn-icon-container']}>
              <IoMdArrowRoundForward />
            </div>
          </button>
        )}
      </div>
      {isSnackbarVisible && (
        <SnackbarPopup
          text="모든 질문에 답변해 주세요!"
          textRow2={snackbarTextRow2}
          isSnackbarVisible={isSnackbarVisible}
        />
      )}
    </div>
  );
}
