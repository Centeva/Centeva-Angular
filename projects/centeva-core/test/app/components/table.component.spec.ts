import { AdvancedSearchResultsPaged, ColumnDataTypes, DateRangeColumn, Operands, SearchCriteriaRequest, SortStates, StringFilterCriteria, TableColumn, TableComponent } from "projects/centeva-core/src/public-api";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DateTime } from "luxon";

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
      { Name: 'MultiSelect1', Placeholder: 'MultiSelect1', DataType: ColumnDataTypes.MULTISELECT, Options: ['ACTIVE', 'COMPLETED'], Property: 'ProjectStatusTypeId', Enabled: true}
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
          ProjectId: 1,
          ProjectTitle: "TestProject1",
          ProjectStatusTypeId: "ACTIVE",
          ActualCompletionDate: DateTime.local(2010, 5, 1),
          ApplicationDate: DateTime.local(2010, 1, 1),
          AgeInMonths: 50
        },
        {
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

  afterEach( () => {
    jasmine.clock().uninstall();
  });
});
