import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'personal-info',
});

export const personalInfoNameState = atom<string>({
  key: 'name',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const personalInfoBirthdayState = atom<string>({
  key: 'birthday',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const personalInfoGenderState = atom<string>({
  key: 'gender',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
