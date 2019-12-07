import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadoMovProdComponent } from './tabla-listado-mov-prod.component';

describe('TablaListadoMovProdComponent', () => {
  let component: TablaListadoMovProdComponent;
  let fixture: ComponentFixture<TablaListadoMovProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadoMovProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadoMovProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
