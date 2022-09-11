import { IRowData } from '@/types';

export default function createData(title: string, startDate: string, endDate: string): IRowData {
  return {
    title,
    startDate,
    endDate,
  };
}
