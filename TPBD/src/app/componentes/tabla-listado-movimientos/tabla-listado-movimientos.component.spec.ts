import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadoMovimientosComponent } from './tabla-listado-movimientos.component';

describe('TablaListadoMovimientosComponent', () => {
  let component: TablaListadoMovimientosComponent;
  let fixture: ComponentFixture<TablaListadoMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadoMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadoMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
