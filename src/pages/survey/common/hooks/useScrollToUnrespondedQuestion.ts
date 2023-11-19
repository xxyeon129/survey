import { MutableRefObject, useRef } from 'react';
import { RespondedCheckObjectStateType } from '../types/respondedCheckObjectState.types';

interface ScrollToUnrespondedQuestionProps {
  respondedCheckObjectAfterChange: RespondedCheckObjectStateType;
  scrollIdKeyword: string;
}

export default function useScrollToUnrespondedQuestion(props: ScrollToUnrespondedQuestionProps) {
  const scrollElementRef: MutableRefObject<HTMLElement | null> = useRef(null);

  // for element id

  const getUnrespondedFirstQuestionNumber = () => {
    let unrespondedFirstQuestionNumber = Infinity;

    for (const key in props.respondedCheckObjectAfterChange) {
      if (
        props.respondedCheckObjectAfterChange[key] === true &&
        parseInt(key) < unrespondedFirstQuestionNumber
      ) {
        unrespondedFirstQuestionNumber = parseInt(key);
      }
    }

    return unrespondedFirstQuestionNumber === Infinity ? null : unrespondedFirstQuestionNumber;
  };

  const scrollToUnrespondedQuestion = () => {
    const unrespondedFirstQuestionNumber = getUnrespondedFirstQuestionNumber();

    if (unrespondedFirstQuestionNumber !== null) {
      const unrespondedFirstQuestionElement = document.getElementById(
        `scroll-${props.scrollIdKeyword}-${unrespondedFirstQuestionNumber}`
      );

      if (unrespondedFirstQuestionElement !== null) {
        scrollElementRef.current = unrespondedFirstQuestionElement as HTMLElement;

        window.scrollTo({
          behavior: 'smooth',
          top: unrespondedFirstQuestionElement.offsetTop - 100,
        });
      }
    }
  };

  return scrollToUnrespondedQuestion;
}
