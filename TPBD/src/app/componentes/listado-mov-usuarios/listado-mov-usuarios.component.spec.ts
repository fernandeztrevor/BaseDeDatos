import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMovUsuariosComponent } from './listado-mov-usuarios.component';

describe('ListadoMovUsuariosComponent', () => {
  let component: ListadoMovUsuariosComponent;
  let fixture: ComponentFixture<ListadoMovUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMovUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMovUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
