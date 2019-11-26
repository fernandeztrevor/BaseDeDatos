import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadoProductosComponent } from './tabla-listado-productos.component';

describe('TablaListadoProductosComponent', () => {
  let component: TablaListadoProductosComponent;
  let fixture: ComponentFixture<TablaListadoProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadoProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
