import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { CoreDirectivesModule } from '../../core-directives.module';
import { CorePipesModule } from '../../core-pipes.module';
import { LoadingModule } from '../loading/loading.module';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    // components
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    LoadingModule,
    CorePipesModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatCheckboxModule,
    RouterModule,
    CoreDirectivesModule,
    OverlayModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
