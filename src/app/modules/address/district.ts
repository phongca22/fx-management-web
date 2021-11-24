import { Ward } from './ward';

export interface District {
  id: string;
  name: string;
  prefix: string;
  wards: Ward[];
}
