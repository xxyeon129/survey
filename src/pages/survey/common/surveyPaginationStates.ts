import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'pagination',
  storage: sessionStorage,
});

export const survey01CurrentPageState = atom({
  key: 'survey01CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const survey02CurrentPageState = atom({
  key: 'survey02CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const survey03CurrentPageState = atom({
  key: 'survey03CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const survey04CurrentPageState = atom({
  key: 'survey04CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const survey05CurrentPageState = atom({
  key: 'survey05CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});
