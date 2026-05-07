# Centeva-Core

This is an open source project. If you would like to contribute, check out the [repo](https://github.com/Centeva/Centeva-Angular).

- [Installation](#installation)
- [Components](#components)
  - [Loading](#loading-component)
  - [Table](#searchable-table)
- [Pipes](#pipes)
  - [Capitalize](#capitalize-pipe)
  - [CelsiusToFahrenheit](#celsiustofahrenheit-pipe)
  - [Date](#date-pipe)
  - [Dynamic](#dynamic-pipe)
  - [HighLight](#highlight-pipe)
  - [MiddleDot](#middledot-pipe)
  - [OrderBy](#orderby-pipe)
  - [Percentage](#percentage-pipe)
  - [PhoneNumber](#phone-number-pipe)
  - [Reverse](#reverse-pipe)
  - [SafeHtml](#safehtml-pipe)
- [Directives](#directives)
  - [ClickOutside](#clickoutside-directive)
  - [NumberInput](#numberinput-directive)
- [Utils](#utils)
  - [EmailValidation](#email-validation)
  - [PhoneValidation](#phone-validation)
  - [SortByKey](#sort-by-key)
  - [Build CSV String](#build-csv-string)
  - [Build CSV Link](#build-csv-link)

## Installation

Using npm:

```bash
npm i centeva-core --save
```

### Compatibility

| Version | Angular Compatibility           |
| - |---------------------------------|
| 4.x | 14.x                            |
| 5.x | 15.x, 16.x (MDC-based Material) |
| 6.x | 17.x, 18.x                      |
| 7.x | 21.x, 22.x                      |

## Components

### Loading Component

Module Import

```typescript
import {LoadingModule} from 'centeva-core';
```

Usage:

```typescript
let isLoading = true;
```

```html
<app-loading [loadingText]="'Loading Results..'" *ngIf="isLoading"></app-loading>
```

Loading Preview

<img src="https://github.com/Centeva/Centeva-Angular/blob/master/projects/centeva-core/src/assets/loading-example.png" alt="Loading Preview" width="300"/>
&nbsp;
&nbsp;

### Searchable Table

`This table works with the PREQL nuget package. You will want to implement that on the backend to use this table.`

#### Module Import

```typescript
import {TableModule} from 'centeva-core';
```

#### API

##### Properties

| Name | Description |
| ---- | ----------- |
| @Input('isLoading')</br>type: boolean | Whether or not data is loading. When this is set to true, a spinner will overlay on top of the table
| @Input('tableLoadingText')</br>type: string | Text that will appear when the table data is loading. Defaults to 'Loading Results..'
| @Input('dataSource')</br>type: AdvancedSearchResultsPage | Data source
| @Input('currentFilter')</br>type: SearchCriteriaRequest |  Contains infomration on the current search request.
| @Input('displayedColumns')</br>type: TableColumn[] | This contains a list of the columns to display and the column types.
| @Input('isRowClickable')</br>type: boolean | If enabled, clicking anywhere on the table row will event the same event. Defaults to true.
| @Input('noResultsText')</br>type: string | Text that will be displayed on table when there are no results. Defaults to 'No results to display.'
| @Output('searchChanged')</br>type: SearchCriteriaRequest | Outputs when a filter or sort direction is changed.
| @Output('rowSelected') | Outputs the row that was just clicked. Note: this is only available if the input `isRowClickable` is set to true.
| @Output('columnSelected')</br>Type: TableEmittedColumnClick | Outputs the column name, and the data in that row when a column was clicked. Note: this is only emitted if the column has the property `isColumnClickable`

#### Usage

```typescript
import {AdvancedSearchResultsPaged, SearchCriteriaRequest, TableColumn} from 'centeva-core';
let isLoading: boolean;
let dataSource: AdvancedSearchResultsPaged;
let currentFilter: SearchCriteriaRequest;
let displayedColumns: TableColumn[];
```

```html
<app-table [tableLoading]="isLoading" [dataSource]="dataSource" [currentFilter]="currentFilter" [displayedColumns]="displayedColumns" 
(searchChanged)="searchChanged($event)" (rowSelected)="rowSelected($event)"></app-table>
```

#### TableColumn Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `Name` | `string` | Column header label |
| `Property` | `string` | Key of the data object to display |
| `DataType` | `ColumnDataTypes` | Controls the header filter widget (INPUT, SELECT, MULTISELECT, DATEPICKER, DATEPICKRANGE, COMPARISON, CHECKBOX, STATIC) |
| `Enabled` | `boolean` | Whether the column is shown |
| `Template` | `TemplateRef<unknown>` | Custom template for the cell body |
| `HeaderTemplate` | `TemplateRef<unknown>` | Custom template that replaces the entire column header. When set, the built-in filter widget is not rendered. See [HeaderTemplate](#headertemplate) below. |
| `IsColumnSortable` | `boolean` | Adds sort icons to the header |
| `IsColumnResizable` | `boolean` | Adds a drag handle to resize the column |
| `HideColumnName` | `boolean` | Hides the column name label (CHECKBOX / STATIC types) |
| `ColumnHeaderStyles` | `Record<string, string>` | Inline styles applied to the `<th>` element |
| `ContentStyles` | `Record<string, string>` | Inline styles applied to the cell content |
| `Pipe` | `{ Pipe: PipeTransform, Values?: any }` | Pipe applied to the cell value |
| `Link` | `(row: any) => string` | Converts the cell into a router link |
| `Tooltip` | `string` | Tooltip text (used with date range columns) |
| `HoverDetails` | `(col, row) => {}` | Returns a string shown as a cell title on hover |

#### HeaderTemplate

`HeaderTemplate` is an escape hatch that lets you replace the entire contents of a column header with any Angular template — useful when the built-in filter widgets (INPUT, MULTISELECT, etc.) are not flexible enough.

```typescript
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnDataTypes, TableColumn } from 'centeva-core';

@Component({ ... })
export class MyComponent implements OnInit, AfterViewInit {
  @ViewChild('facilityHeaderTpl') facilityHeaderTpl!: TemplateRef<unknown>;

  columns: TableColumn[] = [];

  ngOnInit() {
    // Build the full columns array as normal — HeaderTemplate is patched in after the view initialises.
    this.columns = [
      {
        DataType: ColumnDataTypes.STATIC,
        Name: 'Facility',
        Property: 'facilityName',
        Enabled: true,
      },
      // ...other columns
    ];
  }

  ngAfterViewInit() {
    // Patch only the template reference — avoids rebuilding the array and prevents an extra CD cycle.
    this.columns.find(c => c.Property === 'facilityName')!.HeaderTemplate = this.facilityHeaderTpl;
  }
}
```

```html
<!-- Define the template anywhere in the component's template -->
<!-- The column definition is passed as $implicit context — use let-col to access it (optional) -->
<ng-template #facilityHeaderTpl let-col>
  <span>{{ col.Name }}</span>
  <app-searchable-multi-select
    [options]="facilityOptions"
    [(selectedValues)]="selectedFacilities"
    (selectionChange)="onFacilityFilter($event)">
  </app-searchable-multi-select>
</ng-template>

<app-table [displayedColumns]="columns" ...></app-table>
```

> **Note:** Build your `columns` array in `ngOnInit` as usual and patch only `HeaderTemplate` in `ngAfterViewInit`. This avoids rebuilding the whole array in the after-view hook, which can cause an extra change-detection cycle and flicker — especially with `OnPush` components.

#### Table Preview

<img src="https://github.com/Centeva/Centeva-Angular/blob/master/projects/centeva-core/src/assets/table-example.png" alt="Table Preview" width="500"/>

&nbsp;
&nbsp;

## Pipes

Import:

```typescript
import {CorePipesModule} from 'centeva-core';

```

### Capitalize Pipe

Usage:

```html
<span>{{'bob' | capitalize}}</span> ==> Bob
```

### CelsiusToFahrenheit Pipe

Usage:

```html
<span>{{0 | celsiusToFahrenheit}}</span> ==> 32
```

### Date Pipe

Usage:

```javascript
let date = new Date('01-01-2001');
```

```html
<span>{{ date | date: 'YYYY-MM-DD'}}</span> ==> 2001-01-01
```

### Dynamic Pipe

Usage:

```javascript
let date = new Date('01-01-2001');
let datePipe = new DatePipe();
```

```html
<span>{{ date | dynamic: datePipe:'YYYY-MM-DD'}}</span> ==> 2001-01-01

```

### Highlight Pipe

Must set a css class named .highlight-text. This will put the styling you prefer on the highlighted value.

Usage:

```javascript
let searchText = 'test';
```

```html
<a target="_blank" class="title" href="{{URL}}" [innerHtml]="Name | highlight: searchText | safeHtml"></a>
```

### MiddleDot Pipe

Usage:

```html
<div>{{'dotMe' | middleDot}}</div> === 'd∙o∙t∙M∙e'
```

### OrderBy Pipe

The first argument after orderBy is a list of fields to sort by. The second argument is a list of sort orders for each field; if this list is omitted it sorts by ascending order. If both arguments are omitted, the original collection is returned unsorted.

Usage:

```javascript
const myCollection = [
    { lastName: 'Smith', firstName: 'John', age: 54 },
    { lastName: 'Marsh', firstName: 'Isabella', age: 41 }
    { lastName: 'Marsh', firstName: 'Franklin', age: 44 }];
```

```html
<div *ngFor="col of myCollection | orderBy: ['lastName', 'age'], [SortOrder.Ascending, SortOrder.Descending]">
    {{col.lastName}}, {{col.firstName}} - {{col.age}}
</div>
```

### Percentage Pipe

Return any value as a percentage

Usage:

```html
<div>{{.872345 | percentage}}</div> === 87
```

### Phone Number Pipe

Format any Phone Number on the fly.

Usage:

```html
<div>{{435123456 | phoneNumber}}</div> === (435)123-3456
```

### Reverse Pipe

Reverse any array.

Usage:

```typescript
let arr = [1, 2, 3];
```

```html
<div>{{arr | reverse}}</div> === [3, 2, 1]
```

### SafeHtml Pipe

Bind to innerHtml safely with this pipe.

Usage:

```html
<a target="_blank" class="title" href="{{URL}}" [innerHtml]="Name | safeHtml"></a>
```

## Directives

### ClickOutside Directive

Fire an event if a click happens anywhere outside of the element.

Usage:

```typescript
let showValue = true;
```

```html
<div *ngIf="showValue" (clickOutside)="showValue = false;">
    <span>VALUE</span>
</div>
```

### NumberInput Directive

Disallow Any key except a number.

Usage:

```html
<input numberInput [(ngModel)]="model"/>
```

## Utils

### Email Validation

Usage:

```typescript
const emailValid = Utils.IsValidEmail('a'); ==> false;
const emailValid = Utils.IsValidEmail('test@gmail.com'); ==> true;
```

### Phone Validation

Usage:

```typescript
const emailValid = Utils.IsValidPhoneNumber('12345'); ==> false;
const emailValid = Utils.IsValidPhoneNumber('12345xa'); ==> false;
const emailValid = Utils.IsValidPhoneNumber('4351234567'); ==> true;
const emailValid = Utils.IsValidPhoneNumber('14351234567'); ==> true;
```

### Sort By Key

Usage:

```typescript
const list = [
{name: '103'},
{name: '102'},
{name: '104'},
{name: '105'},
{name: '101'},
];
const sortedList = Utils.SortByKey(list, 'name');
```

### Build CSV String

Usage:

```typescript
const ArrayVal = [['Header 1', 'Header 2'], ['Value 1', 'Value 2']];
const csv = Utils.buildCSVString(ArrayVal); ===> `"Header 1","Header 2"\n"Value 1","Value 2"`;
```

### Build CSV Link

Build a CSV link from array that can be used to download CSV.

Usage:

```typescript
const ArrayVal = [['Header 1', 'Header 2'], ['Value 1', 'Value 2']];
const csv = Utils.buildCSVLink(ArrayVal); ===> HTMLAnchorElement
```
