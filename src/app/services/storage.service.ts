import { Injectable } from '@angular/core';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  get(key: string): any {
    return localStorage.getItem(this.getPrefix(key));
  }

  getBoolean(key: string): boolean | null {
    try {
      return localStorage.getItem(this.getPrefix(key)) === 'true';
    } catch (e) {
      return null;
    }
  }

  getNumber(key: string): number | null {
    try {
      const result = localStorage.getItem(this.getPrefix(key));
      return isNil(result) ? result : parseFloat(result);
    } catch (e) {
      return null;
    }
  }

  set(key: string, value: any): void {
    localStorage.setItem(this.getPrefix(key), value);
  }

  remove(key: string): void {
    localStorage.removeItem(this.getPrefix(key));
  }

  getPrefix(key: string) {
    return `fxm.${key}`;
  }

  getSession(key: string) {
    return sessionStorage.getItem(this.getPrefix(key));
  }

  setSession(key: string, value: any) {
    return sessionStorage.setItem(this.getPrefix(key), value);
  }

  removeSession(key: string) {
    sessionStorage.removeItem(this.getPrefix(key));
  }
}
