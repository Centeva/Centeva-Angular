import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './loading.component';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';

@NgModule({
	declarations: [LoadingComponent],
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
	],
	exports: [
		LoadingComponent
	]
})
export class LoadingModule {
}
