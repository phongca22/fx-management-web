export interface IGender {
  id: number;
  name: string;
}

export const MALE = 1;
export const FEMALE = 0;

export const GENDER: IGender[] = [
  {
    id: MALE,
    name: 'gender.male'
  },
  {
    id: FEMALE,
    name: 'gender.female'
  }
];
