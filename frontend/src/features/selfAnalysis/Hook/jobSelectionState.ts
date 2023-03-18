import { atom } from 'recoil';
import { SelfAnalysisJobSelectionEntity } from '../Domain/Entity/SelfAnalysisJobSelectionEntity';

export const selfAnalysisJobSelectionState = atom<SelfAnalysisJobSelectionEntity>({
  key: 'selfAnalysisJobSelectionState',
  default: { title: '', salary: 0 },
});
