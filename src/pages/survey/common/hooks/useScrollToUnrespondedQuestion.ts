import { MutableRefObject, useRef } from 'react';
import { RespondedCheckObjectStateType } from '../types/respondedCheckObjectState.types';
import { useRecoilValue } from 'recoil';
import { responseState } from '../states/surveyResponse.state';
import {
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
} from 'pages/survey/survey-01-UPDRS/survey.const';
import { SURVEY_02_FG_STATE_KEYWORD } from 'pages/survey/survey-02-FG/survey.const';

interface ScrollToUnrespondedQuestionProps {
  respondedCheckObjectAfterChange: RespondedCheckObjectStateType;
  scrollIdKeyword: string;
}

export default function useScrollToUnrespondedQuestion(props: ScrollToUnrespondedQuestionProps) {
  const scrollElementRef: MutableRefObject<HTMLElement | null> = useRef(null);

  // for survey-01-UPDRS, 02-FG
  const haveTakeMedicine =
    useRecoilValue(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`)) === TAKE_MEDICINE;

  const getUnrespondedFirstQuestionNumber = () => {
    let unrespondedFirstQuestionNumber = Infinity;
    const onlyNumberKeyMaxLength = 3;
    const stringKeyMinLength = 2;

    for (const key in props.respondedCheckObjectAfterChange) {
      if (
        key.length < onlyNumberKeyMaxLength &&
        props.respondedCheckObjectAfterChange[key] === true &&
        parseInt(key) < unrespondedFirstQuestionNumber
      ) {
        unrespondedFirstQuestionNumber = parseInt(key);
      }

      // for survey-01-UPDRS, 02-FG
      if (key.length > stringKeyMinLength) {
        const questionNumber = key.split('-')[0];
        if (
          props.respondedCheckObjectAfterChange[key] === true &&
          parseInt(questionNumber) < unrespondedFirstQuestionNumber
        ) {
          unrespondedFirstQuestionNumber = parseInt(questionNumber);
        }
      }
    }

    return unrespondedFirstQuestionNumber === Infinity ? null : unrespondedFirstQuestionNumber;
  };

  const scrollToUnrespondedQuestion = () => {
    const unrespondedFirstQuestionNumber = getUnrespondedFirstQuestionNumber();

    if (unrespondedFirstQuestionNumber !== null) {
      let unrespondedFirstQuestionElement = document.getElementById(
        `scroll-${props.scrollIdKeyword}-${unrespondedFirstQuestionNumber}`
      );
      // for survey-01-UPDRS, 02-FG
      if (
        haveTakeMedicine &&
        (props.scrollIdKeyword === SURVEY_01_UPDRS_STATE_KEYWORD ||
          props.scrollIdKeyword === SURVEY_02_FG_STATE_KEYWORD)
      )
        unrespondedFirstQuestionElement = document.getElementById(
          `scroll-${props.scrollIdKeyword}-${unrespondedFirstQuestionNumber}-${TAKE_MEDICINE}`
        );

      if (unrespondedFirstQuestionElement !== null) {
        scrollElementRef.current = unrespondedFirstQuestionElement as HTMLElement;

        const elementRect = unrespondedFirstQuestionElement.getBoundingClientRect();
        const offsetTop = window.pageYOffset + elementRect.top - 150;

        window.scrollTo({
          behavior: 'smooth',
          top: offsetTop,
        });
      }
    }
  };

  return scrollToUnrespondedQuestion;
}
