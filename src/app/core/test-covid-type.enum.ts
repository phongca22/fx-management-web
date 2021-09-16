import { SGeneral } from './sgeneral';

export enum TestCovidType {
  Ward = 'ward',
  Kit = 'kit',
  NoMoney = 'no_money',
  Suspect = 'suspect'
}

export const TestCovidTypeList: SGeneral[] = [
  {
    id: TestCovidType.Ward,
    name: 'testCovidType.ward'
  },
  {
    id: TestCovidType.Kit,
    name: 'testCovidType.kit'
  },
  {
    id: TestCovidType.NoMoney,
    name: 'testCovidType.noMoney'
  },
  {
    id: TestCovidType.Suspect,
    name: 'testCovidType.suspect'
  }
];
