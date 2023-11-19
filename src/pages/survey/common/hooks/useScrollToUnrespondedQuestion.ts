import { MutableRefObject, useRef } from 'react';
import { RecoilState, useRecoilValue } from 'recoil';
import { RespondedCheckObjectStateType } from '../types/respondedCheckObjectState.types';

export default function useScrollToUnrespondedQuestion(props: {
  respondedCheckObjectProps: RecoilState<RespondedCheckObjectStateType>;
}) {
  const respondedCheckObject = useRecoilValue<RespondedCheckObjectStateType>(
    props.respondedCheckObjectProps
  );

  const scrollElementRef: MutableRefObject<HTMLElement | null> = useRef(null);

  const getUnrespondedFirstQuestionNumber = () => {
    let unrespondedFirstQuestionNumber = Infinity;

    for (const key in respondedCheckObject) {
      if (respondedCheckObject[key] === true && parseInt(key) < unrespondedFirstQuestionNumber) {
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
        // unrespondedFirstQuestionElement.scrollIntoView({ behavior: 'smooth' });
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
