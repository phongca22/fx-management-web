import { HttpHeaders } from '@angular/common/http';
export class Response {
  ok: boolean;
  code: number;
  data?: any;
  message?: string | string[];
  headers?: HttpHeaders;
  type?: string;
  progress?: number;
  error?: boolean;

  constructor(data: any) {
    this.ok = data.ok;
    this.code = data.code;
    this.data = data.data;
    this.message = data.message;
    this.headers = data.headers;
    this.type = data.type;
    this.progress = data.progress;
    this.error = data.error;
  }
}
