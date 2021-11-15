import { Injectable } from '@angular/core';
import { chain, isNumber, keys, toNumber } from 'lodash';
import { BINH_DUONG_WARD, HCM_WARD, TAY_NINH_WARD, DONG_NAI_WARD, LONG_AN_WARD } from 'src/app/json/district';
import { BINH_DUONG_DISTRICT, HCM_DISTRICT, TAY_NINH_DISTRICT, DONG_NAI_DISTRICT, LONG_AN_DISTRICT  } from 'src/app/json/province';
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
      },
      {
        id: '72',
        name: 'Tây Ninh',
        districts: this.convert(TAY_NINH_DISTRICT),
        wards: this.convert(TAY_NINH_WARD)
      },
      {
        id: '80',
        name: 'Long An',
        districts: this.convert(LONG_AN_DISTRICT),
        wards: this.convert(LONG_AN_WARD)
      },
      {
        id: '75',
        name: 'Đồng Nai',
        districts: this.convert(DONG_NAI_DISTRICT),
        wards: this.convert(DONG_NAI_WARD)
      },
    ];
  }

  private convert(data: any): District[] {
    return chain(keys(data))
      .filter((key: string) => key !== 'default')
      .map((key: string) => {
        const t = data[key];
        const name = toNumber(t.name);
        return {
          id: t.code,
          name: isNaN(name) ? t.name : name.toString(),
          parent: t.parent_code
        };
      })
      .value();
  }
}
