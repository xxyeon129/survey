import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: sessionStorage,
});

export const userState = atom({
  key: 'user-state',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
