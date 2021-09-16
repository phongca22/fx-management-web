export enum PatientStatusType {
  Pending = 'pending',
  Processing = 'processing',
  Recovered = 'recovered',
  Hospitalized = 'hospitalized',
  Done = 'done'
}

export const PatientStatusList: PatientStatusType[] = [
  PatientStatusType.Pending,
  PatientStatusType.Processing,
  PatientStatusType.Recovered,
  PatientStatusType.Hospitalized,
  PatientStatusType.Done
];
