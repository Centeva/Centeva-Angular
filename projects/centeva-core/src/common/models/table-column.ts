import { SelectionModel } from '@angular/cdk/collections';
import { PipeTransform, TemplateRef } from '@angular/core';
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
  Link?: (row: any) => string;
  Tooltip?: string;
  ColumnHeaderStyles?: Record<string, string>;
  ContentStyles?: Record<string, string>;
  Template?: TemplateRef<unknown>;
  IsColumnResizable?: boolean;
  IsColumnSortable?: boolean;
  HideColumnName?: boolean;
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

export type CheckboxColumn = TableColumnBase & {
  DataType: ColumnDataTypes.CHECKBOX,
  SelectedItems: SelectionModel<any>
};

export type StaticColumn = TableColumnBase & {
  DataType: ColumnDataTypes.STATIC
};

export type TableColumn = MultiSelectColumn | SelectColumn | ComparisonColumn | InputColumn | DateColumn | DateRangeColumn | CheckboxColumn | StaticColumn;
