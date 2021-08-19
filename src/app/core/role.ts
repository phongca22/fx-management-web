import { find, isNil } from 'lodash';

export enum Role {
  Admin = 1,
  Doctor = 2,
  Coodirnator = 3,
  User = 4,
  DataEntry = 5
}

export function hasRole(id: Role): boolean {
  return [Role.Admin, Role.Doctor, Role.Coodirnator, Role.User, Role.DataEntry].includes(id);
}

export function isDataEntry(data: Role[]): boolean {
  return !isNil(find(data, (val) => val === Role.DataEntry));
}
