import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadoUsuariosComponent } from './tabla-listado-usuarios.component';

describe('TablaListadoUsuariosComponent', () => {
  let component: TablaListadoUsuariosComponent;
  let fixture: ComponentFixture<TablaListadoUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadoUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
