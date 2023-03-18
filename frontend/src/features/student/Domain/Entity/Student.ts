import { ApiBaseModel } from 'src/application/Domain/Entity/ApiBaseModel';

const Gender = { male: 'male', female: 'female' };
type Gender = (typeof Gender)[keyof typeof Gender];

export class Student extends ApiBaseModel {
  readonly name: string = '';
  readonly studentEmail: string = '';
  readonly password: string = '';
  readonly isDropOut: boolean = false;
  readonly grade: number = 0;
  readonly class: number = 0;
  readonly studentNumber: number = 0;
  readonly gender: Gender = Gender.male;
  readonly birthday?: Date;

  constructor(data: Partial<Student> = {}) {
    super(data);
    Object.assign(this, data);
  }

  // TODO: json parse func
  fromObj(obj: any) {
    return new Student({
      name: obj.name ?? '',
      studentEmail: obj.studentEmail ?? '',
      password: obj.password ?? '',
      isDropOut: obj.isDropOut ?? '',
      grade: obj.grade ?? '',
      class: obj.class ?? '',
      studentNumber: obj.studentNumber ?? '',
      gender: obj.gender ?? '',
      birthday: obj.birthday ?? '',
    });
  }
}
