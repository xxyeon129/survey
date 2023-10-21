import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const headerCurrentPageState = atom({
  key: 'headerCurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});
