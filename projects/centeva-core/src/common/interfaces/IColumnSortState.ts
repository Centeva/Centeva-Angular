import { SortStates } from "../constants/SortStates";

export interface IColumnSortState {
    SortDirection: SortStates,
    SortProperty: string,
}