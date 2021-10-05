import { find, isNil, isNumber, random, reject } from 'lodash';
import { Agent } from './agent';
import { Doctor } from './doctor';
import { MALE } from './gender';
import { Role } from './role';
import { SupportStatus } from './support-status';
import { PatientStatusType } from './user-condition.enum';
import * as dayjs from 'dayjs';

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
  status: PatientStatusType;
  code: string;
  doctor: Doctor;
  emergency: boolean;
  legacyCode: string;
  createdDate: Date;
  creator: Agent;
  isDoctor: boolean;
  isAgent: boolean;
  isTransporter: boolean;
  hasAge: boolean;
  avatar: string;

  constructor(data: any) {
    const { info, id, doctorAssignment, creator } = data;
    this.id = id;
    this.name = info.fullname;
    this.phone = info.phone;
    this.hasAge = isNumber(info.age);
    if (this.hasAge) {
      this.age = dayjs().year() - info.age;
    }
    this.gender = info.gender;
    this.address = info.address;
    this.ward = info.ward;
    this.district = info.district;
    this.province = info.province;
    this.code = info.code;
    this.legacyCode = info.legacyCode;
    this.emergency = !isNil(find(doctorAssignment?.supports, { emergency: true, status: SupportStatus.Pending }));
    this.createdDate = new Date(data.createdAt);
    if (doctorAssignment) {
      this.setDoctor(doctorAssignment);
    }

    if (creator) {
      this.creator = new Agent(creator);
    }

    if (data.roles) {
      this.isDoctor = !isNil(find(data.roles, { id: Role.Doctor }));
      this.isAgent = !isNil(find(data.roles, { id: Role.Agent }));
      this.isTransporter = !isNil(find(data.roles, { id: Role.Volunteer }));
    }

    this.combineAddress();
    this.getAvatar();
  }

  getAvatar(): void {
    if (this.hasAge && isNumber(this.gender)) {
      if (this.age < 7) {
        if (this.gender === MALE) {
          this.avatar = `/png/avatar/kid/m${random(1, 4)}.png`;
        } else {
          this.avatar = `/png/avatar/kid/f${random(1, 2)}.png`;
        }
      } else if (this.age >= 7 && this.age < 13) {
        if (this.gender === MALE) {
          this.avatar = `/png/avatar/pre-teen/m${random(1, 2)}.png`;
        } else {
          this.avatar = `/png/avatar/pre-teen/f${random(1, 2)}.png`;
        }
      } else if (this.age >= 13 && this.age < 18) {
        if (this.gender === MALE) {
          this.avatar = `/png/avatar/teen/m${random(1, 4)}.png`;
        } else {
          this.avatar = `/png/avatar/teen/f${random(1, 4)}.png`;
        }
      } else if (this.age >= 18 && this.age < 35) {
        if (this.gender === MALE) {
          this.avatar = `/png/avatar/young/m${random(1, 7)}.png`;
        } else {
          this.avatar = `/png/avatar/young/f${random(1, 7)}.png`;
        }
      } else if (this.age >= 30 && this.age < 50) {
        if (this.gender === MALE) {
          this.avatar = `/png/avatar/adult/m${random(1, 6)}.png`;
        } else {
          this.avatar = `/png/avatar/adult/f${random(1, 6)}.png`;
        }
      } else {
        if (this.gender === MALE) {
          this.avatar = `/png/avatar/old/m${random(1, 4)}.png`;
        } else {
          this.avatar = `/png/avatar/old/f${random(1, 7)}.png`;
        }
      }
    } else {
      this.avatar = '';
    }
  }

  combineAddress() {
    this.addressLabel = reject(
      [
        this.address,
        this.ward ? 'Phường ' + this.ward : null,
        this.district ? 'Quận ' + this.district : null,
        this.province
      ],
      [null]
    ).join(', ');
  }

  setDoctor(data: any) {
    if (data.doctor) {
      this.doctor = new Doctor(data.doctor);
    }

    this.status = data.status;
  }

  setInfo(data: UserInfo): void {
    this.name = data.name;
    this.gender = data.gender;
    this.phone = data.phone;
    this.age = data.age;
    this.province = data.province;
    this.district = data.district;
    this.ward = data.ward;
    this.address = data.address;
    this.combineAddress();
  }
}
