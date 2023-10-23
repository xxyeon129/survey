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

export const survey06CurrentPageState = atom({
  key: 'survey06CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const survey07CurrentPageState = atom({
  key: 'survey07CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const survey08CurrentPageState = atom({
  key: 'survey08CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const survey09CurrentPageState = atom({
  key: 'survey09CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const survey10CurrentPageState = atom({
  key: 'survey10CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const survey11CurrentPageState = atom({
  key: 'survey11CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const survey12CurrentPageState = atom({
  key: 'survey12CurrentPageState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});
