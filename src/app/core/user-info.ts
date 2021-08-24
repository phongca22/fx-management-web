import { orderBy, reject, sortBy } from 'lodash';
import { Doctor } from './doctor';
import { UserSupport } from './user-support';
import { UserConditionType } from './user-condition.enum';

export class UserInfo {
  id: number;
  name: string;
  phone: string;
  age: number;
  gender: number;
  address: string;
  ward: string | null;
  district: string;
  province: string;
  addressLabel: string;
  condition: UserConditionType;
  code: string;
  doctor: Doctor;
  supports: UserSupport[];
  doctorAssignmentId: number;
  patientConditionId: any;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.fullname;
    this.phone = data.phone;
    this.age = data.age;
    this.gender = data.gender;
    this.address = data.address;
    this.ward = data.ward;
    this.district = data.district;
    this.province = data.province;
    this.condition = data.status;
    this.code = data.code;
    if (data.condition) {
      this.setCondition(data.condition);
    }

    if (data.doctorAssignments) {
      this.setAssignment(data.doctorAssignments);
    }

    this.addressLabel = this.combineAddress();
  }

  combineAddress() {
    return reject([this.address, this.ward ? 'P' + this.ward : null, this.district, this.province], [null]).join(', ');
  }

  setAssignment([data]: any[]) {
    this.doctor = new Doctor(data.doctor);
    this.doctorAssignmentId = data.id;
    this.setSupport(data.supports);
  }

  setSupport(data: any[]): void {
    this.supports = sortBy(
      data.map((val: any) => new UserSupport(val)),
      ['id']
    );
  }

  setCondition(data: any) {
    this.condition = data.conditionId;
    this.patientConditionId = data.id;
  }

  setInfo(data: any) {
    this.setAssignment(data.doctorAssignments);
    this.setCondition(data.condition);
  }
}
