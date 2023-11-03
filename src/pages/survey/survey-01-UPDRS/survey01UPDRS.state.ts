import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'survey-01-UPDRS',
});

export const takeMedicineState = atom({
  key: 'take-medicine',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
