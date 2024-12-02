export type IMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'Augest'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type ISemesterName = 'Autumn' | 'Summer' | 'Fall';
export type ISemesterCode = '01' | '02' | '03';
export type IAcademicSemester = {
  name: ISemesterName;
  code: ISemesterCode;
  year: string;
  startMonth: IMonth;
  endMonth: IMonth;
};
