# Centeva-Core

- [Installation](#installation)
- [Components](#components)
    - [Loading](#loading-component)
    - [Table](#searchable-table)
- [Pipes](#pipes)
    - [Capitalize](#capitalize-pipe)
    - [CelsiusToFahrenheit](#celsiustofahrenheit-pipe)
    - [Date](#date-pipe)
    - [Dynamic](#dynamic-pipe)
    - [SafeHtml](#safehtml-pipe)
    - [HighLight](#highlight-pipe)
    - [PhoneNumber](#phone-number-pipe)
    - [Reverse](#reverse-pipe)
    - [Percentage](#percentage-pipe)
    - [MiddleDot](#middledot-pipe)
- [Directives](#directives)
    - [ClickOutside](#clickoutside-directive)
    - [NumberInput](#numberinput-directive)
- [Utils](#utils)
    - [EmailValidation](#email-validation)
    - [PhoneValidation](#phone-validation)
    - [SortByKey](#sort-by-key)
    - [Build CSV String](#build-csv-string)
    - [Build CSV Link](#build-csv-link)


# Installation

`This Package was built with Angular version 10. It is recommend you don't use this library with any application built with Angular < 10.`

Using npm:

```bash
$ npm i centeva-core --save
```
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

<img src="src/assets/loading-example.png" alt="Loading Preview" width="300"/>
&nbsp;
&nbsp;

### Searchable Table

`This table works with the PREQL nuget package. You will want to implement that on the backend to use this table.`

Module Import 
```typescript
import {TableModule} from 'centeva-core';
```
Usage:
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
Table Preview

<img src="src/assets/table-example.png" alt="Table Preview" width="500"/>

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
### SafeHtml Pipe

Bind to innerHtml safely with this pipe.

Usage:
```html
<a target="_blank" class="title" href="{{URL}}" [innerHtml]="Name | safeHtml"></a>
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

### Percentage Pipe
Return any value as a percentage

Usage:
```html
<div>{{.872345 | percentage}}</div> === 87
```

### MiddleDot Pipe

Usage:
```html
<div>{{'dotMe' | middleDot}}</div> === 'd∙o∙t∙M∙e'
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