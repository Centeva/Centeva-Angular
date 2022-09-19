import { PipeTransform } from '@angular/core';
import { ColumnDataTypes } from '../constants/ColumnDataTypes';
import { Operands } from '../constants/Operands';
import { SortStates } from '../constants/SortStates';

type TableColumnBase = {
  Name: string;
  Placeholder: string;
  Property: string;
  Enabled: boolean;
  SortState?: SortStates;
  Operand?: Operands;
  HoverDetails?: (col: TableColumn, element?: any) => {};
  Pipe?: {Pipe: PipeTransform, Values?: any};
  // Link to another website.
  Link?: (event: any, values: any) => void;
  Tooltip?: string;
  Styles?: { [klass: string]: any; };
  ContentStyles?: Record<string, string>;
  ColumnHeaderStyles?: Record<string, string>;
  IsColumnClickable?: boolean;
  IsColumnResizable?: boolean;
  IsColumnSortable?: boolean;
};

export type InputColumn = TableColumnBase & {
  DataType: ColumnDataTypes.INPUT
};
export type DateColumn = TableColumnBase & {
  DataType: ColumnDataTypes.DATEPICKER
};
export type DateRangeColumn = TableColumnBase & {
  DataType: ColumnDataTypes.DATEPICKRANGE
};
export type SelectColumn = TableColumnBase & {
  DataType: ColumnDataTypes.SELECT,
  Options: any[];
};
export type MultiSelectColumn = TableColumnBase & {
  DataType: ColumnDataTypes.MULTISELECT,
  Options: any[];
};
export type ComparisonColumn = TableColumnBase & {
  DataType: ColumnDataTypes.COMPARISON,
  ShowComparison: boolean;
};
export declare type CheckboxColumn = TableColumnBase & {
  DataType: ColumnDataTypes.CHECKBOX
};

export type  TableColumn = MultiSelectColumn | SelectColumn | ComparisonColumn  | InputColumn | DateColumn | DateRangeColumn | CheckboxColumn;
