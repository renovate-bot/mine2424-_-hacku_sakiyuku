import { atom } from 'recoil';

export type SimulationResultType = {
  resultStatus: boolean;
  resutlText: string;
};

export const SimulationResultState = atom<SimulationResultType>({
  key: 'SimulationResultState',
  default: {} as SimulationResultType,
});
