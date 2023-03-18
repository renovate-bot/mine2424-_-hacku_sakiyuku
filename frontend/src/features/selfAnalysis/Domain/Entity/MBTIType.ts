import { SelfAnalysisJobSelectionEntity } from './SelfAnalysisJobSelectionEntity';

export const MBTIType = {
  INTROVERSION: 'I',
  EXTRAVERSION: 'E',

  INTUISION: 'N',
  SENSING: 'S',

  FEELING: 'F',
  THINKING: 'T',

  PERCEIVING: 'P',
  JUDGING: 'J',
};

export enum MBTIPattern {
  ISTJ = 'ISTJ',
  ISFJ = 'ISFJ',
  INFJ = 'INFJ',
  INTJ = 'INTJ',
  ISTP = 'ISTP',
  ISFP = 'ISFP',
  INFP = 'INFP',
  INTP = 'INTP',
  ENTJ = 'ENTJ',
  ENTP = 'ENTP',
  ENFJ = 'ENFJ',
  ENFP = 'ENFP',
  ESTJ = 'ESTJ',
  ESFJ = 'ESFJ',
  ESTP = 'ESTP',
  ESFP = 'ESFP',
}

export const MBTIJobs = new Map<MBTIPattern, SelfAnalysisJobSelectionEntity[]>([
  [
    MBTIPattern.ISTJ,
    [
      { title: '税理士', salary: 764 },
      { title: '公認会計士', salary: 992 },
      { title: '警察官', salary: 703 },
      { title: '銀行員', salary: 608.8 },
      { title: 'システムエンジニア', salary: 442 },
    ],
  ],
  [
    MBTIPattern.ISFJ,
    [
      { title: '看護師', salary: 482.9 },
      { title: '教育関係者（小学校教諭）', salary: 672 },
      { title: '事務職員', salary: 347 },
      { title: '薬剤師', salary: 533.4 },
    ],
  ],
  [
    MBTIPattern.INFJ,
    [
      { title: 'カウンセラー（心理）', salary: 400 },
      { title: '社会福祉士', salary: 403 },
      { title: '人事', salary: 478 },
      { title: '建築士', salary: 653 },
    ],
  ],
  [
    MBTIPattern.INTJ,
    [
      { title: '経営コンサルタント', salary: 601 },
      { title: '投資銀行', salary: 891 },
      { title: '研究者', salary: 449 },
      { title: '税理士', salary: 764 },
      { title: '公認会計士', salary: 992 },
    ],
  ],
  [
    MBTIPattern.ISTP,
    [
      { title: 'パイロット', salary: 1192.7 },
      { title: 'プログラマー', salary: 433 },
      { title: '自動車整備士', salary: 420 },
      { title: 'スポーツ選手（プロ野球）', salary: 3702 },
    ],
  ],
  [
    MBTIPattern.ISFP,
    [
      { title: '美容師', salary: 353.8 },
      { title: 'インテリアデザイナー', salary: 419 },
      { title: 'ガーデンデザイナー', salary: 344 },
      { title: 'ファッションデザイナー', salary: 422 },
    ],
  ],
  [
    MBTIPattern.INFP,
    [
      { title: 'ライター', salary: 448 },
      { title: 'アーティスト', salary: 424 },
      { title: 'パフォーマー', salary: 577 },
      { title: '教育関係者（小学校教諭）', salary: 672 },
    ],
  ],
  [
    MBTIPattern.INTP,
    [
      { title: 'データサイエンティスト', salary: 791 },
      { title: '大学教授', salary: 1070.5 },
      { title: '研究者', salary: 449 },
      { title: 'ライター', salary: 448 },
    ],
  ],

  [
    MBTIPattern.ESTP,
    [
      { title: 'スポーツインストラクター', salary: 653 },
      { title: 'パフォーマー（ダンサー）', salary: 577 },
      { title: '企画', salary: 431 },
      { title: '営業', salary: 391 },
    ],
  ],
  [
    MBTIPattern.ENTP,
    [
      { title: '製品開発者', salary: 477 },
      { title: 'ビジネスアナリスト', salary: 744 },
      { title: '弁護士', salary: 945 },
      { title: 'システムエンジニア', salary: 442 },
    ],
  ],
  [
    MBTIPattern.ENFJ,
    [
      { title: '人事', salary: 478 },
      { title: 'カウンセラー（心理）', salary: 400 },
      { title: '教育関係者（予備校講師）', salary: 418.4 },
      { title: '営業', salary: 447 },
    ],
  ],
  [
    MBTIPattern.ENFP,
    [
      { title: '企画', salary: 431 },
      { title: 'ライター', salary: 448 },
      { title: 'アーティスト', salary: 424 },
      { title: 'パフォーマー', salary: 577 },
    ],
  ],
  [
    MBTIPattern.ESTJ,
    [
      { title: '経営者', salary: 4622 },
      { title: '自衛官', salary: 520.8 },
      { title: '管理職・マネージャー', salary: 528 },
      { title: '不動産営業', salary: 411 },
    ],
  ],
  [
    MBTIPattern.ESFJ,
    [
      { title: '管理職・マネージャー', salary: 528 },
      { title: '医療従事者（看護師）', salary: 483 },
      { title: '医療従事者（医師）', salary: 1169 },
      { title: '教育関係者（予備校講師）', salary: 418.4 },
    ],
  ],
  [
    MBTIPattern.ESFP,
    [
      { title: 'ブライダル', salary: 357 },
      { title: 'モデル', salary: 344 },
      { title: 'アパレル', salary: 350 },
      { title: 'ウェイター', salary: 288 },
    ],
  ],
  [
    MBTIPattern.ENTJ,
    [
      { title: '経営者', salary: 4622 },
      { title: '弁護士', salary: 945 },
      { title: '政治家（国会議員）', salary: 2255 },
      { title: '営業', salary: 447 },
    ],
  ],
]);

