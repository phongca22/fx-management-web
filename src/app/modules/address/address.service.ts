import { Injectable } from '@angular/core';
import { chain, keys } from 'lodash';
import { BINH_DUONG_WARD, HCM_WARD } from 'src/app/json/district';
import { BINH_DUONG_DISTRICT, HCM_DISTRICT } from 'src/app/json/province';
import { District } from './district';
import { Province } from './province';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor() {}

  getProvinces(): Province[] {
    return [
      {
        id: '79',
        name: 'Hồ Chí Minh',
        districts: this.convert(HCM_DISTRICT),
        wards: this.convert(HCM_WARD)
      },
      {
        id: '74',
        name: 'Bình Dương',
        districts: this.convert(BINH_DUONG_DISTRICT),
        wards: this.convert(BINH_DUONG_WARD)
      }
    ];
  }

  private convert(data: any): District[] {
    return chain(keys(data))
      .filter((key: string) => key !== 'default')
      .map((key: string) => {
        const t = data[key];
        return {
          id: t.code,
          name: t.name_with_type,
          parent: t.parent_code
        };
      })
      .value();
  }
}
