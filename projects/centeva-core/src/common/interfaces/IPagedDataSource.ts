export interface IPagedDataSource {
  FirstItemOnPage: number;
  HasNextPage: boolean;
  HasPreviousPage: boolean;
  IsFirstPage: boolean;
  IsLastPage: boolean;
  LastItemOnPage: number;
  PageNumber: number;
  PageSize: number;
  TotalItems: number;
  TotalPages: number;
  Records: any[];
}
