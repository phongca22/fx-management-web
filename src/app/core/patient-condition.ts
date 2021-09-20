import { TestCovidType } from './test-covid-type.enum';

export class PatientCondition {
  background: string;
  symptom: string;
  spo2: string;
  sickDays: number;
  testCovid: TestCovidType;
  member: number;
  treated: string;
  having: string;
  zalo: boolean;
  desire: string;
  timer: string;
  note: string;
  healthDeclaration: boolean;

  constructor(data: any) {
    this.background = data.background;
    this.symptom = data.symptom;
    this.spo2 = data.spo2;
    this.sickDays = data.sickDays;
    this.testCovid = data.testCovid;
    this.member = data.member;
    this.having = data.having;
    this.zalo = data.zalo;
    this.desire = data.desire;
    this.timer = data.timer;
    this.note = data.note;
    this.treated = data.treated;
    this.healthDeclaration = data.healthDeclaration;
  }
}
