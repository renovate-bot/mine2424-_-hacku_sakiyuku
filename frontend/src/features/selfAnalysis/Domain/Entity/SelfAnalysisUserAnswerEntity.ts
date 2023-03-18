export class SelfAnalysisUserAnswerEntity {
  /** Same as qId(Question ID). */
  id: number;

  /**
   * 0 represents 'Not Selected'
   *
   * 1~4 represents 'Selected Index'
   */
  answer: number;

  /** This parameter is not in use temporary. This is always empty. */
  category?: string;

  constructor(id: number, answer: number, category?: string) {
    this.id = id;
    this.answer = answer;
    this.category = category ?? '';
  }
}
