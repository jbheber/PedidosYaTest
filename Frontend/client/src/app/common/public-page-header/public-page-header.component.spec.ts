import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPageHeaderComponent } from './public-page-header.component';

describe('PublicPageComponent', () => {
  let component: PublicPageHeaderComponent;
  let fixture: ComponentFixture<PublicPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
