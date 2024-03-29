import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DateTime } from "luxon";
import { SelectionModel } from "@angular/cdk/collections";
import { ColumnDataTypes } from "../../common/constants/ColumnDataTypes";
import { TableComponent } from "./table.component";
import { CheckboxColumn, DateRangeColumn, TableColumn } from "../../common/models/table-column";
import { AdvancedSearchResultsPaged } from "../../common/models/AdvancedSearchResultsPaged";
import { SearchCriteriaRequest } from "../../common/models/SearchCriteriaRequest";
import { SortStates } from "../../common/constants/SortStates";
import { Operands } from "../../common/constants/Operands";

describe('Table Component tests', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let tableColumns: TableColumn[];
  let dataSource: AdvancedSearchResultsPaged<any>;
  let searchCriteriaRequest: SearchCriteriaRequest;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [ FormsModule, ReactiveFormsModule ]
    }).compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    tableColumns = [
      { Name: 'Test1', Placeholder: 'Test1', DataType: ColumnDataTypes.INPUT, Property: 'ProjectTitle', Enabled: true },
      { Name: 'Date1', Placeholder: 'Date1', DataType: ColumnDataTypes.DATEPICKRANGE, Property: 'ActualCompletionDate', Enabled: true },
      { Name: 'Date2', Placeholder: 'Date2', DataType: ColumnDataTypes.DATEPICKRANGE, Property: 'ApplicationDate', Enabled: true },
      { Name: 'Comparison1', Placeholder: 'Comparison1', DataType: ColumnDataTypes.COMPARISON, Property: 'ProjectAge', ShowComparison: true, Enabled: true},
      { Name: 'MultiSelect1', Placeholder: 'MultiSelect1', DataType: ColumnDataTypes.MULTISELECT, Options: ['ACTIVE', 'COMPLETED'], Property: 'ProjectStatusTypeId', Enabled: true},
      { Name: 'Checkbox1', Placeholder: 'Checkbox1', DataType: ColumnDataTypes.CHECKBOX, Property: 'Checkbox1', Enabled: true, SelectedItems: new SelectionModel<any>(true, []) },
      { Name: 'Checkbox2', Placeholder: 'Checkbox2', DataType: ColumnDataTypes.CHECKBOX, Property: 'Checkbox2', Enabled: true, SelectedItems: new SelectionModel<any>(true, [])}
    ];

    dataSource = {
      FirstItemOnPage: 1,
      HasNextPage: false,
      HasPreviousPage: false,
      IsFirstPage: true,
      IsLastPage: true,
      LastItemOnPage: 3,
      PageNumber: 1,
      PageSize: 5,
      Records: [
        {
          Id: 1,
          ProjectId: 1,
          ProjectTitle: "TestProject1",
          ProjectStatusTypeId: "ACTIVE",
          ActualCompletionDate: DateTime.local(2010, 5, 1),
          ApplicationDate: DateTime.local(2010, 1, 1),
          AgeInMonths: 50
        },
        {
          Id: 2,
          ProjectId: 2,
          ProjectTitle: "TestProject2",
          ProjectStatusTypeId: "ACTIVE",
          ActualCompletionDate: DateTime.local(2012, 6, 10),
          ApplicationDate: DateTime.local(2012, 2, 10),
          AgeInMonths: 10
        }
      ],
      TotalItems: 3,
      TotalPages: 1
    }

    searchCriteriaRequest = {
      FilterCriteria: [],
      FilterCriteriaOr: [],
      PageNumber: 1,
      PageSize: 5,
      SortDirection: '',
      SortProperty: ''
    }

    spyOn(component, 'emitSearchChanged').and.callThrough();
    spyOn(component, 'removeTimesFromDate').and.callThrough();
    spyOn(component, 'filterValueChanged').and.callThrough();

    jasmine.clock().uninstall();
    jasmine.clock().install();

    component.dataSource = dataSource;
    component.currentFilter = searchCriteriaRequest;
    component.displayedColumns = tableColumns;
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

  it('changes date filter', () => {
    const column = component.displayedColumns[1];
    component.formGroup.controls[column.Property].setValue(new Date(2010, 3, 1));
    component.formGroup.controls[column.Property + '2'].setValue(new Date(2010, 8, 1));

    component.filterDateRangeChange(column as DateRangeColumn);

    expect(component.currentFilter.FilterCriteria[0].Value).toBe("04/01/2010");
    expect(component.currentFilter.FilterCriteria[0].Value2).toBe("09/01/2010");
    expect(component.removeTimesFromDate).toHaveBeenCalled();
    expect(component.emitSearchChanged).toHaveBeenCalled();
  });

  it('clears filter from input', () => {
    const column = component.displayedColumns[0];
    component.formGroup.controls[column.Property].setValue('test');
    expect(component.formGroup.controls[column.Property].value).toBe('test');

    component.clearFilter(column, new Event('clear'));

    expect(component.formGroup.controls[column.Property].value).toBe(null);
    expect(component.filterValueChanged).toHaveBeenCalled();
  });

  it('changes filter value', () => {
    const column = component.displayedColumns[0];
    component.formGroup.controls[column.Property].setValue('test');
    expect(component.formGroup.controls[column.Property].value).toBe('test');

    component.formGroup.controls[column.Property].setValue('value 2');
    component.filterValueChanged(column);
    jasmine.clock().tick(1000);

    expect(component.formGroup.controls[column.Property].value).toBe('value 2');
    expect(component.currentFilter.FilterCriteria[0].Value).toBe('value 2');
    expect(component.emitSearchChanged).toHaveBeenCalled();
  });

  it('changes or filter value', () => {
    const column = component.displayedColumns[4];
    component.formGroup.controls[column.Property].setValue(['ACTIVE']);

    component.filterOrValueChanged(column);
    jasmine.clock().tick(2000);

    expect(component.formGroup.controls[column.Property].value).toEqual(['ACTIVE']);
    expect(component.currentFilter.FilterCriteriaOr[0].Value).toEqual('ACTIVE');
    expect(component.emitSearchChanged).toHaveBeenCalled();
  });

  it('changes filter sort', () => {
    const column = component.displayedColumns[0];
    component.filterSortChanged(new Event('changed'), column.Property, SortStates.ASC);

    expect(component.currentFilter.SortProperty).toBe(column.Property);
    expect(component.currentFilter.SortDirection).toBe(SortStates.ASC);

    component.filterSortChanged(new Event('changed'), column.Property, SortStates.DESC);

    expect(component.currentFilter.SortDirection).toBe(SortStates.DESC);
    expect(component.emitSearchChanged).toHaveBeenCalled();
  });

  it('changes comparison filter', () => {
    const column = component.displayedColumns[3];
    component.formGroup.controls[column.Property + 'Radio'].setValue(Operands.GreaterThan);
    component.formGroup.controls[column.Property + Operands.GreaterThan].setValue('20');

    component.filterComparisonChanged(column);

    expect(component.currentFilter.FilterCriteria[0].Operand).toBe(Operands.GreaterThan);
    expect(component.currentFilter.FilterCriteria[0].Value).toBe('20');
    expect(component.emitSearchChanged).toHaveBeenCalled();
  });

  it('checkbox master toggle', () => {
    const column = <CheckboxColumn>component.displayedColumns[5];

    component.checkboxMasterToggle(column);

    expect(column.SelectedItems.selected.length).toBe(dataSource.Records.length);
    expect(component.checkboxAllSelected[column.Property]).toBe(true);
    expect(component.checkboxAtLeastOneSelected[column.Property]).toBe(true);
  });

  it('checkbox toggle', () => {
    const column = <CheckboxColumn>component.displayedColumns[5];

    component.checkboxItemToggle(column, dataSource.Records[0]);

    expect(column.SelectedItems.selected.length).toBe(1);
    expect(component.checkboxAllSelected[column.Property]).toBe(false);
    expect(component.checkboxAtLeastOneSelected[column.Property]).toBe(true);
  });

  it('multiple checkboxes', () => {
    const checkboxOneColumn = <CheckboxColumn>component.displayedColumns[5];
    const checkboxTwoColumn = <CheckboxColumn>component.displayedColumns[6];

    component.checkboxItemToggle(checkboxOneColumn, dataSource.Records[0]);
    component.checkboxMasterToggle(checkboxTwoColumn);

    expect(checkboxOneColumn.SelectedItems.selected.length).toBe(1);
    expect(component.checkboxAllSelected[checkboxOneColumn.Property]).toBe(false);
    expect(component.checkboxAtLeastOneSelected[checkboxOneColumn.Property]).toBe(true);

    expect(checkboxTwoColumn.SelectedItems.selected.length).toBe(dataSource.Records.length);
    expect(component.checkboxAllSelected[checkboxTwoColumn.Property]).toBe(true);
    expect(component.checkboxAtLeastOneSelected[checkboxTwoColumn.Property]).toBe(true);
  });

  afterEach( () => {
    jasmine.clock().uninstall();
  });
});
