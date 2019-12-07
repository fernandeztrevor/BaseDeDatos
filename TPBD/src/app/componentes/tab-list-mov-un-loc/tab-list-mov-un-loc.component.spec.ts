import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabListMovUnLocComponent } from './tab-list-mov-un-loc.component';

describe('TabListMovUnLocComponent', () => {
  let component: TabListMovUnLocComponent;
  let fixture: ComponentFixture<TabListMovUnLocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabListMovUnLocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabListMovUnLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
