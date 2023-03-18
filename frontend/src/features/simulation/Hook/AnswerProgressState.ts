import { atom } from 'recoil';

export const AnswerProgressState = atom<number>({
  key: 'AnswerProgressState',
  default: 0,
});
