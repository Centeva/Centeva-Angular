import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    standalone: false
})
export class LoadingComponent implements OnInit {

  @Input() public loadingText = '';
  @Input() public loaderColor = 'primary';
  @Input() public ariaLabel: string = 'Loading data, please wait';

  constructor() {
  }

  ngOnInit() {
  }

}
