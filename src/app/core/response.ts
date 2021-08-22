import { HttpHeaders } from '@angular/common/http';
export class Response {
  ok: boolean;
  code: number;
  data?: any;
  message?: string;
  headers?: HttpHeaders;
  type?: string;
  progress?: number;
  errorCode: number;

  constructor(data: any) {
    this.ok = data.ok;
    this.code = data.code;
    this.data = data.data;
    this.message = data.message;
    this.headers = data.headers;
    this.type = data.type;
    this.progress = data.progress;
    this.errorCode = data.errorCode;
  }
}
