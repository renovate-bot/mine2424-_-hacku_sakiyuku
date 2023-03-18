import axios, { AxiosInstance } from 'axios';

export class ApiBaseRepository {
  private _version: string = 'v1';
  private _baseUrl: string = `https://sakiyuku-api-dot-sakiyuku-dev.an.r.appspot.com/${this._version}/`;

  private _instance(): AxiosInstance {
    return axios.create({
      baseURL: this._baseUrl,
      timeout: 10000,
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Headers':
        //   'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With',
        // 'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    });
  }

  async post(path: string, data: object) {
    try {
      const res = await this._instance().post(this._baseUrl + path, data);
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async get(path: string, data: object) {
    try {
      const res = await this._instance().get(path, { data });
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
