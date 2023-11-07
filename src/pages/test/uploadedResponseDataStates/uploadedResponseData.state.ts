import { atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'uploadedRespoonseData',
  storage: sessionStorage,
});

export const uploadedResponseStates = atomFamily({
  key: 'uploaded-response-data',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
