import { RecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// states
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
// constants
import { TAKE_MEDICINE } from 'pages/survey/survey-01-UPDRS/survey.const';
import {
  MEDICINE_EFFECT_FALSE,
  MEDICINE_EFFECT_TRUE,
} from '../survey-contents/survey-contents-with-medicine-effect/surveyContent.const';
// types
import { RespondedCheckObjectStateType } from '../../types/respondedCheckObjectState.types';
// styles
import { IoIosArrowBack } from 'react-icons/io';
import { IoMdArrowRoundForward } from 'react-icons/io';
import styles from './bottomPrevNextButton.module.scss';
import useSnackbarPopup from 'common/layout/snackbar/useSnackbarPopup';
import SnackbarPopup from 'common/layout/snackbar/SnackbarPopup';

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
}

export default function BottomPrevNextButton(props: BottomPrevNextButtonProps) {
  const headerCurrentPage = useRecoilValue(headerCurrentPageState);

  // for show not-responded question "!" icon, not-responded question number message
  const { isSnackbarVisible, showSnackbarPopup } = useSnackbarPopup();

  const currentPageQuestionNumberList: number[] = [];
  // for survey-01, 02 take medicine case
  const takeMedicineResponseStateListRaw = props.responseStateList.slice(1);
  const takeMedicineResponseStateList: Array<string>[] = [];
  for (let i = 0; i < takeMedicineResponseStateListRaw.length; i += 2) {
    takeMedicineResponseStateList.push([
      takeMedicineResponseStateListRaw[i],
      takeMedicineResponseStateListRaw[i + 1],
    ]);
  }
  const takeMedicineCurrentPageQuestionNumberList: number[] = [];

  // for survey-01-UPDRS, survey-02-FG, suevey-05-RBD pre-question
  if (props.havePreQuestion && props.currentPageFirstQuestionNumber === 1) {
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

  for (
    let questionIndex = props.currentPageFirstQuestionNumber;
    questionIndex <= props.currentPageLastQuestionNumber;
    questionIndex++
  ) {
    takeMedicineCurrentPageQuestionNumberList.push(questionIndex);
  }

  const setRespondedCheckObject = useSetRecoilState(props.respondedCheckObject);

  const onClickDisabledBtn = () => {
    // for show not-responded question "!" icon, not-responded question number message
    if (props.nextBtnDisabledCondition) {
      // for survey-01-UPDRS, survey-02-FG
      if (props.takeMedicineResponse === TAKE_MEDICINE) {
        takeMedicineCurrentPageQuestionNumberList.forEach((_, index) => {
          for (let i = 0; i <= 1; i++) {
            if (
              i === 0 &&
              takeMedicineResponseStateList[takeMedicineCurrentPageQuestionNumberList[index] - 1][
                i
              ] === ''
            )
              setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
                return {
                  ...prev,
                  [`${takeMedicineCurrentPageQuestionNumberList[index]}-${MEDICINE_EFFECT_TRUE}`]:
                    true,
                };
              });

            if (
              i === 1 &&
              takeMedicineResponseStateList[takeMedicineCurrentPageQuestionNumberList[index] - 1][
                i
              ] === ''
            )
              setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
                return {
                  ...prev,
                  [`${takeMedicineCurrentPageQuestionNumberList[index]}-${MEDICINE_EFFECT_FALSE}`]:
                    true,
                };
              });
          }
        });
      } else {
        currentPageQuestionNumberList.forEach((_, index) => {
          if (props.havePreQuestion) {
            // for survey-01-UPDRS, survey-02-FG, suevey-05-RBD first page
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

          // for survey-01-UPDRS, survey-02-FG
          // 효과있 첫 페이지 responseStateList 인덱스 1 3 5..
          // 효과있 두번째부터 0, 2, 4..
          if (props.takeMedicineResponse === TAKE_MEDICINE) {
            if (props.responseStateList[currentPageQuestionNumberList[index] - 1] === '') {
              setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
                return { ...prev, [currentPageQuestionNumberList[index]]: true };
              });
            }
          }

          // for survey-04-BDI additional question
          if (
            props.additionalQuestionResponseListIndex &&
            props.additionalQuestionRespondedCheckKey &&
            props.additionalQuestionNumberListIndex
          ) {
            // additional question
            if (props.currentPageFirstQuestionNumber === 16) {
              if (
                index === props.additionalQuestionNumberListIndex &&
                props.responseStateList[props.additionalQuestionResponseListIndex] === ''
              ) {
                setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
                  return { ...prev, [`${props.additionalQuestionRespondedCheckKey}`]: true };
                });
              }
              if (
                index > props.additionalQuestionNumberListIndex &&
                props.responseStateList[currentPageQuestionNumberList[index]].length > 0
              ) {
                setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
                  return { ...prev, [currentPageQuestionNumberList[index]]: false };
                });
              }
            } else if (
              // after additional question page
              props.currentPageFirstQuestionNumber > 16 &&
              props.responseStateList[currentPageQuestionNumberList[index]] === ''
            ) {
              setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
                return { ...prev, [currentPageQuestionNumberList[index]]: true };
              });
            }
          }

          // for survey-06-NMS
          if (props.responseStateList[currentPageQuestionNumberList[index] - 1] === '-') {
            setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
              return { ...prev, [currentPageQuestionNumberList[index]]: true };
            });
          }
        });
      }

      showSnackbarPopup();
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
      {isSnackbarVisible && (
        <SnackbarPopup text="모든 질문에 답변해 주세요!" isSnackbarVisible={isSnackbarVisible} />
      )}
    </div>
  );
}
