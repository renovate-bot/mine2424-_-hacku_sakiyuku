import { ApiBaseModel } from 'src/application/Domain/Entity/ApiBaseModel';

export class StudentHeader extends ApiBaseModel {
  readonly studentId: string = '';
  readonly name: string = '';
  readonly studentNumber: number = 0;
  readonly gradeGroup: string = '';
  readonly avatar: string = '';

  constructor(
    studentId: string,
    name: string,
    studentNumber: number,
    gradeGroup: string,
    avatar: string
  ) {
    super();
    this.studentId = studentId;
    this.name = name;
    this.studentNumber = studentNumber;
    this.gradeGroup = gradeGroup;
    this.avatar = avatar;
  }
}
