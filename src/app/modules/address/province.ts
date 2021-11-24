import { District } from './district';

export interface Province {
  id: string;
  name: string;
  prefix: string;
  districts: District[];
}
