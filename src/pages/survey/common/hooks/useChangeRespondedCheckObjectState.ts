import { TAKE_MEDICINE } from 'pages/survey/survey-01-UPDRS/survey.const';
import { RecoilState, useRecoilState } from 'recoil';
import { RespondedCheckObjectStateType } from '../types/respondedCheckObjectState.types';
import {
  FEMALE,
  MALE,
} from 'pages/survey/personalInfo/components/rightSection/genderCheck/genderCheckSection.const';
import {
  SURVEY_10_SCOPA_GENDER_QUESTION_START_NUMBER,
  SURVEY_10_SCOPA_MALE_ADDITIONAL_QUESTION_INDEX,
  SURVEY_10_SCOPA_MALE_ADDITIONAL_QUESTION_NUMBER,
} from 'pages/survey/survey-10-SCOPA/survey.const';

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
  // for survey-10-SCOPA
  selectedGender?: string;
}

// TO DO: REFACTORING
export default function useChangeRespondedCheckObjectState(
  props: ChangeRespondedCheckObjectStateProps
) {
  const currentPageQuestionNumberList: number[] = [];
  const notRespondedQuestionNumberList: string[] = [];

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
    // for survey-10-SCOPA  male additional question
    if (questionNumber === SURVEY_10_SCOPA_MALE_ADDITIONAL_QUESTION_INDEX)
      currentPageQuestionNumberList.push(23.5);
  }

  const [respondedCheckObjectAfterChange, setRespondedCheckObject] = useRecoilState(
    props.respondedCheckObject
  );

  const changeRespondedCheckObjectState = async () => {
    return new Promise<void>((resolve) => {
      // for survey-01-UPDRS, survey-02-FG take medicine case
      if (props.takeMedicineResponse === TAKE_MEDICINE) {
        currentPageQuestionNumberList.forEach((_, index) => {
          if (props.responseStateList[currentPageQuestionNumberList[index]] === '') {
            setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
              return {
                ...prev,
                [`${currentPageQuestionNumberList[index]}-${TAKE_MEDICINE}`]: true,
              };
            });
            notRespondedQuestionNumberList.push(`${currentPageQuestionNumberList[index]}번`);
          }
        });
      } else if (props.selectedGender) {
        // for survey-10-SCOPA
        const currentPageFirstQuestionNumber = currentPageQuestionNumberList[0];
        const isNormaleQuestions =
          currentPageFirstQuestionNumber !== SURVEY_10_SCOPA_GENDER_QUESTION_START_NUMBER;
        const isGenderAndSymptomQuestions =
          currentPageFirstQuestionNumber === SURVEY_10_SCOPA_GENDER_QUESTION_START_NUMBER;

        if (isNormaleQuestions) {
          currentPageQuestionNumberList.forEach((_, index) => {
            if (props.responseStateList[currentPageQuestionNumberList[index] - 1] === '') {
              setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
                return { ...prev, [currentPageQuestionNumberList[index]]: true };
              });
              notRespondedQuestionNumberList.push(`${currentPageQuestionNumberList[index]}번`);
            }
          });
        }

        if (isGenderAndSymptomQuestions) {
          // male question --------------------------------------------------
          if (props.selectedGender === MALE) {
            const maleQuestionsNumberList = [...currentPageQuestionNumberList];
            maleQuestionsNumberList.splice(3, 2); // [22, 23, 23.5, 26]

            maleQuestionsNumberList.forEach((_, index) => {
              const isAdditionalQuestion = maleQuestionsNumberList[index] === 23.5;

              // for additional question
              if (isAdditionalQuestion) {
                if (
                  props.responseStateList[SURVEY_10_SCOPA_MALE_ADDITIONAL_QUESTION_INDEX] === ''
                ) {
                  setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
                    return { ...prev, [SURVEY_10_SCOPA_MALE_ADDITIONAL_QUESTION_NUMBER]: true };
                  });
                  notRespondedQuestionNumberList.push(
                    `${SURVEY_10_SCOPA_MALE_ADDITIONAL_QUESTION_NUMBER}번`
                  );
                }
              } else {
                if (props.responseStateList[maleQuestionsNumberList[index] - 1] === '') {
                  setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
                    return { ...prev, [maleQuestionsNumberList[index]]: true };
                  });
                  notRespondedQuestionNumberList.push(`${maleQuestionsNumberList[index]}번`);
                }
              }
            });
          }

          // female question --------------------------------------------------
          if (props.selectedGender === FEMALE) {
            const femaleQuestionsNumberList = [...currentPageQuestionNumberList];
            femaleQuestionsNumberList.splice(0, 3); // [24, 25, 26]

            femaleQuestionsNumberList.forEach((_, index) => {
              if (props.responseStateList[femaleQuestionsNumberList[index]] === '') {
                setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
                  return { ...prev, [femaleQuestionsNumberList[index]]: true };
                });
                notRespondedQuestionNumberList.push(`${femaleQuestionsNumberList[index]}번`);
              }
            });
          }
        }
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
            notRespondedQuestionNumberList.push(`${currentPageQuestionNumberList[index]}번`);
          }
        });
      }
      resolve();
    });
  };

  return {
    respondedCheckObjectAfterChange,
    changeRespondedCheckObjectState,
    notRespondedQuestionNumberList,
  };
}
