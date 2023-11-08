import { atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'uploaded-respoonse-data',
  storage: sessionStorage,
});

export const uploadedResponseStates = atomFamily({
  key: 'uploaded-response-data-survey',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
