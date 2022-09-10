import { DateType } from '@date-io/type';

export interface IScheduling {
  title: string;
  startDate: DateType | null;
  endDate: DateType | null;
}
