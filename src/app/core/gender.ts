export interface IGender {
  id: number;
  name: string;
}

export const GENDER: IGender[] = [
  {
    id: 1,
    name: 'gender.male'
  },
  {
    id: 0,
    name: 'gender.female'
  }
];
