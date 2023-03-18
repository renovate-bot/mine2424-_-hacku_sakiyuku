export class ApiBaseModel {
  constructor(data: Partial<ApiBaseModel> = {}) {
    Object.assign(this, data);
  }

  readonly id: number = 0;
  readonly createdAt: string | undefined;
  readonly updatedAt: string | undefined;
  readonly deletedAt: string | undefined;
  readonly createdBy: string | undefined;
  readonly updatedBy: string | undefined;
  readonly deletedBy: string | undefined;

  readonly isDropout: boolean | undefined;
}