export const MBTIDescription = new Map<MBTIPattern, string>([
  [
    MBTIPattern.ISTJ,
    '誠実で責任感が強く、着実に仕事をこなしていくタイプです。ルールや規則をよく守り、組織の中で信頼を得ることができます。',
  ],
  [
    MBTIPattern.ISFJ,
    '思いやりがあり気配りができるタイプです。真面目で人に貢献するのが好きで、裏方からのサポートに徹するのが得意です。',
  ],
  [
    MBTIPattern.INFJ,
    '控えめで優しく思いやりがあります。自分の意見を主張することは少ないですが、他人の感情を敏感に感じ取ることができます。',
  ],
  [
    MBTIPattern.INTJ,
    '自信家で努力家でもあります。論理的に物事の本質をとらえることが得意で、客観的に最善となる判断を下すことができます。',
  ],
  [
    MBTIPattern.ISTP,
    '気まぐれで好奇心が強く行動力があるタイプです。器用であり、環境の変化への対応を難なくこなすことができます。',
  ],
  [
    MBTIPattern.ISFP,
    '穏やかだけれども内側に情熱を秘めているタイプです。他人と過剰に干渉することなく協調していくことを好みます。',
  ],
  [
    MBTIPattern.INFP,
    '理想主義者で、自分の信念に基づいて行動することを重視します。自己表現を行い、他人に影響を与えることを好みます。',
  ],
  [
    MBTIPattern.INTP,
    '知的好奇心が強く空想家で、独創的なゆえに変わりものであると思われることも多いタイプです。',
  ],

  [
    MBTIPattern.ESTP,
    'エネルギーにあふれており、行動力の高いタイプです。そのポジティブに新しいことに挑戦する姿は人々を惹きつけます。',
  ],
  [
    MBTIPattern.ESFP,
    'とにかく今を楽しんで生きることを大切にするタイプです。コミュニケーション能力が高く、みんなの中心で一緒に楽しむことを好みます。',
  ],
  [
    MBTIPattern.ENFP,
    '社交的で人づきあいが上手なタイプです。周りの人を楽しませるのが得意で、新しいことに次々と取り組んでいくのを好みます。',
  ],
  [
    MBTIPattern.ENTP,
    '理屈家で、率直に相手と意見をぶつけ合うのを好みます。周りを巻き込んで影響を与え、大きなことを成し遂げるタイプです。',
  ],
  [
    MBTIPattern.ESTJ,
    '論理的思考を持ち、議論することを好みます。人と自信を持ってコミュニケーションを取ることができ、指導することも得意とします。',
  ],
  [
    MBTIPattern.ESFJ,
    '面倒見がよく、良い人間関係を構築することが得意なタイプです。チームのまとめ役となり、活性化させることができます。',
  ],
  [
    MBTIPattern.ENFJ,
    '求心力があり、組織のリーダーとして人々をまとめることができるタイプです。他人の気持ちをよく理解し手助けするので、自然と人から頼りにされることが多いです。',
  ],
  [
    MBTIPattern.ENTJ,
    '堅実な管理者タイプです。統率力があり、組織のリーダーシップを取ることが得意です。',
  ],
]);

export const MBTITitle = new Map<MBTIPattern, string>([
  [MBTIPattern.ISTJ, '慎重・現実的・責任感が強い'],
  [MBTIPattern.ISFJ, '忠実・実践的・献身的'],
  [MBTIPattern.INFJ, '洞察力があり、人間関係に敏感'],
  [MBTIPattern.INTJ, '論理的・能動的・批判的'],
  [MBTIPattern.ISTP, '冷静・探究心が強い・機械的に興味がある'],
  [MBTIPattern.ISFP, '芸術的・感性的・実用的'],
  [MBTIPattern.INFP, '理想主義的・創造力が豊か・人間関係に敏感'],
  [MBTIPattern.INTP, '分析的思考・論理的な問題解決能力に長けていることが多い'],

  [MBTIPattern.ESTP, '冒険好き・アクティブ・実践的'],
  [MBTIPattern.ESFP, '社交的・エンターテイナー・現実的'],
  [MBTIPattern.ENFP, '非凡・創造力が豊か・情熱的'],
  [MBTIPattern.ENTP, 'アイデアマン・論理的・機転が利く'],
  [MBTIPattern.ESTJ, '堅実・実践的・責任感が強い'],
  [MBTIPattern.ESFJ, '社交的・責任感が強い・現実的'],
  [MBTIPattern.ENFJ, 'チームリーダー・人間関係に敏感・人を動かす力がある'],
  [MBTIPattern.ENTJ, 'リーダー・論理的・組織能力がある'],
]);
