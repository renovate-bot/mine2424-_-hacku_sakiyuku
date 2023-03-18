import { atom } from 'recoil';
import { SelfAnalysisResultEntity } from '../Domain/Entity/SelfAnalysisResultEntity';
import { MBTIPattern } from '../Domain/Entity/MBTIType';

/**
 * Array of `SelfAnalysisResultEntity` to store the result of self analysis.
 *
 * Default value is empty: `[]`.
 */
export const selfAnalysisUserResultsState = atom<SelfAnalysisResultEntity>({
  key: 'selfAnalysisUserResultState',
  default: { mbti: MBTIPattern.ENFJ, scores: [] },
});
