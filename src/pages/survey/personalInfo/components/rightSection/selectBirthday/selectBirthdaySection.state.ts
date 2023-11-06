import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'personal-info',
});

export const selectedBirthYearState = atom({
  key: 'selected-birth-year',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const selectedBirthMonthState = atom({
  key: 'selected-birth-month',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const selectedBirthDayState = atom({
  key: 'selected-birth-day',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
