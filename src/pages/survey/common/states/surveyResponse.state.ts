import { atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'response',
});

// 'surveyStateKeyword-questionNumber'<string>
export const responseState = atomFamily({
  key: 'responseState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
