import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadoMovLocComponent } from './tabla-listado-mov-loc.component';

describe('TablaListadoMovLocComponent', () => {
  let component: TablaListadoMovLocComponent;
  let fixture: ComponentFixture<TablaListadoMovLocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadoMovLocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadoMovLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
