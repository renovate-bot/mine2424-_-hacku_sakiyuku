import { ApiBaseRepository } from 'src/application/Domain/Repository/ApiBaseRepository';
import { Student } from '../Entity/Student';

export class StudentRepository {
  private instance = new ApiBaseRepository();
  private basePath = 'student';

  async getAll() {
    try {
      const req = await this.instance.get(`${this.basePath}`, {});
      console.log(req);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async create(student: Student) {
    try {
      const req = await this.instance.post(`${this.basePath}/create`, { student });
      console.log(req);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
