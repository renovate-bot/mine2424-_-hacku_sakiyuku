export class LearningEntity {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly image: string;
  readonly category: string;

  constructor(
    id: number,
    title: string,
    description: string,
    url: string,
    image: string,
    category: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.url = url;
    this.image = image;
    this.category = category;
  }
}
