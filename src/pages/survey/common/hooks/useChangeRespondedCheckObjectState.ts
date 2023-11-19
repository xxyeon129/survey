import { TAKE_MEDICINE } from 'pages/survey/survey-01-UPDRS/survey.const';
import { RecoilState, useSetRecoilState } from 'recoil';
import { RespondedCheckObjectStateType } from '../types/respondedCheckObjectState.types';
import {
  MEDICINE_EFFECT_FALSE,
  MEDICINE_EFFECT_TRUE,
} from '../components/survey-contents/survey-contents-with-medicine-effect/surveyContent.const';

interface ChangeRespondedCheckObjectStateProps {
  responseStateList: string[];
  // for show not-responded question "!" icon, not-responded question number message
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;
  currentPageFirstQuestionNumber: number;
  currentPageLastQuestionNumber: number;
  // for survey-01-UPDRS, survey-02-FG
  takeMedicineResponse?: string;
  // for survey-01-UPDRS, survey-02-FG, suevey-05-RBD
  havePreQuestion?: boolean;
  // for survey-04-BDI
  additionalQuestionNumberListIndex?: number;
  additionalQuestionResponseListIndex?: number;
  additionalQuestionRespondedCheckKey?: string;
}

export default function useChangeRespondedCheckObjectState(
  props: ChangeRespondedCheckObjectStateProps
) {
  const currentPageQuestionNumberList: number[] = [];
  const notRespondedQuestionNumberList: string[] = [];
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

  const changeRespondedCheckObjectState = () => {
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
            if (currentPageQuestionNumberList[index] === 0) {
              notRespondedQuestionNumberList.push(`사전 질문`);
            } else {
              notRespondedQuestionNumberList.push(`${currentPageQuestionNumberList[index]}번`);
            }
          }
        } else {
          if (props.responseStateList[currentPageQuestionNumberList[index] - 1] === '') {
            setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
              return { ...prev, [currentPageQuestionNumberList[index]]: true };
            });

            // for survey-04-BDI additional question snackbar popup
            if (
              props.additionalQuestionNumberListIndex &&
              props.currentPageFirstQuestionNumber === 15 &&
              currentPageQuestionNumberList[index] === 20
            ) {
              notRespondedQuestionNumberList.push(`19번 추가 질문`);
            } else {
              notRespondedQuestionNumberList.push(`${currentPageQuestionNumberList[index]}번`);
            }
          }
        }

        // for survey-01-UPDRS, survey-02-FG
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
          if (props.currentPageFirstQuestionNumber === 15) {
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
            // for after additional question snackbar popup
            if (
              index > props.additionalQuestionNumberListIndex &&
              props.responseStateList[currentPageQuestionNumberList[index]].length === 0
            ) {
              notRespondedQuestionNumberList.push(`${currentPageQuestionNumberList[index]}번`);
            }
          } else if (
            // after additional question page
            props.currentPageFirstQuestionNumber > 15 &&
            props.responseStateList[currentPageQuestionNumberList[index]] === ''
          ) {
            setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
              return { ...prev, [currentPageQuestionNumberList[index]]: true };
            });

            notRespondedQuestionNumberList.push(`${currentPageQuestionNumberList[index]}번`);
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
  };

  return { changeRespondedCheckObjectState, notRespondedQuestionNumberList };
}
