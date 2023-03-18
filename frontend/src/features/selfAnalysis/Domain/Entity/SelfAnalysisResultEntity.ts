import { MBTIPattern } from './MBTIType';

export class SelfAnalysisResultEntity {
  mbti: MBTIPattern;
  scores: number[];

  constructor(mbti: MBTIPattern, scores: number[]) {
    this.mbti = mbti;
    this.scores = scores;
  }
}
