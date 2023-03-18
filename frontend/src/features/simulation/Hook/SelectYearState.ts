import { atom } from 'recoil';

export const SelectYearState = atom<number>({
  key: 'SelectYearState',
  default: 60,
});
