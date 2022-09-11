import { IRowData } from '@/types';

export default function createRowData(title: string, startDate: string, endDate: string): IRowData {
  return {
    title,
    startDate,
    endDate,
  };
}
