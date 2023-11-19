import { MutableRefObject, useRef } from 'react';
import { RespondedCheckObjectStateType } from '../types/respondedCheckObjectState.types';

export default function useScrollToUnrespondedQuestion(props: {
  respondedCheckObjectAfterChange: RespondedCheckObjectStateType;
}) {
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
        `scroll-${unrespondedFirstQuestionNumber}`
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
