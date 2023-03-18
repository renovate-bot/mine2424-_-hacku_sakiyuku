import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { SelfAnalysisQuestionEntity } from 'src/features/selfAnalysis/Domain/Entity/SelfAnalysisQuestionEntity';
import { useUserAnswers } from 'src/features/selfAnalysis/Hook/useUserAnswers';
import { SelfAnalysisPre } from 'src/features/selfAnalysis/UI/Screens/Presentational/selfAnalysisPre';
import { useRecoilState } from 'recoil';
import { selfAnalysisUserResultsState } from 'src/features/selfAnalysis/Hook/resultsState';
import { selfAnalysisJobSelectionState } from 'src/features/selfAnalysis/Hook/jobSelectionState';
import { MBTIJobs } from 'src/features/selfAnalysis/Domain/Entity/MBTIType';

const mockData: SelfAnalysisQuestionEntity[] = [
  {
    id: 1,
    question: '1. どちらが好きですか？',
    answers: [
      {
        id: 1,
        text: 'A: 人と一緒に過ごすこと',
      },
      {
        id: 2,
        text: 'B: 自分の時間を持つこと',
      },
      {
        id: 3,
        text: 'C: 社交的な状況',
      },
      {
        id: 4,
        text: 'D: 孤独な状況',
      },
    ],
  },
  {
    id: 2,
    question: '2. 考えるとき、あなたはどちらに近いですか？',
    answers: [
      {
        id: 1,
        text: 'A: 直感的に考える',
      },
      {
        id: 2,
        text: 'B: 論理的に考える',
      },
      {
        id: 3,
        text: 'C: 感情に従って考える',
      },
      {
        id: 4,
        text: 'D: 全体像を把握してから考える',
      },
    ],
  },
  {
    id: 3,
    question: '3. 言われたことをしなければならないとき、どちらが好きですか？',
    answers: [
      {
        id: 1,
        text: 'A: 早く始めること',
      },
      {
        id: 2,
        text: 'B: 最後の期限まで待つこと',
      },
      {
        id: 3,
        text: 'C: 誰かが自分に指示すること',
      },
      {
        id: 4,
        text: 'D: 自分で自分を統制すること',
      },
    ],
  },
  {
    id: 4,
    question: '4. あなたが新しいことを学ぶとき、どちらが好きですか？',
    answers: [
      {
        id: 1,
        text: 'A: 具体的な実践',
      },
      {
        id: 2,
        text: 'B: 抽象的な理論',
      },
      {
        id: 3,
        text: 'C: 実際の経験',
      },
      {
        id: 4,
        text: 'D: 読んで理解すること',
      },
    ],
  },
  {
    id: 5,
    question: '5. あなたはどちらが好きですか？',
    answers: [
      {
        id: 1,
        text: 'A: リスクを取ること',
      },
      {
        id: 2,
        text: 'B: 安全なことを選ぶこと',
      },
      {
        id: 3,
        text: 'C: 現状を維持すること',
      },
      {
        id: 4,
        text: 'D: 変化を起こすこと',
      },
    ],
  },
];

export const SelfAnalysis: FC = () => {
  const router = useRouter();

  const [results, setResult] = useRecoilState(selfAnalysisUserResultsState);
  const { getUserAnswer, setDefaultData, setSelected, getMBTIScore } = useUserAnswers();
  const [qInd, setqInd] = useState(0);
  const [jobIndex, setJobIndex] = useState(0);
  const [, setSelectedJob] = useRecoilState(selfAnalysisJobSelectionState);

  const handleQInd = (val: number) => setqInd(val);
  const handleSelected = (val: number) => setSelected(val, qInd + 1);

  /** Only MBTI score is applied. Other values are still same as mock data. */
  const showResult = () => {
    setResult(getMBTIScore());
  };

  const selectJob = (index: number) => {
    setJobIndex(index + 1);
    setSelectedJob((MBTIJobs.get(results.mbti) ?? [{ title: '', salary: 0 }])[index]);
  };

  useEffect(() => {
    setDefaultData(mockData.length);
  }, []);

  return (
    <SelfAnalysisPre
      qInd={qInd}
      selected={getUserAnswer(qInd + 1)}
      selectedJobIndex={jobIndex}
      mockData={mockData}
      resultData={results}
      router={router}
      handleSelected={handleSelected}
      handleQInd={handleQInd}
      handleCalculation={showResult}
      handleJobIndex={selectJob}
    />
  );
};
