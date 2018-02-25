import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePageHeaderComponent } from './private-page-header.component';

describe('PrivatePageComponent', () => {
  let component: PrivatePageHeaderComponent;
  let fixture: ComponentFixture<PrivatePageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatePageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
