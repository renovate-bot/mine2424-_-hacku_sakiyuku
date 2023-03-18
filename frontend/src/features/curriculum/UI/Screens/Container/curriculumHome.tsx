import { FC } from 'react';
import {
  IconDoor,
  IconAffiliate,
  IconEye,
  IconSearch,
  IconUserExclamation,
  IconCookie,
} from '@tabler/icons-react';
import { CurriculumHomePre } from '../Presentational/curriculumHomePre';

const mockData = [
  {
    title: '自己分析をはじめる',
    description: '自分自身と向き合い、将来について考えよう',
    icon: IconDoor,
    path: './self_analysis',
  },
  {
    title: '人生設計をはじめる',
    description: '将来のライフプランを立てよう',
    icon: IconAffiliate,
    path: './simulation',
  },
  {
    title: '過去の記録を見る',
    description: '過去の自己分析と照らし合わせて、今の自分の改善点を知ろう',
    icon: IconEye,
    path: './',
  },
  {
    title: '分野別学習',
    description: '将来のため、キャリアについて学ぼう',
    icon: IconSearch,
    path: './curriculum',
  },
  {
    title: 'キャリア相談をする',
    description: '相談することで新たな発見があるかも',
    icon: IconUserExclamation,
    path: './',
  },
  {
    title: '設定',
    description: '登録情報の設定はこちらからできます',
    icon: IconCookie,
    path: './',
  },
];

export const CurriculumHome: FC = () => <CurriculumHomePre mockData={mockData} />;
