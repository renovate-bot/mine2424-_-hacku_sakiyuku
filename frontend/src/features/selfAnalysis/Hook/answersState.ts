import { atom } from 'recoil';
import { SelfAnalysisUserAnswerEntity } from '../Domain/Entity/SelfAnalysisUserAnswerEntity';

/**
 * Array of `SelfAnalysisUserAnswerEntitiy` to store what user selected.
 *
 * Default value is empty: `[]`, but default items must be appended to this right after loading.
 */
export const selfAnalysisUserAnswerState = atom<SelfAnalysisUserAnswerEntity[]>({
  key: 'selfAnalysisUserAnswerState',
  default: [],
});
