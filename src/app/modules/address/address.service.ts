import { Injectable } from '@angular/core';
import { filter, find } from 'lodash';
import { DATA } from './data';
import { District } from './district';
import { Province } from './province';
import { Ward } from './ward';

const HCM_CODE = '79';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  provinces: Province[];

  constructor() {
    this.combine();
  }

  private combine(): void {
    this.provinces = DATA.map(([id, name, prefix, code, children]) => {
      return {
        id: id,
        name: `${prefix} ${name}`,
        prefix: prefix,
        code: code,
        districts: (children as any[]).map(([idD, nameD, prefixD, codeD, childrenD]) => {
          return {
            id: idD,
            name: `${prefixD} ${nameD}`,
            prefix: prefixD,
            code: codeD,
            wards: (childrenD as any[]).map(([idW, nameW, prefixW, codeW]) => {
              return {
                id: idW,
                name: `${prefixW} ${nameW}`,
                prefix: prefixW,
                code: codeW
              };
            })
          };
        })
      } as Province;
    });

    const hcm = find(this.provinces, { id: HCM_CODE });
    this.provinces = filter(this.provinces, ({ id }) => id != HCM_CODE);
    this.provinces.unshift(hcm as any);
  }

  getProvinces(): Province[] {
    return this.provinces;
  }

  findProvince(data: string): Province | undefined {
    return find(this.provinces, ({ name, prefix }) => `${prefix} ${name}`.toLowerCase().includes(data.toLowerCase()));
  }

  findDistrict(p: Province, data: string): District | undefined {
    return find(p.districts, ({ name, prefix }) => `${prefix} ${name}`.toLowerCase().includes(data.toLowerCase()));
  }

  findWard(d: District, data: string): Ward | undefined {
    return find(d.wards, ({ name, prefix }) => `${prefix} ${name}`.toLowerCase().includes(data.toLowerCase()));
  }
}
