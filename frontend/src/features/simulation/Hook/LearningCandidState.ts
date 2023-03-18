import { atom } from 'recoil';

export type LearningCandidacyType = {
  title: string;
  // アイコン選べた方がいいだろうけどお金マーク以外思いつかないのでとりあえず放置
  icon: 'currency-yen' | 'no-icon';
}[];

export const LearningCandidState = atom<LearningCandidacyType>({
  key: 'LearningCandidState',
  // 仮データ
  default: [
    {
      title: '貯蓄比率を見直す',
      icon: 'currency-yen',
    },
    {
      title: '支出を減らす',
      icon: 'currency-yen',
    },
  ],
});
