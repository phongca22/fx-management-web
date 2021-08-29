import { Injectable } from '@angular/core';
import { chain, filter, keys } from 'lodash';
import { DISTRICT } from './district';
import { WARD } from './ward';

const DISTRICT_DATA = keys(DISTRICT).map((key: string) => {
  return DISTRICT[key];
});

const WARD_DATA = keys(WARD).map((key: string) => {
  return WARD[key];
});

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor() {}

  getProvinces(): any[] {
    return [
      {
        id: '79',
        name: 'Hồ Chí Minh'
      }
    ];
  }

  getDistricts(id: string): any[] {
    return chain(DISTRICT).filter({ parent_code: id }).sortBy(['name']).value();
  }

  getWards(code: string): any[] {
    return chain(WARD_DATA).filter({ parent_code: code }).orderBy(['name']).value();
  }
}
