import { ApiBaseModel } from 'src/application/Domain/Entity/ApiBaseModel';
import { StudentHeader } from './StudentHeader';

export class StudentList extends ApiBaseModel {
  readonly students: StudentHeader[] = [];

  constructor(data?: StudentHeader[]) {
    super();
    if (data) {
      this.students = data;
    }
  }
}
