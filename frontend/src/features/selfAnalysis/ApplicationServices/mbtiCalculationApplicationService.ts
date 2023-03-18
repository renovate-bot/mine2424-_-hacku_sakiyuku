import { SelfAnalysisUserAnswerEntity } from '../Domain/Entity/SelfAnalysisUserAnswerEntity';
import { MBTIPattern, MBTIType } from '../Domain/Entity/MBTIType';
import { SelfAnalysisResultEntity } from '../Domain/Entity/SelfAnalysisResultEntity';

/**
 * @returns { MBTIPattern } patterns - MBTI string converted to enum.
 *
 * @returns { number[] } scores - These represent the scores by MBTI type.
 *
 * scoresの部分は以下の意味を持っています
 *
 * scores[0] -> I（内向的）- E（外向的）
 *
 * scores[1] -> N（直感的）- S（現実的）
 *
 * scores[2] -> F（感情的）- T（論理的）
 *
 * scores[3] -> P（柔軟な）- J（計画的）
 *
 */
export const calculateMBTI = (
  userAnswers: SelfAnalysisUserAnswerEntity[]
): SelfAnalysisResultEntity => {
  // 各々のMBTIスコアを格納する配列
  const scores = [0, 0, 0, 0]; // [A, B, C, D]

  // 回答を加算する
  for (let i = 0; i < userAnswers.length; i += 1) {
    switch (userAnswers[i].answer) {
      case 1:
        scores[0] += 1;
        break;
      case 2:
        scores[1] += 1;
        break;
      case 3:
        scores[2] += 1;
        break;
      case 4:
        scores[3] += 1;
        break;
      default:
        break;
    }
  }

  // MBTIを計算する
  let mbti = '';
  if (scores[0] > scores[1]) {
    mbti += MBTIType.INTROVERSION;
  } else {
    mbti += MBTIType.EXTRAVERSION;
  }
  if (scores[2] > scores[3]) {
    mbti += MBTIType.INTUISION;
  } else {
    mbti += MBTIType.SENSING;
  }
  if (scores[0] > scores[1]) {
    mbti += MBTIType.FEELING;
  } else {
    mbti += MBTIType.THINKING;
  }
  if (scores[2] > scores[3]) {
    mbti += MBTIType.PERCEIVING;
  } else {
    mbti += MBTIType.JUDGING;
  }
  const result: SelfAnalysisResultEntity = { mbti: (<any>MBTIPattern)[mbti], scores };

  return result;
};
