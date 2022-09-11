export type Order = 'asc' | 'desc';

export interface IRowData {
  title: string;
  startDate: string;
  endDate: string;
}

export interface IHeadCell {
  disablePadding: boolean;
  id: keyof IRowData;
  label: string;
  numeric: boolean;
}
