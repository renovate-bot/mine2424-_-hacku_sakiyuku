import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { AnswerProgressState } from 'src/features/simulation/Hook/AnswerProgressState';
import { SimulationQuestionPre } from './SimulationQuestionPre';
import { SimulationResultPre } from './SimulationResultPre';

export const SimulationPre: FC = () => {
  const AnswerProgress = useRecoilValue(AnswerProgressState);

  return AnswerProgress !== 7 ? <SimulationQuestionPre /> : <SimulationResultPre />;
};
