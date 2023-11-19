import { MutableRefObject, useRef } from 'react';
import { RespondedCheckObjectStateType } from '../types/respondedCheckObjectState.types';

interface ScrollToUnrespondedQuestionProps {
  respondedCheckObjectAfterChange: RespondedCheckObjectStateType;
  scrollIdKeyword: string;
}

export default function useScrollToUnrespondedQuestion(props: ScrollToUnrespondedQuestionProps) {
  const scrollElementRef: MutableRefObject<HTMLElement | null> = useRef(null);

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
