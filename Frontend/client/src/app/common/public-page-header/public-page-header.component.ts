import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../baseComponent';

@Component({
  moduleId: module.id,
  selector: 'public-page-header',
  templateUrl: './public-page-header.component.html',
  styleUrls: ['./public-page-header.component.scss']
})
export class PublicPageHeaderComponent extends BaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
