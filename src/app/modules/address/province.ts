import { District } from './district';
import { Ward } from './ward';

export interface Province {
  id: string;
  name: string;
  districts: District[];
  wards: Ward[];
}
