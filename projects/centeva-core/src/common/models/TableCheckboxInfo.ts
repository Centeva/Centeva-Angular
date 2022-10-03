import { SelectionModel } from "@angular/cdk/collections"

export type TableCheckboxInfo = {
  AnyDisplayedItemSelected: boolean,
  AllDisplayedItemsSelected: boolean,
  SelectionModel: SelectionModel<any>
}