import { SelfAnalysisAnswerEntity } from './SelfAnalysisAnswerEntity';

export class SelfAnalysisQuestionEntity {
  /** Equals to qId(Question ID) */
  id: number;
  question: string;
  answers: SelfAnalysisAnswerEntity[];
  category?: string;

  constructor(
    id: number,
    question: string,
    answers: SelfAnalysisAnswerEntity[],
    category?: string
  ) {
    this.id = id;
    this.question = question;
    this.answers = answers;
    this.category = category ?? '';
  }
}
