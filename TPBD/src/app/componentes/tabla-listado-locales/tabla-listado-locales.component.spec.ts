import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadoLocalesComponent } from './tabla-listado-locales.component';

describe('TablaListadoLocalesComponent', () => {
  let component: TablaListadoLocalesComponent;
  let fixture: ComponentFixture<TablaListadoLocalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadoLocalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadoLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
