import { SelectionModel } from "@angular/cdk/collections"

export type TableEmittedCheckboxClick = {
  ColumnName: string,
  SelectionModel: SelectionModel<any>
}