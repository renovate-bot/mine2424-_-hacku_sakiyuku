import { atom } from 'recoil';

type AnswerDataStateType = {
  //自分
  myAge: number;
  // 母親
  matherExists: boolean;
  matherAge: number;
  // 父親
  fatherExists: boolean;
  fatherAge: number;
  // 将来の夢
  dreamText: string;
  // 働き始める年齢 ok
  workBegin: 1 | 2; // '大卒','高卒','中卒'
  // 貯金
  depositExists: boolean;
  depositNum: number;
  // NISA
  nisaExists: boolean;
  nisaNum: number;
  // 株
  stockExists: boolean;
  stockNum: number;
  // 生活
  lifeStyleEarly: 1 | 2 | 3; // '節約した生活', 'メリハリをつけた生活', '旅行や趣味を楽しむ生活'
  liveArea: 1 | 2 | 3; // '関東圏' | '関西圏' | '地方'
  homeType: 1 | 2 | 3; // '一軒家' | '賃貸' | 'マンション購入'
  // 趣味 ok
  hobby: {
    hobbyKey: number;
    hobbyText: string;
    hobbyCostNum: number;
  }[];
  // 車 ok
  carExists: boolean;
  carType: 1 | 2 | 3; // '軽自動車', '普通車', '高級車'
  // 結婚・パートナー
  marriageExists: boolean;
  marriageAge: number;
  partnerJob: 1 | 2 | 3; // '専業主婦・専業主夫' | '非正規雇用' | '正規雇用'
  partnerJobReturn: 1 | 2 | 3; // '復帰しない' | '非正規雇用' | '正規雇用'
  // 子供
  childrenExists: boolean;
  childrenNum: number;
  childrenEducation: 1 | 2 | 3 | 4 | 5 | 6; //'国立大', '私立大', '私立高校まで', '公立高校まで', '私立中学まで', '公立中学まで';
  childrenCramSchool: boolean;
  childrenCultureLesson: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; //  "通わせない","英会話","ピアノ","バレエ","書道","空手","プログラミング","その他"
  // 老後
  jobRetirementAge: number;
  lifeStyleLate: 1 | 2 | 3; // '節約した生活', 'メリハリをつけた生活', '旅行や趣味を楽しむ生活'
};

export const AnswerDataState = atom<AnswerDataStateType>({
  key: 'AnswerDataState',
  default: {
    myAge: 18,
    matherExists: true,
    matherAge: 30,
    fatherExists: true,
    fatherAge: 30,
    dreamText: '',
    workBegin: 1, // '大卒','高卒','中卒'
    depositExists: false,
    depositNum: 3,
    nisaExists: false,
    nisaNum: 3,
    stockExists: false,
    stockNum: 3,
    lifeStyleEarly: 1, // '節約した生活', 'メリハリをつけた生活', '旅行や趣味を楽しむ生活'
    liveArea: 1, // '関東圏' | '関西圏' | '地方'
    homeType: 1, // '一軒家' | '賃貸' | 'マンション購入'
    carExists: false,
    carType: 1, // '軽自動車', '普通車', '高級車'
    hobby: [
      {
        hobbyKey: 1,
        hobbyText: '',
        hobbyCostNum: 0.3,
      },
    ],
    marriageExists: false,
    marriageAge: 25,
    partnerJob: 1, // '専業主婦・専業主夫' | '非正規雇用' | '正規雇用'
    partnerJobReturn: 1, // '復帰しない' | '非正規雇用' | '正規雇用'
    childrenExists: false,
    childrenNum: 1,
    childrenEducation: 1, //'国立大', '私立大', '私立高校まで', '公立高校まで', '私立中学まで', '公立中学まで',
    childrenCramSchool: true,
    childrenCultureLesson: 1, //  "通わせない","英会話","ピアノ","バレエ","書道","空手","プログラミング","その他"
    jobRetirementAge: 60,
    lifeStyleLate: 1, // '節約した生活', 'メリハリをつけた生活', '旅行や趣味を楽しむ生活'
  },
});
