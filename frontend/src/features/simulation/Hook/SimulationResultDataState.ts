import { atom } from 'recoil';

export type SimulationResultDataType = {
  yearLater: number; //n年後
  deposit: number; //貯金額
  income: number; //収入
  spending: number; //支出
  savings: number; //貯蓄する額
  investment: number; //投資額
}[];

export const SimulationResultDataState = atom<SimulationResultDataType>({
  key: 'SimulationResultDataState',
  default: [],
});
