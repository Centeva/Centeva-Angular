import { SelectionModel } from "@angular/cdk/collections"

export type TableCheckboxInfo = {
  AnyItemSelected: boolean,
  AllItemsSelected: boolean,
  SelectionModel: SelectionModel<any>
}