export class ContactEntity {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly message: string;

  constructor(id: number, name: string, email: string, message: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.message = message;
  }
}
