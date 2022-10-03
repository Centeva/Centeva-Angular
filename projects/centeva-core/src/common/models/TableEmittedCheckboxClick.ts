import { SelectionModel } from "@angular/cdk/collections"

export type TableEmittedCheckboxClick = {
  ColumnName: string,
  AnyDisplayedItemSelected: boolean,
  AllDisplayedItemsSelected: boolean,
  SelectionModel: SelectionModel<any>
}