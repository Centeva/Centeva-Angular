import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { cloneDeep, remove } from 'lodash';
import { DateTime } from 'luxon';
import { ColumnDataTypes } from '../../common/constants/ColumnDataTypes';
import { Operands } from '../../common/constants/Operands';
import { SortStates } from '../../common/constants/SortStates';
import { IColumnSortState } from '../../common/interfaces/IColumnSortState';
import { SearchCriteriaRequest } from '../../common/models/SearchCriteriaRequest';
import { StringFilterCriteria } from '../../common/models/StringFilterCriteria';
import { CheckboxColumn, ComparisonColumn, DateRangeColumn, TableColumn } from '../../common/models/table-column';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() currentFilter: SearchCriteriaRequest;
  @Input() set displayedColumns(value: TableColumn[]) {
    this._displayedColumns = value;
    this.setupForm();
  }
  get displayedColumns() {
    return this._displayedColumns;
  }
  @Input() set dataSource( value: any) {
    this._dataSource = value;
    this.resetScroll();
    this.displayedColumns?.forEach(column => {
      if (column.DataType === ColumnDataTypes.CHECKBOX) {
        this.checkForCheckboxStatus(column);
      }
    });
  }
  get dataSource(): any {
    return this._dataSource;
  }
  @Input() tableLoading: boolean = false;
  @Input() tableLoadingText: string = "Loading Results..";
  @Input() isRowClickable: boolean = true;
  @Input() noResultsText: string = "No results to display."
  @Output() searchChanged = new EventEmitter<SearchCriteriaRequest>();
  @Output() rowSelected = new EventEmitter();

  public SortStates = SortStates;
  public ColumnSortState: IColumnSortState = {SortDirection : this.SortStates.NONE, SortProperty: ''}
  public ColumnDataTypes = ColumnDataTypes;
  public columnNames: string[] = [];
  public lastPage: number;
  public timeout: any = null;
  public timeoutOr: any = null;
  public formGroup: UntypedFormGroup ;
  public Operands = Operands;
  public radioFormControl = 'Radio';
  public secondVal = '2';
  public tableWrapperId = 'table-wrapper-id';
  public checkboxAtLeastOneSelected: Record<string, boolean> = {};
  public checkboxAllSelected: Record<string, boolean> = {};
  public templateMapping: Record<string, TemplateRef<any>> = {};
  public defaultOptionValueProperty = 'Id';

  @ViewChild('defaultColumn', { static: true }) defaultColumnRef: TemplateRef<undefined>;
  @ViewChild('linkColumn', { static: true }) linkRef: TemplateRef<undefined>;
  @ViewChild('checkboxColumn', { static: true }) checkboxRef: TemplateRef<undefined>;

  private _displayedColumns: TableColumn[];
  private _dataSource: any;


  constructor(public fb: UntypedFormBuilder) { }

  async ngOnInit() { }

  private setupForm() {
    this.templateMapping = {};
    this.columnNames = this.displayedColumns?.map(x => x.Name);
    const controls: any = {};
    this.displayedColumns?.forEach(x => {
      if (x.IsColumnResizable == null) x.IsColumnResizable = true;
      if (x.IsColumnSortable == null) x.IsColumnSortable = true;

      const currFilter = this.currentFilter?.FilterCriteria?.find(filter => filter.PropertyName === x.Property);
       // Set property Value
      controls[x.Property] = new UntypedFormControl(currFilter?.Value || '');

      if (x.DataType === ColumnDataTypes.DATEPICKRANGE) {
        // We need to convert the dates from MM/dd/yyy format to a real date in order to be displayed in the input
        const value1 = currFilter ? new Date(currFilter.Value) : null;
        const value2 = currFilter ? new Date(currFilter.Value2) : null;

        controls[x.Property] = new UntypedFormControl(value1 || '');
        controls[x.Property + this.secondVal] = new UntypedFormControl(value2 || '');
      }
      if (x.DataType === ColumnDataTypes.COMPARISON) {
        this.setComparisonColumn(x, controls);
      }
      if (x.DataType === ColumnDataTypes.MULTISELECT) {
        const filters = this.currentFilter?.FilterCriteriaOr.filter((filter) => filter.PropertyName === x.Property);
        controls[x.Property] = new UntypedFormControl(filters?.map(f => f.Value) || '');
      }
      if (x.DataType === ColumnDataTypes.CHECKBOX && x.SelectedItems) {
        x.SelectedItems.clear();
        this.checkForCheckboxStatus(x);
      }
      if (x.DataType === ColumnDataTypes.MULTISELECT || x.DataType === ColumnDataTypes.SELECT) {
        if (x.OptionValueProperty == null) x.OptionValueProperty = this.defaultOptionValueProperty;
        x.Options = cloneDeep(x.Options);
        x.Options.map(option => {
          if (option?.[x.OptionValueProperty] != null) {
            option[x.OptionValueProperty] = option[x.OptionValueProperty].toString();
          }
        })
      }

      if (x.Template) this.templateMapping[x.Property] = x.Template;
      else if (x.Link) this.templateMapping[x.Property] = this.linkRef;
      else if (x.DataType === ColumnDataTypes.CHECKBOX && x.SelectedItems) this.templateMapping[x.Property] = this.checkboxRef;
      else this.templateMapping[x.Property] = this.defaultColumnRef;
    });

    this.sortSetup();
    this.resetScroll();
    this.formGroup = new UntypedFormGroup(controls);
  }

  private sortSetup() {
    switch (this.currentFilter?.SortDirection) {
      case 'asc':
        this.ColumnSortState = { SortProperty : this.currentFilter?.SortProperty, SortDirection: SortStates.ASC };
        break;
      case 'desc':
        this.ColumnSortState = { SortProperty : this.currentFilter?.SortProperty, SortDirection: SortStates.DESC };
        break;
      default:
        this.ColumnSortState = { SortProperty : this.currentFilter?.SortProperty, SortDirection: SortStates.NONE };
        break;
    }
  }

  private setOperandTypeString(operand: string, val1: string, val2?: string) {
    if (operand === Operands.GreaterThan) {
      return `>${val1}`;
    } else if (operand === Operands.LessThan) {
      return `<${val1}`;
    } else if (operand === Operands.Between) {
      return `${val1}-${val2}`;
    }
    return val1 || '';
  }

  public filterDateRangeChange(column: TableColumn) {
    const startDate = this.formGroup.controls[column.Property]?.value;
    const endDate = this.formGroup.controls[column.Property + this.secondVal]?.value;
    if (startDate && endDate || (!startDate && !endDate)) {
      this.removeTimesFromDate(column as DateRangeColumn);
      this.currentFilter.PageNumber = 1;
      this.emitSearchChanged();
    }
  }

  public removeTimesFromDate(column: DateRangeColumn) {
    // In order to prevent timezone issues, we need to remove the time from the DateTime object
    const valueIndex = this.currentFilter.FilterCriteria.findIndex(x => x.PropertyName === column.Property);
    if (valueIndex !== -1) {
      this.currentFilter.FilterCriteria.splice(valueIndex, 1);
    }

    const newFilter = new StringFilterCriteria ({
      Operand: Operands.Between,
      PropertyName: column.Property,
    });

    const startDate = this.formGroup.controls[column.Property]?.value;
    const endDate = this.formGroup.controls[column.Property + this.secondVal]?.value;

    newFilter.Value = DateTime.fromJSDate(startDate).toFormat('MM/dd/yyyy');
    newFilter.Value2 = DateTime.fromJSDate(endDate).toFormat('MM/dd/yyyy');

    this.currentFilter.FilterCriteria.push(newFilter);
  }

  public clearFilter(column: TableColumn, event: any) {
    event.stopPropagation();

    this.formGroup.controls[column.Property].setValue(null);
    if (this.formGroup.controls[column.Property + this.secondVal]?.value) {
      this.formGroup.controls[column.Property + this.secondVal].setValue(null);
    }

    column.DataType === ColumnDataTypes.MULTISELECT ? this.filterOrValueChanged(column) : this.filterValueChanged(column);
  }

  public filterValueChanged(column: TableColumn) {
    // Debouncing our changes
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const value = this.formGroup.controls[column.Property].value;
      const newFilter = new StringFilterCriteria ({
        Operand: column.Operand || Operands.Contains,
        PropertyName: column.Property,
        Value: value,
        Value2: this.formGroup.controls[column.Property + this.secondVal] ? this.formGroup.controls[column.Property + this.secondVal].value : null,
      });
      const valueIndex = this.currentFilter.FilterCriteria.findIndex(x => x.PropertyName === column.Property);
      // If the filter criteria doesn't exist and we have a value to use.
      if (valueIndex === -1 && value) {
        this.currentFilter.FilterCriteria.push(newFilter);
      } else if (value) {
        this.currentFilter.FilterCriteria[valueIndex] = newFilter;
      } else if (valueIndex !== -1) {
        this.currentFilter.FilterCriteria.splice(valueIndex, 1);
      }
      // Set page back to 0 if the filter has changed.
      this.currentFilter.PageNumber = 1;
      this.emitSearchChanged();
    }, 750);

  }

  public filterOrValueChanged(column: TableColumn) {
   // Debouncing our changes
   clearTimeout(this.timeoutOr);
   this.timeoutOr = setTimeout(() => {
     this.currentFilter.FilterCriteriaOr = remove(this.currentFilter.FilterCriteriaOr, (filter) => {
        return filter.PropertyName !== column.Property;
     });

     const values = this.formGroup.controls[column.Property].value || [];
     values.forEach((val: any) => {
      this.currentFilter.FilterCriteriaOr.push(new StringFilterCriteria ({
        Operand: column.Operand || Operands.Contains,
        PropertyName: column.Property,
        Value: val,
        Value2: null,
      }));
     });
     // Set page back to 0 if the filter has changed.
     this.currentFilter.PageNumber = 1;
     this.emitSearchChanged();
   }, 1500);

  }

  public filterSortChanged(ev: Event, propertyName: string, sortDirection: SortStates) {
    ev.stopPropagation();

    this.ColumnSortState = { SortProperty : propertyName, SortDirection: sortDirection};

    this.currentFilter.SortProperty = propertyName;
    this.currentFilter.SortDirection = sortDirection;
    this.emitSearchChanged();
  }

  public filterComparisonChanged(column: TableColumn) {
    const valueIndex = this.currentFilter.FilterCriteria.findIndex(x => x.PropertyName === column.Property);
    if (valueIndex !== -1) {
      this.currentFilter.FilterCriteria.splice(valueIndex, 1);
    }
    const comparisonOperand = this.formGroup.controls[column.Property + this.radioFormControl].value;
    const newFilter = new StringFilterCriteria ({
      Operand: comparisonOperand,
      PropertyName: column.Property,
    });

    if (comparisonOperand === Operands.Between) {
      newFilter.Value = this.formGroup.controls[column.Property + comparisonOperand].value;
      newFilter.Value2 = this.formGroup.controls[column.Property + comparisonOperand + this.secondVal].value;
    } else {
      newFilter.Value = this.formGroup.controls[column.Property + comparisonOperand].value;
    }

    this.currentFilter.FilterCriteria.push(newFilter);
    this.currentFilter.PageNumber = 1;
    this.emitSearchChanged();

  }

  private setComparisonColumn(column: ComparisonColumn, controls: {[key: string] : AbstractControl}) {
    const currFilter = this.currentFilter?.FilterCriteria?.find(filter => filter.PropertyName === column.Property);

    controls[column.Property] = new UntypedFormControl(currFilter ? this.setOperandTypeString(currFilter?.Operand, currFilter?.Value, currFilter?.Value2): '');
    controls[column.Property + this.radioFormControl] = new UntypedFormControl(currFilter?.Operand || '');
    controls[column.Property+Operands.GreaterThan] = new UntypedFormControl(currFilter?.Operand == Operands.GreaterThan ? currFilter?.Value : '');
    controls[column.Property+Operands.LessThan] = new UntypedFormControl(currFilter?.Operand == Operands.LessThan ? currFilter?.Value : '');
    controls[column.Property+Operands.Between] = new UntypedFormControl('');
    controls[column.Property+Operands.Between + this.secondVal] = new UntypedFormControl('');
    if (currFilter?.Operand === Operands.Between) {
      controls[column.Property+Operands.Between] = new UntypedFormControl(currFilter?.Value);
      controls[column.Property+Operands.Between + this.secondVal] = new UntypedFormControl(currFilter?.Value2);
    }
  }

  public closeComparison(column: ComparisonColumn) {
    column.ShowComparison = false;
    this.setComparisonColumn(column, this.formGroup.controls);
  }

  private resetScroll() {
    const tableWrapper = document.getElementById(this.tableWrapperId);
    if (tableWrapper) {
      tableWrapper.scrollTop = 0;
    }
  }

  public onRowClick(row: Record<any, any>): void {
    if (!this.isRowClickable) return;
    this.rowSelected.emit(row)
  }

  public emitSearchChanged(): void {
    this.searchChanged.emit(this.currentFilter);
  }

  public checkboxMasterToggle(column: CheckboxColumn): void {
    if (!column.SelectedItems) return;

    this.allItemsInSelectionModelSelected(column.SelectedItems)
      ? this.dataSource?.Records?.forEach(record => column.SelectedItems?.deselect(record))
      : this.dataSource?.Records?.forEach(record => column.SelectedItems?.select(record));
    this.checkForCheckboxStatus(column);
  }

  public checkboxItemToggle(column: CheckboxColumn, row: any): void {
    column.SelectedItems.toggle(row);
    this.checkForCheckboxStatus(column);
  }

  private allItemsInSelectionModelSelected(selectionModel: SelectionModel<any>): boolean {
    if (this.dataSource?.Records == null || this.dataSource?.Records?.length === 0) return false;

    let allItemsSelected: boolean = true;
    this.dataSource?.Records?.forEach(record => {
      if (!selectionModel?.isSelected(record)) {
        allItemsSelected = false;
        return;
      }
    });
    return allItemsSelected;
  }

  private anyDisplayedItemInColumnSelected(selectionModel: SelectionModel<any>): boolean {
    let anyItemSelected: boolean = false;
    this.dataSource?.Records?.forEach(record => {
      if (selectionModel?.isSelected(record)) {
        anyItemSelected = true;
        return;
      }
    })
    return anyItemSelected;
  }

  private checkForCheckboxStatus(column: CheckboxColumn): void {
    this.checkboxAllSelected[column.Property] = this.allItemsInSelectionModelSelected(column.SelectedItems);
    this.checkboxAtLeastOneSelected[column.Property] = this.anyDisplayedItemInColumnSelected(column.SelectedItems);
  }
}