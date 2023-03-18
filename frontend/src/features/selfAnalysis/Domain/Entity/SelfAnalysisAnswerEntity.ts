export class SelfAnalysisAnswerEntity {
  /**
   * This `id` parameter represents 'Selected Index'.
   *
   * This must be set in range of 1 through 4.
   */
  id: number;
  text: string;

  constructor(id: number, text: string) {
    this.id = id;
    this.text = text;
  }
}
